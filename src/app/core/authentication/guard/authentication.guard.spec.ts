import { inject, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { AuthenticationGuard } from '@core/authentication/guard'
import { AuthenticationService } from '@core/authentication'

describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard
  let mockRouter: any

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthenticationService },
        { provide: Router, useValue: mockRouter }
      ]
    })
  })

  beforeEach(inject([
    AuthenticationGuard,
    AuthenticationService
  ], (_authenticationGuard: AuthenticationGuard) => {

    authenticationGuard = _authenticationGuard
  }))
})
