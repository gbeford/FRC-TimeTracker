import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BadgeEntryComponent } from './badge-entry.component';

describe('BadgeEntryComponent', () => {
  let component: BadgeEntryComponent;
  let fixture: ComponentFixture<BadgeEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
