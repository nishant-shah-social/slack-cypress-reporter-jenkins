# cypress-slack-reporter-jenkins

A Slack Reporting tool built for Cypress but _should_ work with any mocha based framework that is using [mochawesome](https://github.com/adamgruber/mochawesome/)

This repo is a fork from https://github.com/YOU54F/cypress-plugins with some customizations with respect to jenkins ci provider

## How to install?

You can add the dependency of this package into your JS project by :-
`npm install slack-cypress-reporter-jenkins --save-dev`

## How to send slack notification of the cypress report using this package?

You need to set following environment variables before using this package to send notifications:-
* E2E_REPORT_URL :- URL of your cypress test HTML report of the current Jenkins run or any other tool where you are storing the report
* APP_NAME :- Name of the app under test, e.g. Kamernet BackOffice Or Kamernet Web
* SLACK_WEBHOOK_URL :- url of your slack webhook (created via your slack app)
* GIT_URL :- URL of git repository.
* Environment :- The staging environment where the cypress test was run.(test or acceptance)

Once you have executed the cypress tests via jenkins and saved the Mochawesome report(s) in a directory named cypress/reports in your root folder -> you need to execute following command to send the slack notification :-

`node_modules/.bin/slack-cypress-reporter-jenkins --ci-provider jenkins --report-dir cypress/reports`

