const mongoose=require('../mos/data.js').mongse;


const User=mongoose.model('user',{
	name:String,
	pwd:String
})


function userFind(data,cb){
	User.findOne(data).then((result)=>{
	       cb(result)
	})
}
function userSave(data,cb){
	console.log(data)
	const user=new User(data);
	user.save().then((result)=>{
	       cb(result)
	})
}
module.exports={
	userFind,userSave
}
