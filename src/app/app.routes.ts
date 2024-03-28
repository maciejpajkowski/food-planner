import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { PlanComponent } from "./pages/plan/plan.component";
import { IngredientsComponent } from "./pages/ingredients/ingredients.component";
import { MealsComponent } from "./pages/meals/meals.component";

export const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "plan", component: PlanComponent },
	{ path: "meals", component: MealsComponent },
	{ path: "ingredients", component: IngredientsComponent },
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "**", redirectTo: "login" }
];
