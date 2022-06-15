// const COL_ID_DEF = {
// 	type:DataTypes.INTEGER,
// 	autoIncrement:true,
// 	primaryKey:true,
// 	allowNull:false
// }

function UserSchema(sequelize,DataTypes){
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
	return Users;
}

module.exports = UserSchema;