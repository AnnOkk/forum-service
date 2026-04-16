import {ADMIN} from "../configuration/constants.js";

class Authorization {
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
                return res.status(401).json({ message: 'Authorization required' });
            }

            if (!req.principal.roles.includes(role.toUpperCase().trim())) {
                return res.status(403).json({ message: 'Access denied' });
            }

            return next();
        };
    }}


export default new Authorization();