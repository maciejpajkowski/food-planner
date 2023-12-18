import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MainViewComponent } from "./components/main-view/main-view.component";

export const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "main-view", component: MainViewComponent, outlet: "primary" },
	{ path: "", redirectTo: "login", pathMatch: "full" }
];
