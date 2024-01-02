import { TestBed } from "@angular/core/testing";

import { MealsRepository } from "./meals-repository.service";

describe("MealsRepository", () => {
	let service: MealsRepository;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MealsRepository);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
