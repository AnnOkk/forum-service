import { Router } from 'express';
import postController from '../controllers/post.controller.js';
import validate, {postSchemas} from "../middlewares/validation.middleware.js";

const router = Router();

router.post('/post/:author', validate(postSchemas.createPost), postController.createPost)
router.get('/post/:id', postController.getPostById)
router.delete('/post/:id', postController.deletePost)
router.patch('/post/:id/like', postController.addLike)
router.get('/posts/author/:author', postController.getPostsByAuthor)
router.patch('/post/:id/comment/:commenter', validate(postSchemas.addComment), postController.addComment)
router.get('/posts/tags', postController.getPostsByTags)
router.get('/posts/period', validate(postSchemas.dateFormat, 'query'), postController.getPostsByPeriod)
router.patch('/post/:id', validate(postSchemas.updatePost), postController.updatePost)

export default router;