import { compare } from "bcrypt";
import { Login } from "../interfaces/interfacesAndTypes";
import { FindUserByEmail} from "../infra/findUserByEmail";
import prisma from "../../prisma/prismaClient";

const findUser = new FindUserByEmail(prisma)

export class LoginUserUseCase{
    async execute({email, password}: Login){
        try{
            const getInfoUser = await findUser.execute(email)
            const verifyPasswordIsEqual = await compare(password, getInfoUser?.password as string)

            if(!verifyPasswordIsEqual){
                return {isErrorEmailOrPassword: "E-mail ou senha incorreto"}
            }
            return {sucess: "Logado com sucesso"}
        }catch(error){
            console.log(error)
            return {errorSystem: "Houve algum erro, tente novamente mais tarde"}
        }
    }
}

