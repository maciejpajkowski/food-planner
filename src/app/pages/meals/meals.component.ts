import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { Meal } from "../../types/meal.types";

@Component({
	selector: "app-meals",
	standalone: true,
	imports: [HeaderComponent, MatButtonModule, MatDialogModule, MatDividerModule, MatTableModule],
	templateUrl: "./meals.component.html",
	styleUrl: "./meals.component.scss"
})
export class MealsComponent {
	private readonly dialog = inject(MatDialog);

	temporaryData: Meal[] = [
		{
			id: 1,
			ingredients: [],
			title: "Pomidoro Classico",
			tags: ["dinner"]
		},
		{
			id: 2,
			ingredients: [],
			title: "Wolowina Teriyaki",
			tags: ["dinner"]
		},
		{
			id: 3,
			ingredients: [],
			title: "Budyn Owsiany",
			tags: ["breakfast"]
		}
	];
	displayedColumns = ["title", "ingredients", "tags"];

	onAddNewMealClick(): void {
		this.dialog.open(EditMealComponent);
	}

	onMealClick(data: Meal): void {
		console.log(data); // temp
		this.dialog.open(EditMealComponent, { data });
	}
}
