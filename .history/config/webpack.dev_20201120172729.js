const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.js');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "../dev_built"),
        chunkFilename: `[name].[hash].js`,
    },
    // resolve: {
    //     // extensions: ['.js', '.json', '.vue'],
    //     alias: {
    //         vue$: 'vue/dist/vue.esm.js'
    //     }
    // },
    devServer: {
        historyApiFallback: true,
        clientLogLevel: "info",
        host: "0.0.0.0",
        port: "8090",
        open: false,
        contentBase: path.resolve(__dirname, "../"),
        publicPath: "/",
        disableHostCheck: true,
        proxy: {
            "/xian": "http://localhost:9081",
            "/task": "http://localhost:9081",
            '/common': 'http://localhost:9081',
            '/backend_rbac': 'http://localhost:9081',
            '/tvclass/api/v1/': 'http://stag.bssmini.pandora.xiaomi.com/tvclass/api/v1/'
        },
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../common/components'),
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({
        //     Vue: ["vue/dist/vue.esm.js", "default"],
        // }),
    ],
})
module.exports = devWebpackConfig;
// 可以增加编译完成提示访问链接
