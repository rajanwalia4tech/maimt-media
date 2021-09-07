const Users = require("../models/users");
const fs = require("fs").promises;
const path = require("path");

// users profile page
module.exports.profile = async(req,res)=>{
	const user = await Users.findByPk(req.user.id);
	user.gender = user.gender?"Male":"Female";
	user.password = undefined;
	return res.render("user_profile",{title:"My Profile",user});
}


// create a new user
module.exports.create = async (req,res)=>{
	let firstName = req.body.first_name;
	let lastName = req.body.last_name;
	let password = req.body.password;
	let email = req.body.email;
	let confirmPassword = req.body.confirm_password;
	let gender = req.body.gender;
	let dob = req.body.dob;
	if(!firstName || !lastName || !email || !password || !confirmPassword || !gender || !dob){
		
		return res.status(404).json({"error": "All Fields are required"});
	}

	// Password not Match
	if(password != confirmPassword){
		return res.status(404).json({"error":"Password are not matching"});
	}

	let user = await Users.findOne({
		where:{email}
	});


	// if user already exist
	if(user)
		return res.status(201).json({"error" : "User Already exist"});

	gender = req.body.gender == 'male' ? true:false;
	// TODO : store the hash password
	let newUser = await Users.create({
		firstName,
		lastName,
		email,
		password,
		gender,
		dob
	})
	// TODO : this user also include the password 
	// so we need to remove the password 
	return res.redirect("/");
}


// Update user
module.exports.update = async (req,res)=>{
	console.log('req.file', req.file);
	console.log(req.body);
	if(req.file){
		const oldPath = path.join(__dirname, '..', 'public','images' ,'uploads' , req.file.filename);
	  	const newPath = path.join(__dirname, '..', 'public','images' ,'avatars','avatar_'+req.user.id+"."+req.file.mimetype.split('/').pop());
	    await fs.rename(oldPath, newPath)       
	    const profileImageUrl = path.join('public','images','avatars','avatar_'+req.user.id+"."+req.file.mimetype.split('/').pop());
		await Users.update({
			profileImageUrl
		},
		{
			where:{
				id:req.user.id
			}
		});
	}
		await Users.update(
			req.body
		,
		{
			where:{
				id:req.user.id
			}
		});
	const user = await Users.findByPk(req.user.id);
	return res.redirect("back");
}

// Login the user

module.exports.login = (req,res)=>{
	return res.redirect("/");
}

// logout or destroy the session
module.exports.logout = (req,res)=>{
	req.logout(); // this logout function has set in request using passport
	return res.redirect("/");
}