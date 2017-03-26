$(function () {
    var flag=true;
    $('.hx_private .hx_switch .hx_turn').on('click',function () {
        if(flag){
            $(this).css({left:'0.68rem'});
            $('.hx_private .hx_switch').css({background:'#238bd6'});
            flag=false;
        }else{
            $(this).css({left:'-0.05rem'});
            $('.hx_private .hx_switch').css({background:'#cecece'});
            flag=true;
        }
    })
})