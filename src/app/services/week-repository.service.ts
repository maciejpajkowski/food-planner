import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { compareAsc, getISOWeek, getYear } from "date-fns";
import { DocumentData } from "firebase/firestore";
import { ReplaySubject } from "rxjs";
import { Week, WeekId } from "../types/days.types";
import { MealId } from "../types/meal.types";
import { FirebaseClient } from "./firebase-client.service";

@Injectable({
	providedIn: "root"
})
export class WeekRepository {
	private readonly auth = inject(Auth);
	private readonly firebaseClient = inject(FirebaseClient);

	private readonly week$$ = new ReplaySubject<Week>(1);
	private readonly weeks$$ = new ReplaySubject<Map<WeekId, Week>>(1);
	private readonly activeWeekId$$ = new ReplaySubject<WeekId>(1);

	readonly week$ = this.week$$.asObservable();
	readonly weeks$ = this.weeks$$.asObservable();
	readonly activeWeekId$ = this.activeWeekId$$.asObservable();

	async fetchAllWeeks(): Promise<void> {
		await this.auth.authStateReady();

		const response = await this.firebaseClient.getDocs("weeks");

		const weeks = new Map<WeekId, Week>();
		response.docs.forEach((doc) => {
			const weekId = doc.id as WeekId;

			weeks.set(weekId, this.buildWeekFromDocData(doc.data()));
		});
		console.log(weeks);

		this.weeks$$.next(weeks);
		this.week$$.next([...weeks.values()].at(-1) as Week);
		this.activeWeekId$$.next([...weeks.keys()].at(-1) as WeekId);
	}

	async fetchWeek(weekId: WeekId): Promise<void> {
		const response = await this.firebaseClient.getDoc("weeks", weekId);
		const data = response.data();

		if (data) {
			this.week$$.next(this.buildWeekFromDocData(data));
		} else {
			throw new Error("Week with ID " + weekId + " not found.");
		}
	}

	async update(week: Week): Promise<void> {
		console.log("updating week with data", { week });
		const weekId = this.buildWeekId(new Date([...week.keys()][0]));

		try {
			await this.firebaseClient.addOrUpdateDocWithDedicatedId("weeks", week, weekId);
			this.week$$.next(week);
		} catch (e) {
			console.error("Oh man, error while updating week with ID:", weekId, e);
		}
	}

	async setActiveWeekId(weekId: WeekId): Promise<void> {
		await this.fetchWeek(weekId);
		this.activeWeekId$$.next(weekId);
	}

	private buildWeekId(date: Date): WeekId {
		return `${getYear(date)}-${getISOWeek(date)}` as WeekId;
	}

	private buildWeekFromDocData(docData: DocumentData): Week {
		const sortedDates = Object.keys(docData).sort(compareAsc);
		const week = new Map<string, MealId[]>();

		sortedDates.forEach((date) => {
			week.set(date, docData[date]);
		});

		return week;
	}
}
