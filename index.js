const display = document.getElementById('display');

function appendInput(input){
    if(input === '.' && display.value.split(/[\+\-\*\/]/).pop().includes('.')){
        return;
    }
    display.value += input;
}

function clearBtn() {
   display.value = '';
}


function operate(){
    try {
        if (!display.value){         
            display.value = "0";
            return;
        }

    let tokens = display.value.match(/\d+\.?\d*|[\+\-\*\/]/g);

    if (!tokens) {
        display.value = "Error";
        return;
    }

    let numbers = [];
    let operators = [];

    for (let token of tokens){
        if(/\d+\.?\d*/.test(token)){
            numbers.push(parseFloat(token));
        } 
        else {
            operators.push(token);
        }
    }

    for(let i = 0; i < operators.length; i++ ){
        if(operators[i] === '*' || operators[i] === '/'){
            let num1 = numbers[i];
            let num2 = numbers[i+1];
            let result = operators[i] === '*' ? num1 * num2 : num1 / num2;
        
        numbers.splice(i, 2, result);
        operators.splice(i,1);
        i--;
        }
    }

    let finalResult = numbers[0];
    for(let i = 0; i < operators.length; i++){
        if(operators[i] === '+'){
            finalResult += numbers[i + 1];
        }
        else if(operators[i] === '-'){
            finalResult -= numbers[i + 1];
        }
    }

    display.value = finalResult;
} 
catch (error) {
    display.value = 'Error';
    }
}
