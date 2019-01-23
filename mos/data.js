const mongse=require('mongoose');
const url='mongodb://127.0.0.1:27017/bk1821'
mongse.connect(url,(err,client)=>{
    if(err){
        console.log("链接失败")
    }else{
        console.log("链接成功");
    }
});


module.exports={
	mongse
}
