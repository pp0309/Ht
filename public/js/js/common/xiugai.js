function Xiu(list){
	this.ele=$('#content');
	this.mod=$(list);
	this.init();
}


Xiu.str=`<div class="modal fade" id="xiupage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">修改</span></button>
							<h4 class="modal-title">Modal title</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
    <label for="x_complayName">公司名称</label>
    <input type="text" class="form-control" id="x_complayName" placeholder="公司名称">
  </div>
  <div class="form-group">
    <label for="x_complayHow">公司规模</label>
    <input type="text" class="form-control" id="x_complayHow" placeholder="公司规模">
  </div>
  <div class="form-group">
    <label for="x_complayInt">公司简介</label>
    <input type="text" class="form-control" id="x_complayInt" placeholder="公司简介">
  </div>  
  <div class="form-group">
    <label for="x_complayLogo">加入图片</label>
    <input type="file" id="x_complayLogo">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  
  <button type="button" class="btn btn-default" id="x_js_addcomsub" data-dismiss='modal'>修改</button>
  <button type="button" class="btn btn-default" id="x_js_remove" data-dismiss='modal'>删除</button>
							</form>
						</div>
					</div>
				</div>
			</div>`
Xiu.prototype={
	init:function(){
		this.appen();
		this.split();
		this.handlesub()
		this.handleRem()
	},
	appen:function(){
		this.el=$('<div></div>');
		this.el.append(Xiu.str);
		this.ele.append(this.el)
	},
	split(){
		 this.mod.each($.proxy(this.handleEach,this))
		//this.mod.on('click',$.proxy(this.handleEach))
	},
	handleEach(i){
		 this.mod.eq(i).on('click',i,$.proxy(this.handleclick,this))
	},
	handleclick(e){
		var i=e.data
		this._id=this.mod.eq(i).attr('data-id');
		var complayName=this.mod.eq(i).find('.company-name').text();
		var complayHow=this.mod.eq(i).find('.company-scale').text();
		var complayInt=this.mod.eq(i).find('.company-des').text();
//		var complayLogo=this.mod.eq(i).find('.company-logo').children().attr('src');
		
		this.ele.find('#x_complayName').val(complayName);
		this.ele.find('#x_complayHow').val(complayHow);
		this.ele.find('#x_complayInt').val(complayInt);
		//this.ele.find('#x_complayLogo').val(complayLogo)		
	},
	handlesub(){
		this.ele.find('#x_js_addcomsub').on('click',$.proxy(this.handlesubclick,this))
		
	},
	handlesubclick(){
		var complayName=this.ele.find('#x_complayName').val();
		var complayHow=this.ele.find('#x_complayHow').val()
		var complayInt=this.ele.find('#x_complayInt').val();
		var complayLogo=this.ele.find('#x_complayLogo')[0].files[0];
		
		var formData=new FormData();
		formData.append('_id',this._id);
		formData.append('complayName',complayName);
		formData.append('complayHow',complayHow);
		formData.append('complayInt',complayInt);
		formData.append('complayLogo',complayLogo);
			
		$.ajax({
			type:"post",
			url:"/company/xiugai",
			contentType:false,
            processData:false,
            data:formData,
            success:$.proxy(this.handleModifySucc,this)
		});
	},
	handleModifySucc(data){
		if(data.status){
			alert("修改成功")
			location.reload(true);
		}
	},
	handleRem(){
		this.ele.find('#x_js_remove').on('click',$.proxy(this.handleRemclick,this))
		
	},
	handleRemclick(){
		console.log(this._id)
		if(this._id){
		$.ajax({
			type:"get",
			url:"/company/remove",
            data:{_id:this._id},
            success:$.proxy(this.handleRemSucc,this)
		});
		}else{
			return 
		}
		
	},
	handleRemSucc(data){
		if(data.status){
			alert("删除成功")
			location.reload(true);
		}
	}
}

