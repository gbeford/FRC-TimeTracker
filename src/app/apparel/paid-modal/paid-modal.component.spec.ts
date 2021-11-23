import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaidModalComponent } from './paid-modal.component';

describe('PaidModalComponent', () => {
  let component: PaidModalComponent;
  let fixture: ComponentFixture<PaidModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
