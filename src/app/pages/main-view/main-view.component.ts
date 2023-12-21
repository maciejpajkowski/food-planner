import { Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
	selector: "app-main-view",
	standalone: true,
	imports: [MatSidenavModule, HeaderComponent],
	templateUrl: "./main-view.component.html",
	styleUrl: "./main-view.component.scss"
})
export class MainViewComponent {}
