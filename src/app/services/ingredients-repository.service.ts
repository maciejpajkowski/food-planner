import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { Meal } from "../types/meal.types";
import { FirebaseClient } from "./firebase-client.service";

@Injectable({
	providedIn: "root"
})
export class IngredientsRepository {
	private readonly firebaseClient = inject(FirebaseClient);

	private readonly ingredients$$ = new BehaviorSubject<Ingredient[] | null>(null);

	ingredients$ = this.ingredients$$.asObservable().pipe(
		map(
			(ingredients) =>
				ingredients?.sort((a, b) => {
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
		const response = await this.firebaseClient.getDocs("ingredients");

		this.ingredients$$.next(response.docs.map((doc) => doc.data() as Ingredient));
	}

	async add(data: Omit<Ingredient, "id">): Promise<void> {
		const id = this.generateNewIngredientId();
		const ingredient = { ...data, id } as Ingredient;

		try {
			await this.firebaseClient.addOrUpdateDoc("ingredients", ingredient);
		} catch (e) {
			console.error("Oh man, error while adding ingredient:", e);
		}
	}

	async update(ingredient: Ingredient): Promise<void> {
		try {
			await this.firebaseClient.addOrUpdateDoc("ingredients", ingredient);
		} catch (e) {
			console.error("Oh man, error while editing ingredient:", e);
		}
	}

	async delete(ingredientId: IngredientId): Promise<void> {
		try {
			await this.firebaseClient.deleteDoc("ingredients", ingredientId);
		} catch (e) {
			console.error("Oh man, error while removing ingredient:", e);
		}
	}

	async updateMealAssignments(meal: Meal, removedIngredients?: IngredientId[]): Promise<void> {
		const ingredientIdsInMeal = meal.ingredientIds;

		ingredientIdsInMeal.forEach(async (ingredientId) => {
			const ingredient = this.getIngredientById(ingredientId);

			if (ingredient && !ingredient.mealIds.includes(meal.id)) {
				ingredient.mealIds.push(meal.id);
				await this.update(ingredient);
			}
		});

		removedIngredients?.forEach(async (removedIngredientId) => {
			const ingredient = this.getIngredientById(removedIngredientId);

			if (ingredient) {
				const mealIdIndex = ingredient.mealIds.indexOf(meal.id);
				ingredient.mealIds.splice(mealIdIndex, 1);
				await this.update(ingredient);
			}
		});

		await this.fetch();
	}

	getIngredientById(id: IngredientId): Ingredient | undefined {
		return this.ingredients$$.value?.find((ingredient) => id === ingredient.id);
	}

	getMultipleIngredientsByIds(ids: IngredientId[]): Ingredient[] {
		return ids.map((id) => this.getIngredientById(id)).filter(Boolean) as Ingredient[];
	}

	getNameFromId(id: IngredientId): string | undefined {
		return this.ingredients$$.value?.find((ingredient) => id === ingredient.id)?.name;
	}

	private generateNewIngredientId(): number {
		const ingredientIds =
			this.ingredients$$.value?.map((ingredient) => ingredient.id as number) ?? [];
		return Math.max(...ingredientIds, 0) + 1;
	}
}
