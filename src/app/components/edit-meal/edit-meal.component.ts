import { Component, Inject, OnInit } from "@angular/core";
import { Meal } from "../../types/meal.types";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-edit-meal",
	standalone: true,
	imports: [ReactiveFormsModule, MatInputModule],
	templateUrl: "./edit-meal.component.html",
	styleUrl: "./edit-meal.component.scss"
})
export class EditMealComponent implements OnInit {
	isEditMode = false;
	formGroup: FormGroup;

	constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Meal) {}
	
	ngOnInit(): void {
		this.isEditMode = Boolean(this.data);
		this.formGroup = new FormGroup({
			title: new FormControl(this.isEditMode ? this.data.title : "")
		})
	}
}
