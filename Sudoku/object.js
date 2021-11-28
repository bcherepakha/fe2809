const a = {
    get value() {
        return this._value;
    },
    set value(newValue) {
        this._value = newValue;
    }
}

// const valueDescriptor = {
//     configurable: true,
//     enumerable: true,

//     // value: 8,
//     // writable: false,

//     get: function () {
//         return this._value;
//     },
//     set: function (newValue) {
//         this._value = newValue;
//     }
// };

// Object.defineProperty(a, 'value', valueDescriptor);

a.value = 12;

for (const key in a) {
    console.log({ key, value: a[key] });
}

console.log( Object.keys( a ) );
