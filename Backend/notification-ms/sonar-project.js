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

sonarqubeScanner({
  params,
});
