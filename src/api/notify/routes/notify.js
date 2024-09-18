module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/notify/payments',
      handler: 'notify.handleRequest',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/notify/publickey',
      handler: 'notify.handlePublicKey',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
