
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
});

describe('swiper should have the following methods:', function(){
    var methods = [
        '_init',
        '_bind',
        '_show',
        '_activate',
        'next',
        'go',
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
    var properties = [
        'version',
        '_options',
        '_start',
        '_move',
        '_end',
        '_prev',
        '_current',
        '_offset',
        '_eventHandlers',
        '$container',
        '$items',
        'count',
        '_width',
        '_height'
    ];
    for (var i = 0, len = properties.length; i < len; i++){
        (function(i){
            it('.' + properties[i] + '', function(done){
                assert(swiper[properties[i]] !== undefined);
                done();
            });
        })(i);
    }
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

describe('.go()', function (){
    it('should translateY the container to the slide height & should add classes to dom', function (){
        swiper.go(0);
        for(var i = 1, len = swiper.$items.length; i < len; i++){
            swiper.go(i);
            var height = swiper.$items[i].style['height'].replace('px', '');
            var expect = 'translate3d(0px, -'+ (height * i) +'px, 0px)';

            assert(swiper._current === i);
            assert(swiper.$container.style['-webkit-transform'] === expect);
        }
    });
});

describe('.on()', function (){
    it('swiped listener should not be empty', function (){

        swiper.on('swiped', function (){

        });
        assert(typeof swiper._eventHandlers['swiped'] === 'function');
    })
});
