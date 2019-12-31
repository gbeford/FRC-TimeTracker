import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDatepickerModule, MatSelectModule,
  MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSnackBarModule, MatTableModule, MatSortModule,
  MatCheckboxModule, MatDialogModule, MatPaginatorModule, MatBadgeModule
} from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { environment } from '@environment/environment';
import { TitleCasePipe } from '@angular/common';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { InlineEditComponent } from './shared/inline-edit/inline-edit.component';

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
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { ApparelStoreFrontComponent } from './apparel/apparel-store-front/apparel-store-front.component';
import { ApparelOrdersReportComponent } from './apparel/apparel-orders-report/apparel-orders-report.component';
import { AlertMessageComponent } from './shared/alert-message/alert-message.component';
import { AddApparelComponent } from './apparel/add-apparel/add-apparel.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { ImageUploadFormComponent } from './apparel/image-upload-form.component';
import { StudentHoursReportComponent } from './reports/student-hours-report.component';
import { ReportsService } from './reports/reports.service';
import { OrderConfirmationComponent } from './apparel/order-confirmation/order-confirmation.component';
import { CheckoutComponent } from './apparel/checkout/checkout.component';
import { ApparelCardComponent } from './apparel/apparel-card/apparel-card.component';
import { GuertinReportComponent } from './apparel/guertin-report/guertin-report.component';
import { UnpaidOrdersComponent } from './apparel/unpaid-orders/unpaid-orders.component';
import { PaidModalComponent } from './apparel/paid-modal/paid-modal.component';

// import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';



@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
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
    SignUpFormComponent,
    ApparelStoreFrontComponent,
    ApparelOrdersReportComponent,
    AlertMessageComponent,
    AddApparelComponent,
    ImageUploadComponent,
    ImageUploadFormComponent,
    StudentHoursReportComponent,
    OrderConfirmationComponent,
    CheckoutComponent,
    ApparelCardComponent,
    GuertinReportComponent,
    UnpaidOrdersComponent,
    PaidModalComponent,

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
    MatPaginatorModule,
    MatBadgeModule,
    AppRoutingModule,
    HttpClientModule,
    SatPopoverModule,
    HttpInterceptorModule,
    // Angular5Csv
  ],
  providers: [
    StudentService,
    MessageService,
    PointService,
    TitleCasePipe,
    EventsService,
    SecurityService,
    ReportsService,
  ],
  entryComponents: [TimeTrackerMsgComponent, PaidModalComponent],
  bootstrap: [AppComponent]

})
export class AppModule { }
