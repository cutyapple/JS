var main = document.querySelector('#screen');
var startTime;
var endTime;
var record = [];
var timeOut;

main.addEventListener('click', function(){
    if(main.classList.contains('waiting')){
        main.classList.add('ready');
        main.classList.remove('waiting');
        main.textContent = 'Click when it turns green.'
        timeOut = setTimeout(function(){
            startTime = setTimeout(function(){
                startTime = new Date();
                main.click();
            }, Math.floor(Math.random() * 1000) + 2000);
        })
    } else if(main.classList.contains('ready')){
        if(!startTime){
            clearTimeout(timeOut);
            main.classList.add('waiting');
            main.classList.remove('ready');
            main.textContent = 'Too early!';
        } else {
            main.classList.add('now');
            main.classList.remove('ready');
            main.textContent = 'Click!';  
        }
    } else if(main.classList.contains('now')){
        endTime = new Date();
        var time = endTime - startTime;
        console.log(time);
        record.push(time);
        main.classList.add('waiting');
        main.classList.remove('now');
        main.textContent = 'Click to Start.';
        startTime = null;
        endTime = null;
    }
});