
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { StudentTimePointReportComponent } from './reports/student-time-point-report/student-time-point-report.component';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentRecordComponent } from './forms/edit-student-record/edit-student-record.component';
import { NgModule } from '@angular/core';




@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'trackTime', component: TimeTrackerComponent },
            { path: 'studentTimeReport', component: StudentTimePointReportComponent },
            { path: 'studentlist', component: StudentListComponent },
            { path: 'studentEditForm', component: EditStudentRecordComponent },
            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
