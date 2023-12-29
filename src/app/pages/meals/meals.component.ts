import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { EditMealComponent } from "../../components/edit-meal/edit-meal.component";

@Component({
	selector: "app-meals",
	standalone: true,
	imports: [HeaderComponent, MatButtonModule, MatDialogModule],
	templateUrl: "./meals.component.html",
	styleUrl: "./meals.component.scss"
})
export class MealsComponent {
	private readonly dialog = inject(MatDialog);

	onNewMealDialogOpen() {
		this.dialog.open(EditMealComponent);
	}
}
