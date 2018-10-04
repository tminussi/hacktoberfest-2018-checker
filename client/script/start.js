const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const developmentOptions = require('../src/webpack.development');
const productionOptions = require('../src/webpack.production');

let options;

if (process.env.NODE_ENV === 'development') {
    options = developmentOptions;
}
else if (process.env.NODE_ENV === 'production') {
    options = productionOptions;
}
else {
    console.error(`Couldn't load configuration for type: ${process.env.NODE_ENV}`);
    process.exit(1);
}

const server = express();
const compiler = webpack(options);
const port = Number.parseInt(process.env.PORT) || 8080;

server.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    logLevel: 'info'
}));

server.use(webpackHotMiddleware(compiler));

server.listen(port, 'localhost', error => {
    if (error) {
        console.log('error');
        process.exit(1);
        return;
    }

    console.log(`Server running at http://localhost:${port}`);
});