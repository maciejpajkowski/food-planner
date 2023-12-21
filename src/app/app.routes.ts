import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { MainViewComponent } from "./pages/main-view/main-view.component";

export const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "main-view", component: MainViewComponent, outlet: "primary" },
	{ path: "", redirectTo: "login", pathMatch: "full" }
];
