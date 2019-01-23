function Coms(){
	this.ele=$("#header");
	this.init();
	
}
Coms.prototype={
	init:function(){
		this.appen()
	},
	appen(){
		this.head=new Head(this.ele);
		this.lod=new Lod(this.ele);
		this.Sig=new Sig(this.ele);
	}
}
new Coms()