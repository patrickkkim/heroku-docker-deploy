import * as core from '@actions/core';
import { exec } from '../utils';

type HerokuCredentials = {
  dbHost: string;
  dbName: string;
  dbUsername: string;
  dbPassword: string,
  fs: string,
  herokuAppName: string
};

export const sendEnv = async ({ dbHost, dbName, dbUsername, dbPassword, fs, herokuAppName }: HerokuCredentials): Promise<boolean> => {
  try {
    core.startGroup('Sending env Variables to Heroku docker registry...');
    const data = await exec(
      `heroku config:set SPRING_DATASOURCE_SERVICE=${dbHost} SPRING_DATASOURCE_DBNAME=${dbName} \
          SPRING_DATASOURCE_USERNAME=${dbUsername} SPRING_DATASOURCE_PASSWORD=${dbPassword} \
          FS_API_KEY=${fs} --app ${herokuAppName}`
    );
    console.log(data.stdout);
    core.endGroup();
    return true;
  } catch (error) {
    core.endGroup();
    core.setFailed(`Sending env failed.\nError: ${error.message}`);
    return false;
  }
};
