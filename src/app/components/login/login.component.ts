import { Component, OnInit, inject } from "@angular/core";
import { Auth, User, signOut, user } from "@angular/fire/auth";
import { HeaderComponent } from "../header/header.component";
import { FirebaseUIModule, FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from "firebaseui-angular";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [HeaderComponent, FirebaseUIModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss"
})
export class LoginComponent implements OnInit {
	private auth = inject(Auth);
	private router = inject(Router);

	user$ = user(this.auth);
	userSubscription: Subscription;

	ngOnInit(): void {
		this.auth.useDeviceLanguage();
		this.userSubscription = this.user$.subscribe((authUser: User | null) => {
			console.log(authUser);
		});
		setTimeout(() => {
			signOut(this.auth);
		}, 7000);
	}

	onSignInSuccess(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
		console.log("calling onSignInSuccess");
		this.router.navigate(["/main-view"]);
		console.log(signInSuccessData);
	}

	onSignInFailure(errorData: FirebaseUISignInFailure) {
		console.error("oh shit");
		console.log(errorData);
	}
}
