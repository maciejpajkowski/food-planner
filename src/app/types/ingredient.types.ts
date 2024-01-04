import { MealId } from "./meal.types";

export type IngredientId = number & { _ingredient_id_: never };
export interface Ingredient {
	id: IngredientId;
	name: string;
	mealIds: MealId[];
}
