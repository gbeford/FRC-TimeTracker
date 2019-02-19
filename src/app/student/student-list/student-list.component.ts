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

  displayedColumns = ['studentId', 'status', 'lastName', 'firstName', 'email', 'grade', 'messages'];
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

