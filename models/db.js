const {Sequelize} = require("sequelize");
// const db = new Sequelize({
// 	dialect: 'mysql',
// 	database: 'maimtmediadb',
// 	username: 'maimtmediauser',
// 	password: 'maimtmediapassword'
// });

const db = new Sequelize({
	dialect: 'sqlite',
	storage: __dirname + '/test.db'
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