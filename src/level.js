'use strict';

/* TODO: doens't expose all levelup methods, just what I need */

const levelup = require('levelup');
const memdown = require('memdown');
const { defer } = require('when');
const { createCallback } = require('when/node');

const db = levelup('snacks', {
  db: memdown,
  valueEncoding: 'json'
});

function get(key, opts = {}){
  const d = defer();
  const cb = createCallback(d.resolver);

  db.get(key, opts, cb);

  return d.promise;
}

function put(key, value, opts = {}){
  const d = defer();
  const cb = createCallback(d.resolver);

  db.put(key, value, opts, cb);

  return d.promise;
}

function del(key, opts = {}){
  const d = defer();
  const cb = createCallback(d.resolver);

  db.del(key, opts, cb);

  return d.promise;
}

function createReadStream(opts = {}){
  return db.createReadStream(opts);
}

module.exports = {
  get,
  put,
  del,
  createReadStream
};
