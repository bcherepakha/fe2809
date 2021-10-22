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
