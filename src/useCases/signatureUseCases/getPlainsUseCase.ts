import prisma from "../../../prisma/prismaClient.ts"
import { GetPlainsSignature } from "../../infra/signature/getPlainsSignatures.ts"

const getPlainsSignatures = new GetPlainsSignature(prisma)

export class GetPlainsUseCase{
    async execute(){
        try{
            const getPlains = await getPlainsSignatures.execute()
            return getPlains
        }catch(error){
            console.log(error)
            throw Error("Houve um erro ao buscar os planos")
        }
    }
}