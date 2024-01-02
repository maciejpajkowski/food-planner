import { Ingredient } from "./ingredient.types";

export interface Meal {
	id: number;
	name: string;
	ingredients: Ingredient[];
	tags: string[]; // breakfast, dinner, snack
}
