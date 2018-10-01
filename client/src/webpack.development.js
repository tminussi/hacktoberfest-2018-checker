const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true'
    ],
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCSSExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'app', 'index.html')
        })
    ]
});