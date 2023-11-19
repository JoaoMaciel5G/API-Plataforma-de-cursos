import {Router} from "express"
import { UserController } from "../controllers/userController.ts"
import { deleteMiddleware } from "../middlewares/deleteMiddleware.ts"
import { sendEmailMiddleware } from "../middlewares/sendEmailMiddleware.ts"
import { updatePasswordMiddleware } from "../middlewares/updatePasswordMiddleware.ts"
import { verifySignatureMiddleware } from "../middlewares/verifySignatureMiddleware.ts"

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

router.patch("/updatePassword", updatePasswordMiddleware, (request, response)=>{
    userController.updatePassword(request, response)
})

router.post("/createSignature", (request, response)=>{
    userController.buySignatureCourse(request, response)
})

router.post("/verifySignature", verifySignatureMiddleware, (request, response)=>{
    userController.verifySignature(request, response)
})

router.get("/getPlains", (request, response)=>{
    userController.getPlains(request, response)
})

router.get("/getCourses/:id", (request, response)=>{
    userController.getCoursesById(request, response)
})
export default router