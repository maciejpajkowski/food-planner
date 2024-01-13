import { ApplicationConfig, importProvidersFrom } from "@angular/core";
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

const firebaseUiAuthConfig: firebaseui.auth.Config = {
	signInFlow: "popup",
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

// add app_initializer to get meals and ingredients from db
// https://angular.io/api/core/APP_INITIALIZER

export const appConfig: ApplicationConfig = {
	providers: [
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
