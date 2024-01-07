import { Component, inject } from "@angular/core";
import { Auth, User, user } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { FirebaseUIModule } from "firebaseui-angular";
import { Subscription } from "rxjs";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [HeaderComponent, FirebaseUIModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss"
})
export class LoginComponent {
	private readonly auth = inject(Auth);
	private readonly router = inject(Router);

	user$ = user(this.auth);
	userSubscription: Subscription;

	ngOnInit(): void {
		this.userSubscription = this.user$.subscribe((user: User | null) => {
			if (user !== null) this.onSignInSuccess();
		});
	}

	onSignInSuccess() {
		this.router.navigate(["/main-view"]);
	}

	onSignInFailure() {
		console.error("Oh damn, something broke while trying to sign in");
	}
}
