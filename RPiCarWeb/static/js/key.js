$(document).ready(function(){
    $btnUp = $("#btn-up")
    $btnDown = $("#btn-down")
    $btnLeft = $("#btn-left")
    $btnRight = $("#btn-right")
    
    var lSpeed = 0;
    var rSpeed = 0;
    var timeStep = 200;
    var gears = 7;
    var upDown = false;
    var leftRight = false;

    var rl = 0;
    var ll = 0;

    postData = function(){
        if(rl == rSpeed && ll == lSpeed){
            return;
        }

        rl = rSpeed;
        ll = lSpeed;
        console.log("l=" + ll + " r=" + rl);
        $.post("/car/run", {
            l : ll,
            r : rl
        }, function(data, status){
            console.log("post result = " + data);
        });
    };

    setKeyEvent = function($btn, downFunc, upFunc){
        $btn.mousedown(function(){
            downFunc();
            postData();
            var step = setInterval(function(){
                downFunc();
                postData();
            }, timeStep);
            $btn.mouseup(function(){
                clearInterval(step);
                console.log('hehe');
                $btn.unbind('mouseup');
                upFunc();
                postData();
            });
        });
    };

    setKeyEvent($btnUp, function(){
        if(lSpeed < gears){
            lSpeed++;
            rSpeed++;
        }
    }, function(){
        lSpeed = 0;
        rSpeed = 0;
    });

    setKeyEvent($btnDown, function(){
        if(lSpeed > -gears){
            lSpeed--;
            rSpeed--;
        }
    }, function(){
        lSpeed = 0;
        rSpeed = 0;
    });

    setKeyEvent($btnLeft, function(){
        if(rSpeed < gears){
            rSpeed++;
        }
    }, function(){
        rSpeed = 0;
    });

    setKeyEvent($btnRight, function(){
        if(lSpeed < gears){
            lSpeed++;
        }
    }, function(){
        lSpeed = 0;
    });

    var upKey = 0;
    var downKey = 0;
    var leftKey = 0;
    var rightKey = 0;
    var iv = 0;

    calcSpeed = function(){
        var tr = 0;
        var tl = 0;
        if(upKey * downKey == 0){
            if(upKey != 0){
                tr = tl = upKey;
            } else if(downKey != 0){
                tr = tl = -downKey;
            }
        }
        if(leftKey * rightKey == 0){
            var tlk;
            var trk;
            if(tr + tl >= 0){
                tlk = leftKey;
                trk = rightKey;
            } else {
                tlk = rightKey;
                trk = leftKey;
            }
            if(tlk != 0){
                var temp = tlk;
                if(tr < gears){
                    tr += temp;
                    temp = 0;
                    if(tr > gears) {
                        temp = tr - gears;
                        tr = gears;
                    }
                }
                if(temp > 0){
                    tl -= temp;
                }
            }
            if(trk != 0){
                var temp = trk;
                if(tl < gears){
                    tl += temp;
                    temp = 0;
                    if(tl > gears) {
                        temp = tl - gears;
                        tl = gears;
                    }
                }
                if(temp > 0){
                    tr -= temp;
                }
            }
        }
        rSpeed = tr;
        lSpeed = tl;
        postData()
    };

    $(document).keydown(function(event){
        if(event.keyCode == 37){
            if(leftKey > 0) return;
            leftKey = 1;
        } else if (event.keyCode == 38){
            if(upKey > 0) return;
            upKey = 1;
        } else if (event.keyCode == 39){
            if(rightKey > 0) return;
            rightKey = 1;
        } else if (event.keyCode == 40){
            if(downKey > 0) return;
            downKey = 1;
        }
        if(iv == 0){
            iv = setInterval(function(){
                if(upKey != 0 && upKey < gears){
                    upKey++;
                }
                if(downKey != 0 && downKey < gears){
                    downKey++;
                }
                if(leftKey != 0 && leftKey < gears){
                    leftKey++;
                }
                if(rightKey != 0 && rightKey < gears){
                    rightKey++;
                }
                calcSpeed();
            }, timeStep);
        }
        calcSpeed();
    });
    $(document).keyup(function(event){
        if(event.keyCode == 37){
            leftKey = 0;
        } else if (event.keyCode == 38){
            upKey = 0;
        } else if (event.keyCode == 39){
            rightKey = 0;
        } else if (event.keyCode == 40){
            downKey = 0;
        }
        if(iv != 0 && leftKey == 0 && upKey == 0 && rightKey == 0 && downKey == 0){
            clearInterval(iv);
            iv = 0;
        }
        calcSpeed();
    });
    createImageLayer();
});
