var body = document.querySelector("body");  
var table = document.createElement('table');
var result = document.createElement('div');
var rows = [];
var cols = [];
var turn = 'X';
var alls;

function check(which_row, which_col){
    alls = false;
    if(
        cols[which_row][0].textContent === turn && 
        cols[which_row][1].textContent === turn && 
        cols[which_row][2].textContent === turn
    ){
        alls = true;
    } 
    if(
        cols[0][2].textContent === turn && 
        cols[1][1].textContent === turn && 
        cols[2][0].textContent === turn
    ){
        alls = true;
    }
    if(
        cols[0][0].textContent === turn && 
        cols[1][1].textContent === turn && 
        cols[2][2].textContent === turn
    ){
        alls = true;
    }
    if(
        cols[0][which_col].textContent === turn && 
        cols[1][which_col].textContent === turn && 
        cols[2][which_col].textContent === turn
    ){
        alls = true;
    }

    if(alls){
        console.log(turn + "is victory!");
    }
    return alls;
}

function first(){
    result.textContent = turn + ' is victory!';
    turn = 'X';
    cols.forEach(function(row){
        row.forEach(function(col){
            col.textContent = '';
        });
    });
}

var func = function(event){
    var which_row = rows.indexOf(event.target.parentNode);
    var which_col = cols[which_row].indexOf(event.target);

    if(cols[which_row][which_col].textContent !== ''){
        console.log('Not Null');
    } else { 
        cols[which_row][which_col].textContent = turn;
        alls = check();
        if(alls){
            console.log(turn + "is victory!");
        } else {
            if(turn === 'X'){
                turn === 'O';
            }
            setTimeout(function(){
                console.log('CPU TURN');
                var elses = [];
                cols.forEach(function(row){
                    row.forEach(function(col){
                        elses.push(col);
                    });
                });
                elses = elses.filter(function(){ return !col.textContent })
                var selects = elses[Math.floor(Math.random() * elses.length)];
                selects.textContent = turn;
                var which_row = rows.indexOf(selects.parentNode);
                var which_col = cols[which_row].indexOf(selects);  
                alls = check(which_row, which_col);
                if(alls){
                    first();
                }
                turn = 'X';
            }, 1000);
        }
    }
};




for(var i = 1; i <= 3; i++){
    var row = document.createElement('tr');
    rows.push(row);
    cols.push([]);
    for(var j = 1; j <= 3; j++){
        var col = document.createElement('td');
        col.addEventListener('click', func);
        cols[i - 1].push(col);
        row.appendChild(col);
    }
    table.appendChild(row);
}
body.appendChild(table);
