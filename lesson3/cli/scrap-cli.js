#!/usr/bin/env node
const pkg = require('../package.json');
const scrapper = require('../lib/scrapper.js');
/* eslint-disable */
const colors = require('colors');
/* eslint-enable */
const config = require('../config');
const jsonfile = require('jsonfile');

// Parse command line options
const program = require('commander');

program
.description('Scarpper allows you to find contents of selected dom elements of a website')
.version(pkg.version)
.usage('scrapper [options] <website> <selector>')
.arguments('<website>', '<selector>', '<output file>')
.option('-d, --depth <n>', `depth of search within a website, default is ${config.depth}`)
.parse(process.argv);

const website = program.args[0];
const selector = program.args[1];
const outputFile = program.args[2];
const depth = program.depth || config.depth;

if (program.args.length < 3) {
  console.error(`
    Usage: scrapper <website> <selector> <output file>
  `);

  process.exit(1);
}

console.log(`\nRunning scrapper for ${'website'.green}=${website} ${'selector'.yellow}=${selector} ${'depth'.blue}=${depth}\n`);

// calling scrapper
const scrap = scrapper(selector);

scrap(website, depth)
.then(function(store) {
  jsonfile.writeFile(outputFile, store, {spaces: config.outputJsonSpaces}, (err) => {
    if (err) {
      console.log(err);
    }

    console.log(`Parsed data is saved to ${outputFile}\n`);
    process.exit(0);
  });

})
.catch((error) => {
  console.log(error);
  process.exit(1);
});





