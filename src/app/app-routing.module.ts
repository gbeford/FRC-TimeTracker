
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentTimePointReportComponent } from './student/student-time-point-report/student-time-point-report.component';
import { EditStudentRecordComponent } from './admin/edit-student-record/edit-student-record.component';
import { TestSharedComponentsComponent } from './shared/test-shared-components/test-shared-components.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { ShowMessageComponent } from './message/show-message/show-message.component';
import { EditMessageComponent } from './message/edit-message/edit-message.component';
import { ApplyPointsToStudentComponent } from 'points/apply-points-to-student/apply-points-to-student.component';
import { BadgeViewComponent } from './admin/badge/badge-view/badge-view.component';
import { LoginComponent } from './security/login.component';



@NgModule({

    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'trackTime', component: TimeTrackerComponent},
            { path: 'studentTimeReport', component: StudentTimePointReportComponent },
            { path: 'studentlist', component: StudentListComponent },
            { path: 'studentEditForm', component: EditStudentRecordComponent },
            { path: 'messageStudent', component: ShowMessageComponent },
            { path: 'messageList', component: MessageListComponent },
            { path: 'badges', component: BadgeViewComponent },
            { path: 'message', component: EditMessageComponent },
            { path: 'message/:id', component: EditMessageComponent },
            { path: 'applyPoints', component: ApplyPointsToStudentComponent },

            { path: 'test', component: TestSharedComponentsComponent },
            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
