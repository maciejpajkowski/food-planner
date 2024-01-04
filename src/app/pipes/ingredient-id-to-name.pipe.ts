import { Pipe, PipeTransform, inject } from "@angular/core";
import { IngredientId } from "../types/ingredient.types";
import { IngredientsRepository } from "../services/ingredients-repository.service";

@Pipe({
	name: "ingredientIdToName",
	standalone: true
})
export class IngredientIdToNamePipe implements PipeTransform {
	private readonly ingredientsRepository = inject(IngredientsRepository);

	transform(id: IngredientId): string {
		return this.ingredientsRepository.getNameFromId(id) ?? "UNKNOWN_INGREDIENT";
	}
}
