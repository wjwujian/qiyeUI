/**
    * 移动端签名功能
    @author smallsea
    @param canvas 画布
    @param canvas 画布外层盒子
    @param save 保存按钮
    @param reset 重签按钮
*/
function Signature(canvas,canvasWrap,save,reset){
    var _this = this;
    _this._canvas = $$(canvas);
    _this.canvasWrap = $$(canvasWrap);
    _this.save = $$(save);
    _this.reset = $$(reset);
    _this.ctx = _this._canvas.getContext('2d');
    _this._offsetLeft = _this.canvasWrap.offsetLeft;
    _this._offsetTop = _this.canvasWrap.offsetTop;
    _this.flag = false;
    _this.isTouch = 'ontouchstart' in window;
    _this.CreatImg;
    //移动端和PC端
    if(_this.isTouch){ 
        _this.down = 'touchstart';
       _this.move = 'touchmove';
       _this.up = 'touchend';
    }else{
        _this.down = 'mousedown';
        _this.move = 'mousemove';
        _this.up = 'mouseup';
    }
    //简化获取id操作
    function $$(id){
        return document.getElementById(id)
    }
     //判断是否存在iframe
    function isIframe(){
        return top.location != self.location
    }
    (_this.canvasStyle  = function (){
        //画布初始化
        with(_this._canvas.style){
            background = 'url(images/icon/shouxie.png) no-repeat center';
            backgroundSize = 'auto 60px';
        }
        _this._canvas.width = document.body.clientWidth;
        _this._canvas.height = _this._canvas.width * (3/5);
        if(isIframe()){  
            _this._canvas.width = parent.document.getElementById('visible_pop_up').clientWidth || parent.document.body.clientWidth;
            _this._canvas.height = _this._canvas.width * (3/5);
            //iframe高
            parent.document.querySelector('.canvas_iframe').setAttribute("height",_this._canvas.height+2);
        }  

        //创建存储签名的图片
        _this.CreatImg = new Image();
        _this.CreatImg.id = 'creat_img';
        _this.CreatImg.setAttribute('hidden','hidden');
        if (isIframe()) {
            parent.document.getElementsByTagName('body')[0].appendChild(_this.CreatImg);
        }else{
            document.getElementsByTagName('body')[0].appendChild(_this.CreatImg);
        };
    })()
    //签名开始
    _this._canvas.addEventListener(_this.down,
        function(evt) {
            _this.flag = true;
            _this._canvas.style.background = 'transparent';
            evt.preventDefault();
            (_this.isTouch) ? touchEvent = evt.touches[0] :  touchEvent = evt; //事件源
            _this.ctx.beginPath();
            _this.ctx.moveTo(touchEvent.pageX - _this._offsetLeft, touchEvent.pageY - _this._offsetTop);
        },
    false);
    //签名移动
    _this.moveFn = function(evt) {
        if (_this.flag) {
            (_this.isTouch) ? touchEvent = evt.touches[0] :  touchEvent = evt; //事件源
            _this.ctx.lineTo(touchEvent.pageX - _this._offsetLeft, touchEvent.pageY - _this._offsetTop);
            _this.ctx.stroke();
        };
    };
    _this._canvas.addEventListener(_this.move,_this.moveFn,false);
    //签名结束
    _this._canvas.addEventListener(_this.up,
        function(evt) {
            _this.flag = false;
        },
    false);

    //保存绘制的图片
    _this.save.addEventListener('click',function(){
        var imgDataURL = _this._canvas.toDataURL("image/png");
            _this.CreatImg.src = imgDataURL; 
            // _this.hideEl(imgDataURL);
    },false)

    //清除canvas内容
    _this.clearRect = function (){
        _this._canvas.style.background = 'url(images/icon/shouxie.png) no-repeat center';
        _this.ctx.clearRect(0,0,_this._canvas.clientWidth,_this._canvas.clientHeight);
    }
    _this.reset.addEventListener('click',function(){
        _this.clearRect();
    },false)

    //隐藏弹窗
    _this.hideEl = function(imgDataURL){
        if (isIframe()) {
            parent.document.getElementById('mask').style.display = 'none';
            parent.document.getElementById('canvas_pop_up').style.display = 'none';
            var data_id = _this._canvas.getAttribute('data-id');
            parent.document.querySelector('#'+data_id).parentNode.classList.add('active');
            parent.document.querySelector('#'+data_id).setAttribute('data-src',imgDataURL)
        }
    }

}
