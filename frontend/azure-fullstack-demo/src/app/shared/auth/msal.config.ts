
import {
  BrowserCacheLocation,
  Configuration
} from '@azure/msal-browser';

import { environment } from '../../../environments/environment';

if (!environment.msal.clientId || !environment.msal.authority) {
  throw new Error(
    `MSAL configuration is missing for environment: ${environment.environmentName}`
  );
}

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.msal.clientId,
    authority: environment.msal.authority,
    knownAuthorities: environment.msal.knownAuthorities,
    redirectUri: environment.msal.redirectUri,
    postLogoutRedirectUri: environment.msal.postLogoutRedirectUri
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage
  }
};