/* eslint-disable no-unused-vars */
// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
// 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home (for)
// 4. В первых трех задачах добавить пользователю возможность ввести значения переменных. => in home
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

function consoleNumbers(n) {
    for (let i=1; i <= n; i++) {
        console.log(i);
    }
}

// consoleNumbers(16);

function isSimple( n ) {
    for (let d = 2; d < n; d++) {
        if ( n % d === 0) {
            return false;
        }
    }

    return true;
}

// console.log( isSimple(13) );

function consoleSimpleNumbers( n ) {
    // 1 ... n
    let i = 1;

    while (i <= n) {

        if ( isSimple(i) ) {
            console.log(i);
        }

        i++;
    }

}

// consoleSimpleNumbers( 123 );

function consoleNumbersDividedByK( n, k ) {
    // TODO: in home
}

consoleNumbersDividedByK( 10, 3 ); // 3, 6, 9

function getNextSimpleNumber(n) {
    let m = n + 1;

    while (!isSimple(m)) {
        m++
    }

    return m;
}

console.log( getNextSimpleNumber(13) );
