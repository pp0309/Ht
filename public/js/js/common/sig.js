function Sig(id){
	this.ele=id;
	this.init();
}


Sig.str=`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">注册</span></button>
							<h4 class="modal-title" id="myModalLabel">Modal title</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<label for="exampleInputEmail1">用户名</label>
									<input type="email" class="form-control" id="exampleInputEmail1" placeholder="用户名">
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">密码</label>
									<input type="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
								</div>
								<button id="sig" class="btn btn-default">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>`
Sig.prototype={
	init:function(){
		this.appen();
		this.subm();
	},
	appen:function(){
		this.el=$('<div></div>');
		this.el.append(Sig.str);
		this.ele.append(this.el)
	},
	subm:function(){
		$('#myModal').find('#sig').on('click',$.proxy(this.subax,this))
	},
	subax:function(){
		var name=$('#exampleInputEmail1').val();
		var pwd=$('#exampleInputPassword1').val();
		console.log('传'+name,pwd)
		$.ajax({
			type:"post",
			url:"/sig",
			data:{
				name,pwd
			},
			success:$.proxy(this.cb,this)
		});
	},
	cb:function(data){
		console.log(data)
	}
}
