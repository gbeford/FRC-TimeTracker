import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { StudentService } from '../student.service';
import { Student } from '../../model/student';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any>; // StudentsDataSource;

  displayedColumns = ['studenId', 'status', 'lastName', 'firstName', 'email', 'grade', 'messages'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sls: StudentService) { }

  ngAfterViewInit() {

    this.getStudentList();
  }


  private getStudentList() {

    this.sls.getStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;

    });
  }


}



export class StudentsDataSource extends DataSource<any> {
  constructor(private students: Observable<Student[]>) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Student[]> {
    return this.students;
  }

  disconnect() { }
}
