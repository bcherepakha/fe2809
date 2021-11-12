const places = document.querySelectorAll('.timer');
const timers = Array.prototype.map.call(
    places,
    place => new Timer(place)
);

console.log( places );
console.log( timers );

function fib(num) {
    if (num < 1) {
        return 0;
    }

    if (num === 1) {
        return 1;
    }

    if (num === 2) {
        return 2;
    }

    return fib(num - 1) + fib(num - 2);
}

function withCashe(f) {
    let cash = {};
    const newFunc = function () {
        const resultKey = Array.prototype.join.call(arguments, ', ');

        if ( cash[resultKey] ) {
            return cash[resultKey];
        }

        const result = f.apply(this, arguments);

        cash[resultKey] = result;

        return result;
    }

    newFunc.reset = function () {
        cash = {};
    }

    return newFunc;
}

fib = withCashe(fib);

function spyDecorator(f) {
    let calls = 0;
    const newFunc = function () {
        calls++;
        return f.apply(this, arguments);
    };

    newFunc.getCalls = function (witReset) {
        const result = calls;

        if (witReset) {
            newFunc.resetCalls();
        }

        return result;
    }

    newFunc.resetCalls = function () {
        calls = 0;
    }

    return newFunc;
}

fib = spyDecorator(fib);

console.log( 1, fib(1), fib.getCalls(true) );
console.log( 2, fib(2), fib.getCalls(true) );
console.log( 3, fib(3), fib.getCalls(true) );
console.log( 4, fib(4), fib.getCalls(true) );
console.log( 5, fib(5), fib.getCalls(true) );
console.log( 6, fib(6), fib.getCalls(true) );
console.log( 7, fib(7), fib.getCalls(true) );
console.log( 40, fib(40), fib.getCalls(true) );
