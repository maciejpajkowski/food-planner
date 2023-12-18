import { Component } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-drawer",
	standalone: true,
	imports: [MatListModule, RouterLink],
	templateUrl: "./drawer.component.html",
	styleUrl: "./drawer.component.scss"
})
export class DrawerComponent {}
