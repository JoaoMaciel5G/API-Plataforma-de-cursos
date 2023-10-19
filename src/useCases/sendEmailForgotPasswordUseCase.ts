import nodemailer from "nodemailer"
import { passwdNodeMailer, emailNodeMailer, port, hostNodeMailer } from "../environment_variables.ts"
import { FindUserById } from "../infra/findUserById.ts"
import prisma from "../../prisma/prismaClient.ts"

const findUser = new FindUserById(prisma)

export class SendEmailForgotPasswordUseCase{
    async execute(id: string) {
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
            const find = await findUser.execute(id)

            const send = await transport.sendMail({
                from: `Pro Tech Cursos <${emailNodeMailer}>`,
                to: find?.email,
                subject: "Redefinição de senha",
                html: `<h2>Você solicitou uma redefinição de senha?</h2><p>Para redefinir sua senha, entre no link a seguir <a href="google.com">Redefinir senha</a></p><p>Se você não solicitou esta ação, ignore este email.</p>`
            })
            return {sucess: "Email enviado"}
        }catch(error){
            console.log(error);
            return {errorSystem: "Houve algum erro, tente novamente mais tarde"}
        }
        
    }
}