import UserAccount from "../models/userAccount.model.js";


class UserAccountRepository {
    async createUserAccount(user) {
        return UserAccount.create(user);
        // const account = new UserAccount(user);
        // return account.save();
    }

    async loginUser(url) {
        //TODO login
    }

    async deleteUser(user) {
        return UserAccount.findOneAndDelete({login: new RegExp(`^${user}$`, 'i')}).exec();
    }

    async updateUser(user, data) {
        return UserAccount.findOneAndUpdate({login: new RegExp(`^${user}$`, 'i')}, data, {new: true}).exec()
    }
    async addRole(user,role){
    return UserAccount.findOneAndUpdate({login: new RegExp(`^${user}$`, 'i')},{$addToSet:{roles: role}},{new:true}).exec();
    }
    async deleteRole(user,role){
        return UserAccount.findOneAndUpdate({
            login: new RegExp(`^${user}$`, 'i')
        },{$pull:{roles:role}},
            {new: true}).exec()
    }
    async getUser(user){
        return UserAccount.findOne({login:user});
    }


}

export default new UserAccountRepository();
