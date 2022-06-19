const db = require("../models");

const Comments = db.Comments;
const Posts = db.Posts;

// create comment API
module.exports.create = async(req,res)=>{
	const request = {...req.body};
	const UserId = request.user_id; 
	const PostId = request.postId;
	const body = request.body;
	try{
		// find the comment count to update the commentCount by 1
		const post = await Posts.findByPk(PostId,{
			attributes:['commentCount']
		});
		if(!post) throw new Error("Post not Found");
		// Store the comment of a post
		const comment = await Comments.create({
			UserId,
			PostId,
			body
		});

		// Update the comment of a post by 1
		await Posts.update({
			commentCount:post.commentCount+1
			},
			{
			where:{
				id:PostId
			}
		});
		
		return res.status(201).json(comment);
	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}

// Delete the comment using its id
module.exports.delete = async (req,res)=>{
	const request = {...req.body};
	const id = request.commentId;
	try{
		// find the comment count to decrease the commentCount by 1
		const comment = await Comments.findByPk(id);
		if(!comment) throw new Error("Comment not found");
		//find the comment count of the post
		const post = await Posts.findByPk(comment.PostId,{
			attributes:['commentCount']
		});

		// delete the comment
		const status = await Comments.destroy({
			where:{
				id
			}
		});
		if(status){
			//decrease the comment of a post by 1
			await Posts.update({
				commentCount:post.commentCount-1
				},
				{
				where:{
					id:comment.PostId
				}
			});
			
			return res.status(200).json({"message":"Comment deleted successfully"});
		}

		return res.status(404).json({"message":"No such comment exists"});
	}catch(err){
		return res.status(400).json({
			message : err.message
		})
	}
}