#!/usr/bin/env node
// bin/jsiojs

var jsiojs = require('../lib/jsiojs_core')
var colors = require("colors")
var program = require('commander');

program.version("42.0.0");

program
  .command("create [filename]")
  .description("Create a new js file")
  .action((filename) => 
    jsiojs
      .createFile(filename)
      .then(() => success(`File '${filename}' created with success !`))
      .fail(fail)    
  );

program
  .command("delete [filename]")
  .description("Delete a js file")
  .action((filename) => 
    jsiojs
      .deleteFile(filename)
      .then(() => success(`File '${filename}' deleted with success !`))
      .fail(fail)      
  );
  
program
  .command("rename [oldname] [newname]")
  .description("Rename a js file")
  .action((oldname, newname) => 
      jsiojs
        .renameFile(oldname, newname)
        .then(() => success(`File '${oldname}' moved to '${newname}' with success !`))
        .fail(fail)
  );

program
  .command("copy [source] [destination]")
  .description("Copy a js file")
  .action((source, destination) => 
      jsiojs
        .copyFile(source, destination)
        .then(() => success(`File '${source}' copied to '${destination}' with success !`))
        .fail(fail)
  );
  
program
  .command("show [filename]")
  .description("Show a js file")
  .action((filename) => 
      jsiojs
        .showFile(filename)
        .then((content) => console.info(content))
        .fail(fail)
  );

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function success(message){ console.info(message .green); }
function fail(message) { console.error(message .red); }
