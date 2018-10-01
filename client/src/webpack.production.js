const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].[name].js'
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'app', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            }
        })
    ]
});