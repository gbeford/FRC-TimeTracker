import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;
  signUpBox = false;

  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  login(form: NgForm) {
    if (form.valid) {
      this.securityService.login(this.user).subscribe(
        resp => {
          this.securityObject = resp;
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/studentlist');
          }
        },
        // handles the error
        () => {
          // Initialize security object to display error message
          this.securityObject = new AppUserAuth();
        }
      );
    }
    form.reset();
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
