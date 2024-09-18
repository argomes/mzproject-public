// config/web-push.js
const { readFileSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const webpush = require('web-push')

const pathToVapidKey = join(__dirname, 'vapidKeys.json'); 

if (!existsSync(pathToVapidKey)) {
  const keys = webpush.generateVAPIDKeys();
  writeFileSync(pathToVapidKey, JSON.stringify(keys));
}

const vapidKeys = JSON.parse(readFileSync(pathToVapidKey).toString());

webpush.setVapidDetails(
  'mailto:notificacao@mztv.com.br',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
const public_key = vapidKeys.publicKey
module.exports = {
  webpush,
  public_key
}