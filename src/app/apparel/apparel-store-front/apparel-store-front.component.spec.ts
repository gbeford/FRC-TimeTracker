import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApparelOrderFormComponent } from './apparel-store-front.component';

describe('ApparelOrderFormComponent', () => {
  let component: ApparelOrderFormComponent;
  let fixture: ComponentFixture<ApparelOrderFormComponent>;

  beforeEach(waitForAsync(() => {
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
