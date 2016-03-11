/*!
 * iswiper 1.4.2 (https://github.com/wechatui/swiper.git)
 * Copyright 2016 wechat ui team.
 * Licensed under the MIT license
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Swiper = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers;

  /**
   * simple `extend` method
   * @param target
   * @param source
   * @returns {*}
   */
  function extend(target, source) {
    for (var key in source) {
      target[key] = source[key];
    }
    return target;
  }

  /**
   * noop
   */
  function noop() {}

  /**
   * Swiper
   */

  var Swiper = function () {

      /**
       * constructor
       * @param {Object} options
       */

      function Swiper() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
          babelHelpers.classCallCheck(this, Swiper);

          this.version = '1.4.2';
          this._options = extend({
              container: '.swiper', /* container's selector */
              item: '.item', /* item's selector */
              direction: 'vertical', /* swiper's direction, vertical or horizontal */
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


      babelHelpers.createClass(Swiper, [{
          key: '_init',
          value: function _init() {
              var _this = this;

              // if direction is vertical, then container's width is container's width, height is container's height*count
              var w = this._width;
              var h = this._height * this.count;

              if (this._options.direction === 'horizontal') {
                  w = this._width * this.count;
                  h = this._height;
              }

              // set container's width and height
              this.$container.style.width = w + 'px';
              this.$container.style.height = h + 'px';

              Array.prototype.forEach.call(this.$items, function ($item, key) {
                  $item.style.width = _this._width + 'px';
                  $item.style.height = _this._height + 'px';
              });

              this._activate(0);
          }

          /**
           * bind event listener
           * @private
           */

      }, {
          key: '_bind',
          value: function _bind() {
              var _this2 = this;

              this.$container.addEventListener('touchstart', function (e) {
                  _this2._start.x = e.changedTouches[0].pageX;
                  _this2._start.y = e.changedTouches[0].pageY;

                  _this2.$container.style['-webkit-transition'] = 'none';
                  _this2.$container.style.transition = 'none';
              }, false);

              this.$container.addEventListener('touchmove', function (e) {
                  _this2._move.x = e.changedTouches[0].pageX;
                  _this2._move.y = e.changedTouches[0].pageY;

                  var distance = _this2._move.y - _this2._start.y;
                  var translate = distance - _this2._offset;
                  var transform = 'translate3d(0, ' + translate + 'px, 0)';

                  if (_this2._options.direction === 'horizontal') {
                      distance = _this2._move.x - _this2._start.x;
                      translate = distance - _this2._offset;
                      transform = 'translate3d(' + translate + 'px, 0, 0)';
                  }

                  _this2.$container.style['-webkit-transform'] = transform;
                  _this2.$container.style.transform = transform;

                  e.preventDefault();
              }, false);

              this.$container.addEventListener('touchend', function (e) {
                  _this2._end.x = e.changedTouches[0].pageX;
                  _this2._end.y = e.changedTouches[0].pageY;

                  var distance = _this2._end.y - _this2._start.y;
                  if (_this2._options.direction === 'horizontal') {
                      distance = _this2._end.x - _this2._start.x;
                  }

                  _this2._prev = _this2._current;
                  if (distance > _this2._options.threshold) {
                      _this2._current = _this2._current === 0 ? 0 : --_this2._current;
                  } else if (distance < -_this2._options.threshold) {
                      _this2._current = _this2._current < _this2.count - 1 ? ++_this2._current : _this2._current;
                  }

                  _this2._show(_this2._current);
              }, false);

              this.$container.addEventListener('transitionEnd', function (e) {}, false);

              this.$container.addEventListener('webkitTransitionEnd', function (e) {
                  if (e.target !== _this2.$container) {
                      return false;
                  }

                  if (_this2._current != _this2._prev || _this2._goto > -1) {
                      _this2._activate(_this2._current);
                      var cb = _this2._eventHandlers['swiped'] || noop;
                      cb.apply(_this2, [_this2._prev, _this2._current]);
                      _this2._goto = -1;
                  }
                  e.preventDefault();
              }, false);
          }

          /**
           * show
           * @param {Number} index
           * @private
           */

      }, {
          key: '_show',
          value: function _show(index) {
              this._offset = index * this._height;
              var transform = 'translate3d(0, -' + this._offset + 'px, 0)';

              if (this._options.direction === 'horizontal') {
                  this._offset = index * this._width;
                  transform = 'translate3d(-' + this._offset + 'px, 0, 0)';
              }

              var duration = this._options.duration + 'ms';

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

      }, {
          key: '_activate',
          value: function _activate(index) {
              var clazz = this._options.activeClass;
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

      }, {
          key: 'go',
          value: function go(index) {
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

      }, {
          key: 'next',
          value: function next() {
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

      }, {
          key: 'on',
          value: function on(event, callback) {
              if (this._eventHandlers[event]) {
                  throw new Error('event ' + event + ' is already register');
              }
              if (typeof callback !== 'function') {
                  throw new Error('parameter callback must be a function');
              }

              this._eventHandlers[event] = callback;

              return this;
          }
      }]);
      return Swiper;
  }();

  return Swiper;

}));