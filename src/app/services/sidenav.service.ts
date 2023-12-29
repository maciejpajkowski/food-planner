import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({
	providedIn: "root"
})
export class SidenavService {
	private sidenav?: MatSidenav;

	registerSidenav(sidenavRef: MatSidenav): void {
		this.sidenav = sidenavRef;
	}

	async toggleSidenav(): Promise<void> {
		if (!this.sidenav) {
			console.error("Sidenav is not registered, please register it using `registerSidenav` method");
			return;
		}

		if (this.sidenav.opened) {
			await this.sidenav.close();
		} else {
			await this.sidenav.open();
		}
	}
}
