require = require("@std/esm")(module,{"esm":"js"});
const apple = require("./apple.mjs").default;
var assert = require('assert');

module.exports = apple;


describe('apple', function() {
   it('want to eat kale', function() {
       assert.equal(apple(), 'eating kale with some lodash');
   });
});
