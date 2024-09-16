module.exports = ({ env }) => ({
    i18n: true,
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.ethereal.email'),
                port: env('SMTP_PORT', 587),
                auth: {
                    user: env('SMTP_USERNAME', 'araceli51@ethereal.email'),
                    pass: env('SMTP_PASSWORD', 'k72WKERuWXdQ9EZjm9'),
                },
                secure: true,
                tls: {
                    rejectUnauthorized: true,
                },
            }
        },
        settings: {
            defaultFrom: env('EMAIL_DEFAULT'),
            defaultReplyTo: env('EMAIL_DEFAULT'),
        },
    }
});
