import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now},
        tags: {type: [String], default: []},
        likes: {type: Number, default: 0},
        comments: {type: [String], default: []}

    }, {
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret; //!
            }
        }, toObject: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
)


const Post = mongoose.model('Post', postSchema)
export default Post;