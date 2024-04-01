import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { EditIngredientComponent } from "../../components/edit-ingredient/edit-ingredient.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MealIdToNamePipe } from "../../pipes/meal-id-to-name.pipe";
import { IngredientsRepository } from "../../services/ingredients-repository.service";
import { Ingredient, IngredientId } from "../../types/ingredient.types";
import { filter } from "rxjs";

@Component({
	selector: "app-ingredients",
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		MatButtonModule,
		MatDialogModule,
		MatDividerModule,
		MatTableModule,
		MatChipsModule,
		MealIdToNamePipe
	],
	templateUrl: "./ingredients.component.html",
	styleUrl: "./ingredients.component.scss"
})
export class IngredientsComponent {
	private readonly dialog = inject(MatDialog);
	private readonly ingredientsRepository = inject(IngredientsRepository);

	ingredients$ = this.ingredientsRepository.ingredients$;

	displayedColumns = ["name", "meals"];

	onNewIngredientDialogOpen() {
		this.dialog
			.open(EditIngredientComponent)
			.afterClosed()
			.pipe(filter(Boolean))
			.subscribe(async (ingredient: Ingredient) => {
				await this.ingredientsRepository.add(ingredient);
				await this.ingredientsRepository.fetch();
			});
	}

	onIngredientClick(data: Ingredient): void {
		this.dialog
			.open(EditIngredientComponent, { data })
			.afterClosed()
			.pipe(filter(Boolean))
			.subscribe(async (ingredient: Ingredient | { id: IngredientId; delete: true }) => {
				if ("delete" in ingredient) {
					await this.ingredientsRepository.delete(ingredient.id);
					await this.ingredientsRepository.fetch();
				} else {
					await this.ingredientsRepository.update(ingredient);
					await this.ingredientsRepository.fetch();
				}
			});
	}
}
