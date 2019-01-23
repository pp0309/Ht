const mongo = require('../model/model')
/* 加密 1*/
const crypto = require('crypto');
////第一步  token
//const JWT = require("jsonwebtoken");
const tok=require('../mos/token');


function resig(req, res) {
	let {name,pwd} = req.body;	
	mongo.userFind({
		name
	}, function(result) {				
		if(result) {
			res.json({
				status: false,
				info: "用户名已存在"
			})
		} else {
			const hash=crypto.createHash('sha256');
			hash.update(pwd)
			mongo.userSave({
				name,
				pwd:hash.digest('hex')
			}, function(result) {
				if(result) {
					res.json({
						status: true,
						info: "用户注册成功"
					})
				}
			})
		}
	})
}
function lod(req,res){
	let {name,pwd}=req.body;
	
		mongo.userFind({name},function(result){
			if(result){
				const hash=crypto.createHash('sha256');
				hash.update(pwd)
				if(result.pwd==hash.digest('hex')){
					 let payload = {
                   name,
	                }
	                let secret = "BK1821";
	
	                //第二步  token
	               let token = tok.setToken(payload,secret)
	               res.cookie("token",token);
	               res.cookie("user",name);
					res.json({
							status: true,
							info: "登陆成功成功"
					})
				}else{
					res.json({
					status: false,
					info: "密码错误"
				})
				}
			}else{
				res.json({
					status: false,
					info: "账号不存在"
				})
			}
			
		})
}

module.exports = {
	resig,lod
}