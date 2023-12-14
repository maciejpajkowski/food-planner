import { TestBed } from "@angular/core/testing";

import { SidenavService } from "./sidenav.service";
import { MatSidenav } from "@angular/material/sidenav";

describe("SidenavService", () => {
	const openSpy = jasmine.createSpy("open").and.callFake(() => (fakeSidenav.opened = true));
	const closeSpy = jasmine.createSpy("close").and.callFake(() => (fakeSidenav.opened = false));
	const fakeSidenav = {
		opened: false,
		open: openSpy,
		close: closeSpy
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
		const consoleWarnSpy = spyOn(console, "error").and.callFake(() => null);

		service.toggleSidenav();

		expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

		service.registerSidenav(fakeSidenav);
		service.toggleSidenav();

		expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
	});

	it("should open and close sidenav", () => {
		fakeSidenav.opened = false;
		service.registerSidenav(fakeSidenav);

		service.toggleSidenav();

		expect(openSpy).toHaveBeenCalled();

		service.toggleSidenav();

		expect(closeSpy).toHaveBeenCalled();
	});
});
