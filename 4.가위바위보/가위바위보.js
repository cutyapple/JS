var computer = 0;
var dictionary = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px'
}

function computers(computer){
    return Object.entries(dictionary).find(function(v){
        return v[1] === computer;
    })[0];  
}

var interval;
function interMake(){
    interval = setInterval(function() {
        if(computer === dictionary.rock){
         computer = dictionary.scissors;
        } else if( computer === dictionary.scissors){
         computer = dictionary.paper;
        } else {
         computer = dictionary.rock;
        }
        document.querySelector('#computer').style.background = 
         'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + computer + ' 0';
     }, 100);
}

interval = interMake();

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        clearInterval(interval);
        setTimeout(function(){
            interMake();
        }, 1000);
        var mine = this.textContent;
        if(mine === '가위'){
            if(computers(computer) === 'scissors'){
                console.log('Same');
            } else if(computers(computer) === 'rock'){
                console.log('Lose');
            } else {
                console.log('Win');
            }
        } else if(mine === '바위'){
            if(computers(computer) === 'rock'){
                console.log('Same');
            } else if(computers(computer) === 'paper'){
                console.log('Lose');
            } else {
                console.log('Win');
            }
        } else if(mine === '보'){
            if(computers(computer) === 'paper'){
                console.log('Same');
            } else if(computers(computer) === 'scissors'){
                console.log('Lose');
            } else {
                console.log('Win');
            }
        }
    })
})