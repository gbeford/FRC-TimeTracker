
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentTimePointReportComponent } from './reports/student-time-point-report/student-time-point-report.component';
import { EditStudentRecordComponent } from './forms/edit-student-record/edit-student-record.component';
import { TestSharedComponentsComponent } from './shared/test-shared-components/test-shared-components.component';
import { MessageListComponent } from './reports/message-list/message-list.component';
import { StudentListComponent } from './reports/student-list/student-list.component';
import { BadgeViewComponent } from './badge-view/badge-view.component';
import { TimeTrackerComponent } from './forms/time-tracker/time-tracker.component';
import { ShowMessageComponent } from './forms/message/show-message/show-message.component';
import { AddNewMessageComponent } from './forms/message/add-new-message/add-new-message.component';


@NgModule({

    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'trackTime', component: TimeTrackerComponent },
            { path: 'studentTimeReport', component: StudentTimePointReportComponent },
            { path: 'studentlist', component: StudentListComponent },
            { path: 'studentEditForm', component: EditStudentRecordComponent },
            { path: 'messageStudent', component: ShowMessageComponent },
            { path: 'messageList', component: MessageListComponent },
            { path: 'badges', component: BadgeViewComponent },
            { path: 'addMessage', component: AddNewMessageComponent },
            { path: 'test', component: TestSharedComponentsComponent },

            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
