'use strict';

const createStore = require('@phated/redux-create-store');

const reducer = require('./reducers');
const creators = require('./creators');
const { put, get, del, createReadStream } = require('./level');

function snacks(app, opts, done){

  const namespace = opts.namespace || 'userConfig';

  const store = createStore(reducer);

  function getState(){
    return store.getState();
  }

  function init({ key, value }){
    return store.dispatch(creators.init(key, value));
  }

  function set(key, value){
    return put(key, value, { sync: true })
      .then(() => get(key))
      .then((val) => store.dispatch(creators.update(key, val)));
  }

  function unset(key){
    return del(key, { sync: true })
      .then(() => store.dispatch(creators.remove(key)));
  }

  app.expose(namespace, {
    set,
    unset,
    getState
  });

  createReadStream()
    .on('data', init)
    .on('end', () => done());
}

module.exports = snacks;
