import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
	CollectionReference,
	DocumentData,
	DocumentSnapshot,
	Firestore,
	QuerySnapshot,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	writeBatch
} from "@angular/fire/firestore";
import { Week, WeekId } from "../types/days.types";
import { Ingredient, IngredientId } from "../types/ingredient.types";
import { Meal, MealId } from "../types/meal.types";

const availableCollections = ["meals", "ingredients", "weeks"] as const;
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

	async getDoc(
		collectionName: FirestoreCollectionName,
		docId: string
	): Promise<DocumentSnapshot<DocumentData, DocumentData>> {
		return getDoc(doc(this.getCollection(collectionName), docId));
	}

	async addOrUpdateDoc(collectionName: FirestoreCollectionName, data: Meal | Ingredient) {
		return setDoc(doc(this.getCollection(collectionName), String(data.id)), {
			...data
		});
	}

	async addOrUpdateDocWithDedicatedId(
		collectionName: FirestoreCollectionName,
		data: Week,
		id: WeekId
	) {
		return setDoc(
			doc(this.getCollection(collectionName), String(id)),
			Object.fromEntries(data)
		);
	}

	async updateMultipleDocs(
		collectionName: FirestoreCollectionName,
		itemsToUpdate: Meal[] | Ingredient[]
	) {
		const batch = writeBatch(this.firestore);

		itemsToUpdate.forEach((item) => {
			const itemRef = doc(this.getCollection(collectionName), String(item.id));

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
