const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackDevServer = require('webpack-dev-server');
const env = process.env.WEBPACK_ENV;
const webpack = require('webpack');

const config = {
    entry: './client/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: __dirname + '/example'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                // activate source maps via loader query
                'css?sourceMap!' +
                'sass?sourceMap&' +
                'includePaths[]=' +
                './client/sass-globals')
        }]
    },
    plugins: [
        new ExtractTextPlugin("./styles.css")
    ]
};

var host = '0.0.0.0';
var port = '9000';

if (env === 'dev') {
    new WebpackDevServer(webpack(config), {
        contentBase: './public',
        hot: true,
        debug: true
    }).listen(port, host, function (err, result) {
            if (err) {
                console.log(err);
            }
        });
    console.log('-------------------------');
    console.log('Local web server runs at http://' + host + ':' + port);
    console.log('-------------------------');
}

module.exports = config;