import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";
import { HeaderComponent } from "../../components/header/header.component";
import { IngredientIdToNamePipe } from "../../pipes/ingredient-id-to-name.pipe";
import { MealsRepository } from "../../services/meals-repository.service";
import { Meal } from "../../types/meal.types";

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
		MatChipsModule,
		IngredientIdToNamePipe
	],
	templateUrl: "./meals.component.html",
	styleUrl: "./meals.component.scss"
})
export class MealsComponent {
	private readonly dialog = inject(MatDialog);
	private readonly mealsRepository = inject(MealsRepository);

	meals$ = this.mealsRepository.meals$$.asObservable();

	displayedColumns = ["title", "ingredients", "tags"];

	onAddNewMealClick(): void {
		this.dialog
			.open(EditMealComponent)
			.afterClosed()
			.subscribe((result: Meal) => {
				if (!result) return;

				// 1. send data to firebase
				// 2. upon receiving data back from it update meals$$ (this should also trigger view re-render)
				console.log(result); // temporarily console log
			});
	}

	onMealClick(data: Meal): void {
		this.dialog
			.open(EditMealComponent, { data })
			.afterClosed()
			.subscribe((result: Meal) => {
				if (!result) return;

				// 1. send data to firebase
				// 2. upon receiving data back from it update meals$$ (this should also trigger view re-render)
				console.log(result); // temporarily console log
			});
	}
}
