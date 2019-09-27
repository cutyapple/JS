var wid = 4;
var hei = 3;
var colors = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'white', 'white', 'pink', 'pink'];
var colorBe = colors.slice();
var color = [];
var clickFlag = true;
var clickCard = [];
var finishCard = [];
var startTime;
function shupple(){
    for(var i = 0; colorBe.length > 0; i++){
        color = color.concat(colorBe.splice(Math.floor(Math.random() * colorBe.length), 1));
    }
}
shupple();
console.log(color);

function cardSet(wid, hei){
    clickFlag = false;
    for(var i = 0; i < wid * hei; i++){
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner'
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c){
            card.addEventListener('click', function(){
                if(clickFlag && !finishCard.includes(c)){
                    c.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard.length === 2){
                        if(clickCard[0].querySelector('.card-back').style.backgroundColor === 
                           clickCard[1].querySelector('.card-back').style.backgroundColor ){
                            finishCard.push(clickCard[0]);
                            finishCard.push(clickCard[1]);
                            clickCard = [];
                            if(finishCard.length === 12){
                                var endTime = new Date();
                                alert((endTime - startTime)/1000, '초 걸렸습니다.');
                                document.querySelector('#wrapper').innerHTML = '';
                                colorBe = colors.slice();
                                color = [];
                                finishCard = [];
                                startTime = null;
                                shupple();
                                cardSet(wid, hei);
                            } 
                        } else {
                            clickFlag = false;
                            setTimeout(function(){
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }

    document.querySelectorAll('.card').forEach(function (card, index){
        setTimeout(function (){
        card.classList.add('flipped');
        }, 1000 + 100 * index);
    });

    document.querySelectorAll('.card').forEach(function (card, index){
        setTimeout(function (){
        card.classList.remove('flipped');
        clickFlag = true;
        startTime = new Date();
        }, 5000);
    });
}

cardSet(wid, hei);