import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { IStudent } from '../time-tracker/model/student';
import { TimeTrackerService } from '../time-tracker/time-tracker.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any>; // StudentsDataSource;

  displayedColumns = ['studentId', 'status', 'lastName', 'firstName', 'email', 'grade'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sls: TimeTrackerService) { }

  ngAfterViewInit() {
    this.sls.getAllStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;

    });
    // this.dataSource = new StudentsDataSource(this.students);
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
