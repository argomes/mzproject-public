'use strict';

/**
* notify service
*/

module.exports = () => ({
	save_member: async(parameters) => {
		const { customer, charges } = parameters
		if (charges[0].payment_response.message == 'SUCESSO') {
			const value_by_day = 0.65
			const qnt_days = (charges[0].amount.value / 100) / value_by_day
			const validate_date = addDays(charges[0].paid_at , qnt_days)
			const members = await strapi.entityService.findMany('api::member.member', {
				filters:{$or:[{
					email: customer.email
				},
				{document: customer.tax_id}]},
				populate:{
					contributions_type: true
				}
			})
			
			if (members === undefined) {

				return await strapi.entityService.create('api::member.member',
					{
						data:{
							document: customer.tax_id,
							name: customer.name,
							email: customer.email,
							payment_date: charges[0].paid_at,
							validate_date: validate_date,
							link_payments_fetch: charges[0].links.find((link) => link.rel == 'SELF').href,
							is_active: false,
							contributions_type: 4
						}
					}
				)
			}
			const member =  members[0];
			member.payment_date = charges[0].paid_at
			member.validate_date = validate_date
			member.link_payments_fetch = charges[0].links.find((link) => link.rel == 'SELF').href
			member.link_payments_cancel = charges[0].links.find((link) => link.rel == 'CHARGE.CANCEL').href
			member.contributions_type.id = 4
			return await strapi.entityService.update('api::member.member', member.id, {
				data: member
			})
		}
	}
});

function addDays(date, days) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result.toISOString();
  }
