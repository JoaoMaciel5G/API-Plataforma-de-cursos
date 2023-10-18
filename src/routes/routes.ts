import {Router, response} from "express"
import { Database } from "../db/db-controllers.ts"
import { DatabaseCourses } from "../db/db-courses.ts"

const router = Router()
const db = new Database()
const courses = new DatabaseCourses()

router.post("/register", (request, response)=>{
    db.createUser(request, response)
})
router.post("/register/forgot-password", (request, response)=>{
    db.sendEmail(request, response) 
})

router.get("/", async (request, response)=>{
    const uss = await courses.getCourses()
    uss?.map((item)=>{
        console.log(item.images)
    })
    return
})

export default router