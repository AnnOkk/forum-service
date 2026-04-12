class UserAccountService {
    async register(user) {
        //todo
        throw new Error('Not implemented');
    }
    // async login(login) {
    //     //todo
    //     throw new Error('Not implemented');
    // }
    async removeUser(login){
        //todo
        throw new Error('Not implemented');
    }
    async updateUser(login,updateData){
        //todo
        throw new Error('Not implemented');
    }
    async changeRoles(login,role,isAddRole){
        //todo
        throw new Error('Not implemented');
    }

    async changePassword(login,newPassword){
        //todo
        throw new Error('Not implemented');
    }
    async getUser(login){
        //todo
        throw new Error('Not implemented');
    }


}

export default new UserAccountService();