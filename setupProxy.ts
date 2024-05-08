const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
  app.use(
    import.meta.env.VITE_PUBLIC_API_HTTPS,
    createProxyMiddleware({
      target: import.meta.env.VITE_PUBLIC_API,
      changeOrigin: true,
    })
  );
};
