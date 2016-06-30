'use strict';

let Jasmine = require('jasmine');
let SpecReporter = require('jasmine-spec-reporter');
let noop = () => {};

let jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: noop});    // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter());   // add jasmine-spec-reporter
jrunner.loadConfigFile();                           // load jasmine.json configuration
jrunner.execute();
