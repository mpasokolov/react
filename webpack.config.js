const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({path: path.join(__dirname, 'frontend'), fullPath: false});

module.exports = {
    entry: {
        app: './index.jsx',
    },
    context: `${__dirname}/frontend/web/js`,
    output: {
        path: `${__dirname}/frontend/web/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/frontend/web/build/',
    },

    optimization: {
        minimize: NODE_ENV !== 'development',
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        assetsPluginInstance,
        new webpack.DefinePlugin({ __IS_DEV__: NODE_ENV === 'development' }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/frontend/web/js`,
                loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-1',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.sass$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
    },

    // devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
};
