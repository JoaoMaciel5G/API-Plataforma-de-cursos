import prisma from "../../prisma/prismaClient.ts"
import { GetPlainsSignature } from "../infra/getPlainsSignatures.ts"

const getPlains = new GetPlainsSignature(prisma)

export class GetPlainsUseCase{
    async execute(){
        try{
            const get = await getPlains.execute()
            return get
        }catch(error){
            console.log(error)
            throw Error("Houve um erro ao buscar os planos")
        }
    }
}