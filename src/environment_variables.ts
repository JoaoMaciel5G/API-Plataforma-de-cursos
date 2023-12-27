const secretKey = process.env.SECRET
const emailNodeMailer = process.env.EMAIL_NODEMAILER
const passwdNodeMailer = process.env.PASSWD_NODEMAILER
const hostNodeMailer = process.env.HOST_NODEMAILER
const serviceNodeMailer = process.env.SERVICE_NODEMAILER
const secureNodeMailer = process.env.SECURE_NODEMAILER

export {
    secretKey,
    emailNodeMailer,
    passwdNodeMailer,
    hostNodeMailer,
    serviceNodeMailer,
    secureNodeMailer
}