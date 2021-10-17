const {Sequelize,DataTypes} = require("sequelize");
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

const Comments = sequelize.define('Comment',{
		id:{
		type:DataTypes.INTEGER,
		autoIncrement:true,
		primaryKey:true,
		allowNull:false
	},
	body:{
		type:DataTypes.STRING(1000),
		allowNull:false
	}
});

const Users = require("./Users");
const Posts = require("./Posts");

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

Users.hasMany(Comments);
Comments.belongsTo(Users);

module.exports = Comments
