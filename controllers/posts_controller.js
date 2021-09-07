const Posts = require("../models/posts");
const fs = require("fs").promises;
const path = require("path");

// Post created
module.exports.create = async (req,res)=>{
	const UserId = req.user.id;
	const body = req.body.caption;
	let newPost = await Posts.create({
		body,
		UserId
	});
	
	if(req.file){
		const oldPath = path.join(__dirname, '..', 'public','images' ,'uploads' , req.file.filename);
		const newPath = path.join(__dirname, '..', 'public','images' ,'posts','post_'+newPost.id+"."+req.file.mimetype.split('/').pop());
		await fs.rename(oldPath, newPath);     
		const postImageUrl = path.join('public','images','posts','post_'+newPost.id+"."+req.file.mimetype.split('/').pop());
		await Posts.update({
			postImageUrl
		},
		{
			where:{
				id:newPost.id
			}
		});
	}
	
	res.send("post created");
}