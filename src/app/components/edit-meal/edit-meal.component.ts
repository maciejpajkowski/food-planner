import { Component, Inject, OnInit } from "@angular/core";
import { Meal } from "../../types/meal.types";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-edit-meal",
	standalone: true,
	imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
	templateUrl: "./edit-meal.component.html",
	styleUrl: "./edit-meal.component.scss"
})
export class EditMealComponent implements OnInit {
	isEditMode = false;
	formGroup: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public readonly data: Meal,
		public readonly dialogRef: MatDialogRef<EditMealComponent>
	) {}

	ngOnInit(): void {
		this.isEditMode = Boolean(this.data);
		this.formGroup = new FormGroup({
			name: new FormControl(this.isEditMode ? this.data.name : "")
		});
	}

	closeDialog() {
		this.dialogRef.close();
	}
}
