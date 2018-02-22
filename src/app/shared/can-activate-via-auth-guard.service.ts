import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.isLoggedIn();
  }

}
