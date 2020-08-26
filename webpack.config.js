const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CSSExtract = new MiniCssExtractPlugin({filename:'styles.css'})

module.exports = (env) => {
    const isProduction = env === 'production'
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules:[
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                } 
            ]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }

    }
}



// {
//     test: /\.s?css$/,
//     use: CSSExtract.extract({
//         use:[
//             {
//                 loader: 'css-loader',
//                 options: {
//                     sourceMap: true
//                 }
//             },
//             {
//                 loader: 'sass-loader',
//                 options: {
//                     sourceMap: true
//                 }
//             }
//         ]
//     })

// }