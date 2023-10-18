import {Request, Response} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { genSalt, hash, compare } from "bcrypt"
import { UserData } from "../interfaces/interfaces"

export class UserController{
    async createUser(request: Request, response: Response){
        const { name, email, password }: UserData = request.body

        try{
            const salt = await genSalt(12)
            const passwordHash = await hash(password, salt)

            

            const token = jwt.sign({userId: user.id}, secretKey)
            return response.status(201).json({message: token})
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                return response.status(403).json({message: "Por favor, use outro e-mail"})
            }
            console.log(error)
            return response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async delete(request: Request, response: Response){
        const authToken = request.headers.authorization as string
        const token = authToken && authToken.split(" ")[1]

        try{
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId

            const getInfoUser = await prisma.profile.findUnique({
                where: {
                    id: userId
                }
            }) as object

            //verifica se o id do usuario do token confere com o do banco
            if(Object.keys(getInfoUser).length > 0){
                const excludeUser = await prisma.profile.delete({
                    where: {
                        id: userId
                    }
                })
                return response.status(200).json({message: "Usuario excluido como sucesso"})
            }
            return response.status(401).json({message: "Ação não autorizada"})
        }catch(error){
            response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async loginUser(request: Request, response: Response){
        const { email, password }: Search = request.body

        try{
            const getInfoUser = await prisma.profile.findUnique({
                where: {
                    email
                }
            })
            
            const verifyPasswordIsEqual = await compare(password, getInfoUser?.password as string)

            if(!verifyPasswordIsEqual){
                 return response.status(401).json({message: "E-mail ou senha incorreto"})
            }

            return response.status(200).json({message: "Logado com sucesso"})
        }catch(error){
            console.log(error)
            return response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async sendEmail(request: Request, response: Response){
        const authToken = request.headers.authorization as string
        const token = authToken && authToken.split(" ")[1]
        const configTransport = {
            host: hostNodeMailer,
            port: port,
            secure: false,
            auth: {
                user: emailNodeMailer,
                pass: passwdNodeMailer
        }}

        const transport = nodemailer.createTransport(configTransport as object)

        try{
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId

            //pega o email do banco de dados e envia para o email que pediu a redefinição de senha
            const getInfoUser = await prisma.profile.findUnique({
                where: {
                    id: userId
                },
                select: {
                    email: true
                }
            }) as User

            if(Object.keys(getInfoUser).length > 0){
                const emailUser =  getInfoUser.email
                const send = await transport.sendMail({
                    from: `Pro Tech Cursos <${emailNodeMailer}>`,
                    to: emailUser,
                    subject: "Redefinição de senha",
                    html: `<h2>Você solicitou uma redefinição de senha?</h2><p>Para redefinir sua senha, entre no link a seguir <a href="google.com">Redefinir senha</a></p><p>Se você não solicitou esta ação, ignore este email.</p>`
                })

                return response.status(200).json({message: "Concluido"}) 
            }
            return response.status(403).json({message: "Ação não autorizada"})
        }catch(error){
            console.log(error)
            return response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async updatePassword(request: Request, response: Response){
        const { password } = request.body
        const authToken = request.headers.authorization as string
        const token = authToken && authToken.split(" ")[1]

        try{
            const salt = await genSalt(12)
            const passwordHash = await hash(password, salt)
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId

            const user = await prisma.profile.update({
                where: {
                    id: userId
                },
                data: {
                   password: passwordHash
                }
            })

            return response.status(200).json({message: "Dados atualizados com sucesso"})
        }catch(error){
            console.log(error)
            return response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }
}