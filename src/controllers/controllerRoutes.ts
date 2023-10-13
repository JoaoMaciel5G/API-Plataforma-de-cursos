import {Request, Response} from "express"
import { genSalt, hash } from "bcrypt"
import {Database} from "../db/db-controllers.ts"
import { Prisma } from "@prisma/client"

const db = new Database()

async function createUser(request: Request, response: Response){
    const {name, email, password} = request.body

    try{
        const salt = await genSalt(12)
        const passwordHash = await hash(password, salt)
        const user = await db.create({ name, email, passwordHash })

        return response.status(201).json({message: "Usuário criado"})

    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
           return response.status(403).json({message: "Por favor, use outro e-mail"})
        }
        console.log(error)
        return response.status(403).json({message: "Houve algum erro, tente novamente mais tarde"})
    }
}

async function search(request: Request, response: Response) {
    const searchUserData = await db.searchUser()
    return response.status(200).json(searchUserData)
}

export {createUser, search}