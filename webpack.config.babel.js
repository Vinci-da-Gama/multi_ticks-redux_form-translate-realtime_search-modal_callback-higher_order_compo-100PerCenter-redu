import nPath              from 'path';
import wpk                from 'webpack';
import WriteFilePlugin    from 'write-file-webpack-plugin';
import UglifyJsPlugin     from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import wpkMerge           from 'webpack-merge';

const ast = './_asserts', distDir = `${ast}/dist`, 
    communal = './communal', devSrc = `${communal}/src/`, 
    sassLane = `${communal}/style`;
const entryIdx = `${devSrc}index.js`;
const npmLifecycle = process.env.npm_lifecycle_event;
console.log('14 -- npmLifecycle: ', npmLifecycle);

const pathsToClean = [
    `${distDir}/js/`,
    `${distDir}/*.json`,
    `${distDir}/*.js`
];

const cleanOptions = {
    watch: true
};

const isProduction = npmLifecycle === 'build:prod';

const commonConfig = {
    // for development.
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: {
        testApp: [
            'babel-polyfill',
            'webpack/hot/only-dev-server',
            entryIdx
        ]
    },
    output: {
        path: nPath.resolve(__dirname, `${distDir}`),
        // publicPath: '/',
        // filename: `/js/[name]-[hash:6]_bundle.js`,
        filename: 'js/[name]_bundle.js',
        pathinfo: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['env', 'react', 'stage-3'] }
            },
            {   test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true, sourceMap: true } },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', 'less']
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new wpk.HotModuleReplacementPlugin(),
        new wpk.optimize.OccurrenceOrderPlugin(),
        new wpk.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        /*when you use webpack-dev-server and you also want to output bundle.js*/
        new WriteFilePlugin(),
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: nPath.join(__dirname, `${ast}`),
        publicPath: `${distDir}`,
        stats: {
            colors: true,
            timings: true
        },
        quiet: false,
        noInfo: false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                sourceMap: true
            })
        ]
    }
};

// you also can define customized host and port here.
/* const processHostAndPort = {
    host: process.env.HOST,
    port: process.env.PORT
}; */

let wpkConfig;

// Detect how npm is run and branch based on that
switch(npmLifecycle) {
    case 'build:dev':
        console.log('117 -- development configutation...');
        wpkConfig = wpkMerge(commonConfig, {});
        break;
    default:
        console.log('121 -- default wpk configutation...');
        wpkConfig = wpkMerge(commonConfig, {});
        break;
}

module.exports = wpkConfig;