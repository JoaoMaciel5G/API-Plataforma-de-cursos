import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"

export class CreateSignature{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute (data: Prisma.SignatureUncheckedCreateInput){
        const search = await this.prisma.signature.create({data: data})
        return search
    } 
}