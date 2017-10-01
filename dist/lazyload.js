/*! lazyload - v1.0.0 - 2017-10-01
* Copyright (c) 2017 xwillmadeit <xwillmadeit@gmail.com>; Licensed MIT */


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.lazyload = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var lazyload = (function () {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lazyload';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaultOptions = {
    rootMargin: '10px',
    threshold: 0.1
  };

  options = _extends({}, defaultOptions, options);

  var _options = options,
      rootMargin = _options.rootMargin,
      threshold = _options.threshold,
      loaded = _options.loaded;


  var load = function load(target) {
    target.src = target.getAttribute('data-src');
    typeof loaded === 'function' && loaded(target);
  };

  var intersectionTiggered = function intersectionTiggered(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        load(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  var observer = new IntersectionObserver(intersectionTiggered, {
    rootMargin: rootMargin,
    threshold: threshold
  });

  return {
    observe: function observe() {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (element) {
        observer.observe(element);
      });
    }
  };
});

return lazyload;

})));
