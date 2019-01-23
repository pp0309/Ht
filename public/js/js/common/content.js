function cont (){
	this.ele=$('#content');
	this.page=1;
	this.sum=1;
	this.listPage(this.handleGetCompanySucc)
	this.init();
	
}
cont.str=`
				<ul class="tabNav">
		        <li>
		            <a href="##">系统首页</a>
		        </li>
		        <li>
		            <a href="##">公司管理</a>
		            <ul>
		                <li><a href="##"id='js_list_compaly' >公司列表</a></li>
		                <li><a href="##"id='js_add_compaly'>新增公司</a></li>
		            </ul>
		        </li>
		        <li>
		            <a href="##" id="js_shan">扇形图</a>
		        </li>
		        <li>
		            <a href="##"id="js_dian">矩形图</a>
		        </li>
		   		 </ul>`
cont.prototype={
	init:function(){
		this.creat();
		this.comshow();
		this.addcom();
		this.list();
		this.pieDia();
		this.dianDia()
	},
	creat:function(){
		this.el=$('<div></div>');
		this.el.append(cont.str);
		this.ele.children().eq(0).append(this.el);
	},
	comshow:function(){
		this.ele.find('.tabNav>li>a').on('click',$.proxy(this.cshow))
	},
	cshow:function(){
		$(this).next().slideToggle();
	},
	addcom:function(){
		this.ele.find('#js_add_compaly').on('click',$.proxy(this.addcompaly,this))
	},
	addcompaly:function(){
		this.ele.find('#laypage').text('')
		this.ele.find('.listpage').load('html/addcom.html',$.proxy(this.addCompage,this))
	},
	addCompage(){
		this.ele.find('#js_addcomsub').on('click',$.proxy(this.addComInt,this))
	},
	addComInt:function(){
		var complayName=$('#complayName')
		var complayHow=$('#complayHow')
		var complayInt=$('#complayInt')
		var complayLogo=$('#complayLogo')
		
		var formData=new FormData();
		formData.append('complayName',complayName.val())
		formData.append('complayHow',complayHow.val())
		formData.append('complayInt',complayInt.val())
		formData.append('complayLogo',complayLogo[0].files[0])
		
		$.ajax({
            type:"post",
            url:"/company/addCompany",
            data:formData,
            contentType:false,
            processData:false,
            success:$.proxy(this.handleAddSucc,this)
        })
	},
	handleAddSucc:function(data){
		if(data.status){
			alert('添加成功')
			$('#complayName').val('');
			$('#complayHow').val('');
			$('#complayInt').val('');
			$('#complayLogo').val('');
		}

	},
	list(){
		this.ele.find('#js_list_compaly').on('click',this.handleGetCompanySucc,$.proxy(this.listPage,this))
	},
	listPage(e){
		Object.prototype.toString.call(e)=='[object Function]'?this.page:this.page=1;
		this.ele.find('.listpage').html('')	;
		var token=Cookies.get('token')
		
		$.ajax({
            type:"get",
            url:"/company/companyList",
            headers:{token},
            data:{
                page:this.page,
                limit:5,               
            },
          success:$.proxy(Object.prototype.toString.call(e)=='[object Function]'?e:e.data,this)
          
        })
	},
	handleGetCompanySucc(data){	
		if(data.status){
	this.bianli(data)	
	new fenpage(this,data)	
			
		}else{
			alert(data.info)
		}
		
	},
	handleGetCompanyPageSucc(data){
		this.bianli(data)
		
	},
	bianli(data){
		var arr=[];
		arr=data.data
		var str='';
		for(var i=0,le=arr.length;i<le;i++){
			str+=`<div data-id=${arr[i]._id} class="company-item">
			<div  data-toggle='modal' data-target="#xiupage" >
		                <div class="company_t">
		                    <div class="company-logo">
		                        <img src="http://localhost:3000${arr[i].complayLogo}" />
		                    </div>
		                    <p class="company-name">${arr[i].complayName}</p>
		                    <p class="company-scale">${arr[i].complayHow}</p>
		                    <p class="company-des">${arr[i].complayInt}</p>
		                </div>
		                <div class="company-b">
		                        <span>27</span>
		                        <p>在招职位</p>
		                </div>
            		</div>
            		</div>`
		}
		this.ele.find('.listpage').append(str)
		var com=$('.company-item')
		new Xiu(com);
		
	},
	//统计图
	pieDia(){
		this.ele.find('#js_shan').on('click',$.proxy(this.handlepieDia,this))
		
	},
	handlepieDia(){		
		this.ele.find('.listpage').html('')
		this.ele.find('.listpage').append('<div id="main"></div>')
	option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直达', selected:true},
                {value:679, name:'营销广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }
    ]
};
        new Echart (this.ele.find('#main'),option)
	},
	//点状图
	dianDia(){
		this.ele.find('#js_dian').on('click',$.proxy(this.handledianDia,this))
		
	},
	handledianDia(){		
		this.ele.find('.listpage').html('')
		this.ele.find('.listpage').append('<div id="main"></div>')
		var data = [
    [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
    [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
];

option = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#f7f8fa'
    }, {
        offset: 1,
        color: '#cdd0d5'
    }]),
    title: {
        text: '1990 与 2015 年各国家人均寿命与 GDP'
    },
    legend: {
        right: 10,
        data: ['1990', '2015']
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                }])
            }
        }
    }, {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                }])
            }
        }
    }]
};
		 new Echart (this.ele.find('#main'),option)
}
}

new cont();
