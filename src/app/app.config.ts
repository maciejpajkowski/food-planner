import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getAuth, provideAuth } from "@angular/fire/auth";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { firebaseConfig } from "../../firebase.config.prod";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		importProvidersFrom([
			provideFirebaseApp(() => initializeApp(firebaseConfig)),
			provideFirestore(() => getFirestore()),
			provideAuth(() => getAuth()),
		]),
	],
};
