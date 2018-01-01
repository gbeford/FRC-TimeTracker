import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { TimeTrackerService } from './time-tracker.service';
import { IStudent } from './model/student';

@Component({
  selector: 'app-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  title = '';
  enterBtn = '';
  in = '';
  students: IStudent[];
  public timeTrackerForm: FormGroup;

  studentCtrl: FormControl = new FormControl();
  filteredOptions: Observable<IStudent[]>;

  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: TimeTrackerService) { }



  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
    this.checkIfSignedIn();
  }

  studentAutoComplete() {
    this.filteredOptions = this.studentCtrl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filterStudents(val))
      );
  }


  createForm() {
    console.log('here');
    this.timeTrackerForm = this.formBuilder.group({
      studentCtrl: ['', [<any>Validators.required]],
      // studentID: [''],
    });
  }

  getAllStudents() {
    this.timeTrackerService.getStudents().subscribe(s => {
      this.students = s;
      this.studentAutoComplete();
    });
  }

  filterStudents(fName: string) {
    return this.students.filter(students =>
      students.firstName.toLowerCase().indexOf(fName.toLowerCase()) === 0);
  }


  getStudentInfo(): Observable<IStudent[]> {
    return this.timeTrackerService.getStudent(this.timeTrackerForm.controls['studentID'].value);
  }


  checkIfSignedIn() {

    if (this.in || null) {
      this.enterBtn = 'In';
    } else {
      this.enterBtn = 'out';
    }
  }

  save() {

    // this.getStudentInfo().subscribe(s => {

    //   if () {
    //     this.timeTrackerService.saveStudentTime(s[0].studentId, in_time, out_time, timeTotal);
    //   }
    // });




  }

}
