
$(document).ready(function(){

    var resultX = 0;
    var resultY = 0;
    var padX = 0;
    var padY = 0;

    $pad = $("#joystick")
    padX = $pad.offset().left;
    padY = $pad.offset().top;

    var padCX = padX + ($pad.width() + 20) / 2;
    var padCY = padY + ($pad.height() + 20) / 2;

    $stick = $("#joystick div");

    function setStick(x, y){
        if(!x) x = padCX;
        if(!y) y = padCY
        $stick.offset({
            left : x - $stick.width() / 2 - 3,
            top : y - $stick.height() / 2 - 3
        });
        oldX = resultX;
        oldY = resultY;
        resultX = Math.round((padCX - x) * 2 * 7 / ($pad.width() - $stick.width() - 6));
        resultY = Math.round((padCY - y) * 2 * 7 / ($pad.height() - $stick.width() - 6));
        if(oldX != resultX || oldY != resultY){
            console.log(resultX + " " + resultY);
            $.post('/car/run2', {
                x : resultX,
                y : resultY
            }, function(data, status){
                console.log("post result = " + data );
            });
        }
    };
    setStick();

    var maxOffset = ($pad.width() - $stick.width()) / 2 - 3;

    function distance(x, y){
        return Math.sqrt(Math.pow(padCX - x, 2) + Math.pow(padCY - y, 2))
    };

    $stick.mousedown(function(event){
        var mouseOffsetX = event.pageX - padCX;
        var mouseOffsetY = event.pageY - padCY;

        $(document).mousemove(function(event){
            var x = event.pageX - mouseOffsetX;
            var y = event.pageY - mouseOffsetY;
            var dis = distance(x, y); 
            if(dis > maxOffset){
                var r = maxOffset / dis;
                x = (x - padCX)  * r + padCX;
                y = (y - padCY)  * r + padCY;
            }
            setStick(x, y);
        });

        $(document).mouseup(function(){
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");
            setStick();
        });
    });

    createImageLayer();

});
