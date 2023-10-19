import { PrismaClient } from '@prisma/client';

export class FindCourses{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    async execute(){
        try{
            const courses = await this.prisma.courses.findMany({
                select:{
                    images: true,
                    name: true,
                    description: true
                }
            })
            if(courses.length < 0){
                return {errorSystem: "Houve algum erro, tente novamente mais tarde"}
            }
            return courses
        }catch(error){
            throw new Error("Cursos não encontrado")
        }
    }
}