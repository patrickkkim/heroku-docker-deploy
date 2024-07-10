type HerokuCredentials = {
    dbHost: string;
    dbName: string;
    dbUsername: string;
    dbPassword: string;
    fs: string;
    herokuAppName: string;
};
export declare const sendEnv: ({ dbHost, dbName, dbUsername, dbPassword, fs, herokuAppName }: HerokuCredentials) => Promise<boolean>;
export {};
