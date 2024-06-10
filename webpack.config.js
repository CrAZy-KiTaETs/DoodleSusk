// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "https": require.resolve("https-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
    },
  },
};
