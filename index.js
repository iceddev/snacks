'use strict';

var levelup = require('levelup');
var memdown = require('memdown');
var Immstruct = require('immstruct').Immstruct;

var db = levelup('snacks', { db: memdown, valueEncoding: 'json' });

function snacks(app, opts, cb){

  var loaded = false;

  var imm = new Immstruct();
  var structure = imm.get('userConfig', {});

  var config = structure.cursor();

  var namespace = opts.namespace || 'userConfig';

  app.expose(namespace, config);

  function onSwap(n, o, path){
    config = structure.cursor();
    app[namespace] = config;

    // don't proceed to saving if we aren't loaded
    if(!loaded){
      return;
    }

    // fire off in the background
    db.put(path, structure.cursor(path).deref());
  }

  structure.on('swap', onSwap);

  db.createReadStream()
    .on('data', function(data){
      config.set(data.key, data.value);
    })
    .on('end', function(){
      loaded = true;
      cb();
    });
}

module.exports = snacks;
