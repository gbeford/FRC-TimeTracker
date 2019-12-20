import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelCardComponent } from './apparel-card.component';

describe('ApparelCardComponent', () => {
  let component: ApparelCardComponent;
  let fixture: ComponentFixture<ApparelCardComponent>;

  beforeEach(async(() => {
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
