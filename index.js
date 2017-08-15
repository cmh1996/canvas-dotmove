var canvasWidth = document.body.clientWidth || document.documentElement.clientWidth;
var canvasHeight = document.body.clientHeight || document.documentElement.clientHeight;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var circles = [];//点的集合
var num = 55;//点的数量
var mouse_circle;


window.onload = function(){
    init(num);
}

function init(num){
    mouse_circle = new mouseCircle(0,0);//初始化鼠标圆圈

    for(let i=0;i<num;i++){
        circles.push(new Circle(Math.random()*canvasWidth,Math.random()*canvasHeight))
    }
    draw();
}

function draw(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    for(let i=0;i<circles.length;i++){
        circles[i].drawCircle(ctx);
        circles[i].move();
        for(let j=i+1;j<circles.length;j++){
            circles[i].drawLine(ctx,circles[j].x,circles[j].y);
        }
    }

    if(mouse_circle.x){
        mouse_circle.drawCircle(ctx);
        for(let k=1;k<circles.length;k++){
            mouse_circle.drawLine(ctx,circles[k].x,circles[k].y)
        }
    }


    requestAnimationFrame(draw);
}

window.onmousemove = function(e){
    e.preventDefault();
    mouse_circle.x = e.clientX;
    mouse_circle.y = e.clientY;
}
window.onmouseout = function(e){
    e.preventDefault();
    mouse_circle.x = null;
    mouse_circle.y = null;
}



class Circle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = Math.random()*10;
        this.stepX = Math.random();
        this.stepY = Math.random();
    }

    drawCircle(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        ctx.fill();
    }

    drawLine(ctx,targetX,targetY){
        let d = (this.x-targetX)*(this.x-targetX)+(this.y-targetY)*(this.y-targetY);
        let distance = Math.sqrt(d);

        if(distance<150){
            let opacity = (150/distance)*0.15;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(targetX,targetY);
            ctx.closePath();
            ctx.strokeStyle = 'rgba(204,232,207, '+opacity+')';
            ctx.stroke();
        }
    }

    move(){
        this.stepX = (this.x>0 && this.x<canvasWidth)? this.stepX:(-this.stepX);
        this.stepY = (this.y>0 && this.y<canvasHeight)? this.stepY:(-this.stepY);
        this.x += (this.stepX/2);
        this.y += (this.stepY/2);
    }
}

class mouseCircle extends Circle{
    constructor(x,y){
        super(x,y);
        this.r = 8;
    }

    drawCircle(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fillStyle = 'rgba(32,178,170,0.6)'
        ctx.fill();
    }
}