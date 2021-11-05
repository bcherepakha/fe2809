// 'use strict';

// new Function();
function Something() {
    //? this = {}
    //? this.__proto__ = Something.prototype;

    this.a = 1;
    this.b = 2;

    //? return this;
}

// Something.prototype = { constructor: Something, __proto__: Function.prototype }
Something.prototype.render = function () {
    console.log(this);
}

const o = new Something();

o.render();

console.log( o );
