import { PrismaClient } from "@prisma/client"

export class FindUserByEmail{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute (email: string) {
        const search = await this.prisma.profile.findUniqueOrThrow({ where: { email } })
        return search
    } 
}