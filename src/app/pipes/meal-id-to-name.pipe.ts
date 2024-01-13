import { Pipe, PipeTransform, inject } from "@angular/core";
import { MealId } from "../types/meal.types";
import { MealsRepository } from "../services/meals-repository.service";

@Pipe({
	name: "mealIdToName",
	standalone: true
})
export class MealIdToNamePipe implements PipeTransform {
	private readonly mealsRepository = inject(MealsRepository);

	transform(id: MealId): string {
		return this.mealsRepository.getNameFromId(id) ?? "UNKNOWN_MEAL";
	}
}
