import prisma from "../../prisma/prismaClient"
import { FindCourses } from "../infra/courses/findCourses"

const findCourses = new FindCourses(prisma)

export class GetCoursesUseCase{
    async execute(){
        try{
            const find = await findCourses.execute()
            return find
        }catch(error){
            console.log(error)
            return {errorSystem: "Houve algum erro, tente novamente mais tarde"}
        }
    }
}