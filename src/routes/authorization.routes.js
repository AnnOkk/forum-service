import  {Router} from "express";
import {ADMIN, MODERATOR} from "../configuration/constants.js";
import authorization from "../middlewares/authorization.middleware.js";

const router = Router();


router.all('/account/user/:login/role/:role', authorization.hasRole(ADMIN))
router.patch(['/account/user/:user','/forum/post/:id/comment/:user'],authorization.isOwner('user'))
router.post('/forum/post/:author', authorization.isOwner('author'))
router.delete('/account/user/:login', authorization.isOwnerOrHasRole('login',ADMIN))
router.patch('/forum/post/:id', authorization.isPostAuthor());
router.delete('/forum/post/:id', authorization.isPostAuthorOrHasRole('id',MODERATOR));


export default router;
