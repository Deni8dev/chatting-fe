import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material.module';
import { AuthenticationService } from '../data-providers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { LeftToolbarComponent } from './components/left-toolbar/left-toolbar.component';
import { CookieService } from 'ngx-cookie-service';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [ShellComponent, LeftNavigationComponent, LeftToolbarComponent, LeftMenuComponent],
      providers: [AuthenticationService, CookieService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
