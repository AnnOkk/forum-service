import postRepository from "../repositories/post.repository.js";

class PostService {
    async createPost(author, data) {
        const tags = [...new Set(data.tags)]
        return await postRepository.createPost({...data, author, tags});
    }

    async getPostById(id) {
        const post = await postRepository.findPostById(id);
        if (!post) {
            throw new Error(`Post with id = ${id} not found`);
        }
        return post;
    }

    async deletePost(id) {
        const post = await postRepository.deletePost(id);
        if (!post) {
            throw new Error(`Post with id = ${id} not found`);
        }
        return post;
    }

    async addLike(id) {
        // TODO add like to post by id
        throw new Error('Not implemented');
    }

    async getPostsByAuthor(author) {
        // TODO get posts by author
        throw new Error('Not implemented');
    }

    async addComment(id, commenter, content) {
        // TODO add comment to post by id
        throw new Error('Not implemented');
    }

    async getPostsByTags(tagsString) {
        // TODO get posts by tags
        throw new Error('Not implemented');
    }

    async getPostsByPeriod(dateFrom, dateTo) {
        // TODO get posts by period
        throw new Error('Not implemented');
    }

    async updatePost(id, data) {
        // TODO update post by id
        throw new Error('Not implemented');
    }
}

export default new PostService();