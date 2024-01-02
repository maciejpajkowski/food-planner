import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { MatChipsModule } from "@angular/material/chips";
import { Meal } from "../../types/meal.types";
import { MealsRepository } from "../../services/meals-repository.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-meals",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		MatButtonModule,
		MatDialogModule,
		MatDividerModule,
		MatTableModule,
		MatChipsModule
	],
	templateUrl: "./meals.component.html",
	styleUrl: "./meals.component.scss"
})
export class MealsComponent {
	private readonly dialog = inject(MatDialog);
	private readonly mealsRepository = inject(MealsRepository);

	meals$ = this.mealsRepository.meals$;
	displayedColumns = ["title", "ingredients", "tags"];

	onAddNewMealClick(): void {
		this.dialog.open(EditMealComponent);
	}

	onMealClick(data: Meal): void {
		console.log(data); // temp
		this.dialog.open(EditMealComponent, { data });
	}
}
