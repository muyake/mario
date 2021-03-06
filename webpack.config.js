const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        // 主要为了输出样式      
        game: './public/js/game.js',       
    },
    output: {
        path: __dirname + "/dist/",
        filename: "js/[name].js",
       // publicPath:'/'
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
                loader: "url-loader?limit=819&name=./static/img/[name].[hash].[ext]"
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
                    name: 'static/mp3/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new extractTextPlugin("[name].css"),
        new htmlWebpackPlugin({
            title: "",
            favicon: './public/images/ico/favicon.ico',
            filename: 'index.html',
             chunks: ['game','pccss'],
            template: './public/template/index.ejs',
        })
        //,
        // new CleanWebpackPlugin(
        //     ['dist/'], 　 //匹配删除的文件
        //     {
        //         root: __dirname,
        //         　　　　　　　　　　 //根目录
        //         verbose: true,
        //         　　　　　　　　　　 //开启在控制台输出信息
        //         dry: false　　　　　　　　　　 //启用删除文件
        //     }
        // )

    ],
   
}