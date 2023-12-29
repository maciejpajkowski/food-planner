import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { MainViewComponent } from "./pages/main-view/main-view.component";
import { IngredientsComponent } from "./pages/ingredients/ingredients.component";
import { MealsComponent } from "./pages/meals/meals.component";

export const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "main-view", component: MainViewComponent },
	{ path: "meals", component: MealsComponent },
	{ path: "ingredients", component: IngredientsComponent },
	{ path: "", redirectTo: "login", pathMatch: "full" }
];
