const {Sequelize} = require("sequelize");
const db = new Sequelize({
	dialect: 'mysql',
	host:"127.0.0.1",
	database: 'maimtmediadb',
	username: 'maimtmediauser',
	password: 'Password123#@!'
});

const Users = require("./users");
const Posts = require("./posts");
const Comments = require("./comments");
const Likes = require("./likes");

async function setModels(){
	await Users.sync();
	await Posts.sync()
	await Comments.sync();
	await Likes.sync();
}

setModels();

module.exports = db