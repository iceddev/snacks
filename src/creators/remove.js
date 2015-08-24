'use strict';

const {
  REMOVE
} = require('../constants');

function remove(key){
  return {
    type: REMOVE,
    payload: {
      [key]: undefined
    }
  };
}

module.exports = remove;
