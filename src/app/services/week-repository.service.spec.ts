import { TestBed } from "@angular/core/testing";

import { WeekRepository } from "./week-repository.service";

describe("WeekRepository", () => {
	let service: WeekRepository;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WeekRepository);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
