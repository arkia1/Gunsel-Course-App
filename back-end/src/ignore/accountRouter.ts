import { Router } from "express";
import { createAccount, deleteAccount } from "../controllers/accountController";

const router = Router();

// [POST] http://localhost:3000/api/account/
router.post("/", createAccount);

// [DELETE] http://localhost:3000/api/account/5
router.delete("/:id", deleteAccount);

export default router;