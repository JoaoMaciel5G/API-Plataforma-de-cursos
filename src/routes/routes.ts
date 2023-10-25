import {Router} from "express"
import { UserController } from "../controllers/userController.ts"
import { deleteMiddleware } from "../middlewares/deleteMiddleware.ts"
import { sendEmailMiddleware } from "../middlewares/sendEmailMiddleware.ts"
import { updatePasswordMiddleware } from "../middlewares/updatePasswordMiddleware.ts"

const router = Router()
const userController = new UserController()

router.get("/getCourses", (request, response)=>{
    userController.getCourses(request, response)
})

router.post("/create", (request, response)=>{
    userController.create(request, response)
})

router.post("/login", (request, response)=>{
    userController.loginUser(request, response)
})

router.post("/sendMail", sendEmailMiddleware, (request, response)=>{
     userController.sendEmail(request, response)
})

router.delete("/delete", deleteMiddleware, (request, response)=>{
    userController.delete(request, response)
})

router.patch("/updatePassword", updatePasswordMiddleware,  (request, response)=>{
    userController.updatePassword(request, response)
})

export default router