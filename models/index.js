const {Sequelize,DataTypes,Op} = require("sequelize");
const UserSchema = require("./users");
const LikeSchema = require("./likes");
const PostSchema = require("./posts");
const CommentSchema = require("./comments");

const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.HOST,
	database: process.env.DATABASE,
	username: process.env.USERNAME,
	password: process.env.PASSWORD
})

const db = {};
db.sequelize = sequelize;
db.op = Op;

db.Users = UserSchema(sequelize,DataTypes);
db.Posts = PostSchema(sequelize,DataTypes);
db.Likes = LikeSchema(sequelize,DataTypes);
db.Comments = CommentSchema(sequelize,DataTypes);



db.Users.hasMany(db.Posts);
db.Posts.belongsTo(db.Users);

db.Posts.hasMany(db.Likes);
db.Likes.belongsTo(db.Posts);

db.Users.hasMany(db.Likes);
db.Likes.belongsTo(db.Users);

db.Posts.hasMany(db.Comments);
db.Comments.belongsTo(db.Posts);

db.Users.hasMany(db.Comments);
db.Comments.belongsTo(db.Users);

module.exports = db;