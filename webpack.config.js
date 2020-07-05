const fs = require('fs-extra')
const path = require('path')                                        // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin')            // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!
// console.log(path.resolve('../../'))
console.log('path : ', path.resolve(__dirname, "../app-one/src/AppOne.js"));

const appPages = [{'appfolder': 'app-one', 'appName': 'AppOne'},
    {'appfolder': 'app-two', 'appName': 'AppTwo'}];
appPages.forEach(app => {
    console.log('src : ', path.resolve(__dirname, `../${app.appfolder}/src/${app.appName}`));
    console.log('target : ', path.resolve(__dirname, './build'));
    fs.copy(path.resolve(__dirname, `../${app.appfolder}/src/${app.appName}`), path.resolve(__dirname, `./build/${app.appName}`), err => {
            // dereference: true,
            // filter: file => file !== paths.appHtml,
            if (err) console.log('error : ', err);
            console.log('Copy complete');
    });
})
fs.copy(path.resolve(__dirname, './src/'), path.resolve(__dirname, './build'));
// appPages.forEach(app => {
//     fs.copy(path.resolve(__dirname, `../${app.appfolder}/src/${app.appName}/`), path.resolve(__dirname, './build/'));
// })
// fs.copy(source, destination, function (err) {
//     if (err){
//         console.log('An error occured while copying the folder.')
//         return console.error(err)
//     }
//     console.log('Copy completed!')
// });
module.exports = {                                      // moduel export (옛날 방식..)
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, "./build/index.js"),
        appOne: path.resolve(__dirname, "./build/AppOne/AppOne.js"),
        appTwo: path.resolve(__dirname, "./build/AppTwo/AppTwo.js")
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        // publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: "html-loader",
            //             options: { minimize: true }
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html', // public/index.html 파일을 읽는다.
            filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./build"),
        historyApiFallback: true
    }
}