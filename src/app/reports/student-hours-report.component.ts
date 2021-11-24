import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReportsService } from './reports.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// https://material.angular.io/components/paginator/examples
// https://github.com/alhazmy13/angular-csv/blob/master/README.md  -- export to csv
// https://www.npmjs.com/package/angular5-csv


@Component({
  selector: 'app-student-hours-report',
  templateUrl: './student-hours-report.component.html',
  styleUrls: ['./student-hours-report.component.scss']
})

export class StudentHoursReportComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  studentAttendanceForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['studentId', 'firstName', 'lastName', 'createDateTime', 'checkIn', 'checkOut'];
  reportResults: any;
  showExport = true;

  constructor(private formBuilder: FormBuilder, private reportService: ReportsService) { }

  ngOnInit() {
    this.createForm();
  }

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
            console.log('data ', data);
            this.reportResults = data;
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
          });
      this.studentAttendanceForm.reset();
      this.showExport = false;
    }
  }

  exportToCsv() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      noDownload: false,
      headers: ['SchoolID', 'FirstName', 'LastName', 'CreatedDate', 'CheckIn', 'CheckOut']
    };
    const result = [];

    this.reportResults.map(r => {

      for (let i = 0; i < this.reportResults.length; i++) {
        // create class to create the new object
        r.createDate = r.times[i].createDateTime;
        r.checkIn = r.times[i].checkIn;
        r.checkOut = r.times[i].checkOut;

      }
      return r;
    });

  }

}
