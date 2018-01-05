import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ITimeTracker } from '../../time-tracker/model/time-tracker';
import { TimeTrackerService } from '../../time-tracker/time-tracker.service';


@Component({
  selector: 'app-student-time-point-report',
  templateUrl: './student-time-point-report.component.html',
  styleUrls: ['./student-time-point-report.component.css']
})
export class StudentTimePointReportComponent implements OnInit {

  report: ITimeTracker[];
  title = 'Get Student Hours & Points';
  studentName = '';
  totalHours = '';
  totalPoints = '';
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
    this.timeTrackerService.getStudentTimeTrackerInfo(this.studentTimeReportForm.controls['studentID'].value,
      this.studentTimeReportForm.controls['inDate'].value, this.studentTimeReportForm.controls['outDate'].value).subscribe(s => {
        this.report = s;
        console.log(s);

      });
    this.timeTrackerService.getStudent(this.studentTimeReportForm.controls['studentID'].value);
    this.show = true;
  }


}
