import { PrismaClient, Prisma } from "@prisma/client"
import {Request, Response} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { genSalt, hash, compare } from "bcrypt"

const prisma = new PrismaClient()
const secret = process.env.SECRET as string

interface User{
    name: string
    email: string,
    password: string
}

interface Search{
    email: string,
    password: string
}

export class Database{
    async createUser(request: Request, response: Response){
        const { name, email, password }: User = request.body

        try{
            const salt = await genSalt(12)
            const passwordHash = await hash(password, salt)

            const user = await prisma.profile.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            })

            const token = jwt.sign({userId: user.id}, secret)
            return token
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                return response.status(403).json({message: "Por favor, use outro e-mail"})
            }
            console.log(error)
            return response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
        }
    }

    async delete(request: Request, response: Response){
        const token = request.headers.authorization as string

        try{
            const decodedToken = jwt.verify(token, secret) as JwtPayload
            const user = decodedToken.userId

            const getInfoUser = await prisma.profile.findUnique({
                where: {
                    id: user
                }
            }) as object

            //verifica se o id do usuario do token confere com o do banco
            if(Object.keys(getInfoUser).length > 0){
                const exclude = await prisma.profile.delete({
                    where: {
                        id: user
                    }
                })
                return response.status(200).json({message: "Usuario excluido como sucesso"})
            }
            return response.status(401).json({message: "Ação não autorizada"})
        }catch(error){
            response.status(403).json({message: "Ação não autorizada"})
        }
    }

    async readUser(request: Request, response: Response){
        const {email, password}: Search = request.body

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

    update(id: string){

    }
}

const uss = new Database()
//uss.create({name: "joao", email: "joaomaciel.dev@gmail.com", password: "123456"})
//uss.readUser({email: "joaomaciel.dev@gmail.com", password: "1234567"})