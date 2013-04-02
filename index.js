module.exports.create = create = function(lo,hi){
    var b = new Buffer([0,0,0,0,0,0,0,0])

    if(lo == null)
        lo = 0;
    if(hi == null)
        hi = 0;

    b.writeInt32LE(lo, 0);
    b.writeInt32LE(hi, 4);
    return b;
};

module.exports.clone = function(original){
    return create(loValue(original),hiValue(original));
}

module.exports.xor = function(x,y){
    return create( loValue(x) ^ loValue(y),  hiValue(x) ^ hiValue(y) );
};

module.exports.applyXor = function(target,value){   
    var lo = loValue(target) ^ loValue(value);
    var hi = hiValue(target) ^ hiValue(value);
    
    target.writeInt32LE(lo, 0);
    target.writeInt32LE(hi, 4);      

    if(lo===0 && hi===0)
        return 0;    
};

module.exports.createRandom = function(){
    return create( randInt32(), randInt32() );
};

module.exports.loValue = loValue = function(xor64) {
    return xor64.readInt32LE(0);
};

module.exports.hiValue = hiValue = function(xor64) {
    return xor64.readInt32LE(4);
};

module.exports.equal = function(a,b){
    return (loValue(a) == loValue(b) && hiValue(a) == hiValue(b));
};

var INT32_MAX = 0x7FFFFFFF;
var INT32_MIN = 0x80000000;
var INT_RANGE = 0xFFFFFFFF;

function randInt32(){
    return Math.floor((Math.random()*INT_RANGE)-INT32_MAX);
}