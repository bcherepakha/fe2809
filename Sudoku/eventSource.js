export default class EventSource {
    constructor() {
        Object.defineProperty(this, 'events', {
            configurable: true,
            enumerable: false,
            value: {},
            writable: true
        });
    }

    addEventListener(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    removeEventListener(eventName, callback) {
        if (!this.events[eventName]) {
            return ;
        }

        this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
    }

    createEvent(data) {
        return {
            target: this,
            data
        };
    }

    dispatch(eventName, data) {
        if (!this.events[eventName]) {
            return ;
        }

        const event = this.createEvent(data);

        this.events[eventName].forEach(callback => callback(event));
    }
}
