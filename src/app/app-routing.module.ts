import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';




@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'trackTime', component: TimeTrackerComponent },
            { path: '**', component: PageNotFoundComponent }
        ]),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
