import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { Observable, combineLatest, map } from "rxjs";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";
import { HeaderComponent } from "../../components/header/header.component";
import { IngredientsRepository } from "../../services/ingredients-repository.service";
import { MealsRepository } from "../../services/meals-repository.service";
import { Meal } from "../../types/meal.types";
import { IngredientId } from "../../types/ingredient.types";

interface MealForDisplay extends Omit<Meal, "ingredients"> {
	ingredients: string[];
}

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
	private readonly ingredientsRepository = inject(IngredientsRepository);

	meals$: Observable<MealForDisplay[]> = combineLatest([
		this.mealsRepository.meals$,
		this.ingredientsRepository.ingredientsMap$
	]).pipe(map(([meals, ingredientsMap]) => this.mapIngredientIdsToNames(meals, ingredientsMap)));

	displayedColumns = ["title", "ingredients", "tags"];

	onAddNewMealClick(): void {
		this.dialog.open(EditMealComponent);
	}

	onMealClick(data: Meal): void {
		console.log(data); // temp
		this.dialog.open(EditMealComponent, { data });
	}

	private mapIngredientIdsToNames(
		meals: Meal[],
		ingredientsMap: Map<IngredientId, string>
	): MealForDisplay[] {
		return meals.map((meal) => ({
			...meal,
			ingredients: meal.ingredients.map(
				(ingredient) => ingredientsMap.get(ingredient) as string
			)
		}));
	}
}
