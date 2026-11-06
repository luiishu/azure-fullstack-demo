import { Environment } from "./environment.interface";

export const environment: Environment = {
    isProd: true,
    isDev: false,
    environmentName: 'prod',
    api: {
        baseUrl: 'prod-url',
    }
};
