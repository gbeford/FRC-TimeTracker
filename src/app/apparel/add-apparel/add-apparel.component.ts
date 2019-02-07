import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-apparel',
  templateUrl: './add-apparel.component.html',
  styleUrls: ['./add-apparel.component.scss']
})
export class AddApparelComponent implements OnInit {

  public apparelForm: FormGroup;
  public submitted: boolean;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  uploadNotify() {
    alert('image was selected');
  }

  createForm() {
    this.apparelForm = this.formBuilder.group({
      itemCtrl: ['', [<any>Validators.required]],
      descCtrl: ['', [<any>Validators.required]],
      genderCtrl: ['', [<any>Validators.required]],
      sizeCtrl: ['', [<any>Validators.required]],
      priceCtrl: ['', [<any>Validators.required]],

    });
  }
// convenience getter for easy access to form fields
  get f() { return this.apparelForm.controls; }


  save() {
    this.submitted = true;
    if (this.apparelForm.dirty && this.apparelForm.valid) {
  //     // copy the form values over the team object values
  //     let t = Object.assign({}, this.team, this.teamEditForm.value);
  //     this.teamService.saveTeam(t).subscribe(
  //       resp => {
  //         this.resp = resp
  //         this.router.navigate(['/teams']);
  //       },
  //       err => {
  //         this.err = <any>err
  //         console.log(err);
  //       }
  //     );
    }
   }


}