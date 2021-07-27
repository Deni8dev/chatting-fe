import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AuthenticationService, SESSION_STORAGE_KEY } from './authentication.service'
import { CookieService } from 'ngx-cookie-service'
import { SessionStorage } from '@core/authentication/authentication.model'

describe('AuthenticationService', () => {

  let authenticationService: AuthenticationService
  let httpClientMock: HttpTestingController
  let cookieService: CookieService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        CookieService
      ]
    })
  })

  beforeEach(inject([
    AuthenticationService,
    HttpTestingController,
    CookieService
  ], (
    _authenticationService: AuthenticationService,
    _httpClientMock: HttpTestingController,
    _cookieService: CookieService) => {
    authenticationService = _authenticationService
    httpClientMock = _httpClientMock
    cookieService = _cookieService
  }))

  afterEach(() => {
    // Cleanup
    cookieService.deleteAll()
  })

  describe('login', () => {
    it('should return user', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto@cyxtera.com',
        password: '123'
      })
      tick()

      // Assert
      request.subscribe(user => {
        expect(user).toBeDefined()
      })
    }))

    it('should persist sessionStorageKey for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'toto@cyxtera.com',
        password: '123'
      })
      tick()

      // Assert
      request.subscribe(() => {
        expect(cookieService.get(SESSION_STORAGE_KEY)).not.toBeNull()
      })
    }))

    it('should return access token', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'dsa@cyxtera.com',
        password: 'user1Pwd'
      })

      tick()

      // Assert
      request.subscribe(user => {
        expect(user).toBeDefined()
      })
    }))

    it('should return refresh token', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'user1@cyxtera.com',
        password: 'user1Pwd'
      })

      tick()

      // Assert
      request.subscribe(user => {
        expect(user).toBeDefined()
      })
    }))

    it('should user be authenticated', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'user1@cyxtera.com',
        password: 'user1Pwd'
      })

      tick()

      // Assert
      request.subscribe(() => {
        expect(authenticationService.isAuthenticated).toBe(true)
      })
    }))

    it('should set sessionStorage and create cookie', fakeAsync(() => {
      // Arrange
      const sessionStorage: SessionStorage = {
        user: { email: 'too@email.com', name: 'user', phone: '+573425678907' }
      }
      authenticationService.saveSessionData(sessionStorage)
      tick()

      // Assert
      const user = authenticationService.sessionStorageUser
      expect(user).toBeDefined()
      expect(authenticationService.isAuthenticated).toBe(true)
      expect(cookieService.get(SESSION_STORAGE_KEY)).toBeDefined()
    }))
  })

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'toto@cyxtera.com',
        password: '123'
      })
      tick()

      // Assert
      loginRequest.subscribe(() => {
        expect(authenticationService.isAuthenticated).toBe(true)

        const request = authenticationService.logout()
        tick()

        request.subscribe(() => {
          expect(authenticationService.isAuthenticated).toBe(false)
          expect(authenticationService.sessionStorageUser).toBeNull()
          expect(cookieService.get(SESSION_STORAGE_KEY)).toBeUndefined()
        })
      })
    }))

    it('should clear persisted user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'toto@cyxtera.com',
        password: '123',
        remember: true
      })
      tick()

      // Assert
      loginRequest.subscribe(() => {
        expect(authenticationService.isAuthenticated).toBe(true)

        const request = authenticationService.logout()
        tick()

        request.subscribe(() => {
          expect(authenticationService.isAuthenticated).toBe(false)
          expect(authenticationService.sessionStorageUser).toBeNull()
          expect(cookieService.get(SESSION_STORAGE_KEY)).toBeUndefined()
        })
      })
    }))
  })

  it('should return user authenticated data', () => {
    const sessionStorage = { user: { email: 'too@email.com', name: 'user', phone: '+573425678907' } }
    authenticationService.saveSessionData(sessionStorage)
    expect(authenticationService.sessionStorageUser).toBeDefined()
  })
})
