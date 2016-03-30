#!/usr/bin/env node
// bin/jsiojs

var jsiojs = require('../lib/jsiojs_core')
var colors = require("colors")
var program = require('commander');

program.version("42.0.0")

program
  .command("create [filename]")
  .description("Create a new js file")
  .action(function(filename){
    jsiojs.createFile(filename).then(function(){
      success('File '+filename+' created with success !')
    }).fail(fail)    
  });

program
  .command("delete [filename]")
  .description("Delete a js file")
  .action(function(filename){
    jsiojs.deleteFile(filename).then(function(){
      success('File '+filename+' deleted with success !')
    }).fail(fail)      
  });
  
program
  .command("rename [oldname] [newname]")
  .description("Rename a js file")
  .action(function(oldname, newname) {
      jsiojs.renameFile(oldname, newname).then(function(){
        success('File '+oldname+' moved to '+newname+' with success !')        
      }).fail(fail)
  })

program
  .command("copy [source] [destination]")
  .description("Copy a js file")
  .action(function(source, destination) {
      jsiojs.copyFile(source, destination).then(function(){
        success('File '+source+' copied to '+destination+' with success !')      
      }).fail(fail)
  })
  
program
  .command("show [filename]")
  .description("Show a js file")
  .action(function(filename) {
      jsiojs.showFile(filename).then(function(content){
        console.info(content)     
      }).fail(fail)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function success(message){
  console.info(message .green)
}

function fail(message){
  console.error(message .red)
}
