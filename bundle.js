(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Modified version of http://github.com/desandro/imagesloaded v2.1.1
 * MIT License. by Paul Irish et al.
 */

var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function loaded(image, callback) {
  var src
    , old
    , onload

  if (!image.nodeName) return callback(new Error('First argument must be an image element'))
  if (image.nodeName.toLowerCase() !== 'img') return callback(new Error('Element supplied is not an image'))
  if (image.src  && image.complete && image.naturalWidth !== undefined) return callback(null, true)

  old = !image.addEventListener

  function loaded() {
    if (old) {
      image.detachEvent('onload', loaded)
    } else {
      image.removeEventListener('load', loaded, false)
    }
    callback(null, false)
  }

  if (old) {
    image.attachEvent('onload', loaded)
  } else {
    image.addEventListener('load', loaded, false)
  }

  if (image.readyState || image.complete) {
    src = image.src
    image.src = BLANK
    image.src = src
  }
}

module.exports = loaded

},{}],2:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCallback = require('lodash.createcallback'),
    forOwn = require('lodash.forown');

/**
 * Creates an array of values by running each element in the collection
 * through the callback. The callback is bound to `thisArg` and invoked with
 * three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `callback` the created "_.pluck" style
 * callback will return the property value of the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback
 * will return `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias collect
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array} Returns a new array of the results of each `callback` execution.
 * @example
 *
 * _.map([1, 2, 3], function(num) { return num * 3; });
 * // => [3, 6, 9]
 *
 * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
 * // => [3, 6, 9] (property order is not guaranteed across environments)
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.map(characters, 'name');
 * // => ['barney', 'fred']
 */
function map(collection, callback, thisArg) {
  var index = -1,
      length = collection ? collection.length : 0;

  callback = createCallback(callback, thisArg, 3);
  if (typeof length == 'number') {
    var result = Array(length);
    while (++index < length) {
      result[index] = callback(collection[index], index, collection);
    }
  } else {
    result = [];
    forOwn(collection, function(value, key, collection) {
      result[++index] = callback(value, key, collection);
    });
  }
  return result;
}

module.exports = map;

},{"lodash.createcallback":3,"lodash.forown":39}],3:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    baseIsEqual = require('lodash._baseisequal'),
    isObject = require('lodash.isobject'),
    keys = require('lodash.keys'),
    property = require('lodash.property');

/**
 * Produces a callback bound to an optional `thisArg`. If `func` is a property
 * name the created callback will return the property value for a given element.
 * If `func` is an object the created callback will return `true` for elements
 * that contain the equivalent object properties, otherwise it will return `false`.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // wrap to create custom callback shorthands
 * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
 *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
 *   return !match ? func(callback, thisArg) : function(object) {
 *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
 *   };
 * });
 *
 * _.filter(characters, 'age__gt38');
 * // => [{ 'name': 'fred', 'age': 40 }]
 */
function createCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (func == null || type == 'function') {
    return baseCreateCallback(func, thisArg, argCount);
  }
  // handle "_.pluck" style callback shorthands
  if (type != 'object') {
    return property(func);
  }
  var props = keys(func),
      key = props[0],
      a = func[key];

  // handle "_.where" style callback shorthands
  if (props.length == 1 && a === a && !isObject(a)) {
    // fast path the common case of providing an object with a single
    // property containing a primitive value
    return function(object) {
      var b = object[key];
      return a === b && (a !== 0 || (1 / a == 1 / b));
    };
  }
  return function(object) {
    var length = props.length,
        result = false;

    while (length--) {
      if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
        break;
      }
    }
    return result;
  };
}

module.exports = createCallback;

},{"lodash._basecreatecallback":4,"lodash._baseisequal":23,"lodash.isobject":32,"lodash.keys":34,"lodash.property":38}],4:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var bind = require('lodash.bind'),
    identity = require('lodash.identity'),
    setBindData = require('lodash._setbinddata'),
    support = require('lodash.support');

/** Used to detected named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Native method shortcuts */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.createCallback` without support for creating
 * "_.pluck" or "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 */
function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  // exit early for no `thisArg` or already bound by `Function#bind`
  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        // checks if `func` references the `this` keyword and stores the result
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }
  // exit early if there are no `this` references or `func` is bound
  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 2: return function(a, b) {
      return func.call(thisArg, a, b);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
  }
  return bind(func, thisArg);
}

module.exports = baseCreateCallback;

},{"lodash._setbinddata":5,"lodash.bind":8,"lodash.identity":20,"lodash.support":21}],5:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative'),
    noop = require('lodash.noop');

/** Used as the property descriptor for `__bindData__` */
var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

/** Used to set meta data on functions */
var defineProperty = (function() {
  // IE 8 only accepts DOM elements
  try {
    var o = {},
        func = isNative(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch(e) { }
  return result;
}());

/**
 * Sets `this` binding data on a given function.
 *
 * @private
 * @param {Function} func The function to set data on.
 * @param {Array} value The data array to set.
 */
var setBindData = !defineProperty ? noop : function(func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

module.exports = setBindData;

},{"lodash._isnative":6,"lodash.noop":7}],6:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],7:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

module.exports = noop;

},{}],8:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('lodash._createwrapper'),
    slice = require('lodash._slice');

/**
 * Creates a function that, when called, invokes `func` with the `this`
 * binding of `thisArg` and prepends any additional `bind` arguments to those
 * provided to the bound function.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [arg] Arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  return arguments.length > 2
    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
    : createWrapper(func, 1, null, null, thisArg);
}

module.exports = bind;

},{"lodash._createwrapper":9,"lodash._slice":19}],9:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseBind = require('lodash._basebind'),
    baseCreateWrapper = require('lodash._basecreatewrapper'),
    isFunction = require('lodash.isfunction'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push,
    unshift = arrayRef.unshift;

/**
 * Creates a function that, when called, either curries or invokes `func`
 * with an optional `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of method flags to compose.
 *  The bitmask may be composed of the following flags:
 *  1 - `_.bind`
 *  2 - `_.bindKey`
 *  4 - `_.curry`
 *  8 - `_.curry` (bound)
 *  16 - `_.partial`
 *  32 - `_.partialRight`
 * @param {Array} [partialArgs] An array of arguments to prepend to those
 *  provided to the new function.
 * @param {Array} [partialRightArgs] An array of arguments to append to those
 *  provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    // clone `bindData`
    bindData = slice(bindData);
    if (bindData[2]) {
      bindData[2] = slice(bindData[2]);
    }
    if (bindData[3]) {
      bindData[3] = slice(bindData[3]);
    }
    // set `thisBinding` is not previously bound
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    // set if previously bound but not currently (subsequent curried functions)
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    // set curried arity if not yet set
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    // append partial left arguments
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    // append partial right arguments
    if (isPartialRight) {
      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    // merge flags
    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }
  // fast path for `_.bind`
  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

module.exports = createWrapper;

},{"lodash._basebind":10,"lodash._basecreatewrapper":14,"lodash._slice":19,"lodash.isfunction":18}],10:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('lodash._basecreate'),
    isObject = require('lodash.isobject'),
    setBindData = require('lodash._setbinddata'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `_.bind` that creates the bound function and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new bound function.
 */
function baseBind(bindData) {
  var func = bindData[0],
      partialArgs = bindData[2],
      thisArg = bindData[4];

  function bound() {
    // `Function#bind` spec
    // http://es5.github.io/#x15.3.4.5
    if (partialArgs) {
      // avoid `arguments` object deoptimizations by using `slice` instead
      // of `Array.prototype.slice.call` and not assigning `arguments` to a
      // variable as a ternary expression
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    if (this instanceof bound) {
      // ensure `new bound` is an instance of `func`
      var thisBinding = baseCreate(func.prototype),
          result = func.apply(thisBinding, args || arguments);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisArg, args || arguments);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseBind;

},{"lodash._basecreate":11,"lodash._setbinddata":5,"lodash._slice":19,"lodash.isobject":32}],11:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative'),
    isObject = require('lodash.isobject'),
    noop = require('lodash.noop');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for browsers without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }());
}

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash._isnative":12,"lodash.isobject":32,"lodash.noop":13}],12:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],13:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],14:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('lodash._basecreate'),
    isObject = require('lodash.isobject'),
    setBindData = require('lodash._setbinddata'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `createWrapper` that creates the wrapper and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new function.
 */
function baseCreateWrapper(bindData) {
  var func = bindData[0],
      bitmask = bindData[1],
      partialArgs = bindData[2],
      partialRightArgs = bindData[3],
      thisArg = bindData[4],
      arity = bindData[5];

  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      key = func;

  function bound() {
    var thisBinding = isBind ? thisArg : this;
    if (partialArgs) {
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    if (partialRightArgs || isCurry) {
      args || (args = slice(arguments));
      if (partialRightArgs) {
        push.apply(args, partialRightArgs);
      }
      if (isCurry && args.length < arity) {
        bitmask |= 16 & ~32;
        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
      }
    }
    args || (args = arguments);
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (this instanceof bound) {
      thisBinding = baseCreate(func.prototype);
      var result = func.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisBinding, args);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseCreateWrapper;

},{"lodash._basecreate":15,"lodash._setbinddata":5,"lodash._slice":19,"lodash.isobject":32}],15:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":16,"lodash.isobject":32,"lodash.noop":17}],16:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],17:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],18:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],19:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Slices the `collection` from the `start` index up to, but not including,
 * the `end` index.
 *
 * Note: This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @private
 * @param {Array|Object|string} collection The collection to slice.
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @returns {Array} Returns the new array.
 */
function slice(array, start, end) {
  start || (start = 0);
  if (typeof end == 'undefined') {
    end = array ? array.length : 0;
  }
  var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

  while (++index < length) {
    result[index] = array[start + index];
  }
  return result;
}

module.exports = slice;

},{}],20:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],21:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative');

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/**
 * An object used to flag environments features.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

/**
 * Detect if functions can be decompiled by `Function#toString`
 * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

/**
 * Detect if `Function#name` is supported (all but IE).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcNames = typeof Function.name == 'string';

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash._isnative":22}],22:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],23:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var forIn = require('lodash.forin'),
    getArray = require('lodash._getarray'),
    isFunction = require('lodash.isfunction'),
    objectTypes = require('lodash._objecttypes'),
    releaseArray = require('lodash._releasearray');

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isEqual`, without support for `thisArg` binding,
 * that allows partial "_.where" style comparisons.
 *
 * @private
 * @param {*} a The value to compare.
 * @param {*} b The other value to compare.
 * @param {Function} [callback] The function to customize comparing values.
 * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `a` objects.
 * @param {Array} [stackB=[]] Tracks traversed `b` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
  // used to indicate that when comparing objects, `a` has at least the properties of `b`
  if (callback) {
    var result = callback(a, b);
    if (typeof result != 'undefined') {
      return !!result;
    }
  }
  // exit early for identical values
  if (a === b) {
    // treat `+0` vs. `-0` as not equal
    return a !== 0 || (1 / a == 1 / b);
  }
  var type = typeof a,
      otherType = typeof b;

  // exit early for unlike primitive values
  if (a === a &&
      !(a && objectTypes[type]) &&
      !(b && objectTypes[otherType])) {
    return false;
  }
  // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
  // http://es5.github.io/#x15.3.4.4
  if (a == null || b == null) {
    return a === b;
  }
  // compare [[Class]] names
  var className = toString.call(a),
      otherClass = toString.call(b);

  if (className == argsClass) {
    className = objectClass;
  }
  if (otherClass == argsClass) {
    otherClass = objectClass;
  }
  if (className != otherClass) {
    return false;
  }
  switch (className) {
    case boolClass:
    case dateClass:
      // coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
      return +a == +b;

    case numberClass:
      // treat `NaN` vs. `NaN` as equal
      return (a != +a)
        ? b != +b
        // but treat `+0` vs. `-0` as not equal
        : (a == 0 ? (1 / a == 1 / b) : a == +b);

    case regexpClass:
    case stringClass:
      // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
      // treat string primitives and their corresponding object instances as equal
      return a == String(b);
  }
  var isArr = className == arrayClass;
  if (!isArr) {
    // unwrap any `lodash` wrapped values
    var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
        bWrapped = hasOwnProperty.call(b, '__wrapped__');

    if (aWrapped || bWrapped) {
      return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
    }
    // exit for functions and DOM nodes
    if (className != objectClass) {
      return false;
    }
    // in older versions of Opera, `arguments` objects have `Array` constructors
    var ctorA = a.constructor,
        ctorB = b.constructor;

    // non `Object` object instances with different constructors are not equal
    if (ctorA != ctorB &&
          !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
          ('constructor' in a && 'constructor' in b)
        ) {
      return false;
    }
  }
  // assume cyclic structures are equal
  // the algorithm for detecting cyclic structures is adapted from ES 5.1
  // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
  var initedStack = !stackA;
  stackA || (stackA = getArray());
  stackB || (stackB = getArray());

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == a) {
      return stackB[length] == b;
    }
  }
  var size = 0;
  result = true;

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  // recursively compare objects and arrays (susceptible to call stack limits)
  if (isArr) {
    // compare lengths to determine if a deep comparison is necessary
    length = a.length;
    size = b.length;
    result = size == length;

    if (result || isWhere) {
      // deep compare the contents, ignoring non-numeric properties
      while (size--) {
        var index = length,
            value = b[size];

        if (isWhere) {
          while (index--) {
            if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
          break;
        }
      }
    }
  }
  else {
    // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
    // which, in this case, is more costly
    forIn(b, function(value, key, b) {
      if (hasOwnProperty.call(b, key)) {
        // count the number of properties.
        size++;
        // deep compare each property value.
        return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
      }
    });

    if (result && !isWhere) {
      // ensure both objects have the same number of properties
      forIn(a, function(value, key, a) {
        if (hasOwnProperty.call(a, key)) {
          // `size` will be `-1` if `a` has more properties than `b`
          return (result = --size > -1);
        }
      });
    }
  }
  stackA.pop();
  stackB.pop();

  if (initedStack) {
    releaseArray(stackA);
    releaseArray(stackB);
  }
  return result;
}

module.exports = baseIsEqual;

},{"lodash._getarray":24,"lodash._objecttypes":26,"lodash._releasearray":27,"lodash.forin":30,"lodash.isfunction":31}],24:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayPool = require('lodash._arraypool');

/**
 * Gets an array from the array pool or creates a new one if the pool is empty.
 *
 * @private
 * @returns {Array} The array from the pool.
 */
function getArray() {
  return arrayPool.pop() || [];
}

module.exports = getArray;

},{"lodash._arraypool":25}],25:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to pool arrays and objects used internally */
var arrayPool = [];

module.exports = arrayPool;

},{}],26:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],27:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayPool = require('lodash._arraypool'),
    maxPoolSize = require('lodash._maxpoolsize');

/**
 * Releases the given array back to the array pool.
 *
 * @private
 * @param {Array} [array] The array to release.
 */
function releaseArray(array) {
  array.length = 0;
  if (arrayPool.length < maxPoolSize) {
    arrayPool.push(array);
  }
}

module.exports = releaseArray;

},{"lodash._arraypool":28,"lodash._maxpoolsize":29}],28:[function(require,module,exports){
module.exports=require(25)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._getarray/node_modules/lodash._arraypool/index.js":25}],29:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used as the max size of the `arrayPool` and `objectPool` */
var maxPoolSize = 40;

module.exports = maxPoolSize;

},{}],30:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    objectTypes = require('lodash._objecttypes');

/**
 * Iterates over own and inherited enumerable properties of an object,
 * executing the callback for each property. The callback is bound to `thisArg`
 * and invoked with three arguments; (value, key, object). Callbacks may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.move = function(x, y) {
 *   this.x += x;
 *   this.y += y;
 * };
 *
 * _.forIn(new Shape, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
 */
var forIn = function(collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
    for (index in iterable) {
      if (callback(iterable[index], index, collection) === false) return result;
    }
  return result
};

module.exports = forIn;

},{"lodash._basecreatecallback":4,"lodash._objecttypes":26}],31:[function(require,module,exports){
module.exports=require(18)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash.isfunction/index.js":18}],32:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('lodash._objecttypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"lodash._objecttypes":33}],33:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],34:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative'),
    isObject = require('lodash.isobject'),
    shimKeys = require('lodash._shimkeys');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"lodash._isnative":35,"lodash._shimkeys":36,"lodash.isobject":32}],35:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],36:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('lodash._objecttypes');

/** Used for native method references */
var objectProto = Object.prototype;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable) return result;
  if (!(objectTypes[typeof object])) return result;
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result
};

module.exports = shimKeys;

},{"lodash._objecttypes":37}],37:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],38:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates a "_.pluck" style function, which returns the `key` value of a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {string} key The name of the property to retrieve.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'fred',   'age': 40 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * var getName = _.property('name');
 *
 * _.map(characters, getName);
 * // => ['barney', 'fred']
 *
 * _.sortBy(characters, getName);
 * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
 */
function property(key) {
  return function(object) {
    return object[key];
  };
}

module.exports = property;

},{}],39:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    keys = require('lodash.keys'),
    objectTypes = require('lodash._objecttypes');

/**
 * Iterates over own enumerable properties of an object, executing the callback
 * for each property. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, key, object). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
 */
var forOwn = function(collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      if (callback(iterable[index], index, collection) === false) return result;
    }
  return result
};

module.exports = forOwn;

},{"lodash._basecreatecallback":40,"lodash._objecttypes":61,"lodash.keys":62}],40:[function(require,module,exports){
module.exports=require(4)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/index.js":4,"lodash._setbinddata":41,"lodash.bind":44,"lodash.identity":58,"lodash.support":59}],41:[function(require,module,exports){
module.exports=require(5)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/index.js":5,"lodash._isnative":42,"lodash.noop":43}],42:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],43:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],44:[function(require,module,exports){
module.exports=require(8)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/index.js":8,"lodash._createwrapper":45,"lodash._slice":57}],45:[function(require,module,exports){
module.exports=require(9)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/index.js":9,"lodash._basebind":46,"lodash._basecreatewrapper":51,"lodash._slice":57,"lodash.isfunction":56}],46:[function(require,module,exports){
module.exports=require(10)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/index.js":10,"lodash._basecreate":47,"lodash._setbinddata":41,"lodash._slice":57,"lodash.isobject":50}],47:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":48,"lodash.isobject":50,"lodash.noop":49}],48:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],49:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],50:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":61}],51:[function(require,module,exports){
module.exports=require(14)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basecreatewrapper/index.js":14,"lodash._basecreate":52,"lodash._setbinddata":41,"lodash._slice":57,"lodash.isobject":55}],52:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":53,"lodash.isobject":55,"lodash.noop":54}],53:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],54:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],55:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":61}],56:[function(require,module,exports){
module.exports=require(18)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash.isfunction/index.js":18}],57:[function(require,module,exports){
module.exports=require(19)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._slice/index.js":19}],58:[function(require,module,exports){
module.exports=require(20)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.identity/index.js":20}],59:[function(require,module,exports){
module.exports=require(21)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.support/index.js":21,"lodash._isnative":60}],60:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],61:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],62:[function(require,module,exports){
module.exports=require(34)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.keys/index.js":34,"lodash._isnative":63,"lodash._shimkeys":64,"lodash.isobject":65}],63:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],64:[function(require,module,exports){
module.exports=require(36)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.keys/node_modules/lodash._shimkeys/index.js":36,"lodash._objecttypes":61}],65:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":61}],66:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCallback = require('lodash.createcallback'),
    forOwn = require('lodash.forown');

/**
 * Reduces a collection to a value which is the accumulated result of running
 * each element in the collection through the callback, where each successive
 * callback execution consumes the return value of the previous execution. If
 * `accumulator` is not provided the first element of the collection will be
 * used as the initial `accumulator` value. The callback is bound to `thisArg`
 * and invoked with four arguments; (accumulator, value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @alias foldl, inject
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [accumulator] Initial value of the accumulator.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * var sum = _.reduce([1, 2, 3], function(sum, num) {
 *   return sum + num;
 * });
 * // => 6
 *
 * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
 *   result[key] = num * 3;
 *   return result;
 * }, {});
 * // => { 'a': 3, 'b': 6, 'c': 9 }
 */
function reduce(collection, callback, accumulator, thisArg) {
  if (!collection) return accumulator;
  var noaccum = arguments.length < 3;
  callback = createCallback(callback, thisArg, 4);

  var index = -1,
      length = collection.length;

  if (typeof length == 'number') {
    if (noaccum) {
      accumulator = collection[++index];
    }
    while (++index < length) {
      accumulator = callback(accumulator, collection[index], index, collection);
    }
  } else {
    forOwn(collection, function(value, index, collection) {
      accumulator = noaccum
        ? (noaccum = false, value)
        : callback(accumulator, value, index, collection)
    });
  }
  return accumulator;
}

module.exports = reduce;

},{"lodash.createcallback":67,"lodash.forown":103}],67:[function(require,module,exports){
module.exports=require(3)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/index.js":3,"lodash._basecreatecallback":68,"lodash._baseisequal":87,"lodash.isobject":96,"lodash.keys":98,"lodash.property":102}],68:[function(require,module,exports){
module.exports=require(4)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/index.js":4,"lodash._setbinddata":69,"lodash.bind":72,"lodash.identity":84,"lodash.support":85}],69:[function(require,module,exports){
module.exports=require(5)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/index.js":5,"lodash._isnative":70,"lodash.noop":71}],70:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],71:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],72:[function(require,module,exports){
module.exports=require(8)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/index.js":8,"lodash._createwrapper":73,"lodash._slice":83}],73:[function(require,module,exports){
module.exports=require(9)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/index.js":9,"lodash._basebind":74,"lodash._basecreatewrapper":78,"lodash._slice":83,"lodash.isfunction":82}],74:[function(require,module,exports){
module.exports=require(10)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/index.js":10,"lodash._basecreate":75,"lodash._setbinddata":69,"lodash._slice":83,"lodash.isobject":96}],75:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":76,"lodash.isobject":96,"lodash.noop":77}],76:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],77:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],78:[function(require,module,exports){
module.exports=require(14)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basecreatewrapper/index.js":14,"lodash._basecreate":79,"lodash._setbinddata":69,"lodash._slice":83,"lodash.isobject":96}],79:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":80,"lodash.isobject":96,"lodash.noop":81}],80:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],81:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],82:[function(require,module,exports){
module.exports=require(18)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash.isfunction/index.js":18}],83:[function(require,module,exports){
module.exports=require(19)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._slice/index.js":19}],84:[function(require,module,exports){
module.exports=require(20)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.identity/index.js":20}],85:[function(require,module,exports){
module.exports=require(21)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.support/index.js":21,"lodash._isnative":86}],86:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],87:[function(require,module,exports){
module.exports=require(23)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/index.js":23,"lodash._getarray":88,"lodash._objecttypes":90,"lodash._releasearray":91,"lodash.forin":94,"lodash.isfunction":95}],88:[function(require,module,exports){
module.exports=require(24)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._getarray/index.js":24,"lodash._arraypool":89}],89:[function(require,module,exports){
module.exports=require(25)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._getarray/node_modules/lodash._arraypool/index.js":25}],90:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],91:[function(require,module,exports){
module.exports=require(27)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._releasearray/index.js":27,"lodash._arraypool":92,"lodash._maxpoolsize":93}],92:[function(require,module,exports){
module.exports=require(25)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._getarray/node_modules/lodash._arraypool/index.js":25}],93:[function(require,module,exports){
module.exports=require(29)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._releasearray/node_modules/lodash._maxpoolsize/index.js":29}],94:[function(require,module,exports){
module.exports=require(30)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash.forin/index.js":30,"lodash._basecreatecallback":68,"lodash._objecttypes":90}],95:[function(require,module,exports){
module.exports=require(18)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash.isfunction/index.js":18}],96:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":97}],97:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],98:[function(require,module,exports){
module.exports=require(34)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.keys/index.js":34,"lodash._isnative":99,"lodash._shimkeys":100,"lodash.isobject":96}],99:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],100:[function(require,module,exports){
module.exports=require(36)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.keys/node_modules/lodash._shimkeys/index.js":36,"lodash._objecttypes":101}],101:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],102:[function(require,module,exports){
module.exports=require(38)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.property/index.js":38}],103:[function(require,module,exports){
module.exports=require(39)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.forown/index.js":39,"lodash._basecreatecallback":104,"lodash._objecttypes":125,"lodash.keys":126}],104:[function(require,module,exports){
module.exports=require(4)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/index.js":4,"lodash._setbinddata":105,"lodash.bind":108,"lodash.identity":122,"lodash.support":123}],105:[function(require,module,exports){
module.exports=require(5)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/index.js":5,"lodash._isnative":106,"lodash.noop":107}],106:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],107:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],108:[function(require,module,exports){
module.exports=require(8)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/index.js":8,"lodash._createwrapper":109,"lodash._slice":121}],109:[function(require,module,exports){
module.exports=require(9)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/index.js":9,"lodash._basebind":110,"lodash._basecreatewrapper":115,"lodash._slice":121,"lodash.isfunction":120}],110:[function(require,module,exports){
module.exports=require(10)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/index.js":10,"lodash._basecreate":111,"lodash._setbinddata":105,"lodash._slice":121,"lodash.isobject":114}],111:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":112,"lodash.isobject":114,"lodash.noop":113}],112:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],113:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],114:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":125}],115:[function(require,module,exports){
module.exports=require(14)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basecreatewrapper/index.js":14,"lodash._basecreate":116,"lodash._setbinddata":105,"lodash._slice":121,"lodash.isobject":119}],116:[function(require,module,exports){
module.exports=require(11)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash._basebind/node_modules/lodash._basecreate/index.js":11,"lodash._isnative":117,"lodash.isobject":119,"lodash.noop":118}],117:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],118:[function(require,module,exports){
module.exports=require(7)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash.noop/index.js":7}],119:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":125}],120:[function(require,module,exports){
module.exports=require(18)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._createwrapper/node_modules/lodash.isfunction/index.js":18}],121:[function(require,module,exports){
module.exports=require(19)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.bind/node_modules/lodash._slice/index.js":19}],122:[function(require,module,exports){
module.exports=require(20)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.identity/index.js":20}],123:[function(require,module,exports){
module.exports=require(21)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash.support/index.js":21,"lodash._isnative":124}],124:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],125:[function(require,module,exports){
module.exports=require(26)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._baseisequal/node_modules/lodash._objecttypes/index.js":26}],126:[function(require,module,exports){
module.exports=require(34)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.keys/index.js":34,"lodash._isnative":127,"lodash._shimkeys":128,"lodash.isobject":129}],127:[function(require,module,exports){
module.exports=require(6)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash._basecreatecallback/node_modules/lodash._setbinddata/node_modules/lodash._isnative/index.js":6}],128:[function(require,module,exports){
module.exports=require(36)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.keys/node_modules/lodash._shimkeys/index.js":36,"lodash._objecttypes":125}],129:[function(require,module,exports){
module.exports=require(32)
},{"/Users/boennemann/Projects/uni/templatematching/node_modules/lodash.map/node_modules/lodash.createcallback/node_modules/lodash.isobject/index.js":32,"lodash._objecttypes":125}],130:[function(require,module,exports){
module.exports = function (tasks, cb) {
  var results, pending, keys
  if (Array.isArray(tasks)) {
    results = []
    pending = tasks.length
  } else {
    keys = Object.keys(tasks)
    results = {}
    pending = keys.length
  }

  function done (i, err, result) {
    results[i] = result
    if (--pending === 0 || err) {
      cb && cb(err, results)
      cb = null
    }
  }

  if (!pending) {
    // empty
    cb && cb(null, results)
    cb = null
  } else if (keys) {
    // object
    keys.forEach(function (key) {
      tasks[key](done.bind(undefined, key))
    })
  } else {
    // array
    tasks.forEach(function (task, i) {
      task(done.bind(undefined, i))
    })
  }
}

},{}],131:[function(require,module,exports){
'use strict'

var loaded = require('image-loaded')

var getImageData = require('./lib/imagedata')

var left = document.querySelector('#imgA')
var right = document.querySelector('#imgB')

require('run-parallel')([
  loaded.bind(null, left),
  loaded.bind(null, right),
], function() {
  var leftData = getImageData(left)
  var rightData = getImageData(right)

  require('./lib/differenceimage')(
    leftData,
    rightData
  )

  var correlation = require('./lib/correlation')(
    leftData,
    rightData
  )

  document.querySelector('#correlation').innerText = "\n"+
    "\nKorrelation: " + correlation.value +
    "\nKovarianz: " + correlation.covariance +
    "\nX: " + correlation.x +
    "\nY: " + correlation.y

  require('./lib/templatematching')(left, leftData)
})

},{"./lib/correlation":132,"./lib/differenceimage":133,"./lib/imagedata":134,"./lib/templatematching":135,"image-loaded":1,"run-parallel":130}],132:[function(require,module,exports){
'use strict'

var reduce = require('lodash.reduce')

var exports = module.exports = function(left, right) {
  var points = left.width * left.height
  left = exports.convertData(left)
  right = exports.convertData(right)

  var sumLeft = exports.sumData(left)
  var sumRight = exports.sumData(right)

  var squareLeft = exports.squareData(sumLeft)
  var squareRight = exports.squareData(sumRight)
  var square = exports.squareData(sumLeft, sumRight)

  var getStd = exports.getStd.bind(null, points)
  var getCovariance = exports.getCovariance.bind(null, points)

  var stdLeft = Math.sqrt(getStd(sumLeft, squareLeft))
  var stdRight = Math.sqrt(getStd(sumRight, squareLeft))
  var covariance = getCovariance(
    exports.sumCross(left, right),
    sumLeft,
    sumRight
  )

  return {
    value: covariance / stdLeft / stdRight,
    covariance: covariance,
    x: stdLeft,
    y: stdRight
  }
}

exports.convertData = function(data) {
  var output = []
  var rawData = data.data
  var points = data.width * data.height

  for (var i = 0; i < points; i+=4) {
    output.push({
      r: rawData[i],
      g: rawData[i+1],
      b: rawData[i+2]
    })
  }

  return output
}

exports.sumData = function(data) {
  return reduce(data, function(sum, data) {
    sum.r += data.r
    sum.g += data.g
    sum.b += data.b
    sum.r2 += data.r * data.r
    sum.g2 += data.g * data.g
    sum.b2 += data.b * data.b
    return sum
  }, {
    r: 0, g: 0, b: 0, r2: 0, g2: 0, b2: 0
  })
}

exports.sumCross = function(a, b) {
  return reduce(a, function(sum, data, idx) {
    sum.r += data.r * b[idx].r
    sum.g += data.g * b[idx].g
    sum.b += data.b * b[idx].b
    return sum
  }, {r: 0, g: 0, b: 0})
}


exports.squareData = function(a, b) {
  if (!b) b = a
  return {
    r: a.r * b.r,
    g: a.g * b.g,
    b: a.b * b.b
  }
}

exports.getStd = function(points, sum, square) {
  var points2 = Math.pow(points, 2)
  return sum.r2 / points +
    sum.g2 / points +
    sum.b2 / points -
    square.r / points2 -
    square.g / points2 -
    square.b / points2
}

exports.getCovariance = function(points, sumCross, sumLeft, sumRight) {
  var points2 = Math.pow(points, 2)
  return sumCross.r / points +
    sumCross.g / points +
    sumCross.b / points -
    sumLeft.r * sumRight.r / points2 -
    sumLeft.g * sumRight.g / points2 -
    sumLeft.b * sumRight.b / points2
}

},{"lodash.reduce":66}],133:[function(require,module,exports){
'use strict'

var map = require('lodash.map')

var exports = module.exports = function(left, right) {
  var difference = exports.difference.bind(null, left.data, right.data)

  var ctx = document
    .getElementById('difference')
    .getContext('2d')

  var image = ctx.getImageData(0, 0, 300, 300)

  // data[0] -> r, data[1] -> g, data[2] -> b, data[3] -> a
  // calculate difference except for alpha channel which is always 255
  image.data.set(map(image.data, function(point, idx) {
    if (!((idx+1)%4)) return 255
    return difference(idx)
  }))

  ctx.putImageData(image, 0, 0)
}

exports.difference = function(left, right, idx) {
  return Math.abs(left[idx] - right[idx])
}

},{"lodash.map":2}],134:[function(require,module,exports){
'use strict'

var canvas = document.createElement('canvas')
canvas.width = 300
canvas.height = 300

var ctx = canvas.getContext('2d')

module.exports = function getImageData(image) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

},{}],135:[function(require,module,exports){
'use strict'

var correlation = require('./correlation')

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')

var exports = module.exports = function(image, data) {
  var template = document.querySelector('#template')
  var result = document.querySelector('#template-result')

  var templateData = exports.getImagePortion(image, 150, 120, 30, 30)

  template
    .getContext('2d')
    .putImageData(templateData, 0, 0)

  var bestMatch = {value: Infinity}

  for (var i = 0; i < data.width; i += 30)
    for (var j = 0; j < data.height; j += 30) {
      var match = exports.compareCorrelation(image, templateData, i, j)
      if (exports.toOne(bestMatch) > exports.toOne(match)) {
        bestMatch = match
        bestMatch.coords = {
          x: i,
          y: j
        }
      }
    }

  var resultCtx = result.getContext('2d')
  resultCtx.putImageData(data, 0, 0)
  resultCtx.strokeStyle = 'pink'
  resultCtx.strokeRect(
      bestMatch.coords.x,
      bestMatch.coords.y,
      templateData.width,
      templateData.height
    )
}

exports.getImagePortion = function(data, x, y, width, height) {
  canvas.width = width
  canvas.height = height

  ctx.drawImage(data, x, y, width, height, 0, 0, width, height)

  return ctx.getImageData(0, 0, width, height)
}

exports.compareCorrelation = function(image, template, x, y) {
  var section = exports.getImagePortion(image, x, y, template.width, template.height)

  return correlation(section, template)
}

exports.toOne = function(match) {
  return Math.abs(match.value - 1)
}

},{"./correlation":132}]},{},[131]);
