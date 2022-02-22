#!/usr/bin/env node

import { program } from "commander";
import { config } from "dotenv";
import * as fs from "fs";
import { slackRunner } from "./slack/slack-alert";

let version;

if (!process.env.CI) {
  config();
}

try {
  const json = JSON.parse(
    fs.readFileSync(
      "./node_modules/cypress-slack-reporter/package.json",
      "utf8"
    )
  );
  version = json.version;
} catch (e) {
  try {
    const json = JSON.parse(
      fs.readFileSync(
        "./node_modules/mochawesome-slack-reporter/package.json",
        "utf8"
      )
    );
    version = json.version;
  } catch (e) {
    version = "Cannot determine version";
  }
}

program
  .version(
    `git@github.com:YOU54F/cypress-slack-reporter.git@${version}`,
    "-v, --version"
  )
  .option(
    "--vcs-provider [type]",
    "VCS Provider [github|bitbucket|none]",
    "github"
  )
  .option(
    "--ci-provider [type]",
    "CI Provider [circleci|jenkins|bitbucket|none|custom]",
    "circleci"
  )
  .option(
    "--custom-url [type]",
    "On selected --ci-provider=custom this link will be set to Test Report",
    ""
  )
  .option(
    "--report-dir [type]",
    "mochawesome json & html test report directory, relative to your package.json",
    "mochareports"
  )
  .option(
    "--screenshot-dir [type]",
    "cypress screenshot directory, relative to your package.json",
    "cypress/screenshots"
  )
  .option(
    "--video-dir [type]",
    "cypress video directory, relative to your package.json",
    "cypress/videos"
  )
  .option("--verbose", "show log output")
  .option("--only-failed", "only send message for failed tests")
  .option(
    "--custom-text [type]",
    "add additional text to message, wrap message in quotes"
  )
  // .option("--s3", "upload artefacts to s3")
  .parse(process.argv);

const options = program.opts();
const ciProvider: string = options.ciProvider;
const vcsProvider: string = options.vcsProvider;
const reportDir: string = options.reportDir;
const videoDir: string = options.videoDir;
const customUrl: string = options.customUrl;
const screenshotDir: string = options.screenshotDir;
const onlyFailed: boolean = options.onlyFailed;
const customText: string = options.customText;
// const verbose: boolean = program.verbose;

if (options.verbose) {
  // tslint:disable-next-line: no-console
  console.log(
    " ciProvider:- " + ciProvider + "\n",
    "customUrl:- " + customUrl + "\n",
    "vcsProvider:- " + vcsProvider + "\n",
    "reportDirectory:- " + reportDir + "\n",
    "videoDirectory:- " + videoDir + "\n",
    "screenshotDirectory:- " + screenshotDir + "\n"
  );
}

slackRunner({
  ciProvider,
  vcsRoot: vcsProvider,
  reportDir,
  videoDir,
  screenshotDir,
  customUrl,
  onlyFailed,
  customText,
});
