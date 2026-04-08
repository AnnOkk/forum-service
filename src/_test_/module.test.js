import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/userAccount.service.js', () => ({
    default: {
        createUserAccount: jest.fn(),
        loginUser: jest.fn(),
        deleteUser: jest.fn(),
        updateUser: jest.fn(),
        addRole: jest.fn(),
        deleteRole: jest.fn(),
        getUser: jest.fn(),
    }
}));

jest.unstable_mockModule('../services/post.service.js', () => ({
    default: {
        createPost: jest.fn(),
        getPostById: jest.fn(),
        addLike: jest.fn(),
        deletePost: jest.fn(),
        getPostsByAuthor: jest.fn(),
        addComment: jest.fn(),
        getPostsByTags: jest.fn(),
        getPostsByPeriod: jest.fn(),
        updatePost: jest.fn(),
    }
}));

const { default: userAccountController } = await import('../controllers/userAccount.controller.js');
const { default: userAccountService } = await import('../services/userAccount.service.js');
const { default: postController } = await import('../controllers/post.controller.js');
const { default: postService } = await import('../services/post.service.js');

describe('UserAccountController Unit Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('createUserAccount', () => {
        it('should create a user account and return 201', async () => {
            const userData = { username: 'testuser', email: 'test@example.com' };
            req.body = userData;
            userAccountService.createUserAccount.mockResolvedValue(userData);

            await userAccountController.createUserAccount(req, res, next);

            expect(userAccountService.createUserAccount).toHaveBeenCalledWith(userData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(userData);
        });

        it('should call next with error if service fails', async () => {
            const error = new Error('Service error');
            userAccountService.createUserAccount.mockRejectedValue(error);

            await userAccountController.createUserAccount(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('loginUser', () => {
        it('should login user and return json', async () => {
            req.params.url = 'test-url';
            const result = { token: 'jwt-token' };
            userAccountService.loginUser.mockResolvedValue(result);

            await userAccountController.loginUser(req, res, next);

            expect(userAccountService.loginUser).toHaveBeenCalledWith('test-url');
            expect(res.json).toHaveBeenCalledWith(result);
        });

        it('should call next with error if login fails', async () => {
            const error = new Error('Login failed');
            userAccountService.loginUser.mockRejectedValue(error);

            await userAccountController.loginUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUser', () => {
        it('should delete user and return json', async () => {
            req.params.user = 'user123';
            const deletedUser = { id: 'user123', deleted: true };
            userAccountService.deleteUser.mockResolvedValue(deletedUser);

            await userAccountController.deleteUser(req, res, next);

            expect(userAccountService.deleteUser).toHaveBeenCalledWith('user123');
            expect(res.json).toHaveBeenCalledWith(deletedUser);
        });

        it('should call next with error if deletion fails', async () => {
            const error = new Error('Delete failed');
            userAccountService.deleteUser.mockRejectedValue(error);

            await userAccountController.deleteUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateUser', () => {
        it('should update user and return json', async () => {
            req.params.user = 'user123';
            req.body = { displayName: 'New Name' };
            const updatedUser = { id: 'user123', displayName: 'New Name' };
            userAccountService.updateUser.mockResolvedValue(updatedUser);

            await userAccountController.updateUser(req, res, next);

            expect(userAccountService.updateUser).toHaveBeenCalledWith('user123', req.body);
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });
    });

    describe('addRole', () => {
        it('should add role and return json', async () => {
            req.params.user = 'user123';
            req.params.role = 'ADMIN';
            const updatedUser = { id: 'user123', roles: ['USER', 'ADMIN'] };
            userAccountService.addRole.mockResolvedValue(updatedUser);

            await userAccountController.addRole(req, res, next);

            expect(userAccountService.addRole).toHaveBeenCalledWith('user123', 'ADMIN');
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });
    });

    describe('deleteRole', () => {
        it('should delete role and return json', async () => {
            req.params.user = 'user123';
            req.params.role = 'ADMIN';
            const updatedUser = { id: 'user123', roles: ['USER'] };
            userAccountService.deleteRole.mockResolvedValue(updatedUser);

            await userAccountController.deleteRole(req, res, next);

            expect(userAccountService.deleteRole).toHaveBeenCalledWith('user123', 'ADMIN');
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });
    });

    describe('getUser', () => {
        it('should get user and return json', async () => {
            req.params.user = 'user123';
            const user = { id: 'user123', username: 'testuser' };
            userAccountService.getUser.mockResolvedValue(user);

            await userAccountController.getUser(req, res, next);

            expect(userAccountService.getUser).toHaveBeenCalledWith('user123');
            expect(res.json).toHaveBeenCalledWith(user);
        });
    });

    describe('changeUsersPassword', () => {
        it('should throw "Not implemented" error (as per current implementation)', async () => {
            // Текущая реализация контроллера просто выбрасывает ошибку, не оборачивая в try-catch
            await expect(userAccountController.changeUsersPassword(req, res, next))
                .rejects.toThrow('Not implemented');
        });
    });
});

describe('PostController Unit Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            sendStatus: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('createPost', () => {
        it('should create post and return 201', async () => {
            req.params.author = 'author1';
            req.body = { title: 'Test Title', content: 'Test Content' };
            const post = { id: 'post1', ...req.body, author: 'author1' };
            postService.createPost.mockResolvedValue(post);

            await postController.createPost(req, res, next);

            expect(postService.createPost).toHaveBeenCalledWith('author1', req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(post);
        });
    });

    describe('getPostById', () => {
        it('should get post by id', async () => {
            req.params.id = 'post1';
            const post = { id: 'post1', title: 'Test' };
            postService.getPostById.mockResolvedValue(post);

            await postController.getPostById(req, res, next);

            expect(postService.getPostById).toHaveBeenCalledWith('post1');
            expect(res.json).toHaveBeenCalledWith(post);
        });
    });

    describe('addLike', () => {
        it('should add like and return 204', async () => {
            req.params.id = 'post1';
            postService.addLike.mockResolvedValue();

            await postController.addLike(req, res, next);

            expect(postService.addLike).toHaveBeenCalledWith('post1');
            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });
    });

    describe('deletePost', () => {
        it('should delete post', async () => {
            req.params.id = 'post1';
            const deletedPost = { id: 'post1', deleted: true };
            postService.deletePost.mockResolvedValue(deletedPost);

            await postController.deletePost(req, res, next);

            expect(postService.deletePost).toHaveBeenCalledWith('post1');
            expect(res.json).toHaveBeenCalledWith(deletedPost);
        });
    });

    describe('getPostsByAuthor', () => {
        it('should get posts by author', async () => {
            req.params.author = 'author1';
            const posts = [{ id: 'post1' }];
            postService.getPostsByAuthor.mockResolvedValue(posts);

            await postController.getPostsByAuthor(req, res, next);

            expect(postService.getPostsByAuthor).toHaveBeenCalledWith('author1');
            expect(res.json).toHaveBeenCalledWith(posts);
        });
    });

    describe('addComment', () => {
        it('should add comment', async () => {
            req.params.id = 'post1';
            req.params.commenter = 'user1';
            req.body.message = 'Nice post!';
            const post = { id: 'post1', comments: [{ user: 'user1', message: 'Nice post!' }] };
            postService.addComment.mockResolvedValue(post);

            await postController.addComment(req, res, next);

            expect(postService.addComment).toHaveBeenCalledWith('post1', 'user1', 'Nice post!');
            expect(res.json).toHaveBeenCalledWith(post);
        });
    });

    describe('getPostsByTags', () => {
        it('should get posts by tags (single value)', async () => {
            req.query.values = 'tag1';
            const posts = [{ id: 'post1' }];
            postService.getPostsByTags.mockResolvedValue(posts);

            await postController.getPostsByTags(req, res, next);

            expect(postService.getPostsByTags).toHaveBeenCalledWith('tag1');
            expect(res.json).toHaveBeenCalledWith(posts);
        });

        it('should get posts by tags (array value)', async () => {
            req.query.values = ['tag1', 'tag2'];
            const posts = [{ id: 'post1' }];
            postService.getPostsByTags.mockResolvedValue(posts);

            await postController.getPostsByTags(req, res, next);

            expect(postService.getPostsByTags).toHaveBeenCalledWith('tag1,tag2');
            expect(res.json).toHaveBeenCalledWith(posts);
        });
    });

    describe('getPostsByPeriod', () => {
        it('should get posts by period', async () => {
            req.query.dateFrom = '2023-01-01';
            req.query.dateTo = '2023-01-31';
            const posts = [{ id: 'post1' }];
            postService.getPostsByPeriod.mockResolvedValue(posts);

            await postController.getPostsByPeriod(req, res, next);

            expect(postService.getPostsByPeriod).toHaveBeenCalledWith('2023-01-01', '2023-01-31');
            expect(res.json).toHaveBeenCalledWith(posts);
        });
    });

    describe('updatePost', () => {
        it('should update post', async () => {
            req.params.id = 'post1';
            req.body = { content: 'Updated' };
            const post = { id: 'post1', content: 'Updated' };
            postService.updatePost.mockResolvedValue(post);

            await postController.updatePost(req, res, next);

            expect(postService.updatePost).toHaveBeenCalledWith('post1', req.body);
            expect(res.json).toHaveBeenCalledWith(post);
        });
    });
});
