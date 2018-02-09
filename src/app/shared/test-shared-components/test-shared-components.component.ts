import { Component, OnInit } from '@angular/core';
// import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStudent } from 'app/model/student';

@Component({
  selector: 'app-test-shared-components',
  templateUrl: './test-shared-components.component.html',
  styleUrls: ['./test-shared-components.component.css']
})
export class TestSharedComponentsComponent implements OnInit {

  public testPage: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

  }

  onNotify(message: IStudent): void {
    alert(message.studentId);
  }

  buildForm() {

    // this creates the form that the reusable component (autocomple) will go to
    this.testPage = this.formBuilder.group({
    });
  }


}
