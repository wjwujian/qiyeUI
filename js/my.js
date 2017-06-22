var updateObj = {
    title:"2017-06-22更新公告",
    content:"1、Ku.min.css增加大图预览的样式。<br>2、移动端1像素边框<br>3、解决ku.min.css修改企微的弹窗样式引起的弹窗不可见bug"
}
if (localStorage.time20170622 === undefined) {
    _alert(updateObj.title,updateObj.content);
    localStorage.time20170622 = updateObj.title
};

/*设备检测*/
// 判断屏幕是否旋转
function orientationChange() {
    switch(window.orientation) {
    　　case 0: 
        // alert(0);
        break;
    　　case -90: 
        // alert("左旋 90");
        break;
    　　case 90:   
        // alert("右旋 90");
        break;
    　　case 180:   
    　　// alert("风景模式 180");
    　　break;
    }};
// 终端检测
function systemUA(){
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        console.log(navigator.userAgent+'水果系统'); 
        return  'IOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {
        console.log(navigator.userAgent+'Android系统'); 
        return 'Android';
    } else {
        console.log('pc');
         return 'pc';
    };
}
// 添加事件监听
// window.onorientationchange = orientationChange;

//判断是否存在iframe
function isIframe(){
    return top.location != self.location
}

/**
	* JS链接跳转
*/
function hrefTo(url){
	location.href = url
}

//tab切换
function tabUI(active,tab,_this){
    var $index = $(_this).index();
    $(_this).addClass(active).
    siblings().removeClass(active);
    $(tab).children().eq($index).show()
    .siblings().hide();
}

/**
	*微信端大图预览
	@param img 图片
	@method onImgLoad 数据成功获得之后调用
*/
var imgsSrc = [];  
function reviewImage(src) {  
    if (typeof window.WeixinJSBridge != 'undefined') {  
        WeixinJSBridge.invoke('imagePreview', {  
            'current' : src,  
            'urls' : imgsSrc  
        });  
    }  
}  
function onImgLoad(img) {  
    var imgs = document.querySelectorAll(img);  
    for( var i=0,l=imgs.length; i<l; i++ ){  
        var img = imgs.item(i);  
        var src = img.getAttribute('data-src') || img.getAttribute('src');
        console.log('\n'+src);  //src需要为绝对路径
        if( src ){  
            imgsSrc.push(src);  
            (function(src){  
                if (img.addEventListener){  
                    img.addEventListener('click', function(){  
                        reviewImage(src);  
                    });  
                }else if(img.attachEvent){  
                    img.attachEvent('click', function(){  
                        reviewImage(src);  
                    });  
                }  
            })(src);  
        }  
    }  
}  

/*格式化日期*/
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}


/**
    *手势侧滑操作
    *@param elm 滑动的元素
    *@param item 进行操作的元素
    *@method touchstart 开始滑动
    *@method touchmove 滑动中
    *@method touchend 滑动结束
    *@method update 恢复滑动前的样子
*/
function TouchEvent(elm,item){
  this.touch;
  this.startX;
  this.startY;
  this.moveX;
  this.moveY;
  this.touchX;
  this.touchY;
  this.x;
  this.li = document.querySelectorAll(elm);
  this.item = item;
  this.flag = false;
  this.isTouch = 'ontouchstart' in window;
  _this = this;
  
  //移动端和PC端事件
  if(_this.isTouch){ 
      _this.down = 'touchstart';
     _this.move = 'touchmove';
     _this.up = 'touchend';
  }else{
      _this.down = 'mousedown';
      _this.move = 'mousemove';
      _this.up = 'mouseup';
  }

  for (var i = 0; i < _this.li.length; i++) {
      _this.li[i].addEventListener(_this.down,_this.touchstart,false);
      _this.li[i].addEventListener(_this.move,_this.touchmove,false);
      _this.li[i].addEventListener(_this.up,_this.touchend,false);
  };
}

TouchEvent.prototype.touchstart = function(e){
  _this.flag = true;
  var tagName = e.currentTarget.tagName,
      $this = $(this);
  (_this.isTouch) ? touchEvent = e.changedTouches[0] :  touchEvent = e || window.e; //事件源
  _this.touch = touchEvent;
  _this.startX = _this.touch.pageX;
  _this.startY = _this.touch.pageY;
  if (tagName == "LI") {
      return
  }else{
    _this.update();
  };

}

TouchEvent.prototype.touchmove = function(e){
  console.log('move');
  (_this.isTouch) ? touchEvent = e.changedTouches[0] :  touchEvent = e || window.e; //事件源
  var $this = $(this);
  var m = function(){
        _this.touch = touchEvent;
        _this.moveX = _this.touch.pageX;
        _this.moveY = _this.touch.pageY;
        _this.touchX = _this.moveX - _this.startX;
      if (Math.abs(_this.moveX - _this.startX) > Math.abs(_this.moveY - _this.startY)){
          e.preventDefault();
          $this.css({
            'transform':'translate3d('+_this.touchX+'px,0,0)',
            'webkitTransform':'translate3d('+_this.touchX+'px,0,0)'
          });
      }else {
        return;
      }
  }
  if (_this.flag && _this.isTouch && e.touches.length == 1) {  //单手
      m();
  }else if(!_this.isTouch){
      m();
  }
}

TouchEvent.prototype.touchend = function(e){
  console.log('end');
  _this.flag = false;
  _this.x = Math.abs(_this.moveX - _this.startX);
  console.log("_this.startX:"+_this.startX+"\n_this.moveX:"+_this.moveX);
  var $this = $(this);
  if (_this.x > 30 && _this.moveX < _this.startX){
    $this.css({
        'transform':'translate3d(-'+$(_this.item).width()+'px,0,0)',
        'webkitTransform':'translate3d(-'+$(_this.item).width()+'px,0,0)'
    });
  }else{
    $this.css({
        'transform':'translate3d(0,0,0)',
        'webkitTransform':'translate3d(0,0,0)'
    });
  }

  $this.css({
      'transition':'all .2s cubic-bezier(.08,.87,.08,.87)',
      'webkitTransition':'all .2s cubic-bezier(.08,.87,.08,.87)',
  })
  setTimeout(function(){
    $this.css({
        'transition':'all 0s cubic-bezier(.08,.87,.08,.87)',
        'webkitTransition':'all 0s cubic-bezier(.08,.87,.08,.87)',
    })
  },200)
}
TouchEvent.prototype.update = function(){
  console.log('update');
  $(_this.li).css({
      'transform':'translate3d(0,0,0)',
      'webkitTransform':'translate3d(0,0,0)'
  });
}

/**
    *输入框高度自适应
    *@param textarea要绑定的textarea
    *@num 克隆的textarea的随机id
*/
function textareaAutoHeight(textarea,num){
    var $textarea = $(textarea);
   $('body').append($textarea.clone().attr('id','clone_textarea'+num));
   $('#clone_textarea'+num).css({
       'position':'absolute',
       'left':'-120000px'
   });
   $textarea.on('input propertychange',function(){
       var $this = $(this);
       $('#clone_textarea'+num).val($textarea.val());
       $('#clone_textarea'+num).css({
           'width':$textarea[0].scrollWidth,
       });
       var h=$('#clone_textarea'+num)[0].scrollHeight;
           h=h>70?70:(h>30 ? h+2 : 30);
           $this.height(h);
   }) 
}


 /**
    *底部弹出层 
    *Power by smallsea
    @param flag 是否显示弹窗
    @param tt 弹窗标题
    @param ifm 弹窗页面的选择器
    @method callback 回调方法
  *============用法示例============*
  //打开的时候
  viewModal(true,'这里是弹窗标题','#modal',{
    open:function(){
      console.log('打开了弹窗');
    }
  });
  //关闭的时候
  viewModal(false,'','#modal',{
    close:function(){
      console.log('关闭了弹窗');
    }
  });
 */
function viewModal(flag,tt,ifm,callback){
  var t;
    if(flag){
      clearTimeout(t);
      if ($('#mask').length) {
          $('#mask').show();
      }else{
        $('body').append('<div id="mask"></div>');
      };
        $('[data-role="parent-page"]').hide();
        $(ifm).show(0,function(){
          $(ifm).removeClass('modal_out');
          $(ifm).addClass('modal-in');
        })
        $('.js-title').text(tt);
      if (callback && typeof(callback) === "object" && callback['open']) {
        callback['open']();
      };
    }else if(flag == false){
      $('[data-role="parent-page"]').show();
      $(ifm).removeClass('modal-in');
      $(ifm).addClass('modal_out');
      t = setTimeout(function(){
          $(ifm).hide()
      },300)
      $('#mask').hide();
      if (callback && typeof(callback) === "object" && callback['close']) {
          callback['close']();
      };
    }
}

/**
  * 滚动加载（需要注意的是，有滚动条才能滚动，如果页面禁止了默认滑动，则滚动不了）
  * @param wrap要滚动的元素
  * @param callback滚动到底的回调函数
*/
function scrollLoadData(wrap,callback){
  var wrap = $(wrap);
  var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
  var nScrollTop = 0;   //滚动到的当前位置
  var nDivHight = wrap.height();
  wrap.scroll(function(){
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    if(nScrollTop + nDivHight >= nScrollHight){
      if(callback && typeof callback === "function"){
          console.log("滚动条到底部了")
          callback();
      } 
    }else{
      // console.log('nDivHight滚动元素的高度是:'+nDivHight
      //   +'\n'+'nScrollTop滚动的距离是'+nScrollTop
      //   +'\n'+'nScrollHight滚动条的高度是'+nScrollHight);
    }
  });
}

/**
  *搜索交互
  @param el 开始点击的元素
  @param ipt 搜索输入框
  @param close_ico 清空输入框的小图标
*/
function SearchControl(el,ipt,close_ico){
    var _this = this;
    _this.el = el;
    _this.ipt = ipt; 
    _this.close_ico = close_ico;
    //显示搜索
    _this._showSearch = function(){
        $(el).hide();
    };
    //显示删除按钮
    _this._showClose = function(){
        if($(_this.ipt)[0].value.length){
            $(_this.close_ico).show(); 
        }else{
            $(_this.close_ico).hide(); 
        }
    };
    //清除输入值
    _this._clearValue = function(){
        $(_this.ipt)[0].value = '';
        $(_this.close_ico).hide();
    };
    
    $(_this.el).on('click',_this._showSearch);
    $(_this.ipt).on('input',_this._showClose);
    $(_this.close_ico).on('click',_this._clearValue);
}