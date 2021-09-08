const Posts = require("../models/posts");
const Users = require("../models/users");
const Comments = require("../models/comments");
const fs = require("fs").promises;
const path = require("path");


// API to create the Post
module.exports.create = async (req,res)=>{
	const UserId = req.user.id;
	const body = req.body.body;
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

// API to get all the posts
module.exports.allPost=async (req,res)=>{
	const allposts=await Posts.findAll({
		include:[{model:Users,attributes:
			['id','firstName','lastName','profileImageUrl']
		 }],
		attributes:{exclude:['updatedAt']}
	});
	if(allposts.length>0)
		return res.status(200).json(allposts);

	return res.status(404).json({"error":"No post exists"});
}


// API to get all the comments of a post by its id
module.exports.postComments = async (req,res)=>{
	const comments = await Comments.findAll({where:{
		PostId:req.params.postId
	},include:[{model:Users,attributes:['id','firstName','lastName','profileImageUrl']}],
	 order: [
            ['createdAt', 'DESC'],
        ],
        attributes: ['body', 'createdAt']
	});
	if(comments.length>0)
		return res.status(200).json(comments);

	return res.status(404).json({"error":"No such comments exist on this post"});
}

// API to delete the post by its id
module.exports.delete = async (req,res)=>{

	const PostId = req.params.postId;
	try{
		// Delete comments
		await Comments.destroy({
			where:{
				PostId
			}
		});
		
		status = await Posts.destroy({
			where:{
				id:PostId
			}
		});	

		if(status){
			return res.status(200).json({"success":"Post deleted"});
		}

		return res.status(404).json({"error":"No such post exists"});
	}catch(err){

		return res.redirect("/");
	}
}
