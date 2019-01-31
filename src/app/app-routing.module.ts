
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
// import { ApplyPointsToStudentComponent } from 'points/apply-points-to-student/apply-points-to-student.component';
// import { BadgeViewComponent } from './admin/badge/badge-view/badge-view.component';
import { LoginComponent } from './security/login.component';
import { AuthGuard } from './security/auth.guard';
import { AddEditEventComponent } from './events/add-edit-event.component';



@NgModule({

    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            {
                path: 'trackTime',
                component: TimeTrackerComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Student' }
            },
            {
                path: 'studentTimeReport',
                component: StudentTimePointReportComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Student' } },
            {
                path: 'studentlist',
                component: StudentListComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Student' }
            },
            {
                path: 'studentEditForm',
                component: EditStudentRecordComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Admin' }
            },
            {
                path: 'messageStudent',
                component: ShowMessageComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Admin' }
            },
            {
                path: 'messageList',
                component: MessageListComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Student' }
            },

            {
                path: 'message',
                component: EditMessageComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Admin' }
            },
            {
                path: 'message/:id',
                component: EditMessageComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Admin' }
            },
            {
                path: 'event',
                component: AddEditEventComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Admin' }
            },
            {
                path: 'event/:id',
                component: AddEditEventComponent,
                canActivate: [AuthGuard],
                data: { claim: 'canAccess_Admin' }
            },
            {
                path: 'test',
                component: TestSharedComponentsComponent,
            },

            // { path: 'badges', component: BadgeViewComponent },
            // { path: 'applyPoints', component: ApplyPointsToStudentComponent },
            { path: 'test', component: TestSharedComponentsComponent },
            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
