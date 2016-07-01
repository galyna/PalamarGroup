let path = require('path');

export let config = {
    origin: 'http://localhost:8080',
    mongoUrl: 'mongodb://localhost:27017/palamar_group',
    appSecret: 'secretKey',
    uploadDir: path.join(__dirname, 'uploads'),
    uploadsUrl: 'api/photo',
    ePochta: {
        gatewayOptions: {
            publicKey: "68718f1c032ac94bfea8f305bd1849a1",
            privateKey: "0ed4c532a55744c7c7a2a0e1efb08f10",
            url: "http://atompark.com/api/sms/"   
        },
        adminPhone: "+380963073149",
        sender: "PalamarG"
    }
};