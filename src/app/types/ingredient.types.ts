import { MealId } from "./meal.types";

export type IngredientId = number & { _ingredient_id_: never };
export interface Ingredient {
	id: IngredientId;
	name: string;
	meals: MealId[];
	amountWithUnit?: string; // eg. "1 tablespoon", "300g", "half glass"
}
