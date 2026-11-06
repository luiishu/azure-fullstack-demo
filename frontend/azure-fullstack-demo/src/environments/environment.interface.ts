
export type EnvironmentName = 'dev' | 'uat' | 'prod';
//export type EnvironmentNameShort = 'dev' | 'uat' | 'prod';
//export type EnvironmentNameLong = 'development' | 'user acceptance testing' | 'production';

export interface Environment {
    readonly isProd: boolean;
    readonly isDev: boolean;
    readonly environmentName: EnvironmentName;
    readonly api: {
        readonly baseUrl: string;
    }
}
