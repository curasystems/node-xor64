node-xor64
==========

A simple package to xor 64 bit integers (byte buffers)

Install
-------
    npm install xor64

Why
---
I needed this module to create random 64 bit numbers and xor them to implement an acker system similar to what [storm](http://storm-project.net) does.

Note
----
This is not used in production yet, and may exhibit some issues. If you find any report them please.

Usage
-----

See the test.js which shows many examples. Most important use case for tracking is:

    var xor64 = require('xor64');

    // this will be true once all messages have been ack'ed
    var hasHandledAllMessages;

    var originalMessageId = xor64.createRandom();
    var trackingId = xor64.clone(originalMessageId); // of course in a real progam one could use the originalMessageId without cloning
    
    ...

    // start tracking dependentMessageIdA   
    dependentMessageIdA = xor64.createRandom();
    xor64.applyXor(trackingId, dependentMessageIdA);
    
    // start tracking dependentMessageIdB
    dependentMessageIdB = xor64.createRandom();
    xor64.applyXor(trackingId, dependentMessageIdA);

    // finished with originalMessageId    
    hasHandledAllMessages = xor64.applyXor(trackingId, originalMessageId);

    // finished with dependentMessageIdA    
    hasHandledAllMessages = xor64.applyXor(trackingId, dependentMessageIdA);

    // finished with dependentMessageIdB
    hasHandledAllMessages = xor64.applyXor(trackingId, dependentMessageIdB);

    require('assert').assert( hasHandledAllMessages === true );

