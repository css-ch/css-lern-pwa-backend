const webPush = require('web-push');

export class PushRepository {

    async subscribe(psObject) {
        const subscription = {
            endpoint: psObject.endpoint,
            keys: {
                p256dh: psObject.keys.p256dh,
                auth: psObject.keys.auth
            },
        };

        const payload = {
            notification: {
                title: 'Willkommen',
                body: 'Danke dir dass du Push Benachrichtigungen aktiviert hast.',
            }
        };

        webPush.sendNotification(
            subscription,
            JSON.stringify(payload)
        );
    }
}
