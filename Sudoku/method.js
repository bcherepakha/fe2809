const pseudoArr = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6 };

const newArr = Array.prototype.map.call( pseudoArr, v => v*2 );

console.log( newArr );

function map( callback, thisArg ) {
    const result = [];

    for (let i=0; i < this.length; i++) {
        result.push( callback.call(thisArg, this[i], i, this) );
    }

    return result;
}
