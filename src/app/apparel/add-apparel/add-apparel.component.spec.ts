import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApparelComponent } from './add-apparel.component';

describe('AddEditApparelComponent', () => {
  let component: AddApparelComponent;
  let fixture: ComponentFixture<AddApparelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApparelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApparelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
