var nums = Array(45)
        .fill()
        .map(function (element, index){
        return index + 1;
    });

var shuffle = [];

while(nums.length > 0){
    var number = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
    shuffle.push(number);
}

var bonus = shuffle[shuffle.length-1];
var result = shuffle.slice(0, 6).sort(function(p, c){return p - c});

var result_main = document.querySelector('#result_main');
var bonus_main = document.querySelector('.bonus_main');
function ball_paint(num, main){
    var ball = document.createElement('div');
    ball.textContent = num;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '15px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center'; 
    ball.style.marginRight = '10px';
    ball.className = 'ballId' + num;
    var bgColor = '';
    if(num <= 10){
        bgColor = 'red';
    }else if(num <= 20){
        bgColor = 'orange';
    }else if(num <= 30){
        bgColor = 'yellow';
    }else if(num <= 40){
        bgColor = 'blue';
    }else{
        bgColor = 'green';
    }
    ball.style.backgroundColor = bgColor;
    main.appendChild(ball);
}

setTimeout(function func(){
    ball_paint(result[0], result_main)    
}, 1000);
setTimeout(function func(){
    ball_paint(result[1], result_main)   
}, 2000);
setTimeout(function func(){
    ball_paint(result[2], result_main)   
}, 3000);
setTimeout(function func(){
    ball_paint(result[3], result_main)   
}, 4000);
setTimeout(function func(){
    ball_paint(result[4], result_main)   
}, 5000);
setTimeout(function func(){
    ball_paint(result[5], result_main)   
}, 6000);
setTimeout(function func(){
    ball_paint(bonus, bonus_main)
}, 7000);

console.log(bonus)