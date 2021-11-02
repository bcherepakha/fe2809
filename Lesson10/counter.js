const counterForms = Array.from(document.querySelectorAll('.counter'));
const counters = counterForms.map(function (formEl) {
    return makeCounter(0, formEl);
});

console.log( counters );
// || (первое встреченное true, последний найденный false)
// 10  ||  ''   =>  10
// ''  ||  10   =>  10
// 10  ||  15   =>  10
// ''  ||  0    =>  0

function makeCounter(counterDefault, formEl) {
    const { increase: increaseBtn, value: valueEl, decrease: decreaseBtn } = formEl.elements;
    let counter = parseInt(valueEl.value, 10) || counterDefault;
    const result = {
        increase() {
            counter++;
        },
        decrease() {
            counter--;
        },
        getValue() {
            return counter;
        },
        setValue(newCounter) {
            counter = newCounter;
        }
    };

    increaseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        result.increase();
        valueEl.value = result.getValue();
    });

    decreaseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        result.decrease();
        valueEl.value = result.getValue();
    });

    valueEl.addEventListener('input', function (e) {
        const newValue = parseInt(valueEl.value, 10);

        if ( !isNaN(newValue) ) {
            result.setValue( newValue );
        }
    });

    valueEl.addEventListener('blur', function () {
        const newValue = parseInt(valueEl.value, 10);

        if ( !isNaN(newValue) ) {
            result.setValue( newValue );
        } else {
            valueEl.value = result.getValue();
        }
    });

    return result;
}
