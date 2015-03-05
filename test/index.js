'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var Irken = require('irken');

var snacks = require('../');

lab.experiment('snacks', function(){

  var app;

  lab.beforeEach(function(done){
    app = new Irken();
    done();
  });

  lab.test('exposes a cusor as `userConfig` on the application', function(done){
    app.register(snacks, function(err){
      code.expect(err).to.not.exist();
      code.expect(app.userConfig).to.exist();
      code.expect(app.userConfig.deref).to.be.a.function();
      done(err);
    });
  });

  lab.test('allows a custom namespace', function(done){
    var plugin = {
      register: snacks,
      options: { namespace: 'config' }
    };
    app.register(plugin, function(err){
      code.expect(err).to.not.exist();
      code.expect(app.config).to.exist();
      code.expect(app.config.deref).to.be.a.function();
      done(err);
    });
  });

  lab.test('updates the cursor upon change', function(done){
    app.register(snacks, function(err){
      code.expect(err).to.not.exist();

      app.userConfig.set('test', 1234);

      code.expect(app.userConfig.get('test')).to.exist();
      code.expect(app.userConfig.get('test')).to.equal(1234);
      done(err);
    });
  });

  lab.test('populates the cursor with previously saved props', function(done){
    app.register(snacks, function(err){
      code.expect(err).to.not.exist();
      code.expect(app.userConfig.get('test')).to.exist();
      code.expect(app.userConfig.get('test')).to.equal(1234);
      done(err);
    });
  });

  lab.test('overwrites already set values', function(done){
    app.register(snacks, function(err){
      code.expect(err).to.not.exist();

      app.userConfig.set('test', 'hello');

      code.expect(app.userConfig.get('test')).to.exist();
      code.expect(app.userConfig.get('test')).to.equal('hello');
      done(err);
    });
  });
});
