import { Meal } from "./meal.types";

export interface Ingredient {
	id: number;
	title: string;
	linkedMeals: Meal[];
}
