const ExtractTextPlugin = require("extract-text-webpack-plugin");

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

module.exports = config;