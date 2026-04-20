import postService from "../services/post.service.js";
import {USER} from "../configuration/constants.js";

class Authorization {
    hasRole(role) {

        return (req, res, next) => {

            req.principal.roles.includes(role.toUpperCase().trim()) ? next() : res.status(403).json({message: 'Access denied'});

        }
    }

    isOwner(paramName = 'author') {
        return (req, res, next) => req.params[paramName] === req.principal.userName ? next() : res.status(403).json({message: 'Access denied'});
    }

    isOwnerOrHasRole(paramName, role) {
        return (req, res, next) => {
            const isOwner = req.params[paramName] === req.principal.userName;
            const hasRole = req.principal.roles.includes(role.toUpperCase().trim())
            return isOwner || hasRole ? next() : res.status(403).json({message: 'Access denied'});
        }

    }

    isPostAuthor(postIdParams = 'id') {
        return async (req, res, next) => {
            const postId = req.params[postIdParams];
            const post = await postService.getPostById(postId);
            return post.author === req.principal.userName ? next() : res.status(403).json({message: 'Access denied'});
        }
    }

    isPostAuthorOrHasRole(authorIdParams = 'id', role = USER) {
        return async (req, res, next) => {
            const postId = req.params[authorIdParams];
            const post = await postService.getPostById(postId);
            const isOwner = post.author === req.principal.userName;
            const hasRole = req.principal.roles.includes(role.toUpperCase().trim())
            return isOwner || hasRole ? next() : res.status(403).json({message: 'Access denied'});
        }
    }

}

export default new Authorization();