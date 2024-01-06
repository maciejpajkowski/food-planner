import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";
import { HeaderComponent } from "../../components/header/header.component";
import { IngredientIdToNamePipe } from "../../pipes/ingredient-id-to-name.pipe";
import { FirebaseClientService } from "../../services/firebase-client.service";
import { MealsRepository } from "../../services/meals-repository.service";
import { Meal } from "../../types/meal.types";

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
export class MealsComponent implements OnInit {
	private readonly dialog = inject(MatDialog);
	private readonly mealsRepository = inject(MealsRepository);
	private readonly firestore = inject(Firestore);
	private readonly auth = inject(Auth);
	private readonly firebaseClient = inject(FirebaseClientService);

	meals$ = this.mealsRepository.meals$;

	displayedColumns = ["title", "ingredients", "tags"];

	ngOnInit(): void {
		this.mealsRepository.fetchMeals();
	}

	onAddNewMealClick(): void {
		this.dialog
			.open(EditMealComponent)
			.afterClosed()
			.subscribe(async (result: Meal) => {
				if (!result) return;

				await this.mealsRepository.addMeal(result);
				await this.mealsRepository.fetchMeals();
			});
	}

	onMealClick(data: Meal): void {
		this.dialog
			.open(EditMealComponent, { data })
			.afterClosed()
			.subscribe(async (result: Meal) => {
				if (!result) return;

				await this.firebaseClient.addOrUpdateDoc("meals", result);
				await this.mealsRepository.fetchMeals();
			});
	}
}
