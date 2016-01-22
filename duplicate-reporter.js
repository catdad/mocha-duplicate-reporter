module.exports = DuplicateReporter;

function DuplicateReporter(runner) {
    var passes = 0;
    var failures = 0;
    
    var tests = {};
    var duplicates = {};
    
    function onTestComplete(title) {
        if (tests[title]) {
            duplicates[title] = true;
        } else {
            tests[title] = true;
        }
    }
    
    function onEnd() {
        var duplicateList = Object.keys(duplicates);
        
        console.log('');
        console.log('%d total tests: \n   %d passed \n   %d failed \n   %d duplicate names', passes + failures, passes, failures, duplicateList.length);
        
        if (duplicateList.length) {
            console.log('');
            console.log('Duplicate test names:');
            console.log(Object.keys(duplicates).join('\n'));
            console.log('');
        }
        
        process.exit(failures);
    }
    
    runner.on('pass', function (test) {
        passes++;
        onTestComplete(test.fullTitle());
    });

    runner.on('fail', function (test, err) {
        failures++;
        onTestComplete(test.fullTitle());
    });

    runner.on('end', function () {
        setTimeout(onEnd, 0);
    });
}
