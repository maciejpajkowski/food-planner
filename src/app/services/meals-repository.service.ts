import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Meal, MealId } from "../types/meal.types";
import { FirebaseClientService } from "./firebase-client.service";
import { Auth } from "@angular/fire/auth";

@Injectable({
	providedIn: "root"
})
export class MealsRepository {
	private readonly firebaseClient = inject(FirebaseClientService);
	private readonly auth = inject(Auth);

	private readonly meals$$ = new BehaviorSubject<Meal[] | null>(null);

	meals$ = this.meals$$.asObservable();

	async fetchMeals(): Promise<void> {
		await this.auth.authStateReady();
		const response = await this.firebaseClient.getDocs("meals");

		this.meals$$.next(response.docs.map((doc) => doc.data() as Meal));
	}

	async addMeal(data: Omit<Meal, "id">): Promise<void> {
		const id = this.generateNewMealId();
		const meal = { ...data, id } as Meal;

		try {
			await this.firebaseClient.addOrUpdateDoc("meals", meal);
		} catch (e) {
			console.error("Oh man, error while adding meal:", e);
		}
	}

	async editMeal(meal: Meal): Promise<void> {
		try {
			await this.firebaseClient.addOrUpdateDoc("meals", meal);
		} catch (e) {
			console.error("Oh man, error while editing meal:", e);
		}
	}

	getNameFromId(id: MealId): string | undefined {
		return this.meals$$.value?.find((meal) => id === meal.id)?.name;
	}

	private generateNewMealId(): number {
		if (this.meals$$.value) {
			return Math.max(...this.meals$$.value.map((meal) => meal.id as number)) + 1;
		} else {
			throw new Error("Cannot generate new meal ID, meals$$ is empty");
		}
	}
}
