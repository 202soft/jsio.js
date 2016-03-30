var chai = require('chai')
var jsiojs = require('../lib/jsiojs_core')
var fs = require("fs")
var MockFs = require("q-io/fs-mock");

var mockFs = MockFs()

chai.should()
var expect = chai.expect

// Prepare for test
var tmpDir = "tmp-"+Math.random()+"/"
fs.mkdirSync(tmpDir)

describe('jsiojs', function() {
    describe('#createFile', function() {
        it('Should create a javascript file', function() {
            // Given
            var fileName = generateFileName()
            fs.existsSync(fileName).should.be.false
            // When
            jsiojs.createFile(fileName).then(function(){
                 // Then
                fs.existsSync(fileName).should.be.true               
            })
        })
    })
    
    
    describe('#createFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            jsiojs.createFile().then(null, function(err){
                // Then
                err.to.be("file name is missing")
            })
        })
    })
    
    describe('#createFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            jsiojs.createFile(fileName).then(null, function(err){
                // Then
                err.to.be(fileName+" is not a valid javascript file name")
            })
        })
    })
    
    describe('#createFile', function() {   
    it('Should fail when file already exists', function() {
            // Given
            var fileName = generateFileName()
            fs.writeFileSync(fileName,"")
            fs.existsSync(fileName).should.be.true
            // When
            jsiojs.createFile(fileName).then(null, function(err){
                // Then
                err.to.be(fileName+" already exists")
            })
        })
    })
})

describe('jsiojs', function() {
    describe('#deleteFile', function() {
        it('Should delete a javascript file', function() {
            // Given
            var fileName = generateFileName()
            fs.writeFileSync(fileName,"")
            fs.existsSync(fileName).should.be.true
            // When
            jsiojs.deleteFile(fileName).then(function(){
              // Then
              fs.existsSync(fileName).should.be.false                
            })

        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            jsiojs.deleteFile().then(null, function(err){
                // Then
                err.to.be("file name is missing")
            })
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            jsiojs.deleteFile(fileName).then(null, function(err){
                // Then
                err.to.be(fileName+" is not a valid javascript file name")
            })
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when file does not exist', function() {
            // Given
            var fileName = generateFileName()
            fs.existsSync(fileName).should.be.false
            // When
            jsiojs.deleteFile(fileName).then(null, function(err){
                // Then
                err.to.be(fileName+" does not exist")
            })
        })
    })

})

describe('jsiojs', function() {
    describe('#renameFile', function() {
        it('Should rename a javascript file', function() {
            // Given
            var oldName = generateFileName()
            fs.writeFileSync(oldName,"")
            fs.existsSync(oldName).should.be.true
            var newName = generateFileName()
            fs.existsSync(newName).should.be.false
            // When
            jsiojs.renameFile(oldName, newName).then(function(){
              // Then
              fs.existsSync(oldName).should.be.false
              fs.existsSync(newName).should.be.true
            })
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            jsiojs.renameFile().catch(null, function(err){
                // Then
                err.to.be("file name is missing")  
            })
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when only one fileName', function() {
            // Given
            var oldName = generateFileName()
            // When
            jsiojs.renameFile(oldName).catch(null, function(err){
                // Then
                err.to.be("file name is missing")
            })
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when oldName not a javascript file', function() {
            // Given
            var oldName = generateFileName()+".txt"
            var newName = generateFileName()
            // When
            jsiojs.renameFile(oldName, newName).then(null, function(err){
                // Then
                err.to.be(oldName+" is not a valid javascript file name")                
            })

        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when newName not a javascript file', function() {
            // Given
            var oldName = generateFileName()
            var newName = generateFileName()+".txt"
            // When
            jsiojs.renameFile(oldName, newName).then(null, function(err){
                // Then
                err.to.be(newName+" is not a valid javascript file name")               
            })
        })
    })    
    
    describe('#renameFile', function() {   
        it('Should fail when oldName does not exist', function() {
            // Given
            var oldName = generateFileName()
            var newName = generateFileName()
            fs.existsSync(oldName).should.be.false
            // When
            jsiojs.renameFile(oldName, newName).then(null, function(err){
                // Then
                err.to.be(oldName+" does not exist")         
            })
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when newName already exists', function() {
            // Given
            var oldName = generateFileName()
            var newName = generateFileName()
            fs.writeFileSync(oldName,"")
            fs.writeFileSync(newName,"")
            fs.existsSync(newName).should.be.true
            // When
            jsiojs.renameFile(oldName, newName).then(null, function(err){
                // Then
                err.to.be(newName+" already exists")               
            })
        })
    })    

})
/*
describe('jsiojs', function() {
    describe('#copyFile', function() {
        it('Should copy a javascript file', function() {
            // Given
            var src = generateFileName()
            fs.writeFileSync(src,"")
            fs.existsSync(src).should.be.true
            var dest = generateFileName()
            fs.existsSync(dest).should.be.false
            // When
            jsiojs.copyFile(src, dest).then(function function_name(argument) {
              // Then
              fs.existsSync(src).should.be.true
              fs.existsSync(dest).should.be.true
            })
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.copyFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when only one fileName', function() {
            // Given
            var src = generateFileName()
            // When
            var fn = function(){ jsiojs.copyFile(src) }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when source not a javascript file', function() {
            // Given
            var src = generateFileName()+".txt"
            var dest = generateFileName()
            // When
            var fn = function(){  jsiojs.copyFile(src, dest) }
            // Then
            expect(fn).to.throw(src+" is not a valid javascript file name")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when destination not a javascript file', function() {
            // Given
            var src = generateFileName()
            var dest = generateFileName()+".txt"
            // When
            var fn = function(){  jsiojs.copyFile(src, dest) }
            // Then
            expect(fn).to.throw(dest+" is not a valid javascript file name")
        })
    })    
    
    describe('#copyFile', function() {   
        it('Should fail when source does not exist', function() {
            // Given
            var src = generateFileName()
            var dest = generateFileName()
            fs.existsSync(src).should.be.false
            // When
            var fn = function(){  jsiojs.copyFile(src, dest) }
            // Then
            expect(fn).to.throw(src+" does not exist")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when destination already exists', function() {
            // Given
            var src = generateFileName()
            var dest = generateFileName()
            fs.writeFileSync(src,"")
            fs.writeFileSync(dest,"")
            fs.existsSync(dest).should.be.true
            // When
            var fn = function(){  jsiojs.renameFile(src, dest) }
            // Then
            expect(fn).to.throw(dest+" already exists")
        })
    })     

})

describe('jsiojs', function() {
    describe('#showFile', function() {
        it('Should show a javascript file', function() {
            // Given
            var fileName = generateFileName()
            fs.writeFileSync(fileName,"")
            fs.existsSync(fileName).should.be.true
            // When
            jsiojs.showFile(fileName)
            // Then
            fs.existsSync(fileName).should.be.true
        })
    })
    
    
    describe('#showFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.showFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#showFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            var fn = function(){ jsiojs.showFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" is not a valid javascript file name")

        })
    })
    
    describe('#showFile', function() {   
    it('Should fail when file does not exist', function() {
            // Given
            var fileName = generateFileName()
             fs.existsSync(fileName).should.be.false
            // When
            var fn = function(){ jsiojs.showFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" does not exist")
        })
    })
})
*/

function generateFileName(){
    return tmpDir+Math.random()+".js"    
}