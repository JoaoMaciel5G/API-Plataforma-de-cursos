import prisma from "../../prisma/prismaClient"
import { secretKey } from "../environment_variables"
import { DeleteUser } from "../services/deleteUser"
import jwt, { JwtPayload } from "jsonwebtoken"
import { FindUserById } from "../services/findUserById"

const deleteUser = new DeleteUser(prisma)
const findUser = new FindUserById(prisma)

export class DeleteUserUseCase{
    async execute(token: string){
        try{
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload
            const userId = decodedToken.userId

            const getInfoUser = findUser.execute(userId)

            if(Object.keys(getInfoUser).length > 0){
                const excludeUser = await deleteUser.execute(userId)
                return
            }
            return {message: "Ação não autorizada"}
        }catch(error){
            throw new Error("Houve algum erro, tente novamente mais tarde")
        }
    }
}

