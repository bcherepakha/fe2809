function Timer(rootEl, options = {}) {
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

Timer.TIMER_STOP = 'stop';
Timer.TIMER_STARTED = 'start';
Timer.TIMER_PAUSED = 'pause';

Timer.prototype.createMarkup = function () {
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

Timer.prototype.start = function () {
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

Timer.prototype.stopTimer = function () {
    if (this.intervalID !== null) {
        clearInterval(this.intervalID);
        this.intervalID = null;
    }
}

Timer.prototype.stop = function () {
    this.status = Timer.TIMER_STOP;
    this.stopTimer();
    this.render();
}

Timer.prototype.pause = function () {
    this.pauseTime = Date.now();
    this.status = Timer.TIMER_PAUSED;
    this.stopTimer();
    this.render();
}

Timer.prototype.getTimeDiff = function () {
    return this.pauseTime === null ? 0 : Date.now() - this.pauseTime;
}

Timer.prototype.getTime = function () {
    if (this.startTime === null) {
        return 0;
    }

    return Date.now() - this.startTime - this.getTimeDiff();
}

Timer.prototype.getTimeStr = function () {
    const t = Math.round(this.getTime() / 1000);
    const ss = (t % 60).toString(10).padStart(2, '0');
    const m = Math.floor(t / 60);
    const mm = (m % 60).toString(10).padStart(2, '0');;
    const h = Math.floor(m / 60);
    const hh = h.toString(10).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

Timer.prototype.render = function () {
    const timeStr = this.getTimeStr();

    this.timerEl.innerText = timeStr;
}

// new Timer(
//     document.querySelector('.timer'),
//     { buttons: ['start', 'stop']}
// );

// new Timer(
//     document.querySelector('.timer:nth-child(2)'),
//     { buttons: ['start', 'pause', 'stop']}
// );

// const timer = new Timer(
//     document.querySelector('.timer:nth-child(3)'),
//     { buttons: [] }
// );

// // timer.start();
// console.log(timer);
// timer.start();
// setTimeout(() => timer.stop(), 10000)
