function fenpage(that,data){
	
layui.use('laypage', function(){
  var laypage = layui.laypage 
  //总页数大于页码总数
	  laypage.render({
	    elem: 'laypage'
	    ,count: data.count //数据总数
	    ,limit: 5
	    ,jump: function(obj, first){	      
			if (!first) {
			//_this.page是初始的页码  obj.curr是当触发页码改变的时候最新的页码数
			that.page = obj.curr;
			//重新调用Ajax获取分页数据
			that.listPage(that.handleGetCompanyPageSucc);
			}
		 }
  		})
   })
	
}
