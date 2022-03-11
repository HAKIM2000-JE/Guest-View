import {ErrorHandler, NgModule} from '@angular/core';
import {ConfigLoader, ConfigModule} from '@ngx-config/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ConfigHttpLoader} from '@ngx-config/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IntercomModule} from 'ng-intercom';
import Bugsnag from '@bugsnag/js';
import {BugsnagChunkLoadErrorHandler} from './handler/BugsnagChunkLoadErrorHandler';
import {ChunkLoadErrorHandler} from './handler/ChunkLoadErrorHandler';
import {SharedModule} from '../shared/shared.module';
import {ImageDetailComponent} from './components/image-detail/image-detail.component';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component';
import player from 'lottie-web';
import {
  GoogleAnalyticsService,
  IGoogleAnalyticsSettings, NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER,
  NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN,
  NgxGoogleAnalyticsModule
} from 'ngx-google-analytics';
import {SnackbarComponent} from "./components/snackbar/snackbar.component";
import {LoaderComponent} from "../shared/components/loader/loader.component";
import {LottieModule} from "ngx-lottie";

if (isProdMode()) {
  Bugsnag.start({ apiKey: window['bugsnagApiKey'] });
}

export function getGA(): IGoogleAnalyticsSettings {
  return {
    trackingCode: window['ganalytics'],
    initCommands: [],
    uri: undefined,
    enableTracing: undefined,
    nonce: undefined
  };
}

export function isProdMode() {
  return true;
  // return window['bugsnagApiKey'] !== '79afb76ca537eece1988da1397796f61';
}
export function errorHandlerFactory() {
  return isProdMode() ? new BugsnagChunkLoadErrorHandler() : new ChunkLoadErrorHandler();
}

export function configFactory(httpClient: HttpClient): ConfigLoader {
  return new ConfigHttpLoader(httpClient, './assets/config.json');
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function intercomAppId(): string {
  return window["intercomAppId"];
}

export function playerFactory() {
  return player;
}

@NgModule({
  // ImageDetailComponent & PhotoDetailComponent might not be used anymore.
  declarations: [ImageDetailComponent, PhotoDetailComponent, SnackbarComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: configFactory,
      deps: [HttpClient]
    }),
    LottieModule.forRoot({ player: playerFactory } ),
    IntercomModule.forRoot({
      appId: intercomAppId(), // from your Intercom config
      updateOnRouterChange: true // will automatically run `update` on router event changes. Default: `false`
    }),
    {
      ngModule: NgxGoogleAnalyticsModule,
      providers: [
        {
          provide: NGX_GOOGLE_ANALYTICS_SETTINGS_TOKEN, useFactory: getGA
        },
        NGX_GOOGLE_ANALYTICS_INITIALIZER_PROVIDER
      ]
    },
    LottieModule
  ],
  providers: [
    GoogleAnalyticsService,
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    /*  TODO: See with Yassir if its needed as we already have bugsnag
        {
          // processes all errors
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
        }*/
  ],
  entryComponents: [
    ImageDetailComponent, PhotoDetailComponent
  ],
})
export class CoreModule { }
