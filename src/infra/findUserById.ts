import { PrismaClient } from "@prisma/client"

export class FindUserById{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute (userId: string){
        const search = await this.prisma.profile.findUniqueOrThrow({ where: { id: userId } })
        return search
    } 
}