import {
	CdkDragDrop,
	CdkDropList,
	CdkDropListGroup,
	DragDropModule,
	moveItemInArray,
	transferArrayItem
} from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ViewChild, inject } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { map, tap } from "rxjs";
import { AddMealComponent } from "../../components/add-meal/add-meal.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MealIdToNamePipe } from "../../pipes/meal-id-to-name.pipe";
import { WeekRepository } from "../../services/week-repository.service";
import { Week, WeekId } from "../../types/days.types";
import { MealId } from "../../types/meal.types";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { WeekIdToDateRangePipe } from "../../pipes/week-id-to-date-range.pipe";

@Component({
	selector: "app-plan",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		AddMealComponent,
		MatSidenavModule,
		MatButtonModule,
		MatSelectModule,
		MatTableModule,
		MatDialogModule,
		DragDropModule,
		MealIdToNamePipe,
		WeekIdToDateRangePipe
	],
	templateUrl: "./plan.component.html",
	styleUrl: "./plan.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanComponent {
	public readonly weekRepository = inject(WeekRepository);
	private readonly dialog = inject(MatDialog);

	@ViewChild("dropListGroup") group: CdkDropListGroup<CdkDropList>;

	mondayMeals: MealId[] = [];
	tuesdayMeals: MealId[] = [];
	wednesdayMeals: MealId[] = [];
	thursdayMeals: MealId[] = [];
	fridayMeals: MealId[] = [];
	saturdayMeals: MealId[] = [];
	sundayMeals: MealId[] = [];

	weekDates: string[] = [];
	week$ = this.weekRepository.week$.pipe(
		tap((data: Week) => {
			this.weekDates = [...data.keys()];

			const dayMeals = [...data.values()];

			this.mondayMeals = dayMeals[0];
			this.tuesdayMeals = dayMeals[1];
			this.wednesdayMeals = dayMeals[2];
			this.thursdayMeals = dayMeals[3];
			this.fridayMeals = dayMeals[4];
			this.saturdayMeals = dayMeals[5];
			this.sundayMeals = dayMeals[6];
		})
	);

	weekIds$ = this.weekRepository.weeks$.pipe(map((weeksMap) => [...weeksMap.keys()]));

	async handleDrop(event: CdkDragDrop<MealId[]>): Promise<void> {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}

		await this.updateWeek();
	}

	async onMealDelete(mealId: MealId, dayMeals: MealId[]): Promise<void> {
		const mealIndex = dayMeals.indexOf(mealId);
		dayMeals.splice(mealIndex, 1);

		await this.updateWeek();
	}

	onMealAdd(dayMeals: MealId[]): void {
		this.dialog
			.open(AddMealComponent)
			.afterClosed()
			.subscribe(async ({ selectedMeal }) => {
				dayMeals.push(selectedMeal);
				await this.updateWeek();
			});
	}

	onWeekSelectionChange(weekId: WeekId): void {
		this.weekRepository.setActiveWeekId(weekId);
	}

	private async updateWeek(): Promise<void> {
		const updatedWeek = new Map<string, MealId[]>();

		updatedWeek.set(this.weekDates[0], this.mondayMeals);
		updatedWeek.set(this.weekDates[1], this.tuesdayMeals);
		updatedWeek.set(this.weekDates[2], this.wednesdayMeals);
		updatedWeek.set(this.weekDates[3], this.thursdayMeals);
		updatedWeek.set(this.weekDates[4], this.fridayMeals);
		updatedWeek.set(this.weekDates[5], this.saturdayMeals);
		updatedWeek.set(this.weekDates[6], this.sundayMeals);

		await this.weekRepository.update(updatedWeek);
	}
}
