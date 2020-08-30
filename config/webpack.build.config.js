const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        publicPath: ''
    }
});

module.exports = new Promise(resolve => {
    resolve(buildWebpackConfig)
});
