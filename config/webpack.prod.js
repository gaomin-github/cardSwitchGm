const path = require("path");
const webpack = require("webpack");
// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// css提取
const MinCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// js压缩
const TerserPlugin = require('terser-webpack-plugin');
// 多线程编译，加快打包速度
const HappyPack = require('happypack');
const happyLoaderId = 'happypack-for-react-babel-loader';
// 编译分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// preload
const PreloadWebpackPlugin = require('preload-webpack-plugin');
// inject内容修改

// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')


// 自定义上传模拟插件
const UploadMockPlugin = require('./uploadMock.js')
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base');
const prodWebpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        filename: "award_dist/js/[name].[chunkhash].js",
        chunkFilename: "award_dist/js/[name].[chunkhash].js",
        crossOriginLoading: "anonymous",
        path: path.resolve(__dirname, "../built"),
        // publicPath: 'www.baidu.com/'
        publicPath: "./",       //和生成文件inject到html的路径有关
    },
    devtool: "inline-source-map",
    // 编译加速
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'happypack/loader',
            query: {
                id: happyLoaderId
            },
            include: '/../src'
        }, {
            test: /\.(css|scss)$/,
            use: [{
                loader: MinCssExtractPlugin.loader,
                options: {
                    publicPath: '../../',
                }
            }, 'css-loader', "postcss-loader", "sass-loader"],
            exclude: /node_modules/,
            include: [
                path.resolve(__dirname, "../src"),
                path.resolve(__dirname, "../common/components"),
            ],
        }]
    },
    plugins: [
        // new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' }),
        new MinCssExtractPlugin({
            filename: 'award_dist/css/[name].css',
            chunkFilename: 'award_dist/css/[id].css'
        }),
        // new webpack.ProvidePlugin({
        //     Vue: ["vue/dist/vue.esm.js", "default"],
        // }),
        new ProgressBarPlugin(),
        new PreloadWebpackPlugin({
            rel: 'preload',
            as: 'script'
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    // maxSize: 5000,
                    chunks: 'initial',
                    priority: 10,
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    test: /[\\/]src[\\/]/,
                    // minSize: 1024,
                    chunks: 'async',
                    priority: 5,
                    reuseExistingChunk: true,
                }
            }
        },
        minimizer: [new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            terserOptions: {
                comments: false,
                warnings: false,
                compress: {
                    unused: true,
                    dead_code: true,
                    collapse_vars: true,
                    reduce_vars: true
                },
                output: {
                    comments: false
                }
            }
        }),
            // new UploadMockPlugin()
        ]
    }
});
if (process.env.npm_config_report) {
    prodWebpackConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: 'localhost',
        analyzerPort: 8090,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    }))
}

module.exports = prodWebpackConfig;
