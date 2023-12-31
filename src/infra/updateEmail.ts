import { PrismaClient } from "@prisma/client"

export class UpdateEmail{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute(userId: string, email: string){
        const updateEmail = await this.prisma.profile.update({
            where: {
                id: userId
            },
            data: {
                email
            }
        })
    }
}