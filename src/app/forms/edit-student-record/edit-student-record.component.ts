
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { map, tap, startWith, debounceTime } from 'rxjs/operators';
import { IStudent } from '../../model/student';
import { StudentService } from '../time-tracker/student.service';


@Component({
  selector: 'app-edit-student-record',
  templateUrl: './edit-student-record.component.html',
  styleUrls: ['./edit-student-record.component.css']
})
export class EditStudentRecordComponent implements OnInit {

  public studentEditForm: FormGroup;
  create_date: string;
  in_date: Date;
  end_date: Date;
  hours: number;
  points: number;
  student_id: string;
  show = false;
  studentCtrl: FormControl = new FormControl();
  filteredOptions: Observable<IStudent[]>;
  students: IStudent[];
  studentID = '';

  constructor(private formBuilder: FormBuilder,
    private timeTrackerService: StudentService) { }

  ngOnInit() {
    this.buildForm();

  }

  buildForm() {
    this.studentEditForm = this.formBuilder.group({
      studentCtrl: ['', [<any>Validators.required]],
      // studentId: ['', [<any>Validators.required, <any>Validators.maxLength(7)]],
      createDate: ['', [<any>Validators.required]],
      inDate: ['', [<any>Validators.required]],
      outDate: ['', [<any>Validators.required]],
      totalHours: ['', [<any>Validators.required]],
      points: ['', [<any>Validators.required]]
    });
  }
  // get list of students for autoComplete
  getAllStudents() {
    this.timeTrackerService.getStudents().subscribe(s => {
      this.students = s;
    });
  }

  retrevieStudentRecord() {
    this.create_date = this.studentEditForm.controls['createDate'].value.toISOString().split('T')[0];
    // this.timeTrackerService.getStudentByDate(this.studentID,
    //   this.create_date).subscribe(s => {
    //   });
    this.show = true;
  }

  save() {
    this.create_date = this.studentEditForm.controls['createDate'].value;
    this.in_date = this.studentEditForm.controls['inDate'].value;
    this.end_date = this.studentEditForm.controls['outDate'].value;
    this.hours = this.studentEditForm.controls['outDate'].value;
    this.points = this.studentEditForm.controls['outDate'].value;
    this.student_id = this.studentID;
    // this.timeTrackerService.editStudentRecord(this.create_date, this.in_date, this.end_date, this.hours, this.points)
    // this.student_id).subscribe(s => {
    // });
  }

  onNotify(value: IStudent): void {
    // alert(message);
    this.studentID = value.studentId;
  }

}
