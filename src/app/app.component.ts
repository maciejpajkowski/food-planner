import type { OnInit } from "@angular/core";
import type { Observable } from "rxjs";
import { Component, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { SidenavService } from "./services/sidenav.service";
import { DrawerComponent } from "./components/drawer/drawer.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [CommonModule, MatSidenavModule, RouterOutlet, DrawerComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit {
	@ViewChild("sidenav", { static: true }) sidenavRef: MatSidenav;

	users$: Observable<unknown>;

	private readonly firestore = inject(Firestore);
	private readonly sidenavService = inject(SidenavService);

	ngOnInit(): void {
		const coll = collection(this.firestore, "users"); // temp
		this.users$ = collectionData(coll); // temp

		this.sidenavService.registerSidenav(this.sidenavRef);
	}
}
