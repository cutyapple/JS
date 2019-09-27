var body = document.querySelector("body");  
var table = document.createElement('table');
var rows = [];
var cols = [];
var turn = 'X';

var func = function(event){
    var which_row = rows.indexOf(event.target.parentNode);
    var which_col = cols[which_row].indexOf(event.target);

    if(cols[which_row][which_col].textContent !== ''){
        console.log('Not Null');
    } else {
        
        if(turn === 'X'){
            turn = 'O';
        } else {
            turn = 'X';
        }
        cols[which_row][which_col].textContent = turn;
        var victory = false;

        if(
            cols[which_row][0].textContent === turn && 
            cols[which_row][1].textContent === turn && 
            cols[which_row][2].textContent === turn
        ){
            victory = true;
        } 
        if(
            cols[0][2].textContent === turn && 
            cols[1][1].textContent === turn && 
            cols[2][0].textContent === turn
        ){
            victory = true;
        }
        if(
            cols[0][0].textContent === turn && 
            cols[1][1].textContent === turn && 
            cols[2][2].textContent === turn
        ){
            victory = true;
        }
        if(
            cols[0][which_col].textContent === turn && 
            cols[1][which_col].textContent === turn && 
            cols[2][which_col].textContent === turn
        ){
            victory = true;
        }

        if(victory){
            console.log(turn + "is victory!");
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

console.log(cols);