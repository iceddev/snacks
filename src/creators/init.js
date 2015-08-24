'use strict';

const {
  INIT
} = require('../constants');

function init(key, value){
  return {
    type: INIT,
    payload: {
      [key]: value
    }
  };
}

module.exports = init;
