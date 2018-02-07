import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IStudent } from '../../model/student';
import { TimeTrackerService } from '../../forms/time-tracker/time-tracker.service';



@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input() autoCompleteForm: FormGroup;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  filteredOptions: Observable<IStudent[]>;
  students: IStudent[];
  studentCtrl: FormControl;
  student_id: number;

  constructor(private timeTrackerService: TimeTrackerService) { }

  ngOnInit() {
    this.getAllStudents();
    // this creates the control with validation
    this.studentCtrl = new FormControl('', Validators.required);
    // this is to set up the control that will be added to the form
    this.autoCompleteForm.addControl('studentAutoComplete', this.studentCtrl);
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

  displayFn(value: any): string {
    return value && typeof value === 'object' ? `${value.firstName} ${value.lastName}` : value;
  }

  filterStudents(fName: string): IStudent[] {
    return fName && typeof fName === 'string' ?
      this.students.filter(student =>
        student.firstName.toLowerCase().indexOf(fName.toLowerCase()) === 0)
      : this.students;
  }

  // this should get the student info from the autocomplete control
  getStudentInfo(value) {
    console.log(value.source.value.studentId);
    this.notify.emit(value.source.value.studentId);
  }

}
