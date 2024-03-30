import { Injectable, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { compareAsc, format, getISOWeek, getYear, parseISO } from "date-fns";
import { DocumentData } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { Week, WeekId } from "../types/days.types";
import { MealId } from "../types/meal.types";
import { FirebaseClient } from "./firebase-client.service";

@Injectable({
	providedIn: "root"
})
export class WeekRepository {
	private readonly auth = inject(Auth);
	private readonly firebaseClient = inject(FirebaseClient);

	private readonly week$$ = new BehaviorSubject<Week>(new Map());
	private readonly weeks$$ = new BehaviorSubject<Map<WeekId, Week>>(new Map());
	private readonly activeWeekId$$ = new BehaviorSubject<WeekId | null>(null);

	readonly week$ = this.week$$.asObservable();
	readonly weeks$ = this.weeks$$.asObservable();
	readonly activeWeekId$ = this.activeWeekId$$.asObservable();

	async fetchAllWeeks(): Promise<void> {
		await this.auth.authStateReady();

		const response = await this.firebaseClient.getDocs("weeks");

		const weeks = new Map<WeekId, Week>();
		response.docs
			.sort((a, b) => compareAsc(parseISO(a.id), parseISO(b.id)))
			.forEach((doc) => {
				weeks.set(doc.id as WeekId, this.buildWeekFromDocData(doc.data()));
			});

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

	async updateWeek(week: Week): Promise<void> {
		const weekId = this.getWeekId(new Date([...week.keys()][0]));

		try {
			await this.firebaseClient.addOrUpdateDocWithDedicatedId("weeks", week, weekId);
			this.week$$.next(week);
		} catch (e) {
			console.error("Oh man, error while updating week with ID:", weekId, e);
		}
	}

	async addWeek(week: Week): Promise<void> {
		const weekId = this.getWeekId(new Date([...week.keys()][0]));

		try {
			await this.firebaseClient.addOrUpdateDocWithDedicatedId("weeks", week, weekId);
			this.week$$.next(week);
			this.weeks$$.next(this.weeks$$.value.set(weekId, week));
			this.activeWeekId$$.next(weekId);
		} catch (e) {
			console.error("Oh man, error while adding a new week with ID:", weekId, e);
		}
	}

	async setActiveWeekId(weekId: WeekId): Promise<void> {
		await this.fetchWeek(weekId);
		this.activeWeekId$$.next(weekId);
	}

	getWeekId(date: Date): WeekId {
		return `${getYear(date)}-W${String(getISOWeek(date)).padStart(2, "0")}` as WeekId;
	}

	formatDate(date: Date): string {
		return format(date, "yyyy-MM-dd");
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
