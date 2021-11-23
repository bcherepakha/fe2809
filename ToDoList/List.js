export class List {
    constructor( isItemShown ) {
        this.isItemShown = isItemShown;
        this.items = [];
        this.rootEl = document.querySelector('.todo-list');
    }

    addItem(item) {
        this.items.unshift(item);

        if (this.isItemShown && !this.isItemShown(item)) {
            return;
        }

        this.rootEl.prepend( item.render() );
    }

    removeItem(item) {
        this.items = this.items.filter( el => el !== item );
        item.destroy();
    }

    clear() {
        this.items = [];
    }

    addItems( items ) {
        this.items.push( ...items );
        this.render();
    }

    render() {
        const shownItems = this.items
            .filter(t => this.isItemShown ? this.isItemShown(t) : true);

        this.rootEl.innerText = '';
        this.rootEl.append(
            ...shownItems.map(t => t.render())
        );
    }
}
