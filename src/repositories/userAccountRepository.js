import UserAccount from "../models/userAccount.model.js";


class UserAccountRepository {
async createUserAccount(user){
    return UserAccount.create(user);
    // const account = new UserAccount(user);
    // return account.save();
}
async loginUser(url){
    //TODO login
}




}
