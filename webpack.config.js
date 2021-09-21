const path = require('path')
const cleanBuildPlugin = require('clean-webpack-plugin')
const Webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: '[name].[hash:8].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                enforce: 'pre',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime', "@babel/plugin-syntax-dynamic-import"],
                    },
                }                
            }
        ]
    },
    plugins: [
        new Webpack.SourceMapDevToolPlugin({
            exclude: ['vendor.js'],
            filename: '[name].map'
        }),
        new cleanBuildPlugin(path.resolve(__dirname, './build/')),
        new HTMLWebpackPlugin({
            title: 'webpack deep dive',
            filename: 'index.html'
        })
    ]
}