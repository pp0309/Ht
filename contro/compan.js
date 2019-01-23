const mongo = require('../model/addcom');
const tok=require('../mos/token');

	function addCom(req,res){
	var {complayName,complayHow,complayInt}=req.body;
	//console.log(req.files)
  	let urlPath =  req.files.complayLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
	mongo.addCompany({complayName,complayHow,complayInt,complayLogo:urlPath},function(result){
		if(result){
			res.json({
				status: true,
				info: "添加成功"
			})
		}else{
			res.json({
				status: false,
				info: "添加失败"
			})
		}
	})	
}
	
	function listCom(req,res){		
		var {page,limit}=req.query;
		var token=req.headers.token;
		let secret = "BK1821";
		tok.getToken(token,secret,function(err){
			
			if(err){
				 res.json({
                        status:false,
                        info:'令牌失效',
                       })
			}else{
		mongo.findCompany({page,limit},(data)=>{			
        if(data.length>0){
            //总条目数字
            mongo.findComs((result)=>{          	
                let count = result.length;
                    res.json({
                        status:true,
                        data:data,
                        count
                    })               
            })
        }       
  		  })
				
			}
		})
		
	}
	
	function slice(req,res){
	var {complayName,complayHow,complayInt,_id}=req.body;
	//console.log(req.files,req.body)
  	
  	if(JSON.stringify(req.files)=="{}"){
  		info={complayName,complayHow,complayInt}
  	}else{
  		let urlPath =  req.files.complayLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
  		info={complayName,complayHow,complayInt,complayLogo:urlPath}
  	}
  	console.log(info)
  		mongo.slice({_id},info,(result)=>{
  			if(result){
	  			 res.json({
	                status:true,
	               	info:'修改成功',
	            })   
  			}
  		})
  	
	}
	function remove(req,res){		
		var {_id}=req.query;
		console.log({_id})
		mongo.rem({_id},function(result){
			if(result){
			
				res.json({
					status:true,
	               	info:'删除成功',
				})
			}
		})
	}
	
module.exports={
	addCom,listCom,slice,remove
}
