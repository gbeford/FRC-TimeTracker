import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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

  public timeTrackerForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
  private timeTrackerService: TimeTrackerService) { }

  ngOnInit() {
  }

  createForm() {
    console.log('here');
    this.timeTrackerForm = this.formBuilder.group({
      studentId: ['', [<any>Validators.required, <any>Validators.maxLength(6)]],
      inDate: ['', [<any>Validators.required]],
      outDate: ['', [<any>Validators.required]]

    });
  }




  run() {
    // get students data
    this.timeTrackerService.getStudentTimeTrackerInfo(this.timeTrackerForm.controls['studentID'].value,
      this.timeTrackerForm.controls['inDate'].value, this.timeTrackerForm.controls['outDate'].value).subscribe(s => {
      this.report = s;
      console.log(s);

});
    this.timeTrackerService.getStudent(this.timeTrackerForm.controls['studentID'].value);
    }


}
