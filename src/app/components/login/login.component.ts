import { Component, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { HeaderComponent } from "../header/header.component";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [HeaderComponent],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss"
})
export class LoginComponent {
	private auth: Auth = inject(Auth);
}
