function PostSchema(sequelize,DataTypes){
	const Posts = sequelize.define('Post',{
		id:{
			type:DataTypes.INTEGER,
			autoIncrement:true,
			primaryKey:true,
			allowNull:false
		},
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

	return Posts;
}


module.exports = PostSchema;