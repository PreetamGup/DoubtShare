import { Router } from "express";
import doubtController from "../controller/DoubtController.js";
import authentication from "../middleware/authentication.js";

const router = Router();

router.post("/createdoubt",authentication ,doubtController.createDoubt)

router.get("/alldoubt/:id",authentication ,doubtController.allDoubts)



export default router