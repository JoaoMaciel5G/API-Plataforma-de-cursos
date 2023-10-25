const secretKey = process.env.SECRET
const emailNodeMailer = process.env.EMAIL_NODEMAILER
const passwdNodeMailer = process.env.PASSWD_NODEMAILER
const hostNodeMailer = process.env.HOST_NODEMAILER
const port = process.env.PORT_NODEMAILER
 

export {
    secretKey,
    emailNodeMailer,
    passwdNodeMailer,
    hostNodeMailer,
    port
}