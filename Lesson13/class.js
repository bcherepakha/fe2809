class Timer {
    static TIMER_STOP = 'stop';
    static TIMER_STARTED = 'start';
    static TIMER_PAUSED = 'pause';

    constructor(rootEl, options = {}) {
        this.rootEl = rootEl;
        this.options = options;

        this.startTime = null;
        this.pauseTime = null;
        this.intervalID = null;
        this.status = Timer.TIMER_STOP;

        this.rootEl.innerText = '';
        this.createMarkup();
        this.render();
    }

    createMarkup() {
        const timerEl = document.createElement('span');
        const { buttons = [] } = this.options;
        const btnCollection = buttons.map(btnName => {
            const btn = document.createElement('button');

            btn.innerText = btnName;

            switch (btnName) {
                case 'start':
                    btn.addEventListener('click', this.start.bind(this));
                    break;
                case 'stop':
                    btn.addEventListener('click', this.stop.bind(this));
                    break;
                case 'pause':
                    btn.addEventListener('click', this.pause.bind(this));
                    break;
                default:
                    console.log(btnName, 'unknown btn name');
            }

            return btn;
        });

        this.rootEl.append(timerEl, ...btnCollection);
        this.timerEl = timerEl;
    }

    start() {
        if (this.status === Timer.TIMER_STOP) {
            this.startTime = Date.now();
        } else if (this.status === Timer.TIMER_PAUSED) {
            this.startTime = Date.now() - this.getTimeDiff();
            this.pauseTime = null;
        } else {
            return ;
        }

        this.status = Timer.TIMER_STARTED;
        this.intervalID = setInterval(this.render.bind(this), 1000);
    }

    stopTimer() {
        if (this.intervalID !== null) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    stop() {
        this.status = Timer.TIMER_STOP;
        this.stopTimer();
        this.render();
    }

    pause() {
        this.pauseTime = Date.now();
        this.status = Timer.TIMER_PAUSED;
        this.stopTimer();
        this.render();
    }

    getTimeDiff() {
        return this.pauseTime === null ? 0 : Date.now() - this.pauseTime;
    }

    getTime() {
        if (this.startTime === null) {
            return 0;
        }

        return Date.now() - this.startTime - this.getTimeDiff();
    }

    getTimeStr() {
        const t = Math.round(this.getTime() / 1000);
        const ss = (t % 60).toString(10).padStart(2, '0');
        const m = Math.floor(t / 60);
        const mm = (m % 60).toString(10).padStart(2, '0');;
        const h = Math.floor(m / 60);
        const hh = h.toString(10).padStart(2, '0');

        return `${hh}:${mm}:${ss}`;
    }

    render() {
        const timeStr = this.getTimeStr();

        this.timerEl.innerText = timeStr;
    }
}

class A {
    constructor(a) {
        this.a = a;
    }

    getA() {
        return this.a;
    }

    setA(a) {
        return this.b;
    }
}

class B extends A {
    constructor(a, b) {
        super(a);

        this.b = b;
    }

    getA() {
        const a = super.getA();

        return a + 2;
    }

    getSum() {
        return this.a + this.b;
    }
}

console.dir(B);

console.log( B.prototype ); // ?
console.log( B.prototype.__proto__ === A.prototype ); //?
console.log( A.prototype.__proto__ === Object.prototype );
