var express = require('express');
var router = express.Router();
var company=require('../contro/compan');
var multer = require("multer");

// 开始
var storage = multer.diskStorage({
    //第一个方法文件存储的位置
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    //第二个是文件命名
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' + file.originalname  )
    }
})

var upload = multer({ storage: storage })
//规定当字段可以接受到的图片有多少张
var cpUpload = upload.fields([{ name: 'complayLogo', maxCount: 1 }])
//结束

/* GET users listing. */
router.post('/addCompany',cpUpload,company.addCom);
router.get('/companyList',company.listCom);
router.post('/xiugai',cpUpload,company.slice);
router.get('/remove',company.remove);
module.exports = router;
