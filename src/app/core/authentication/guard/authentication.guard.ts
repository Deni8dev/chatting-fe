import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '@core/authentication';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _router: Router,
              private _authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {
    if (this._authenticationService.isAuthenticated)
      return true;

    this._router.navigate(['/'], { replaceUrl: true });
    return false;
  }

}
