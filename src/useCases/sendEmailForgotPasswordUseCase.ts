import nodemailer from "nodemailer"
import { passwdNodeMailer, emailNodeMailer, port, hostNodeMailer } from "../environment_variables.ts"
import prisma from "../../prisma/prismaClient.ts"
import { FindUserByEmail } from "../infra/findUserByEmail.ts"

const findUser = new FindUserByEmail(prisma)

export class SendEmailForgotPasswordUseCase{
    async execute(email: string, url: string, token: string) {
        try{
            const configTransport= {
                host: hostNodeMailer,
                port: port,
                secure: false,
                auth: {
                    user: emailNodeMailer,
                    pass: passwdNodeMailer
            }}
            const transport = nodemailer.createTransport(configTransport as object)

            const find = await findUser.execute(email)

            const send = await transport.sendMail({
                from: `Pro Tech Cursos`,
                to: find?.email,
                subject: "Redefinição de senha",
                html: `<h2>Você solicitou uma redefinição de senha?</h2></br><h3>Para redefinir sua senha, entre no link a seguir para <a href="${url}/change-password?token=${token}">Redefinir senha</a></h3></br><h3>Se você não solicitou esta ação, ignore este email.</h3>`
            })
        }catch(error){
            throw Error(error.message)
        }
    }
}