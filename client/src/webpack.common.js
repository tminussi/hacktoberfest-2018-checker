const path = require("path");

module.exports = {
  entry: [
    path.resolve(__dirname, "app", "index")
    //path.resolve(__dirname, "app", "i18n")
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png)$/,
        use: "file-loader"
      }
    ]
  }
};
