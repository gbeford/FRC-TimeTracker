import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  public loginForm: FormGroup;
  securityObject: AppUserAuth = null;
  returnUrl: string;
  signUpBox = false;
  submitted = false;

  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }


  createForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }



  submit() {
    console.log('here');
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('invaid', this.loginForm.invalid);
      return;
    }
    if (this.loginForm.valid) {
      console.log('vaid');
      this.user.userName = this.loginForm.value.userName;
      this.user.password = this.loginForm.value.password;
      this.securityService.login(this.user).subscribe(
        resp => {
          this.securityObject = resp;
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('home');
          }
        },
        // handles the error
        () => {
          // Initialize security object to display error message
          this.securityObject = new AppUserAuth();
        }
      );
    }
    this.loginForm.reset();
  }


  showSignUpBox() {
    this.signUpBox = true;
  }

  signIn() {
    this.signUpBox = false;
  }

  forgetPassword() {
    // TODO send password to user
  }

  // signUp(){
  //    this.registerForm = this.formBuilder.group({
  //      firstName: ['', Validators.required],
  //      lastName: ['', Validators.required],
  //      email: ['', [Validators.required, Validators.email]],
  //      password: ['', [Validators.required, Validators.minLength(6)]]
  //    });
  // }

}
