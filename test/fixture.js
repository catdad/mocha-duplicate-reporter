/* jshint node: true, mocha: true */

describe('[Example]', function() {
    var noop = function() {};
    it('performs a vague action', noop);
    
    [1,2,3].forEach(function(val) {
        it('is obviously written in a loop', noop);
    });
    
    it('tests the same thing over and over', noop);
    it('tests the same thing over and over', noop);
    
    it('forks forks forks', noop);
    
    describe('forks', function() {
        it('forks forks', noop);
    });
    
    // catched pending tests too
    it('performs a vague action');
});
