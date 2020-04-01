import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'app/events/events.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TitleCasePipe } from '@angular/common';
import { IEvent } from 'app/model/event';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {
  public addEventForm: FormGroup;
  dataSource: MatTableDataSource<any>; // EventDataSource;
  displayedColumns = ['editEvent', 'eventId', 'eventText', 'removeEvent'];
  success = false;
  error = false;  // TODO set error alert when add/delete doesnt work
  alertMessage: string;


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private eventService: EventsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private titlecasePipe: TitleCasePipe) { }


  ngOnInit() {
    this.createForm();
    this.showEvents();
  }

  alerttNotify() {
    this.success = false;
  }


  showEvents() {
    this.eventService.getEventsList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
    });
  }

  get eventText() {
    return this.addEventForm.get('eventsTxtCtrl');
  }

  private createForm() {
    this.addEventForm = this.formBuilder.group({
      eventsTxtCtrl: ['', Validators.required]
    });
  }

  submit() {
    // console.log('Submit ', this.addEventForm.value.eventsTxtCtrl);

    if (this.addEventForm.valid) {
      this.eventService.saveEvent(
        this.titlecasePipe.transform(
          this.addEventForm.value.eventsTxtCtrl)).subscribe(res => {
            this.addEventForm.reset();
            this.showEvents();
            this.alertMessage = 'Event was added successfully.';
            this.success = true;
          });
    }
  }

  update(el: IEvent, newEvent: string) {
    if (newEvent == null) { return; }
    this.eventService.editEventRecord(el.eventID, this.titlecasePipe.transform(newEvent)).subscribe(res => {
      this.showEvents();
    });
  }

  deleteEvent(el: number) {
    this.eventService.deleteEventRecord(el).subscribe((data) => {
      this.alertMessage = 'Event was deleted successfully.';
      this.success = true;
      this.showEvents();
      this.addEventForm.reset();
    });
  }

}
