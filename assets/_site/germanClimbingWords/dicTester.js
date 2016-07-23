#!/usr/bin/env node
var dictionary  = require('./dictionary.json'),
    query       = process.argv[2];

console.log("the german for", dictionary.English[query] ,"is ", dictionary.German[query]);
