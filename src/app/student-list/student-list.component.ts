import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStudent } from '../time-tracker/model/student';
import { TimeTrackerService } from '../time-tracker/time-tracker.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Observable<IStudent[]>;
  dataSource: StudentsDataSource;

  displayedColumns = ['studentId', 'lastName', 'firstName', 'email', 'grade', 'status'];

  constructor(private sls: TimeTrackerService) { }

  ngOnInit() {
    this.students = this.sls.getStudentsByLastname();
    this.dataSource = new StudentsDataSource(this.students);
  }

}

export class StudentsDataSource extends DataSource<any> {
  constructor(private students: Observable<IStudent[]>) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IStudent[]> {
    return this.students;
  }

  disconnect() { }
}
