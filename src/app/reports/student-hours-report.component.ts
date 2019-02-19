import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReportsService } from './reports.service';
import { MatSort, MatTableDataSource } from '@angular/material';

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
            console.log('hours ', data);
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
          });
      this.studentAttendanceForm.reset();
    }
  }


}
