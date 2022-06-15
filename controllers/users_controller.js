const db = require("../models");
const Users = db.Users;
const Posts = db.Posts;

const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// users profile page
module.exports.profile = async(req,res)=>{
	try{
		const request = {
			...req.query
		}
		const user = await Users.findByPk(request.user_id);
		const posts = await Posts.findAll({
			where:{
				UserId:request.user_id
			},
			raw: true,
			nest: true,
			order: [
				['createdAt', 'DESC'],
			]
		})
		console.log(posts);
		user.gender = user.gender?"Male":"Female";
		user.password = undefined;
		return res.status(200).json({
			data:{
				user
			}
		})
	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}


// create a new user
module.exports.create = async (req,res)=>{
	try{
		let firstName = req.body.first_name;
		let lastName = req.body.last_name;
		let password = req.body.password;
		let email = req.body.email;
		let confirmPassword = req.body.confirm_password;
		let gender = req.body.gender;
		let dob = req.body.dob;
		if(!firstName || !lastName || !email || !password || !confirmPassword || !gender || !dob){
			throw new Error("All Fields are required");
		}

		// Password not Match
		if(password != confirmPassword){
			throw new Error("Password are not matching");
		}

		let user = await Users.findOne({
			where:{email}
		});

		// if user already exist
		if(user)
			throw new Error("User Already exist");

		gender = req.body.gender == 'male' ? true:false;

		// hash password
		password = await bcrypt.hash(password,10)

		let newUser = await Users.create({
			firstName,
			lastName,
			email,
			password,
			gender,
			dob
		})
		console.log(newUser.id)
		// TODO : this user also include the password 
		// so we need to remove the password 
		
		return res.status(200).json({
			message : "user has successfully created!"
		})
	}
	catch(err){
		return res.status(400).json({message : err.message});
	}
}


// Update user
module.exports.update = async (req,res)=>{
	const request = {
		...req.body
	}
	console.log(request)
	try{
		if(request.password){
			throw new Error("Password can't be updated!");
		}
		console.log('req.file', req.file);
		console.log(req.body);	
		if(req.file){
			const oldPath = path.join(__dirname, '..', 'public','images' ,'uploads' , req.file.filename);
			const newPath = path.join(__dirname, '..', 'public','images' ,'avatars','avatar_'+request.user_id+"."+req.file.mimetype.split('/').pop());
			console.log(oldPath, " ", newPath)
			await fs.rename(oldPath, newPath)       
			const profileImageUrl = path.join('public','images','avatars','avatar_'+request.user_id+"."+req.file.mimetype.split('/').pop());
			console.log(profileImageUrl	)
			await Users.update({
				profileImageUrl
			},
			{
				where:{
					id:request.user_id
				}
			});
	
		}
		await Users.update(req.body,{
				where:{
					id:request.user_id
				}
			});
		const user = await Users.findByPk(request.user_id);
		return res.status(200).json({
			message : "User information is succussfully updated"
		})
	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}

// Login the user

module.exports.login = async(req,res)=>{
	try{
		const request = {...req.body};

		if(!request.email || !request.password)
			throw new Error("Email and password is required!");

		// find if phone no. is registered or nots
		const user = await Users.findOne({
			where:{
				email:request.email
			}
		});
		
		if(!user)
			throw new Error("Either email or password is Invalid!");
		const checkPassword = await bcrypt.compare(request.password,user.password);
		if(!checkPassword)
			throw new Error("Either email or password is Invalid!");
		
		const accessToken = jwt.sign({user_id : user.id},process.env.SECRET,{
			expiresIn : "24h"
		});

		return res.status(200).json({
			accessToken
		})
	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}
