import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { MealId } from "../types/meal.types";

@Injectable({
	providedIn: "root"
})
export class IngredientsRepository {
	ingredients$ = new BehaviorSubject<Ingredient[]>([
		{
			id: 1 as IngredientId,
			name: "Cukinia",
			meals: [1 as MealId]
		},
		{
			id: 2 as IngredientId,
			name: "Papryka",
			meals: [1 as MealId]
		}
	]);

	ingredientsMap$ = this.ingredients$.pipe(
		map((ingredients) => {
			const ingredientsMap = new Map<IngredientId, string>();

			ingredients.forEach((ingredient) => {
				ingredientsMap.set(ingredient.id, ingredient.name);
			});

			return ingredientsMap;
		})
	);
}
