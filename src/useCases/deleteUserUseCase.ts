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

            if(!getInfoUser?.id){
                throw Error("Usuário não encontrado", {cause: "notFound"})
            }
            const excludeUser = await deleteUser.execute(id)
            return
        }catch(error){
            throw Error(error)
        }
    }
}

