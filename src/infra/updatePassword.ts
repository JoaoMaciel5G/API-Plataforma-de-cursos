import { PrismaClient } from "@prisma/client"

export class UpdatePassword{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    async execute(id: string, password: string){
        const updatePassword = await this.prisma.profile.update({
            where: {
                id
            },
            data: {
                password
            }
        })
        return updatePassword
    }
}