(function ($, window) {
    var ctx;
    $.fn.MPaint = function (opts) {
        var opts = $.extend({}, $.fn.MPaint.defaults, opts), begin = false;
        var _moveTo = function (e) {
                e.preventDefault();

                var x= e.offsetX||e.changedTouches[0].clientX, y=e.offsetY||e.changedTouches[0].clientY;
                begin = true;
                ctx.beginPath();
                ctx.moveTo(x,y);
                opts.drawReady({x:x,y:y});
            }
            , _drawBegin = function (e) {
                if (begin) {
                    var x= e.offsetX||e.touches[0].clientX, y=e.offsetY||e.touches[0].clientY;
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    opts.drawBegin({x:x,y:y});
                }
            }
            , _drawEnd = function (e) {
                begin = false;
                opts.drawEnd;
            };

        return this.each(function () {
            var canvas = $(this);
            if (canvas[0].getContext) {
                ctx = canvas[0].getContext('2d');
                ctx.strokeStyle = opts.BrushColor;
                ctx.lineWidth = opts.BrushWidth;
                ctx.lineJoin = opts.LineJoin;

            }
            canvas.on("mousedown", _moveTo);
            canvas.on("mousemove", _drawBegin);
            canvas.on("mouseup", _drawEnd);
            canvas[0].addEventListener("touchstart", _moveTo,false);
            canvas[0].addEventListener("touchmove", _drawBegin,false);
            canvas[0].addEventListener("touchend", _drawEnd,false);
        })

    };
    var Methods = {
        SetColor:function (color) {
            ctx.strokeStyle = color;
        },
        GetColor:function (color) {
           return ctx.strokeStyle  ;
        },
        SetWidth:function(w){
            ctx.lineWidth=w;
        },
        SaveImage:function(){
            var data =ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            window.location.href = data;
        }
    }


    $.fn.MPaint.defaults = {
        BrushColor:"#fff",
        BrushWidth:5,
        LineJoin:"round",
        //mousedown
        drawReady:function (e) {

        },
        //Mousemove
        drawBegin:function (e) {

        },
        //mouseup
        drawEnd:function (e) {

        }
    };
     $.extend($.fn.MPaint,Methods);
})(jQuery, window)