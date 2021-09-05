module.exports.home = (req,res)=>{
		if(req.isAuthenticated()){
			return res.render("user_feed",{title:"Your Feed"})
		}
		return res.render("home",{title:"Login or Signup Page"});
}