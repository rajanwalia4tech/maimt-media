const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(403).send({
        message: "Please provide us Token!"
      });
    }
  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      if(req.method=="GET"){ // Added user_id in the request after decoding from token
        req.query.user_id = decoded.user_id;
        req.params.user_id = decoded.user_id;
      }else{
        req.body.user_id = decoded.user_id;
      }
      
      next();
    });
  };

module.exports = verifyToken;