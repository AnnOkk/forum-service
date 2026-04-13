import {Schema,model} from "mongoose";
import bcrypt from "bcrypt";

const userAccountSchema = new Schema({
    _id:{
        type:String,
        required:true,
        alias:'login'
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    roles:{
        roles: {
            type: [String],
            enum: ['USER', 'MODERATOR', 'ADMIN'], //TODO: change to enum
            default: ['USER']
        }
    }
},{
    versionKey:false,
    toJSON:{
        transform:(doc,ret)=>{
            ret.login = ret._id;
            delete ret.password;
            delete ret._id;
        }
    }
    }
)
userAccountSchema.pre('save',async function(){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password,salt) //???must be $set control?
    }
    // userAccountSchema.pre('findOneAndUpdate',async function(){
    //     if(this.getUpdate().password){  //getUpdate for query
    //         const salt = await bcrypt.genSalt(12);
    //         this.getUpdate().password = await bcrypt.hash(this.getUpdate().password,salt);
    //     }
    // })

})
export default model('UserAccount',userAccountSchema,'users');