import {Router} from "express"
import { UserController } from "../controllers/userController.ts"

const router = Router()
const userController = new UserController()

router.get("/getCourses", async (request, response)=>{
    return userController.getCourses(request, response)
})

router.post("/create", async (request, response)=>{
    return userController.create(request, response)
})

router.post("/login", async (request, response)=>{
    return userController.loginUser(request, response)
})

router.post("/sendMail", async (request, response) => {
    return userController.sendEmail(request, response)
})

router.delete("/delete", (request, response)=>{
    return userController.delete(request, response)
})

router.patch("/updatePassword", async (request, response)=>{
    return userController.updatePassword(request, response)
})

export default router