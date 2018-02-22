
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentTimePointReportComponent } from './reports/student-time-point-report/student-time-point-report.component';
import { EditStudentRecordComponent } from './forms/edit-student-record/edit-student-record.component';
import { TestSharedComponentsComponent } from './shared/test-shared-components/test-shared-components.component';
import { MessageListComponent } from './reports/message-list/message-list.component';
import { StudentListComponent } from './reports/student-list/student-list.component';
import { TimeTrackerComponent } from './forms/time-tracker/time-tracker.component';
import { ShowMessageComponent } from './forms/message/show-message/show-message.component';
import { AddNewMessageComponent } from './forms/message/add-new-message/add-new-message.component';
import { ApplyPointsToStudentComponent } from 'app/forms/points/apply-points-to-student/apply-points-to-student.component';
import { BadgeViewComponent } from './forms/badge/badge-view/badge-view.component';
import { CanActivateViaAuthGuardService } from './shared/can-activate-via-auth-guard.service';



@NgModule({

    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'trackTime', component: TimeTrackerComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'studentTimeReport', component: StudentTimePointReportComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'studentlist', component: StudentListComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'studentEditForm', component: EditStudentRecordComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'messageStudent', component: ShowMessageComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'messageList', component: MessageListComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'badges', component: BadgeViewComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'addMessage', component: AddNewMessageComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: 'applyPoints', component: ApplyPointsToStudentComponent, canActivate: [CanActivateViaAuthGuardService] },

            { path: 'test', component: TestSharedComponentsComponent, canActivate: [CanActivateViaAuthGuardService] },
            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
