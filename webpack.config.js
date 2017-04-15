var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/OwlbrewApp.jsx',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    devtool: '#eval-source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {test: /\.css$/, loaders: ['style', 'css']},
            {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/}
        ],
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'eslint-loader']
            }
        ]
    }
};