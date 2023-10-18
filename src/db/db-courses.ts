import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class DatabaseCourses{
    async getCourses(){
        try{
            const courses = await prisma.courses.findMany({
                select:{
                    images: true,
                    name: true,
                    description: true
                }
            })
            return courses
        }catch(error){
            console.log(error)
        }
    }
}