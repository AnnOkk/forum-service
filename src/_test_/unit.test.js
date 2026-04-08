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

const { default: userAccountController } = await import('../controllers/userAccount.controller.js');
const { default: userAccountService } = await import('../services/userAccount.service.js');

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
            await expect(userAccountController.changeUsersPassword(req, res, next))
                .rejects.toThrow('Not implemented');
        });
    });
});
