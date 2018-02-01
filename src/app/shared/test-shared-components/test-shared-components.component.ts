import { Component, OnInit } from '@angular/core';
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-shared-components',
  templateUrl: './test-shared-components.component.html',
  styleUrls: ['./test-shared-components.component.css']
})
export class TestSharedComponentsComponent implements OnInit {

  public testPage: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onNotify(message: string): void {
    alert(message);
  }

}
