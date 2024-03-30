import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: "app-add-week",
	standalone: true,
	imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
	templateUrl: "./add-week.component.html",
	styleUrl: "./add-week.component.scss"
})
export class AddWeekComponent {
	private readonly dialogRef = inject(MatDialogRef<AddWeekComponent>);

	// TODO - add filter to datepicker to only be able to select mondays

	onSubmit(): void {} // TODO - deliver actual date
	onCancel(): void {
		this.dialogRef.close();
	}
}
