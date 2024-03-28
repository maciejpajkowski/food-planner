import { OnDestroy, Pipe, PipeTransform, inject } from "@angular/core";
import { WeekRepository } from "../services/week-repository.service";
import { WeekId } from "../types/days.types";
import { Subscription } from "rxjs";

@Pipe({
	name: "weekIdToDateRange",
	standalone: true
})
export class WeekIdToDateRangePipe implements PipeTransform, OnDestroy {
	private readonly weekRepository = inject(WeekRepository);

	private subscription: Subscription;

	transform(weekId: WeekId): string {
		let formattedString = String(weekId);

		this.subscription = this.weekRepository.weeks$.subscribe((weeks) => {
			const week = weeks.get(weekId);

			if (week) {
				const weekDates = [...week.keys()];
				const firstDayDate = weekDates.at(0);
				const lastDayDate = weekDates.at(-1);

				formattedString = `${firstDayDate} - ${lastDayDate}`;
			}
		});

		return formattedString;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
