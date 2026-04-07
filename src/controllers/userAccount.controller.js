import userAccountService from "../services/userAccount.service.js";

class UserAccountController {
    async createUserAccount(req, res, next) {
        try{
            const user = await userAccountService.createUserAccount(req.params.url,req.body);
            return res.status(201).json(user);
        }
        catch (e){
            return next(e);
        }
    }

    async loginUser(req, res, next) {
       try{
           const success = await userAccountService.loginUser(req.params.url);
           return res.json(success);
       }catch(e){
           return next(e);
       }
    }

    async deleteUser(req, res, next) {
        //TODO handle user delete
        throw new Error('Not implemented');
    }

    async updateUser(req, res, next) {
        //TODO handle user update
        throw new Error('Not implemented');
    }

    async addRole(req, res, next) {
        //TODO handle user role
        throw new Error('Not implemented');
    }

    async deleteRole(req, res, next) {
        //TODO handle delete user role
        throw new Error('Not implemented');
    }

    async changeUsersPassword(req, res, next) {
        //TODO handle change user password
        throw new Error('Not implemented');
    }

    async getUser(req, res, next) {
        //TODO handle get user
        throw new Error('Not implemented');
    }
}

export default new UserAccountController();