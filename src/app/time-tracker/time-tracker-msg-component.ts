import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-time-tracker-msg-component',
    templateUrl: 'time-tracker-msg-component.html',
    styleUrls: ['./time-tracker.component.scss']
})

export class TimeTrackerMsgComponent {

    constructor(
        public dialogRef: MatDialogRef<TimeTrackerMsgComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

}
