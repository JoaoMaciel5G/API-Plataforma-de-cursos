import prisma from "../../prisma/prismaClient.ts"
import { DeleteUser } from "../infra/deleteUser.ts"
import { FindUserById } from "../infra/findUserById.ts"
import { UserId } from "../interfaces/interfacesAndTypes.ts"

const deleteUser = new DeleteUser(prisma)
const findUser = new FindUserById(prisma)

export class DeleteUserUseCase{
    async execute(id: UserId){
        try{
            const getInfoUser = await findUser.execute(id)

            if(getInfoUser !== null && Object.keys(getInfoUser).length > 0){
                const excludeUser = await deleteUser.execute(id)
                return
            }
            return {errorActionForbidden: "Ação não autorizada"}
        }catch(error){
            console.log(error)
            return {errorSystem: "Houve algum erro, tente novamente mais tarde"}
        }
    }
}

