'use strict';

const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',

    // With the following option, Source Maps from loaders are processed for better results
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ]
    },

    devServer: {
        // We have to enable this since we are using HTML5 History API and then the index.html page
        // will likely have to be served in place of any 404 responses
        historyApiFallback: true,
        stats: 'minimal'
    }
});