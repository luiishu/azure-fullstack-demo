import { Environment } from "./environment.interface";

export const environment: Environment = {
    isProd: false,
    isDev: false,
    environmentName: 'uat',
    api: {
        baseUrl: 'https://app-azure-fullstack-demo-uat-bvf4cgczh6gzfubj.swedencentral-01.azurewebsites.net/api/v1',
        // baseUrl: 'https://localhost:7033/api/v1', // For testing
    },
    msal: {
        clientId: "f4f45ad3-4c14-40ea-9f83-4c4815bc4f3f",
        authority: "https://mango420testtenant.ciamlogin.com/bd63f017-fcd9-4b6f-915b-9a0a92a41c06",
        knownAuthorities: [
            "mango420testtenant.ciamlogin.com",
            "bd63f017-fcd9-4b6f-915b-9a0a92a41c06.ciamlogin.com"
        ],
        apiScope: "",
        redirectUri: "https://thankful-beach-0d4014010.8.azurestaticapps.net/",
        postLogoutRedirectUri: "https://thankful-beach-0d4014010.8.azurestaticapps.net/",
    }
};
