var tbody = document.querySelector('#table tbody');
var dataSet = [];
var stop = false;
var open = 0;
document.querySelector('#exec').addEventListener('click', function(){
    tbody.innerHTML = '';
    document.querySelector('#result').textContent = '';
    dataSet = [];
    open = 0;
    stop = false;
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);

    var numList = Array(hor * ver)
        .fill()
        .map(function (element, index){
            return index + 1;   
        });
    
    var shuffle = [];
    while(numList.length > hor * ver - mine){
        var number = numList.splice(Math.floor(Math.random() * numList.length), 1)[0];
        shuffle.push(number);
    }

    var dataSet = [];
    
    for(var i = 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement('tr');
        dataSet.push(arr);
        for(var j = 0; j < hor; j++){
            arr.push(0);    
            var td = document.createElement('td');
            td.addEventListener('contextmenu', function(e){
                if(stop){
                    return;
                }
                e.preventDefault();
                var parTr = e.currentTarget.parentNode;
                var parTbody = e.currentTarget.parentNode.parentNode;
                var room = Array.prototype.indexOf.call(parTr.children, e.currentTarget);
                var string = Array.prototype.indexOf.call(parTbody.children, parTr);
                if(dataSet[string][room] === -1){
                    return;
                }
                else if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                } else if (e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?'
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                } else if (e.currentTarget.textContent === '?'){
                    e.currentTarget.classList.remove('question');
                    if(dataSet[string][room] === 0){
                        e.currentTarget.textContent = '';
                    } else if (dataSet[string][room] === 'X'){
                        e.currentTarget.textContent = 'X';
                    }
                }
            });
            td.addEventListener('click', function(e){
                if(stop){
                    return;
                }
                var parTr = e.currentTarget.parentNode;
                var parTbody = e.currentTarget.parentNode.parentNode;
                var room = Array.prototype.indexOf.call(parTr.children, e.currentTarget);
                var string = Array.prototype.indexOf.call(parTbody.children, parTr);
                if(dataSet[string][room] === 1 || dataSet[string][room] === -1){
                    return;
                }
                e.currentTarget.classList.add('opened');
                open++;
                if(dataSet[string][room] === 'X'){
                    e.currentTarget.textContent = '펑!';
                    document.querySelector('#result').textContent = 'Lose';
                    stop = true;
                } else {
                    var near = [];
                    dataSet[string][room] = -1; 
                    if(dataSet[string-1]){
                        near = near.concat([dataSet[string-1][room-1], dataSet[string-1][room], dataSet[string-1][room+1]]);
                    }
                    if(dataSet[string]){
                        near = near.concat([dataSet[string][room-1], dataSet[string][room+1]]);
                    }
                    if(dataSet[string+1]){
                        near = near.concat([dataSet[string+1][room-1], dataSet[string+1][room], dataSet[string+1][room+1]]);
                    }
                    var nearDmz = near.filter(function(v){
                        return v === 'X';
                    }).length;
                    e.currentTarget.textContent = nearDmz || '';
                    if(nearDmz === 0){
                        var nearRoom = [];
                        if(tbody.children[string-1]){
                            nearRoom = nearRoom.concat([
                                tbody.children[string - 1].children[room - 1],
                                tbody.children[string - 1].children[room],
                                tbody.children[string - 1].children[room + 1]
                            ]);
                        }
                        nearRoom = nearRoom.concat([
                            tbody.children[string].children[room - 1],
                            tbody.children[string].children[room + 1]
                        ])
                        if(tbody.children[string+1]){
                            nearRoom = nearRoom.concat([
                                tbody.children[string + 1].children[room - 1],
                                tbody.children[string + 1].children[room],
                                tbody.children[string + 1].children[room + 1]
                            ])
                        }
                        nearRoom.filter(function(v){
                                return !!v;
                            }).forEach(function(nextRoom){
                            var parTr = nextRoom.parentNode;
                            var parTbody = nextRoom.parentNode.parentNode;
                            var nNearRoom = Array.prototype.indexOf.call(parTr.children, nextRoom);
                            var nNearString = Array.prototype.indexOf.call(parTbody.children, parTr);
                            if(dataSet[nNearString][nNearRoom] !== -1){
                                nextRoom.click();
                            }
                        })
                    }
                }
                if(open === hor * ver - mine){
                    stop = true;
                    document.querySelector('#result').textContent = "Win";
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    for(var k = 0; k < shuffle.length; k++){
        var dmzH = Math.floor(shuffle[k] / hor);
        var dmzV = shuffle[k] % ver ;
        tbody.children[dmzH].children[dmzV].textContent = 'X';
        dataSet[dmzH][dmzV] = 'X';
    }
});

function finder(){

}