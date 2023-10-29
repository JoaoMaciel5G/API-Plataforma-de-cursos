import { PrismaClient } from '@prisma/client';

export class FindCourses{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute(){
        const courses = await this.prisma.courses.findMany()
        return courses
    }
}