var rival = {
    Hero : document.querySelector('#rival-hero'),
    Deck : document.querySelector('#rival-deck'),
    Field : document.querySelector('#rival-cards'),
    Cost : document.querySelector('#rival-cost'),
    DeckData : [],
    HeroData : [],
    FieldData : [],
    SelectedCard : null,
    SelectedCardData : null,
}

var my = {
    Hero : document.querySelector('#my-hero'),
    Deck : document.querySelector('#my-deck'),
    Field : document.querySelector('#my-cards'),
    Cost : document.querySelector('#my-cost'),
    DeckData : [],
    HeroData : [],
    FieldData : [],
    SelectedCard : null,
    SelectedCardData : null,
}

var cardNum = 5;
var turnBtn = document.querySelector('#turn-btn');
var turn = true;

function deckToField(Data, myTurn){
    var obj = myTurn ? my : rival;
    var curCost = Number(obj.Cost.textContent);
    if(curCost < Data.cost){
        return true;
    }
    if(Data)
    var idx = obj.DeckData.indexOf(Data);
    obj.DeckData.splice(idx, 1);
    obj.FieldData.push(Data);
    obj.Deck.innerHTML = '';
    obj.Field.innerHTML = '';
    obj.FieldData.forEach(function(data){
        cardCon(data, obj.Field);
    })
    obj.DeckData.forEach(function(data){
        cardCon(data, obj.Deck);
    })
    Data.field = true;
    obj.Cost.textContent = curCost - Data.cost; 
};

function mainSet(main){
    var obj = main ? my : rival;
    obj.Field.innerHTML = '';
    obj.Deck.innerHTML = '';
    obj.Hero.innerHTML = '';
    obj.FieldData.forEach(function(data){
        cardCon(data, obj.Field);
    })
    obj.DeckData.forEach(function(data){
        cardCon(data, obj.Deck);
    })
    cardCon(obj.HeroData, obj.Hero, true); 
}

function cardCon(Data, Dom, Hero){
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = Data.cost;
    card.querySelector('.card-att').textContent = Data.att;
    card.querySelector('.card-hp').textContent = Data.hp;
    if(Hero){
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
    card.addEventListener('click', function(){
        console.log(card, Data);
        if(turn){
            if(card.classList.contains('card-turnOver')){
                return;
            }
            console.log(Data.mine);
            if(Data.mine && my.SelectedCard){
                Data.hp = Data.hp - my.SelectedCardData.att;
                mainSet(false);
                my.SelectedCard.classList.remove('card-selected');
                my.SelectedCard.classList.add('card-turnOver');
                my.SelectedCard = null;
                my.SelectedCardData = null;
                return;
            }
            if(Data.field){
                card.parentNode.querySelectorAll('.card-selected').forEach(function(cards){
                    cards.classList.remove('card-selected');
                })
                card.classList.add('card-selected');
                my.SelectedCard = card;
                my.SelectedCardData = Data;
            } else {
                deckToField(Data, true);
            }
        } else {
            if(card.classList.contains('card-turnOver')){
                return;
            }
            if(Data.mine && rival.SelectedCard){
                Data.hp = Data.hp - rival.SelectedCardData.att;     
                mainSet(true);
                rival.SelectedCard.classList.remove('card-selected');
                rival.SelectedCard.classList.add('card-turnOver');
                rival.SelectedCard = null;
                rival.SelectedCardData = null;
                return;
            } else if(!Data.mine){
                return;
            }
            if(Data.field){
                card.parentNode.querySelectorAll('.card-selected').forEach(function(cards){
                    cards.classList.remove('card-selected');
                })
                card.classList.add('card-selected');
                rival.SelectedCard = card;
                rival.SelectedCardData = Data;
            } else {
                deckToField(Data, false);
            }
        }
    });
    console.log(Dom);
    Dom.appendChild(card);
}   
function rivalMake(num){
    for(var i = 0; i < num; i++){
        rival.DeckData.push(cardFact(false, false));
    }
    rival.Deck.innerHTML = '';
    rival.DeckData.forEach(function(data){
       cardCon(data, rival.Deck); 
    });
}
function meMake(num){
    for(var i = 0; i < num; i++){
        my.DeckData.push(cardFact(false, true));
    }
    my.Deck.innerHTML = '';
    my.DeckData.forEach(function(data){
        cardCon(data, my.Deck); 
    })
} 
function rivalHeroMake(){
    rival.HeroData = cardFact(true);
    cardCon(rival.HeroData, rival.Hero, true); 
}
function myHeroMake(){
    my.HeroData = cardFact(true, true);
    cardCon(my.HeroData, my.Hero, true); 
}
function Card(Hero, myCard){
    if(Hero){
        this.att = 2;
        this.hp = 30;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2); 
    }

    if(myCard){
        this.mine = true;
    }

    console.log(Hero, this.att, this.hp, this.cost);
}
function cardFact(Hero, myCard){
    return new Card(Hero, myCard);
}
function firstSet(){
    rivalMake(cardNum);
    meMake(cardNum);
    rivalHeroMake();
    myHeroMake();
}

turnBtn.addEventListener('click', function(){
    var turns;
    turn = !turn;
    if(turn){
        meMake(1);
        turns = 'My turn'
        my.Cost.textContent = 10;
    } else {
        rivalMake(1);
        turns = 'Enemy turn'
        rival.Cost.textContent = 10;
    }
    var obj = turn ? my : rival;
    obj.Field.innerHTML = '';
    obj.Hero.innerHTML = '';
    obj.FieldData.forEach(function(data){
        cardCon(data, obj.Field);
    })
    cardCon(obj.HeroData, obj.Hero, true); 
    document.querySelector('#rival').classList.toggle('turn');
    document.querySelector('#my').classList.toggle('turn');
    document.querySelector('#moniter').textContent = turns;
});

firstSet();