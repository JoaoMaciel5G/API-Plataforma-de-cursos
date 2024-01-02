import {Router} from "express"
import { UserController } from "../controllers/userController.ts"
import { deleteMiddleware } from "../middlewares/deleteMiddleware.ts"
import { verifySignatureMiddleware } from "../middlewares/verifySignatureMiddleware.ts"

const router = Router()
const userController = new UserController()

router.get("/getCourses", userController.getCourses)

router.post("/create", userController.create)

router.post("/login", userController.loginUser)

router.post("/sendMail", userController.sendEmail)

router.delete("/delete", deleteMiddleware, userController.delete)

router.patch("/updatePassword", userController.updatePassword)

router.post("/createSignature", userController.buySignatureCourse)

router.post("/verifySignature", verifySignatureMiddleware, userController.verifySignature)

router.get("/getPlains", userController.getPlains)

router.get("/getCourses/:id", userController.getCoursesById)

router.post("/verifyExpToken", userController.verifyToken)

export default router