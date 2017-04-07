var webpack = require('webpack');

module.exports = {
    entry: './js/OwlbrewApp.js',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    devtool: '#eval-source-map',
    output: {
        path: __dirname,
        filename: 'bundle.js'
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
                exclude: /node_modules/, // do not lint third-party code
                loader: ['babel-loader', 'eslint-loader']
            }
        ]
    }
};