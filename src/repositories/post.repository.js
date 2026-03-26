import Post from '../models/post.model.js';

export function createPost(post) {
    return Post.create(post);
}
export function findPost(id) {
    return Post.findById(id);
}

export function deletePost(id) {
    return Post.findByIdAndDelete(id)
}
//TODO...
