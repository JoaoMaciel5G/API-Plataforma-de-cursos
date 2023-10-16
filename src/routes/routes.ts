import {Router} from "express"
import { Database } from "../db/db-controllers.ts"

const router = Router()
const db = new Database()

router.post("/register", (request, response)=>{
    const uss = db.createUser(request, response)
    return uss
})
router.post("/register/forgot-password", (request, response)=>{
    const usus = db.sendEmail(request, response) 
    return usus
})

export default router