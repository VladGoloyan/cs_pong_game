canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
backImage = new Image();
backImage.src= "background.jpg";

Intersect = function(x1, y1, w1, h1, x2, y2, w2, h2) {
	return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && h1 + y1 > y2;
};
  
rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};
createBall = function(canvasWidth, canvasHeight){
	a ={
		x: rand(canvasWidth - 60),
		y: rand(canvasHeight - 60),
		width: 30,
		height:	30,
		xDelta: 5,
		yDelta: 5,
		color: "white"
	};
	return a;
};
ball = createBall(canvas.width,canvas.height);
red = {
	x: 50,
  	y:10,
  	width:20,
  	height:80,
  	score: 0,
  	color:"red"
};
purple = {
  	x: 1150,
  	y: 10,
  	width:20,
  	height:80,
  	score: 0,
  	color:"purple"
};
drawEvery = function(a,i){
    if(i === 1){
	    return "";
	}
	context.drawImage(backImage, 0, 0, canvas.width, canvas.height);
	context.fillStyle = a.color;
	context.fillRect(a.x,a.y, a.width,a.height);
	context.fillStyle = red.color;
	context.fillRect(red.x,red.y,red.width,red.height);
	context.fillStyle = purple.color;
	context.fillRect(purple.x,purple.y,purple.width,purple.height);
	context.fillStyle = a.color;
	context.font = "40px Arial";
	context.fillText(Math.floor(red.score), 300,50);
    context.fillText(Math.floor(purple.score), 900,50);
	drawEvery(a,i+1);
};
checkAll = function(a, i){
	if(i === 1){
	    return "";
	}
	if(a.x >= canvas.width-a.width){
		a.x=purple.x-a.width;
		a.y=purple.y;
		red.score+=1;
		a.xDelta = -a.xDelta;
	}
	else if(a.x<=0){
		a.x=red.x+red.width;
		a.y=red.y;
		purple.score+=1;
		a.xDelta = -a.xDelta;
	}
	if(a.y >= canvas.height-a.height){
		a.yDelta = -a.yDelta;
	}
	else if(a.y<=0){
		a.yDelta = -a.yDelta;
	}
	a.x = a.x + a.xDelta;
	a.y = a.y + a.yDelta;
	checkAll(a,i+1);  
};
draw = function(){  
	context.clearRect(0,0,canvas.width,canvas.height);
	drawEvery(ball,0);
};
updateData = function(){
	checkAll(ball,0);
  	if(Intersect(red.x,red.y,red.width,red.height,ball.x,ball.y,ball.width,ball.height)){
  		ball.xDelta = - ball.xDelta;
  	}
  	else if(Intersect(purple.x,purple.y,purple.width,purple.height,ball.x,ball.y,ball.width,ball.height)){
  		ball.xDelta = - ball.xDelta;
  	}	
};
loop = function(){
    draw();
    updateData();
    window.requestAnimationFrame(loop);
};
upKey = 38;
downKey = 40;
w = 87;
s = 83;
document.addEventListener('keydown', function(event) { 
    if(event.keyCode === w) {
    	if(red.y >= 0 && red.y <= canvas.height - red.height) {
       		red.y = red.y - 30;
    	}		
    	else if(red.y < 3){
    		red.y=3;
    	}
    }
    else if(event.keyCode === s){
    	if(red.y >= 0 && red.y <= canvas.height - red.height) {
        	red.y = red.y +  30;     
        }
        else if(red.y >= canvas.height - red.height){
      		red.y = canvas.height - red.height;
        }
    }
    }, false);

    document.addEventListener('keydown', function(event) {
    if(event.keyCode === upKey){
   		if(purple.y>= 0 ) {
        	purple.y= purple.y - 30;
      	}
      	else if(purple.y<3){purple.y=3;}
    }	
    else if(event.keyCode === downKey){
    	if(purple.y>= 0 && purple.y<= canvas.height-purple.height) {
        	purple.y= purple.y +  30;     
    	}
    }
}, false);
loop();