// init
doSomething({a: 1, b: 2, c: 3});

const o = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5
};

const { a, b = 99, k: kEl = 18, ...r } = o;

console.log({ a, b }); //? {a: 1, b: 2}
console.log( kEl ); //? 18
console.log( r ); //? { c: 3, d: 4, e: 5}

const { ...copy } = o;

console.log( copy ); //? { a: 1, b: 2, c: 3, d: 4, e: 5 }
console.log( {...o} );

const arr = [1, 2, 3, 4, 5, 6];
const [firstEl, second = 8, , fourth, ...rest] = arr;

console.log(firstEl, second, fourth, rest); //? 1, 2
console.log( [...arr] );
console.log( {...arr} );

// function declaration
function doSomething({a, b = 33, c} = {a: 2}) {
    console.log({ a, b, c });
    console.log(arguments);
}

function doSomeMore(...arg) {
    console.log(arg);
}

doSomeMore(1, 2, 3, 4, 5, 6);

doSomething({a: 1, b: 2, c: 3});
doSomething({a: 1, c: 3, b: 2});
doSomething();

// function expression
const sum = (a, b = 13, ...arg) => {
    console.log(arg);

    return a + b;
}

console.log( sum(1, 2, 3, 4, 5, 6) ); //? 3
