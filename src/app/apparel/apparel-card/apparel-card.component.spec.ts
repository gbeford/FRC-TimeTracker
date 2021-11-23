import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApparelCardComponent } from './apparel-card.component';

describe('ApparelCardComponent', () => {
  let component: ApparelCardComponent;
  let fixture: ComponentFixture<ApparelCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
