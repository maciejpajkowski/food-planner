import { WeekIdToDateRangePipe } from "./week-id-to-date-range.pipe";

describe("WeekIdToDateRangePipe", () => {
	it("create an instance", () => {
		const pipe = new WeekIdToDateRangePipe();
		expect(pipe).toBeTruthy();
	});
});
