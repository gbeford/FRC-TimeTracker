import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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


}
