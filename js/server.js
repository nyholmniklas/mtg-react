const path = require('path');
const express = require('express');


const app = express();
const indexPath = path.join(__dirname, '/../public/index.html');
const publicPath = express.static(path.join(__dirname, '../public'));

app.use('/css', publicPath + '/css');
app.use('/public', publicPath);
app.get('/', function (_, res) {
    res.sendFile(indexPath);
});

const port = (process.env.PORT || 8080);

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
}

app.listen(port);
console.log(`Listening at http://localhost:${port}`);