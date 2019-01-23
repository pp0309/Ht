const mongoose=require('../mos/data.js').mongse;
const Company = mongoose.model("company", {
    "complayLogo": String,
    "complayName": String,
    "complayHow": String,
    "complayInt": String,
})


const addCompany = (companyInfo,cb)=>{
   let company =  new Company(companyInfo);
   company.save().then((result)=>{
       cb(result)
   })
}

const findCompany = (companyInfo,cb)=>{	  
   Company.find().skip((companyInfo.page-1)*companyInfo.limit).limit(Number(companyInfo.limit)).then((data)=>{
        cb(data);
    })
}

const findComs = (cb)=>{
   
   Company.find().then((result)=>{
       cb(result)
   })
}
const  slice=(id,companyInfo,cb)=>{
	Company.update(id,{$set:companyInfo}).then((result)=>{
		  cb(result)
	})
}

const  rem=(companyInfo,cb)=>{
	Company.remove(companyInfo).then((result)=>{
		  cb(result)
	})
}


module.exports={
	addCompany,findCompany,findComs,slice,rem
}
