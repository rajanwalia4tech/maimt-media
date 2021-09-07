const Comments = require("../models/comments");
const Posts = require("../models/posts");

// create comment API
module.exports.create = async(req,res)=>{
	const UserId = req.user.id; 
	const PostId = req.body.postId;
	const body = req.body.body;
	try{
		// find the comment count to update the commentCount by 1
		const post = await Posts.findByPk(PostId,{
			attributes:['commentCount']
		});

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
		return res.redirect("/");
	}
}

// Delete the comment using its id
module.exports.delete = async (req,res)=>{
	const id = req.params.commentId;
	try{
		// find the comment count to decrease the commentCount by 1
		const comment = await Comments.findByPk(id);
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
			
			return res.status(200).json({"success":"Comment deleted"});
		}

		return res.status(404).json({"error":"No such comment exists"});
	}catch(err){

		return res.redirect("/");
	}
}