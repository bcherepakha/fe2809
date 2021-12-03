export default class Modal {
    constructor(text) {
        // this = {}
        // this.__proto__ === Modal.prototype

        // this._hideHandler = this._hideHandler.bind(this);

        this._createElements(text);

        // return this;
    }

    _createElements(text) {
        this._rootEl = document.createElement('div');
        this._rootEl.className = 'modal';

        const bodyEl = document.createElement('div');

        bodyEl.className = 'modal__body';

        const actionsEl = document.createElement('div');
        const textEl = document.createElement('p');

        textEl.innerText = text;

        actionsEl.className = 'modal__actions';

        this._rootEl.append( bodyEl );
        bodyEl.append( textEl, actionsEl );

        this._rootEl.addEventListener( 'click', this._hideHandler );

        this._actionsEl = actionsEl;
    }

    _hideHandler = (e) => {
        console.log( this ); // this = ?

        if (e.target === this._rootEl) {
            this.hide();
        }
    }

    action(actionText, settings = {}, action) {
        const btn = document.createElement('button');

        btn.className = 'modal__action';

        if (settings.ok) {
            btn.classList.add('modal__action--yes');
        }

        if (settings.cancel) {
            btn.classList.add('modal__action--no');
        }

        btn.innerText = actionText;

        if (action) {
            btn.addEventListener(
                'click',
                action.bind(null, this, actionText, settings)
                // (e) => action(this, actionText, settings, e)
            );
        }

        // btn.addEventListener( 'click', (e) => {
        //     if (action) {
        //         action.call(null, this, actionText, settings, e);
        //     }

        //     this.hide();
        // });

        this._actionsEl.append(btn);

        return this;
    }

    show() {
        document.body.append( this._rootEl );

        return this;
    }

    hide() {
        this._rootEl.remove();

        return this;
    }
}
