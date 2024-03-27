import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter } from "@angular/router";

import { provideAnimations } from "@angular/platform-browser/animations";
import firebase from "firebase/compat/app";
import firebaseui from "firebaseui";
import { FirebaseUIModule } from "firebaseui-angular";
import { firebaseConfig } from "../../firebase.config.prod";
import { routes } from "./app.routes";
import { IngredientsRepository } from "./services/ingredients-repository.service";
import { MealsRepository } from "./services/meals-repository.service";
import { WeekRepository } from "./services/week-repository.service";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
	signInFlow: "popup",
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

function getInitialData(
	mealsRepository: MealsRepository,
	ingredientsRepository: IngredientsRepository,
	weekRepository: WeekRepository
) {
	return async () => {
		await mealsRepository.fetch();
		await ingredientsRepository.fetch();
		await weekRepository.fetch();
	};
}

export const appConfig: ApplicationConfig = {
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: getInitialData,
			multi: true,
			deps: [MealsRepository, IngredientsRepository, WeekRepository]
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
