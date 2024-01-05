import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";

@Injectable({
	providedIn: "root"
})
export class FirebaseClientService {
	private readonly firestore = inject(Firestore);
	private readonly auth = inject(Auth);

	// todo
	// 1. get refs to meals and ingredients collections for simplified usage
	// 2. create methods to easily CRUD stuff in the database
}
