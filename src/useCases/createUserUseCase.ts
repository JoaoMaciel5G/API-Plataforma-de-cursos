import { UserData } from "../interfaces/interfacesAndTypes.ts";
import { CreateUser } from "../infra/createUser.ts";
import prisma from "../../prisma/prismaClient.ts";
import { Prisma } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const createUser = new CreateUser(prisma)
const { PrismaClientKnownRequestError } = Prisma

export class CreateUserUseCase{
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
            if(error instanceof PrismaClientKnownRequestError){
                throw Error("Use outro e-mail", {cause: "email"}); 
            }
            throw Error(error.message); 
        }
    } 
}