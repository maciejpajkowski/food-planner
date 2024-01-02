import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Meal, MealId } from "../types/meal.types";
import { IngredientId } from "../types/ingredient.types";

@Injectable({
	providedIn: "root"
})
export class MealsRepository {
	meals$ = new BehaviorSubject<Meal[]>([
		{
			id: 1 as MealId,
			ingredients: [1 as IngredientId, 2 as IngredientId],
			name: "Pomidoro Classico",
			tags: ["obiad", "kolacja"]
		},
		{
			id: 2 as MealId,
			ingredients: [],
			name: "Wolowina Teriyaki",
			tags: ["obiad"]
		},
		{
			id: 3 as MealId,
			ingredients: [],
			name: "Budyn Owsiany",
			tags: ["śniadanie"]
		}
	]);
}
