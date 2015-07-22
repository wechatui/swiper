/**
 * Created by jfengjiang on 2015/7/22.
 */

var swiper = new Swiper();

describe('Swiper', function () {
    it('Swiper should have create', function () {
        assert(Swiper !== undefined);
    });

    it('Swiper should be a Function', function(){
        assert(typeof Swiper === 'function');
    });

    it('swiper should be instance of Swiper', function(){
        assert(swiper instanceof Swiper);
    });


    describe('swiper should have the following methods:', function(){
        var methods = [
            '_init',
            '_bind',
            '_getItems',
            '_show',
            '_addClass',
            '_removeClass',
            'next',
            'on'
        ];
        var i = 0;
        var len = methods.length;
        for (i; i < len; i += 1) {
            (function (i) {
                it('.' + methods[i] + '()', function (done) {
                    assert(typeof swiper[methods[i]] === 'function');
                    done()
                });
            }(i));
        }

    });

    describe('swiper should have the following properties', function(){
        var properties = ['version', '_default', '_options', '_start', '_move', '_end', '_prev', '_current', '_offset', '_eventHandlers', '_cache',
        '$container', '$items', 'count', '_width', '_height'];
        for (var i = 0, len = properties.length; i < len; i++){
            (function(i){
                it('.' + properties[i] + '', function(done){
                    assert(swiper[properties[i]] !== undefined);
                    done();
                });
            })(i);
        }
    });

    describe('it should add classes to dom', function(){
        var $slider = swiper.$items[swiper._current];
        var $items = $slider.querySelectorAll('*[toggle-class]');
        Array.prototype.forEach.call($items, function($item, index){
            var clazz = $item.getAttribute('toggle-class').split(/\s+/);
            for(var i = 0, len = clazz.length; i < len; i++){
                (function(i){
                    it('.' + clazz, function(done){
                        setTimeout(function(){
                            assert($item.className.indexOf(clazz[i]) !== -1);
                            done();
                        }, 1000);
                    });
                })(i);
            }
        });
    });

    describe('.next()', function (){
        it('should translateY the container to the slide height & should add classes to dom', function (){
            assert(swiper.$container.style['-webkit-transform'] === '');

            for(var i = 1, len = swiper.$items.length; i < len; i++){
                swiper.next();
                var height = swiper.$items[i].style['height'].replace('px', '');
                var expect = 'translate3d(0px, -'+ (height * i) +'px, 0px)';

                assert(swiper._current === i);
                assert(swiper.$container.style['-webkit-transform'] === expect);
            }
        });
    });
});



