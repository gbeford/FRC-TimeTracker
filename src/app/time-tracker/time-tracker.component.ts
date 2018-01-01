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
      // startWith(''),
      startWith({} as IStudent),
      map(students => students && typeof students === 'object' ? students.firstName : students),
      map(firstName => firstName ? this.filterStudents(firstName) : this.students.slice())
      // map(val => this.filterStudents(val))
      );
  }

  filterStudents(fName: string): IStudent[] {
    return this.students.filter(students =>
      students.firstName.toLowerCase().indexOf(fName.toLowerCase()) === 0);
  }

  displayFn(student: IStudent): string {
    return student ? student.firstName + ' ' + student.lastName : '';
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
      console.log(this.selectedStudent.status);
      if (this.selectedStudent.status === 'in' || this.selectedStudent.status === undefined) {
        this.enterBtn = 'In';
      } else {
        this.enterBtn = 'Out';
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
