import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';

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
  selectedStudent: IStudent;
  public timeTrackerForm: FormGroup;

  studentCtrl: FormControl = new FormControl();
  filteredOptions: Observable<IStudent[]>;

  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: TimeTrackerService) { }


  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
    this.watchStudent();
  }

  createForm() {
    console.log('here');
    this.timeTrackerForm = this.formBuilder.group({
      studentCtrl: ['', [<any>Validators.required]],
      // studentID: [''],
    });
  }

  // get list of students for autoComplete
  getAllStudents() {
    this.timeTrackerService.getStudents().subscribe(s => {
      this.students = s;
      this.studentAutoComplete();
    });
  }

  studentAutoComplete() {
    this.filteredOptions = this.studentCtrl.valueChanges
      .pipe(
      debounceTime(200),
      startWith(this.studentCtrl.value),
      map(val => this.displayFn(val)),
      map(val => this.filterStudents(val))
      );
  }

  filterStudents(fName: string): IStudent[] {
    return fName && typeof fName === 'string' ?
      this.students.filter(student =>
        student.firstName.toLowerCase().indexOf(fName.toLowerCase()) === 0)
      : this.students;
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? `${value.firstName} ${value.lastName}` : value;
  }

  watchStudent() {
    this.studentCtrl.valueChanges.subscribe(s => {
      this.selectedStudent = s;
      this.checkIfSignedIn();
    });
  }


  getStudentById(): Observable<IStudent[]> {
    return this.timeTrackerService.getStudent(this.timeTrackerForm.controls['studentID'].value);
  }


  checkIfSignedIn() {
    if (this.selectedStudent) {
      console.log(this.selectedStudent);
      if (this.selectedStudent.status === 'in' || this.selectedStudent.status === undefined) {
        this.enterBtn = 'Sign In';
      } else {
        this.enterBtn = 'Sign Out';
      }
    }
  }

  save() {
    if (this.selectedStudent.status === 'in' || this.selectedStudent.status === undefined) {
      this.timeTrackerService.saveStudentTime(this.selectedStudent);
    } else {
      this.timeTrackerService.updateStudentTime(this.selectedStudent);
    }

    this.studentCtrl.reset();

  }



  // this.getStudentInfo().subscribe(s => {

  //   if () {
  //     this.timeTrackerService.saveStudentTime(s[0].studentId, in_time, out_time, timeTotal);
  //   }
  // });
}
