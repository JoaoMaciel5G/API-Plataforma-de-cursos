import { genSalt, hash } from "bcrypt";
import { UpdatePassword } from "../infra/updatePassword.ts";
import prisma from "../../prisma/prismaClient.ts";

const findUser = new UpdatePassword(prisma)

export class UpdatePasswordUseCase{
    async execute(id: string, password: string) {
        try{
            const salt = await genSalt(12)
            const passwordHash = await hash(password, salt)

            const changePass = await findUser.execute(id, passwordHash)
        }catch(error){
            throw Error(error.message)
        }
    }
}