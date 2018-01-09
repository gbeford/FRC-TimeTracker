import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentRecordComponent } from './edit-student-record.component';

describe('EditStudentRecordComponent', () => {
  let component: EditStudentRecordComponent;
  let fixture: ComponentFixture<EditStudentRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
