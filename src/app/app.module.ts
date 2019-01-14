import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDatepickerModule, MatSelectModule,
  MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSnackBarModule, MatTableModule, MatSortModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { environment } from '@environment/environment';
import { TitleCasePipe } from '@angular/common';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { InlineEditComponent } from './message/edit-message/inline-edit.component';

import { ReportsComponent } from './reports/reports.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { StudentTimePointReportComponent } from './student/student-time-point-report/student-time-point-report.component';

import { EditStudentRecordComponent } from './admin/edit-student-record/edit-student-record.component';
import { AutoCompleteComponent } from './shared/auto-complete/auto-complete.component';
import { TestSharedComponentsComponent } from './shared/test-shared-components/test-shared-components.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentService } from './student/student.service';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { EditMessageComponent } from './message/edit-message/edit-message.component';
import { ShowMessageComponent } from './message/show-message/show-message.component';
import { MessageService } from './message/message.service';
import { TimeTrackerMsgComponent } from './time-tracker/time-tracker-msg-component';
import { ApplyPointsToStudentComponent } from 'points/apply-points-to-student/apply-points-to-student.component';
import { AddNewPointComponent } from 'points/add-new-point/add-new-point.component';
import { PointService } from 'points/point.service';
import { BadgeEntryComponent } from './admin/badge/badge-entry/badge-entry.component';
import { BadgeViewComponent } from './admin/badge/badge-view/badge-view.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusPipe } from './shared/filters/status.pipe';
import { AlertComponent } from './alert/alert.component';

import { SecurityService } from './security/security.service';
import { LoginComponent } from './security/login.component';
import { HttpInterceptorModule } from './security/http-interceptor';
import { HasClaimDirective } from './security/has-claim.directive';
import { AddEditEventComponent } from './events/add-edit-event.component';
import { EventsService } from './events/events.service';


@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
    ReportsComponent,
    MenuComponent,
    PageNotFoundComponent,
    HomeComponent,
    StudentTimePointReportComponent,
    StudentListComponent,
    EditStudentRecordComponent,
    AutoCompleteComponent,
    BadgeEntryComponent,
    TestSharedComponentsComponent,
    EditMessageComponent,
    ShowMessageComponent,
    MessageListComponent,
    BadgeViewComponent,
    TimeTrackerMsgComponent,
    ApplyPointsToStudentComponent,
    AddNewPointComponent,
    StatusPipe,
    InlineEditComponent,
    AlertComponent,
    LoginComponent,
    HasClaimDirective,
    AddEditEventComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    SatPopoverModule,
    HttpInterceptorModule
  ],
  providers: [StudentService,
    MessageService,
    PointService,
    TitleCasePipe,
    EventsService,
    SecurityService,
  ],
  entryComponents: [TimeTrackerMsgComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
