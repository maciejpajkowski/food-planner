import { IngredientId } from "./ingredient.types";

export type MealId = number & { _meal_id_: never };

export interface Meal {
	id: MealId;
	name: string;
	ingredientIds: IngredientId[];
	tags: string[]; // breakfast, dinner, snack
}
