const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    devtool: "source-map",

    output: {
        path: path.resolve(__dirname, '../../'),
        filename: "./dist/[name].js",
        sourceMapFilename: "./dist/[name].js.map",
        chunkFilename: './dist/[id].chunk.js',
        pathinfo: true,
        publicPath: "/"
    },

    resolve: {
        extensions: [
            ".ts",
            ".js",
            ".jsx",
            ".tsx"
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require('@proactive-as/pnp.vendor/pnp-vendor-manifest.json')
        }),
        new MiniCssExtractPlugin({
            filename: "./dist/[name].css",
            chunkFilename: "./dist/[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(process.cwd() + "/dist/*.*"),
                to: path.resolve(process.cwd() + "/package/010_Style_Library"),
                flatten: true
            }
        ],
            {
                copyUnmodified: true
            }
        )
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: './tsconfig.json' }
                    }

                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    }
};