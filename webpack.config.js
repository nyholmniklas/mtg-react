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
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/public'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader', 'eslint-loader']
            }
        ]
    }
};
