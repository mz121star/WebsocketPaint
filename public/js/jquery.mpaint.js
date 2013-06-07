(function ($, window) {
var ctx;
    $.fn.MPaint = function (opts) {
        var opts = $.extend({}, $.fn.MPaint.defaults, opts), begin = false;
        var _moveTo = function (e) {
                begin = true;
                ctx.beginPath();
                ctx.moveTo(e.offsetX, e.offsetY);
                opts.drawReady(e);
            }
            ,_drawBegin = function (e) {
                if (begin) {
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                    opts.drawBegin(e);
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

        })

    };
    $.fn.MPaint.SetColor=function(color){
        ctx.strokeStyle = color;
        console.log("change:"+color);
    };
    $.fn.MPaint.defaults = {
        BrushColor: "#fff",
        BrushWidth: 5,
        LineJoin: "round",
        //mousedown
        drawReady: function (e) {

        },
        //Mousemove
        drawBegin: function (e) {

        },
        //mouseup
        drawEnd: function (e) {

        }
    }
})(jQuery, window)