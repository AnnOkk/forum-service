import userAccountService from "../services/userAccount.service.js";

class UserAccountController {
    async createUserAccount(req, res, next) {
        try {
            const user = await userAccountService.createUserAccount(req.body);
            return res.status(201).json(user);
        } catch (e) {
            return next(e);
        }
    }

    async loginUser(req, res, next) {
        try {
            const success = await userAccountService.loginUser(req.params.url);
            return res.json(success);
        } catch (e) {
            return next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await userAccountService.deleteUser(req.params.user);
            return res.json(user);
        } catch (e) {
            return next(e);
        }
    }

    async updateUser(req, res, next) {
        try{
        const user = await userAccountService.updateUser(req.params.user,req.body);
        return res.json(user);
        }
        catch (e) {
            return next(e);
        }
    }

    async addRole(req, res, next) {
        try{
            const user = await userAccountService.addRole(req.params.user,req.params.role);
            return res.json(user);
        }catch (e) {
            return next(e);
        }
    }

    async deleteRole(req, res, next) {
        try{
            const user = await userAccountService.deleteRole(req.params.user,req.params.role);
            return res.json(user);
        }
        catch (e) {
            return next(e);
        }
    }

    async changeUsersPassword(req, res, next) {
        //TODO handle change user password
        throw new Error('Not implemented');
    }

    async getUser(req, res, next) {
        try{
            const user = await userAccountService.getUser(req.params.user);
            return res.json(user);
        }catch (e) {
            return next(e);
        }
    }
}

export default new UserAccountController();