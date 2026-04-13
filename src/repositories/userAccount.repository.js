import UserAccount from "../models/userAccount.model.js";

class UserAccountRepository {
    async addUser(user) {
        return UserAccount.create(user);
    }

    async findUser(login) {
        return UserAccount.findById(login).exec()
    }

    async removeUser(login) {
        return UserAccount.findByIdAndDelete(login).exec()
    }

    async updateUser(login, updateData) {
        return UserAccount.findByIdAndUpdate(login, updateData, {new: true})
    }

    async addRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$addToSet: {roles: role}}, {new: true}).select('login roles').exec();
    }

    async removeRole(login, role) {
        return UserAccount.findByIdAndUpdate(  login,
            { $pull: { roles: role } },
            { returnDocument: 'after' })
    }
    async changePassword(login,newPassword){
        return UserAccount.findByIdAndUpdate(login,{password:newPassword},{new:true})
    }


}
export default new UserAccountRepository();