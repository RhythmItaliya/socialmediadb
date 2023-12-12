const nodemailer = require('nodemailer');

const email = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: "info@livefilmnews.com",
        pass: "9098@#Millie2",
    },
});

const sendMail = async (to, subject, html) => {
    info = await email.sendMail({
        from: 'info@livefilmnews.com',
        to: to,
        subject: subject,
        html: html,
    });
    console.log(info);
}

module.exports = sendMail;
