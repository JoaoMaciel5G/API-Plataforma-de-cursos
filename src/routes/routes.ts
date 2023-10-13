import {Router} from "express"
import {createUser, search} from "../controllers/controllerRoutes.ts"

const router = Router()

router.post("/register", (request, response)=>{
    createUser(request, response)
})
router.get("/register/account", (request, response)=>{
    search(request, response)
})

export default router