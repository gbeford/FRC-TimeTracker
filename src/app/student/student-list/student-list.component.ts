import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
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
