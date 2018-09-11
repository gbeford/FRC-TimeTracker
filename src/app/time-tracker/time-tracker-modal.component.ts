import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-time-tracker-modal-component',
    templateUrl: 'time-tracker-modal.component.html',
    styleUrls: ['./time-tracker.component.css']
})

export class TimeTrackerModalComponent {

    constructor(
        public dialogRef: MatDialogRef<TimeTrackerModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

}
