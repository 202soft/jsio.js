// Sample for tonic : https://tonicdev.com/npm/jsiojs
var jsiojs = require("jsiojs")
// Start of my wonderfull project
jsiojs.createFile("wonderful.js")
      .then(function(){
        // Oh my god, the file contains a typo. I should fix !
        return jsiojs.renameFile("wonderful.js", "wonderfull.js") 
      }).then(function(){
         console.log("Ready for a wonderfull project !") 
      })
