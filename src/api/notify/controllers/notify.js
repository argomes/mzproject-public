'use strict';

/**
* A set of functions called "actions" for `notify`
*/

module.exports = {
	async handleRequest(ctx, next) {
		const data = await strapi
        .service('api::notify.notify').save_member(ctx.request.body)
		return ctx.send(data, 201)
	}
};
