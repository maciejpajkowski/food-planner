import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Meal, MealId } from "../types/meal.types";
import { FirebaseClient } from "./firebase-client.service";
import { IngredientsRepository } from "./ingredients-repository.service";

@Injectable({
	providedIn: "root"
})
export class MealsRepository {
	private readonly firebaseClient = inject(FirebaseClient);
	private readonly ingredientsRepository = inject(IngredientsRepository);

	private readonly meals$$ = new BehaviorSubject<Meal[] | null>(null);

	meals$ = this.meals$$.asObservable().pipe(
		map(
			(meals) =>
				meals?.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}

					if (a.name > b.name) {
						return 1;
					}
					return 0;
				}) ?? null
		)
	);

	async fetch(): Promise<void> {
		const response = await this.firebaseClient.getDocs("meals");

		this.meals$$.next(response.docs.map((doc) => doc.data() as Meal));
	}

	async add(data: Omit<Meal, "id">): Promise<void> {
		const id = this.generateNewMealId();
		const meal = { ...data, id } as Meal;

		try {
			await this.firebaseClient.addOrUpdateDoc("meals", meal);
			await this.ingredientsRepository.updateMealAssignments(meal);
		} catch (e) {
			console.error("Oh man, error while adding meal:", e);
		}
	}

	async update(meal: Meal): Promise<void> {
		try {
			const changedIngredientIds = this.getMealById(meal.id)?.ingredientIds.filter(
				(currentIngredientId) =>
					!meal.ingredientIds.some(
						(updatedIngredientId) => currentIngredientId === updatedIngredientId
					)
			);

			await this.firebaseClient.addOrUpdateDoc("meals", meal);
			await this.ingredientsRepository.updateMealAssignments(meal, changedIngredientIds);
		} catch (e) {
			console.error("Oh man, error while editing meal:", e);
		}
	}

	async delete(mealId: MealId): Promise<void> {
		try {
			await this.firebaseClient.deleteDoc("meals", mealId);
		} catch (e) {
			console.error("Oh man, error while removing meal:", e);
		}
	}

	getMealById(id: MealId): Meal | undefined {
		return this.meals$$.value?.find((meal) => id === meal.id);
	}

	getNameFromId(id: MealId): string | undefined {
		return this.meals$$.value?.find((meal) => id === meal.id)?.name;
	}

	private generateNewMealId(): number {
		const mealIds = this.meals$$.value?.map((meal) => meal.id as number) ?? [];
		return Math.max(...mealIds, 0) + 1;
	}
}
