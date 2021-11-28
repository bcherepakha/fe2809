import EventSource from './eventSource.js';

export class Settings extends EventSource {
    constructor( difficulty ) {
        super();
        this.formEl = document.querySelector('.game__settings');
        this.complexityEl = this.formEl.complexity;

        this.setComplexityOptions( difficulty );

        this.formEl.addEventListener('submit', this.submit.bind(this));
    }

    get complexity() {
        return parseInt( this.complexityEl.value, 10 );
    }

    setComplexityOptions( difficulty ) {
        const complexity = parseInt( this.getURLParams().get('complexity'), 10 );
        const options = Object.keys(difficulty)
                .map((text, idx) => new Option(text, difficulty[text], idx === 0, complexity === difficulty[text]));

        this.complexityEl.innerText = '';
        this.complexityEl.append(...options);
    }

    setURLParams() {
        const params = this.getURLParams();

        if (this.complexityEl.value) {
            params.set('complexity', this.complexity);
        }

        history.replaceState(null, null, '?' + params.toString());
    }

    getURLParams() {
        return new URLSearchParams(location.search);
    }

    submit(e) {
        e.preventDefault();
        this.setURLParams();
        this.dispatch('submit');
    }
}
