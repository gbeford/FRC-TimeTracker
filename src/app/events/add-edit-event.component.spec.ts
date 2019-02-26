import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEventComponent } from './add-edit-event.component';
import { EventsService } from './events.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddEditEventComponent', () => {
  let component: AddEditEventComponent;
  let fixture: ComponentFixture<AddEditEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddEditEventComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get the getEventsList from the service', () => {
  //   const eventService = fixture.debugElement.injector.get(EventsService);
  //   fixture.detectChanges();
  //   expect(eventService.getEventsList()).toEqual(component.showEvents);
  // });


  it('should create a new event post', () => {
    component.addEventForm.value.eventsTxtCtrl = 'Pie Bake';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('Pie Bake');
  });

  it('should disable the button when textArea is empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

});
