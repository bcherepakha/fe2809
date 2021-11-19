const p = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(88), 2000);
    setTimeout(() => reject(99), 1000);
})
    .then(
        function (value) {
            console.log('resolve', value);
        }
    )
    .catch(
        function (error) {
            console.log('reject', error);
        }
    )
    .finally(
        function () {
            console.log('finally');
        }
    );

console.log( p );

const circleEl = document.querySelector('.circle');

function move(el, dx, dy) {
    return new Promise(function (resolve) {
        const { x = 0, y = 0 } = el;

        el.x = x + dx;
        el.y = y +dy;

        el.style.transform = `translate(${el.x}px, ${el.y}px)`;
        el.addEventListener('transitionend', resolve, { once: true });
    });
}

move(circleEl, 200, 0)
    .then(() => move(circleEl, 0, 200))
    .then(() => move(circleEl, -200, 0))
    .then(() => move(circleEl, 0, -200));
