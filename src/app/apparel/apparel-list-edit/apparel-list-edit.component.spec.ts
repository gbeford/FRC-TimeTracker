import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelListEditComponent } from './apparel-list-edit.component';

describe('ApparelListEditComponent', () => {
  let component: ApparelListEditComponent;
  let fixture: ComponentFixture<ApparelListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
