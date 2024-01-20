import { CommonModule } from "@angular/common";
import type { OnInit } from "@angular/core";
import { Component, ViewChild, inject } from "@angular/core";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { SidenavService } from "./services/sidenav.service";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [CommonModule, MatSidenavModule, RouterOutlet, DrawerComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit {
	@ViewChild("sidenav", { static: true }) sidenavRef: MatSidenav;
	private readonly sidenavService = inject(SidenavService);

	ngOnInit(): void {
		this.sidenavService.registerSidenav(this.sidenavRef);
	}
}
