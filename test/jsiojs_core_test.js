var chai = require('chai')
var jsiojs = require('../lib/jsiojs_core')
var fs = require("fs")

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
            jsiojs.createFile(fileName)
            // Then
            fs.existsSync(fileName).should.be.true
        })
    })
    
    
    describe('#createFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.createFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#createFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            var fn = function(){ jsiojs.createFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" is not a valid javascript file name")

        })
    })
    
    describe('#createFile', function() {   
    it('Should fail when file already exists', function() {
            // Given
            var fileName = generateFileName()
            fs.writeFileSync(fileName,"")
            fs.existsSync(fileName).should.be.true
            // When
            var fn = function(){ jsiojs.createFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" already exists")
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
            jsiojs.deleteFile(fileName)
            // Then
            fs.existsSync(fileName).should.be.false
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.deleteFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            var fn = function(){  jsiojs.deleteFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" is not a valid javascript file name")
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when file does not exist', function() {
            // Given
            var fileName = generateFileName()
            fs.existsSync(fileName).should.be.false
            // When
            var fn = function(){  jsiojs.deleteFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" does not exist")
        })
    })

})



function generateFileName(){
    return tmpDir+Math.random()+".js"    
}