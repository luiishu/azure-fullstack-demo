import { Environment } from "./environment.interface";

export const environment: Environment = {
    isProd: false,
    isDev: true,
    environmentName: 'dev',
    api: {
        baseUrl: 'https://localhost:7033/api/v1',
    },
    msal: {
        clientId: "06c692cb-4356-4268-b25a-3db205946a85",
        authority: "https://mango420testtenant.ciamlogin.com/bd63f017-fcd9-4b6f-915b-9a0a92a41c06",
        knownAuthorities: [
            "mango420testtenant.ciamlogin.com",
            "bd63f017-fcd9-4b6f-915b-9a0a92a41c06.ciamlogin.com"
        ],
        apiScope: "api://ca216a1f-e7d6-4e28-901f-5d1c7ef004bd/access_as_user",
        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
    }
};
