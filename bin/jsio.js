#!/usr/bin/env node
// bin/jsiojs

var jsiojs = require('../lib/jsiojs_core')
 
var args = process.argv

var command = args[2]
var params = args.slice(3)

try {
  switch(command){
    case "create":
      jsiojs.createFile(params[0])
      break
    default:
      console.error("Invalid command")
      break
  }
} catch(err){
  console.error(err);
}