import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { BehaviorSubject, Observable, combineLatest, map } from "rxjs";
import { IngredientIdToNamePipe } from "../../pipes/ingredient-id-to-name.pipe";
import { IngredientsRepository } from "../../services/ingredients-repository.service";
import { Ingredient, IngredientId } from "../../types/ingredient.types";
import { Meal } from "../../types/meal.types";

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
		IngredientIdToNamePipe
	],
	templateUrl: "./edit-meal.component.html",
	styleUrl: "./edit-meal.component.scss"
})
export class EditMealComponent implements OnInit {
	isEditMode = Boolean(this.data);
	name = new FormControl(this.isEditMode ? this.data.name : "");
	ingredients = new FormControl();
	assignedIngredientIds$$ = new BehaviorSubject<IngredientId[]>(
		this.isEditMode ? [...this.data.ingredientIds] : []
	);

	autocompleteIngredients$: Observable<Ingredient[]>;

	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly data: Meal,
		public readonly dialogRef: MatDialogRef<EditMealComponent>,
		private readonly ingredientsRepository: IngredientsRepository
	) {}

	ngOnInit(): void {
		this.autocompleteIngredients$ = combineLatest([
			this.ingredientsRepository.ingredients$$,
			this.assignedIngredientIds$$
		]).pipe(
			map(([ingredients, assignedIngredientIds]) =>
				ingredients.filter((ingredient) => !assignedIngredientIds.includes(ingredient.id))
			)
		);

		this.ingredients.valueChanges.subscribe((chosenIngredient) => {
			if (chosenIngredient) {
				this.assignedIngredientIds$$.next([
					...this.assignedIngredientIds$$.value,
					chosenIngredient?.id
				]);
				this.ingredients.patchValue("");
			}
		});
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.dialogRef.close({
			id: this.data?.id, // currently this returns undefined for new meal, it works because id is overridden in addMeal method, but this is not very elegant
			name: this.name.value,
			ingredientIds: this.assignedIngredientIds$$.value,
			tags: this.data?.tags ?? [] // unchanged for now, tags are not part of MVP
		} as Meal);
	}
}
