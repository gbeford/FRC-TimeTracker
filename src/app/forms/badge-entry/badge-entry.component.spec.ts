import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeEntryComponent } from './badge-entry.component';

describe('BadgeEntryComponent', () => {
  let component: BadgeEntryComponent;
  let fixture: ComponentFixture<BadgeEntryComponent>;

  beforeEach(async(() => {
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
