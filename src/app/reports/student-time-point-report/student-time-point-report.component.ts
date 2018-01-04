import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


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

  public studentTimeReportForm: FormGroup;


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
this.timeTrackerService.getStudentTimeTrackerInfo().subscribe(s => {
      this.report = s;
      console.log(s);

      });
    }


}
