import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { untilDestroyed } from '@core/sys';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import moment from 'moment-timezone';
import { merge } from 'rxjs';
import { SocketIoService } from '@core/socket-io';
import { Logger } from '@core/logger';
import { I18nService } from '@core/i18n';

const logger = new Logger('App');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  // ToDo: Do not remove til add theming functionality.
  darkTheme = false;

  title = 'socketio-angular';
  messages: string[] = [];

  private _socket: any;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _titleService: Title,
              private _translateService: TranslateService,
              private _i18nService: I18nService,
              private _socketIOService: SocketIoService
  ) {}

  ngOnInit() {
    // this._socketIOService.setupSocketIO();
    // this._socket = this._socketIOService.socket;
    //
    // this._socket.on('messageFromBackend', (msg) => {
    //   this.messages.push(msg);
    // });
    // this._socket.on('connection', () => {
    //   logger.debug('Connected...');
    // });

    // Setup time zone
    moment.tz.setDefault('Etc/UTC');
    // Setup logger
    if (environment.production)
      Logger.enableProductionMode();

    logger.debug('init');

    // Setup translations
    this._i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    this.updatePageTitleOnLanguageChange();
  }

  /**
   * Change page title on navigation or language change, based on route data
   */
  private updatePageTitleOnLanguageChange() {

    const onNavigationEnd = this._router.events.pipe(filter(event => event instanceof NavigationEnd));

    merge(this._translateService.onLangChange, onNavigationEnd)
    .pipe(
      map(() => {
        let route = this._activatedRoute;
        while (route.firstChild)
          route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      switchMap(route => route.data),
      untilDestroyed(this)
    )
    .subscribe(event => {
      const title = event.title;
      if (title)
        this._titleService.setTitle(this._translateService.instant(title));
    });
  }

  ngOnDestroy() {
    this._i18nService.destroy();
  }
}
