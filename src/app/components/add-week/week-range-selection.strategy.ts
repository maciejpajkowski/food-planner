import { Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { DateRange, MatDateRangeSelectionStrategy } from "@angular/material/datepicker";

@Injectable()
export class WeekRangeSelectionStrategy implements MatDateRangeSelectionStrategy<Date> {
	constructor(private readonly dateAdapter: DateAdapter<Date>) {}

	selectionFinished(date: Date | null): DateRange<Date> {
		return this.createWeekRange(date);
	}

	createPreview(activeDate: Date | null): DateRange<Date> {
		return this.createWeekRange(activeDate);
	}

	private createWeekRange(date: Date | null): DateRange<Date> {
		if (date) {
			const d = new Date(date);
			const day = d.getDay();
			const diff = d.getDate() - day + (day == 0 ? -6 : 1);
			const start = new Date(d.setDate(diff));
			const end = new Date(d.setDate(diff + 6));
			return new DateRange<Date>(start, end);
		}

		return new DateRange<Date>(null, null);
	}
}
