const path = require('path');

module.exports = {
  devServer: {
    historyApiFallBack: true,
    contentBase: path.resolve(__dirname, 'public'),
    proxy: {
      '/v2/**': {
        target: 'http://api.ad-weave.io',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
