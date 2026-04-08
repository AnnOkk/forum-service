const statusTexts = {
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict"
};


const accountErrorHandler = (err,req,res,next) => {
    console.log(err.stack)
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(status).json({
        "timestamp": new Date().toISOString(),
         status,
        "error": statusTexts[status] || "Internal Server Error",
        "message": message,

    })


}

export default accountErrorHandler;



















// const accountErrorHandler = (err,req,res,next) => {
//     console.log(err.stack)
//     const contains = err.message.toLowerCase().includes('conflict');
//     const contains2 = err.message.toLowerCase().includes('unauthorized');
//     const contains3 = err.message.toLowerCase().includes('forbidden');
//     const contains4 = err.message.toLowerCase().includes('not found');  //todo переделать по человечески ,[], map,...
//     if(err.message && contains2){
//         return res.status(401).json({
//             "timestamp": new Date().toISOString(),
//             "status": 401,
//             "error": "unauthorized",
//             "message": err.message,
//             "path": `${req.path}`
//         })
//     }
//     else if(err.message && contains3){
//         return res.status(403).json({
//             "timestamp": new Date().toISOString(),
//             "status": 403,
//             "error": "Forbidden",
//             "message": err.message,
//             "path": `${req.path}`
//         })
//     }
//     else if(err.message && contains){
//         return res.status(409).json({
//             "timestamp": new Date().toISOString(),
//             "status": 409,
//             "error": "Conflict",
//             "message": err.message,
//         })
//     }
//     else if(err.message && contains4){
//         return res.status(404).json({
//             "timestamp": new Date().toISOString(),
//             "status": 404,
//             "error": "Not Found",
//             "message": err.message,
//         })
//     }
//     return res.status(500).json({
//
//         "timestamp": new Date().toISOString(),
//         "status": 500,
//         "error": "Internal Server Error",
//         "message": err.message,
//         "path": `${req.path}`
//     })
// }
//
// export default accountErrorHandler;