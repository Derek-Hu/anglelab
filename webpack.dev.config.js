var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var assets = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var config = require('./config.json');

module.exports = {
    eslint: {
        fix: true,
        quiet: true,
        failOnError: false
    },
    entry: {
        boundle: './www/js/app.js',
        hot: require.resolve('./webpack/webpackHotDevClient')
    },
    output: {
        path: path.resolve(__dirname, config.buildDir),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].bundle.js',
        sourceMapFilename: 'maps/[file].map'
    },

    devtool: '#cheap-module-source-map',

    plugins: [
        new ProgressBarPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: 'www/index.ejs', inject: true })
    ],
    module: {
        preLoaders: [
           { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html' }, {
                test: /.*www\/img\/.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'url-loader?name=font/[name].[ext]&limit=8192',
                    'image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
                ]
            },
            { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss' }
        ]
    },

    postcss: function () {
        return [assets, autoprefixer({
            browsers: [
                'last 2 versions'
            ]
        })];
    }
};
