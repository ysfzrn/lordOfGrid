var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'index.js',
	libraryTarget: 'umd',
	library: 'ysfzrnLib'
  },
  devServer: {
    inline: true,
    port: 3000
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
    }),
  ],
  externals: {
    react: 'react',
    'react/addons': 'react'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        noParse: /node_modules/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
           "presets": ["react", "stage-2", "es2015"]
        }
      },
      {
      test: /\.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
     }
    ]
  }
}
