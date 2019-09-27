const body = document.querySelector("body");
const result = document.createElement('h1');
const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = 'number';
body.append(form);
form.append(input);
button.textContent = '입력';
form.append(button);

form.addEventListener('submit', function func(event){
    event.preventDefault();
    var answer = input.value;
    if(answer === numbers.join('')){
        result.textContent = '홈런';
        input.value = '';
        for(let i = 0; i < 4; i++){
            var out = nums.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            numbers.push(out);
        }
    } else {
        var results = answer.split('');
        var strike = 0;
        var ball = 0;
        for(var i = 0; i < 3; i += 1){
            if(results[i] == numbers[i]){
                strike++;
            } else if(numbers.indexOf(results[i])){
                ball++;
            }
        }
        result.textContent = strike + '스트라이크 | ' + ball + '볼';

    }
})

let nums = [1,2,3,4,5,6,7,8,9];
let numbers = [];

for(let i = 0; i < 4; i++){
    var out = nums.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    numbers.push(out);
}

console.log(numbers);