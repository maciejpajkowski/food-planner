import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { MealsRepository } from "../../services/meals-repository.service";

@Component({
	selector: "app-add-meal",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatButtonModule],
	templateUrl: "./add-meal.component.html",
	styleUrl: "./add-meal.component.scss"
})
export class AddMealComponent {
	readonly mealsRepository = inject(MealsRepository);
	readonly dialogRef = inject(MatDialogRef<AddMealComponent>);
	private readonly router = inject(Router);

	selectedMeal = null;

	onCancel(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.dialogRef.close({ selectedMeal: this.selectedMeal });
	}

	onMealsRedirect(): void {
		this.dialogRef.close();
		this.router.navigate(["/meals"]);
	}
}
