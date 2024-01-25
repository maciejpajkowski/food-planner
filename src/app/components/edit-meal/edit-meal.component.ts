import { CommonModule } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { BehaviorSubject, Observable, Subscription, combineLatest, map } from "rxjs";
import { IngredientIdToNamePipe } from "../../pipes/ingredient-id-to-name.pipe";
import { IngredientsRepository } from "../../services/ingredients-repository.service";
import { Ingredient, IngredientId } from "../../types/ingredient.types";
import { Meal } from "../../types/meal.types";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: "app-edit-meal",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatIconModule,
		IngredientIdToNamePipe
	],
	templateUrl: "./edit-meal.component.html",
	styleUrl: "./edit-meal.component.scss"
})
export class EditMealComponent implements OnInit, OnDestroy {
	isEditMode = Boolean(this.data);
	name = new FormControl(this.isEditMode ? this.data.name : "");
	ingredients = new FormControl<Ingredient | null>(null);
	tags = new FormControl<string>("");

	assignedTags$$ = new BehaviorSubject<string[]>(this.isEditMode ? [...this.data.tags] : []);
	assignedIngredientIds$$ = new BehaviorSubject<IngredientId[]>(
		this.isEditMode ? [...this.data.ingredientIds] : []
	);

	autocompleteIngredients$: Observable<Ingredient[]>;

	private readonly subscription = new Subscription();

	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly data: Meal,
		public readonly dialogRef: MatDialogRef<EditMealComponent>,
		private readonly ingredientsRepository: IngredientsRepository
	) {}

	ngOnInit(): void {
		this.autocompleteIngredients$ = combineLatest([
			this.ingredientsRepository.ingredients$,
			this.assignedIngredientIds$$
		]).pipe(
			map(
				([ingredients, assignedIngredientIds]) =>
					ingredients?.filter(
						(ingredient) => !assignedIngredientIds.includes(ingredient.id)
					) ?? []
			)
		);

		this.subscribeToIngredientsChanges();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onTagEnter(): void {
		const value = this.tags.value;

		if (value) {
			this.assignedTags$$.next([...this.assignedTags$$.value, value]);
			this.tags.patchValue("");
		}
	}

	onIngredientRemoved(idToRemove: IngredientId): void {
		this.assignedIngredientIds$$.next(
			this.assignedIngredientIds$$.value.filter((id) => id !== idToRemove)
		);
	}

	onTagRemoved(tagToRemove: string): void {
		this.assignedTags$$.next(this.assignedTags$$.value.filter((tag) => tag !== tagToRemove));
	}

	onDelete(): void {
		this.dialogRef.close({ id: this.data.id, delete: true });
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.dialogRef.close({
			id: this.isEditMode ? this.data.id : 0, // 0 is overridden by meals repository once the meal is saved in db
			name: this.name.value,
			ingredientIds: this.assignedIngredientIds$$.value,
			tags: this.assignedTags$$.value
		} as Meal);
	}

	private subscribeToIngredientsChanges(): void {
		this.subscription.add(
			this.ingredients.valueChanges.subscribe((chosenIngredient) => {
				if (chosenIngredient) {
					this.assignedIngredientIds$$.next([
						...this.assignedIngredientIds$$.value,
						chosenIngredient?.id
					]);
					this.ingredients.patchValue(null);
				}
			})
		);
	}
}
