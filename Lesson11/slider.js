'use strict';

function Slider(rootSelector, loop = true) {
    this.rootSelector = rootSelector;
    this.loop = loop;
    this.rootEl = document.querySelector(rootSelector);
    this.currentSlide = 0;

    this.bodyEl = this.rootEl.querySelector('.slider__body');
    this.slides = [...this.rootEl.querySelectorAll('.slider__slide')];
    this.prevBtn = this.rootEl.querySelector('.slider__prev');
    this.nextBtn = this.rootEl.querySelector('.slider__next');
    this.playBtn = this.rootEl.querySelector('.slider__run');
    this.pauseBtn = this.rootEl.querySelector('.slider__stop');

    this.prevBtn.addEventListener('click', this.prev.bind(this));

    this.nextBtn.addEventListener('click', this.next.bind(this));

    this.render();

    // if (effect === 'slide') {
    //     this.render = this.renderSlide;
    // }
}

Slider.prototype.prev = function () {
    this.currentSlide = this.currentSlide - 1;

    if (this.currentSlide < 0) {
        if (this.loop) {
            this.currentSlide += this.slides.length;
        } else {
            this.currentSlide = 0;
        }
    }

    this.render();
};

Slider.prototype.next = function () {
    this.currentSlide++;

    if (this.currentSlide >= this.slides.length) {

        if (this.loop) {
            this.currentSlide = this.currentSlide % this.slides.length;
        } else {
            this.currentSlide = this.slides.length - 1;
        }
    }

    this.render();
};

Slider.prototype.render = function () {
    const { currentSlide } = this;

    this.slides.forEach(function (slide, slideNum) {
        if (slideNum !== currentSlide) {
            slide.classList.remove('slider__current');
        } else {
            slide.classList.add('slider__current');
        }
    });
}

function SliderSlide(rootSelector, loop) {
    // this = { __proto__ : SliderSlide.prototype }

    Slider.call(this, rootSelector, loop);

    return this;
}

SliderSlide.prototype.__proto__ = Slider.prototype;

Slider.prototype.prev = function () {
    this.currentSlide = this.currentSlide - 1;

    if (this.currentSlide < 0) {
        if (this.loop) {
            this.currentSlide += this.slides.length;
        }
    }

    this.render();
};

Slider.prototype.next = function () {
    this.currentSlide++;

    if (this.currentSlide >= this.slides.length) {

        if (this.loop) {
            this.currentSlide = this.currentSlide % this.slides.length;
        }
    }

    this.render();
};

SliderSlide.prototype.render = function () {
    const { currentSlide, slides: { length: slidesNum } } = this;
    const cicleNum = Math.floor(currentSlide / slidesNum);
    const shownSlideNum = (currentSlide % slidesNum + slidesNum) % slidesNum;
    const prevSlideNum = (slidesNum + shownSlideNum - 1) % slidesNum;
    const nextSlideNum = (shownSlideNum + 1) % slidesNum;

    console.log( { currentSlide, cicleNum, shownSlideNum, prevSlideNum, nextSlideNum });

    this.bodyEl.style.transform = `translateX(${-currentSlide*100}%)`;
    this.slides.forEach((slide, slideNum) => {
        slide.style.transform = `translateX(${cicleNum*slidesNum*100}%)`;

        slide.dataset.current = slideNum === shownSlideNum;

        if (slideNum === prevSlideNum && shownSlideNum === 0) {
            slide.style.transform = `translateX(${(cicleNum - 1)*slidesNum*100}%)`;
        }

        if (slideNum === nextSlideNum && shownSlideNum === slidesNum - 1) {
            slide.style.transform = `translateX(${(cicleNum + 1)*slidesNum*100}%)`;
        }

    });
}

const slider1 = new Slider('.fade');
const slider2 = new SliderSlide('.slide', false);

console.log( 'slider1', slider1 );
console.log( 'slider2', slider2 );
