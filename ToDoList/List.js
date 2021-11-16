export class List {
    constructor() {
        this.items = [];
        this.rootEl = document.querySelector('.todo-list');
    }

    addItem(item) {
        this.items.push(item);
        this.rootEl.append( item.render() );
    }

    addItems( items ) {
        this.items.push( ...items );
        // this.rootEl.append( ...items.map(t => t.render()));
        this.render();
    }

    render() {
        this.rootEl.innerText = '';
        this.rootEl.append( ...this.items.map(t => t.render()) );
    }
}
