const jwt  = require('jsonwebtoken');

const jwtAuthMiddleware =(req,res,next)=>{

    // Extract the jwt token form the request headers
     const token  = req.headers.authorization.split(' ')[1];
     if(!token){
        return res.status(401).json({
            status:"fail",
            error:"Unauthorized"
        })
     }

     try{
        // verfiy the jwt token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        // Attach user information to the request object
        req.user = decoded;
        next();
     }catch(err){

        console.log(err);
        res.status(400).json({
            status:"fail",
            error:"Invalid token"
        })

     }
};
 
// Function to generate JWT token
const generateToken=(userdata)=>{

    // Generate a new JWT token using user data
     return jwt.sign(userdata,process.env.JWT_SECRET);

    }


module.exports = {jwtAuthMiddleware,generateToken};