import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReportsService } from './reports.service';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';

// https://material.angular.io/components/paginator/examples


@Component({
  selector: 'app-student-hours-report',
  templateUrl: './student-hours-report.component.html',
  styleUrls: ['./student-hours-report.component.scss']
})
export class StudentHoursReportComponent implements OnInit {
  public studentAttendanceForm: FormGroup;
  dataSource: MatTableDataSource<any>;

  displayedColumns = ['studentId', 'firstName', 'lastName', 'createDateTime', 'checkIn', 'checkOut'];
  @ViewChild(MatSort) sort: MatSort;

  // MatPaginator Inputs
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  constructor(private formBuilder: FormBuilder, private reportService: ReportsService) { }

  ngOnInit() {
    this.createForm();
  }

  // MatPaginator Output
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }

  createForm() {
    this.studentAttendanceForm = this.formBuilder.group({
      startDateCtrl: ['', [<any>Validators.required]],
      endDateCtrl: ['', [<any>Validators.required]]
    });
  }
  submit() {
    if (this.studentAttendanceForm.valid) {
      this.reportService.getStudentAttendance(
        this.studentAttendanceForm.value.startDateCtrl.toISOString(), this.studentAttendanceForm.value.endDateCtrl.toISOString())
        .subscribe(
          data => {
            // console.log('hours ', data);
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
          });
      this.studentAttendanceForm.reset();
    }
  }


}
