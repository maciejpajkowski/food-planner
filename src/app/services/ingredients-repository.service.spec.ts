import { TestBed } from "@angular/core/testing";

import { IngredientsRepository } from "./ingredients-repository.service";

describe("IngredientsRepository", () => {
	let service: IngredientsRepository;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(IngredientsRepository);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
