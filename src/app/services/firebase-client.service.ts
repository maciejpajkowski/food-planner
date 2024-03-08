import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
	CollectionReference,
	DocumentData,
	Firestore,
	QuerySnapshot,
	collection,
	deleteDoc,
	doc,
	getDocs,
	setDoc,
	writeBatch
} from "@angular/fire/firestore";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { Meal, MealId } from "../types/meal.types";

const availableCollections = ["meals", "ingredients"] as const;
type FirestoreCollectionName = (typeof availableCollections)[number];

@Injectable({
	providedIn: "root"
})
export class FirebaseClient {
	private readonly firestore = inject(Firestore);
	private readonly auth = inject(Auth);

	async getDocs(
		collectionName: FirestoreCollectionName
	): Promise<QuerySnapshot<DocumentData, DocumentData>> {
		return getDocs(this.getCollection(collectionName));
	}

	async addOrUpdateDoc(collectionName: FirestoreCollectionName, data: Meal | Ingredient) {
		return setDoc(doc(this.getCollection(collectionName), String(data.id)), {
			...data
		});
	}

	async updateMultipleDocs(
		collectionName: FirestoreCollectionName,
		itemsToUpdate: Meal[] | Ingredient[]
	) {
		const batch = writeBatch(this.firestore);

		itemsToUpdate.forEach((item) => {
			const itemRef = doc(this.getCollection(collectionName), String(item.id));

			console.log({ item });

			batch.update(itemRef, { ...item });
		});

		await batch.commit();
	}

	async deleteDoc(collectionName: FirestoreCollectionName, id: MealId | IngredientId) {
		return deleteDoc(doc(this.getCollection(collectionName), String(id)));
	}

	private getCollection(
		collectionName: FirestoreCollectionName
	): CollectionReference<DocumentData, DocumentData> {
		return collection(this.firestore, `users/${this.auth.currentUser?.uid}/${collectionName}`);
	}
}
