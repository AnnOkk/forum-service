import { Router } from "express";
import UserAccountController from "../controllers/UserAccount.controller.js";


const router = Router();

router.post('/register', UserAccountController.register)
router.post('/login', UserAccountController.login)
router.delete('/user/:login', UserAccountController.deleteUser)
router.patch('/user/:login', UserAccountController.updateUser)
router.patch('/user/:login/role/:role',UserAccountController.addRole)
router.delete('/user/:login/role/:role',UserAccountController.removeRole)
router.patch('/password', UserAccountController.changePassword)
router.get('/user/:login', UserAccountController.getUser)


export default router;