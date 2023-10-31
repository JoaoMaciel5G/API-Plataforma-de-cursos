import { PrismaClient } from "@prisma/client"

export class FindSignatureUserById{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute (userId: string){
        const search = await this.prisma.signature.findFirst({
             where: {
                user_id: userId
             }
        })
        return search
    } 
}