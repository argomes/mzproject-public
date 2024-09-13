'use strict';

/**
* A set of functions called "actions" for `notify`
*/

module.exports = {
	async handleRequest(ctx, next) {
		console.log(JSON.stringify(ctx.body))
		if (ctx.request.body.event === 'trigger-test') {
			try {
				let response = await fetch(ctx.request.header.url, {
					method: ctx.request.method  ,
					headers: {
						'Content-Type': ctx.request.header['content-type'],
						'Accept': ctx.request.header.accept,
						'Authorization': ctx.request.header.token
					},
					body: ctx.request.header.payload
				});
				if ([200, 201, 204].includes(response.status)) {
					return ctx.send('success', response.status);
				} else {
					return ctx.throw(response.status);
				}
			} catch(err) {
				return ctx.throw(err.status, 'failed');
			}
		} else {
			console.log('cheguei')
			return ctx.throw(403);
		}
	}
};
