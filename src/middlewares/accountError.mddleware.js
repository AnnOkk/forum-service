const accountErrorHandler = (err,req,res,next) => {
    console.log(err.stack)
    const contains = err.message.toLowerCase().includes('conflict');
    if(err.message && contains){
        return res.status(401).json({
            "timestamp": new Date().toISOString(),
            "status": 401,
            "error": "Not Found",
            "message": err.message,
            "path": `${req.path}`
        })
    } //TODO 409 conflict !!! switch?
    return res.status(500).json({

        "timestamp": new Date().toISOString(),
        "status": 500,
        "error": "Internal Server Error",
        "message": err.message,
        "path": `${req.path}`
    })
}

export default accountErrorHandler;