import  jwt  from "jsonwebtoken";


const authentication =async(req, res, next)=>{
    
    const accessToken = req.cookies["access_token"]
  

    if (!accessToken ) {
      return res.status(401).send('Access Denied. No token provided.');
    }
  
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);
      
      req.user = decoded.user;
      next();
      
    } catch (error) {
        console.log(error.message)
        return res.status(400).send('Invalid Token.');
    }
}

export default authentication