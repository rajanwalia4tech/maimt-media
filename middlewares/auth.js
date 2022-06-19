const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];
    // console.log(token)
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
        req.query = Object.assign({},req.query,req.params);
        // req.query.user_id = decoded.user_id;
        // req.params.user_id = decoded.user_id;
        // console.log("user_id : ",req.query.user_id);
        console.log("request : ",req.query);
      }else{
        req.body = Object.assign({},req.query,req.params,req.body);
        req.body.user_id = decoded.user_id;
        console.log("user_id : ",req.body);
      }
      // console.log(req.body.user_id)
      return next();
    });
  };

module.exports = verifyToken;