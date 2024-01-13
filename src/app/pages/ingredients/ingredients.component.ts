import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { EditIngredientComponent } from "../../components/edit-ingredient/edit-ingredient.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MealIdToNamePipe } from "../../pipes/meal-id-to-name.pipe";
import { IngredientsRepository } from "../../services/ingredients-repository.service";
import { MealsRepository } from "../../services/meals-repository.service";
import { Ingredient } from "../../types/ingredient.types";

@Component({
	selector: "app-ingredients",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		MatButtonModule,
		MatDialogModule,
		MatDividerModule,
		MatTableModule,
		MatChipsModule,
		MealIdToNamePipe
	],
	templateUrl: "./ingredients.component.html",
	styleUrl: "./ingredients.component.scss"
})
export class IngredientsComponent {
	private readonly dialog = inject(MatDialog);
	private readonly ingredientsRepository = inject(IngredientsRepository);
	private readonly mealsRepository = inject(MealsRepository);

	ingredients$ = this.ingredientsRepository.ingredients$;

	displayedColumns = ["name", "meals"];

	onNewIngredientDialogOpen() {
		this.dialog.open(EditIngredientComponent);
	}

	onIngredientClick(data: Ingredient): void {
		this.dialog
			.open(EditIngredientComponent, { data })
			.afterClosed()
			.subscribe(async (ingredient: Ingredient) => {
				if (!ingredient) return;

				// await this.mealsRepository.editMeal(meal);
				// await this.mealsRepository.fetchMeals();
			});
	}
}
