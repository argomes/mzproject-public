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
  ],
};
