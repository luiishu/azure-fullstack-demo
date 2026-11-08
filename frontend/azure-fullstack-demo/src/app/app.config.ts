import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { 
  MSAL_GUARD_CONFIG, 
  MSAL_INSTANCE, 
  MsalBroadcastService, 
  MsalGuard,
  MsalGuardConfiguration, 
  MsalService 
} from '@azure/msal-angular';

import { 
  InteractionType, 
  PublicClientApplication 
} from '@azure/msal-browser';

import { msalConfig } from './shared/auth/msal.config';

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
  ]
};
