import prisma from "../../prisma/prismaClient.ts"
import { FindCourses } from "../infra/courses/findCourses.ts"

const findCourses = new FindCourses(prisma)

export class GetCoursesUseCase{
    async execute(){
        try{
            const find = await findCourses.execute()
            return find
        }catch(error){
            console.log(error)
            throw Error("Houve um erro ao buscar os cursos")
        }
    }
}