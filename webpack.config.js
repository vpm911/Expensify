const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// This is to separate css into a different file and not include it in the bundle.js

module.exports = (env)=> {
    console.log('env: '+env);
    const isProduction = env==='production' ;
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

    return {
        mode:'development',
        entry: './src/app.js',
        output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
        }
    ,
    module:{
        rules:[{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
        }, {
        test: /\.s?css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
        
        }
    ]
    },
        plugins:[CSSExtract],
        devtool: isProduction ? 'source-map':'inline-source-map',
        devServer:{
            contentBase: path.join(__dirname,'public'),
            port:3400,
            historyApiFallback:true
        }
    }
};