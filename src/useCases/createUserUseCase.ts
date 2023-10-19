import { UserData } from "../interfaces/interfacesAndTypes.ts";
import { CreateUser } from "../infra/createUser.ts";
import prisma from "../../prisma/prismaClient.ts";
import { Prisma } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const createUser = new CreateUser(prisma)

export class createUserUseCase{
    async execute({email, password, name}: UserData){
        try{
            const salt = await genSalt(12)
            const passwordHash = await hash(password, salt)
            
            const user = await createUser.execute({
                name,
                email,
                password: passwordHash
            })
            return user
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                return {errorEmailUsed: "Use outro e-mail"}
            }
            console.log(error)
            return {errorSystem: "Houve algum erro, tente novamente mais tarde"}
        }
    } 
}