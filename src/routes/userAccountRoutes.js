import { Router } from 'express';
import userAccountController from '../controllers/userAccount.controller.js';



const router = Router();

//todo - ? in server middleware or not with (/:url);

router.post('/:url/register',userAccountController.createUserAccount);
router.post('/:url/login',userAccountController.loginUser);
router.delete('/:url/user/:user',userAccountController.deleteUser);
router.patch('/:url/user/:user',userAccountController.updateUser);
router.patch('/:url/user/:user/role:role')









export default router;