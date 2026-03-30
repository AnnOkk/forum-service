import Post from "../models/post.model.js";


class PostRepository {
    async createPost(postData) {
        return Post.create(postData);
        //const post = new Post(postData);
        //return post.save();
    }

    async findPostById(id) {
        return Post.findById(id)
    }

    async deletePost(id) {
        return Post.findByIdAndDelete(id);
    }

    async addLike(id) {
        return Post.findByIdAndUpdate(
            id,
            {$inc: {likes: 1}},
            {returnDocument: 'after'})
    }

    async getPostsByAuthor(author) {
        return Post.find({author});
    }

    async addComment(id, commenter, content) {
        return Post.findByIdAndUpdate(id,
            {
                $push: {
                    comments: {
                        user: commenter,
                        message: content,
                        dateCreated: Date.now(),
                        likes: 0
                    }
                }
            },
            {returnDocument: 'after'})
    }

    async getPostsByTags(tagsString) {
        const regexTags = tagsString.map(tag => new RegExp(`^${tag}$`, 'i'))
        return Post.find({tags: {$in: regexTags}}) //tags = kak v dokumente napisano!!!!
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        return Post.find({
            dateCreated: {
                $gte: dateFrom,
                $lte: dateTo
            }
        })
    }  //TODO + regex?

    async updatePost(id,data){
        return Post.findByIdAndUpdate(
            id, data, {returnDocument:'after'}
        )
    }
}


export default new PostRepository();