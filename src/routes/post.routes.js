import { Router } from 'express';
import postController from '../controllers/post.controller.js';
import validate, {validateReqQuery} from "../middlewares/validation.middleware.js";


const router = Router();

router.post('/post/:author',validate('createPost'), postController.createPost)
router.get('/post/:id',postController.getPostById)
router.delete('/post/:id',postController.deletePost)
router.patch('/post/:id/like',postController.addLike)
router.get('/posts/author/:author',postController.getPostsByAuthor)
router.patch('/post/:id/comment/:commenter',validate('addComment'),postController.addComment)
router.get('/posts/tags',validateReqQuery('getPostsByTags'),postController.getPostsByTags)
router.get('/posts/period',postController.getPostsByPeriod)
router.patch('/post/:id',postController.updatePost)




export default router;