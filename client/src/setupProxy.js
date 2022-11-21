const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/auth', {
      target: process.env.REACT_APP_SERVER_API_URL,
      changeOrigin: true,
    })
  );
};
