export default {
    email: {
        admin: {
            user: process.env.EMAIL_USER,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        },
    },
    adminURL: 'http://palamar.com.ua/admin.html',
    clientURL: 'http://palamar.com.ua',
}
