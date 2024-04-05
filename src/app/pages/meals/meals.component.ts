import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipSelectionChange, MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { BehaviorSubject, combineLatest, filter, map } from "rxjs";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";
import { HeaderComponent } from "../../components/header/header.component";
import { IngredientIdToNamePipe } from "../../pipes/ingredient-id-to-name.pipe";
import { MealsRepository } from "../../services/meals-repository.service";
import { Meal, MealId } from "../../types/meal.types";

@Component({
	selector: "app-meals",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		MatButtonModule,
		MatDialogModule,
		MatDividerModule,
		MatTableModule,
		MatChipsModule,
		IngredientIdToNamePipe
	],
	templateUrl: "./meals.component.html",
	styleUrl: "./meals.component.scss"
})
export class MealsComponent {
	private readonly dialog = inject(MatDialog);
	private readonly mealsRepository = inject(MealsRepository);

	activeSearchTag$$ = new BehaviorSubject<string>("");

	meals$ = combineLatest([this.mealsRepository.meals$, this.activeSearchTag$$]).pipe(
		map(([meals, activeSearchTag]) =>
			activeSearchTag ? meals?.filter((meal) => meal.tags.includes(activeSearchTag)) : meals
		)
	);

	tags$ = this.mealsRepository.meals$.pipe(
		map((meals) => {
			const tags = new Set<string>();
			meals?.forEach((meal) => {
				meal.tags.forEach((tag) => tags.add(tag));
			});

			return tags;
		})
	);

	displayedColumns = ["name", "ingredients", "tags"];

	onAddNewMealClick(): void {
		this.dialog
			.open(EditMealComponent)
			.afterClosed()
			.pipe(filter(Boolean))
			.subscribe(async (meal: Meal) => {
				await this.mealsRepository.add(meal);
				await this.mealsRepository.fetch();
			});
	}

	onMealClick(data: Meal): void {
		this.dialog
			.open(EditMealComponent, { data })
			.afterClosed()
			.pipe(filter(Boolean))
			.subscribe(async (meal: Meal | { id: MealId; delete: true }) => {
				console.log(meal);
				if ("delete" in meal) {
					await this.mealsRepository.delete(meal.id);
					await this.mealsRepository.fetch();
				} else {
					await this.mealsRepository.update(meal);
					await this.mealsRepository.fetch();
				}
			});
	}

	setActiveSearchTag(event: MatChipSelectionChange, tag: string): void {
		event.selected ? this.activeSearchTag$$.next(tag) : this.activeSearchTag$$.next("");
	}
}
