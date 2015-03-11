'use strict';

var expect = require('expect');

var Irken = require('irken');

var snacks = require('../');

describe('snacks', function(){

  var app;

  beforeEach(function(done){
    app = new Irken();
    done();
  });

  it('exposes a cusor as `userConfig` on the application', function(done){
    app.register(snacks, function(err){
      expect(err).toNotExist();
      expect(app.userConfig).toExist();
      expect(app.userConfig.deref).toBeA(Function);
      done(err);
    });
  });

  it('allows a custom namespace', function(done){
    var plugin = {
      register: snacks,
      options: { namespace: 'config' }
    };
    app.register(plugin, function(err){
      expect(err).toNotExist();
      expect(app.config).toExist();
      expect(app.config.deref).toBeA(Function);
      done(err);
    });
  });

  it('updates the cursor upon change', function(done){
    app.register(snacks, function(err){
      expect(err).toNotExist();

      app.userConfig.set('test', 1234);

      expect(app.userConfig.get('test')).toExist();
      expect(app.userConfig.get('test')).toEqual(1234);
      done(err);
    });
  });

  it('populates the cursor with previously saved props', function(done){
    app.register(snacks, function(err){
      expect(err).toNotExist();
      expect(app.userConfig.get('test')).toExist();
      expect(app.userConfig.get('test')).toEqual(1234);
      done(err);
    });
  });

  it('overwrites already set values', function(done){
    app.register(snacks, function(err){
      expect(err).toNotExist();

      app.userConfig.set('test', 'hello');

      expect(app.userConfig.get('test')).toExist();
      expect(app.userConfig.get('test')).toEqual('hello');
      done(err);
    });
  });
});
