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
	setDoc
} from "@angular/fire/firestore";
import { Meal } from "../types/meal.types";
import { Ingredient } from "../types/ingredient.types";

const availableCollections = ["meals", "ingredients"] as const;
type FirestoreCollectionName = (typeof availableCollections)[number];

@Injectable({
	providedIn: "root"
})
export class FirebaseClientService {
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

	async deleteDoc(collectionName: FirestoreCollectionName, data: Meal | Ingredient) {
		return deleteDoc(doc(this.getCollection(collectionName), String(data.id)));
	}

	private getCollection(
		collectionName: FirestoreCollectionName
	): CollectionReference<DocumentData, DocumentData> {
		return collection(this.firestore, `users/${this.auth.currentUser?.uid}/${collectionName}`);
	}
}
