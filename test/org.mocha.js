var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
chai.Assertion.includeStack = true;

var should = chai.should();

var geoip = require('../index.js');
var Org = geoip.Org;
var file = path.resolve(__dirname, '../database/GeoIPASNum.dat');
var instance = new Org(file, true);

describe('Organization', function() {
  describe('Instance', function() {
    it('should be a object', function(done) {
      instance.should.be.an('object');
      setTimeout(done, 1);
    });

    it('should has a lookup method', function(done) {
      instance.lookup.should.be.a('function');
      setTimeout(done, 1);
    });

    it('should has a lookupSync method', function(done) {
      instance.lookupSync.should.be.a('function');
      setTimeout(done, 1);
    });

    it('should has a update method', function(done) {
      instance.update.should.be.a('function');
      setTimeout(done, 1);
    });

    it('should has a close method', function(done) {
      instance.close.should.be.a('function');
      setTimeout(done, 1);
    });
  });

  describe('Synchrouns Lookup', function() {
    it('should can find location by domain', function(done) {
      var data = instance.lookupSync('www.google.com');
      data.should.be.a('object');
      setTimeout(done, 1);
    });

    it('should can find location by ip address', function(done) {
      var data = instance.lookupSync('8.8.8.8');
      data.should.be.a('object');
      setTimeout(done, 1);
    });
  });

  describe('Asynchrouns Lookup', function() {
    it('should can find location by domain', function(doen) {
      instance.lookup('www.google.com', function(err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.be.an('object');
      }); 
    });

    it('should can find location by ip address', function(doen) {
      instance.lookup('8.8.8.8', function(err, data) {
        should.not.exist(err);
        should.exist(data);
        data.should.be.an('object');
      }); 
    });
  });

  describe('Update database on the fly', function() {
    it('should be ok', function(done) {
      instance.update(file).should.be.ok;
      setTimeout(done, 1);
    });
  });
});  
// var assert = require('assert'), 
//     geoip = require('../index.js');
// 
// var Org = geoip.Org;
// var org = new Org('../database/GeoIPASNum.dat', true);
// 
// var sync_data = org.lookupSync('8.8.8.8');
// console.log(sync_data);
// //assert.ok(sync_data, 'Can not find google in org module');
// 
// org.lookup('www.google.com', function(err, data) {
//     if (err) {throw err;}
//     if (data) {
//       console.log(data);
//       assert.deepEqual(sync_data, data, 'Oops! Async and sync org data not equal');
//     } else {
//       console.log('Data not found');
//     }
// });
// 
// assert.ok(org.update('../database/GeoIPASNum.dat'), 'Oops when updating org database');