var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PROD__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

//全部output的頁面js擁有許多相同處 (像 React 的元件)，webpack 可以分析出共通處並額外整合成一組在頁面間可快取的共用包:common.js
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        bundle: './entry.js'
    },
    output: {
        path: __dirname,  //webpack 建置專案的路徑
        filename: '[name].js',
        publicPath: "/assets/" //webpack 使用 require() 時參考的路徑
    },
    plugins: [definePlugin, commonsPlugin],
    module: {
        loaders: [
            {test: /\.scss$/, loader: "sass-loader"},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.coffee$/, loader: 'coffee-loader'},
            {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
            //當圖片大小小於 8k 時使用 base64 URL, 其餘使用直接連接到圖片的 URL
            {test: /\.(jpg|png)/, loader: 'url-loader?limit=8192'},
        ]
    },
    resolve: {
        // 設定後只需要寫 require('file') 而不用寫成 require('file.coffee')
        extensions: ['', '.js', '.jsx', '.coffee']
    }
};