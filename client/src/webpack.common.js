const path = require('path');

module.exports = {
    entry: [
        path.resolve(__dirname, 'app', 'index')
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.(jpe?g|png)$/,
                use: 'file-loader'
            }
        ]
    },
}