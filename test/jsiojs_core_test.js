var jsiojs = require("../lib/jsiojs_core")
var chai = require("chai")
var chaiAsPromised = require("chai-as-promised")
var fs = require("fs")

chai.should()
chai.use(chaiAsPromised)

describe('jsiojs', () => {
    
    beforeEach(init)  
    
    afterEach(clean)
  
    describe('#createFile', () => 
        it('Should create a javascript file', () => 
            jsiojs.createFile("hello.js").then(() => fs.existsSync("hello.js").should.be.true)
        )
    )

    describe('#createFile', () =>   
        it('Should fail when no filename',  () =>
            jsiojs.createFile().should.be.rejectedWith("filename is missing")
        )
    )
    
    describe('#createFile', () => 
        it('Should fail when not a javascript file', () =>
            jsiojs.createFile("hello.txt").should.be.rejectedWith("'hello.txt' is not a valid javascript filename")
        )
    )
    
    describe('#createFile', () =>   
        it('Should fail when file already exists', () =>
            jsiojs.createFile("wonderfull.js").should.be.rejectedWith("'wonderfull.js' already exists")
        )
    )
})

describe('jsiojs', () => {

    beforeEach(init)  
    
    afterEach(clean)  
  
    describe('#deleteFile', () =>
        it('Should delete a javascript file', () =>
            jsiojs.deleteFile('wonderfull.js').then(() => fs.existsSync('wonderfull.js').should.be.false)                
        )
    )
    
    describe('#deleteFile', () => 
        it('Should fail when no filename', () =>
            jsiojs.deleteFile().should.be.rejectedWith("filename is missing")
        )
    )
    
    describe('#deleteFile', () =>  
        it('Should fail when not a javascript file', () =>
            jsiojs.deleteFile("wonderfull.txt").should.be.rejectedWith("'wonderfull.txt' is not a valid javascript filename")
        )
    )
    
    describe('#deleteFile', () => 
        it('Should fail when file does not exist', () =>
            jsiojs.deleteFile("hello.js").should.be.rejectedWith("'hello.js' does not exist")
        )
    )

})

describe('jsiojs', () => {

    beforeEach(init)  
    
    afterEach(clean)
    
    describe('#renameFile', () =>
        it('Should rename a javascript file', () =>
            // When
            jsiojs.renameFile("wonderfull.js","hello.js").then(() => {
              // Then
              fs.existsSync("wonderfull.js").should.be.false
              fs.existsSync("hello.js").should.be.true
            })
        )
    )
    
    describe('#renameFile', () =>   
        it('Should fail when no filename', () =>
            jsiojs.renameFile().should.be.rejectedWith("filename is missing")
        )
    )
    
    describe('#renameFile', () => 
        it('Should fail when only one filename', () => {
            jsiojs.renameFile("wonderfull.js").should.be.rejectedWith("filename is missing")
        })
    )
    
    describe('#renameFile', () =>
        it('Should fail when oldname not a javascript file', () =>
            jsiojs.renameFile("wonderfull.txt", "hello.js").should.be.rejectedWith("'wonderfull.txt' is not a valid javascript filename")                
        )
    )
    
    describe('#renameFile', () =>
        it('Should fail when newname not a javascript file', () =>
            jsiojs.renameFile("wonderfull.js", "hello.txt").should.be.rejectedWith("'hello.txt' is not a valid javascript filename")
        )
    )    
    
    describe('#renameFile', () =>   
        it('Should fail when oldname does not exist', () =>
            jsiojs.renameFile("hello.js", "wonderfull.js").should.be.rejectedWith("'hello.js' does not exist")
        )
    )
    
    describe('#renameFile', () =>   
        it('Should fail when newname already exists', () =>
            jsiojs.renameFile("wonderfull.js", "another.js").should.be.rejectedWith("'another.js' already exists")               
        )
    )    

})

describe('jsiojs', () => {

    beforeEach(init)  
    
    afterEach(clean)  
  
    describe('#copyFile', () =>
        it('Should copy a javascript file', () =>
            jsiojs.copyFile("wonderfull.js", "hello.js").then(() => {
              fs.existsSync("wonderfull.js").should.be.true
              fs.existsSync("hello.js").should.be.true
            })
        )
    )
    
    describe('#copyFile', () =>  
        it('Should fail when no filename', () =>
            jsiojs.copyFile().should.be.rejectedWith("filename is missing")
        )
    )
    
    describe('#copyFile', () =>  
        it('Should fail when only one filename', () =>
            jsiojs.copyFile("wonderfull.js").should.be.rejectedWith("filename is missing")
        )
    )
    
    describe('#copyFile', () =>
        it('Should fail when source not a javascript file', () =>
            jsiojs.copyFile("wonderfull.txt", "hello.js").should.be.rejectedWith("'wonderfull.txt' is not a valid javascript filename")
        )
    )
    
    describe('#copyFile', () =>  
        it('Should fail when destination not a javascript file', () =>
            jsiojs.copyFile("wonderfull.js", "hello.txt").should.be.rejectedWith("'hello.txt' is not a valid javascript filename")
        )
    )    
    
    describe('#copyFile', () =>   
        it('Should fail when source does not exist', () =>
            jsiojs.copyFile("hello.js", "hi.js").should.be.rejectedWith("'hello.js' does not exist")
        )
    )
    
    describe('#copyFile', () =>
        it('Should fail when destination already exists', () =>
            jsiojs.renameFile("wonderfull.js", "another.js").should.be.rejectedWith("'another.js' already exists")
        )
    )     

})

describe('jsiojs', () => {

    beforeEach(init)  
    
    afterEach(clean)  
  
    describe('#showFile', () =>
        it('Should show a javascript file', () =>
            jsiojs.showFile("wonderfull.js").should.eventually.equal("//A simple js file")
        )
    )

    describe('#showFile', () =>  
        it('Should fail when no filename', () =>
            jsiojs.showFile().should.be.rejectedWith("filename is missing")
        )
    )
    
    describe('#showFile', () =>   
        it('Should fail when not a javascript file', () =>
            jsiojs.showFile("wonderfull.txt").should.be.rejectedWith("'wonderfull.txt' is not a valid javascript filename")
        )
    )
    
    describe('#showFile', () => 
        it('Should fail when file does not exist', () =>
            jsiojs.showFile("hello.js").should.be.rejectedWith("'hello.js' does not exist")
        )
    )
})

function init() {
  fs.writeFile("wonderfull.js", "//A simple js file")
  fs.writeFile("wonderfull.txt", "A simple text file")
  fs.writeFile("another.js", "// Yet another js file")
}

function clean() {
  deleteIfExists("wonderfull.js")
  deleteIfExists("wonderfull.txt")
  deleteIfExists("hello.js")
  deleteIfExists("hello.txt")
  deleteIfExists("another.js")
}

function deleteIfExists(filename){
  if(fs.existsSync(filename)){
    fs.unlink(filename)
  }
}