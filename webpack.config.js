const path = require('path')
const cleanBuildPlugin = require('clean-webpack-plugin')
const CommonChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
        new cleanBuildPlugin(path.resolve(__dirname, './build/')),
        new CommonChunkPlugin({ 
            filename: 'common.[hash:8].js', 
            name: 'common',
            minChunks: function(module, count) {
                console.log(module.resource, count);
                if(module.resource && module.resource.indexOf('a.js') > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        }),
        new HTMLWebpackPlugin({
            title: 'webpack deep dive',
            filename: 'index.html'
        })
    ]
}