import postRepository from "../repositories/post.repository.js";


class PostService {
    async createPost(author, data) {
        const tags = [...new Set(data.tags)];
        return await postRepository.createPost({...data,author,tags});
    }

    async getPostById(id) {
        const post = await postRepository.findPostById(id);
        if(!post){
            throw new Error(`Post with id = ${id} not found`);
        }
        return post;
    }

    async deletePost(id) {
       const post = await postRepository.deletePost(id);
       if(!post){
           throw new Error(`Post with id = ${id} not found`);
       }
       return post;
    }

    async addLike(id) {
       const post = await postRepository.addLike(id)
        if(!post){
           throw new Error(`Post with id = ${id} not found`);
        }
        return post;
    }

    async getPostsByAuthor(author) {
        const posts = await postRepository.getPostsByAuthor(author);
        if(!posts){
            throw new Error(`Posts by author = ${author} not found`);
        }
        return posts;
    }

    async addComment(id, commenter, content) {
        const post = await postRepository.addComment(id,commenter,content);
        if(!post){
            throw new Error(`Post with id = ${id} not found`);
        }
        return post;

    }

    async getPostsByTags(tagsString) {
       const tags = tagsString.split(',').map(tag=>tag.trim().toLowerCase())


        const post = await postRepository.getPostsByTags(tags);
        if(post.length === 0){
            throw new Error(`Post with tags = ${tags} not found`);
        }
        return post;
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        const post = await postRepository.getPostsByPeriod(dateFrom,dateTo);
        if(!post){
            throw new Error(`Post with period = ${dateFrom} - ${dateTo} not found`);
        }
        return post;
    }
    async updatePost(id,data){
        const post = await postRepository.updatePost(id,data);
        if(!post){
            throw new Error(`Post with id = ${id} not found`);
        }
        return post;
    }

}

export default new PostService;