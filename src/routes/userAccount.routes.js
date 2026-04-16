import { Router } from "express";
import userAccountController from "../controllers/userAccount.controller.js";
import validate from "../middlewares/validation.middleware.js";
import authorization from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/register",validate('register'), userAccountController.register);
router.post("/login", userAccountController.login);
router.delete("/user/:login",authorization.isOwnerOrAdmin(), userAccountController.deleteUser);
router.patch("/user/:login",authorization.isOwner(),validate('updateUser'), userAccountController.updateUser);
router.patch("/user/:login/role/:role",validate('changeRoles', 'params'), userAccountController.addRole);
router.delete("/user/:login/role/:role",validate('changeRoles', 'params'), userAccountController.deleteRole);
router.patch("/password", userAccountController.changePassword);
router.get("/user/:login", userAccountController.getUser);

export default router;