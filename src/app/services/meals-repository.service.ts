import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Meal, MealId } from "../types/meal.types";
import { IngredientId } from "../types/ingredient.types";

@Injectable({
	providedIn: "root"
})
export class MealsRepository {
	meals$$ = new BehaviorSubject<Meal[]>([
		{
			id: 1 as MealId,
			ingredientIds: [1 as IngredientId, 2 as IngredientId, 3 as IngredientId],
			name: "Pomidoro Classico",
			tags: ["obiad", "kolacja"]
		},
		{
			id: 2 as MealId,
			ingredientIds: [],
			name: "Wolowina Teriyaki",
			tags: ["obiad"]
		},
		{
			id: 3 as MealId,
			ingredientIds: [],
			name: "Budyn Owsiany",
			tags: ["śniadanie"]
		}
	]);
}
