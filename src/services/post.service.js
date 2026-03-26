import * as repo from '../repositories/post.repository.js'; //this slice is working with repository


class PostService {
    async createPost(author,data){
        const post = await repo.createPost({
            title: data.title,
            content: data.content,
            author,
            dateCreated: new Date(),
            tags: data.tags,
            likes:0,
            comments:[]

        })
        return post;

    }
    async getPostById(id){
        const post = await repo.findPost(id);
        if(!post) {
         throw new Error("Post not found");
        }
        return post;
    }

    async deletePost(id){
        const post = await repo.deletePost(id)
        if(!post) {
            throw new Error("Post not found");
        }
        return post;
    }


}
export default new PostService;