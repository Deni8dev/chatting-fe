import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { untilDestroyed } from '@core/until-destroyed';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '@data-providers/i18n';
import { environment } from '@env/environment';
import { Logger } from '@data-providers/logger';
import moment from 'moment-timezone';
import { merge } from 'rxjs';
import { SocketIoService } from '@core/socket-io/socket-io.service';

const logger = new Logger('App');

export interface Interface {
  name?: string;
  value?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  darkTheme = false;
  title = 'socketio-angular';
  messages: string[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private translateService: TranslateService,
              private i18nService: I18nService,
              private _socketIOService: SocketIoService
  ) {}

  ngOnInit() {
    this._socketIOService.setupSocketConnection();
    this._socketIOService.socket.on('messageFromBackend', (msg) => {
      this.messages.push(msg);
    });
    this._socketIOService.socket.on('connection', () => {
      logger.debug('Connected...');
    });

    // Setup time zone
    moment.tz.setDefault('Etc/UTC');
    // Setup logger
    if (environment.production)
      Logger.enableProductionMode();

    logger.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    this.updatePageTitleOnLanguageChange();
  }

  /**
   * Change page title on navigation or language change, based on route data
   */
  private updatePageTitleOnLanguageChange() {

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    merge(this.translateService.onLangChange, onNavigationEnd)
    .pipe(
      map(() => {
        let route = this.activatedRoute;
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
        this.titleService.setTitle(this.translateService.instant(title));
    });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
