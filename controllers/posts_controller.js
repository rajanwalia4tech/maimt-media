const Posts = require("../models/posts");
const Users = require("../models/users");
const Comments = require("../models/comments");
const fs = require("fs").promises;
const Likes = require('../models/likes');
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
	
	res.redirect("/");
}

// API to get all the posts
module.exports.allPost=async (req,res)=>{
	const allposts=await Posts.findAll({
		include:[{model:Users,attributes:
			['id','firstName','lastName','profileImageUrl']
		}],
		attributes:{exclude:['updatedAt']},
		raw: true,
		nest: true,
		order: [
            ['createdAt', 'DESC'],
        ]
	})
	if(allposts.length>0)
		return res.status(200).json(allposts);

	return res.status(404).json({"error":"No post exists"});
}

// Get Posts as page no. and limit wise to implement infinite scroll feature
module.exports.getPosts = async (req,res)=>{
	let size = parseInt(req.query.limit);
	let page = (parseInt(req.query.page) - 1)*2;
	console.log(page,size)
	try{
		const posts = await Posts.findAll({
				limit:size,
				offset:page
		});
		return res.status(200).json(posts);
	}catch(err){
		return res.status(404).json({
			"error":"Internal Server Error"
		});
	}
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

// API for post update
module.exports.update = async (req,res)=>{
	const UserId = 12 // req.user.id;
	const body = req.body.body;
	const postId = req.params.postId;
	try{

		const post = await Posts.findByPk(postId);
		if(!post) // Post not found
			return res.status(404).json({"error":"Post Not Found"});

		await Posts.update({
			body
		},
		{
			where:{
				id:postId
			}
		});

		// update the image
		if(req.file){
			const oldPath = path.join(__dirname, '..', 'public','images' ,'uploads' , req.file.filename);
			const newPath = path.join(__dirname, '..', 'public','images' ,'posts','post_'+postId+"."+req.file.mimetype.split('/').pop());
			await fs.rename(oldPath, newPath);     
			const postImageUrl = path.join('public','images','posts','post_'+postId+"."+req.file.mimetype.split('/').pop());
			await Posts.update({
				postImageUrl
			},
			{
				where:{
					id:postId
				}
			});
		}
			
		return res.send("post Updated");
	}catch(err){
		return res.redirect("/");
	}

}