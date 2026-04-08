import UserAccountRepository from "../repositories/userAccountRepository.js";
import {ConflictError, NotFoundError} from "../middlewares/AppError.js";

class UserAccountService {
    async createUserAccount(data) {
        try{
            return await UserAccountRepository.createUserAccount(data);

        }catch (e) {
            if (e.code === 11000) {
                throw new ConflictError('User already exists');
            }
            throw e;
        }
    }

    async loginUser(url) {
        //todo login
        throw new Error('Not implemented');
    }

    async deleteUser(user) {
        const userAccount = await UserAccountRepository.deleteUser(user);
        if (!userAccount) {
            throw new NotFoundError('not found');
        }
        return userAccount;
    }

    async updateUser(user, data) {
        const userAccount = await UserAccountRepository.updateUser(user, data);
        if (!userAccount) {
            throw new NotFoundError('not found');
        }
        return userAccount;
    }

    async addRole( user, role) {

        const userAccount = await UserAccountRepository.addRole(user, role.toUpperCase());
        if (!userAccount) {
            throw new NotFoundError('not found');
        }
        return userAccount;
    }

    async deleteRole( user, role) {
        const userAccount = await UserAccountRepository.deleteRole(user, role.toUpperCase());
        if (!userAccount) {
            throw new NotFoundError('not found');
        }
        return userAccount;
    }

    async changeUsersPassword( newPassword) {
        //TODO change password
        throw new Error('Not implemented');
    }

    async getUser(user) {
        const userAccount =  await UserAccountRepository.getUser(user);
        if (!userAccount) {
            throw new NotFoundError('not found');
        }
        return userAccount;
    }


}

export default new UserAccountService;