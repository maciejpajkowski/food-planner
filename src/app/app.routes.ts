import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { PlanComponent } from "./pages/plan/plan.component";
import { IngredientsComponent } from "./pages/ingredients/ingredients.component";
import { MealsComponent } from "./pages/meals/meals.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "plan", component: PlanComponent, canActivate: [authGuard] },
	{ path: "meals", component: MealsComponent, canActivate: [authGuard] },
	{ path: "ingredients", component: IngredientsComponent, canActivate: [authGuard] },
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "**", redirectTo: "login" }
];
