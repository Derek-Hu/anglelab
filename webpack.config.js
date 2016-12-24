var path = require('path');
var webpack = require( 'webpack');
var ProgressBarPlugin = require( 'progress-bar-webpack-plugin');
var WebpackNotifierPlugin = require( 'webpack-notifier');
var HtmlWebpackPlugin = require( 'html-webpack-plugin');
var assets = require('postcss-assets');
var autoprefixer = require( 'autoprefixer');

module.exports = {
    eslint: {
        fix: true,
        quiet: true,
        failOnError: false
    },
    entry: {
        app: './www/js/app.js'
    },
    output: {
        path: 'output',
        publicPath: '',
        filename: '[name].[hash].js',
        chunkFilename: "[id].[chunkhash].bundle.js",
        sourceMapFilename: 'maps/[file].map'
    },

    plugins: [
        new ProgressBarPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: true })
    ],
    module: {
        preLoaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html' }, {
                test: /\.(png|jpg)$/,
                loaders: [
                    // 'file',
                    "url-loader?name=images/[name]---[hash].[ext]&limit=8192"
                    // ,
                    // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    // 'image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 85}}'
                ]
            },
            { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss' }
        ]
    },

    postcss: function() {
        return [assets, autoprefixer({
            browsers: [
                "last 2 versions"
            ]
        })];
    }
};
