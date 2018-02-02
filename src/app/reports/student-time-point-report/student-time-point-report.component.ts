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
  title = 'Student Time Report';
  studentName = '';
  totalHours = 0;
  totalPoints = 0;
  studentID = '';
  startDate: Date;
  endDate: Date;
  show = false;
  public studentTimeReportForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: TimeTrackerService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.studentTimeReportForm = this.formBuilder.group({
      inDate: ['', [<any>Validators.required]],
      outDate: ['', [<any>Validators.required]]
    });
  }


  run() {
    // get students data
    this.startDate = this.studentTimeReportForm.controls['inDate'].value;
    this.endDate = this.studentTimeReportForm.controls['outDate'].value;
    this.timeTrackerService.getStudentTimeTrackerInfo(this.studentID,
      this.startDate, this.endDate).subscribe(s => {
        this.report = s;
        console.log('values ' + this.studentID,
          this.studentTimeReportForm.controls['inDate'].value,
          this.studentTimeReportForm.controls['outDate'].value);
        console.log('report ', this.report);

        for (let i = 0; i < this.report.length; i++) {
          this.totalPoints = this.totalPoints + this.report[i].points;
          this.totalHours = this.totalHours + this.report[i].totalHrs;
        }
        this.totalHours = parseFloat(this.totalHours.toFixed(1));
        console.log('point total ' + this.totalPoints);
        console.log('hours total ' + this.totalHours);
      });

    this.timeTrackerService.getStudent(this.studentID).subscribe(s => {
      this.studentInfo = s;
      this.studentName = this.studentInfo[0].firstName + ' ' + this.studentInfo[0].lastName + '-' + this.studentInfo[0].studentId;
    });

    this.show = true;
  }

  submit() {
    this.studentTimeReportForm.reset();

    this.totalHours = 0;
    this.totalPoints = 0;
    this.studentName = '';
    this.show = false;
  }

  onNotify(value: string): void {
    // alert(message);
    this.studentID = value;
  }


}
