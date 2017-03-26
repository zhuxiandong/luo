//解决类名获取兼容问题：①判断浏览器类型②是现代，用原生去获取元素③如果是IE，用标签将所有元素找见，用className去和想要找的类名进行匹配，匹配成功则把这个元素保存到新数组中。
function getClass(classname,father){
	father=father||document;//给参数做默认值
	//如果father没有传参数时（undefined===>false），默认值为document;
	//如果传参数时，都为真取第一个为真的值
	//判断浏览器类型 (判断获取类名方法在不在)
	if(father.getElementsByClassName){     //是现代，用原生去获取元素
		return father.getElementsByClassName(classname)
	}else{
		//获取所有的标签元素
		var all=father.getElementsByTagName("*");
		var newarr=[];
		for(var i=0;i<all.length;i++){
			if(checkRep(all[i].className,classname)){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
function checkRep(str,classname){
	var arr=str.split(" ");				//"one box"====>["one","box"]变成数组
	for(var i=0;i<arr.length;i++){
		if(arr[i]==classname){
			return true;//多个类名只要有一个是满足的，就停止匹配，并返回一个值true
		}
	}
	return false;
}
/***********************************/
//获取样式的兼容格式
function getStyle(obj,attr){/*obj=获取哪一个对象的样式，attr=属性名*/
	if(obj.currentStyle){//IE8
		return parseInt(obj.currentStyle[attr])//attr="width"
	}else{//现代
		return parseInt(getComputedStyle(obj,null)[attr]);//获取宽高无单位
	}
}
/***********************************/
//获取元素
function $(selector,father){//selector选择器
	father=father||document;
	if(typeof selector=="string"){//检测是否为字符串
		selector=selector.replace(/^\s*|\s*$/,"")//去除空白字符
		if(selector.charAt(0)=="."){
			return getClass(selector.substring(1),father);//截取
		}else if(selector.charAt(0)=="#"){
			return document.getElementById(selector.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){//检测是否符合标签规范
			return father.getElementsByTagName(selector);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selector)){//创建标签
			//"<div>" "<p>" 	
			selector=selector.slice(1,-1);//截取div  p
			return document.createElement(selector);
		}
	}else if(typeof selector=="function"){
		//检测结果是函数，则等待文档加载完成后触发
		window.onload=function(){
			selector();
		}
	}
}
/***********************************/
//获取子节点兼容问题
function getChilds(father){
	var childs=father.childNodes;
	var newarr=[];
	for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1){
			newarr.push(childs[i]);
		}
	}
	return newarr;
}
/***********************************/
//获取第一个子节点兼容问题
function getFirst(father){
	return getChilds(father)[0];
}
/***********************************/
//获取最后一个子节点兼容问题
function getLast(father){
	return getChilds(father)[getChilds(father).length-1];
}
/***********************************/
//获取指定位置子节点
function getNum(father,num){
	return getChilds(father)[num];
}
/***********************************/
//获取下一个兄弟节点兼容问题
function getNext(nodeObj){
	var next=nodeObj.nextSibling;
	if(next==null){
		return false;
	}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling;//如果不是元素节点，继续找下一个兄弟节点
		if(next==null){
			return false;
		}
	}
	return next;
}
/***********************************/
//获取上一个兄弟节点兼容问题
function getPre(nodeObj){
	var pre=nodeObj.previousSibling;
	if(pre==null){
		return false;
	}
	while(pre.nodeType==3||pre.nodeType==8){
		pre=pre.previousSibling;//如果不是元素节点，继续找下一个兄弟节点
		if(pre==null){
			return false;
		}
	}
	return pre;
}
/***********************************/
//将元素插入到另一个元素之后（不用获取父元素）
function insertBefore(newObj,nowObj){
	var parent=nowObj.parentNode;
	parent.insertBefore(newObj,nowObj);
}
/***********************************/
//将元素插入到另一个元素之后
/*function insertAfter(father,newObj,nowObj){
	var next=getNext(nowObj);
	if(next){
		father.insertBefore(newObj,next);
	}else{
		father.appendChild(newObj);
	}
}*/
function insertAfter(newObj,nowObj){
	var nextSibling=getNext(nowObj);
	if(next){
		insertBefore(newObj,next);
	}else{
		nowObj.parentNode.appendChild(newObj);
	}
}
/***********************************/
//监听事件兼容问题（对同一个事件作出多个事件处理程序）
//IE8及以下版本不认识this,this指向的是window
//事件添加
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		obj.addEventListener(event,fun,false);
	}else{
		obj.attachEvent("on"+event,fun);
	}
}
//事件删除
function removeEvent(obj,event,fun){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fun,false);
	}else{
		obj.detachEvent("on"+event,fun);
	}
}
/***********************************/
//给某一个元素添加滚轮事件
function mousewheel(obj,upfun,downfun){
	//添加鼠标滚轮事件(先判断浏览器)
	if(obj.addEventListener){
		obj.addEventListener("mousewheel",fun,false);//谷歌
		obj.addEventListener("DOMMouseScroll",fun,false);//火狐
	}else{
		box.attachEvent("onmousewheel",fun);//IE
	}
	function fun(e){
		var ev=e||window.event;
		//阻止浏览器默认动作
		if(ev.preventDefault){
			ev.preventDefault();//谷歌\火狐
		}else{
			ev.returnValue=false;//IE
		}
		//获取滚动方向
		var direction=ev.wheelDelta||ev.detail;
		if(direction==120||direction==-3){
			upfun.call(obj);//改变指针到obj
		}else if(direction==-120||direction==3){
			downfun.call(obj);
		}
	}
	
	//参数初始化（为了定义默认值）
	//var obj=obj||document;
}
/***********************************/
//shover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function(e){
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
function getEvent (e) {
    return e||window.event;
}
/***********************************/
//新建cookie
function setCookie(attr,value,time){
	if(time){
		//有指定生存周期的cookie
		var now=new Date();
		now.setTime(now.getTime()+time*1000);
		document.cookie=attr+"="+value+";expires="+now.toGMTString();		
	}else{	
		//临时性的cookie
		document.cookie=attr+"="+value;
	}
}
//获取cookie
function getCookie(attr){
	//获取所有cookie
	var cookies=document.cookie;
	//将cookie字符串转换成数组
	var arrCookie=cookies.split("; ");
	for(var i=0;i<arrCookie.length;i++){
		var brrCookie=arrCookie[i].split("=");
		if(brrCookie[0]==attr){
			return brrCookie[1];
		}
	}
	return undefined;
}
//删除cookie（将要删除的cookie过期）
function delCookie(attr){
	var now=new Date();
	now.setTime(now.getTime()-1);//设置过期时间
	document.cookie=attr+"=suibian;expires="+now.toGMTString();
}
/***********************************/
//正则--删除空白字符
function delSpace(str,type){
	if(typeof str=="string"){
		type=type||"both";
		switch(type){		
			case "^":
				var reg=/^\s*/g;		//匹配开头空白字符
				return str.replace(reg,"");
			break;
			case "$":
				var reg=/\s*$/g;		//匹配结尾空白字符
				return str.replace(reg,"");
			break;
			case "both":
				var reg=/^\s*|\s*$/g;	//匹配开头和结尾空白字符
				return str.replace(reg,"");
			break;
			case "all":
				var reg=/\s*/g;			//匹配所有空白字符
				return str.replace(reg,"");
			break;
		}
	}
}
/**********************************************/
//AJAX  （发送ajax传递数据）
function ajax(obj){
	//初始化数据
	var url=obj.url;				//地址
	var type=obj.type||"GET";		//数据传输方式
	var dataType=obj.dataType||"text";			//数据类型，默认对象木事
	var asynch=obj.asynch==undefined?true:obj.asynch;	//是否异步
	var success=obj.success;
	var data="";
	if(obj.data){					//有值时执行
//		{"aa":"bb","cc":"dd"}  对象转成字符串
		for(var i in obj.data){			//遍历对象  i表示对象的属性和方法名称  obj[i]
			data+=i+"="+obj.data[i]+"&";//.后面跟属性  i是变量，[i]表示取值
		}
		data=data.slice(0,-1);			//去掉最后一个&符号
	}
	//创建ajax
	var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	if(type=="GET"){
		ajax.open("GET",url+"?"+data,asynch);
		ajax.send(null);
	}else if(type=="POST"){
		ajax.open("POST",url,asynch);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	}
	//监控
	ajax.onreadystatechange=function(){
		if(ajax.readyState==4){
			if(ajax.status==200){
				if(dataType=="text"){
					if(success){
						success(ajax.responseText);
					}
				}else if(dataType=="xml"){
					if(success){
						success(ajax.responseXML);
					}
				}else if(dataType=="json"){
					if(success){
						
						success(eval("("+ajax.response+")"));		//eval里必须是字符串
					}
				}
			}else if(ajax.status==404){
				alert("页面未找到");
			}else{
				alert("页面获取错误");
			}
		}
	}
}