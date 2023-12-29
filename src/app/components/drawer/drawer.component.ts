import { Component, inject } from "@angular/core";
import { Auth, signOut } from "@angular/fire/auth";
import { MatListModule } from "@angular/material/list";
import { Router, RouterLink } from "@angular/router";
import { SidenavService } from "../../services/sidenav.service";

@Component({
	selector: "app-drawer",
	standalone: true,
	imports: [MatListModule, RouterLink],
	templateUrl: "./drawer.component.html",
	styleUrl: "./drawer.component.scss"
})
export class DrawerComponent {
	private readonly auth = inject(Auth);
	private readonly router = inject(Router);
	private readonly sidenav = inject(SidenavService);

	async logOut() {
		this.sidenav.toggleSidenav();

		await signOut(this.auth);
		await this.router.navigate(["/login"]);
	}
}
