//第一步  token
const JWT = require("jsonwebtoken");
//let secret = "BK1821";
//	
////第二步  token
//let token =  JWT.sign(payload,secret,{expiresIn:"1h"})

 function setToken(payload,secret){
	return JWT.sign(payload,secret,{expiresIn:"1h"})
}
function getToken(token,secret,cb){
	JWT.verify(token, secret, function(err) {       
       cb(err);
    });
}

module.exports={
	setToken,getToken
}
