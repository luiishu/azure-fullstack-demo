import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalService
} from '@azure/msal-angular';

import {
  InteractionType,
  PublicClientApplication
} from '@azure/msal-browser';

import { msalConfig } from './shared/auth/msal.config';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { msalInterceptorConfigFactory } from './shared/auth/msal-interceptor.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: MSAL_INSTANCE,
      useFactory: () => new PublicClientApplication(msalConfig)
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: MSAL_GUARD_CONFIG,
      useValue: {
        interactionType: InteractionType.Redirect
      } as MsalGuardConfiguration
    },
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: msalInterceptorConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
  ]
};
