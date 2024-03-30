import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
	MAT_DATE_RANGE_SELECTION_STRATEGY,
	MatDatepickerModule
} from "@angular/material/datepicker";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { WeekRangeSelectionStrategy } from "./week-range-selection.strategy";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { eachDayOfInterval } from "date-fns";

@Component({
	selector: "app-add-week",
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule
	],
	providers: [
		{
			provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
			useClass: WeekRangeSelectionStrategy
		}
	],
	templateUrl: "./add-week.component.html",
	styleUrl: "./add-week.component.scss"
})
export class AddWeekComponent {
	private readonly dialogRef = inject(MatDialogRef<AddWeekComponent>);

	range = new FormGroup({
		start: new FormControl<Date | null>(null),
		end: new FormControl<Date | null>(null)
	});

	onSubmit(): void {
		const start = this.range.value.start;
		const end = this.range.value.end;
		if (start && end) {
			this.dialogRef.close(eachDayOfInterval({ start, end }));
		} else {
			this.dialogRef.close([]);
		}
	}

	onCancel(): void {
		this.dialogRef.close();
	}
}
