'use strict';

const {
  UPDATE
} = require('../constants');

function update(key, value){
  return {
    type: UPDATE,
    payload: {
      [key]: value
    }
  };
}

module.exports = update;
