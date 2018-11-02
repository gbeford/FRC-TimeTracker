import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ITimeTracker } from '../../model/time-tracker';
import { Student } from '../../model/student';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-time-point-report',
  templateUrl: './student-time-point-report.component.html',
  styleUrls: ['./student-time-point-report.component.css']
})
export class StudentTimePointReportComponent implements OnInit {

  report: ITimeTracker[];
  studentInfo: Student[];
  title = 'Student Time Report';
  studentName = '';
  totalHours = 0;
  totalPoints = 0;
  studentID: number;
  startDate: Date;
  endDate: Date;
  show = false;
  public studentTimeReportForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: StudentService) { }

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
    this.totalHours = 0;
    this.totalPoints = 0;
    // get students data
    this.startDate = this.studentTimeReportForm.controls['inDate'].value;
    this.endDate = this.studentTimeReportForm.controls['outDate'].value;
    // this.timeTrackerService.getStudentTimeTrackerInfo(this.studentID,
    //   this.startDate, this.endDate).subscribe(s => {
    //     this.report = s;
    //     console.log('values ' + this.studentID,
    //       this.studentTimeReportForm.controls['inDate'].value,
    //       this.studentTimeReportForm.controls['outDate'].value);
    //     console.log('report ', this.report);

    //     for (let i = 0; i < this.report.length; i++) {
    //       if (this.report[i].points !== undefined) {
    //         this.totalPoints = this.totalPoints + this.report[i].points;
    //         this.totalHours = this.totalHours + this.report[i].totalHrs;
    //       }
    //     }
    //     this.totalHours = parseFloat(this.totalHours.toFixed(1));
    //     console.log('point total ' + this.totalPoints);
    //     console.log('hours total ' + this.totalHours);
      // });

    // this.timeTrackerService.getStudent(this.studentID).subscribe(s => {
    //   this.studentInfo = s;
    //   this.studentName = this.studentInfo[0].firstName + ' ' + this.studentInfo[0].lastName + '-' + this.studentInfo[0].studentId;
    // });

    this.show = true;
  }

  submit() {
    this.studentTimeReportForm.reset();

    this.totalHours = 0;
    this.totalPoints = 0;
    this.studentName = '';
    this.show = false;
  }

  onNotify(value: Student): void {
    // alert(message);
    this.studentID = value.studentId;
  }


}
