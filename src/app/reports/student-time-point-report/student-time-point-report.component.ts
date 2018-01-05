import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ITimeTracker } from '../../time-tracker/model/time-tracker';
import { TimeTrackerService } from '../../time-tracker/time-tracker.service';
import { IStudent } from '../../time-tracker/model/student';


@Component({
  selector: 'app-student-time-point-report',
  templateUrl: './student-time-point-report.component.html',
  styleUrls: ['./student-time-point-report.component.css']
})
export class StudentTimePointReportComponent implements OnInit {

  report: ITimeTracker[];
  studentInfo: IStudent[];
  title = 'Get Student Hours & Points';
  studentName = '';
  totalHours = 0;
  totalPoints = 0;
  studentID = '';
  show = false;
  public studentTimeReportForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: TimeTrackerService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    console.log('here');
    this.studentTimeReportForm = this.formBuilder.group({
      studentId: ['', [<any>Validators.required, <any>Validators.maxLength(7)]],
      inDate: ['', [<any>Validators.required]],
      outDate: ['', [<any>Validators.required]]

    });
  }


  run() {
    // get students data
    this.timeTrackerService.getStudentTimeTrackerInfo(this.studentTimeReportForm.controls['studentId'].value,
      this.studentTimeReportForm.controls['inDate'].value, this.studentTimeReportForm.controls['outDate'].value).subscribe(s => {
        this.report = s;
        console.log('values ' + this.studentTimeReportForm.controls['studentId'].value,
          this.studentTimeReportForm.controls['inDate'].value,
          this.studentTimeReportForm.controls['outDate'].value);
        console.log('report ', this.report);

        for (let i = 0; i < this.report.length; i++) {
          console.log(i);
          this.totalPoints = this.totalPoints + this.report[i].points;
          console.log('hours total ' + this.totalHours);
          this.totalHours = this.totalHours + this.report[i].totalHrs;
        }
        console.log('point total ' + this.totalPoints);
        console.log('hours total ' + this.totalHours);
      });

    this.timeTrackerService.getStudent(this.studentTimeReportForm.controls['studentId'].value).subscribe(s => {
      this.studentInfo = s;
      this.studentName = this.studentInfo[0].firstName + ' ' + this.studentInfo[0].lastName + ' ' + this.studentInfo[0].studentId;
    });
    console.log('student  ' + this.studentName);
    console.log('show   ' + this.show);
    this.show = true;
  }


}
