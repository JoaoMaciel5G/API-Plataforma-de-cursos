import {Router} from "express"
import { Database } from "../db/db-controllers.ts"

const router = Router()
const db = new Database()

router.post("/register", (request, response)=>{
    db.createUser(request, response)
})
router.get("/register/account", (request, response)=>{
})

export default router