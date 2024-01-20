import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { FirebaseClientService } from "./firebase-client.service";

@Injectable({
	providedIn: "root"
})
export class IngredientsRepository {
	private readonly firebaseClient = inject(FirebaseClientService);
	private readonly auth = inject(Auth);

	private readonly ingredients$$ = new BehaviorSubject<Ingredient[] | null>(null);

	ingredients$ = this.ingredients$$.asObservable();

	async fetchIngredients(): Promise<void> {
		await this.auth.authStateReady();
		const response = await this.firebaseClient.getDocs("ingredients");

		this.ingredients$$.next(response.docs.map((doc) => doc.data() as Ingredient));
	}

	async addIngredient(data: Omit<Ingredient, "id">): Promise<void> {
		const id = this.generateNewIngredientId();
		const ingredient = { ...data, id } as Ingredient;

		try {
			await this.firebaseClient.addOrUpdateDoc("ingredients", ingredient);
		} catch (e) {
			console.error("Oh man, error while adding ingredient:", e);
		}
	}

	async editIngredient(ingredient: Ingredient): Promise<void> {
		try {
			await this.firebaseClient.addOrUpdateDoc("ingredients", ingredient);
		} catch (e) {
			console.error("Oh man, error while editing ingredient:", e);
		}
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
