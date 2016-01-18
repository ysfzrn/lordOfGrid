module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 3000
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
