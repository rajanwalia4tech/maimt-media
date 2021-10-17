const {Sequelize,DataTypes} = require("sequelize");
const Users = require("./users");

const sequelize = new Sequelize({
	dialect: 'mysql',
	database: 'maimtmediadb',
	username: 'maimtmediauser',
	password: 'maimtmediapassword'
});
// const sequelize = new Sequelize({
// 	dialect: 'sqlite',
// 	storage: __dirname + '/test.db'
// });

const COL_ID_DEF = {
	type:DataTypes.INTEGER,
	autoIncrement:true,
	primaryKey:true,
	allowNull:false
}

const Posts = sequelize.define('Post',{
	id:COL_ID_DEF,
	body:{
		type:DataTypes.STRING(1000),
		allowNull:false
	},
	postImageUrl:{
		type:DataTypes.STRING(150),
	},
	likeCount:{
		type:DataTypes.INTEGER,
		defaultValue:0
	},
	commentCount:{
		type:DataTypes.INTEGER,
		defaultValue:0
	},
},{timestamps:true})

Users.hasMany(Posts);
Posts.belongsTo(Users);

module.exports = Posts