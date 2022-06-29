require("dotenv").config();

const sonarqubeScanner = require("sonarqube-scanner");
const serverUrl = process.env.SONARQUBE_URL;
const token = process.env.SONARQUBE_TOKEN;
const projectKey = process.env.SONARQUBE_PROJECTKEY; //name of project

const options = {
  "sonar.sources": ".",
  "sonar.projectKey": token,
  "sonar.projectName": projectKey,
  "sonar.inclusions": "**",
  "sonar.test.inclusions":
    "src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx",
  "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
  "sonar.testExecutionReportPaths": "coverage/test-reporter.xml",
};

const params = {
  serverUrl,
  token,
  options,
};

sonarqubeScanner(
  {
    params,
  }
);

/**
 * 
const options = {

  'sonar.projectKey': projectKey,

  // projectName - defaults to project key
  'sonar.projectName': 'node-typescript-boilerplate',

  // Path is relative to the sonar-project.properties file. Defaults to .
  'sonar.sources': 'src',

  // source language
  'sonar.language': 'ts',

  'sonar.javascript.lcov.reportPaths' : 'coverage/lcov.info',

  // Encoding of the source code. Default is default system encoding
  'sonar.sourceEncoding': 'UTF-8'
};

// parameters for sonarqube-scanner
const params = {
  serverUrl,
  token,
  options
}

const sonarScanner = async () => {

  console.log(serverUrl);

  if (!serverUrl) {
    console.log('SonarQube url not set. Nothing to do...');
    return;
  }

  //  Function Callback (the execution of the analysis is asynchronous).
  const callback  = (result) => {
    console.log('Sonarqube scanner result:', result);
  }

  scanner(params, callback);
}

sonarScanner()
  .catch(err => console.error('Error during sonar scan', err));
 */
