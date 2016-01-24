/* jshint node: true, mocha: true, expr: true */

var exec = require('child_process').exec;
var path = require('path');

var command = process.env.npm_package_scripts_duplicates;

var expect = require('chai').expect;

describe('[Output]', function() {
    var out;
    
    before(function(done) {
        exec(command, {
            cwd: path.resolve('.')
        }, function(err, stdout) {
            if (err) { throw err; }
            
            out = stdout;
            
            done();
        });
    });
    
    var regex =  /Regex report\:\s?([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)/;
    
    it('contains an easily parseable string', function() {
        expect(out).to.match(regex);
    });
    
    it('matches the fixture values', function() {
        var match = out.match(regex);
        
        expect(match).to.be.ok;
        
        var matchObj = {
            total: +match[1],
            pass: +match[2],
            fail: +match[3],
            pending: +match[4],
            dups: +match[5]
        };
        
        expect(matchObj).to.have.property('total').and.to.equal(9);
        expect(matchObj).to.have.property('pass').and.to.equal(8);
        expect(matchObj).to.have.property('fail').and.to.equal(0);
        expect(matchObj).to.have.property('pending').and.to.equal(1);
        expect(matchObj).to.have.property('dups').and.to.equal(4);
    });
    
    // Ew, this test is kind of a hack
    describe('print human readable results', function() {
        var matchObj = {
            'total tests': 0,
            'passed': 0,
            'failed': 0,
            'pending': 0,
            'duplicate names': 0
        };
        
        before(function() {
            var match = out.match(regex);
            
            matchObj = {
                'total tests': match[1],
                'passed': match[2],
                'failed': match[3],
                'pending': match[4],
                'duplicate names': match[5]
            };
        });
        
        Object.keys(matchObj).forEach(function(name) {
            it('for ' + name, function() {
                var test = new RegExp(matchObj[name]);

                expect(out).to.match(test);
            });
        });
    });
});
