import { PrismaClient } from "@prisma/client"

export class UpdateSignature{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute (userId: string){
        const search = await this.prisma.signature.update({
            where: {
                user_id: userId
            },
            data: {
                status: "inativo"
            }
        })
        return search
    } 
}