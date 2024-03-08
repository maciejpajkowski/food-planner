import { TestBed } from "@angular/core/testing";

import { FirebaseClient } from "./firebase-client.service";

describe("FirebaseClient", () => {
	let service: FirebaseClient;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FirebaseClient);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
