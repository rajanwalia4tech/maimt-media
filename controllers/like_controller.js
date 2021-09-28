const like = require("../models/comments");
const Posts = require("../models/posts");
const Likes = require("../models/likes");

// like/unlike API
module.exports.like = async(req,res)=>{

    try{
    // get userId = req.user.id;
    const userId = req.user.id;
    // get post id;
    const postId = req.body.postId;
    // check whether the post exist or not
    // find previous likes
    if(!userId || !postId)
        return res.json("Missing userId or PostId");
    const post = await Posts.findByPk(postId);
    if(!post)
    return res.status(404).json({"error":"Post Not Found"});
    const like = await Likes.findOne({
        where:{
            PostId:postId,
            UserId:userId
        }
    })

    // Unlike the post
    if(like){
        await Posts.update({
            likeCount:post.likeCount-1
        },{
            where:{
                id:postId
            }
        });

        await Likes.destroy({
            where:{
                id:like.id
            }
        })

        return res.status(202).json({"success":"Post Unliked"});
    }

    // increase the likeCount by 1
    await Posts.update({
        likeCount:post.likeCount+1
    },{
        where:{
            id:postId
        }
    });

    // put the entry of userId = req.user.id;  and postId in the like table
    await Likes.create({
        UserId:userId,
        PostId:postId
    });

    return res.status(201).json({"success":"Post Liked"});

    }catch(err){
        return res.redirect("/");
    }
}