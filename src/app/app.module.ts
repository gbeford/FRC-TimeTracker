import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDatepickerModule,
  MatFormFieldModule, MatNativeDateModule, MatInputModule
} from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ReportsComponent } from './reports/reports.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { TimeTrackerService } from './time-tracker/time-tracker.service';

@NgModule({
  declarations: [
    AppComponent,
    TimeTrackerComponent,
    ReportsComponent,
    MenuComponent,
    PageNotFoundComponent,
    HomeComponent
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
    MatInputModule,
    MatDatepickerModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase_467_timeTracker),
    AngularFireAuthModule,
  ],
  providers: [TimeTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
