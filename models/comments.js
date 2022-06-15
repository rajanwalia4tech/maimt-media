function CommentSchema(sequelize,DataTypes){
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
	return Comments;
}

module.exports = CommentSchema;
