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
import { tap } from "rxjs";
import { AddMealComponent } from "../../components/add-meal/add-meal.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MealIdToNamePipe } from "../../pipes/meal-id-to-name.pipe";
import { WeekRepository } from "../../services/week-repository.service";
import { Week } from "../../types/days.types";
import { MealId } from "../../types/meal.types";

@Component({
	selector: "app-main-view",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		AddMealComponent,
		MatSidenavModule,
		MatTableModule,
		MatDialogModule,
		DragDropModule,
		MealIdToNamePipe
	],
	templateUrl: "./main-view.component.html",
	styleUrl: "./main-view.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent {
	private readonly weekRepository = inject(WeekRepository);
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
