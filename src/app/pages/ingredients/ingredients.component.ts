import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { EditIngredientComponent } from "../../components/edit-ingredient/edit-ingredient.component";

@Component({
	selector: "app-ingredients",
	standalone: true,
	imports: [HeaderComponent, MatButtonModule, MatDialogModule],
	templateUrl: "./ingredients.component.html",
	styleUrl: "./ingredients.component.scss"
})
export class IngredientsComponent {
	private readonly dialog = inject(MatDialog);

	onNewIngredientDialogOpen() {
		this.dialog.open(EditIngredientComponent);
	}
}
