/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Maksym: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Andrey: getRandomBall(15, 80)
};

function getRandomBall(min = 0, max = 100) {
    return Math.round( min + Math.random() * (max - min) );
}

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл.
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему.
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга.
 7. Перечислим всех учащихся в порядке убывания баллов.
*/

function getLeaderName( grade ) {
    let leaderName = '';

    for (const currentName in grade) {
        if ( grade[currentName] > grade[leaderName]
            || leaderName === '' ) {
            leaderName = currentName;
        }
    }

    return leaderName;
}

console.log(
    'имя учащегося с максимальным количеством баллов',
    getLeaderName( grade )
); // Maksym || Anton || Vladyslav || Oleksii

function getMaxBall( grade ) {
    let maxBall = -Infinity;

    for (const currentName in grade) {
        if ( grade[currentName] > maxBall ) {
            maxBall = grade[currentName];
        }
    }

    return maxBall;
}

console.log( 'максимальный балл', getMaxBall( grade ) );

function getAvearageBall( grade ) {
    let sum = 0;
    let count = 0;

    for (const name in grade) {
        count++;
        sum += grade[name];
    }

    return sum / count;
}

console.log( 'средний балл', getAvearageBall( grade ));

function getAverageUserName( grade ) {
    let name = '';
    let diff = Infinity;
    const averageBall = getAvearageBall( grade );

    for (const currentName in grade) {
        const currentDiff = Math.abs(grade[currentName] - averageBall);

        if (name === '' || currentDiff < diff) {
            name = currentName;
            diff = currentDiff;
        }
    }

    return name;
}

console.log(
    'учащегося с баллом ближайшим к среднему',
    getAverageUserName(grade)
);

function getLatest( grade ) {
    const averageBall = getAvearageBall( grade );
    // const result = {};
    let result = '';

    for (const currentName in grade) {
        if (grade[currentName] < averageBall) {
            // result[currentName] = grade[currentName];
            if (result.length > 0) {
                result += ', ';
            }

            result += currentName;
        }
    }

    // if (result.length > 0) {
    //     result = result.slice(0, result.length - 2);
    // }

    return result;
}

console.log( 'учащихся с баллом ниже среднего', getLatest( grade ));

function copyObject( obj ) {
    const result = {};

    for (const key in obj) {
        result[key] = obj[key];
    }

    return result;
}

function getLeaders( grade ) {
    let result = [];
    // const currentGrade = copyObject( grade );
    const currentGrade =  { ...grade };

    for (let place = 1; place <= 3 ; place++) {
        const leaderName = getLeaderName( currentGrade );

        delete currentGrade[leaderName];

        result.push(leaderName);
    }

    return result;
}

console.log( 'учащихся занявших первые три места', getLeaders( grade ));

function getObjLength( obj ) {
    let result = 0;

    for (const key in obj) {
        result++;
    }

    return result;
}

function getOrder( grade ) {
    const order = [];
    const peopleCount = getObjLength( grade );
    const currentGrade =  { ...grade };

    for (let place = 1; place <= peopleCount; place++) {
        const leaderName = getLeaderName( currentGrade );

        order.push(leaderName);

        delete currentGrade[leaderName];

        // console.log({
        //     currentGrade,
        //     leaderName,
        //     order,
        //     place
        // });
    }

    return order;
}

console.log( 'учащихся в порядке убывания баллов', getOrder( grade ));

function getObjectKeys( obj ) {
    const result = [];

    for (const key in obj) {
        result.push(key);
    }

    return result;
}

function getOrder1(grade) {
    const peoples = Object.keys( grade );

    for (let i=1; i<peoples.length; ) {
        if (i === 0) {
            i++;
        }

        const currentPeople = peoples[i];
        const previousPeople = peoples[i-1];

        if (grade[currentPeople] > grade[previousPeople]) {
            peoples[i-1] = currentPeople;
            peoples[i] = previousPeople;
            i--;
        } else {
            i++;
        }
    }

    return peoples;
}

function getOrder2(grade) {
    const peoples = Object.keys(grade);

    peoples.sort(
        function (name1, name2) {
            return grade[name2] - grade[name1];
        }
    );

    return peoples;
}

console.log( 'учащихся в порядке убывания баллов', getOrder2( grade ));
console.log( 'проверочный', getOrder( grade ));
