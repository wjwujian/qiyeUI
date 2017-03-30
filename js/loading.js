/**
     *显示加载页面
     *msgContent 加载页面显示的内容，如果不传，默认为"加载中..."
 */
function showLoading(msgContent) {
    var msgContent = msgContent || "加载中...";
    var loadingHtml = function (){
        var str =     '<div class="overlay" id="overlayImage" style="display: none;"></div>'
                +    '<div class="simple_tips" id="loading_simple_div" style="display: none; position: fixed;">'
                +        '<div class="simple_tips_content text-center">'
                +            '<div id="loading" class="loading ma"><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'
                +            '</div>'
                +            '<div class="simple_tips_text mt10">'
                +                '<p id="loading_text">'+msgContent+'</p>'
                +           '</div>'
                +        '</div>'
                +    '</div>';
        $('body').append(str);
    }
    loadingHtml();
    $(".overlay").show();
    win_height = document.getElementById("overlayImage").offsetHeight/5;
    win_width = document.getElementById("overlayImage").offsetWidth;
    
    document.getElementById("loading_simple_div").style.display = "block";
    //让加载中剧中对齐
    var tips_width = document.getElementById("loading_simple_div").offsetWidth,
    tips_height= document.getElementById("loading_simple_div").offsetHeight,
    top = (win_height-tips_height)/2,
    left = (win_width-tips_width)/2;
    $("#loading_simple_div").css({
        'top' : top + "px",
        'left' : left + "px"
    });
}

 /**
 *隐藏加载页面
 */
function hideLoading() {
    $(".overlay, #loading_simple_div").remove();
}
