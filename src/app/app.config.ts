import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { firebaseConfig } from "../../firebase.config.prod";
import { FirebaseUIModule } from "firebaseui-angular";
import firebase from "firebase/compat/app";
import firebaseui from "firebaseui";
import { MealsRepository } from "./services/meals-repository.service";
import { IngredientsRepository } from "./services/ingredients-repository.service";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
	signInFlow: "popup",
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

function getInitialData(
	mealsRepository: MealsRepository,
	ingredientsRepository: IngredientsRepository
) {
	return async () => {
		await mealsRepository.fetchMeals();
		await ingredientsRepository.fetchIngredients();
	};
}

export const appConfig: ApplicationConfig = {
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: getInitialData,
			multi: true,
			deps: [MealsRepository, IngredientsRepository]
		},
		{ provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
		provideRouter(routes),
		provideAnimations(),
		importProvidersFrom([
			provideFirebaseApp(() => initializeApp(firebaseConfig)),
			provideFirestore(() => getFirestore()),
			provideAuth(() => getAuth()),
			FirebaseUIModule.forRoot(firebaseUiAuthConfig)
		])
	]
};
