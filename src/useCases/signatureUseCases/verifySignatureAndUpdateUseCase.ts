import prisma from "../../../prisma/prismaClient";
import { FindSignature } from "../../infra/signature/findSignature";
import { UpdateSignature } from "../../infra/signature/updateSignature";

export class VerifySignatureAndUpdateUseCase{
    async execute({currentData, userId}: {currentData: Date, userId: string}){
        try{
            const activeSignature = await new FindSignature(prisma).execute({currentData, userId})
            if(!activeSignature){
                throw Error("Usuário não encontrado")
            }
            
            const updateSignature = await new UpdateSignature(prisma).execute(activeSignature!.user_id)
            if(!updateSignature){
                throw Error("Não foi possivel achar sua conta, tente novamente mais tarde")
            }

            return updateSignature
        }catch(error){
            throw Error(error.message); 
        }
    } 
}