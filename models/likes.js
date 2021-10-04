const {Sequelize,DataTypes} = require("sequelize");
// const sequelize = new Sequelize({
// 	dialect: 'mysql',
// 	database: 'maimtmediadb',
// 	username: 'maimtmediauser',
// 	password: 'maimtmediapassword'
// });
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: __dirname + '/test.db'
});

const Users = require("./Users");
const Posts = require("./Posts");

const Likes = sequelize.define('Like',{
	id:{
		type:DataTypes.INTEGER,
		autoIncrement:true,
		primaryKey:true,
		allowNull:false
	}
},{timestamps:true});

Posts.hasMany(Likes);
Likes.belongsTo(Posts);

Users.hasMany(Likes);
Likes.belongsTo(Users);

module.exports = Likes