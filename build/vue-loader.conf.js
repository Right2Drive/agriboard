'use strict'

const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = function vueLoaderConfig(env) {
  let tsLoader = null;
  switch (env) {
    case 'development':
      tsLoader = 'babel-loader!ts-loader!tslint-loader?{emitErrors:true,typeCheck:false,failOnHint:false}';
      break;

    case 'production':
      tsLoader = 'babel-loader!ts-loader!tslint-loader?{emitErrors:true,typeCheck:false,failOnHint:true}';
      break;

    case 'test':
      tsLoader = 'babel-loader!ts-loader';
      break;

    default:
      throw new Error(`No vue loader config for ${env} environment`);
  }

  return {
    loaders: {
      ...utils.cssLoaders({
        sourceMap: isProduction
          ? config.build.productionSourceMap
          : config.dev.cssSourceMap,
        extract: isProduction,
      }),
      ts: tsLoader,
    },
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href',
    }
  };
}
