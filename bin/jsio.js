#!/usr/bin/env node
// bin/jsiojs

var jsiojs = require('../lib/jsiojs_core');
var colors = require("colors");
var program = require('commander');

program.version("42.0.0");

_program("create [filename]", "Create a new js file", (filename) => 
    jsiojs
      .createFile(filename)
      .then(() => _success(`File '${filename}' created with success !`))
      .fail(_fail)    
  );

_program("delete [filename]", "Delete a js file", (filename) => 
    jsiojs
      .deleteFile(filename)
      .then(() => _success(`File '${filename}' deleted with success !`))
      .fail(_fail)      
  );
  
_program("rename [oldname] [newname]", "Rename a js file", (oldname, newname) => 
      jsiojs
        .renameFile(oldname, newname)
        .then(() => _success(`File '${oldname}' moved to '${newname}' with success !`))
        .fail(_fail)
  );

_program("copy [source] [destination]", "Copy a js file", (source, destination) => 
      jsiojs
        .copyFile(source, destination)
        .then(() => _success(`File '${source}' copied to '${destination}' with success !`))
        .fail(_fail)
  );
  
_program("show [filename]", "Show a js file", (filename) => 
      jsiojs
        .showFile(filename)
        .then((content) => console.info(content))
        .fail(_fail)
  );

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function _program(command, description, doIt) {
  program
    .command(command)
    .description(description)
    .action(doIt);
}

function _success(message){ console.info(message .green); }
function _fail(message) { console.error(message .red); }
