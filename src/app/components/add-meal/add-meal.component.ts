import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MealsRepository } from "../../services/meals-repository.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: "app-add-meal",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatButtonModule],
	templateUrl: "./add-meal.component.html",
	styleUrl: "./add-meal.component.scss"
})
export class AddMealComponent {
	public readonly mealsRepository = inject(MealsRepository);
	public readonly dialogRef = inject(MatDialogRef<AddMealComponent>);

	selectedMeal = null;

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.dialogRef.close({ selectedMeal: this.selectedMeal });
	}
}
