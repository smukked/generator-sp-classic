const webPackConfig = require('./webpack.config');
const webpackMerge = require('webpack-merge');
const fs = require('fs-extra');
const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');
const appPackageJson = JSON.parse(fs.readFileSync('./package.json'));
const proxySetting = appPackageJson.proxy;
const proxyConfig = prepareProxy(proxySetting, "./");

module.exports = webpackMerge(webPackConfig, {
    devServer: {
        disableHostCheck: false,
        compress: true,
        contentBase: ["./"],
        watchContentBase: true,
        publicPath: '/',
        https: false,
        overlay: false,
        historyApiFallback: {
            disableDotRule: true,
            index: './Default.html'
        },
        proxy: proxyConfig,
        stats: {
            colors: true
        },
        port: "4321"
    }
});