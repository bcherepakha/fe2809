function show() {
    console.log( this, arguments );
}

show(); //? this = Window | undefined

const a = {
    name: 'a',
    show
};

a.show(); //? this = a

setTimeout( a.show, 1000 ); //? this = Window | undefined

function doSomething( action ) {
    //? LE = { action = a.show }
    action();
}

doSomething( a.show ); //? this = Window | undefined

show.call(a); //? this = a
show.apply({ name: 'b' }); //? this = a

const bindedShow = a.show.bind({ name: 'c' }, 1, 2, 3);

bindedShow(4);
a.bindedShow = bindedShow;

a.bindedShow(4, 5);
bindedShow.call({ name: 'd' }, 4, 5, 6); //? this = ?


function sum(a, b, c) {
    // this = ?
    console.log(this);

    return a + b + c;
}

const doubleSum = sum.bind(null, 8);
const oneSum = doubleSum.bind('hello world', 2);

doubleSum(2, 5); // ? 15 this = null
oneSum(10); // ? 20 this = null

const b = {
    hello() {
        console.log('hello');
    },
    goodby: function() {
        console.log('goodby');
    }
}

const animal = {
    name: 'animal',
    run() {
        // [HOME_OBJECT]: animal
        console.log(this.name, 'run');
    }
}

const mammal = {
    name: 'mammal',
    run() {
        const value = super.run();
        console.log(this.name, 'mammal');
    },
    eat: function() { console.log('eat'); },
    __proto__: animal
}

const rabbit = {
    name: 'rabbit',
    jump: function() { console.log('jump'); },
    run() {
        const value = super.run();
        console.log(this.name, 'jump');
    },
    __proto__: mammal
}

rabbit.run();
