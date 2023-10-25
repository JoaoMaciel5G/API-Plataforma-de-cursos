import { PrismaClient } from '@prisma/client';

export class DeleteUser{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute(userId: string){
        const deleteUser = await this.prisma.profile.delete({ where: { id: userId } })
    }
}