import { UserData } from "../interfaces/interfaces";
import { CreateUser } from "../services/createUser";
import prisma from "../../prisma/prismaClient";
import { Prisma } from "@prisma/client";

const createUser = new CreateUser(prisma)

export class createUserUseCase{
    async execute(data: UserData){
        try{
           const user = await createUser.execute(data)
        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                return {message: "Use outro e-mail"}
            }
            console.log(error)
            return {message: "Houve algum erro, tente novamente mais tarde"}
        }
    } 
}