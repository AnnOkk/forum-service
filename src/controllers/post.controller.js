import postService from "../services/post.service.js";

class PostController {
    async createPost(req, res,next) {
        try{
            const post = await postService.createPost(req.params.author,req.body);
            return res.status(201).json(post);
        }catch(e){
           return  next(e);
        }

    }
    async getPostById(req,res,next){
        try{
            const post = await postService.getPostById(req.params.id);
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }
    async addLike(req,res,next){
        try{
            const post = await postService.addLike(req.params.id);
            return res.json(post);
        }
        catch(e){
            return next(e);
        }
    }

    async deletePost(req,res,next){
       try{
           const post = await postService.deletePost(req.params.id);
           return res.json(post);
       }catch(e){
           return next(e);
       }
    }

    async getPostsByAuthor(req,res,next){
        try{
            const posts = await postService.getPostsByAuthor(req.params.author); //berem iz route author,is not user!!
            return res.json(posts);
        }
        catch(e){
            return next(e);
        }
    }
    async addComment(req,res,next){
        try{
            const post = await postService.addComment(req.params.id,req.params.commenter,req.body.message); //poradok i kak nazyvaetsa napisan v service!
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }
    async getPostsByTags(req,res,next){
       try{
           const post = await postService.getPostsByTags(req.query.values); //zdes berem iz zaprosa,poetomy query.values,ne iz route
           return res.json(post);
       }
       catch(e){
           return next(e);
       }
    }
    async getPostsByPeriod(req,res,next){

        try{
            const post = await postService.getPostsByPeriod(req.query.dateFrom,req.query.dateTo)

            return res.json(post);

        }catch(e){
            return next(e);
        }

    }
    async updatePost(req,res,next){
        try{
            const post = await postService.updatePost(req.params.id,req.body);
            return res.json(post);
        }catch(e){
            return next(e);
        }
    }
}


export default new PostController();