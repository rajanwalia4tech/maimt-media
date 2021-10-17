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


const COL_ID_DEF = {
	type:DataTypes.INTEGER,
	autoIncrement:true,
	primaryKey:true,
	allowNull:false
}

const Users = sequelize.define('User',{
	// Model attributes are defined here 
	id:{
		type:DataTypes.INTEGER,
		autoIncrement:true,
		primaryKey:true,
		allowNull:false
	},
	firstName:{
		type:DataTypes.STRING(50),
		allowNull:false
	},
	lastName :{
		type:DataTypes.STRING(50),
		allowNull:false
	},
	email:{
		type:DataTypes.STRING(100),
		unique:true,
		allowNull:false
	},
	password:{
		type:DataTypes.STRING(100),
		allowNull:false
	},
	gender:{
		type:DataTypes.BOOLEAN
	},
	bio:{
		type:DataTypes.STRING(150),		
	},
	profileImageUrl:{
		type:DataTypes.STRING(150),
		defaultValue:'public/images/uploads/default.jpg'
	},
	address:{
		type:DataTypes.STRING(150)
	},
	dob:{
		type:DataTypes.DATEONLY
	}
},{timestamps:true});


module.exports = Users