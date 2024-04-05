import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
	const router = inject(Router);

	return inject(Auth).currentUser !== null ? true : router.navigate(["/login"]);
};
