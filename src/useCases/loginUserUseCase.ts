import { compare } from "bcrypt";
import { Login } from "../interfaces/interfacesAndTypes.ts";
import prisma from "../../prisma/prismaClient.ts";
import { FindUserByEmail } from "../infra/findUserByEmail.ts";

const findUser = new FindUserByEmail(prisma)

export class LoginUserUseCase{
    async execute({email, password}: Login){
        try{
            const getInfoUser = await findUser.execute(email)
            const verifyPasswordIsEqual = await compare(password, getInfoUser!.password)
            
            if(!verifyPasswordIsEqual){
                throw Error("Usuário ou senha incorretos")
            }

            return getInfoUser
        }catch(error){
            throw Error("Usuário ou senha incorretos")
        }
    }
}

