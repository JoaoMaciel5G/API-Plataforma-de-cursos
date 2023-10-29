import prisma from "../../prisma/prismaClient.ts";
import { Prisma } from "@prisma/client";
import { CreateSignature } from "../infra/createSignature.ts";

const createSignature = new CreateSignature(prisma)

export class CreateSignatureUseCase{
    async execute({ type_signature, start_date, end_time, status, user_id }: Prisma.SignatureUncheckedCreateInput){
        try{
            const signature = createSignature.execute({ 
                type_signature,
                start_date,
                end_time,
                status,
                user_id
            })
            return signature
        }catch(error){
            throw Error(error.message); 
        }
    } 
}