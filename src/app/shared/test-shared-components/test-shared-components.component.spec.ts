import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedComponentsComponent } from './test-shared-components.component';

describe('TestSharedComponentsComponent', () => {
  let component: TestSharedComponentsComponent;
  let fixture: ComponentFixture<TestSharedComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSharedComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSharedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
