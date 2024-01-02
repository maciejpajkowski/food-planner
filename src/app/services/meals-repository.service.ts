import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Meal } from "../types/meal.types";

@Injectable({
	providedIn: "root"
})
export class MealsRepository {
	meals$ = new BehaviorSubject<Meal[]>([
		{
			id: 1,
			ingredients: [],
			name: "Pomidoro Classico",
			tags: ["obiad", "kolacja"]
		},
		{
			id: 2,
			ingredients: [],
			name: "Wolowina Teriyaki",
			tags: ["obiad"]
		},
		{
			id: 3,
			ingredients: [],
			name: "Budyn Owsiany",
			tags: ["śniadanie"]
		}
	]);
}
