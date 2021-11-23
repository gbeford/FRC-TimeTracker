import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BadgeViewComponent } from './badge-view.component';

describe('BadgeViewComponent', () => {
  let component: BadgeViewComponent;
  let fixture: ComponentFixture<BadgeViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
