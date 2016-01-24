# Mocha Duplicate Reporter

[![Build Status](https://travis-ci.org/catdad/mocha-duplicate-reporter.svg?branch=master)](https://travis-ci.org/catdad/mocha-duplicate-reporter)
[![Code Climate](https://codeclimate.com/github/catdad/mocha-duplicate-reporter/badges/gpa.svg)](https://codeclimate.com/github/catdad/mocha-duplicate-reporter)
[![Downloads][7]][8] [![Version][9]][8]

[7]: https://img.shields.io/npm/dm/mocha-duplicate-reporter.svg
[8]: https://www.npmjs.com/package/mocha-duplicate-reporter
[9]: https://img.shields.io/npm/v/mocha-duplicate-reporter.svg

Mocha seems perfectly content to let you create multiple tests that share the same name, but some CIs (_caugh_ Teamcity _caugh_) are not so happy. They will just refuse to acknowledge the duplicates, and you are stuck wondering why your CI reports 7 test less than you are seeing locally. Once you build up a large enough test suite, it's pretty hard to figure out what the offending tests are. Well, no more! Use this quick reporter and see who those pesky bastards are.

## Install

    npm install -save-dev mocha-duplicate-reporter
    
## Usage

    mocha --reporter mocha-duplicate-reporter
    
## Output

```
Regex report: 9-8-0-1-4

9 total tests:
   8 passed
   0 failed
   1 pending
   4 duplicate names

Duplicate test names:
[Example] is obviously written in a loop
[Example] tests the same thing over and over
[Example] performs a vague action
[Example] forks forks forks
```

Run `npm test` on the repo to see the original test file that produces this output.

## Just in case you want to automate this

To hint to those devs who wrote the poorly named tests, I suggest you make the build fail, so here is a free regular expression for you:

```javascript
var regex = /Regex report\:\s?([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)/;
var match = output.match(regex);

if (match) {
    var total = match[1];
    var pass = match[2];
    var fail = match[3];
    var pending = match[4];
    var dups = match[5];
    
    if (+dups) {
        console.log('fail with %d duplicates', +dups);
    }
}
```
