function Lod(id){
	this.ele=id;
	
	this.init();
}


Lod.str=`<div class="modal fade" id="my" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">登录</span></button>
							<h4 class="modal-title" id="myModalLabel">Modal title</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<label for="exampleInputEmail2">用户名</label>
									<input type="email" class="form-control" id="exampleInputEmail2" placeholder="用户名">
								</div>
								<div class="form-group">
									<label for="exampleInputPassword2">密码</label>
									<input type="password" class="form-control" id="exampleInputPassword2" placeholder="密码">
								</div>
								<button type="submit" class="btn btn-default" id='sublod' data-dismiss='modal'>Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>`

Lod.prototype={
	init:function(){
		this.appen();
		this.loding();
	},
	appen:function(){
		this.el=$('<div></div>');
		this.el.append(Lod.str);
		this.ele.append(this.el)
	},
	loding:function(){
		$('#sublod').on('click',$.proxy(this.win,this))
	},
	win:function(){		
		var name=$('#my').find('#exampleInputEmail2').val();
		var pwd=$('#my').find('#exampleInputPassword2').val();
		console.log(name,pwd)
		$.ajax({
			type:"post",
			url:"/lod",
			data:{
				name,pwd
			},
			success:$.proxy(this.shu,this)
		});
	},
	shu(data){
		if(data.status){
		alert(data.info)
		console.log(data)
		location.reload(true)
		}else{
			alert(data.info)
		}
	}
}
