/* eslint-disable no-unused-vars */
const classNames = ['firstClass', 'secondClass', 'thirdClass'];

// task 1
// Написать функцию, которая будет возвращать строку в которой будут все классы элмента через пробел
function getClassName(classNames) {
    return classNames.join(' ');
}

console.log('task1', getClassName(classNames)); // 'firstClass secondClass thirdClass'
console.log('task1', getClassName(classNames) === 'firstClass secondClass thirdClass'); // true

// task 2
// удаляет класс из строки
function removeClass(className, removedClass) {
    const classNames = className.split(' '); //? ['t', 'g', 'm']
    const filteredClassNames = classNames.filter(function (currentClass) {
        //? return true; кроме removedClass; currentClass !== removedClass
        //? return false; currentClass === removedClass
        return currentClass !== removedClass;
    }); //? ['t', 'm']

    return filteredClassNames.join(' ');
}

console.log('task2', removeClass('t g m', 'g') === 't m');
console.log('task2', removeClass('t k m', 'g') === 't k m');
console.log('task2', removeClass('t g g m', 'g') === 't m');

// task 3
// добавить класс в строку
function addClass(className, addedClass) {
    const classNames = className.split(' '); //? ['a', 'b']

    if (classNames.includes(addedClass)) {
        // addedClass в массиве есть
        return className;
    }

    // addedClass в массиве нету
    classNames.push(addedClass);

    return classNames.join(' ');
}

console.log('task3', addClass('a b', 'c') === 'a b c' );
console.log('task3', addClass('a b c', 'c') === 'a b c' );

// task 4
// добавить класс, если его нет в строке и удалить, если он там есть
function toggleClass(className, toggledClass) {
    const classNames = className.split(' ');

    if (classNames.includes(toggledClass)) {
        return classNames.filter(function (cl) {
            return cl !== toggledClass;
        }).join(' ');
    }

    classNames.push(toggledClass);

    return classNames.join(' ');
}

console.log('task 4', toggleClass('a b c', 'b') === 'a c');
console.log('task 4', toggleClass('a c', 'b') === 'a c b');

// task 5
// функция формирования классов из объекта
// Ключами обьекта, являются имена классов, значениями булевые true/false
// если стоит true, то класс добавляется к строке, если false, то не добавляется
// Object.keys, Object.values, Object.entries, for in
function cn(className, classObj) {
    let classNames = className.split(' ');

    // for (const cl in classObj) {
    //     if (classObj[cl]) {
    //         // добавить элемент если его еще нету
    //         if (!classNames.includes(cl)) {
    //             classNames.push(cl)
    //         }
    //     } else {
    //         // удалить элемент
    //         classNames = classNames.filter(function (c) {
    //             return c !== cl;
    //         });
    //     }
    // }

    Object.keys(classObj)
        .forEach(function (cl) {
            if (classObj[cl]) {
                // добавить элемент если его еще нету
                if (!classNames.includes(cl)) {
                    classNames.push(cl)
                }
            } else {
                // удалить элемент
                classNames = classNames.filter(function (c) {
                    return c !== cl;
                });
            }
        });

    return classNames.join(' ');
}

console.log('task 5', cn('a b', { c: true, d: false, e: true }) === 'a b c e');
console.log('task 5', cn('a b', { c: false, d: false, e: true, b: true }) === 'a b e');

// task 6
// сформировать массив состоящий из elementsCount элементов
// первый и второй элемент этого массива передаются
// каждый следующий элемент получается путем суммы двух предидущих
function fib(firstElement, secondElement, elementsCount = 10) {
    const result = [firstElement, secondElement];

    if (result.length <= elementsCount) {
        result.length = elementsCount;

        return result;
    }

    do {
        const lastIndex = result.length - 1;
        const prevIndex = result.length - 2;

        result.push(
            result[lastIndex] + result[prevIndex]
        );
    } while (result.length < elementsCount);

    return result;
}

console.log('task 6', fib(1, 1), fib(1, 1).join(',') === [1, 1, 2, 3, 5, 8, 13, 21, 34, 55].join(','));
console.log('task 6', fib(2, 4, 4), fib(2, 4, 4).join(',') === [2, 4, 6, 10].join(','));

// task 7
// Найти произведение элементов массива
function mult(arr) {
    // let result = arr[0];
    // let i = 1;

    // while (i < arr.length) {
    //     result = result * arr[i];
    //     i++;
    // }

    // return result;
    const initialValue = 1;
    const reducer = function (currentMult, currentEl) {
        return currentMult * currentEl;
    };

    return arr.reduce(reducer, initialValue);
}

console.log('task 7', mult([1, 2, 3, 1]), mult([1, 2, 3, 1]) === 1*2*3*1 );
console.log('task 7', mult([1, 3, 3, 5]), mult([1, 3, 3, 5]) === 1*3*3*5 );
