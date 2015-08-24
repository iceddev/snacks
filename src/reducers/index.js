'use strict';

const _ = require('lodash');

const {
  INIT,
  UPDATE,
  REMOVE
} = require('../constants');

const initial = {};

function config(state = initial, { type, payload }){
  switch(type){
    case INIT:
      return _.assign({}, state, payload);
    case UPDATE:
      return _.assign({}, state, payload);
    case REMOVE:
      // the remove creator sets the value to undefined, so we can just assign
      return _.assign({}, state, payload);
    default:
      return state;
  }
}

module.exports = config;
