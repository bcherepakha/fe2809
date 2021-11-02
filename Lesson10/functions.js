//? var, function Declaration
//? global = { a: undefined, makeCounter: f }
//? Lexical Environment = { a: 5, b: 200, counter1: f, counter2: f }

let a = 100;
let b = 200;

const counter1 = makeCounter(); //? LE1 = { a: 4, unnamedFunction: f }
const counter2 = makeCounter(); //? LE2 = { a: 4, unnamedFunction: f }

console.log('1', counter1() ); //? 1 LE3 = {  }
console.log('1', counter1() ); //? 2 LE4 = {  }
console.log('1', counter1() ); //? 3
console.log('1', counter1() ); //? 4

console.log('2', counter2() ); //? 1 LE5 = {  }
console.log('2', counter2() ); //? 2
console.log('2', counter2() ); //? 3
console.log('2', counter2() ); //? 4

console.log('1', counter1() ); //? 5

//? hoisting
function makeCounter() {
    let a = 0;

    // function expression
    return function () {
        return ++a;
    }
}

console.log( 'a', a );
console.log( window );
