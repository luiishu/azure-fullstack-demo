import { Environment } from "./environment.interface";

export const environment: Environment = {
    isProd: false,
    isDev: true,
    environmentName: 'dev',
    api: {
        baseUrl: 'https://localhost:7033/api/v1',
    }
};
