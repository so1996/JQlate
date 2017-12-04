//工具js

//获取计算后的css样式
function getStyle(element,attr){
	
	if(getComputedStyle){
		
		return getComputedStyle(element,'')[attr];
	}else{
		
		
		return element.currentStyle[attr];
	}
	
}

//判断一个dom节点有没有这个class

function hasClass(element,className){
	
	var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');	
	
	if(element.className.match(reg)){
				
		return true;
	}
	return false;	
	
}

//自定义阻止默认
function preDefault(e){
	
	
	if(e.preventDefault){
		
		e.preventDefault();
	}else{
		
		e.returnValue=false;
	}
}

//获取浏览器的宽度高度

//getClient

function getPageSize(){
	
		var obj={
			
			
			width:document.documentElement.clientWidth,			
			height:document.documentElement.clientHeight
		}
		
		
//		window.innerWidth  获取浏览器的宽度带滚动条
		
		return obj;
	
}

