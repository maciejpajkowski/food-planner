import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { MealId } from "../types/meal.types";

@Injectable({
	providedIn: "root"
})
export class IngredientsRepository {
	ingredients$$ = new BehaviorSubject<Ingredient[]>([
		{
			id: 1 as IngredientId,
			name: "Cukinia",
			mealIds: [1 as MealId]
		},
		{
			id: 2 as IngredientId,
			name: "Papryka",
			mealIds: [1 as MealId]
		},
		{
			id: 3 as IngredientId,
			name: "Cebula",
			mealIds: [1 as MealId]
		},
		{
			id: 4 as IngredientId,
			name: "Czosnek",
			mealIds: []
		},
		{
			id: 5 as IngredientId,
			name: "Pomidor",
			mealIds: []
		}
	]);

	getNameFromId(id: IngredientId): string | undefined {
		return this.ingredients$$.value.find((ingredient) => id === ingredient.id)?.name;
	}
}
