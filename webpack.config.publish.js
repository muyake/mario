const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        game: './public/js/game.js',

    },
    output: {
        path: __dirname + "/dist/",
        filename: "js/[name].[hash].js",
        publicPath:'https://muyake.github.io/mario/dist/'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            {
                test: /\.(png|jpg|ico)$/,
                loader: "url-loader?limit=81&name=./static/img/[hash].[ext]"
            }, {
                test: path.join(__dirname, 'public/js'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                }
            }, {
                test: /\.mp3(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/mp3/[hash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new extractTextPlugin("[name]-[hash].css"),
        new htmlWebpackPlugin({
            title: "",
            favicon: './public/images/ico/favicon.ico',
            filename: 'index.html',
            template: './public/template/index.ejs',
        }),
        new CleanWebpackPlugin(
            ['dist/'], 　 //匹配删除的文件
            {
                root: __dirname,
                　　　　　　　　　　 //根目录
                verbose: true,
                　　　　　　　　　　 //开启在控制台输出信息
                dry: false　　　　　　　　　　 //启用删除文件
            }
        )

    ]
}