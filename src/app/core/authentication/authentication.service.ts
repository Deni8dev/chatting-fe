import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginContext, SessionStorage } from '@core/authentication';
import { User } from '@core/dto';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const SESSION_STORAGE_KEY = 'sessionStorage';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static readonly serverUrl = '/authentication-api/v1/token';

  private _sessionStorage: SessionStorage | null;

  constructor(private _http: HttpClient, private _cookieService: CookieService) {
    const str = this._cookieService.get(SESSION_STORAGE_KEY);
    this._sessionStorage = str ? JSON.parse(str) : null;
  }

  /**
   * Authenticates the user.
   *
   * @param context The login parameters.
   * @return Observable<User> The user sessionStorageKey.
   */
  login(context: LoginContext): Observable<User> {
    return this._http
    .post<User>(AuthenticationService.serverUrl, context)
    .pipe(map(loggedUser => this.saveSessionData({ user: loggedUser }).user));
  }

  /**
   * Logs out the user and clear sessionStorageKey.
   *
   * @return Observable<boolean> True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    try {
      this._sessionStorage = null;
      this._cookieService.delete(SESSION_STORAGE_KEY);
      return of(true);
    } catch (e) {
      return of(false);
    }
  }

  /**
   * Checks is the user is authenticated.
   *
   * @return boolean True if the user is authenticated.
   */
  get isAuthenticated(): boolean {
    // ToDo: Enable conditions
    // return !!this.sessionStorageUser || !!this._cookieService.get(SESSION_STORAGE_KEY);
    return true;
  }

  /**
   * @return Data of current session.
   */
  get sessionStorage(): SessionStorage | null {
    return this._sessionStorage;
  }

  /**
   * Gets the user sessionStorage.
   * @return User or null if the user is not authenticated.
   */
  get sessionStorageUser(): User | null {
    return this._sessionStorage ? this._sessionStorage.user : null;
  }

  saveSessionData(sessionStorage: SessionStorage): SessionStorage {
    this._sessionStorage = sessionStorage;
    this._cookieService.set(SESSION_STORAGE_KEY, JSON.stringify(sessionStorage));
    return this._sessionStorage;
  }
}
