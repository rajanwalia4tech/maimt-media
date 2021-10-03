const {Sequelize} = require("sequelize");
const db = new Sequelize({
	dialect: 'mysql',
	database: 'maimtmediadb',
	username: 'maimtmediauser',
	password: 'maimtmediapassword'
});

const Users = require("./users");
const Posts = require("./posts");
const Comments = require("./comments");
const Likes = require("./likes");

async function setModels(){
	await Users.sync({force:true});
	await Posts.sync({force:true})
	await Comments.sync({force:true});
	await Likes.sync({force:true});
}

//setModels();

module.exports = db