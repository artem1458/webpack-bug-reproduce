const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RebuildNonDirectlyRelatedModulesPlugin = require('./RebuildNonDirectlyRelatedModulesPlugin')
const BabelPlugin = require('./BabelPlugin')

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript',
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        ["@babel/plugin-proposal-decorators", {
                            legacy: true
                        }]
                    ]
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new RebuildNonDirectlyRelatedModulesPlugin(),
    ]
};
