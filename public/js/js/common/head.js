function Head (id){
	this.ele=id;
	this.init();
}
Head.str=`<!--导航开始-->
			<nav class="navbar navbar-default">
				<div class="container-fluid">
					<div class="navbar-header">
						<a class="navbar-brand" href="#"><img src="http://jx.1000phone.net/Public/assets/css/images/logo.png?1547187780"></a>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul class="nav navbar-nav">
							<li class="active">
								<a href="#">OA管理系统</a>
							</li>
							<li>
								<a href="#">学生信息</a>
							</li>
						</ul>

						<ul class="nav navbar-nav navbar-right" id='js_loded'>
							<li>
								<a href="#" data-toggle="modal" data-target="#my">登录</a>
							</li>
							<li class="dropdown">
								<a href="#"data-toggle="modal" data-target="#myModal">注册 </a>
							</li>
						</ul>
						<ul class="nav navbar-nav navbar-right hide" id='js_loding'>
							<li>
								<a href="##"  id='js_showid'></a>
							</li>
							<li class="dropdown">
								<a href="##" id='js_out'>退出</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<!--导航结束-->`

Head.prototype={
	init:function(){
		this.appen();
		this.loded();
		this.out();
	},
	appen:function(){		
		this.el=$('<div></div>');
		this.el.append(Head.str);
		this.ele.append(this.el);		
	},
	loded(){
		var	token = Cookies.get('token');
		var	user = Cookies.get('user');
		if(token&&user){
			this.ele.find('#js_loded').addClass('hide');
			this.ele.find('#js_loding').removeClass('hide');
			this.ele.find('#js_showid').text(user);
		}else{
			this.ele.find('#js_loded').removeClass('hide');
			this.ele.find('#js_loding').addClass('hide');
			this.ele.find('#js_showid').text('');
		}
	},
	out:function(){
		this.ele.find('#js_out').on('click',$.proxy(this.showOut,this))
	},
	showOut(){
		console.log('2')
		var pd=confirm('您确定要退出吗？')
		if(pd){
			Cookies.remove("user");
            Cookies.remove("token");
            location.reload(true);
		}else{
			return
		}
	}
}
 