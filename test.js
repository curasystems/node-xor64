var xor64 = require('./index')

var assert = require('assert')

console.log('create with hi/lo numbers');
var m = xor64.create( 12, 15 );
assert( xor64.loValue(m) == 12 );
assert( xor64.hiValue(m) == 15 );

console.log('create 0 value');
var empty = xor64.create();
assert( xor64.loValue(empty) == 0 );
assert( xor64.hiValue(empty) == 0 );

console.log('compare for equality')
var n = xor64.create( 65, 42 );
assert( xor64.equal(m,n) == false, "values should not be equal" );

var m2 = xor64.create( 12, 15 );
assert( xor64.equal(m,m2) == true, "values should be equal");

console.log('cloning');
var a1 = xor64.create(913,741);
var cloned = xor64.clone(a1);
assert( xor64.equal(a1,cloned) == true, "cloned values should be equal");

console.log('create random (8 bytes)')
var a = xor64.createRandom();
assert( a.length == 8 , "values are 64 bit == 8 bytes");

console.log('xor\'ing values');
var x = xor64.create(56,92);
var y = xor64.create(12,58);

var result1 = xor64.xor(x,y);
assert( xor64.loValue(x) ^ xor64.loValue(y) === xor64.loValue(result1), 'low should be xor\'ed');
assert( xor64.hiValue(x) ^ xor64.hiValue(y) === xor64.hiValue(result1), 'high should be xor\'ed');

var result2 = xor64.xor(result1,x);
assert( xor64.equal(result2,y), 'xor again should result in original value' );

console.log('applying xor stores the result in the first parameter');
var valueToChange = xor64.create(83931,19812);
var valueToApply = xor64.create(101,239);
xor64.applyXor(valueToChange,valueToApply);
var expectedResult = xor64.create(83902,19851);
assert( xor64.equal(valueToChange,expectedResult), 'xorApply should have stored result in first parameter' );

console.log('applying multiple xors, each exactly twice should result in original value')

var original = xor64.createRandom();
//console.log(original);
var work = xor64.clone(original);
xor64.applyXor(work,x);
xor64.applyXor(work,y);
xor64.applyXor(work,y);
xor64.applyXor(work,x);
assert( xor64.equal(original,work), 'xor all values twice should result in original value' );

console.log('applyXor returns 0 when result is exactly 0 hi and lo');
var v = xor64.createRandom();
var o = xor64.createRandom();
xor64.applyXor(v,o);
assert( xor64.applyXor(v,o) === undefined );
assert( xor64.applyXor(v,v) === 0, 'all values xor\'ed twice should return 0');

console.log('toString');
var stringTest = xor64.create(0x2324,0x12);
//console.log(xor64.toHexString(stringTest));
assert( xor64.toHexString(stringTest) == '0000001200002324');


console.log('speed test')
var TEST_RANGE = 1000000;

console.log("Creating " + TEST_RANGE + " random 64bit numbers ...")
startedAt = new Date;
for (var i = 0; i < TEST_RANGE; i++) {
    var newRandom = xor64.createRandom();
};
stoppedAt = new Date;
//console.log(startedAt.getSeconds(), startedAt.getMilliseconds(),stoppedAt.getSeconds(),stoppedAt.getMilliseconds())
numbersPerSecond = Math.round(1000*TEST_RANGE/(stoppedAt-startedAt));
console.log("Created " + TEST_RANGE + " random 64bit numbers. Speed " + numbersPerSecond + " rands/s")

// Create a lot of random numbers and then find out whether any was already created
// they shouldn't have.
var randomNumbers = {};

console.log("Creating " + TEST_RANGE + " random 64bit numbers and checking uniqueness...")

for (var i = 0; i < TEST_RANGE; i++) {

    var newRandom = xor64.createRandom();
    assert( randomNumbers[xor64.toHexString(newRandom)] === undefined, "random numbers should be unique for small number of iterations" );
    randomNumbers[xor64.toHexString(newRandom)] = true;
};

/*
for (var i = randomNumbers.length - 1; i >= 0; i--) {
    console.log(randomNumbers[i]);
};*/

console.log("Created " + TEST_RANGE + " random 64bit numbers. All unique.")