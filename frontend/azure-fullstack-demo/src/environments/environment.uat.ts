import { Environment } from "./environment.interface";

export const environment: Environment = {
    isProd: false,
    isDev: false,
    environmentName: 'uat',
    api: {
        baseUrl: 'https://app-azure-fullstack-demo-uat-bvf4cgczh6gzfubj.swedencentral-01.azurewebsites.net/api/v1',
    }
};
