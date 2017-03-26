$(function(){
	var picturebox=getClass("hlj_centerbox")[0];
	var imgs=getClass("hlj_center",picturebox);
	var btnbox=getClass("hlj_btnbox")[0];
	var btn=getClass("btn",btnbox);
	var num=0;
	function lunbo(type){
		type=type||"next";
		if(type=="next"){
			num++;
			if(num>=imgs.length){
				num=0;
			}
		}else if(type=="pre"){
			num--;
			if(num<=-1){
				num=imgs.length-1;
			}
		}
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.opacity=0;
			btn[i].style.background="#FFFFFF";
		}
		imgs[num].style.opacity=1;
		btn[num].style.background="#1f95e7";
	}
	var t=setInterval(lunbo,2000);

	for(var i=0;i<btn.length;i++){
		btn[i].index=i;
		btn[i].onmouseover=function(){
			for(var j=0;j<btn.length;j++){
				imgs[j].style.opacity=0;
				btn[j].style.background="#FFFFFF";
			}
			this.style.background="#1f95e7";
			imgs[this.index].style.opacity=1;
		}
	}

    setTimeout(function () {
        clearInterval(t);
    },7000);
})
