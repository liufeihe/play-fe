const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const utils = require('./utils.js')

const getEntries = ()=>{
    return {
        index: './src/pages/index/index.es6',
        layout: './src/pages/layout/layout.es6'
    }
}

let webpackCfg = {
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name]-[chunkhash].js'
    },
    devServer: {
        index: 'index.html',
        contentBase: false,
        publicPath: '/',
        port: 8080,
        open: true,
        proxy: {
            '/stock/*': {
                target: 'https://guorn.com',
                changeOrigin: true
              }
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                    // options: {
                    //     attrs: []
                    // }
                }
            },
            {
                test: /\.scss$/,
                // use: [
                //     "style-loader",
                //     "css-loader",
                //     "sass-loader"
                // ],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "resolve-url-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.es6?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    // 配置 url-loader 的可选项
                    options: {
                    // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
                      limit: 10000,
                    // 超出限制，创建的文件格式
                    // build/images/[图片名].[hash].[图片格式]
                      name: 'images/[name].[hash].[ext]'//utils.getAssetsPath('images/[name].[hash].[ext]')
                   }
                  }
                ]
            }
        ]
    },
    plugins: [
         //静态资源输出
         new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../src/libs"),
            to: 'libs/',//utils.getAssetsPath('libs'),
            ignore: ['.*']
        }]),
        new ExtractTextPlugin('css/[name].[hash].css')
    ]
}

//生成多个页面
var pages = [
    {
        filename: 'index.html',
        template: 'src/pages/index/index.html',
        chunks: 'index'
    },
    {
        filename: 'layout.html',
        template: 'src/pages/layout/layout.html',
        chunks: 'layout'
    }
]
pages.forEach(function(page) {
    var conf = {
        filename: page.filename, // 文件名，生成的html存放路径，相对于path
        template: page.template, // html模板的路径
        chunks: [page.chunks],
        inject: 'body', // //js插入的位置
        minify: { // 压缩HTML文件
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: false, // 删除空白符与换行符
            removeAttributeQuotes: true
        },
    }
    webpackCfg.plugins.push(new HtmlWebpackPlugin(conf))
});
module.exports = webpackCfg;