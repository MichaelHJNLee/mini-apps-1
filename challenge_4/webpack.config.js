const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/src/index.jsx',
    output: {
        path: path.resolve(__dirname + '/client/dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    }
}