import { TestBed } from "@angular/core/testing";

import { SidenavService } from "./sidenav.service";
import { MatSidenav } from "@angular/material/sidenav";

fdescribe("SidenavService", () => {
	const openSpy = jasmine.createSpy();
	const closeSpy = jasmine.createSpy();
	const fakeSidenav = {
		opened: false,
		open: openSpy,
		close: closeSpy,
	} as unknown as MatSidenav;

	let service: SidenavService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SidenavService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should register sidenav", () => {
		const consoleWarnSpy = spyOn(console, "error").and.callThrough();

		service.toggleSidenav();

		expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

		service.registerSidenav(fakeSidenav);
		service.toggleSidenav();

		expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
	});

	it("should open and close sidenav", () => {
		service.registerSidenav(fakeSidenav);

		service.toggleSidenav();

		expect(closeSpy).toHaveBeenCalled();

		service.toggleSidenav();

		expect(openSpy).toHaveBeenCalled();
	});
});
