class Authorization {
    hasRole(role) {

        return (req, res, next) => {
            console.log('req.principal:', req.principal);
            console.log('roles:', req.principal.roles);
            console.log('required:', role.toUpperCase().trim());
            console.log(role)
        req.principal.roles.includes(role.toUpperCase().trim()) ? next() : res.status(403).json({message: 'Access denied'});

    }
}}

export default new Authorization();