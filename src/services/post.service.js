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
        //TODO addPost data {
        // 	"title": "JavaEE",
        // 	"content": "Java is the best for backend",
        // 	"tags":["Java", "Spring", "backend", "JEE"]
        // }
        //throw new Error('Not implemented');
    }
    async getPostById(id){
        const post = await repo.findPost(id);
        if(!post) return null;
        return post;
    }


}
export default new PostService;