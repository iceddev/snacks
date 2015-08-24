'use strict';

var path = require('path');

var isTest = (process.argv.indexOf('--test') !== -1);

var loaders = [
  {
    test: /\.js$/,
    exclude: [
      /node_modules/
    ],
    loaders: [
      'babel-loader'
    ]
  }
];

if(isTest){
  loaders.push({
    test: /\.js$/,
    exclude: [
      /__tests__/,
      /node_modules/
    ],
    loader: 'isparta-loader'
  });
}

module.exports = {
  module: {
    loaders: loaders
  }
};
