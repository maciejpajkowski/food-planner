import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { BehaviorSubject, Subscription } from "rxjs";
import { IngredientIdToNamePipe } from "../../pipes/ingredient-id-to-name.pipe";
import { Ingredient } from "../../types/ingredient.types";
import { MealId } from "../../types/meal.types";
import { EditMealComponent } from "../edit-meal/edit-meal.component";
import { MatListModule } from "@angular/material/list";
import { MealIdToNamePipe } from "../../pipes/meal-id-to-name.pipe";

@Component({
	selector: "app-edit-ingredient",
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		IngredientIdToNamePipe,
		MealIdToNamePipe
	],
	templateUrl: "./edit-ingredient.component.html",
	styleUrl: "./edit-ingredient.component.scss"
})
export class EditIngredientComponent {
	isEditMode = Boolean(this.data);
	name = new FormControl(this.isEditMode ? this.data.name : "");

	assignedMealIds$$ = new BehaviorSubject<MealId[]>(
		this.isEditMode ? [...this.data.mealIds] : []
	);

	private readonly subscription = new Subscription();

	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly data: Ingredient,
		public readonly dialogRef: MatDialogRef<EditMealComponent>
	) {}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onDelete(): void {
		this.dialogRef.close({ id: this.data.id, delete: true });
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.dialogRef.close({
			id: this.isEditMode ? this.data.id : 0, // 0 is overridden by ingredients repository once the ingredient is saved in db
			name: this.name.value,
			mealIds: this.data.mealIds
		} as Ingredient);
	}
}
