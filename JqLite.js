
//封装一个$方法 方便调用

function $(attr){
	
	return new JqLite(attr);
}

//创建了一个JqLite的对象
function JqLite(attr){
	
	this.elements=[];   /*dom节点的集合*/	
//	this
	
	if(typeof(attr)=='object'){   /*传入this*/
		
		this.elements[0]=attr
	}else{
		this.query(attr);
	}
		
}
//获取选择器的dom节点

JqLite.prototype.query=function(attr){	
	var el=document.querySelectorAll(attr);   /*id   classs*/
	this.elements=el;
}


//find方法   表示找到一个dom节点下面的对应子节点


JqLite.prototype.find=function(attr){	
	
	var childNodes=[];
	
	for(var i=0;i<this.elements.length;i++){		
		
		//获取当前父节点对应的子节点
		
		var childs=this.elements[i].querySelectorAll(attr);  /*集合*/
		
		for(var j=0;j<childs.length;j++){			
			
			childNodes.push(childs[j]);
		}		
	}	
	//改变this.elements    $('li').find('ol') 要把this.elements 改变为当前的子节点	
	//$('li').find('ol').show()
	this.elements=childNodes;    	
	return this;
	
	
}



//设置css的  获取css
JqLite.prototype.css=function(attr,value){
		
	
	if(arguments.length==1 && typeof(attr)=='object'){
		//对象设置值
		//$(".box")
		//{'width':'200px','height':"300px","background":'red'}
		for(var item in attr){
			
			for(var i=0;i<this.elements.length;i++){							
				this.elements[i].style[item]=attr[item];
			}			
		}
		
		
	}else{ 
	
		if(arguments.length==1){
			//获取css
			for(var i=0;i<this.elements.length;i++){						
				return getStyle(this.elements[i],attr);  /*获取css属性的值*/  			
			}		
		}else{	
			//设置css
			for(var i=0;i<this.elements.length;i++){
				this.elements[i].style[attr]=value;	
				
			}
		}	
	
	}
	return this;  /*方便连缀操作*/
}

//获取innerHTML  改变 innerHTML
JqLite.prototype.html=function(value){	
	
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){  /*没有传值获取 innerHTML*/
			return this.elements[i].innerHTML;
		}else{
			this.elements[i].innerHTML=value;   /*设置innerHTML*/
			
		}
	}
	
	return this;   /*方便连缀操作*/
	
}


//获取append
JqLite.prototype.append=function(eleStr,content){	
	
	for(var i=0;i<this.elements.length;i++){
		
		var lis=document.createElement(eleStr);
		
		lis.innerHTML=content;
		
		this.elements[i].appendChild(lis);		
		
	}
	return this;   /*方便连缀操作*/
	
}


//绑定onclick事件

JqLite.prototype.click=function(cb){	
//	var cb=function(){
//	}	
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=cb;     /*绑定事件执行回调函数*/
	}	
}


//封装hover方法
JqLite.prototype.hover=function(cb1,cb2){		
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover=cb1;		
		this.elements[i].onmouseout=cb2;
	}
}

//封装show方法
JqLite.prototype.show=function(){		
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	
	return this;
}


//封装hide方法
JqLite.prototype.hide=function(){		
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
}




//获取设置 滚动条距离顶部的高度     document      box

JqLite.prototype.scrollTop=function(scrollTo){
	
	
	if(document==this.elements[0]){
		if(arguments.length==0){
		
			//this.elements[0]  dom节点
//			alert(this.elements[0]);
			
			return document.documentElement.scrollTop || document.body.scrollTop; 
			
		}else{//设置
			
			if(document.documentElement.scrollTop){				
				document.documentElement.scrollTop=scrollTo;
			}else{				
				document.body.scrollTop=scrollTo;
			}
		}
	}else{
		
		if(arguments.length==0){
			
			return this.elements[0].scrollTop;
		}else{
			
			this.elements[0].scrollTop=scrollTo;
		}
		
	}
	
	
}

//$('.box').first().css();

//first  第一个节点

JqLite.prototype.first=function(){
	
	
	var ele=this.elements[0];
	
	this.elements=[];
	
	this.elements.push(ele);
	
	return this;
}

//last最后一个节点

JqLite.prototype.last=function(){		
		
	var ele=this.elements[this.elements.length-1];	
	this.elements=[];	  
	this.elements.push(ele);	
		
	return this;
}


//eq  第几个节点

JqLite.prototype.eq=function(num){
			
	var ele=this.elements[num];	  /*数组下标0开始*/
	this.elements=[];	   /*改变elements 替换为空*/
	this.elements.push(ele);
	return this;
}

//index  获取索引值

//  $(this).index()

//$(ul).find(li).click(function(){
//
//	$(this).index();
//	
//})

//index()方法可以获取所引入  
JqLite.prototype.index=function(num){			
	var ele=this.elements[0];    /*点击第二个（this）    this.elements[0]  */	
//	children     childNodes  
//children获取元节点
//childNodes  获取所有的节点	
	var children=ele.parentNode.children;
	for(var i=0;i<children.length;i++){	
		if(ele==children[i]){ 
			return i;
		}
	}
	return null;
}

//添加Class  $('.box').addClass('active')

// <div class=' active'></div>

JqLite.prototype.addClass=function(className){
	
	for(var i=0;i<this.elements.length;i++){
		
		//判断当前元素有没有这个class		
		
		if(!hasClass(this.elements[i],className)){ //  有true  没有这个class增加
			
			this.elements[i].className=this.elements[i].className+' '+className;
			
		}		
	}
}




//移除Class

JqLite.prototype.removeClass=function(className){
	
	for(var i=0;i<this.elements.length;i++){		
		//判断当前元素有没有这个class		
		
		if(hasClass(this.elements[i],className)){			
			//删除class
			
			//   box active  pox			
			
			//获取当前的className的值
			
			var clName=this.elements[i].className;			
			var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');   /*正则匹配*/		
						
//			console.log(reg);
			
			var str=clName.replace(reg,' ');  /*替换匹配到的内容*/	
			
			
			this.elements[i].className=str;  /*删除后的值*/	
			
		}
		
	}
}



//设置物体居中    自己实现    锁屏

//$('#box').center()




JqLite.prototype.center=function(){
	
	for(var i=0;i<this.elements.length;i++){
		
		//获取当前dom节点的宽度和 高度		
		
		var height=parseInt(getStyle(this.elements[i],'height'));
		var width=parseInt(getStyle(this.elements[i],'width'));				
		var pageWidth=getPageSize().width;
		var pageHeight=getPageSize().height;		
		
		this.elements[i].style.position='absolute';
		this.elements[i].style.left=(pageWidth-width)/2+'px';		
		this.elements[i].style.top=(pageHeight-height)/2+'px';
		
		
	}
	return this;
	
}

//锁屏

JqLite.prototype.lock=function(){
	
//	1.创建一个dom节点

	var lockDiv=document.createElement('div');
	
	lockDiv.className='lock';
	
	lockDiv.style.position="absolute";
	
	lockDiv.style.zIndex=100;  
	
	lockDiv.style.top=0;
	
	lockDiv.style.left=0;
	
	lockDiv.style.width=getPageSize().width+24+'px';
	
	lockDiv.style.height=getPageSize().height+'px';	
	
	lockDiv.style.background="rgba(0,0,0,0.3)";
	
	document.body.appendChild(lockDiv);
	
	document.body.style.overflow='hidden';    /*锁屏一个禁止 滚动条下拉*/
	return this;
	
}
//解锁
JqLite.prototype.unlock=function(){	
	
	var lock=document.querySelectorAll('.lock')[0];   /*获取锁屏的元素*/
	
	document.body.removeChild(lock);	
	
	document.body.style.overflow='auto';    /*解锁滚动条允许下拉*/
	
	
}


//设置表单字段内容获取


//$('#username').value('123')




//拖拽功能


//$('#box').drag();

JqLite.prototype.drag=function(){
		
//	var that=this;	
	for(var i=0;i<this.elements.length;i++){
		
//		that.elements.index=i;


		var title=this.elements[i].querySelectorAll('.title')[0]; 
		
		title.onmousedown=function(e){
			
			
			var _that=this;   /*当前鼠标按下的dom节点  保持当前的dom节点*/
						
			 e=e||event;			
			 
			 
			 //阻止默认行为
			 preDefault(e);
			 e.stopPropagation();
			 
			 
			
			 var difX=e.offsetX;
			 
			 var difY=e.offsetY;			 
			 
			 document.onmousemove=function(eve){
			 	
			 	eve=eve||event;				 	
			 	var left=eve.pageX-difX;
			 	var top=eve.pageY-difY;
				//用到this要注意this指向  ，注意循环绑定时间		
				
				//判断边界 开始
				var pageWidth=getPageSize().width;				
				var pageHeight=getPageSize().height;
				
				if(left<0){
					left=0;
				}
				if(top<0){
					top=0;
				}				
				if(left>(pageWidth-_that.offsetWidth)){
					
					left=pageWidth-_that.offsetWidth;
				}
				
				if(top>(pageHeight-_that.offsetHeight)){
					
					top=pageHeight-_that.offsetHeight;
				}
				
				//判断边界结束
				_that.parentNode.style.left=left+'px';				
				_that.parentNode.style.top=top+'px';
			 	
			 }
			 
			 document.onmouseup=function(){
			 	
			 	document.onmousemove=null;			 	
			 	document.onmouseup=null;
			 }
			
			
		}
		
	}
}


//运动库

JqLite.prototype.animate=function(json,time,fn){
	
	time=time || 30;
	
	for(var i=0;i<this.elements.length;i++){
		
		
		var obj=this.elements[i];
		
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			
			var bStop = true; //表示全部到达目标值
			
			//遍历json对象中的每个css样式属性键值对
			for (var attr in json) {
				var iTarget = parseInt(json[attr]); 
				
				//1, current
				var current;
				if (attr == "opacity") { //透明度 
					current = Math.round(getStyle(obj,attr) * 100); 
				}
				else { //left,top,width,height
					current = parseFloat(getStyle(obj, attr)); 
					current = Math.round(current);
				}
				
				//2, speed
				var speed = (iTarget-current) / 8;
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed); 
				
				
				console.log(speed);
				//3, 判断临界值
				if (current != iTarget){
					bStop = false; //说明有至少一个样式属性没有到达目标值
				}
				
				//4, 运动
				if (attr == "opacity") {
					obj.style[attr] = (current + speed) / 100;
					obj.style.filter = "alpha(opacity="+ (current+speed) +")";
				}
				else {
					obj.style[attr] = current + speed + "px";
				}
				
			}
			
			//如果bStop=true， 则说明所有样式属性都到达了目标值
			if (bStop) {
				clearInterval(obj.timer); //停止运动了
									
				//回调
				if (fn) {
					fn();
				}			
			}		
			
		}, time);
		
		
	}	
}










