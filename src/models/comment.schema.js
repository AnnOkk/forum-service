import mongoose from 'mongoose'


const CommentSchema = new mongoose.Schema({
    user: {type:String, required:true},
    message: {type:String, required:true},
    dateCreated: {type:Date, required:true},
    likes: {type:Number, required:true},
},{
    _id:false,
})

//const Comment = mongoose.model('Comment', CommentSchema)    ????
export default CommentSchema;