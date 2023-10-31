import { PrismaClient } from "@prisma/client"

export class GetPlainsSignature{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute (){
        const search = await this.prisma.plainSignature.findMany()
        return search
    } 
}