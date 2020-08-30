const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    build: path.join(__dirname, '../build'),
    src: path.join(__dirname, '../src'),
    assets: 'assets/'
};



module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        'index': PATHS.src
    },
    output: {
        path: PATHS.build,
        filename: `${PATHS.assets}scripts/[name].js`,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                   vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader?indentedSyntax',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    plugins: [
        new MiniCssExtractPlugin ({
            filename: `${PATHS.assets}styles/[name].css`
        }),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: `${PATHS.src}/index.html`,
            filename: 'index.html'
        })
    ]
};

