class UserAccountService {
    async createUserAccount(url,data) {
//todo {
//     "login": "{{user}}",
//     "password": "1234",
//     "firstName": "John",
//     "lastName": "Smith"
// }
        throw new Error('Not implemented');
    }
    async loginUser(url) {
        //todo login
        throw new Error('Not implemented');
    }
    async deleteUser(url,user) {
        //TODO delete user
        throw new Error('Not implemented');
    }
    async updateUser(url,user,data){
        //TODO update user
        throw new Error('Not implemented');
    }
    async addRole(url,user,role){
        //TODO add role
        throw new Error('Not implemented');
    }
    async deleteRole(url,user,role){
        //TODO delete role
        throw new Error('Not implemented');
    }
    async changeUsersPassword(url,newPassword){
        //TODO change password
        throw new Error('Not implemented');
    }
    async getUser(url,user){
        //TODO get user
        throw new Error('Not implemented');
    }


}

export default new UserAccountService;