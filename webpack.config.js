const path = require('path');
module.exports = {
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
    use : [
        'style-loader',
        'css-loader','sass-loader']
    }
]
},
    devtool:'cheap-eval-source-map',

    devServer:{
         contentBase: path.join(__dirname,'public'),
         port:3400,
         historyApiFallback:true
    }
};