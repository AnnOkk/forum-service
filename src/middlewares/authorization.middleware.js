import {ADMIN, MODERATOR} from "../configuration/constants.js";
import PostRepository from "../repositories/post.repository.js";

class Authorization {
    isAuthenticated() {
        return (req, res, next) => {
            if (!req.principal) {
                return res.status(401).json({message: 'Authorization required'});
            }
            return next();
        }
    }

    isAuthor() {
        return async (req, res, next) => {
            try {
                console.log('req.params.id:', req.params.id);
                console.log('principal:', req.principal);

                if (!req.principal) {
                    return res.status(401).json({message: 'Authorization required'});
                }
                const post = await PostRepository.findPostById(req.params.id);
                console.log('found post:', post);
                if (!post) {
                    return res.status(404).json({message: 'Post not found'});
                }

                if (req.principal.userName !== post.author) {
                    return res.status(403).json({message: 'Access denied'});
                }
                return next();
            } catch (e) {
                return next(e);
            }
        }
    }

    isAuthorOrModerator() {
        return async (req, res, next) => {
            try {
                if (!req.principal) {
                    return res.status(401).json({message: 'Authorization required'});
                }
                const post = await PostRepository.findPostById(req.params.id)
                if (!post) {
                    return res.status(404).json({message: 'Post not found'});
                }
                const isAuthor = req.principal.userName === post.author;
                const isModerator = req.principal.roles.includes(MODERATOR)
                const isAdmin = req.principal.roles.includes(ADMIN);

                if (!isAuthor && !isModerator &&!isAdmin) {
                    return res.status(403).json({message: 'Access denied'});
                }
                return next();
            } catch (e) {
                return next(e);
            }
        }
    }

    isAuthorParam(paramName = 'author') {
        return (req, res, next) => {
            console.log('principal:', req.principal?.userName);
            console.log('param author:', req.params[paramName]);
            if (!req.principal) {
                return res.status(401).json({message: 'Authorization required'});
            }
            if (req.principal.userName !== req.params[paramName]) {
                return res.status(403).json({message: 'Access denied'});
            }
            return next();
        }
    }


    isOwner() {
        return (req, res, next) => {
            console.log('principal:', req.principal.userName);
            console.log('params.login:', req.params.login);
            if (!req.principal) {
                return res.status(401).json({message: 'Authorization required'});
            }
            if (req.principal.userName !== req.params.login) {
                return res.status(403).json({message: 'Access denied'});
            }
            return next();
        }
    }

    isOwnerOrAdmin() {
        return (req, res, next) => {
            if (!req.principal) {
                return res.status(401).json({message: 'Authorization required'});
            }
            const isOwner = req.principal.userName === req.params.login;
            const isAdmin = req.principal.roles.includes(ADMIN);

            if (!isOwner && !isAdmin) {
                return res.status(403).json({message: 'Access denied'});
            }
            return next();
        }
    }


//     hasRole(role) {
//         return (req, res, next) => {
//             req.principal.roles.includes(role.toUpperCase().trim()) ? next() : res.status(403).json({message: 'Access denied'});
//
//         }
//     }
// }
    hasRole(role) {
        return (req, res, next) => {
            if (!req.principal) {
                return res.status(401).json({message: 'Authorization required'});
            }

            if (!req.principal.roles.includes(role.toUpperCase().trim())) {
                return res.status(403).json({message: 'Access denied'});
            }

            return next();
        };
    }
}


export default new Authorization();