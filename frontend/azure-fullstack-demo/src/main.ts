import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';
import { msalConfig } from './app/shared/auth/msal.config';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

console.log(`Running Azure Fullstack Demo in ${environment.environmentName}...`);


if (environment.isDev) {
  console.log("MSAL ==========================================");
  console.log(`Client Id: ${environment.msal.clientId}`);
  console.log(`Authority: ${environment.msal.authority}`);
  console.log(`Redirect URI: ${environment.msal.redirectUri}`);
  console.log(`Post Logout Redirect URI: ${environment.msal.postLogoutRedirectUri}`);
  console.log("-----------------------------------------------");
  console.log('MSAL config:', msalConfig);
  console.log("===============================================");
}