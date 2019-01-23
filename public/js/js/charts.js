function Echart(ele,option){
	this.ele=ele;
	this.option=option;
	this.init();
}
Echart.prototype={
	init:function(){
		this.loadDia()
	},
	loadDia(){
		var myCharts = echarts.init(this.ele[0]);
       
        myCharts.setOption(this.option);
	}
}
