
import { environment } from '../../../environments/environment';
import { MsalInterceptorConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string> | null>();

    protectedResourceMap.set(
        `${environment.api.baseUrl}/kpis`,
        [environment.msal.apiScope]
    );

    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap
    };
}