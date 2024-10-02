
const webPush = require('../../config/web-push');

  module.exports = () => {
    return async (ctx, next) => {
      await next();
  
      // check if product if product is updated
      if (
        ctx.request.method === "POST" &&
        ctx.request.url.includes("api::notification.notification")
      ) {
        const notificationData = ctx.response.body;
        if (notificationData.data.status == 'published') {

            const notification = await strapi.documents('api::notification.notification').findOne({
                documentId: notificationData.data.documentId,
                populate: 'member'
            })
           const subscription = notification.member.subscription_push_notification;
           const notificationPayload = {
            title: notification.title,
            body: notification.message,
            data: {
              url: notification.link,
            },
           }
           try{
           await webPush.webpush.sendNotification({
                endpoint: subscription['endpoint'],
                keys: {
                    auth: subscription['keys'].auth,
                    p256dh: subscription['keys'].p256dh
                }
            }, JSON.stringify(notificationPayload), {
              topic: null,
              urgency: 'high'
            })
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
          }
        }
      }
    };
  };