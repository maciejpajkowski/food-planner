import { Injectable, inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly auth = inject(Auth);

	user$ = user(this.auth);
}
