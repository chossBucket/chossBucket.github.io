#!/usr/bin/env node

var fs      = require('fs'),
    path    = process.argv[2],
    output  = process.argv[3],
    dictionary  = require(output);


if (path === '-h') console.log(
    '\n \t sortingScript.js [path to file] [output file] \n \t -h to display this text.\n'
  );


buff = fs.readFileSync(path);
langs = buff.toString().split('|');
deu = langs[0].split('\n').filter(function(word){
  if (word !== '') {
    return word;
  }
});
eng = langs[1].split('\n').filter(function(word){
  if (word !== '') {
    return word;
  }
});

if (deu.length !== eng.length) console.log("german words = ", deu.length, "\nenglish words = ", eng.length);

deu.forEach(function(word){
  dictionary.German.push(word);
});

eng.forEach(function(word){
  dictionary.English.push(word);
});

// console.log(dictionary);

fs.writeFile(output, JSON.stringify(dictionary), function(err){
  if (err) {
    throw err;
  console.log("OM NOM NOM\NFEED ME MORE WORDS!");
  }
});
