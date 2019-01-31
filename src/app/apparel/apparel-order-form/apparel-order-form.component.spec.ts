import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelOrderFormComponent } from './apparel-order-form.component';

describe('ApparelOrderFormComponent', () => {
  let component: ApparelOrderFormComponent;
  let fixture: ComponentFixture<ApparelOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApparelOrderFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
