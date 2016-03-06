import * as util from './util';

/**
 * Swiper
 */
class Swiper {

    /**
     * constructor
     * @param {Object} options
     */
    constructor(options = {}) {
        this.version = '@VERSION';
        this._options = util.extend({
            container: '.swiper', /* container's selector */
            item: '.item', /* item's selector */
            direction: 'vertical',  /* swiper's direction, vertical or horizontal */
            activeClass: 'active', /* current active item's class name */
            threshold: 50, /* threshold */
            duration: 300 /* duration */
        }, options);
        this._start = {};
        this._move = {};
        this._end = {};
        this._prev = 0;
        this._current = 0;
        this._offset = 0;
        this._goto = -1;
        this._eventHandlers = {};

        /**
         * container
         * @type {Element}
         */
        this.$container = document.querySelector(this._options.container);
        /**
         * item list
         * @type {NodeList}
         */
        this.$items = this.$container.querySelectorAll(this._options.item);
        /**
         * count of item list
         * @type {number}
         */
        this.count = this.$items.length;

        /**
         * container's width
         * @type {number}
         * @private
         */
        this._width = this.$container.offsetWidth;
        /**
         * container's height
         * @type {number}
         * @private
         */
        this._height = this.$container.offsetHeight;

        this._init();
        this._bind();
    }

    /**
     * init
     * @private
     */
    _init() {
        // if direction is vertical, then container's width is container's width, height is container's height*count
        let w = this._width;
        let h = this._height * this.count;

        if (this._options.direction === 'horizontal') {
            w = this._width * this.count;
            h = this._height;
        }

        // set container's width and height
        this.$container.style.width = `${w}px`;
        this.$container.style.height = `${h}px`;

        Array.prototype.forEach.call(this.$items, ($item, key) => {
            $item.style.width = `${this._width}px`;
            $item.style.height = `${this._height}px`;
        });

        this._activate(0);
    }

    /**
     * bind event listener
     * @private
     */
    _bind() {
        this.$container.addEventListener('touchstart', (e) => {
            this._start.x = e.changedTouches[0].pageX;
            this._start.y = e.changedTouches[0].pageY;

            this.$container.style['-webkit-transition'] = 'none';
            this.$container.style.transition = 'none';

        }, false);

        this.$container.addEventListener('touchmove', (e) => {
            this._move.x = e.changedTouches[0].pageX;
            this._move.y = e.changedTouches[0].pageY;

            let distance = this._move.y - this._start.y;
            let translate = distance - this._offset;
            let transform = `translate3d(0, ${translate}px, 0)`;

            if (this._options.direction === 'horizontal') {
                distance = this._move.x - this._start.x;
                translate = distance - this._offset;
                transform = `translate3d(${translate}px, 0, 0)`;
            }

            this.$container.style['-webkit-transform'] = transform;
            this.$container.style.transform = transform;

            e.preventDefault();
        }, false);

        this.$container.addEventListener('touchend', (e) => {
            this._end.x = e.changedTouches[0].pageX;
            this._end.y = e.changedTouches[0].pageY;


            let distance = this._end.y - this._start.y;
            if (this._options.direction === 'horizontal') {
                distance = this._end.x - this._start.x;
            }

            this._prev = this._current;
            if (distance > this._options.threshold) {
                this._current = this._current === 0 ? 0 : --this._current;
            } else if (distance < -this._options.threshold) {
                this._current = this._current < (this.count - 1) ? ++this._current : this._current;
            }

            this._show(this._current);

        }, false);

        this.$container.addEventListener('transitionEnd', function (e) {
        }, false);

        this.$container.addEventListener('webkitTransitionEnd', (e) => {
            if (e.target !== this.$container) {
                return false;
            }

            if (this._current != this._prev || this._goto > -1) {
                this._activate(this._current);
                var cb = this._eventHandlers['swiped'] || util.noop;
                cb.apply(this, [this._prev, this._current]);
                this._goto = -1;
            }
            e.preventDefault();
        }, false);
    }

    /**
     * show
     * @param {Number} index
     * @private
     */
    _show(index) {
        this._offset = index * this._height;
        let transform = `translate3d(0, -${this._offset}px, 0)`;

        if (this._options.direction === 'horizontal') {
            this._offset = index * this._width;
            transform = `translate3d(-${this._offset}px, 0, 0)`;
        }

        const duration = `${this._options.duration}ms`;

        this.$container.style['-webkit-transition'] = duration;
        this.$container.style.transition = duration;
        this.$container.style['-webkit-transform'] = transform;
        this.$container.style.transform = transform;
    }

    /**
     * activate
     * @param {Number} index
     * @private
     */
    _activate(index) {
        const clazz = this._options.activeClass;
        Array.prototype.forEach.call(this.$items, function ($item, key) {
            $item.classList.remove(clazz);
            if (index === key) {
                $item.classList.add(clazz);
            }
        });
    }

    /**
     * go to some page
     * @param {Number} index
     * @returns {*}
     */
    go(index) {
        if (index < 0 || index > this.count - 1 || index === this._current) {
            return;
        }

        if (index === 0) {
            this._current = 0;
            this._prev = 0;
        } else {
            this._current = index;
            this._prev = index - 1;
        }

        this._goto = index;
        this._show(this._current);

        return this;
    }

    /**
     * next page
     * @returns {*}
     */
    next() {
        if (this._current >= this.count - 1) {
            return;
        }
        this._prev = this._current;
        this._show(++this._current);
        return this;
    }

    /**
     * event listener
     * @param {String} event
     * @param {Function} callback
     * @returns {Swiper}
     */
    on(event, callback) {
        if (this._eventHandlers[event]) {
            throw new Error(`event ${event} is already register`);
        }
        if (typeof callback !== 'function') {
            throw new Error('parameter callback must be a function');
        }

        this._eventHandlers[event] = callback;

        return this;
    }
}

export default Swiper;