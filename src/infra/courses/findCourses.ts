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
            courses.map((item)=>{
                const { images, name, description } = item
                return {images, name, description}
            })
            return {error: "Deu erro ao buscar os cursos"}
        }catch(error){
            throw new Error("Cursos não encontrado")
        }
    }
}