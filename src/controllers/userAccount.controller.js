import userAccountService from "../services/userAccount.service.js";

class UserAccountController {
    async register(req,res,next){
try{
    const user = await userAccountService.register(req.body);
    return res.status(201).json(user);
}catch(e){
    return next(e);
}
    }

  async login(req,res,next){
        //todo
      throw new Error('Not implemented');
  }

  async deleteUser(req,res,next){
        try{
            const user = await userAccountService.removeUser(req.params.login);
            return res.json(user);
        }catch(e){
            return next(e);
        }
  }

  async updateUser(req,res,next){
        try{
            const userAccount = await userAccountService.updateUser(req.params.login,req.body);
            return res.json(userAccount);
        }catch(e){
            return next(e);
        }
  }

  async addRole(req,res,next){
        try{
            const userRoles = await userAccountService.changeRoles(req.params.login,req.params.role,true)
            return res.json(userRoles);
        }catch(e){
            return next(e);
        }
  }

  async removeRole(req,res,next){
        try{
            const userRoles = await userAccountService.changeRoles(req.params.login,req.params.role,false)
            return res.json(userRoles);
        }catch(e){
            return next(e);
        }
  }
  async changePassword(req,res,next){
        //todo
      throw new Error('Not implemented');
  }

  async getUser(req,res,next){
        try{
            const user = await userAccountService.getUser(req.params.login);
            return res.json(user);
        }catch(e){
            return next(e);
        }
  }


}

export default new UserAccountController();