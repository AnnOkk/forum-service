import { Router } from 'express';
import postController from '../controllers/post.controller.js';
import validate from "../middlewares/validation.middleware.js";
import authorization from "../middlewares/authorization.middleware.js";

const router = Router();

router.post('/post/:author', authorization.isAuthorParam('author'),validate('createPost'), postController.createPost)
router.get('/post/:id', postController.getPostById)
router.delete('/post/:id',authorization.isAuthorOrModerator(), postController.deletePost)
router.patch('/post/:id/like', postController.addLike) //?
router.get('/posts/author/:author', postController.getPostsByAuthor)
router.patch('/post/:id/comment/:commenter', authorization.isAuthorParam('commenter'),validate('addComment'), postController.addComment)
router.get('/posts/tags', postController.getPostsByTags)
router.get('/posts/period', validate('dateFormat', 'query'), postController.getPostsByPeriod)
router.patch('/post/:id',authorization.isAuthor(), validate('updatePost'), postController.updatePost) //?

export default router;