const db = require("../models");
const Users = db.Users;
const Posts = db.Posts;
const Comments = db.Comments;
const Likes =  db.Likes;


const fs = require("fs").promises;

const path = require("path");


// API to create the Post
module.exports.create = async (req,res)=>{
	const request = {...req.body};
	try{
		const UserId = request.user_id;
		const body = request.body;
		console.log(body)

		if(body!=undefined && body.trim().length==0){
			//  Caption can't be empty
			throw new Error("Caption can't be empty!");
		} 
	
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
		
		return res.status(200).json({
			message : "Uploaded the post successfully"
		})

	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}

// API to get all the posts
module.exports.allPost=async (req,res)=>{
	try{
		const allposts=await Posts.findAll({
			include:[{model:Users,attributes:
				['id','firstName','lastName','profileImageUrl']
			}],
			attributes:{exclude:['updatedAt']},
			raw: true,
			nest: true,
			order: [
				['updatedAt', 'DESC'],
			]
		})
		let response = {};
		if(allposts && allposts.length==0)
			allposts = [];
		response.data = {};
		response.data.posts = allposts;
		return res.status(404).json(response);
	}catch(err){
		return res.status(400).json({"message":err.message});
	}
}

// Get Posts as page no. and limit wise to implement infinite scroll feature
module.exports.getPosts = async (req,res)=>{
	const request = {...req.query};
	let size = 8;
	if(request.size)
		size = parseInt(request.size);

	let page = 1;
	if(request.page)
		page = (parseInt(request.page-1))*size;
	console.log(page,size)
	try{
		const posts = await Posts.findAll({
				limit:size,
				offset:page
		});
		return res.status(200).json({data : posts});
	}catch(err){
		return res.status(404).json({
			"error":"Internal Server Error"
		});
	}
}

// API to get all the comments of a post by its id
module.exports.postComments = async (req,res)=>{
	try{
		const comments = await Comments.findAll({where:{
			PostId:req.params.postId
		},include:[{model:Users,attributes:['id','firstName','lastName','profileImageUrl']}],
		order: [
				['createdAt', 'DESC'],
			],
			attributes: ['body', 'createdAt']
		});
		let response = {};
		if(comments && comments.length==0)
			comments = [];
		response.data = {};
		response.data.comments = comments;
		return res.status(200).json(response);
	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}

// API to delete the post by its id
module.exports.delete = async (req,res)=>{

	const request = {...req.body};
	const PostId = request.postId;
	try{
		// Delete comments
		await Comments.destroy({
			where:{
				PostId
			}
		});

		let Post = await Posts.findByPk(PostId);
		
		let status = await Posts.destroy({
			where:{
				id:PostId
			}
		});	

		if(status){
			let postImageUrl = Post.postImageUrl;
			console.log("----------------------------------------",postImageUrl);
			if(postImageUrl)
				await fs.unlink(postImageUrl,(err)=>{
					if(err)
						throw new Error("Internal Server Error");
					console.log("Post deleted");
				})

			return res.status(200).json({"message":"Post deleted successfully"});
		}

		return res.status(404).json({"message":"No such post exists"});
	}catch(err){	

		return res.status(400).json({
			message: err.message
		})
	}
}

// API for post update
module.exports.update = async (req,res)=>{
	const UserId = 12 // req.user.id;
	const request = {...req.body};
	const body = request.body?request.body.trim():"";
	const postId = request.postId;
	try{
		const post = await Posts.findByPk(postId);
		if(!post) // Post not found
			throw new Error("Post not found");
		if(body.length==0)
			throw new Error("Caption can't be empty");

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
			
		return res.send({
			message : "Post updated Successfully"
		});
	}catch(err){
		return res.status(400).json({"message" : err.message});
	}

}