import postService from "../services/post.service.js";
import { USER } from "../configuration/constants.js";

class Authorization {
    hasRole(role) {
        return (req, res, next) => {
            req.principal.roles.includes(role.toUpperCase().trim())
                ? next()
                : res.status(403).json({ message: 'Access denied' });
        };
    }

    isOwner(paramName = 'author') {
        return (req, res, next) =>
            req.params[paramName] === req.principal.userName
                ? next()
                : res.status(403).json({ message: 'Access denied' });
    }

    isOwnerOrHasRole(paramName, role) {
        return (req, res, next) => {
            const isOwner = req.params[paramName] === req.principal.userName;
            const hasRole = req.principal.roles.includes(role.toUpperCase().trim());

            return isOwner || hasRole
                ? next()
                : res.status(403).json({ message: 'Access denied' });
        };
    }


    isPostAuthorOrHasRole(postIdParam = 'id', role = null) {
        return async (req, res, next) => {
            const postId = req.params[postIdParam];
            const post = await postService.getPostById(postId);

            const isAuthor = post.author === req.principal.userName;
            const hasRole = role
                ? req.principal.roles.includes(role.toUpperCase().trim())
                : false;

            return isAuthor || hasRole
                ? next()
                : res.status(403).json({ message: 'Access denied' });
        };
    }


    isPostAuthor(postIdParam = 'id') {
        return this.isPostAuthorOrHasRole(postIdParam);
    }
}

export default new Authorization();