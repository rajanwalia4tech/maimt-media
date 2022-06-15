function LikeSchema(sequelize,DataTypes){
	const Likes = sequelize.define('Like',{
		id:{
			type:DataTypes.INTEGER,
			autoIncrement:true,
			primaryKey:true,
			allowNull:false
		}
	},{timestamps:true});
	return Likes;
}

module.exports = LikeSchema;