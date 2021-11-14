const callbacks = createFunctions(5); // create an array, containing 5 functions
//? LE = { result: [] }

console.log( callbacks );
console.log( callbacks[0]() ); //? must return 0 LE = { i? }
console.log( callbacks[3]() ); // must return 3

function createFunctions(length) {
    const result = [];

    // function createItem(i) {
    //     return function () {
    //         return i;
    //     }
    // }

    for (let i=0; i<length; i++) {
        //? LE = { i, f }
        // result.push( createItem(i) ); //? LE = { i, f }
        result.push(
            function () {
                return i;
            }
        )
    }

    return result;
}

const secretHolder = createSecretHolder(5); //? LE = { secret: 5, result: { getSecret: f, setSecret: f }}

console.log( secretHolder.getSecret() ) //? returns 5
secretHolder.setSecret(2);
console.log( secretHolder.getSecret() ); //? returns 2

function createSecretHolder( secret ) {
    const result = {
        getSecret() {
            return secret;
        },
        setSecret( newSecret ) {
            secret = newSecret;
        }
    };

    return result;
}
