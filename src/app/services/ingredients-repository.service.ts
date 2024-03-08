import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { FirebaseClient } from "./firebase-client.service";

@Injectable({
	providedIn: "root"
})
export class IngredientsRepository {
	private readonly firebaseClient = inject(FirebaseClient);
	private readonly auth = inject(Auth);

	private readonly ingredients$$ = new BehaviorSubject<Ingredient[] | null>(null);

	ingredients$ = this.ingredients$$.asObservable();

	async fetch(): Promise<void> {
		await this.auth.authStateReady();

		if (!this.auth.currentUser) {
			this.ingredients$$.next([]);
			return;
		}
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

	// assignMealToIngredients(meal: Meal): void {
	// 	// 1. lista ID skladnikow z meala
	// 	// 2. iteracja po nich, dla kazdego trzeba zlapac liste przypisanych meali
	// }

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
		if (this.ingredients$$.value) {
			return (
				Math.max(...this.ingredients$$.value.map((ingredient) => ingredient.id as number)) +
				1
			);
		} else {
			throw new Error("Cannot generate new ingredient ID, ingredients$$ is empty");
		}
	}
}
