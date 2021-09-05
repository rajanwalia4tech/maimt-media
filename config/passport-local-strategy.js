const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Users = require("../models/users");


// Finding the user and Authenticate that user
passport.use(new localStrategy({
		usernameField:'email',
	}, async(email,password,done)=>{
		try {
				const user = await Users.findOne({where:{email}});
				if (!user || user.password !== password) {
					console.log('Invalid Email or Password');
					return done(null,false);
				  //return done(new Error('Invalid Email or Password'));
				}
				user.password = undefined; // so that password don't transfer
				return done(null, user); // return the user to the serializer function
		 } catch (err) {
			 console.log("Error in finding the user -> passport");
			return done(err);
		 }	
	}
));

// Serialize the user and store the user.id in the cookies
passport.serializeUser((user,done)=>{
	return done(null,user.id);
})

// deserialize the user by its id in that are present in the cookies
passport.deserializeUser(async (id,done)=>{
	try{
		const user = await Users.findByPk(id);
		user.password = undefined;
		return done(null,user);
	}catch(err){
		console.log("Error in finding the user -> passport");
		return done(err);
	}
})

// Following two are middlewares to set and check authentication of a user

// check if the user is authenticated
passport.checkAuthentication = (req,res,next)=>{
	// if the user is signed in, then pass on the request to the next function ( controller's action)
	if(req.isAuthenticated()){
		 return next();
	}
	
	// if the user is not signed in then take him to the Homepage
	return res.redirect('/');
}

passport.setAuthenticatedUser = (req,res,next)=>{
	if(req.isAuthenticated()){
		// passport store the user in the request (req.user)
		// req.user contains the current signed in user from the session cookie
		// and we are just sending this to the locals for the views 
		res.locals.user = req.user;
	}
	next();
}

module.exports = passport;