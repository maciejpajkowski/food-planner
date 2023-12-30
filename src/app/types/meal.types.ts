import { Ingredient } from "./ingredient.types";

export interface Meal {
	id: number;
	title: string;
	ingredients: Ingredient[];
	tags: string[]; // breakfast, dinner, snack etc.
}
