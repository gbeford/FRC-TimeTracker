import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDatepickerModule, MatSelectModule,
  MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSnackBarModule, MatTableModule, MatSortModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '@environment/environment';
import { ReportsComponent } from './reports/reports.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { StudentTimePointReportComponent } from './reports/student-time-point-report/student-time-point-report.component';
import { PointsFormComponent } from './forms/points-form/points-form.component';
import { AuthService } from './shared/auth.service';
import { EditStudentRecordComponent } from './forms/edit-student-record/edit-student-record.component';
import { AutoCompleteComponent } from './shared/auto-complete/auto-complete.component';
import { BadgeEntryComponent } from './forms/badge-entry/badge-entry.component';
import { TestSharedComponentsComponent } from './shared/test-shared-components/test-shared-components.component';
import { ShowMessageComponent } from './forms/show-message/show-message.component';
import { MessageListComponent } from './reports/message-list/message-list.component';
import { MessageService } from './forms/message.service';
import { StudentListComponent } from './reports/student-list/student-list.component';
import { BadgeViewComponent } from './badge-view/badge-view.component';
import { TimeTrackerService } from './forms/time-tracker/time-tracker.service';
import { TimeTrackerComponent } from './forms/time-tracker/time-tracker.component';
import { AddNewMessageComponent } from './forms/add-new-message/add-new-message.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
    ReportsComponent,
    MenuComponent,
    PageNotFoundComponent,
    HomeComponent,
    StudentTimePointReportComponent,
    PointsFormComponent,
    StudentListComponent,
    EditStudentRecordComponent,
    AutoCompleteComponent,
    BadgeEntryComponent,
    TestSharedComponentsComponent,
    AddNewMessageComponent,
    ShowMessageComponent,
    MessageListComponent,
    BadgeViewComponent,
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
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase_467_timeTracker),
    AngularFireAuthModule,
  ],
  providers: [TimeTrackerService,
    AuthService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
