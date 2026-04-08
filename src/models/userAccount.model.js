import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
        login: {type: String, unique: true, required: true},
        password: {type: String, unique: true, required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        roles: {type: [String], default: ['USER']}
    },
    {
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                //ret.id = ret._id; //???
                delete ret._id;
                delete ret.password;
                return ret;
            }
        },
        toObject: {
            transform: (doc, ret) => {
                //ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                return ret;
            }
        }

    })

export default mongoose.model('UserAccount', userAccountSchema); //TODO: create collection?