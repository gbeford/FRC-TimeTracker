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
  eventList: IEvent[];
  displayedColumns = ['editMessage', 'eventText'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private eventService: EventsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private titlecasePipe: TitleCasePipe) { }


  ngOnInit() {
    this.createForm();
    this.showEvents();
  }

  showEvents() {
    this.eventService.getEventsList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.changeDetectorRefs.detectChanges();
      console.log('show events ', data);
    });
  }

  get eventText() { return this.addEventForm.get('eventsTxtCtrl'); }

  private createForm() {
    this.addEventForm = this.formBuilder.group({
      eventsTxtCtrl: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.addEventForm.value.eventsTxtCtrl);

    if (this.addEventForm.valid) {
      this.eventService.saveEvent(
        this.titlecasePipe.transform(
          this.addEventForm.value.eventsTxtCtrl)).subscribe(res => {
            this.addEventForm.reset();
            this.showEvents();
          });
    }
  }

  update(el: IEvent, newEvent: string) {
    debugger
    if (newEvent == null) { return; }
    console.log('popup ', newEvent);
    console.log('IMessage ', el);

    this.eventService.editEventRecord(el.eventID, newEvent).subscribe();
  }



}
