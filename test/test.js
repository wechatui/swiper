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


    describe('swiper have the following methods:', function(){
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

    describe('swiper have the following properties', function(){
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


});



