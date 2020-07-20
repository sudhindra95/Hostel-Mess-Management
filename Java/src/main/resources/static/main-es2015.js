(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-methods.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/array-methods.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
// 0 -> Array#forEach
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
// 1 -> Array#map
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// 2 -> Array#filter
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// 3 -> Array#some
// https://tc39.github.io/ecma262/#sec-array.prototype.some
// 4 -> Array#every
// https://tc39.github.io/ecma262/#sec-array.prototype.every
// 5 -> Array#find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
// 6 -> Array#findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
module.exports = function (TYPE, specificCreate) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = specificCreate || arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: target.push(value);       // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection-strong.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/collection-strong.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fastKey = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").fastKey;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection-weak.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/collection-weak.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var getWeakData = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").getWeakData;
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var createArrayMethod = __webpack_require__(/*! ../internals/array-methods */ "./node_modules/core-js/internals/array-methods.js");
var $has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/collection.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var $export = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(a) {
        nativeMethod.call(this, a === 0 ? 0 : a);
        return this;
      } : KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : function set(a, b) {
        nativeMethod.call(this, a === 0 ? 0 : a, b);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (target, iterable) {
        anInstance(target, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), target, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js")(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('iterator');
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var document = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js").document;
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return exist ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/freezing.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/freezing.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js")(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('iterator');
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = typeof window == 'object' && window && window.Math == Math ? window
  : typeof self == 'object' && self && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/hide.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js") ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js").document;

module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js") && !__webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js")('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var split = ''.split;

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/internals/internal-metadata.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/internal-metadata.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var METADATA = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js")('meta');
var FREEZING = __webpack_require__(/*! ../internals/freezing */ "./node_modules/core-js/internals/freezing.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

__webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js")[METADATA] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var WeakMap = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js").WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('iterator');
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var BREAK = {};

var exports = module.exports = function (iterable, fn, that, ENTRIES, ITERATOR) {
  var boundFunction = bind(fn, that, ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result === BREAK) return BREAK;
      } return;
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    if (callWithSafeIterationClosing(iterator, boundFunction, step.value, ENTRIES) === BREAK) return BREAK;
  }
};

exports.BREAK = BREAK;


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Chrome 38 Symbol has incorrect toString conversion
module.exports = !__webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js")(function () {
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");
var WeakMap = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js").WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var IE_PROTO = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js")('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

__webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js")[IE_PROTO] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var nativeDefineProperty = Object.defineProperty;

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IE_PROTO = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js")('IE_PROTO');
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");
var ObjectPrototype = Object.prototype;

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var arrayIndexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js")(false);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = nativeGetOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var validateSetPrototypeOfArguments = __webpack_require__(/*! ../internals/validate-set-prototype-of-arguments */ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js");

module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var correctSetter = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    correctSetter = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    validateSetPrototypeOfArguments(O, proto);
    if (correctSetter) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var Reflect = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js").Reflect;

// all object keys, includes non-enumerable and symbols
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");


/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

__webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js")('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var C = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;
  if (DESCRIPTORS && C && !C[SPECIES]) defineProperty(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js")('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js")('keys');
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.0.1',
  mode: __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

module.exports = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) {
    throw TypeError("Can't set " + String(proto) + ' as a prototype');
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js")('wks');
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var Symbol = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js").Symbol;
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.map.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/es.map.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js")('Map', function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(/*! ../internals/collection-strong */ "./node_modules/core-js/internals/collection-strong.js"), true);


/***/ }),

/***/ "./node_modules/core-js/modules/es.set.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/es.set.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js")('Set', function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(/*! ../internals/collection-strong */ "./node_modules/core-js/internals/collection-strong.js"));


/***/ }),

/***/ "./node_modules/core-js/modules/es.weak-map.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es.weak-map.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
var weak = __webpack_require__(/*! ../internals/collection-weak */ "./node_modules/core-js/internals/collection-weak.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var enforceIternalState = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").enforce;
var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js")('WeakMap', wrapper, weak, true, true);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = weak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/add-consumption/add-consumption.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/add-consumption/add-consumption.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n  <div id=\"srs_logo\">\n    <img src=\"assets/images/srs.jpg\" height=\"90\">\n  </div>\n\n  <div id=\"srs_name\">\n      Sharada Residential School\n  </div>\n\n  <div id=\"hostel_name\">\n    (Madhava Nilaya Campus)\n  </div>\n\n  <div id=\"horizontal_nav\">\n\n    <a [routerLink]=\"['/dashboard']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">STOCK</p>\n      </div>\n    </a>\n\n  \n\n    <a [routerLink]=\"['/add-purchase']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">PURCHASE</p>\n      </div>\n    </a>\n\n    <a [routerLink]=\"['/add-consumption']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">CONSUMPTION</p>\n      </div>\n    </a>\n\n\n  </div>\n\n\n\n\n</div>\n\n\n<div class=\"body_content\">\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/add-consumption']\" [ngStyle]=\"{'background-color':bgcolor}\">\n    <div id=\"add_consumption\">\n      <p>ADD CONSUMPTION</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/view_consumption']\" [ngStyle]=\"{'background-color':backcolor}\"\n    (click)=\"changeBgColorAddPurchase()\">\n    <div id=\"view_consumption\">\n      <p>VIEW CONSUMPTION</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/modify_consumption']\">\n    <div id=\"modify_consumption\">\n      <p>MODIFY CONSUMPTION</p>\n    </div>\n  </a>\n\n  <hr id=\"line\" />\n\n  <div class=\"form-container\">\n    <form (ngSubmit)=\"postAddConsumptionData(testForm)\" #testForm=\"ngForm\" autocomplete=\"off\" ngNativeValidate>\n      <div id=\"form-heading\">\n        <p id=\"para-heading\">Enter your purchase details</p>\n      </div>\n\n      <div id=\"form_fields\">\n        <div id=\"date_field\" style=\"float:left\">\n          <label style=\"font-size: 12px;font-family: daimler !important;\">Date</label><br>\n          <input type=\"date\" id=\"form_data\" name=\"dateofconsumption\" [(ngModel)]=\"model.dateofconsumption\" max=\"{{mydate}}\" required/>\n        </div>\n\n        <div id=\"billno_field\" style=\"float:left; margin-left:75px;margin-top:19px;\">\n          <input type=\"text\" id=\"form_bnum\" placeholder=\" \" name=\"productname\" [(ngModel)]=\"model.productname\"\n          (keyup)=\"onKey($event)\" required #searchControl=\"ngModel\" #prodName/>\n          <span id=\"bnum_id\">Product Name</span>\n        </div>\n        <div class=\"dropdown-content\" [ngStyle]=\"{'display':display_dropdown}\"\n          [ngClass]=\"{'disabledClass':searchControl.errors?.required}\">\n          <div *ngFor='let product of productList;' [ngClass]=\"{'disabledClass':searchControl.errors?.required}\">\n            <a (click)=\"getUrlText(textValue.text)\" #textValue>{{product}}</a>\n          </div>\n\n        </div>\n\n        <div id=\"vendorname_field\" style=\"float:left; margin-left:75px;margin-top:19px;\">\n          <input type=\"number\" step=0.001 id=\"form_vname\" name=\"consumedquantity\" [(ngModel)]=\"model.consumedquantity\" placeholder=\" \" required />\n          <span id=\"vname_id\">Consumed Quantity</span>\n        </div>\n\n\n        <button class=\"reset_button\" type=\"reset\">CANCEL</button>\n\n        <button class=\"submit_button\" type=\"submit\" [disabled]=\"testForm.invalid\" [class.disabledSubmit]=\"testForm.invalid\">SUBMIT</button>\n\n      </div>\n\n    </form>\n  </div>\n\n\n\n  <div class=\"footer\">\n    <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n      Reserved.</p>\n  </div>\n\n\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!-- <div class=\"header\">\n  <div id=\"srs_logo\">\n   <img src=\"assets/images/srs.jpg\" >\n </div> \n\n <div id=\"srs_text\">\n   <p style=\"margin-left: 20px\">Sharada Residential School</p>\n </div>\n \n</div>\n\n<div class=\"product_data\">\n<div id=\"heading\">\n  <h3 style=\"font-family: Segoe UI;color:white; text-align: center;\">Enter your product details</h3>\n</div>\n\n</div>\n\n\n<div class=\"consumption_data\">\n  <div id=\"heading\">\n    <h3 style=\"font-family: Segoe UI;color:white; text-align: center;\">Enter your consumption details</h3>\n  </div>\n\n  <form (ngSubmit)=\"postAddConsumptionData()\" #testForm=\"ngForm\" >\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Product Name:</font> <input type=\"text\" name=\"productName\" [(ngModel)]=\"model.productName\" style=\"height:20px;width:261px;margin-left: 11px\"><br><br><br>\n    \n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Consumed Quantity:</font><input type=\"number\" name=\"consumedQuantity\" [(ngModel)]=\"model.consumedQuantity\" min=\"0\" style=\"height:20px;width:262px;margin-left: 37px\"  [(ngModel)]='quantity'  (keyup)=\"onKey(q.value)\"  (change)=\"myMethod(q.value)\" #q name=\"quantity\"><br><br><br>\n\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Date:</font><input type=\"date\" name=\"dateOfConsumption\" [(ngModel)]=\"model.dateOfConsumption\" style=\"height:20px;width:258px;margin-left: 68px\"><br><br><br>\n\n\n    <p><button type=\"submit\" class=\"button1\" >Submit</button></p>\n\n    <p><button  class=\"button2\" type=\"reset\">Cancel</button></p>\n\n    <br><br><br>\n\n  </form>\n\n</div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/add-purchase/add-purchase.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/add-purchase/add-purchase.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n  <div id=\"srs_logo\">\n    <img src=\"assets/images/srs.jpg\" height=\"90\">\n  </div>\n\n  <div id=\"srs_name\">\n      Sharada Residential School\n  </div>\n\n  <div id=\"hostel_name\">\n    (Madhava Nilaya Campus)\n  </div>\n\n  <div id=\"horizontal_nav\">\n\n    <a [routerLink]=\"['/dashboard']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">STOCK</p>\n      </div>\n    </a>\n\n    <!-- <a [routerLink] = \"['/add-product']\">\n        <div id=\"srs_text\">\n          <p id=\"horizontal_options\">ADD PRODUCT</p>\n        </div>\n      </a> -->\n\n    <a [routerLink]=\"['/add-purchase']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">PURCHASE</p>\n      </div>\n    </a>\n\n    <a [routerLink]=\"['/add-consumption']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">CONSUMPTION</p>\n      </div>\n    </a>\n\n  </div>\n\n\n\n\n</div>\n\n\n<div class=\"body_content\">\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/add-purchase']\" [ngStyle]=\"{'background-color':bgcolor}\">\n    <div id=\"add_purchase\">\n      <p>ADD PURCHASE</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/view_purchase']\" [ngStyle]=\"{'background-color':backcolor}\"\n    (click)=\"changeBgColorAddPurchase()\">\n    <div id=\"view_purchase\">\n      <p>VIEW PURCHASE</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/modify_purchase']\">\n    <div id=\"modify_purchase\">\n      <p>MODIFY PURCHASE</p>\n    </div>\n  </a>\n\n  <hr id=\"line\" />\n\n  <div class=\"form-container\">\n    <form (ngSubmit)=\"postPurchaseData(testForm)\" #testForm=\"ngForm\" autocomplete=\"off\" ngNativeValidate>\n      <div id=\"form-heading\">\n        <p id=\"para-heading\">Enter your purchase details</p>\n      </div>\n\n      <div id=\"form_fields\">\n        <div id=\"date_field\" style=\"float:left\">\n          <label style=\"font-size: 12px;font-family: daimler !important;\">Date</label><br>\n          <input type=\"date\" id=\"form_data\" name=\"date\" [(ngModel)]=\"model.date\" max=\"{{mydate}}\" required\n            #dateControl=\"ngModel\" [ngClass]=\"{'disabledClass':dateControl.errors?.required}\" />\n        </div>\n\n        <div id=\"billno_field\" style=\"float:left; margin-top:140px;\"><!--forother laptop margin-top:140px;-->\n          <input type=\"text\" id=\"form_bnum\" name=\"billnumber\" [(ngModel)]=\"model.billnumber\" placeholder=\" \" required\n            #billnumberControl=\"ngModel\" [ngClass]=\"{'disabledClass':billnumberControl.errors?.required}\" />\n          <span id=\"bnum_id\">Bill Number</span>\n        </div>\n\n        <div id=\"billno_field\" style=\"float:left; margin-left:75px;margin-top:140px;\"><!--forother laptop margin-top:140px;-->\n          <input type=\"text\" id=\"form_pname\" name=\"productname\" [(ngModel)]=\"model.productname\" placeholder=\" \"\n            (keyup)=\"searchProducts($event)\" required #productnameControl=\"ngModel\"\n            [ngClass]=\"{'disabledClass':productnameControl.errors?.required}\" />\n          <span id=\"pname_id\">Product Name</span>\n        </div>\n        <div class=\"dropdown-content\" [ngStyle]=\"{'display':display_dropdown}\"\n          [ngClass]=\"{'disabledClass':productnameControl.errors?.required}\">\n          <div *ngFor='let product of productList;' [ngClass]=\"{'disabledClass':productnameControl.errors?.required}\">\n            <a (click)=\"getUrlText(textValue.text)\" #textValue>{{product}}</a>\n          </div>\n\n        </div>\n\n        <div id=\"vendorname_field\" style=\"float:left; margin-left:75px;margin-top:140px;\"><!--forother laptop margin-top:140px;-->\n          <input type=\"text\" id=\"form_vname\" name=\"vendorname\" [(ngModel)]=\"model.vendorname\" placeholder=\" \" required\n          (keyup)=\"searchVendors($event)\" #vendornameControl=\"ngModel\" [ngClass]=\"{'disabledClass':vendornameControl.errors?.required}\" />\n          <span id=\"vname_id\">Vendor Name</span>\n        </div>\n        <div class=\"dropdown-content1\" [ngStyle]=\"{'display':display_dropdown1}\" [ngClass]=\"{'disabledClass':vendornameControl.errors?.required}\" >\n          <div  *ngFor='let vendor of vendorList;' [ngClass]=\"{'disabledClass':vendornameControl.errors?.required}\">\n              <a (click)=\"getUrlTextForVendors(textValue.text)\" #textValue>{{vendor}}</a>\n          </div>\n          \n        </div>\n\n        <div id=\"price_field\" style=\"margin-top:270px; \"><!--forother laptop margin-top:270px;-->\n          <input type=\"number\" step=0.01 min=0 id=\"form_price\" name=\"price\" [(ngModel)]=\"model.price\" placeholder=\" \"\n            [(ngModel)]='price' (keyup)=\"onPriceKey(p.value)\" (change)=\"PriceChange(p.value)\" #p required\n            #priceControl=\"ngModel\" [ngClass]=\"{'disabledClass':priceControl.errors?.required}\" />\n          <span id=\"price_id\">Price</span>\n        </div>\n\n        <div id=\"price_field\" style=\"float:left;margin-left:75px; \">\n          <input type=\"number\" step=0.001 id=\"form_quantity\" name=\"quantity\" [(ngModel)]=\"model.quantity\" min=\"0\"\n            (keyup)=\"onQuantityKey(q.value)\" (change)=\"QuantityChange(q.value)\" [(ngModel)]='quantity' #q placeholder=\" \" required\n            #quantityControl=\"ngModel\" [ngClass]=\"{'disabledClass':quantityControl.errors?.required}\" />\n          <span id=\"quantity_id\">Quantity</span>\n        </div>\n\n        <div id=\"price_field\" style=\"float:left;margin-left:75px; \">\n          <input type=\"number\" min=\"0\" id=\"form_amount\" name=\"amount\" [(ngModel)]=\"model.amount\" value='{{amount}}'\n            readonly placeholder=\" \" />\n          <span id=\"amount_id\">Amount</span>\n        </div>\n\n        <button class=\"reset_button\" type=\"reset\">CANCEL</button>\n\n        <button class=\"submit_button\" type=\"submit\" [disabled]=\"testForm.invalid\"\n          [class.disabledSubmit]=\"testForm.invalid\">SUBMIT</button>\n\n      </div>\n\n    </form>\n  </div>\n\n\n\n  <div class=\"footer\">\n    <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n      Reserved.</p>\n  </div>\n\n\n</div>\n\n\n\n\n\n<!-- <div class=\"purchase_data\">\n  <div id=\"heading\">\n    <h3 style=\"font-family: Segoe UI;color:white; text-align: center;\">Enter your purchase details</h3>\n  </div>\n\n  <form (ngSubmit)=\"postPurchaseData()\" #testForm=\"ngForm\" >\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Date:</font><input type=\"date\" name=\"date\" [(ngModel)]=\"model.date\" style=\"height:20px;width:258px;margin-left: 68px\"><br><br><br>\n\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Bill number:</font> <input type=\"text\" name=\"billNumber\" [(ngModel)]=\"model.billNumber\" style=\"height:20px;width:261px;margin-left: 11px\"><br><br><br>\n\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Vendor Name:</font> <input type=\"text\" name=\"vendorName\" [(ngModel)]=\"model.vendorName\" style=\"height:20px;width:261px;margin-left: 11px\"><br><br><br>\n\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Price:</font> <input type=\"text\"  name=\"price\" [(ngModel)]=\"model.price\" style=\"height:20px;width:261px;margin-left: 63px\"  [(ngModel)]='price' name=\"price\"><br><br><br>\n\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Quantity:</font><input type=\"number\" name=\"quantity\" [(ngModel)]=\"model.quantity\" min=\"0\" style=\"height:20px;width:262px;margin-left: 37px\"  [(ngModel)]='quantity'  (keyup)=\"onKey(q.value)\"  (change)=\"myMethod(q.value)\" #q name=\"quantity\"><br><br><br>\n\n    <font style=\"font-family: 'Segoe UI';font-size:18px;margin-left:57px;\">Amount:</font><input type=\"text\" name=\"amount\" [(ngModel)]=\"model.amount\" style=\"height:20px;width:264px;margin-left: 40px\" value='{{amount}}' readonly><br><br><br>\n\n    <p><button type=\"submit\" class=\"button1\" >Submit</button></p>\n\n    <p><button  class=\"button2\" type=\"reset\">Cancel</button></p>\n\n    <br><br><br>\n\n  </form>\n\n</div> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/dashboard/dashboard.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/dashboard/dashboard.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n  <div id=\"srs_logo\">\n    <img src=\"assets/images/srs.jpg\" height=\"90\">\n  </div>\n\n  <div id=\"srs_name\">\n    Sharada Residential School    \n  </div>\n\n  <div id=\"hostel_name\">\n    (Madhava Nilaya Campus)\n  </div>\n\n  <div id=\"horizontal_nav\">\n\n    <a [routerLink]=\"['/dashboard']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">STOCK</p>\n      </div>\n    </a>\n\n\n    <a [routerLink]=\"['/add-purchase']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">PURCHASE</p>\n      </div>\n    </a>\n\n    <a [routerLink]=\"['/add-consumption']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">CONSUMPTION</p>\n      </div>\n    </a>\n\n\n  </div>\n\n\n\n\n</div>\n\n\n\n\n<div class=\"body_content\">\n\n  <a style=\"text-decoration: none\" [routerLink]=\"\">\n    <div id=\"view_purchase\">\n      <p>STOCK REGISTER</p>\n    </div>\n  </a>\n\n  <hr id=\"line\" />\n\n  <form (ngSubmit)=\"findStockData()\" #testForm=\"ngForm\" ngNativeValidate>\n    <div id=\"billno_field\" style=\"float:left;  margin-left:240px;margin-top:30px;\">\n      <input type=\"date\" id=\"form_bnum\" [(ngModel)]=\"Dates.fromDate\" name=\"Dates.fromDate\" max=\"{{mydate}}\"\n        (change)=\"changeItem()\" placeholder=\" \" required #fromdateControl=\"ngModel\"\n        [ngClass]=\"{'disabledClass':fromdateControl.errors?.required}\" />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">From Date</span>\n    </div>\n\n    <div id=\"billno_field\" style=\"float:left;  margin-left:100px;margin-top:30px;\">\n      <input type=\"date\" id=\"form_bnum\" [(ngModel)]=\"Dates.toDate\" name=\"Dates.toDate\" max=\"{{mydate}}\"\n        (change)=\"changeItem()\" placeholder=\" \" required #todateControl=\"ngModel\"\n        [ngClass]=\"{'disabledClass':todateControl.errors?.required}\" />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">To Date</span>\n    </div>\n\n    <button class=\"reset_button\" type=\"reset\" (click)=\"clearResultField()\">CANCEL</button>\n\n    <button class=\"submit_button\" type=\"submit\" [disabled]=\"testForm.invalid\"\n      [class.disabledSubmit]=\"testForm.invalid\">SUBMIT</button>\n  </form>\n\n  <ng-container>\n    <div *ngIf=\"!show\" [ngStyle]=\"{'display':display_mode}\">\n      <div class=\"table-heading-container\">\n        <table>\n          <thead>\n            <tr>\n              <th colspan=\"6\">\n                <i class=\"fas fa-calendar\" style=\"float: left;margin-left: 30px;margin-top:5px\"></i>\n                <label style=\"float: left;margin-left: 150px;margin-top:7px\">Stock Data </label>\n                <label style=\"float:right;margin-right: 10px;margin-top:7px;font-size: 14px;\">Export Excel</label>\n                <a href=\"http://localhost:9090/webapp/downloadStockReport\">\n                  <img src=\"assets/images/excel.jpg\" height=\"30\"\n                    style=\"float: right;margin-right: 10px;cursor: pointer;\">\n                </a>\n\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;height:25px\">\n                <label style=\"margin-left: 62px;\">Date</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 25px;\">Opening Stock <span id=\"inkgs\">(kgs)</span></label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"float:right;margin-right: 20px;\" [ngStyle]=\"{'margin-top':margin_top_onclick}\"><i\n                    class=\"fas fa-sort-alpha-down\" style=\"cursor: pointer;margin-right: 8px;margin-top:2px;\"\n                    (click)=\"sortByProductName()\"></i>Product Name <i class=\"fas fa-filter\"\n                    style=\"cursor: pointer;margin-left: 2px;\" (click)=\"filterProductName()\"></i></label>\n                <div id=\"filtertext\" [ngStyle]=\"{'display':display_filtertextbox}\">\n                  <input type=\"text\" id=\"filtertextbox\" placeholder=\"type text to filter...\" #filtertextvalue />\n                  <div id=\"filter_submit\" (click)=\"getFilteredList(filtertextvalue.value)\"><i class=\"fas fa-angle-right\"\n                      aria-hidden=\"true\" style=\"margin-left:5px;margin-top:2px;cursor:pointer\"></i></div>\n                </div>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 20px;\">Goods Received <span id=\"inkgs\">(kgs)</span></label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 2px;\">Consumed Quantity <span id=\"inkgs\">(kgs)</span></label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 25px;\">Closing Stock <span id=\"inkgs\">(kgs)</span></label>\n              </td>\n            </tr>\n\n          </tbody>\n        </table>\n      </div>\n\n      <div *ngIf=\"lessthan12\" class=\"table-container\" [ngStyle]=\"{'margin-top':table_container_marg_top}\">\n        <table>\n          <tbody>\n            <tr *ngFor='let stock of stockList;'>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.date}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.openingstock}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.productname}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.goodsreceived}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.consumedquantity}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.closingstock}}</label>\n              </td>\n            </tr>\n\n          </tbody>\n        </table>\n      </div>\n\n      <div *ngIf=\"greaterthan12\" class=\"table-container1\" [ngStyle]=\"{'margin-top':table_container_marg_top}\">\n        <table>\n          <tbody>\n            <tr *ngFor='let stock of stockList;'>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.date}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.openingstock}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.productname}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.goodsreceived}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.consumedquantity}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{stock.closingstock}}</label>\n              </td>\n            </tr>\n\n          </tbody>\n        </table>\n      </div>\n\n    </div>\n  </ng-container>\n\n  <br>\n  <div *ngIf=\"show\" >\n    <ul>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n    </ul>\n  </div>\n  <div *ngIf=\"isErrorMessage\" [ngStyle]=\"{'display':isErrorMessage ? 'block': 'none'}\"\n    style=\"margin-left: 585px;margin-top:350px;color:red;font-size:26px;position:absolute;font-family: daimler!important\">\n    {{errorMessage}}\n  </div>\n\n\n  <div class=\"footer\">\n    <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n      Reserved.</p>\n  </div>\n\n\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/modify-consumption/modify-consumption.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/modify-consumption/modify-consumption.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n    <div id=\"srs_logo\">\n        <img src=\"assets/images/srs.jpg\" height=\"90\">\n    </div>\n\n    <div id=\"srs_name\">\n        Sharada Residential School\n    </div>\n\n    <div id=\"hostel_name\">\n        (Madhava Nilaya Campus)\n    </div>\n\n    <div id=\"horizontal_nav\">\n\n        <a [routerLink]=\"['/dashboard']\">\n            <div id=\"srs_text\">\n                <p id=\"horizontal_options\">STOCK</p>\n            </div>\n        </a>\n\n\n        <a [routerLink]=\"['/add-purchase']\">\n            <div id=\"srs_text\">\n                <p id=\"horizontal_options\">PURCHASE</p>\n            </div>\n        </a>\n\n        <a [routerLink]=\"['/add-consumption']\">\n            <div id=\"srs_text\">\n                <p id=\"horizontal_options\">CONSUMPTION</p>\n            </div>\n        </a>\n\n\n\n    </div>\n\n\n\n\n</div>\n\n\n<div class=\"body_content\">\n\n    <a style=\"text-decoration: none\" [routerLink]=\"['/add-consumption']\">\n        <div id=\"add_consumption\">\n            <p>ADD CONSUMPTION</p>\n        </div>\n    </a>\n\n    <a style=\"text-decoration: none\" [routerLink]=\"['/view_consumption']\">\n        <div id=\"view_consumption\">\n            <p>VIEW CONSUMPTION</p>\n        </div>\n    </a>\n\n    <a style=\"text-decoration: none\" [routerLink]=\"['/modify_consumption']\">\n        <div id=\"modify_consumption\">\n            <p>MODIFY CONSUMPTION</p>\n        </div>\n    </a>\n\n    <hr id=\"line\" />\n\n    <br><br><br><br><br><br><br>\n    <button class=\"save_button\" (click)=\"saveData()\" style=\"float:right;margin-right: 130px;margin-top:180px\">Save\n    </button>\n\n    <div *ngIf=\"show\" class=\"loader\"></div>\n\n    <div *ngIf=\"isErrorMessage\" [ngStyle]=\"{'display':isErrorMessage ? 'block': 'none'}\"\n    style=\"margin-left: 585px;margin-top:100px;color:red;font-size:26px;position:absolute;font-family: daimler!important\">\n    {{errorMessage}}\n    </div>  \n\n    <div [ngStyle]=\"{'display':display_sheet}\">\n\n        <div\n            style=\"height:420px;width:950px;overflow: scroll;overflow-x: hidden;overflow-y: hidden;;margin-left:240px;\">\n\n            <hot-table #hot [hotId]=\"instance\" [columns]=\"columns\" [colHeaders]=\"colHeaders\" [data]=\"dataBank\"\n                [settings]=\"settings\" id=\"example1\">\n            </hot-table>\n\n\n\n        </div>\n\n    </div>\n\n\n\n\n\n    <div class=\"footer\">\n        <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n            Reserved.</p>\n    </div>\n\n\n\n\n\n\n\n\n\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/modify-purchase/modify-purchase.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/modify-purchase/modify-purchase.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n    <div id=\"srs_logo\">\n        <img src=\"assets/images/srs.jpg\" height=\"90\">\n    </div>\n\n    <div id=\"srs_name\">\n        Sharada Residential School\n    </div>\n\n    <div id=\"hostel_name\">\n        (Madhava Nilaya Campus)\n    </div>\n\n    <div id=\"horizontal_nav\">\n\n        <a [routerLink]=\"['/dashboard']\">\n            <div id=\"srs_text\">\n                <p id=\"horizontal_options\">STOCK</p>\n            </div>\n        </a>\n\n        <!-- <a [routerLink] = \"['/add-product']\">\n        <div id=\"srs_text\">\n          <p id=\"horizontal_options\">ADD PRODUCT</p>\n        </div>\n      </a> -->\n\n        <a [routerLink]=\"['/add-purchase']\">\n            <div id=\"srs_text\">\n                <p id=\"horizontal_options\">PURCHASE</p>\n            </div>\n        </a>\n\n        <a [routerLink]=\"['/add-consumption']\">\n            <div id=\"srs_text\">\n                <p id=\"horizontal_options\">CONSUMPTION</p>\n            </div>\n        </a>\n\n\n\n    </div>\n\n\n\n\n</div>\n\n\n<div class=\"body_content\">\n\n    <a style=\"text-decoration: none\" [routerLink]=\"['/add-purchase']\">\n        <div id=\"add_purchase\">\n            <p>ADD PURCHASE</p>\n        </div>\n    </a>\n\n    <a style=\"text-decoration: none\" [routerLink]=\"['/view_purchase']\">\n        <div id=\"view_purchase\">\n            <p>VIEW PURCHASE</p>\n        </div>\n    </a>\n\n    <a style=\"text-decoration: none\" [routerLink]=\"['/view_purchase']\">\n        <div id=\"modify_purchase\">\n            <p>MODIFY PURCHASE</p>\n        </div>\n    </a>\n\n    <hr id=\"line\" />\n\n    <br><br><br><br><br><br><br>\n    <button class=\"save_button\" (click)=\"saveData()\"\n        style=\"float:right;margin-right: 130px;margin-top:180px;cursor:pointer\">Save\n    </button>\n\n    <div *ngIf=\"show\" class=\"loader\"></div>\n\n    <div *ngIf=\"isErrorMessage\" [ngStyle]=\"{'display':isErrorMessage ? 'block': 'none'}\"\n    style=\"margin-left: 585px;margin-top:100px;color:red;font-size:26px;position:absolute;font-family: daimler!important\">\n    {{errorMessage}}\n    </div>    \n\n    <div [ngStyle]=\"{'display':display_sheet}\">\n        <div\n            style=\"height:420px;width:950px;overflow: scroll;overflow-x: hidden;overflow-y: hidden;;margin-left:240px;\">\n\n            <hot-table #hot [hotId]=\"instance\" [columns]=\"columns\" [colHeaders]=\"colHeaders\" [data]=\"dataBank\"\n                [settings]=\"settings\" id=\"example1\">\n            </hot-table>\n\n        </div>\n\n\n    </div>\n\n\n\n\n\n\n\n\n\n\n    <div class=\"footer\">\n        <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n            Reserved.</p>\n    </div>\n\n\n\n\n\n\n\n\n\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/view-consumption/view-consumption.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/view-consumption/view-consumption.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n  <div id=\"srs_logo\">\n    <img src=\"assets/images/srs.jpg\" height=\"90\">\n  </div>\n\n  <div id=\"srs_name\">\n    Sharada Residential School\n  </div>\n\n  <div id=\"hostel_name\">\n    (Madhava Nilaya Campus)\n  </div>\n\n  <div id=\"horizontal_nav\">\n\n    <a [routerLink]=\"['/dashboard']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">STOCK</p>\n      </div>\n    </a>\n\n    <a [routerLink]=\"['/add-purchase']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">PURCHASE</p>\n      </div>\n    </a>\n\n    <a [routerLink]=\"['/add-consumption']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">CONSUMPTION</p>\n      </div>\n    </a>\n\n\n\n  </div>\n\n\n\n\n</div>\n\n<div class=\"body_content\">\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/add-consumption']\">\n    <div id=\"add_consumption\">\n      <p>ADD CONSUMPTION</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/view_consumption']\">\n    <div id=\"view_consumption\">\n      <p>VIEW CONSUMPTION</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/modify_consumption']\">\n    <div id=\"modify_consumption\">\n      <p>MODIFY CONSUMPTION</p>\n    </div>\n  </a>\n\n  <hr id=\"line\" />\n\n  <form (ngSubmit)=\"findConsumptionData(prodName.value)\" #testForm=\"ngForm\" autocomplete=\"off\">\n    <div id=\"billno_field\" style=\"float:left; position:absolute; margin-left:240px;margin-top:135px;\">\n      <input type=\"text\" id=\"form_bnum\" placeholder=\" \" name=\"productName\" [(ngModel)]=\"model.productName\"\n        (keyup)=\"onKey($event)\" #searchControl=\"ngModel\" #prodName />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">Product Name</span>\n    </div>\n    <div class=\"dropdown-content\" [ngStyle]=\"{'display':display_dropdown}\"\n      [ngClass]=\"{'disabledClass':searchControl.errors?.required}\">\n      <div *ngFor='let product of productList;' [ngClass]=\"{'disabledClass':searchControl.errors?.required}\">\n        <a (click)=\"getUrlText(textValue.text)\" #textValue>{{product}}</a>\n      </div>\n\n    </div>\n\n    <div id=\"billno_field\" style=\"float:left; position:absolute; margin-left:550px;margin-top:137px;\">\n      <input type=\"date\" id=\"form_bnum\" placeholder=\" \" (change)=\"changeItem()\" [(ngModel)]=\"Dates.fromDate\" name=\"Dates.fromDate\"\n        max=\"{{mydate}}\" required />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">From Date</span>\n\n    </div>\n\n    <div id=\"billno_field\" style=\"float:left; position:absolute; margin-left:790px;margin-top:137px;\">\n      <input type=\"date\" id=\"form_bnum\" placeholder=\" \" (change)=\"changeItem()\" [(ngModel)]=\"Dates.toDate\" name=\"Dates.toDate\" max=\"{{mydate}}\"\n        required />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">To Date</span>\n    </div>\n\n    <button class=\"reset_button\" type=\"reset\" (click)=\"erase()\">CANCEL</button>\n\n    <button class=\"submit_button\" type=\"submit\" [disabled]=\"testForm.invalid\"\n      [class.disabledSubmit]=\"testForm.invalid\">SUBMIT</button>\n\n  </form>\n\n  <label\n    style=\"margin-left:240px;font-style:italic;font-size: 8pt;margin-top:8px;font-family: daimler!important\">(optional)</label>\n\n\n  <ng-container>\n    <div class=\"consumption-table-container\" [ngStyle]=\"{'display':display_mode}\">\n      <div class=\"table-heading-container\" [ngStyle]=\"{'display':display_table_header}\">\n        <table>\n          <thead>\n            <tr>\n              <th colspan=\"6\">\n                <i class=\"fas fa-user\" style=\"float: left;margin-left: 30px;margin-top:5px\"></i>\n                <label style=\"float: left;margin-left: 30px;margin-top:7px\">{{product_name_typed}}</label>\n                <label style=\"float:right;margin-right: 10px;margin-top:7px;font-size: 14px;\">Export Excel</label>\n                <a (click)=\"downloadFile()\" href=\"{{download_url}}\">\n                  <img src=\"assets/images/excel.jpg\" height=\"30\"\n                    style=\"float: right;margin-right: 10px;cursor: pointer;\">\n                </a>\n              </th>\n            </tr>\n          </thead>\n        </table>\n        <div *ngIf=\"productNameIsEntered\">\n          <table>\n            <tr>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;height:25px\">\n                <label style=\"margin-left: 32px;\">Date of Consumption</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Consumed Quantity<span id=\"inkgs\">&nbsp;(kgs)</span></label>\n              </td>\n            </tr>\n          </table>\n        </div>\n        <div *ngIf=\"productNameIsNotEntered\">\n          <table>\n            <tr>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;height:25px\">\n                <label style=\"margin-left: 32px;\">Date of Consumption</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;height:25px\">\n                <label style=\"margin-left: 32px;\">Product Name</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Consumed Quantity<span id=\"inkgs\">&nbsp;(kgs)</span></label>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <div *ngIf=\"productNameIsEntered_1\">\n        <div *ngIf=\"lessthan12\" class=\"table-container\">\n          <table>\n            <tbody>\n              <tr *ngFor='let consumption of consumptionList;'>\n                <td style=\"height:25px;width:515px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.dateofconsumption  | date: 'dd/MM/yyyy'}}</label>\n                </td>\n\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.consumedquantity}}</label>\n                </td>\n              </tr>\n              <tr>\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;;font-weight:bold \">Total Consumed</label>\n                </td>\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;;font-weight:bold \">{{totalconsumed}}</label>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div *ngIf=\"greaterthan12\" class=\"table-container1\">\n          <table>\n            <tbody>\n              <tr *ngFor='let consumption of consumptionList;'>\n                <td style=\"height:25px;width:515px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.dateofconsumption  | date: 'dd/MM/yyyy'}}</label>\n                </td>\n\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.consumedquantity}}</label>\n                </td>\n              </tr>\n              <tr>\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;font-weight:bold \">Total Consumed</label>\n                </td>\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;font-weight:bold\">{{totalconsumed}}</label>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      <div *ngIf=\"productNameIsNotEntered_1\">\n        <div *ngIf=\"lessthan12\" class=\"table-container\">\n          <table>\n            <tbody>\n              <tr *ngFor='let consumption of consumptionList;'>\n                <td style=\"height:25px;width:380px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.dateofconsumption  | date: 'dd/MM/yyyy'}}</label>\n                </td>\n                <td style=\"height:25px;width:279px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.productname}}</label>\n                </td>\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.consumedquantity}}</label>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div *ngIf=\"greaterthan12\" class=\"table-container1\">\n          <table>\n            <tbody>\n              <tr *ngFor='let consumption of consumptionList;'>\n                <td style=\"height:25px;width:380px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.dateofconsumption  | date: 'dd/MM/yyyy'}}</label>\n                </td>\n                <td style=\"height:25px;width:279px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.productname}}</label>\n                </td>\n                <td style=\"height:25px\">\n                  <label style=\"margin-left: 32px;\">{{consumption.consumedquantity}}</label>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n\n    </div>\n  </ng-container>\n\n  <br>\n  <div *ngIf=\"show\">\n    <ul>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n    </ul>\n  </div>\n\n\n  <div *ngIf=\"isErrorMessage\"\n    style=\"margin-left: 585px;margin-top:100px;color:red;font-size:26px;font-family: daimler!important\">\n    {{errorMessage}}\n  </div>\n\n\n  <div class=\"footer\">\n    <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n      Reserved.</p>\n  </div>\n\n\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/view-purchase/view-purchase.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/view-purchase/view-purchase.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"> -->\n<div class=\"header\">\n  <div id=\"srs_logo\">\n    <img src=\"assets/images/srs.jpg\" height=\"90\">\n  </div>\n\n  <div id=\"srs_name\">\n    Sharada Residential School\n  </div>\n\n  <div id=\"hostel_name\">\n    (Madhava Nilaya Campus)\n  </div>\n\n  <div id=\"horizontal_nav\">\n\n    <a [routerLink]=\"['/dashboard']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">STOCK</p>\n      </div>\n    </a>\n\n\n\n    <a [routerLink]=\"['/add-purchase']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">PURCHASE</p>\n      </div>\n    </a>\n\n    <a [routerLink]=\"['/add-consumption']\">\n      <div id=\"srs_text\">\n        <p id=\"horizontal_options\">CONSUMPTION</p>\n      </div>\n    </a>\n\n\n\n  </div>\n\n\n\n\n</div>\n\n\n\n\n<div class=\"body_content\">\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/add-purchase']\">\n    <div id=\"add_purchase\">\n      <p>ADD PURCHASE</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/view_purchase']\">\n    <div id=\"view_purchase\">\n      <p>VIEW PURCHASE</p>\n    </div>\n  </a>\n\n  <a style=\"text-decoration: none\" [routerLink]=\"['/modify_purchase']\">\n    <div id=\"modify_purchase\">\n      <p>MODIFY PURCHASE</p>\n    </div>\n  </a>\n\n  <hr id=\"line\" />\n\n  <form autocomplete=\"off\">\n    <div id=\"billno_field\" style=\"float:left; position:absolute; margin-left:244px;margin-top:137px;\">\n      <input type=\"date\" id=\"form_bnum\" placeholder=\" \" (change)=\"changeItem()\" [(ngModel)]=\"Dates.fromDate\" name=\"Dates.fromDate\"\n        max=\"{{mydate}}\" #fdate required />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">From Date</span>\n    </div>\n\n    <div id=\"billno_field\" style=\"float:left; position:absolute; margin-left:620px;margin-top:137px;\">\n      <input type=\"date\" id=\"form_bnum\" placeholder=\" \" (change)=\"changeItem()\" [(ngModel)]=\"Dates.toDate\" name=\"Dates.toDate\" max=\"{{mydate}}\"\n        #tdate required />\n      <!-- <button class=\"btn\"><i class=\"fa fa-search\"></i></button> -->\n      <span id=\"searchPurchase_id\">To Date</span>\n    </div>\n\n    <div class=\"autocmplete\" style=\"float:left; position:absolute; margin-left:990px;margin-top:135px;\">\n      <input type=\"text\" id=\"form_bnum\" placeholder=\" \" name=\"search\" [(ngModel)]=\"model.search\"\n        (keydown.backspace)=\"textAreaEmpty($event)\" (keyup)=\"onKey($event)\" required #searchControl=\"ngModel\" />\n      <span id=\"searchPurchase_id\">Search Vendor</span>\n      <i class=\"fas fa-search\" id=\"search\"\n        [ngStyle]=\"{'opacity':opacity_property,'color':color_property,'pointer-events':cursor_property}\"\n        (click)=\"findPurchaseData()\"></i>\n    </div>\n    <div class=\"dropdown-content\" [ngStyle]=\"{'display':display_dropdown}\"\n      [ngClass]=\"{'disabledClass':searchControl.errors?.required}\">\n      <div *ngFor='let vendor of vendorList;' [ngClass]=\"{'disabledClass':searchControl.errors?.required}\">\n        <a (click)=\"getUrlText(textValue.text)\" #textValue>{{vendor}}</a>\n      </div>\n\n    </div>\n  </form>\n\n  <ng-container>\n    <div *ngIf=\"!show\" [ngStyle]=\"{'display':display_mode}\">\n      <div class=\"table-heading-container\">\n        <table>\n          <thead>\n            <tr>\n              <th colspan=\"6\">\n                <i class=\"fas fa-user\" style=\"float: left;margin-left: 30px;margin-top:5px\"></i>\n                <label style=\"float: left;margin-left: 30px;margin-top:7px\">{{model.search}}</label>\n                <label style=\"float:right;margin-right: 10px;margin-top:7px;font-size: 14px;\">Export Excel</label>\n                <a href=\"http://localhost:9090/webapp/downloadPurchaseReport\">\n                  <img src=\"assets/images/excel.jpg\" height=\"30\"\n                    style=\"float: right;margin-right: 10px;cursor: pointer;\" (click)=\"openFile();\">\n                </a>\n              </th>\n            </tr>\n          </thead>\n\n          <tbody>\n            <tr>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;height:25px\">\n                <label style=\"margin-left: 32px;\">Date</label>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Bill Number</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Product Name</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Price</label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Quantity<span id=\"inkgs\">&nbsp;(kgs)</span></label>\n              </td>\n              <td style=\"background-color: rgb(201, 212, 248);font-weight: bold;\">\n                <label style=\"margin-left: 32px;\">Amount</label>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <div *ngIf=\"lessthan12\" class=\"table-container\" [ngStyle]=\"{'margin-top':table_container_marg_top}\">\n        <table>\n          <tbody>\n            <tr *ngFor='let purchase of purchaseList;'>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.date  | date: 'dd/MM/yyyy'}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.billnumber}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.productname}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\"><i class=\"fas fa-inr\" aria-hidden=\"true\"\n                    style=\"margin-left:5px;margin-top:3px;color: black\"></i> &#x20b9; &nbsp;{{purchase.price}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.quantity}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\"><i class=\"fas fa-inr\" aria-hidden=\"true\"\n                    style=\"margin-left:5px;margin-top:3px;color: black\"></i>&#x20b9; &nbsp;{{purchase.amount}}</label>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div *ngIf=\"greaterthan12\" class=\"table-container1\" [ngStyle]=\"{'margin-top':table_container_marg_top}\">\n        <table>\n          <tbody>\n            <tr *ngFor='let purchase of purchaseList;'>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.date  | date: 'dd/MM/yyyy'}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.billnumber}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.productname}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\"><i class=\"fas fa-inr\" aria-hidden=\"true\"\n                    style=\"margin-left:5px;margin-top:3px;color: black\"></i>&#x20b9; &nbsp;{{purchase.price}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\">{{purchase.quantity}}</label>\n              </td>\n              <td style=\"height:25px\">\n                <label style=\"margin-left: 32px;\"><i class=\"fas fa-inr\" aria-hidden=\"true\"\n                    style=\"margin-left:5px;margin-top:3px;color: black\"></i> &#x20b9; &nbsp;{{purchase.amount}}</label>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </ng-container>\n\n  <br>\n  <div *ngIf=\"show\" >\n    <ul>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n    </ul>\n  </div>\n\n  <div *ngIf=\"isErrorMessage\"\n    style=\"position:absolute;margin-left: 585px;margin-top:240px;color:red;font-size:26px;font-family: daimler!important\">\n    {{errorMessage}}\n  </div>\n\n\n  <div class=\"footer\">\n    <p><i class=\"fas fa-copyright\" aria-hidden=\"true\"></i> Copyright 2019 Sharada Residential School. All Rights\n      Reserved.</p>\n  </div>\n\n\n</div>"

/***/ }),

/***/ "./src/app/add-consumption/add-consumption.component.css":
/*!***************************************************************!*\
  !*** ./src/app/add-consumption/add-consumption.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n    \r\n    \r\n  }\r\n  \r\n  #srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #srs_name{\r\n    width:500px;\r\n    margin-left:70px;\r\n    margin-top:20px;\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size: 32pt;\r\n    font-family: daimler !important;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #hostel_name{\r\n    margin-top:35px;\r\n    color:#5df7d1;\r\n    float:left;\r\n    font-size: 14pt;\r\n    width:290px;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #horizontal_nav{\r\n    margin-left:770px;\r\n  }\r\n  \r\n  #srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n  }\r\n  \r\n  #srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n  }\r\n  \r\n  #horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n  }\r\n  \r\n  .body_content{\r\n    background-color: white;\r\n  }\r\n  \r\n  #add_consumption{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #005cab;\r\n    margin-top:53px;\r\n    margin-left: 100px;\r\n    position: absolute;\r\n    margin-left: 240px;\r\n    text-decoration: none;\r\n    color: white;\r\n    text-align: center;\r\n    float:left;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #view_consumption{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:390px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #modify_consumption{\r\n    height:50px;\r\n    width:170px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:541px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #line{\r\n    color: black;\r\n    width: 30px;\r\n    position: absolute;\r\n    width:925px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 100px;\r\n    /* position: absolute;*/ \r\n    margin-left: 390px;\r\n  }\r\n  \r\n  #form-heading{\r\n    height:500px;\r\n    width:1075px;\r\n    background-color: white;\r\n    margin-top:103px;\r\n    margin-left: 240px;\r\n    position: absolute;\r\n  }\r\n  \r\n  #para-heading{\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n  }\r\n  \r\n  #form_fields{\r\n    margin-top:190px;\r\n    position: absolute;\r\n    margin-left:250px;\r\n  }\r\n  \r\n  #form_data{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_data:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #form_bnum{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_bnum:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #bnum_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:16px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_bnum:focus + #bnum_id, #form_bnum:not(:placeholder-shown) + #bnum_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  #form_vname{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_vname:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #vname_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:16px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_vname:focus + #vname_id, #form_vname:not(:placeholder-shown) + #vname_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  #form_price{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_price:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #price_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:147px;\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_price:focus + #price_id, #form_price:not(:placeholder-shown) + #price_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-10px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-10px);\r\n  }\r\n  \r\n  #form_quantity{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_quantity:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #quantity_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:147px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_quantity:focus + #quantity_id, #form_quantity:not(:placeholder-shown) + #quantity_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n  }\r\n  \r\n  #form_amount{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_amount:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #amount_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:148px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_amount:focus + #amount_id, #form_amount:not(:placeholder-shown) + #amount_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n  }\r\n  \r\n  .reset_button{\r\n    cursor:pointer;\r\n    margin-top: 106px;\r\n    margin-left: 600px;\r\n    background-color: white;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: #ccc solid 2px;\r\n    color:grey;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  .submit_button{\r\n    cursor:pointer;\r\n    margin-top: 106px;\r\n    margin-left: 90px;\r\n    background-color: #005cab;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: none;\r\n    color:white;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  .reset_button:focus{\r\n    outline: 0;\r\n  }\r\n  \r\n  .submit_button:focus{\r\n    outline: 0;\r\n  }\r\n  \r\n  .footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n  }\r\n  \r\n  .dropdown-content{\r\n    \r\n    /* width: 262px; */\r\n    z-index: 1;\r\n    min-width: 259px;\r\n    margin-top: 53px;\r\n    margin-left: 338px;\r\n    position: absolute;\r\n    background-color: white;\r\n    border: solid #cacaca;\r\n    border-width: 1.5px 1.5px 1.5px 1.5px;\r\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\r\n  }\r\n  \r\n  .dropdown-content a {\r\n    color: black;\r\n    padding: 12px 16px;\r\n    font-family: daimler !important; \r\n    text-decoration: none;\r\n    display: block;\r\n    cursor: default;\r\n  }\r\n  \r\n  .dropdown-content a:hover {background-color: #ddd;}\r\n  \r\n  .dropdown-content {\r\n    border: solid 1 px black;\r\n    display: block;\r\n  }\r\n  \r\n  .disabledClass { \r\n    display: none;\r\n    border-width: 0px;\r\n  }\r\n  \r\n  .disabledSubmit{\r\n    opacity:0.3;\r\n    cursor:default;\r\n   \r\n  }\r\n  \r\n  /* .header{\r\n     \r\n      background-color: aliceblue;\r\n      font-family: 'Segoe UI';\r\n      height: 120px;\r\n      width:100%;\r\n      position:fixed;\r\n      \r\n  }\r\n  \r\n  #srs_logo{\r\n      width:130px;\r\n      margin-left:420px;\r\n      height:120px;\r\n      float:left;\r\n  }\r\n  \r\n  #srs_text{\r\n      float:left;\r\n      font-family:\"Playfair Display\";\r\n      font-size: 38px;\r\n      color:blue;\r\n  }\r\n  \r\n  \r\n  .consumption_data{\r\n      position: absolute;\r\n      margin-left: 250px;\r\n     \r\n     border: solid;\r\n     border-width: thin;\r\n     width: 800px;\r\n     margin-top: 128px;     \r\n     box-shadow: 10px 10px 5px #888888;\r\n     background-color: white;\r\n  }\r\n  \r\n  #heading{\r\n    \r\n     background-color: #80bfff;\r\n    margin-top:-19px;\r\n  }\r\n  \r\n  \r\n  \r\n  \r\n  .button1 {\r\n      display: inline-block;\r\n      padding: 13px 18px;\r\n      font-size: 16px;\r\n      cursor: pointer;\r\n      text-align: center;\r\n      text-decoration: none;\r\n      outline: none;\r\n      color: #fff;\r\n      background-color: #4CAF50;\r\n      border: none;\r\n      border-radius: 10px;\r\n      box-shadow: 0 7px #999;\r\n      margin-left: 188px;\r\n      float:left;\r\n    }\r\n    \r\n    .button1:hover {background-color: #3e8e41}\r\n    \r\n    .button1:active {\r\n      background-color: #3e8e41;\r\n      box-shadow: 0 5px #666;\r\n      transform: translateY(4px);\r\n    }\r\n  \r\n  \r\n  \r\n  \r\n  \r\n    .button2 {\r\n      display: inline-block;\r\n      padding: 13px 18px;\r\n      font-size: 16px;\r\n      cursor: pointer;\r\n      text-align: center;\r\n      text-decoration: none;\r\n      outline: none;\r\n      color: #fff;\r\n      background-color: #4CAF50;\r\n      border: none;\r\n      border-radius: 10px;\r\n      box-shadow: 0 7px #999;\r\n      margin-left: 110px;\r\n      float:left;\r\n    }\r\n    \r\n    .button2:hover {background-color: #3e8e41}\r\n    \r\n    .button2:active {\r\n      background-color: #3e8e41;\r\n      box-shadow: 0 5px #666;\r\n      transform: translateY(4px);\r\n    } */\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkLWNvbnN1bXB0aW9uL2FkZC1jb25zdW1wdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztJQUVJLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osVUFBVTs7O0VBR1o7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixVQUFVO0VBQ1o7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZiwrQkFBK0I7SUFDL0IsaUJBQWlCO0lBQ2pCLFVBQVU7RUFDWjs7RUFFQTtJQUNFLGVBQWU7SUFDZixhQUFhO0lBQ2IsVUFBVTtJQUNWLGVBQWU7SUFDZixXQUFXO0lBQ1gsK0JBQStCO0VBQ2pDOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsVUFBVTtJQUNWLCtCQUErQjtJQUMvQixlQUFlO0lBQ2YsYUFBYTtJQUNiLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsbUNBQW1DO0VBQ3JDOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtFQUNwQjs7RUFJQTtJQUNFLHVCQUF1QjtFQUN6Qjs7RUFHQTtJQUNFLFdBQVc7SUFDWCxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLCtCQUErQjtFQUNqQzs7RUFFQTtJQUNFLFdBQVc7SUFDWCxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsK0JB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QUNaLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsK0JBQStCO0VBQ2pDOztFQUVBO0lBQ0UsY0FBYztJQUNkLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLCtCQUErQjtFQUNqQzs7RUFFQTtJQUNFLFVBQVU7RUFDWjs7RUFFQTtJQUNFLFVBQVU7RUFDWjs7RUFHQTtJQUNFLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixPQUFPO0lBQ1AsU0FBUztJQUNULFdBQVc7SUFDWCxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGVBQWU7RUFDakI7O0VBR0E7O0lBRUUsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixxQ0FBcUM7SUFDckMsNENBQTRDO0VBQzlDOztFQUdBO0lBQ0UsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxlQUFlO0VBQ2pCOztFQUdBLDJCQUEyQixzQkFBc0IsQ0FBQzs7RUFFbEQ7SUFDRSx3QkFBd0I7SUFDeEIsY0FBYztFQUNoQjs7RUFHQTtJQUNFLGFBQWE7SUFDYixpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsY0FBYzs7RUFFaEI7O0VBeUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtHSyIsImZpbGUiOiJzcmMvYXBwL2FkZC1jb25zdW1wdGlvbi9hZGQtY29uc3VtcHRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJ7XHJcbiAgIFxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMmE2NTtcclxuICAgIGhlaWdodDogOTBweDtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICBcclxuICAgIFxyXG4gIH1cclxuICBcclxuICAjc3JzX2xvZ297XHJcbiAgICB3aWR0aDoxMzBweDtcclxuICAgIG1hcmdpbi1sZWZ0OjQwcHg7XHJcbiAgICAvKiBoZWlnaHQ6NjBweDsgKi9cclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgfVxyXG5cclxuICAjc3JzX25hbWV7XHJcbiAgICB3aWR0aDo1MDBweDtcclxuICAgIG1hcmdpbi1sZWZ0OjcwcHg7XHJcbiAgICBtYXJnaW4tdG9wOjIwcHg7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgICBmb250LXNpemU6IDMycHQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgLyogaGVpZ2h0OjYwcHg7ICovXHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICAjaG9zdGVsX25hbWV7XHJcbiAgICBtYXJnaW4tdG9wOjM1cHg7XHJcbiAgICBjb2xvcjojNWRmN2QxO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtc2l6ZTogMTRwdDtcclxuICAgIHdpZHRoOjI5MHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgI2hvcml6b250YWxfbmF2e1xyXG4gICAgbWFyZ2luLWxlZnQ6NzcwcHg7XHJcbiAgfVxyXG4gIFxyXG4gICNzcnNfdGV4dHtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgY29sb3I6I2ExYzBlNztcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMTdweDtcclxuICB9XHJcbiAgXHJcbiAgI3Nyc190ZXh0OmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NywgMTMwLCAyNSk7XHJcbiAgfVxyXG4gIFxyXG4gICNob3Jpem9udGFsX29wdGlvbnN7XHJcbiAgICBtYXJnaW4tbGVmdDoyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAuYm9keV9jb250ZW50e1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNhZGRfY29uc3VtcHRpb257XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNWNhYjtcclxuICAgIG1hcmdpbi10b3A6NTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OiAyNDBweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gICN2aWV3X2NvbnN1bXB0aW9ue1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OjM5MHB4O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgI21vZGlmeV9jb25zdW1wdGlvbntcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgd2lkdGg6MTcwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDo1NDFweDtcclxuICAgIG1hcmdpbi10b3A6NTNweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNsaW5le1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgd2lkdGg6IDMwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB3aWR0aDo5MjVweDtcclxuICAgIGhlaWdodDogM3B4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyMywgMjEzLCAyMTMpO1xyXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XHJcbiAgICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7Ki8gXHJcbiAgICBtYXJnaW4tbGVmdDogMzkwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtLWhlYWRpbmd7XHJcbiAgICBoZWlnaHQ6NTAwcHg7XHJcbiAgICB3aWR0aDoxMDc1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIG1hcmdpbi10b3A6MTAzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjQwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgfVxyXG4gIFxyXG4gICNwYXJhLWhlYWRpbmd7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gIH1cclxuICBcclxuICAjZm9ybV9maWVsZHN7XHJcbiAgICBtYXJnaW4tdG9wOjE5MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6MjUwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2RhdGF7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206ICNjY2Mgc29saWQgMXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6MjYycHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9kYXRhOmZvY3Vze1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogYmx1ZSBzb2xpZCAxcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2JudW17XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206ICNjY2Mgc29saWQgMXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6MjYycHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9ibnVtOmZvY3Vze1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogYmx1ZSBzb2xpZCAxcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNibnVtX2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MTZweDtcclxuICAgIC8qIGxlZnQ6MDsgKi9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2JudW06Zm9jdXMgKyAjYm51bV9pZCwgI2Zvcm1fYm51bTpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICNibnVtX2lkIHtcclxuICAgIG9wYWNpdHk6MTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSkgdHJhbnNsYXRlWSgtODAlKSB0cmFuc2xhdGVYKC0yMHB4KTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fdm5hbWV7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206ICNjY2Mgc29saWQgMXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6MjYycHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV92bmFtZTpmb2N1c3tcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206IGJsdWUgc29saWQgMXB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjdm5hbWVfaWQge1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6MTBweDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6LTI2N3B4O1xyXG4gICAgbWFyZ2luLXRvcDoxNnB4O1xyXG4gICAgLyogbGVmdDowOyAqL1xyXG4gICAgdG9wOjA7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjJzO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XHJcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMjUsIDAuMSwgMC4yNSwgMSk7XHJcbiAgICBvcGFjaXR5OjAuNTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fdm5hbWU6Zm9jdXMgKyAjdm5hbWVfaWQsICNmb3JtX3ZuYW1lOm5vdCg6cGxhY2Vob2xkZXItc2hvd24pICsgI3ZuYW1lX2lkIHtcclxuICAgIG9wYWNpdHk6MTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSkgdHJhbnNsYXRlWSgtODAlKSB0cmFuc2xhdGVYKC0yMHB4KTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fcHJpY2V7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206ICNjY2Mgc29saWQgMXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6MjYycHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9wcmljZTpmb2N1c3tcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206IGJsdWUgc29saWQgMXB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjcHJpY2VfaWQge1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6MTBweDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6LTI2N3B4O1xyXG4gICAgbWFyZ2luLXRvcDoxNDdweDtcclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3ByaWNlOmZvY3VzICsgI3ByaWNlX2lkLCAjZm9ybV9wcmljZTpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICNwcmljZV9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMTBweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3F1YW50aXR5e1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fcXVhbnRpdHk6Zm9jdXN7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBibHVlIHNvbGlkIDFweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI3F1YW50aXR5X2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MTQ3cHg7XHJcbiAgICAvKiBsZWZ0OjA7ICovXHJcbiAgICB0b3A6MDtcclxuICAgIHRyYW5zaXRpb246IDAuMnM7XHJcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKTtcclxuICAgIG9wYWNpdHk6MC41O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9xdWFudGl0eTpmb2N1cyArICNxdWFudGl0eV9pZCwgI2Zvcm1fcXVhbnRpdHk6bm90KDpwbGFjZWhvbGRlci1zaG93bikgKyAjcXVhbnRpdHlfaWQge1xyXG4gICAgb3BhY2l0eToxO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KSB0cmFuc2xhdGVZKC04MCUpIHRyYW5zbGF0ZVgoLTE2cHgpO1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICBcclxuICAjZm9ybV9hbW91bnR7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206ICNjY2Mgc29saWQgMXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6MjYycHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9hbW91bnQ6Zm9jdXN7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBibHVlIHNvbGlkIDFweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI2Ftb3VudF9pZCB7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzoxMHB4O1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBtYXJnaW4tbGVmdDotMjY3cHg7XHJcbiAgICBtYXJnaW4tdG9wOjE0OHB4O1xyXG4gICAgLyogbGVmdDowOyAqL1xyXG4gICAgdG9wOjA7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjJzO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2U7XHJcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMjUsIDAuMSwgMC4yNSwgMSk7XHJcbiAgICBvcGFjaXR5OjAuNTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fYW1vdW50OmZvY3VzICsgI2Ftb3VudF9pZCwgI2Zvcm1fYW1vdW50Om5vdCg6cGxhY2Vob2xkZXItc2hvd24pICsgI2Ftb3VudF9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMTZweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC5yZXNldF9idXR0b257XHJcbiAgICBjdXJzb3I6cG9pbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDEwNnB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDYwMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiAjY2NjIHNvbGlkIDJweDtcclxuICAgIGNvbG9yOmdyZXk7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5zdWJtaXRfYnV0dG9ue1xyXG4gICAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDZweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA5MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNWNhYjtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIHdpZHRoOiAxMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLnJlc2V0X2J1dHRvbjpmb2N1c3tcclxuICAgIG91dGxpbmU6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC5zdWJtaXRfYnV0dG9uOmZvY3Vze1xyXG4gICAgb3V0bGluZTogMDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLmZvb3RlcntcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGQxO1xyXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLmRyb3Bkb3duLWNvbnRlbnR7XHJcbiAgICBcclxuICAgIC8qIHdpZHRoOiAyNjJweDsgKi9cclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBtaW4td2lkdGg6IDI1OXB4O1xyXG4gICAgbWFyZ2luLXRvcDogNTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAzMzhweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiBzb2xpZCAjY2FjYWNhO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAxLjVweCAxLjVweCAxLjVweCAxLjVweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCA4cHggMTZweCAwcHggcmdiYSgwLDAsMCwwLjIpO1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZHJvcGRvd24tY29udGVudCBhIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIHBhZGRpbmc6IDEycHggMTZweDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7IFxyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5kcm9wZG93bi1jb250ZW50IGE6aG92ZXIge2JhY2tncm91bmQtY29sb3I6ICNkZGQ7fVxyXG4gIFxyXG4gIC5kcm9wZG93bi1jb250ZW50IHtcclxuICAgIGJvcmRlcjogc29saWQgMSBweCBibGFjaztcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZGlzYWJsZWRDbGFzcyB7IFxyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGJvcmRlci13aWR0aDogMHB4O1xyXG4gIH1cclxuICBcclxuICAuZGlzYWJsZWRTdWJtaXR7XHJcbiAgICBvcGFjaXR5OjAuMztcclxuICAgIGN1cnNvcjpkZWZhdWx0O1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLyogLmhlYWRlcntcclxuICAgICBcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlO1xyXG4gICAgICBmb250LWZhbWlseTogJ1NlZ29lIFVJJztcclxuICAgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgd2lkdGg6MTAwJTtcclxuICAgICAgcG9zaXRpb246Zml4ZWQ7XHJcbiAgICAgIFxyXG4gIH1cclxuICBcclxuICAjc3JzX2xvZ297XHJcbiAgICAgIHdpZHRoOjEzMHB4O1xyXG4gICAgICBtYXJnaW4tbGVmdDo0MjBweDtcclxuICAgICAgaGVpZ2h0OjEyMHB4O1xyXG4gICAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICAjc3JzX3RleHR7XHJcbiAgICAgIGZsb2F0OmxlZnQ7XHJcbiAgICAgIGZvbnQtZmFtaWx5OlwiUGxheWZhaXIgRGlzcGxheVwiO1xyXG4gICAgICBmb250LXNpemU6IDM4cHg7XHJcbiAgICAgIGNvbG9yOmJsdWU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5jb25zdW1wdGlvbl9kYXRhe1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAyNTBweDtcclxuICAgICBcclxuICAgICBib3JkZXI6IHNvbGlkO1xyXG4gICAgIGJvcmRlci13aWR0aDogdGhpbjtcclxuICAgICB3aWR0aDogODAwcHg7XHJcbiAgICAgbWFyZ2luLXRvcDogMTI4cHg7ICAgICBcclxuICAgICBib3gtc2hhZG93OiAxMHB4IDEwcHggNXB4ICM4ODg4ODg7XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgfVxyXG4gIFxyXG4gICNoZWFkaW5ne1xyXG4gICAgXHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogIzgwYmZmZjtcclxuICAgIG1hcmdpbi10b3A6LTE5cHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC5idXR0b24xIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBwYWRkaW5nOiAxM3B4IDE4cHg7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0Q0FGNTA7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgICAgYm94LXNoYWRvdzogMCA3cHggIzk5OTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDE4OHB4O1xyXG4gICAgICBmbG9hdDpsZWZ0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuYnV0dG9uMTpob3ZlciB7YmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MX1cclxuICAgIFxyXG4gICAgLmJ1dHRvbjE6YWN0aXZlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzNlOGU0MTtcclxuICAgICAgYm94LXNoYWRvdzogMCA1cHggIzY2NjtcclxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDRweCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgICAuYnV0dG9uMiB7XHJcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgcGFkZGluZzogMTNweCAxOHB4O1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1xyXG4gICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgN3B4ICM5OTk7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMTBweDtcclxuICAgICAgZmxvYXQ6bGVmdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmJ1dHRvbjI6aG92ZXIge2JhY2tncm91bmQtY29sb3I6ICMzZThlNDF9XHJcbiAgICBcclxuICAgIC5idXR0b24yOmFjdGl2ZSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzZThlNDE7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAgNXB4ICM2NjY7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg0cHgpO1xyXG4gICAgfSAqLyJdfQ== */"

/***/ }),

/***/ "./src/app/add-consumption/add-consumption.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/add-consumption/add-consumption.component.ts ***!
  \**************************************************************/
/*! exports provided: AddConsumptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddConsumptionComponent", function() { return AddConsumptionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let AddConsumptionComponent = class AddConsumptionComponent {
    constructor(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        this.model = {};
        this.myDate = new Date();
        this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    }
    ngOnInit() {
    }
    onKey(event) {
        this.display_dropdown = 'block';
        let formData = new FormData();
        this.product_name_on_submit = event.target.value;
        var temp = 'http://localhost:9090/webapp/getAllProducts/' + this.product_name_on_submit;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(data => {
            console.log("Data is ", data);
            this.productList = data;
            if (!this.productList.length) {
                //alert("Empty list")
                this.display_dropdown = 'none';
            }
            console.log("Product list ", this.productList);
        });
    }
    getUrlText(val) {
        //alert(val);
        this.model['productname'] = val;
        this.display_dropdown = 'none';
        this.product_name_on_submit = val;
    }
    postAddConsumptionData(testForm) {
        let formData = new FormData();
        formData.append('formdata', JSON.stringify(this.model));
        var temp = 'http://localhost:9090/addConsumptionDetails';
        console.log("Formdata ", JSON.stringify(this.model));
        this.http.post(temp, formData).subscribe(data => {
            console.log("Data is ", data);
        });
        alert("Data added successfully !!");
        testForm.reset();
    }
};
AddConsumptionComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"] }
];
AddConsumptionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-add-consumption',
        template: __webpack_require__(/*! raw-loader!./add-consumption.component.html */ "./node_modules/raw-loader/index.js!./src/app/add-consumption/add-consumption.component.html"),
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]],
        styles: [__webpack_require__(/*! ./add-consumption.component.css */ "./src/app/add-consumption/add-consumption.component.css")]
    })
], AddConsumptionComponent);



/***/ }),

/***/ "./src/app/add-purchase/add-purchase.component.css":
/*!*********************************************************!*\
  !*** ./src/app/add-purchase/add-purchase.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n    position:fixed;\r\n    top:0px;\r\n    left:0px;\r\n  \r\n    \r\n  }\r\n  \r\n  #srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #srs_name{\r\n    width:500px;\r\n    margin-left:70px;\r\n    margin-top:20px;\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size: 32pt;\r\n    font-family: daimler !important;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #hostel_name{\r\n    margin-top:35px;\r\n    color:#5df7d1;\r\n    float:left;\r\n    font-size: 14pt;\r\n    width:290px;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #horizontal_nav{\r\n    margin-left:770px;\r\n  }\r\n  \r\n  #srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n  }\r\n  \r\n  #srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n  }\r\n  \r\n  #horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n  }\r\n  \r\n  .body_content{\r\n    background-color: white;\r\n    /*Sudhi's laptop*/\r\n    margin-top:90px;\r\n  }\r\n  \r\n  #add_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #005cab;\r\n    margin-top:53px;\r\n    margin-left: 100px;\r\n    position: absolute;\r\n    margin-left: 240px;\r\n    text-decoration: none;\r\n    color: white;\r\n    text-align: center;\r\n    float:left;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #view_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:390px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #modify_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:541px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #line{\r\n    color: black;\r\n    width: 30px;\r\n    position: absolute;\r\n    width:925px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 100px;\r\n    /* position: absolute;*/ \r\n    margin-left: 390px;\r\n  }\r\n  \r\n  #form-heading{\r\n    height:500px;\r\n    width:1075px;\r\n    background-color: white;\r\n    margin-top:103px;\r\n    margin-left: 240px;\r\n    position: absolute;\r\n  }\r\n  \r\n  #para-heading{\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n  }\r\n  \r\n  #form_fields{\r\n    margin-top:190px;\r\n    position: absolute;\r\n    margin-left:250px;\r\n  }\r\n  \r\n  #form_data{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_data:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #form_bnum{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n    margin-left:-267px;\r\n  }\r\n  \r\n  #form_bnum:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #bnum_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-270px;\r\n    margin-top:133px;/*for other laptop 133px*/\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_bnum:focus + #bnum_id, #form_bnum:not(:placeholder-shown) + #bnum_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  #form_pname{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_pname:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #pname_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:133px;/*for other laptop 133px*/\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_pname:focus + #pname_id, #form_pname:not(:placeholder-shown) + #pname_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  #form_vname{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_vname:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #vname_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:133px;/*for other laptop 133px*/\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_vname:focus + #vname_id, #form_vname:not(:placeholder-shown) + #vname_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  #form_price{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_price:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #price_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:267px;/*margin-top:267px*/\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_price:focus + #price_id, #form_price:not(:placeholder-shown) + #price_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-10px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-10px);\r\n  }\r\n  \r\n  #form_quantity{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_quantity:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #quantity_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:267px;/*margin-top:267px*/\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_quantity:focus + #quantity_id, #form_quantity:not(:placeholder-shown) + #quantity_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n  }\r\n  \r\n  #form_amount{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_amount:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #amount_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-267px;\r\n    margin-top:267px;/*margin-top:267px*/\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_amount:focus + #amount_id, #form_amount:not(:placeholder-shown) + #amount_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-16px);\r\n  }\r\n  \r\n  .dropdown-content{\r\n    \r\n    width: 262px;\r\n    display:block;\r\n    z-index: 1;\r\n    min-width: 259px;\r\n    margin-top: 175px;\r\n    margin-left: 338px;\r\n    position: absolute;\r\n    background-color: white;\r\n    border: solid #cacaca;\r\n    border-width: 1.5px 1.5px 1.5px 1.5px;\r\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\r\n  }\r\n  \r\n  .dropdown-content a {\r\n    color: black;\r\n    padding: 12px 16px;\r\n    font-family: daimler !important; \r\n    text-decoration: none;\r\n    display: block;\r\n    cursor: default;\r\n  }\r\n  \r\n  .dropdown-content a:hover {background-color: #ddd;}\r\n  \r\n  .dropdown-content1{\r\n    \r\n    width: 262px;\r\n    display:block;\r\n    z-index: 1;\r\n    min-width: 259px;\r\n    margin-top: 175px;\r\n    margin-left: 674px;\r\n    position: absolute;\r\n    background-color: white;\r\n    border: solid #cacaca;\r\n    border-width: 1.5px 1.5px 1.5px 1.5px;\r\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\r\n  }\r\n  \r\n  .dropdown-content1 a {\r\n    color: black;\r\n    padding: 12px 16px;\r\n    font-family: daimler !important; \r\n    text-decoration: none;\r\n    display: block;\r\n    cursor: default;\r\n  }\r\n  \r\n  .dropdown-content1 a:hover {background-color: #ddd;}\r\n  \r\n  /* .dropdown-content {\r\n    border: solid 1 px black;\r\n  \r\n    display: block;\r\n  } */\r\n  \r\n  .disabledClass { \r\n    border-bottom: 2px solid red;\r\n    border-width: 0px;\r\n  }\r\n  \r\n  .disabledSubmit{\r\n  opacity:0.3;\r\n  cursor:default;\r\n  \r\n  }\r\n  \r\n  .reset_button{\r\n    cursor: pointer;\r\n    margin-top: 60px;\r\n    /* margin-left: 600px; */\r\n    background-color: white;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: #ccc solid 2px;\r\n    color:grey;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n\r\n    /*for sudhi's laptop*/\r\n    position:absolute;\r\n    margin-left:-264px;\r\n  }\r\n  \r\n  .submit_button{\r\n    cursor: pointer;\r\n    margin-top: 60px;\r\n    /* margin-left: 90px; */\r\n    background-color: #005cab;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: none;\r\n    color:white;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n\r\n    /*for sudhi's laptop*/\r\n    position:absolute;\r\n    margin-left:-20px;\r\n  }\r\n  \r\n  .reset_button:focus{\r\n    outline: 0;\r\n  }\r\n  \r\n  .submit_button:focus{\r\n    outline: 0;\r\n  }\r\n  \r\n  .footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n  }\r\n  \r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkLXB1cmNoYXNlL2FkZC1wdXJjaGFzZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztJQUVJLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osVUFBVTtJQUNWLGNBQWM7SUFDZCxPQUFPO0lBQ1AsUUFBUTs7O0VBR1Y7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixVQUFVO0VBQ1o7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZiwrQkFBK0I7SUFDL0IsaUJBQWlCO0lBQ2pCLFVBQVU7RUFDWjs7RUFFQTtJQUNFLGVBQWU7SUFDZixhQUFhO0lBQ2IsVUFBVTtJQUNWLGVBQWU7SUFDZixXQUFXO0lBQ1gsK0JBQStCO0VBQ2pDOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsVUFBVTtJQUNWLCtCQUErQjtJQUMvQixlQUFlO0lBQ2YsYUFBYTtJQUNiLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsbUNBQW1DO0VBQ3JDOztFQUVBO0lBQ0UsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtFQUNwQjs7RUFJQTtJQUNFLHVCQUF1QjtJQUN2QixpQkFBaUI7SUFDakIsZUFBZTtFQUNqQjs7RUFHQTtJQUNFLFdBQVc7SUFDWCxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLCtCQUErQjtFQUNqQzs7RUFFQTtJQUNFLFdBQVc7SUFDWCxXQUFXO0lBQ1gseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixZ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ckIsY0FBYztJQUNkLGVBQWU7RUFDakI7O0VBR0EsNEJBQTRCLHNCQUFzQixDQUFDOztFQUduRDs7OztLQUlHOztFQU1IO0lBQ0UsNEJBQTRCO0lBQzVCLGlCQUFpQjtFQUNuQjs7RUFFQTtFQUNBLFdBQVc7RUFDWCxjQUFjOztFQUVkOztFQU9BO0lBQ0UsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQix3QkFBd0I7SUFDeEIsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixVQUFVO0lBQ1YsaUJBQWlCO0lBQ2pCLCtCQUErQjs7SUFFL0IscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2Qix5QkFBeUI7SUFDekIsWUFBWTtJQUNaLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIsK0JBQStCOztJQUUvQixxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLFVBQVU7RUFDWjs7RUFFQTtJQUNFLFVBQVU7RUFDWjs7RUFJQTtJQUNFLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixPQUFPO0lBQ1AsU0FBUztJQUNULFdBQVc7SUFDWCxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGVBQWU7RUFDakIiLCJmaWxlIjoic3JjL2FwcC9hZGQtcHVyY2hhc2UvYWRkLXB1cmNoYXNlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVye1xyXG4gICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDJhNjU7XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgcG9zaXRpb246Zml4ZWQ7XHJcbiAgICB0b3A6MHB4O1xyXG4gICAgbGVmdDowcHg7XHJcbiAgXHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgI3Nyc19sb2dve1xyXG4gICAgd2lkdGg6MTMwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDo0MHB4O1xyXG4gICAgLyogaGVpZ2h0OjYwcHg7ICovXHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuXHJcbiAgI3Nyc19uYW1le1xyXG4gICAgd2lkdGg6NTAwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDo3MHB4O1xyXG4gICAgbWFyZ2luLXRvcDoyMHB4O1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXdlaWdodDpib2xkO1xyXG4gICAgZm9udC1zaXplOiAzMnB0O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIC8qIGhlaWdodDo2MHB4OyAqL1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgI2hvc3RlbF9uYW1le1xyXG4gICAgbWFyZ2luLXRvcDozNXB4O1xyXG4gICAgY29sb3I6IzVkZjdkMTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBmb250LXNpemU6IDE0cHQ7XHJcbiAgICB3aWR0aDoyOTBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gICNob3Jpem9udGFsX25hdntcclxuICAgIG1hcmdpbi1sZWZ0Ojc3MHB4O1xyXG4gIH1cclxuICBcclxuICAjc3JzX3RleHR7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGNvbG9yOiNhMWMwZTc7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDE3cHg7XHJcbiAgfVxyXG4gIFxyXG4gICNzcnNfdGV4dDpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODcsIDEzMCwgMjUpO1xyXG4gIH1cclxuICBcclxuICAjaG9yaXpvbnRhbF9vcHRpb25ze1xyXG4gICAgbWFyZ2luLWxlZnQ6MjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLmJvZHlfY29udGVudHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgLypTdWRoaSdzIGxhcHRvcCovXHJcbiAgICBtYXJnaW4tdG9wOjkwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNhZGRfcHVyY2hhc2V7XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNWNhYjtcclxuICAgIG1hcmdpbi10b3A6NTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OiAyNDBweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gICN2aWV3X3B1cmNoYXNle1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OjM5MHB4O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcblxyXG4gICNtb2RpZnlfcHVyY2hhc2V7XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6NTQxcHg7XHJcbiAgICBtYXJnaW4tdG9wOjUzcHg7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjbGluZXtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6OTI1cHg7XHJcbiAgICBoZWlnaHQ6IDNweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjMsIDIxMywgMjEzKTtcclxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xyXG4gICAgLyogcG9zaXRpb246IGFic29sdXRlOyovIFxyXG4gICAgbWFyZ2luLWxlZnQ6IDM5MHB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybS1oZWFkaW5ne1xyXG4gICAgaGVpZ2h0OjUwMHB4O1xyXG4gICAgd2lkdGg6MTA3NXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBtYXJnaW4tdG9wOjEwM3B4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIH1cclxuICBcclxuICAjcGFyYS1oZWFkaW5ne1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICB9XHJcbiAgXHJcbiAgI2Zvcm1fZmllbGRze1xyXG4gICAgbWFyZ2luLXRvcDoxOTBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OjI1MHB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9kYXRhe1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fZGF0YTpmb2N1c3tcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206IGJsdWUgc29saWQgMXB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICAjZm9ybV9ibnVte1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fYm51bTpmb2N1c3tcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206IGJsdWUgc29saWQgMXB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjYm51bV9pZCB7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzoxMHB4O1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBtYXJnaW4tbGVmdDotMjcwcHg7XHJcbiAgICBtYXJnaW4tdG9wOjEzM3B4Oy8qZm9yIG90aGVyIGxhcHRvcCAxMzNweCovXHJcbiAgICB0b3A6MDtcclxuICAgIHRyYW5zaXRpb246IDAuMnM7XHJcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKTtcclxuICAgIG9wYWNpdHk6MC41O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9ibnVtOmZvY3VzICsgI2JudW1faWQsICNmb3JtX2JudW06bm90KDpwbGFjZWhvbGRlci1zaG93bikgKyAjYm51bV9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMjBweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3BuYW1le1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fcG5hbWU6Zm9jdXN7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBibHVlIHNvbGlkIDFweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI3BuYW1lX2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MTMzcHg7Lypmb3Igb3RoZXIgbGFwdG9wIDEzM3B4Ki9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3BuYW1lOmZvY3VzICsgI3BuYW1lX2lkLCAjZm9ybV9wbmFtZTpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICNwbmFtZV9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMjBweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3ZuYW1le1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fdm5hbWU6Zm9jdXN7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBibHVlIHNvbGlkIDFweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI3ZuYW1lX2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MTMzcHg7Lypmb3Igb3RoZXIgbGFwdG9wIDEzM3B4Ki9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3ZuYW1lOmZvY3VzICsgI3ZuYW1lX2lkLCAjZm9ybV92bmFtZTpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICN2bmFtZV9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMjBweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3ByaWNle1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fcHJpY2U6Zm9jdXN7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBibHVlIHNvbGlkIDFweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI3ByaWNlX2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MjY3cHg7LyptYXJnaW4tdG9wOjI2N3B4Ki9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3ByaWNlOmZvY3VzICsgI3ByaWNlX2lkLCAjZm9ybV9wcmljZTpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICNwcmljZV9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMTBweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3F1YW50aXR5e1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjI2MnB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fcXVhbnRpdHk6Zm9jdXN7XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiBibHVlIHNvbGlkIDFweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI3F1YW50aXR5X2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MjY3cHg7LyptYXJnaW4tdG9wOjI2N3B4Ki9cclxuICAgIC8qIGxlZnQ6MDsgKi9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX3F1YW50aXR5OmZvY3VzICsgI3F1YW50aXR5X2lkLCAjZm9ybV9xdWFudGl0eTpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICNxdWFudGl0eV9pZCB7XHJcbiAgICBvcGFjaXR5OjE7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpIHRyYW5zbGF0ZVkoLTgwJSkgdHJhbnNsYXRlWCgtMTZweCk7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2Ftb3VudHtcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogI2NjYyBzb2xpZCAxcHg7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBoZWlnaHQ6MzBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDoyNjJweDtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2Ftb3VudDpmb2N1c3tcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206IGJsdWUgc29saWQgMXB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjYW1vdW50X2lkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0Oi0yNjdweDtcclxuICAgIG1hcmdpbi10b3A6MjY3cHg7LyptYXJnaW4tdG9wOjI2N3B4Ki9cclxuICAgIC8qIGxlZnQ6MDsgKi9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2Ftb3VudDpmb2N1cyArICNhbW91bnRfaWQsICNmb3JtX2Ftb3VudDpub3QoOnBsYWNlaG9sZGVyLXNob3duKSArICNhbW91bnRfaWQge1xyXG4gICAgb3BhY2l0eToxO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KSB0cmFuc2xhdGVZKC04MCUpIHRyYW5zbGF0ZVgoLTE2cHgpO1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAuZHJvcGRvd24tY29udGVudHtcclxuICAgIFxyXG4gICAgd2lkdGg6IDI2MnB4O1xyXG4gICAgZGlzcGxheTpibG9jaztcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBtaW4td2lkdGg6IDI1OXB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTc1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMzM4cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogc29saWQgI2NhY2FjYTtcclxuICAgIGJvcmRlci13aWR0aDogMS41cHggMS41cHggMS41cHggMS41cHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggOHB4IDE2cHggMHB4IHJnYmEoMCwwLDAsMC4yKTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLmRyb3Bkb3duLWNvbnRlbnQgYSB7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50OyBcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZHJvcGRvd24tY29udGVudCBhOmhvdmVyIHtiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO31cclxuICBcclxuICBcclxuICAuZHJvcGRvd24tY29udGVudDF7XHJcbiAgICBcclxuICAgIHdpZHRoOiAyNjJweDtcclxuICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgbWluLXdpZHRoOiAyNTlweDtcclxuICAgIG1hcmdpbi10b3A6IDE3NXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDY3NHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IHNvbGlkICNjYWNhY2E7XHJcbiAgICBib3JkZXItd2lkdGg6IDEuNXB4IDEuNXB4IDEuNXB4IDEuNXB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsMCwwLDAuMik7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5kcm9wZG93bi1jb250ZW50MSBhIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIHBhZGRpbmc6IDEycHggMTZweDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7IFxyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5kcm9wZG93bi1jb250ZW50MSBhOmhvdmVyIHtiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO31cclxuICBcclxuICBcclxuICAvKiAuZHJvcGRvd24tY29udGVudCB7XHJcbiAgICBib3JkZXI6IHNvbGlkIDEgcHggYmxhY2s7XHJcbiAgXHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9ICovXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLmRpc2FibGVkQ2xhc3MgeyBcclxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZWQ7XHJcbiAgICBib3JkZXItd2lkdGg6IDBweDtcclxuICB9XHJcbiAgXHJcbiAgLmRpc2FibGVkU3VibWl0e1xyXG4gIG9wYWNpdHk6MC4zO1xyXG4gIGN1cnNvcjpkZWZhdWx0O1xyXG4gIFxyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICBcclxuICAucmVzZXRfYnV0dG9ue1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgbWFyZ2luLXRvcDogNjBweDtcclxuICAgIC8qIG1hcmdpbi1sZWZ0OiA2MDBweDsgKi9cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgd2lkdGg6IDEyMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgIGJvcmRlcjogI2NjYyBzb2xpZCAycHg7XHJcbiAgICBjb2xvcjpncmV5O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG5cclxuICAgIC8qZm9yIHN1ZGhpJ3MgbGFwdG9wKi9cclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6LTI2NHB4O1xyXG4gIH1cclxuICBcclxuICAuc3VibWl0X2J1dHRvbntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDYwcHg7XHJcbiAgICAvKiBtYXJnaW4tbGVmdDogOTBweDsgKi9cclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcblxyXG4gICAgLypmb3Igc3VkaGkncyBsYXB0b3AqL1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDotMjBweDtcclxuICB9XHJcbiAgXHJcbiAgLnJlc2V0X2J1dHRvbjpmb2N1c3tcclxuICAgIG91dGxpbmU6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC5zdWJtaXRfYnV0dG9uOmZvY3Vze1xyXG4gICAgb3V0bGluZTogMDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLmZvb3RlcntcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGQxO1xyXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbiAgXHJcbiAgIl19 */"

/***/ }),

/***/ "./src/app/add-purchase/add-purchase.component.ts":
/*!********************************************************!*\
  !*** ./src/app/add-purchase/add-purchase.component.ts ***!
  \********************************************************/
/*! exports provided: AddPurchaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPurchaseComponent", function() { return AddPurchaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let AddPurchaseComponent = class AddPurchaseComponent {
    constructor(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        this.model = {};
        this.myDate = new Date();
        this.display_dropdown = 'none';
        this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
        this.display_dropdown1 = 'none';
    }
    onPriceKey(value) {
        this.price = parseFloat(value);
        this.amount = this.price * this.quantity;
    }
    PriceChange(value) {
        this.price = parseFloat(value);
        this.amount = this.price * this.quantity;
    }
    onQuantityKey(value) {
        this.quantity = parseFloat(value);
        this.amount = this.price * this.quantity;
        //alert(this.amount);
    }
    QuantityChange(value) {
        this.quantity = parseFloat(value);
        this.amount = this.price * this.quantity;
        //alert(this.amount)
    }
    changeBgColorAddPurchase() {
        this.bgcolor = '#f7f7f7';
        this.backcolor = '#005cab';
    }
    getUrlText(val) {
        //alert(val);
        this.model['productname'] = val;
        this.display_dropdown = 'none';
        this.product_name_on_submit = val;
    }
    getUrlTextForVendors(val) {
        //alert(val);
        this.model['vendorname'] = val;
        this.display_dropdown1 = 'none';
        this.vendor_name_on_submit = val;
    }
    ngOnInit() {
    }
    searchProducts(event) {
        this.display_dropdown = 'block';
        let formData = new FormData();
        this.product_name_on_submit = event.target.value;
        if (this.product_name_on_submit == '') {
            this.display_dropdown = 'none';
        }
        var temp = 'http://localhost:9090/webapp/getAllProducts/' + this.product_name_on_submit;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(data => {
            console.log("Data is ", data);
            this.productList = data;
            if (!this.productList.length) {
                //alert("Empty list")
                this.display_dropdown = 'none';
            }
            console.log("Product list ", this.productList);
        });
    }
    searchVendors(event) {
        this.display_dropdown1 = 'block';
        let formData = new FormData();
        this.vendor_name = event.target.value;
        if (this.vendor_name == '') {
            this.display_dropdown1 = 'none';
        }
        var temp = 'http://localhost:9090/webapp/getVendors/' + this.vendor_name;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(data => {
            console.log("Data is ", data);
            this.vendorList = data;
            if (!this.vendorList.length) {
                //alert("Empty list")
                this.display_dropdown1 = 'none';
            }
            console.log("vendors list ", this.vendorList);
        });
    }
    postPurchaseData(testForm) {
        let formData = new FormData();
        let amountString = this.amount.toString();
        console.log("Amount ", amountString);
        //formData.append('formdata',amountString);
        formData.append('formdata', JSON.stringify(this.model));
        var temp = 'http://localhost:9090/register/' + amountString;
        console.log("Formdata ", JSON.stringify(this.model));
        this.http.post(temp, formData).subscribe(data => {
            console.log("Data is ", data);
        });
        alert("Data added successfully !!");
        testForm.reset();
    }
};
AddPurchaseComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"] }
];
AddPurchaseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-purchase',
        template: __webpack_require__(/*! raw-loader!./add-purchase.component.html */ "./node_modules/raw-loader/index.js!./src/app/add-purchase/add-purchase.component.html"),
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]],
        styles: [__webpack_require__(/*! ./add-purchase.component.css */ "./src/app/add-purchase/add-purchase.component.css")]
    })
], AddPurchaseComponent);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'Bharath';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _add_purchase_add_purchase_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-purchase/add-purchase.component */ "./src/app/add-purchase/add-purchase.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _view_purchase_view_purchase_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view-purchase/view-purchase.component */ "./src/app/view-purchase/view-purchase.component.ts");
/* harmony import */ var _add_consumption_add_consumption_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add-consumption/add-consumption.component */ "./src/app/add-consumption/add-consumption.component.ts");
/* harmony import */ var _view_consumption_view_consumption_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./view-consumption/view-consumption.component */ "./src/app/view-consumption/view-consumption.component.ts");
/* harmony import */ var _handsontable_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @handsontable/angular */ "./node_modules/@handsontable/angular/fesm2015/handsontable-angular.js");
/* harmony import */ var _modify_purchase_modify_purchase_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modify-purchase/modify-purchase.component */ "./src/app/modify-purchase/modify-purchase.component.ts");
/* harmony import */ var _modify_consumption_modify_consumption_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modify-consumption/modify-consumption.component */ "./src/app/modify-consumption/modify-consumption.component.ts");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.js");
















const routes = [
    { path: 'add-purchase', component: _add_purchase_add_purchase_component__WEBPACK_IMPORTED_MODULE_7__["AddPurchaseComponent"] },
    { path: 'add-consumption', component: _add_consumption_add_consumption_component__WEBPACK_IMPORTED_MODULE_10__["AddConsumptionComponent"] },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"] },
    { path: 'view_purchase', component: _view_purchase_view_purchase_component__WEBPACK_IMPORTED_MODULE_9__["ViewPurchaseComponent"] },
    { path: 'consumption', component: _add_consumption_add_consumption_component__WEBPACK_IMPORTED_MODULE_10__["AddConsumptionComponent"] },
    { path: 'view_consumption', component: _view_consumption_view_consumption_component__WEBPACK_IMPORTED_MODULE_11__["ViewConsumptionComponent"] },
    { path: 'modify_purchase', component: _modify_purchase_modify_purchase_component__WEBPACK_IMPORTED_MODULE_13__["ModifyPurchaseComponent"] },
    { path: 'modify_consumption', component: _modify_consumption_modify_consumption_component__WEBPACK_IMPORTED_MODULE_14__["ModifyConsumptionComponent"] },
    { path: '**', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"] }
];
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"],
            _add_purchase_add_purchase_component__WEBPACK_IMPORTED_MODULE_7__["AddPurchaseComponent"],
            _view_purchase_view_purchase_component__WEBPACK_IMPORTED_MODULE_9__["ViewPurchaseComponent"],
            _add_consumption_add_consumption_component__WEBPACK_IMPORTED_MODULE_10__["AddConsumptionComponent"],
            _view_consumption_view_consumption_component__WEBPACK_IMPORTED_MODULE_11__["ViewConsumptionComponent"],
            _modify_purchase_modify_purchase_component__WEBPACK_IMPORTED_MODULE_13__["ModifyPurchaseComponent"],
            _modify_consumption_modify_consumption_component__WEBPACK_IMPORTED_MODULE_14__["ModifyConsumptionComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _handsontable_angular__WEBPACK_IMPORTED_MODULE_12__["HotTableModule"].forRoot(),
            _handsontable_angular__WEBPACK_IMPORTED_MODULE_12__["HotTableModule"],
            _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
            angular_font_awesome__WEBPACK_IMPORTED_MODULE_15__["AngularFontAwesomeModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forRoot(routes, { useHash: true })
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n    position:fixed;\r\n    top:0px;\r\n    left:0px;\r\n}\r\n\r\n#srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n}\r\n\r\n#srs_name{\r\n  width:500px;\r\n  margin-left:70px;\r\n  margin-top:20px;\r\n  color:white;\r\n  font-weight:bold;\r\n  font-size: 32pt;\r\n  font-family: daimler !important;\r\n  /* height:60px; */\r\n  float:left;\r\n}\r\n\r\n#hostel_name{\r\n  margin-top:35px;\r\n  color:#5df7d1;\r\n  float:left;\r\n  font-size: 14pt;\r\n  width:290px;\r\n  font-family: daimler !important;\r\n}\r\n\r\n#horizontal_nav{\r\n    margin-left:770px;\r\n}\r\n\r\n#srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n}\r\n\r\n#srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n}\r\n\r\n#horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n}\r\n\r\n.body_content{\r\n    background-color: white;\r\n}\r\n\r\n#view_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #005cab;\r\n    /* position:absolute; */\r\n    margin-left:240px;\r\n    margin-top:143px;\r\n    text-decoration: none;\r\n    color: white;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n \r\n  }\r\n\r\n#line{\r\n    color: black;\r\n    width: 30px;\r\n    /* position: absolute; */\r\n    float: left;\r\n    width:925px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 192px;\r\n    /* position: absolute;*/ \r\n    /* margin-left: 390px; */\r\n  }\r\n\r\n#form_bnum{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:200px;\r\n    float:left;\r\n    \r\n  }\r\n\r\n#form_bnum:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n\r\n#searchPurchase_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-207px;\r\n    margin-top:225px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n\r\n#form_bnum:focus + #searchPurchase_id, #form_bnum:not(:placeholder-shown) + #searchPurchase_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n\r\n#filtertext{\r\n    margin-top:10px;\r\n  }\r\n\r\n#filtertextbox{\r\n    height:20px;\r\n    margin-bottom: 1px;\r\n    width:140px;\r\n    margin-left:7px;\r\n    font-family:daimler!important;\r\n  }\r\n\r\n#filter_submit{\r\n    background-color: black;\r\n    color:white;\r\n    height:25px;\r\n    width:16px;\r\n    position:absolute;\r\n    margin-top:-27px;\r\n    margin-left:151px;\r\n    cursor:pointer;\r\n  }\r\n\r\n.table-heading-container{\r\n    width:1075px;\r\n    position: absolute;\r\n    background-color:white;\r\n    margin-left: 240px;\r\n    margin-top: 280px;\r\n  }\r\n\r\n.table-container{\r\n    height: 350px;\r\n    width:1075px;\r\n    background-color:white;\r\n    position: absolute;\r\n    margin-top: 384px;\r\n    margin-left: 240px;\r\n    overflow-y: auto;\r\n    /* margin-bottom: 1000px; */\r\n  }\r\n\r\n.table-container1{\r\n    height: 305px;\r\n    width:1094px;\r\n    background-color:white;\r\n    position: absolute;\r\n    margin-top: 346px;\r\n    margin-left: 240px;\r\n    overflow-y: auto;\r\n    /* margin-bottom: 1000px; */\r\n  }\r\n\r\ntable { \r\n    table-layout: fixed;\r\n    font-family: daimler !important; \r\n    font-size:large; \r\n    border-collapse: collapse; \r\n    width: 100%;\r\n    border: 2px solid #acacac; \r\n  }\r\n\r\nth{\r\n    color: black; \r\n    font-family: daimler !important;\r\n    height:35px;\r\n\r\n    border: 2px solid #acacac; \r\n  }\r\n\r\ntr{\r\n    border: 2px solid #acacac; \r\n    \r\n  }\r\n\r\ntd { \r\n  \r\n    border: 2px solid #acacac; \r\n  }\r\n\r\n#inkgs{\r\n    font-style:italic;\r\n    font-size: 8pt;\r\n  \r\n  }\r\n\r\n.reset_button{\r\n    cursor:pointer;\r\n    float: left;\r\n    margin-top: -45px;\r\n    margin-left: 885px;\r\n    background-color: white;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: #ccc solid 2px;\r\n    color:grey;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n\r\n.reset_button:focus{\r\n    outline: 0;\r\n  }\r\n\r\n.submit_button:focus{\r\n    outline: 0;\r\n  }\r\n\r\n.submit_button{\r\n    cursor: pointer;\r\n    margin-top:-45px;\r\n    margin-left: 1100px;\r\n    float: left;\r\n    background-color: #005cab;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: none;\r\n    color:white;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n\r\n.disabledClass { \r\n    border-bottom: 2px solid red;\r\n    \r\n}\r\n\r\n.disabledSubmit{\r\n  opacity:0.3;\r\n  cursor:default;\r\n \r\n}\r\n\r\n.image{\r\n   \r\n    float: left;\r\n    margin-left: 8px;\r\n    margin-top:8px;\r\n}\r\n\r\n.footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    margin-top: 100px;\r\n    /* left: 0; */\r\n    clear: both;\r\n    bottom: 0;\r\n    width: 100%;\r\n    height:2.5rem;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n}\r\n\r\n.loader {\r\n  border: 5px solid #f3f3f3;\r\n  border-radius: 60%;\r\n  border-top: 5px solid #33331a;\r\n  width: 30px;\r\n  height: 30px;\r\n  margin-top: 400px;\r\n  margin-left:650px;\r\n  -webkit-animation: spin 1.5s linear infinite; /* Safari */\r\n  animation: spin 1.5s linear infinite;\r\n}\r\n\r\n/* Safari */\r\n\r\n@-webkit-keyframes spin {\r\n  0% { -webkit-transform: rotate(0deg); }\r\n  100% { -webkit-transform: rotate(360deg); }\r\n}\r\n\r\n@keyframes spin {\r\n  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\r\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\r\n}\r\n\r\nul{\r\n  position:absolute;\r\n  margin-top:350px;\r\n  margin-left:700px;\r\n  -webkit-transform:translate(-50%,-50%);\r\n          transform:translate(-50%,-50%);\r\n  display:flex;\r\n\r\n}\r\n\r\nul li{\r\n  list-style:none;\r\n  width:6px;\r\n  height:20px;\r\n  background:#005cab;\r\n  margin : 0 4px;\r\n  -webkit-animation: animate .7s infinite alternate;\r\n          animation: animate .7s infinite alternate;\r\n\r\n}\r\n\r\n@-webkit-keyframes animate{\r\n  0%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  25%{\r\n   -webkit-transform:scaleY(1);\r\n           transform:scaleY(1);\r\n }\r\n 50%{\r\n   -webkit-transform:scaleY(1);\r\n           transform:scaleY(1);\r\n }\r\n 75%{\r\n   -webkit-transform:scaleY(1);\r\n           transform:scaleY(1);\r\n }\r\n 100%{\r\n   -webkit-transform:scaleY(3);\r\n           transform:scaleY(3);\r\n }\r\n}\r\n\r\n@keyframes animate{\r\n  0%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  25%{\r\n   -webkit-transform:scaleY(1);\r\n           transform:scaleY(1);\r\n }\r\n 50%{\r\n   -webkit-transform:scaleY(1);\r\n           transform:scaleY(1);\r\n }\r\n 75%{\r\n   -webkit-transform:scaleY(1);\r\n           transform:scaleY(1);\r\n }\r\n 100%{\r\n   -webkit-transform:scaleY(3);\r\n           transform:scaleY(3);\r\n }\r\n}\r\n\r\nul li:nth-child(1){\r\n  -webkit-animation-delay: .1s;\r\n          animation-delay: .1s;\r\n}\r\n\r\nul li:nth-child(2){\r\n -webkit-animation-delay: .2s;\r\n         animation-delay: .2s;\r\n}\r\n\r\nul li:nth-child(3){\r\n -webkit-animation-delay: .3s;\r\n         animation-delay: .3s;\r\n}\r\n\r\nul li:nth-child(4){\r\n -webkit-animation-delay: .4s;\r\n         animation-delay: .4s;\r\n}\r\n\r\nul li:nth-child(5){\r\n -webkit-animation-delay: .5s;\r\n         animation-delay: .5s;\r\n}\r\n\r\nul li:nth-child(6){\r\n -webkit-animation-delay: .6s;\r\n         animation-delay: .6s;\r\n} \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztJQUVJLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osVUFBVTtJQUNWLGNBQWM7SUFDZCxPQUFPO0lBQ1AsUUFBUTtBQUNaOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsVUFBVTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsK0JBQStCO0VBQy9CLGlCQUFpQjtFQUNqQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLFVBQVU7RUFDVixlQUFlO0VBQ2YsV0FBVztFQUNYLCtCQUErQjtBQUNqQzs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFVBQVU7SUFDViwrQkFBK0I7SUFDL0IsZUFBZTtJQUNmLGFBQWE7SUFDYixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1DQUFtQztBQUN2Qzs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7QUFDdEI7O0FBS0E7SUFDSSx1QkFBdUI7QUFDM0I7O0FBR0E7SUFDSSxXQUFXO0lBQ1gsV0FBVztJQUNYLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLCtCQUErQjs7RUFFakM7O0FBSUY7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLHdCQUF3QjtJQUN4QixXQUFXO0lBQ1gsV0FBVztJQUNYLFdBQVc7SUFDWCxZQUFZO0lBQ1osb0NBQW9DO0lBQ3BDLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsd0JBQXdCO0VBQzFC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QW9CO0FBQ3JCOztBQUNBO0NBQ0MsNEJBQW9CO1NBQXBCLG9CQUFvQjtBQUNyQjs7QUFDQTtDQUNDLDRCQUFvQjtTQUFwQixvQkFBb0I7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVye1xyXG4gICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDJhNjU7XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgcG9zaXRpb246Zml4ZWQ7XHJcbiAgICB0b3A6MHB4O1xyXG4gICAgbGVmdDowcHg7XHJcbn1cclxuXHJcbiNzcnNfbG9nb3tcclxuICAgIHdpZHRoOjEzMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NDBweDtcclxuICAgIC8qIGhlaWdodDo2MHB4OyAqL1xyXG4gICAgZmxvYXQ6bGVmdDtcclxufVxyXG5cclxuI3Nyc19uYW1le1xyXG4gIHdpZHRoOjUwMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OjcwcHg7XHJcbiAgbWFyZ2luLXRvcDoyMHB4O1xyXG4gIGNvbG9yOndoaXRlO1xyXG4gIGZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgZm9udC1zaXplOiAzMnB0O1xyXG4gIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgLyogaGVpZ2h0OjYwcHg7ICovXHJcbiAgZmxvYXQ6bGVmdDtcclxufVxyXG5cclxuI2hvc3RlbF9uYW1le1xyXG4gIG1hcmdpbi10b3A6MzVweDtcclxuICBjb2xvcjojNWRmN2QxO1xyXG4gIGZsb2F0OmxlZnQ7XHJcbiAgZm9udC1zaXplOiAxNHB0O1xyXG4gIHdpZHRoOjI5MHB4O1xyXG4gIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbiNob3Jpem9udGFsX25hdntcclxuICAgIG1hcmdpbi1sZWZ0Ojc3MHB4O1xyXG59XHJcblxyXG4jc3JzX3RleHR7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGNvbG9yOiNhMWMwZTc7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDE3cHg7XHJcbn1cclxuXHJcbiNzcnNfdGV4dDpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODcsIDEzMCwgMjUpO1xyXG59XHJcblxyXG4jaG9yaXpvbnRhbF9vcHRpb25ze1xyXG4gICAgbWFyZ2luLWxlZnQ6MjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxufVxyXG5cclxuIFxyXG5cclxuXHJcbi5ib2R5X2NvbnRlbnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuXHJcbiN2aWV3X3B1cmNoYXNle1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICAvKiBwb3NpdGlvbjphYnNvbHV0ZTsgKi9cclxuICAgIG1hcmdpbi1sZWZ0OjI0MHB4O1xyXG4gICAgbWFyZ2luLXRvcDoxNDNweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiBcclxuICB9XHJcblxyXG5cclxuXHJcbiNsaW5le1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgd2lkdGg6IDMwcHg7XHJcbiAgICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7ICovXHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIHdpZHRoOjkyNXB4O1xyXG4gICAgaGVpZ2h0OiAzcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIzLCAyMTMsIDIxMyk7XHJcbiAgICBtYXJnaW4tdG9wOiAxOTJweDtcclxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsqLyBcclxuICAgIC8qIG1hcmdpbi1sZWZ0OiAzOTBweDsgKi9cclxuICB9XHJcblxyXG5cclxuICAjZm9ybV9ibnVte1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIFxyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9ibnVtOmZvY3Vze1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogYmx1ZSBzb2xpZCAxcHg7XHJcbiAgfVxyXG5cclxuICAjc2VhcmNoUHVyY2hhc2VfaWQge1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6MTBweDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6LTIwN3B4O1xyXG4gICAgbWFyZ2luLXRvcDoyMjVweDtcclxuICAgIC8qIGxlZnQ6MDsgKi9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2JudW06Zm9jdXMgKyAjc2VhcmNoUHVyY2hhc2VfaWQsICNmb3JtX2JudW06bm90KDpwbGFjZWhvbGRlci1zaG93bikgKyAjc2VhcmNoUHVyY2hhc2VfaWQge1xyXG4gICAgb3BhY2l0eToxO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KSB0cmFuc2xhdGVZKC04MCUpIHRyYW5zbGF0ZVgoLTIwcHgpO1xyXG4gIH1cclxuXHJcblxyXG4gICNmaWx0ZXJ0ZXh0e1xyXG4gICAgbWFyZ2luLXRvcDoxMHB4O1xyXG4gIH1cclxuXHJcblxyXG4gICNmaWx0ZXJ0ZXh0Ym94e1xyXG4gICAgaGVpZ2h0OjIwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcHg7XHJcbiAgICB3aWR0aDoxNDBweDtcclxuICAgIG1hcmdpbi1sZWZ0OjdweDtcclxuICAgIGZvbnQtZmFtaWx5OmRhaW1sZXIhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcblxyXG4gICNmaWx0ZXJfc3VibWl0e1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICAgIGhlaWdodDoyNXB4O1xyXG4gICAgd2lkdGg6MTZweDtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLXRvcDotMjdweDtcclxuICAgIG1hcmdpbi1sZWZ0OjE1MXB4O1xyXG4gICAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAudGFibGUtaGVhZGluZy1jb250YWluZXJ7XHJcbiAgICB3aWR0aDoxMDc1cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjgwcHg7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAudGFibGUtY29udGFpbmVye1xyXG4gICAgaGVpZ2h0OiAzNTBweDtcclxuICAgIHdpZHRoOjEwNzVweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tdG9wOiAzODRweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyNDBweDtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAvKiBtYXJnaW4tYm90dG9tOiAxMDAwcHg7ICovXHJcbiAgfVxyXG5cclxuXHJcbiAgLnRhYmxlLWNvbnRhaW5lcjF7XHJcbiAgICBoZWlnaHQ6IDMwNXB4O1xyXG4gICAgd2lkdGg6MTA5NHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG1hcmdpbi10b3A6IDM0NnB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIC8qIG1hcmdpbi1ib3R0b206IDEwMDBweDsgKi9cclxuICB9XHJcblxyXG5cclxuICB0YWJsZSB7IFxyXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7IFxyXG4gICAgZm9udC1zaXplOmxhcmdlOyBcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IFxyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjYWNhY2FjOyBcclxuICB9IFxyXG5cclxuICB0aHtcclxuICAgIGNvbG9yOiBibGFjazsgXHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OjM1cHg7XHJcblxyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2FjYWNhYzsgXHJcbiAgfVxyXG5cclxuICB0cntcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNhY2FjYWM7IFxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gIHRkIHsgXHJcbiAgXHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjYWNhY2FjOyBcclxuICB9XHJcblxyXG5cclxuICAjaW5rZ3N7XHJcbiAgICBmb250LXN0eWxlOml0YWxpYztcclxuICAgIGZvbnQtc2l6ZTogOHB0O1xyXG4gIFxyXG4gIH1cclxuXHJcblxyXG4gIFxyXG5cclxuICAucmVzZXRfYnV0dG9ue1xyXG4gICAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIG1hcmdpbi10b3A6IC00NXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDg4NXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiAjY2NjIHNvbGlkIDJweDtcclxuICAgIGNvbG9yOmdyZXk7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5yZXNldF9idXR0b246Zm9jdXN7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gIH1cclxuICBcclxuICAuc3VibWl0X2J1dHRvbjpmb2N1c3tcclxuICAgIG91dGxpbmU6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC5zdWJtaXRfYnV0dG9ue1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgbWFyZ2luLXRvcDotNDVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMTAwcHg7XHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgLmRpc2FibGVkQ2xhc3MgeyBcclxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCByZWQ7XHJcbiAgICBcclxufVxyXG5cclxuLmRpc2FibGVkU3VibWl0e1xyXG4gIG9wYWNpdHk6MC4zO1xyXG4gIGN1cnNvcjpkZWZhdWx0O1xyXG4gXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi5pbWFnZXtcclxuICAgXHJcbiAgICBmbG9hdDogbGVmdDtcclxuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XHJcbiAgICBtYXJnaW4tdG9wOjhweDtcclxufVxyXG5cclxuXHJcbi5mb290ZXJ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBkMTtcclxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XHJcbiAgICAvKiBsZWZ0OiAwOyAqL1xyXG4gICAgY2xlYXI6IGJvdGg7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDoyLjVyZW07XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi5sb2FkZXIge1xyXG4gIGJvcmRlcjogNXB4IHNvbGlkICNmM2YzZjM7XHJcbiAgYm9yZGVyLXJhZGl1czogNjAlO1xyXG4gIGJvcmRlci10b3A6IDVweCBzb2xpZCAjMzMzMzFhO1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIGhlaWdodDogMzBweDtcclxuICBtYXJnaW4tdG9wOiA0MDBweDtcclxuICBtYXJnaW4tbGVmdDo2NTBweDtcclxuICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsgLyogU2FmYXJpICovXHJcbiAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlO1xyXG59XHJcblxyXG4vKiBTYWZhcmkgKi9cclxuQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4ge1xyXG4gIDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxyXG4gIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBzcGluIHtcclxuICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cclxufVxyXG5cclxuXHJcbnVse1xyXG4gIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gIG1hcmdpbi10b3A6MzUwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6NzAwcHg7XHJcbiAgdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuXHJcbn1cclxuXHJcbnVsIGxpe1xyXG4gIGxpc3Qtc3R5bGU6bm9uZTtcclxuICB3aWR0aDo2cHg7XHJcbiAgaGVpZ2h0OjIwcHg7XHJcbiAgYmFja2dyb3VuZDojMDA1Y2FiO1xyXG4gIG1hcmdpbiA6IDAgNHB4O1xyXG4gIGFuaW1hdGlvbjogYW5pbWF0ZSAuN3MgaW5maW5pdGUgYWx0ZXJuYXRlO1xyXG5cclxufVxyXG5cclxuQGtleWZyYW1lcyBhbmltYXRle1xyXG4gIDAle1xyXG4gICAgdHJhbnNmb3JtOnNjYWxlWSgxKTtcclxuICB9XHJcbiAgMjUle1xyXG4gICB0cmFuc2Zvcm06c2NhbGVZKDEpO1xyXG4gfVxyXG4gNTAle1xyXG4gICB0cmFuc2Zvcm06c2NhbGVZKDEpO1xyXG4gfVxyXG4gNzUle1xyXG4gICB0cmFuc2Zvcm06c2NhbGVZKDEpO1xyXG4gfVxyXG4gMTAwJXtcclxuICAgdHJhbnNmb3JtOnNjYWxlWSgzKTtcclxuIH1cclxufVxyXG5cclxudWwgbGk6bnRoLWNoaWxkKDEpe1xyXG4gIGFuaW1hdGlvbi1kZWxheTogLjFzO1xyXG59XHJcbnVsIGxpOm50aC1jaGlsZCgyKXtcclxuIGFuaW1hdGlvbi1kZWxheTogLjJzO1xyXG59XHJcbnVsIGxpOm50aC1jaGlsZCgzKXtcclxuIGFuaW1hdGlvbi1kZWxheTogLjNzO1xyXG59XHJcbnVsIGxpOm50aC1jaGlsZCg0KXtcclxuIGFuaW1hdGlvbi1kZWxheTogLjRzO1xyXG59XHJcbnVsIGxpOm50aC1jaGlsZCg1KXtcclxuIGFuaW1hdGlvbi1kZWxheTogLjVzO1xyXG59XHJcbnVsIGxpOm50aC1jaGlsZCg2KXtcclxuIGFuaW1hdGlvbi1kZWxheTogLjZzO1xyXG59ICJdfQ== */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let DashboardComponent = class DashboardComponent {
    constructor(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        this.model = {};
        this.errorMessage = "";
        this.isErrorMessage = false;
        this.myDate = new Date();
        this.Dates = {
            fromDate: '',
            toDate: ''
        };
        this.display_mode = 'none';
        this.isErrorMessage = false;
        this.display_filtertextbox = 'none';
        this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    }
    onKeydown(event) {
        this.display_mode = 'none';
    }
    ngOnInit() {
    }
    changeItem() {
        this.display_mode = 'none';
        this.show = false;
        this.isErrorMessage = false;
    }
    checkDate() {
        this.fromdate = new _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]('en-US').transform(this.Dates.fromDate, 'dd-MM-yyyy');
        this.todate = new _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]('en-US').transform(this.Dates.toDate, 'dd-MM-yyyy');
        //alert("From date "+this.fromdate+" To date "+this.todate);
    }
    findStockData() {
        this.checkDate();
        //alert("From date "+this.fromdate+" todate "+this.todate);
        this.show = true;
        var temp = 'http://localhost:9090/stock?fromdate=' + this.fromdate + '&todate=' + this.todate;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(res => {
            console.log("purchase data: ", res);
            this.stockList = res;
            if (!this.stockList.length) {
                //alert("Empty list")
                this.show = false;
                this.display_mode = 'none';
                this.isErrorMessage = true;
                this.errorMessage = "No Records Found";
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
            else if (this.stockList.length < 12) {
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.show = false;
                this.lessthan12 = true;
                this.greaterthan12 = false;
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
            else {
                this.lessthan12 = false;
                this.greaterthan12 = true;
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.show = false;
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
        }, err => {
            this.show = false;
            this.display_mode = 'none';
            this.isErrorMessage = true;
            this.display_filtertextbox = 'none';
            this.errorMessage = "No Records Found";
            console.log(this.errorMessage);
        });
    }
    clearResultField() {
        this.isErrorMessage = false;
        this.display_mode = 'none';
    }
    filterProductName() {
        //this.popup.show();
        this.display_filtertextbox = 'block';
        this.margin_top_onclick = '20px';
        this.table_container_marg_top = '384px';
    }
    getFilteredList(val) {
        var temp = 'http://localhost:9090/filteredList?productname=' + val;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(res => {
            console.log("purchase data: ", res);
            this.stockList = res;
            if (!this.stockList.length) {
                //alert("Empty list")
                this.show = false;
                this.display_mode = 'none';
                this.isErrorMessage = true;
                this.errorMessage = "No Records Found";
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
            else if (this.stockList.length < 12) {
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.show = false;
                this.lessthan12 = true;
                this.greaterthan12 = false;
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
            else {
                this.lessthan12 = false;
                this.greaterthan12 = true;
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.show = false;
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
        }, err => {
            this.show = false;
            this.display_mode = 'none';
            this.isErrorMessage = true;
            this.display_filtertextbox = 'none';
            this.errorMessage = "No Records Found";
            console.log(this.errorMessage);
        });
    }
    sortByProductName() {
        var temp = 'http://localhost:9090/sortListByName';
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(res => {
            console.log("sorted data: ", res);
            this.stockList = res;
            if (!this.stockList.length) {
                //alert("Empty list")
                this.show = false;
                this.display_mode = 'none';
                this.isErrorMessage = true;
                this.errorMessage = "No Records Found";
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
            else if (this.stockList.length < 12) {
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.show = false;
                this.lessthan12 = true;
                this.greaterthan12 = false;
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
            else {
                this.lessthan12 = false;
                this.greaterthan12 = true;
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.show = false;
                this.display_filtertextbox = 'none';
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '343px';
            }
        }, err => {
            this.show = false;
            this.display_mode = 'none';
            this.isErrorMessage = true;
            this.display_filtertextbox = 'none';
            this.errorMessage = "No Records Found";
            console.log(this.errorMessage);
        });
    }
};
DashboardComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"] }
];
DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(/*! raw-loader!./dashboard.component.html */ "./node_modules/raw-loader/index.js!./src/app/dashboard/dashboard.component.html"),
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]],
        styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
    })
], DashboardComponent);



/***/ }),

/***/ "./src/app/modify-consumption/modify-consumption.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/modify-consumption/modify-consumption.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*!\n * Copyright (c) HANDSONCODE sp. z o. o.\n * \n * HANDSONTABLE is a software distributed by HANDSONCODE sp. z o. o.,\n * a Polish corporation, based in Gdynia, Poland, at 96/98 Aleja Zwycięstwa,\n * registered with the National Court Register under number 538651,\n * EU tax ID number: PL5862294002, share capital: PLN 62,800.00.\n * \n * This software is protected by applicable copyright laws, including\n * international treaties, and dual-licensed – depending on whether\n * your use is intended for or may result in commercial advantage\n * or monetary compensation (commercial purposes), or not.\n * \n * If your use involves only such purposes as research, private study,\n * evaluation and the like, you agree to be bound by the terms included\n * in the “handsontable-non-commercial-license.pdf” file, available\n * in the main directory of this software repository.\n * \n * By installing, copying, or otherwise using this software for\n * commercial purposes, you agree to be bound by the terms included\n * in the “handsontable-general-terms.pdf” file, available in the main\n * directory of this software repository.\n * \n * HANDSONCODE PROVIDES THIS SOFTWARE ON AN “AS IS” BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND. IN NO EVENT\n * AND UNDER NO LEGAL THEORY, SHALL HANDSONCODE BE LIABLE\n * TO YOU FOR DAMAGES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,\n * INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER ARISING\n * FROM USE OR INABILITY TO USE THIS SOFTWARE.\n * \n * Version: 7.1.0\n * Release date: 11/06/2019 (built at 10/06/2019 10:35:58)\n */\n/**\n * Fix for bootstrap styles\n */\n.handsontable .table th, .handsontable .table td {\n  border-top: none;\n}\n.handsontable tr {\n  background: #fff;\n}\n.handsontable td {\n  background-color: inherit;\n}\n.handsontable .table caption + thead tr:first-child th,\n.handsontable .table caption + thead tr:first-child td,\n.handsontable .table colgroup + thead tr:first-child th,\n.handsontable .table colgroup + thead tr:first-child td,\n.handsontable .table thead:first-child tr:first-child th,\n.handsontable .table thead:first-child tr:first-child td {\n  border-top: 1px solid #CCCCCC;\n}\n/* table-bordered */\n.handsontable .table-bordered {\n  border: 0;\n  border-collapse: separate;\n}\n.handsontable .table-bordered th,\n.handsontable .table-bordered td {\n  border-left: none;\n}\n.handsontable .table-bordered th:first-child,\n.handsontable .table-bordered td:first-child {\n  border-left: 1px solid #CCCCCC;\n}\n.handsontable .table > tbody > tr > td,\n.handsontable .table > tbody > tr > th,\n.handsontable .table > tfoot > tr > td,\n.handsontable .table > tfoot > tr > th,\n.handsontable .table > thead > tr > td,\n.handsontable .table > thead > tr > th {\n  line-height: 21px;\n  padding: 0 4px;\n}\n.col-lg-1.handsontable, .col-lg-10.handsontable, .col-lg-11.handsontable, .col-lg-12.handsontable,\n.col-lg-2.handsontable, .col-lg-3.handsontable, .col-lg-4.handsontable, .col-lg-5.handsontable, .col-lg-6.handsontable, .col-lg-7.handsontable, .col-lg-8.handsontable, .col-lg-9.handsontable,\n.col-md-1.handsontable, .col-md-10.handsontable, .col-md-11.handsontable, .col-md-12.handsontable,\n.col-md-2.handsontable, .col-md-3.handsontable, .col-md-4.handsontable, .col-md-5.handsontable, .col-md-6.handsontable, .col-md-7.handsontable, .col-md-8.handsontable, .col-md-9.handsontable\n.col-sm-1.handsontable, .col-sm-10.handsontable, .col-sm-11.handsontable, .col-sm-12.handsontable,\n.col-sm-2.handsontable, .col-sm-3.handsontable, .col-sm-4.handsontable, .col-sm-5.handsontable, .col-sm-6.handsontable, .col-sm-7.handsontable, .col-sm-8.handsontable, .col-sm-9.handsontable\n.col-xs-1.handsontable, .col-xs-10.handsontable, .col-xs-11.handsontable, .col-xs-12.handsontable,\n.col-xs-2.handsontable, .col-xs-3.handsontable, .col-xs-4.handsontable, .col-xs-5.handsontable, .col-xs-6.handsontable, .col-xs-7.handsontable, .col-xs-8.handsontable, .col-xs-9.handsontable {\n  padding-left: 0;\n  padding-right: 0;\n}\n.handsontable .table-striped > tbody > tr:nth-of-type(even) {\n  background-color: #FFF;\n}\n.handsontable {\n  position: relative;\n}\n.handsontable .hide{\n  display: none;\n}\n.handsontable .relative {\n  position: relative;\n}\n.handsontable.htAutoSize {\n  visibility: hidden;\n  left: -99000px;\n  position: absolute;\n  top: -99000px;\n}\n.handsontable .wtHider {\n  width: 0;\n}\n.handsontable .wtSpreader {\n  position: relative;\n  width: 0; /*must be 0, otherwise blank space appears in scroll demo after scrolling max to the right */\n  height: auto;\n}\n.handsontable table,\n.handsontable tbody,\n.handsontable thead,\n.handsontable td,\n.handsontable th,\n.handsontable input,\n.handsontable textarea,\n.handsontable div {\n  box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n}\n.handsontable input,\n.handsontable textarea {\n  min-height: initial;\n}\n.handsontable table.htCore {\n  border-collapse: separate;\n  /* it must be separate, otherwise there are offset miscalculations in WebKit: http://stackoverflow.com/questions/2655987/border-collapse-differences-in-ff-and-webkit */\n  /* this actually only changes appearance of user selection - does not make text unselectable */\n  /* -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n  user-select: none; */ /* no browser supports unprefixed version */\n  border-spacing: 0;\n  margin: 0;\n  border-width: 0;\n  table-layout: fixed;\n  width: 0;\n  outline-width: 0;\n  cursor: default;\n  /* reset bootstrap table style. for more info see: https://github.com/handsontable/handsontable/issues/224 */\n  max-width: none;\n  max-height: none;\n}\n.handsontable col {\n  width: 50px;\n}\n.handsontable col.rowHeader {\n  width: 50px;\n}\n.handsontable th,\n.handsontable td {\n  border-top-width: 0;\n  border-left-width: 0;\n  border-right: 1px solid #CCC;\n  border-bottom: 1px solid #CCC;\n  height: 22px;\n  empty-cells: show;\n  line-height: 21px;\n  padding: 0 4px 0 4px;\n  /* top, bottom padding different than 0 is handled poorly by FF with HTML5 doctype */\n  background-color: #FFF;\n  vertical-align: top;\n  overflow: hidden;\n  outline-width: 0;\n  white-space: pre-line;\n  /* preserve new line character in cell */\n  background-clip: padding-box;\n}\n.handsontable td.htInvalid {\n  background-color: #ff4c42 !important; /*gives priority over td.area selection background*/\n}\n.handsontable td.htNoWrap {\n  white-space: nowrap;\n}\n.handsontable th:last-child {\n  /*Foundation framework fix*/\n  border-right: 1px solid #CCC;\n  border-bottom: 1px solid #CCC;\n}\n.handsontable tr:first-child th.htNoFrame,\n.handsontable th:first-child.htNoFrame,\n.handsontable th.htNoFrame {\n  border-left-width: 0;\n  background-color: white;\n  border-color: #FFF;\n}\n.handsontable th:first-child,\n.handsontable th:nth-child(2),\n.handsontable td:first-of-type,\n.handsontable .htNoFrame + th,\n.handsontable .htNoFrame + td {\n  border-left: 1px solid #CCC;\n}\n.handsontable.htRowHeaders thead tr th:nth-child(2) {\n  border-left: 1px solid #CCC;\n}\n.handsontable tr:first-child th,\n.handsontable tr:first-child td {\n  border-top: 1px solid #CCC;\n}\n.ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable tbody tr th,\n.ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable:not(.ht_clone_top) thead tr th:first-child {\n  border-right-width: 0;\n}\n.ht_master:not(.innerBorderTop) thead tr:last-child th,\n.ht_master:not(.innerBorderTop) ~ .handsontable thead tr:last-child th,\n.ht_master:not(.innerBorderTop) thead tr.lastChild th,\n.ht_master:not(.innerBorderTop) ~ .handsontable thead tr.lastChild th {\n  border-bottom-width: 0;\n}\n.handsontable th {\n  background-color: #f0f0f0;\n  color: #222;\n  text-align: center;\n  font-weight: normal;\n  white-space: nowrap;\n}\n.handsontable thead th {\n  padding: 0;\n}\n.handsontable th.active {\n  background-color: #CCC;\n}\n.handsontable thead th .relative {\n  padding: 2px 4px;\n}\n#hot-display-license-info {\n  font-size: 10px;\n  color: #323232 ;\n  padding: 5px 0 3px 0;\n  font-family: Helvetica, Arial, sans-serif;\n  text-align: left;\n}\n#hot-display-license-info a {\n  font-size: 10px;\n}\n/* plugins */\n/* row + column resizer*/\n.handsontable .manualColumnResizer {\n  position: absolute;\n  top: 0;\n  cursor: col-resize;\n  z-index: 110;\n  width: 5px;\n  height: 25px;\n}\n.handsontable .manualRowResizer {\n  position: absolute;\n  left: 0;\n  cursor: row-resize;\n  z-index: 110;\n  height: 5px;\n  width: 50px;\n}\n.handsontable .manualColumnResizer:hover,\n.handsontable .manualColumnResizer.active,\n.handsontable .manualRowResizer:hover,\n.handsontable .manualRowResizer.active {\n  background-color: #34a9db;\n}\n.handsontable .manualColumnResizerGuide {\n  position: absolute;\n  right: 0;\n  top: 0;\n  background-color: #34a9db;\n  display: none;\n  width: 0;\n  border-right: 1px dashed #777;\n  margin-left: 5px;\n}\n.handsontable .manualRowResizerGuide {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  background-color: #34a9db;\n  display: none;\n  height: 0;\n  border-bottom: 1px dashed #777;\n  margin-top: 5px;\n}\n.handsontable .manualColumnResizerGuide.active,\n.handsontable .manualRowResizerGuide.active {\n  display: block;\n  z-index: 199;\n}\n.handsontable .columnSorting {\n  position: relative;\n}\n.handsontable .columnSorting.sortAction:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.handsontable span.colHeader {\n  display: inline-block;\n  line-height: 1.1;\n}\n/* Arrow position */\n.handsontable span.colHeader.columnSorting::before {\n  /* Centering start */\n  top: 50%;\n  margin-top: -6px; /* One extra pixel for purpose of proper positioning of sorting arrow, when `font-size` set to default */\n  /* Centering end */\n\n  padding-left: 8px; /* For purpose of continuous mouse over experience, when moving between the `span` and the `::before` elements */\n  position: absolute;\n  right: -9px;\n\n  content: '';\n  height: 10px;\n  width: 5px;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position-x: right;\n}\n.handsontable span.colHeader.columnSorting.ascending::before {\n  /* arrow up; 20 x 40 px, scaled to 5 x 10 px; base64 size: 0.3kB */\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFNJREFUeAHtzjkSgCAUBNHPgsoy97+ulGXRqJE5L+xkxoYt2UdsLb5bqFINz+aLuuLn5rIu2RkO3fZpWENimNgiw6iBYRTPMLJjGFxQZ1hxxb/xBI1qC8k39CdKAAAAAElFTkSuQmCC\");\n}\n.handsontable span.colHeader.columnSorting.descending::before {\n  /* arrow down; 20 x 40 px, scaled to 5 x 10 px; base64 size: 0.3kB */\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFJJREFUeAHtzjkSgCAQRNFmQYUZ7n9dKUvru0TmvPAn3br0QfgdZ5xx6x+rQn23GqTYnq1FDcnuzZIO2WmedVqIRVxgGKEyjNgYRjKGkZ1hFIZ3I70LyM0VtU8AAAAASUVORK5CYII=\");\n}\n.htGhostTable .htCore span.colHeader.columnSorting:not(.indicatorDisabled)::after {\n  content: '*';\n  display: inline-block;\n  position: relative;\n  /* The multi-line header and header with longer text need more padding to not hide arrow,\n  we make header wider in `GhostTable` to make some space for arrow which is positioned absolutely in the main table */\n  padding-right: 20px;\n}\n/* Selection */\n.handsontable .wtBorder {\n  position: absolute;\n  font-size: 0;\n}\n.handsontable .wtBorder.hidden{\n  display:none !important;\n}\n/* A layer order of the selection types */\n.handsontable .wtBorder.current {\n  z-index: 10;\n}\n.handsontable .wtBorder.area {\n  z-index: 8;\n}\n.handsontable .wtBorder.fill {\n  z-index: 6;\n}\n.handsontable td.area,\n.handsontable td.area-1,\n.handsontable td.area-2,\n.handsontable td.area-3,\n.handsontable td.area-4,\n.handsontable td.area-5,\n.handsontable td.area-6,\n.handsontable td.area-7 {\n  position: relative;\n}\n.handsontable td.area:before,\n.handsontable td.area-1:before,\n.handsontable td.area-2:before,\n.handsontable td.area-3:before,\n.handsontable td.area-4:before,\n.handsontable td.area-5:before,\n.handsontable td.area-6:before,\n.handsontable td.area-7:before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  bottom: -100%\\9; /* Fix for IE9 to spread the \":before\" pseudo element to 100% height of the parent element */\n  background: #005eff;\n}\n/* Fix for IE10 and IE11 to spread the \":before\" pseudo element to 100% height of the parent element */\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .handsontable td.area:before,\n  .handsontable td.area-1:before,\n  .handsontable td.area-2:before,\n  .handsontable td.area-3:before,\n  .handsontable td.area-4:before,\n  .handsontable td.area-5:before,\n  .handsontable td.area-6:before,\n  .handsontable td.area-7:before {\n    bottom: -100%;\n  }\n}\n.handsontable td.area:before {\n  opacity: 0.1;\n}\n.handsontable td.area-1:before {\n  opacity: 0.2;\n}\n.handsontable td.area-2:before {\n  opacity: 0.27;\n}\n.handsontable td.area-3:before {\n  opacity: 0.35;\n}\n.handsontable td.area-4:before {\n  opacity: 0.41;\n}\n.handsontable td.area-5:before {\n  opacity: 0.47;\n}\n.handsontable td.area-6:before {\n  opacity: 0.54;\n}\n.handsontable td.area-7:before {\n  opacity: 0.58;\n}\n.handsontable tbody th.ht__highlight,\n.handsontable thead th.ht__highlight {\n  background-color: #dcdcdc;\n}\n.handsontable tbody th.ht__active_highlight,\n.handsontable thead th.ht__active_highlight {\n  background-color: #8eb0e7;\n  color: #000;\n}\n/* fill handle */\n.handsontable .wtBorder.corner {\n  font-size: 0;\n  cursor: crosshair;\n}\n.handsontable .htBorder.htFillBorder {\n  background: red;\n  width: 1px;\n  height: 1px;\n}\n.handsontableInput {\n  border: none;\n  outline-width: 0;\n  margin: 0;\n  padding: 1px 5px 0 5px;\n  font-family: inherit;\n  line-height: 21px;\n  font-size: inherit;\n  box-shadow: 0 0 0 2px #5292F7 inset;\n  resize: none;\n  /*below are needed to overwrite stuff added by jQuery UI Bootstrap theme*/\n  display: block;\n  color: #000;\n  border-radius: 0;\n  background-color: #FFF;\n  /*overwrite styles potentionally made by a framework*/\n}\n.handsontableInputHolder {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 104;\n}\n.htSelectEditor {\n  -webkit-appearance: menulist-button !important;\n  position: absolute;\n  width: auto;\n}\n/*\nTextRenderer readOnly cell\n*/\n.handsontable .htDimmed {\n  color: #777;\n}\n.handsontable .htSubmenu {\n  position: relative;\n}\n.handsontable .htSubmenu :after{\n  content: '\\25B6';\n  color: #777;\n  position: absolute;\n  right: 5px;\n  font-size: 9px;\n}\n/*\nTextRenderer horizontal alignment\n*/\n.handsontable .htLeft{\n  text-align: left;\n}\n.handsontable .htCenter{\n  text-align: center;\n}\n.handsontable .htRight{\n  text-align: right;\n}\n.handsontable .htJustify{\n  text-align: justify;\n}\n/*\nTextRenderer vertical alignment\n*/\n.handsontable .htTop{\n  vertical-align: top;\n}\n.handsontable .htMiddle{\n  vertical-align: middle;\n}\n.handsontable .htBottom{\n  vertical-align: bottom;\n}\n/*\nTextRenderer placeholder value\n*/\n.handsontable .htPlaceholder {\n  color: #999;\n}\n/*\nAutocompleteRenderer down arrow\n*/\n.handsontable .htAutocompleteArrow {\n  float: right;\n  font-size: 10px;\n  color: #EEE;\n  cursor: default;\n  width: 16px;\n  text-align: center;\n}\n.handsontable td .htAutocompleteArrow:hover {\n  color: #777;\n}\n.handsontable td.area .htAutocompleteArrow {\n  color: #d3d3d3;\n}\n/*\nCheckboxRenderer\n*/\n.handsontable .htCheckboxRendererInput {\n  display: inline-block;\n}\n.handsontable .htCheckboxRendererInput.noValue {\n  opacity: 0.5;\n}\n.handsontable .htCheckboxRendererLabel {\n  font-size: inherit;\n  vertical-align: middle;\n  cursor: pointer;\n  display: inline-block;\n  width: 100%;\n}\n/**\n * Handsontable in Handsontable\n */\n.handsontable .handsontable.ht_clone_top .wtHider {\n  padding: 0 0 5px 0;\n}\n/**\n* Autocomplete Editor\n*/\n.handsontable .autocompleteEditor.handsontable {\n  padding-right: 17px;\n}\n.handsontable .autocompleteEditor.handsontable.htMacScroll {\n  padding-right: 15px;\n}\n/**\n * Handsontable listbox theme\n */\n.handsontable.listbox {\n  margin: 0;\n}\n.handsontable.listbox .ht_master table {\n  border: 1px solid #ccc;\n  border-collapse: separate;\n  background: white;\n}\n.handsontable.listbox th,\n.handsontable.listbox tr:first-child th,\n.handsontable.listbox tr:last-child th,\n.handsontable.listbox tr:first-child td,\n.handsontable.listbox td {\n  border-color: transparent;\n}\n.handsontable.listbox th,\n.handsontable.listbox td {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.handsontable.listbox td.htDimmed {\n  cursor: default;\n  color: inherit;\n  font-style: inherit;\n}\n.handsontable.listbox .wtBorder {\n  visibility: hidden;\n}\n.handsontable.listbox tr td.current,\n.handsontable.listbox tr:hover td {\n  background: #eee;\n}\n.ht_clone_top {\n  z-index: 101;\n}\n.ht_clone_left {\n  z-index: 102;\n}\n.ht_clone_top_left_corner,\n.ht_clone_bottom_left_corner {\n  z-index: 103;\n}\n.ht_clone_debug {\n  z-index: 103;\n}\n.handsontable td.htSearchResult {\n  background: #fcedd9;\n  color: #583707;\n}\n/*\nCell borders\n*/\n.htBordered{\n  /*box-sizing: border-box !important;*/\n  border-width: 1px;\n}\n.htBordered.htTopBorderSolid {\n  border-top-style: solid;\n  border-top-color: #000;\n}\n.htBordered.htRightBorderSolid {\n  border-right-style: solid;\n  border-right-color: #000;\n}\n.htBordered.htBottomBorderSolid {\n  border-bottom-style: solid;\n  border-bottom-color: #000;\n}\n.htBordered.htLeftBorderSolid {\n  border-left-style: solid;\n  border-left-color: #000;\n}\n.handsontable tbody tr th:nth-last-child(2) {\n  border-right: 1px solid #CCC;\n}\n.handsontable thead tr:nth-last-child(2) th.htGroupIndicatorContainer {\n  border-bottom: 1px solid #CCC;\n  padding-bottom: 5px;\n}\n.ht_clone_top_left_corner thead tr th:nth-last-child(2) {\n  border-right: 1px solid #CCC;\n}\n.htCollapseButton {\n  width: 10px;\n  height: 10px;\n  line-height: 10px;\n  text-align: center;\n  border-radius: 5px;\n  border: 1px solid #f3f3f3;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n  cursor: pointer;\n  margin-bottom: 3px;\n  position: relative;\n}\n.htCollapseButton:after {\n  content: \"\";\n  height: 300%;\n  width: 1px;\n  display: block;\n  background: #ccc;\n  margin-left: 4px;\n  position: absolute;\n  /*top: -300%;*/\n  bottom: 10px;\n}\nthead .htCollapseButton {\n  right: 5px;\n  position: absolute;\n  top: 5px;\n  background: #fff;\n}\nthead .htCollapseButton:after {\n  height: 1px;\n  width: 700%;\n  right: 10px;\n  top: 4px;\n}\n.handsontable tr th .htExpandButton {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  line-height: 10px;\n  text-align: center;\n  border-radius: 5px;\n  border: 1px solid #f3f3f3;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n  cursor: pointer;\n  top: 0;\n  display: none;\n}\n.handsontable thead tr th .htExpandButton {\n  /*left: 5px;*/\n  top: 5px;\n}\n.handsontable tr th .htExpandButton.clickable {\n  display: block;\n}\n.collapsibleIndicator {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(0% ,-50%);\n          transform: translate(0% ,-50%);\n  right: 5px;\n  border: 1px solid #A6A6A6;\n  line-height: 10px;\n  color: #222;\n  border-radius: 10px;\n  font-size: 10px;\n  width: 10px;\n  height: 10px;\n  cursor: pointer;\n  box-shadow: 0 0 0 6px rgba(238,238,238,1);\n  background: #eee;\n}\n.handsontable col.hidden {\n  width: 0 !important;\n}\n.handsontable table tr th.lightRightBorder {\n  border-right: 1px solid #E6E6E6;\n}\n.handsontable tr.hidden,\n.handsontable tr.hidden td,\n.handsontable tr.hidden th {\n  display: none;\n}\n.ht_master,\n.ht_clone_left,\n.ht_clone_top,\n.ht_clone_bottom {\n  overflow: hidden;\n}\n.ht_master .wtHolder {\n  overflow: auto;\n}\n.handsontable .ht_master thead,\n.handsontable .ht_master tr th,\n.handsontable .ht_clone_left thead {\n  visibility: hidden;\n}\n.ht_clone_top .wtHolder,\n.ht_clone_left .wtHolder,\n.ht_clone_bottom .wtHolder {\n  overflow: hidden;\n}\n/*\n\n Handsontable Mobile Text Editor stylesheet\n\n */\n.handsontable.mobile,\n.handsontable.mobile .wtHolder {\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  -webkit-tap-highlight-color:rgba(0,0,0,0);\n  -webkit-overflow-scrolling: touch;\n}\n.htMobileEditorContainer {\n  display: none;\n  position: absolute;\n  top: 0;\n  width: 70%;\n  height: 54pt;\n  background: #f8f8f8;\n  border-radius: 20px;\n  border: 1px solid #ebebeb;\n  z-index: 999;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -webkit-text-size-adjust: none;\n}\n.topLeftSelectionHandle:not(.ht_master .topLeftSelectionHandle),\n.topLeftSelectionHandle-HitArea:not(.ht_master .topLeftSelectionHandle-HitArea) {\n  z-index: 9999;\n}\n/* Initial left/top coordinates - overwritten when actual position is set */\n.topLeftSelectionHandle,\n.topLeftSelectionHandle-HitArea,\n.bottomRightSelectionHandle,\n.bottomRightSelectionHandle-HitArea {\n  left: -10000px;\n  top: -10000px;\n}\n.htMobileEditorContainer.active {\n  display: block;\n}\n.htMobileEditorContainer .inputs {\n  position: absolute;\n  right: 210pt;\n  bottom: 10pt;\n  top: 10pt;\n  left: 14px;\n  height: 34pt;\n}\n.htMobileEditorContainer .inputs textarea {\n  font-size: 13pt;\n  border: 1px solid #a1a1a1;\n  -webkit-appearance: none;\n  box-shadow: none;\n  position: absolute;\n  left: 14px;\n  right: 14px;\n  top: 0;\n  bottom: 0;\n  padding: 7pt;\n}\n.htMobileEditorContainer .cellPointer {\n  position: absolute;\n  top: -13pt;\n  height: 0;\n  width: 0;\n  left: 30px;\n\n  border-left: 13pt solid transparent;\n  border-right: 13pt solid transparent;\n  border-bottom: 13pt solid #ebebeb;\n}\n.htMobileEditorContainer .cellPointer.hidden {\n  display: none;\n}\n.htMobileEditorContainer .cellPointer:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 2px;\n  height: 0;\n  width: 0;\n  left: -13pt;\n\n  border-left: 13pt solid transparent;\n  border-right: 13pt solid transparent;\n  border-bottom: 13pt solid #f8f8f8;\n}\n.htMobileEditorContainer .moveHandle {\n  position: absolute;\n  top: 10pt;\n  left: 5px;\n  width: 30px;\n  bottom: 0px;\n  cursor: move;\n  z-index: 9999;\n}\n.htMobileEditorContainer .moveHandle:after {\n  content: \"..\\a..\\a..\\a..\";\n  white-space: pre;\n  line-height: 10px;\n  font-size: 20pt;\n  display: inline-block;\n  margin-top: -8px;\n  color: #ebebeb;\n}\n.htMobileEditorContainer .positionControls {\n  width: 205pt;\n  position: absolute;\n  right: 5pt;\n  top: 0;\n  bottom: 0;\n}\n.htMobileEditorContainer .positionControls > div {\n  width: 50pt;\n  height: 100%;\n  float: left;\n}\n.htMobileEditorContainer .positionControls > div:after {\n  content: \" \";\n  display: block;\n  width: 15pt;\n  height: 15pt;\n  text-align: center;\n  line-height: 50pt;\n}\n.htMobileEditorContainer .leftButton:after,\n.htMobileEditorContainer .rightButton:after,\n.htMobileEditorContainer .upButton:after,\n.htMobileEditorContainer .downButton:after {\n  transform-origin: 5pt 5pt;\n  -webkit-transform-origin: 5pt 5pt;\n  margin: 21pt 0 0 21pt;\n}\n.htMobileEditorContainer .leftButton:after {\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(-45deg);\n  /*margin-top: 17pt;*/\n  /*margin-left: 20pt;*/\n}\n.htMobileEditorContainer .leftButton:active:after {\n  border-color: #cfcfcf;\n}\n.htMobileEditorContainer .rightButton:after {\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(135deg);\n  /*margin-top: 17pt;*/\n  /*margin-left: 10pt;*/\n}\n.htMobileEditorContainer .rightButton:active:after {\n  border-color: #cfcfcf;\n}\n.htMobileEditorContainer .upButton:after {\n  /*border-top: 2px solid #cfcfcf;*/\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(45deg);\n  /*margin-top: 22pt;*/\n  /*margin-left: 15pt;*/\n}\n.htMobileEditorContainer .upButton:active:after {\n  border-color: #cfcfcf;\n}\n.htMobileEditorContainer .downButton:after {\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(225deg);\n  /*margin-top: 15pt;*/\n  /*margin-left: 15pt;*/\n}\n.htMobileEditorContainer .downButton:active:after {\n  border-color: #cfcfcf;\n}\n.handsontable.hide-tween {\n  -webkit-animation: opacity-hide 0.3s;\n  animation: opacity-hide 0.3s;\n  animation-fill-mode: forwards;\n  -webkit-animation-fill-mode: forwards;\n}\n.handsontable.show-tween {\n  -webkit-animation: opacity-show 0.3s;\n  animation: opacity-show 0.3s;\n  animation-fill-mode: forwards;\n  -webkit-animation-fill-mode: forwards;\n}\n@charset \"UTF-8\";\n/*!\n * Pikaday\n * Copyright © 2014 David Bushell | BSD & MIT license | http://dbushell.com/\n */\n.pika-single {\n    z-index: 9999;\n    display: block;\n    position: relative;\n    color: #333;\n    background: #fff;\n    border: 1px solid #ccc;\n    border-bottom-color: #bbb;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n/*\nclear child float (pika-lendar), using the famous micro clearfix hack\nhttp://nicolasgallagher.com/micro-clearfix-hack/\n*/\n.pika-single:before,\n.pika-single:after {\n    content: \" \";\n    display: table;\n}\n.pika-single:after { clear: both }\n.pika-single { *zoom: 1 }\n.pika-single.is-hidden {\n    display: none;\n}\n.pika-single.is-bound {\n    position: absolute;\n    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);\n}\n.pika-lendar {\n    float: left;\n    width: 240px;\n    margin: 8px;\n}\n.pika-title {\n    position: relative;\n    text-align: center;\n}\n.pika-label {\n    display: inline-block;\n    *display: inline;\n    position: relative;\n    z-index: 9999;\n    overflow: hidden;\n    margin: 0;\n    padding: 5px 3px;\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n    background-color: #fff;\n}\n.pika-title select {\n    cursor: pointer;\n    position: absolute;\n    z-index: 9998;\n    margin: 0;\n    left: 0;\n    top: 5px;\n    filter: alpha(opacity=0);\n    opacity: 0;\n}\n.pika-prev,\n.pika-next {\n    display: block;\n    cursor: pointer;\n    position: relative;\n    outline: none;\n    border: 0;\n    padding: 0;\n    width: 20px;\n    height: 30px;\n    /* hide text using text-indent trick, using width value (it's enough) */\n    text-indent: 20px;\n    white-space: nowrap;\n    overflow: hidden;\n    background-color: transparent;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 75% 75%;\n    opacity: .5;\n    *position: absolute;\n    *top: 0;\n}\n.pika-prev:hover,\n.pika-next:hover {\n    opacity: 1;\n}\n.pika-prev,\n.is-rtl .pika-next {\n    float: left;\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');\n    *left: 0;\n}\n.pika-next,\n.is-rtl .pika-prev {\n    float: right;\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');\n    *right: 0;\n}\n.pika-prev.is-disabled,\n.pika-next.is-disabled {\n    cursor: default;\n    opacity: .2;\n}\n.pika-select {\n    display: inline-block;\n    *display: inline;\n}\n.pika-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 0;\n}\n.pika-table th,\n.pika-table td {\n    width: 14.285714285714286%;\n    padding: 0;\n}\n.pika-table th {\n    color: #999;\n    font-size: 12px;\n    line-height: 25px;\n    font-weight: bold;\n    text-align: center;\n}\n.pika-button {\n    cursor: pointer;\n    display: block;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    outline: none;\n    border: 0;\n    margin: 0;\n    width: 100%;\n    padding: 5px;\n    color: #666;\n    font-size: 12px;\n    line-height: 15px;\n    text-align: right;\n    background: #f5f5f5;\n}\n.pika-week {\n    font-size: 11px;\n    color: #999;\n}\n.is-today .pika-button {\n    color: #33aaff;\n    font-weight: bold;\n}\n.is-selected .pika-button {\n    color: #fff;\n    font-weight: bold;\n    background: #33aaff;\n    box-shadow: inset 0 1px 3px #178fe5;\n    border-radius: 3px;\n}\n.is-inrange .pika-button {\n    background: #D5E9F7;\n}\n.is-startrange .pika-button {\n    color: #fff;\n    background: #6CB31D;\n    box-shadow: none;\n    border-radius: 3px;\n}\n.is-endrange .pika-button {\n    color: #fff;\n    background: #33aaff;\n    box-shadow: none;\n    border-radius: 3px;\n}\n.is-disabled .pika-button,\n.is-outside-current-month .pika-button {\n    pointer-events: none;\n    cursor: default;\n    color: #999;\n    opacity: .3;\n}\n.pika-button:hover {\n    color: #fff;\n    background: #ff8000;\n    box-shadow: none;\n    border-radius: 3px;\n}\n/* styling for abbr */\n.pika-table abbr {\n    border-bottom: none;\n    cursor: help;\n}\n.htCommentCell {\n    position: relative;\n}\n.htCommentCell:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-left: 6px solid transparent;\n    border-top: 6px solid black;\n}\n.htComments {\n    display: none;\n    z-index: 1059;\n    position: absolute;\n}\n.htCommentTextArea {\n    box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px;\n    box-sizing: border-box;\n    border: none;\n    border-left: 3px solid #ccc;\n    background-color: #fff;\n    width: 215px;\n    height: 90px;\n    font-size: 12px;\n    padding: 5px;\n    outline: 0px !important;\n    -webkit-appearance: none;\n}\n.htCommentTextArea:focus {\n    box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px, inset 0 0 0 1px #5292f7;\n    border-left: 3px solid #5292f7;\n}\n/*!\n * Handsontable ContextMenu\n */\n.htContextMenu:not(.htGhostTable) {\n  display: none;\n  position: absolute;\n  z-index: 1060; /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */\n}\n.htContextMenu .ht_clone_top,\n.htContextMenu .ht_clone_left,\n.htContextMenu .ht_clone_corner,\n.htContextMenu .ht_clone_debug {\n  display: none;\n}\n.htContextMenu table.htCore {\n  border: 1px solid #ccc;\n  border-bottom-width: 2px;\n  border-right-width: 2px;\n}\n.htContextMenu .wtBorder {\n  visibility: hidden;\n}\n.htContextMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.htContextMenu table tbody tr td:first-child {\n  border: 0;\n}\n.htContextMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232;\n}\n.htContextMenu table tbody tr td.current,\n.htContextMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #f3f3f3;\n}\n.htContextMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #e6e6e6;\n  height: 0;\n  padding: 0;\n  cursor: default;\n}\n.htContextMenu table tbody tr td.htDisabled {\n  color: #999;\n  cursor: default;\n}\n.htContextMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default;\n}\n.htContextMenu table tbody tr.htHidden {\n  display: none;\n}\n.htContextMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 6px;\n}\n.htContextMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px;\n}\n.htContextMenu .ht_master .wtHolder {\n  overflow: hidden;\n}\ntextarea#HandsontableCopyPaste {\n  position: fixed !important;\n  top: 0 !important;\n  right: 100% !important;\n  overflow: hidden;\n  opacity: 0;\n  outline: 0 none !important;\n}\n.htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_top_left_corner th:nth-child(2),\n.htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_left td:first-of-type {\n  border-left: 0 none;\n}\n.handsontable .wtHider {\n  position: relative;\n}\n.handsontable.ht__manualColumnMove.after-selection--columns thead th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.handsontable.ht__manualColumnMove.on-moving--columns,\n.handsontable.ht__manualColumnMove.on-moving--columns thead th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n.handsontable.ht__manualColumnMove.on-moving--columns .manualColumnResizer {\n  display: none;\n}\n.handsontable .ht__manualColumnMove--guideline,\n.handsontable .ht__manualColumnMove--backlight {\n  position: absolute;\n  height: 100%;\n  display: none;\n}\n.handsontable .ht__manualColumnMove--guideline {\n  background: #757575;\n  width: 2px;\n  top: 0;\n  margin-left: -1px;\n  z-index: 105;\n}\n.handsontable .ht__manualColumnMove--backlight {\n  background: #343434;\n  background: rgba(52, 52, 52, 0.25);\n  display: none;\n  z-index: 105;\n  pointer-events: none;\n}\n.handsontable.on-moving--columns.show-ui .ht__manualColumnMove--guideline,\n.handsontable.on-moving--columns .ht__manualColumnMove--backlight {\n  display: block;\n}\n.handsontable .wtHider {\n  position: relative;\n}\n.handsontable.ht__manualRowMove.after-selection--rows tbody th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.handsontable.ht__manualRowMove.on-moving--rows,\n.handsontable.ht__manualRowMove.on-moving--rows tbody th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n.handsontable.ht__manualRowMove.on-moving--rows .manualRowResizer {\n  display: none;\n}\n.handsontable .ht__manualRowMove--guideline,\n.handsontable .ht__manualRowMove--backlight {\n  position: absolute;\n  width: 100%;\n  display: none;\n}\n.handsontable .ht__manualRowMove--guideline {\n  background: #757575;\n  height: 2px;\n  left: 0;\n  margin-top: -1px;\n  z-index: 105;\n}\n.handsontable .ht__manualRowMove--backlight {\n  background: #343434;\n  background: rgba(52, 52, 52, 0.25);\n  display: none;\n  z-index: 105;\n  pointer-events: none;\n}\n.handsontable.on-moving--rows.show-ui .ht__manualRowMove--guideline,\n.handsontable.on-moving--rows .ht__manualRowMove--backlight {\n  display: block;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"]:not([class*=\"fullySelectedMergedCell\"]):before {\n    opacity: 0;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-multiple\"]:before {\n    opacity: 0.1;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-0\"]:before {\n    opacity: 0.1;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-1\"]:before {\n    opacity: 0.2;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-2\"]:before {\n    opacity: 0.27;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-3\"]:before {\n    opacity: 0.35;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-4\"]:before {\n    opacity: 0.41;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-5\"]:before {\n    opacity: 0.47;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-6\"]:before {\n    opacity: 0.54;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-7\"]:before {\n    opacity: 0.58;\n}\n/*!\n * Handsontable DropdownMenu\n */\n.handsontable .changeType {\n  background: #eee;\n  border-radius: 2px;\n  border: 1px solid #bbb;\n  color: #bbb;\n  font-size: 9px;\n  line-height: 9px;\n  padding: 2px;\n  margin: 3px 1px 0 5px;\n  float: right;\n}\n.handsontable .changeType:before {\n  content: '\\25BC\\ ';\n}\n.handsontable .changeType:hover {\n  border: 1px solid #777;\n  color: #777;\n  cursor: pointer;\n}\n.htDropdownMenu:not(.htGhostTable) {\n  display: none;\n  position: absolute;\n  z-index: 1060; /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */\n}\n.htDropdownMenu .ht_clone_top,\n.htDropdownMenu .ht_clone_left,\n.htDropdownMenu .ht_clone_corner,\n.htDropdownMenu .ht_clone_debug {\n  display: none;\n}\n.htDropdownMenu table.htCore {\n  border: 1px solid #bbb;\n  border-bottom-width: 2px;\n  border-right-width: 2px;\n}\n.htDropdownMenu .wtBorder {\n  visibility: hidden;\n}\n.htDropdownMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.htDropdownMenu table tbody tr td:first-child {\n  border: 0;\n}\n.htDropdownMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232;\n}\n.htDropdownMenu table tbody tr td.current,\n.htDropdownMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #e9e9e9;\n}\n.htDropdownMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #e6e6e6;\n  height: 0;\n  padding: 0;\n  cursor: default;\n}\n.htDropdownMenu table tbody tr td.htDisabled {\n  color: #999;\n}\n.htDropdownMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default;\n}\n.htDropdownMenu:not(.htGhostTable) table tbody tr.htHidden {\n  display: none;\n}\n.htDropdownMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.htDropdownMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px;\n}\n.htDropdownMenu .ht_master .wtHolder {\n  overflow: hidden;\n}\n/* Column's number position */\n.handsontable span.colHeader.columnSorting::after {\n  /* Centering start */\n  top: 50%;\n  margin-top: -2px; /* Two extra pixels (-2 instead of -4) for purpose of proper positioning of numeric indicators, when `font-size` set to default */\n  /* Centering end */\n\n  position: absolute;\n  right: -15px;\n  padding-left: 5px; ; /* For purpose of continuous mouse over experience, when moving between the `::before` and the `::after` elements */\n\n  font-size: 8px;\n  height: 8px;\n  line-height: 1.1;\n  text-decoration: underline; /* Workaround for IE9 - IE11 */\n}\n/* Workaround for IE9 - IE11, https://stackoverflow.com/a/21902566, https://stackoverflow.com/a/32120247 */\n.handsontable span.colHeader.columnSorting::after {\n  text-decoration: none;\n}\n/* We support up to 7 numeric indicators, describing order of column in sorted columns queue */\n.handsontable span.colHeader.columnSorting[class^=\"sort-\"]::after,\n.handsontable span.colHeader.columnSorting[class*=\" sort-\"]::after {\n  content: \"+\"\n}\n.handsontable span.colHeader.columnSorting.sort-1::after {\n  content: '1';\n}\n.handsontable span.colHeader.columnSorting.sort-2::after {\n  content: '2';\n}\n.handsontable span.colHeader.columnSorting.sort-3::after {\n  content: '3';\n}\n.handsontable span.colHeader.columnSorting.sort-4::after {\n  content: '4';\n}\n.handsontable span.colHeader.columnSorting.sort-5::after {\n  content: '5';\n}\n.handsontable span.colHeader.columnSorting.sort-6::after {\n  content: '6';\n}\n.handsontable span.colHeader.columnSorting.sort-7::after {\n  content: '7';\n}\n/* Drop-down menu widens header by 5 pixels, sort sequence numbers won't overlap the icon; mainly for the IE9+ */\n.htGhostTable th div button.changeType + span.colHeader.columnSorting:not(.indicatorDisabled) {\n  padding-right: 5px;\n}\n/*!\n * Handsontable Filters\n */\n/* Conditions menu */\n.htFiltersConditionsMenu:not(.htGhostTable) {\n  display: none;\n  position: absolute;\n  z-index: 1070;\n}\n.htFiltersConditionsMenu .ht_clone_top,\n.htFiltersConditionsMenu .ht_clone_left,\n.htFiltersConditionsMenu .ht_clone_corner,\n.htFiltersConditionsMenu .ht_clone_debug {\n  display: none;\n}\n.htFiltersConditionsMenu table.htCore {\n  border: 1px solid #bbb;\n  border-bottom-width: 2px;\n  border-right-width: 2px;\n}\n.htFiltersConditionsMenu .wtBorder {\n  visibility: hidden;\n}\n.htFiltersConditionsMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.htFiltersConditionsMenu table tbody tr td:first-child {\n  border: 0;\n}\n.htFiltersConditionsMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232;\n}\n.htFiltersConditionsMenu table tbody tr td.current,\n.htFiltersConditionsMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #e9e9e9;\n}\n.htFiltersConditionsMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #e6e6e6;\n  height: 0;\n  padding: 0;\n}\n.htFiltersConditionsMenu table tbody tr td.htDisabled {\n  color: #999;\n}\n.htFiltersConditionsMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default;\n}\n.htFiltersConditionsMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.htFiltersConditionsMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px;\n}\n.htFiltersConditionsMenu .ht_master .wtHolder {\n  overflow: hidden;\n}\n.handsontable .htMenuFiltering {\n  border-bottom: 1px dotted #ccc;\n  height: 135px;\n  overflow: hidden;\n}\n.handsontable .ht_master table td.htCustomMenuRenderer {\n  background-color: #fff;\n  cursor: auto;\n}\n/* Menu label */\n.handsontable .htFiltersMenuLabel {\n  font-size: 0.75em;\n}\n/* Component action bar */\n.handsontable .htFiltersMenuActionBar {\n  text-align: center;\n  padding-top: 10px;\n  padding-bottom: 3px;\n}\n/* Component filter by conditional */\n.handsontable .htFiltersMenuCondition.border {\n  border-bottom: 1px dotted #ccc !important;\n}\n.handsontable .htFiltersMenuCondition .htUIInput {\n  padding: 0 0 5px 0;\n}\n/* Component filter by value */\n.handsontable .htFiltersMenuValue {\n  border-bottom: 1px dotted #ccc !important;\n}\n.handsontable .htFiltersMenuValue .htUIMultipleSelectSearch {\n  padding: 0;\n}\n.handsontable .htFiltersMenuCondition .htUIInput input,\n.handsontable .htFiltersMenuValue .htUIMultipleSelectSearch input {\n  font-family: inherit;\n  font-size: 0.75em;\n  padding: 4px;\n  box-sizing: border-box;\n  width: 100%;\n}\n.htUIMultipleSelect .ht_master .wtHolder {\n  overflow-y: scroll;\n}\n.handsontable .htFiltersActive .changeType {\n  border: 1px solid #509272;\n  color: #18804e;\n  background-color: #d2e0d9;\n}\n.handsontable .htUISelectAll {\n  margin-right: 10px;\n}\n.handsontable .htUIClearAll, .handsontable .htUISelectAll {\n  display: inline-block;\n}\n.handsontable .htUIClearAll a, .handsontable .htUISelectAll a {\n  color: #3283D8;\n  font-size: 0.75em;\n}\n.handsontable .htUISelectionControls {\n  text-align: right;\n}\n.handsontable .htCheckboxRendererInput {\n  margin: 0 5px 0 0;\n  vertical-align: middle;\n  height: 1em;\n}\n/* UI elements */\n/* Input */\n.handsontable .htUIInput {\n  padding: 3px 0 7px 0;\n  position: relative;\n  text-align: center;\n}\n.handsontable .htUIInput input {\n  border-radius: 2px;\n  border: 1px solid #d2d1d1;\n}\n.handsontable .htUIInput input:focus {\n  outline: 0;\n}\n.handsontable .htUIInputIcon {\n  position: absolute;\n}\n/* Button */\n.handsontable .htUIInput.htUIButton {\n  cursor: pointer;\n  display: inline-block;\n}\n.handsontable .htUIInput.htUIButton input {\n  background-color: #eee;\n  color: #000;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 0.7em;\n  font-weight: bold;\n  height: 19px;\n  min-width: 64px;\n}\n.handsontable .htUIInput.htUIButton input:hover {\n  border-color: #b9b9b9;\n}\n.handsontable .htUIInput.htUIButtonOK {\n  margin-right: 10px;\n}\n.handsontable .htUIInput.htUIButtonOK input {\n  background-color: #0f9d58;\n  border-color: #18804e;\n  color: #fff;\n}\n.handsontable .htUIInput.htUIButtonOK input:hover {\n  border-color: #1a6f46;\n}\n/* Select */\n.handsontable .htUISelect {\n  cursor: pointer;\n  margin-bottom: 7px;\n  position: relative;\n}\n.handsontable .htUISelectCaption {\n  background-color: #e8e8e8;\n  border-radius: 2px;\n  border: 1px solid #d2d1d1;\n  font-family: inherit;\n  font-size: 0.7em;\n  font-weight: bold;\n  padding: 3px 20px 3px 10px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.handsontable .htUISelectCaption:hover {\n  background-color: #e8e8e8;\n  border: 1px solid #b9b9b9;\n}\n.handsontable .htUISelectDropdown:after {\n  content: '\\25B2';\n  font-size: 7px;\n  position: absolute;\n  right: 10px;\n  top: 0;\n}\n.handsontable .htUISelectDropdown:before {\n  content: '\\25BC';\n  font-size: 7px;\n  position: absolute;\n  right: 10px;\n  top: 8px;\n}\n/* SelectMultiple */\n.handsontable .htUIMultipleSelect .handsontable .htCore {\n  border: none;\n}\n.handsontable .htUIMultipleSelect .handsontable .htCore td:hover {\n  background-color: #F5F5F5;\n}\n.handsontable .htUIMultipleSelectSearch input {\n  border-radius: 2px;\n  border: 1px solid #d2d1d1;\n  padding: 3px;\n}\n.handsontable .htUIRadio {\n  display: inline-block;\n  margin-right: 5px;\n  height: 100%;\n}\n.handsontable .htUIRadio:last-child {\n  margin-right: 0;\n}\n.handsontable .htUIRadio > input[type=radio] {\n  margin-right: 0.5ex;\n}\n.handsontable .htUIRadio label {\n  vertical-align: middle;\n}\n.handsontable .htFiltersMenuOperators {\n  padding-bottom: 5px;\n}\n.handsontable.ganttChart tr:first-child th div.relative {\n  padding-right: 21px;\n}\n.handsontable.ganttChart .colHeader {\n  display: block;\n}\n.handsontable.ganttChart td.rangeBar {\n  background: #48b703;\n  border-right-width: 0;\n  position: relative;\n  box-shadow: inset 0 3px 0 #ffffff;\n}\n.handsontable.ganttChart td.rangeBar.last {\n  border-right-width: 1px;\n}\n.handsontable.ganttChart td.rangeBar.area {\n  background: #7EC481;\n}\n.handsontable.ganttChart td.rangeBar.partial {\n  background: #8edf5a;\n}\n.handsontable.ganttChart td.rangeBar.area.partial {\n  background: #A1D8AD;\n}\n.handsontable thead th.hiddenHeader:not(:first-of-type) {\n  display: none;\n}\n.handsontable th.ht_nestingLevels {\n    text-align: left;\n    padding-left: 7px;\n}\n.handsontable th div.ht_nestingLevels {\n    display: inline-block;\n    position: absolute;\n    left: 11px;\n}\n.handsontable.innerBorderLeft th div.ht_nestingLevels,\n.handsontable.innerBorderLeft ~ .handsontable th div.ht_nestingLevels {\n    right: 10px;\n}\n.handsontable th span.ht_nestingLevel {\n    display: inline-block;\n}\n.handsontable th span.ht_nestingLevel_empty {\n    display: inline-block;\n    width: 10px;\n    height: 1px;\n    float: left;\n}\n.handsontable th span.ht_nestingLevel::after {\n    content: \"\\2510\";\n    font-size: 9px;\n    display: inline-block;\n    position: relative;\n    bottom: 3px;\n}\n.handsontable th div.ht_nestingButton {\n    display: inline-block;\n    position: absolute;\n    right: -2px;\n    cursor: pointer;\n}\n.handsontable th div.ht_nestingButton.ht_nestingExpand::after {\n    content: \"\\002B\";\n}\n.handsontable th div.ht_nestingButton.ht_nestingCollapse::after {\n    content: \"\\002D\";\n}\n.handsontable.innerBorderLeft th div.ht_nestingButton,\n.handsontable.innerBorderLeft ~ .handsontable th div.ht_nestingButton {\n    right: 0;\n}\n/*\n * Handsontable HiddenColumns\n */\n.handsontable th.beforeHiddenColumn {\n  position: relative;\n}\n.handsontable th.beforeHiddenColumn::after,\n.handsontable th.afterHiddenColumn::before {\n  color: #bbb;\n  position: absolute;\n  top: 50%;\n  font-size: 5pt;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n.handsontable th.afterHiddenColumn {\n  position: relative;\n}\n.handsontable th.beforeHiddenColumn::after {\n  right: 1px;\n  content: '\\25C0';\n}\n.handsontable th.afterHiddenColumn::before {\n  left: 1px;\n  content: '\\25B6';\n}\n.handsontable td.firstVisibleColumn,\n.handsontable th.firstVisibleColumn {\n  border-left: 1px solid #CCC;\n}\n/*!\n * Handsontable HiddenRows\n */\n.handsontable th.beforeHiddenRow::before,\n.handsontable th.afterHiddenRow::after {\n  color: #bbb;\n  font-size: 6pt;\n  line-height: 6pt;\n  position: absolute;\n  left: 2px;\n}\n.handsontable th.beforeHiddenRow,\n.handsontable th.afterHiddenRow {\n  position: relative;\n}\n.handsontable th.beforeHiddenRow::before {\n  content: '\\25B2';\n  bottom: 2px;\n}\n.handsontable th.afterHiddenRow::after {\n  content: '\\25BC';\n  top: 2px;\n}\n.handsontable.ht__selection--rows tbody th.beforeHiddenRow.ht__highlight:before,\n.handsontable.ht__selection--rows tbody th.afterHiddenRow.ht__highlight:after {\n  color: #eee;\n}\n.handsontable td.afterHiddenRow.firstVisibleRow,\n.handsontable th.afterHiddenRow.firstVisibleRow {\n  border-top: 1px solid #CCC;\n}\n.header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n  \r\n    \r\n  }\n#srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\n#srs_name{\r\n    width:500px;\r\n    margin-left:70px;\r\n    margin-top:20px;\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size: 32pt;\r\n    font-family: daimler !important;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\n#hostel_name{\r\n    margin-top:35px;\r\n    color:#5df7d1;\r\n    float:left;\r\n    font-size: 14pt;\r\n    width:290px;\r\n    font-family: daimler !important;\r\n  }\n#horizontal_nav{\r\n    margin-left:770px;\r\n  }\n#srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n  }\n#srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n  }\n#horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n  }\n.body_content{\r\n    background-color: white;\r\n  }\n#add_consumption{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    margin-top:53px;\r\n    position: absolute;\r\n    margin-left: 240px;\r\n    text-decoration: none;\r\n    color: black;\r\n    text-align: center;\r\n    float:left;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n#view_consumption{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:390px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n#modify_consumption{\r\n    height:50px;\r\n    width:170px;\r\n    background-color: #005cab;\r\n    position:absolute;\r\n    margin-left:541px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: white;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n#line{\r\n    color: black;\r\n    width: 30px;\r\n    position: absolute;\r\n    width:605px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 100px;\r\n    /* position: absolute;*/ \r\n    margin-left: 711px;\r\n  }\n.spreadsheet{\r\n    height:500px;\r\n    max-width:50px;\r\n    overflow: scroll;\r\n    overflow-x: hidden;\r\n    overflow-y: hidden;\r\n    position: absolute;\r\n    margin-left:240px;\r\n    margin-top: 145px;\r\n  }\n.save_button{\r\n    cursor: pointer;\r\n    background-color: #005cab;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: none;\r\n    color:white;\r\n    outline:none;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n.footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n  }\n.loader {\r\n    border: 5px solid #f3f3f3;\r\n    border-radius: 60%;\r\n    border-top: 5px solid #33331a;\r\n    width: 30px;\r\n    height: 30px;\r\n    margin-top: 80px;\r\n    margin-left:650px;\r\n    -webkit-animation: spin 1.5s linear infinite; /* Safari */\r\n    animation: spin 1.5s linear infinite;\r\n  }\n/* Safari */\n@-webkit-keyframes spin {\r\n    0% { -webkit-transform: rotate(0deg); }\r\n    100% { -webkit-transform: rotate(360deg); }\r\n  }\n@keyframes spin {\r\n    0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\r\n    100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9oYW5kc29udGFibGUvZGlzdC9oYW5kc29udGFibGUuZnVsbC5jc3MiLCJzcmMvYXBwL21vZGlmeS1jb25zdW1wdGlvbi9tb2RpZnktY29uc3VtcHRpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQ0U7QUFDRjs7RUFFRTtBQUNGO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBOzs7Ozs7RUFNRSw2QkFBNkI7QUFDL0I7QUFFQSxtQkFBbUI7QUFDbkI7RUFDRSxTQUFTO0VBQ1QseUJBQXlCO0FBQzNCO0FBRUE7O0VBRUUsaUJBQWlCO0FBQ25CO0FBRUE7O0VBRUUsOEJBQThCO0FBQ2hDO0FBRUE7Ozs7OztFQU1FLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCO0FBRUE7Ozs7Ozs7O0VBUUUsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7QUFFQTtFQUNFLFFBQVE7QUFDVjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVEsRUFBRSw0RkFBNEY7RUFDdEcsWUFBWTtBQUNkO0FBRUE7Ozs7Ozs7O0VBUUUsdUJBQXVCO0VBQ3ZCLCtCQUErQjtFQUMvQiw0QkFBNEI7QUFDOUI7QUFFQTs7RUFFRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix1S0FBdUs7RUFDdkssOEZBQThGO0VBQzlGOzs7OztzQkFLb0IsRUFBRSwyQ0FBMkM7RUFDakUsaUJBQWlCO0VBQ2pCLFNBQVM7RUFDVCxlQUFlO0VBQ2Ys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QXZCLHVCQUF1QixFQUFFO0lBQzlCLE9BQU8saUNBQXlCLEVBQXpCLHlCQUF5QixFQUFFO0VBQ3BDIiwiZmlsZSI6InNyYy9hcHAvbW9kaWZ5LWNvbnN1bXB0aW9uL21vZGlmeS1jb25zdW1wdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBDb3B5cmlnaHQgKGMpIEhBTkRTT05DT0RFIHNwLiB6IG8uIG8uXG4gKiBcbiAqIEhBTkRTT05UQUJMRSBpcyBhIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIGJ5IEhBTkRTT05DT0RFIHNwLiB6IG8uIG8uLFxuICogYSBQb2xpc2ggY29ycG9yYXRpb24sIGJhc2VkIGluIEdkeW5pYSwgUG9sYW5kLCBhdCA5Ni85OCBBbGVqYSBad3ljaWXMqHN0d2EsXG4gKiByZWdpc3RlcmVkIHdpdGggdGhlIE5hdGlvbmFsIENvdXJ0IFJlZ2lzdGVyIHVuZGVyIG51bWJlciA1Mzg2NTEsXG4gKiBFVSB0YXggSUQgbnVtYmVyOiBQTDU4NjIyOTQwMDIsIHNoYXJlIGNhcGl0YWw6IFBMTiA2Miw4MDAuMDAuXG4gKiBcbiAqIFRoaXMgc29mdHdhcmUgaXMgcHJvdGVjdGVkIGJ5IGFwcGxpY2FibGUgY29weXJpZ2h0IGxhd3MsIGluY2x1ZGluZ1xuICogaW50ZXJuYXRpb25hbCB0cmVhdGllcywgYW5kIGR1YWwtbGljZW5zZWQg4oCTIGRlcGVuZGluZyBvbiB3aGV0aGVyXG4gKiB5b3VyIHVzZSBpcyBpbnRlbmRlZCBmb3Igb3IgbWF5IHJlc3VsdCBpbiBjb21tZXJjaWFsIGFkdmFudGFnZVxuICogb3IgbW9uZXRhcnkgY29tcGVuc2F0aW9uIChjb21tZXJjaWFsIHB1cnBvc2VzKSwgb3Igbm90LlxuICogXG4gKiBJZiB5b3VyIHVzZSBpbnZvbHZlcyBvbmx5IHN1Y2ggcHVycG9zZXMgYXMgcmVzZWFyY2gsIHByaXZhdGUgc3R1ZHksXG4gKiBldmFsdWF0aW9uIGFuZCB0aGUgbGlrZSwgeW91IGFncmVlIHRvIGJlIGJvdW5kIGJ5IHRoZSB0ZXJtcyBpbmNsdWRlZFxuICogaW4gdGhlIOKAnGhhbmRzb250YWJsZS1ub24tY29tbWVyY2lhbC1saWNlbnNlLnBkZuKAnSBmaWxlLCBhdmFpbGFibGVcbiAqIGluIHRoZSBtYWluIGRpcmVjdG9yeSBvZiB0aGlzIHNvZnR3YXJlIHJlcG9zaXRvcnkuXG4gKiBcbiAqIEJ5IGluc3RhbGxpbmcsIGNvcHlpbmcsIG9yIG90aGVyd2lzZSB1c2luZyB0aGlzIHNvZnR3YXJlIGZvclxuICogY29tbWVyY2lhbCBwdXJwb3NlcywgeW91IGFncmVlIHRvIGJlIGJvdW5kIGJ5IHRoZSB0ZXJtcyBpbmNsdWRlZFxuICogaW4gdGhlIOKAnGhhbmRzb250YWJsZS1nZW5lcmFsLXRlcm1zLnBkZuKAnSBmaWxlLCBhdmFpbGFibGUgaW4gdGhlIG1haW5cbiAqIGRpcmVjdG9yeSBvZiB0aGlzIHNvZnR3YXJlIHJlcG9zaXRvcnkuXG4gKiBcbiAqIEhBTkRTT05DT0RFIFBST1ZJREVTIFRISVMgU09GVFdBUkUgT04gQU4g4oCcQVMgSVPigJ0gQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORC4gSU4gTk8gRVZFTlRcbiAqIEFORCBVTkRFUiBOTyBMRUdBTCBUSEVPUlksIFNIQUxMIEhBTkRTT05DT0RFIEJFIExJQUJMRVxuICogVE8gWU9VIEZPUiBEQU1BR0VTLCBJTkNMVURJTkcgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIFNQRUNJQUwsXG4gKiBJTkNJREVOVEFMLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT0YgQU5ZIENIQVJBQ1RFUiBBUklTSU5HXG4gKiBGUk9NIFVTRSBPUiBJTkFCSUxJVFkgVE8gVVNFIFRISVMgU09GVFdBUkUuXG4gKiBcbiAqIFZlcnNpb246IDcuMS4wXG4gKiBSZWxlYXNlIGRhdGU6IDExLzA2LzIwMTkgKGJ1aWx0IGF0IDEwLzA2LzIwMTkgMTA6MzU6NTgpXG4gKi9cbi8qKlxuICogRml4IGZvciBib290c3RyYXAgc3R5bGVzXG4gKi9cbi5oYW5kc29udGFibGUgLnRhYmxlIHRoLCAuaGFuZHNvbnRhYmxlIC50YWJsZSB0ZCB7XG4gIGJvcmRlci10b3A6IG5vbmU7XG59XG5cbi5oYW5kc29udGFibGUgdHIge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbn1cblxuLmhhbmRzb250YWJsZSAudGFibGUgY2FwdGlvbiArIHRoZWFkIHRyOmZpcnN0LWNoaWxkIHRoLFxuLmhhbmRzb250YWJsZSAudGFibGUgY2FwdGlvbiArIHRoZWFkIHRyOmZpcnN0LWNoaWxkIHRkLFxuLmhhbmRzb250YWJsZSAudGFibGUgY29sZ3JvdXAgKyB0aGVhZCB0cjpmaXJzdC1jaGlsZCB0aCxcbi5oYW5kc29udGFibGUgLnRhYmxlIGNvbGdyb3VwICsgdGhlYWQgdHI6Zmlyc3QtY2hpbGQgdGQsXG4uaGFuZHNvbnRhYmxlIC50YWJsZSB0aGVhZDpmaXJzdC1jaGlsZCB0cjpmaXJzdC1jaGlsZCB0aCxcbi5oYW5kc29udGFibGUgLnRhYmxlIHRoZWFkOmZpcnN0LWNoaWxkIHRyOmZpcnN0LWNoaWxkIHRkIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0NDQ0M7XG59XG5cbi8qIHRhYmxlLWJvcmRlcmVkICovXG4uaGFuZHNvbnRhYmxlIC50YWJsZS1ib3JkZXJlZCB7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcbn1cblxuLmhhbmRzb250YWJsZSAudGFibGUtYm9yZGVyZWQgdGgsXG4uaGFuZHNvbnRhYmxlIC50YWJsZS1ib3JkZXJlZCB0ZCB7XG4gIGJvcmRlci1sZWZ0OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIC50YWJsZS1ib3JkZXJlZCB0aDpmaXJzdC1jaGlsZCxcbi5oYW5kc29udGFibGUgLnRhYmxlLWJvcmRlcmVkIHRkOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDQ0NDO1xufVxuXG4uaGFuZHNvbnRhYmxlIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZCxcbi5oYW5kc29udGFibGUgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLFxuLmhhbmRzb250YWJsZSAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGQsXG4uaGFuZHNvbnRhYmxlIC50YWJsZSA+IHRmb290ID4gdHIgPiB0aCxcbi5oYW5kc29udGFibGUgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLFxuLmhhbmRzb250YWJsZSAudGFibGUgPiB0aGVhZCA+IHRyID4gdGgge1xuICBsaW5lLWhlaWdodDogMjFweDtcbiAgcGFkZGluZzogMCA0cHg7XG59XG5cbi5jb2wtbGctMS5oYW5kc29udGFibGUsIC5jb2wtbGctMTAuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTExLmhhbmRzb250YWJsZSwgLmNvbC1sZy0xMi5oYW5kc29udGFibGUsXG4uY29sLWxnLTIuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTMuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTQuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTUuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTYuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTcuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTguaGFuZHNvbnRhYmxlLCAuY29sLWxnLTkuaGFuZHNvbnRhYmxlLFxuLmNvbC1tZC0xLmhhbmRzb250YWJsZSwgLmNvbC1tZC0xMC5oYW5kc29udGFibGUsIC5jb2wtbWQtMTEuaGFuZHNvbnRhYmxlLCAuY29sLW1kLTEyLmhhbmRzb250YWJsZSxcbi5jb2wtbWQtMi5oYW5kc29udGFibGUsIC5jb2wtbWQtMy5oYW5kc29udGFibGUsIC5jb2wtbWQtNC5oYW5kc29udGFibGUsIC5jb2wtbWQtNS5oYW5kc29udGFibGUsIC5jb2wtbWQtNi5oYW5kc29udGFibGUsIC5jb2wtbWQtNy5oYW5kc29udGFibGUsIC5jb2wtbWQtOC5oYW5kc29udGFibGUsIC5jb2wtbWQtOS5oYW5kc29udGFibGVcbi5jb2wtc20tMS5oYW5kc29udGFibGUsIC5jb2wtc20tMTAuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTExLmhhbmRzb250YWJsZSwgLmNvbC1zbS0xMi5oYW5kc29udGFibGUsXG4uY29sLXNtLTIuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTMuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTQuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTUuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTYuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTcuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTguaGFuZHNvbnRhYmxlLCAuY29sLXNtLTkuaGFuZHNvbnRhYmxlXG4uY29sLXhzLTEuaGFuZHNvbnRhYmxlLCAuY29sLXhzLTEwLmhhbmRzb250YWJsZSwgLmNvbC14cy0xMS5oYW5kc29udGFibGUsIC5jb2wteHMtMTIuaGFuZHNvbnRhYmxlLFxuLmNvbC14cy0yLmhhbmRzb250YWJsZSwgLmNvbC14cy0zLmhhbmRzb250YWJsZSwgLmNvbC14cy00LmhhbmRzb250YWJsZSwgLmNvbC14cy01LmhhbmRzb250YWJsZSwgLmNvbC14cy02LmhhbmRzb250YWJsZSwgLmNvbC14cy03LmhhbmRzb250YWJsZSwgLmNvbC14cy04LmhhbmRzb250YWJsZSwgLmNvbC14cy05LmhhbmRzb250YWJsZSB7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgcGFkZGluZy1yaWdodDogMDtcbn1cblxuLmhhbmRzb250YWJsZSAudGFibGUtc3RyaXBlZCA+IHRib2R5ID4gdHI6bnRoLW9mLXR5cGUoZXZlbikge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xufVxuXG4uaGFuZHNvbnRhYmxlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5oaWRle1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5yZWxhdGl2ZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmhhbmRzb250YWJsZS5odEF1dG9TaXplIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBsZWZ0OiAtOTkwMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC05OTAwMHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC53dEhpZGVyIHtcbiAgd2lkdGg6IDA7XG59XG5cbi5oYW5kc29udGFibGUgLnd0U3ByZWFkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAwOyAvKm11c3QgYmUgMCwgb3RoZXJ3aXNlIGJsYW5rIHNwYWNlIGFwcGVhcnMgaW4gc2Nyb2xsIGRlbW8gYWZ0ZXIgc2Nyb2xsaW5nIG1heCB0byB0aGUgcmlnaHQgKi9cbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRhYmxlLFxuLmhhbmRzb250YWJsZSB0Ym9keSxcbi5oYW5kc29udGFibGUgdGhlYWQsXG4uaGFuZHNvbnRhYmxlIHRkLFxuLmhhbmRzb250YWJsZSB0aCxcbi5oYW5kc29udGFibGUgaW5wdXQsXG4uaGFuZHNvbnRhYmxlIHRleHRhcmVhLFxuLmhhbmRzb250YWJsZSBkaXYge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgLW1vei1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbn1cblxuLmhhbmRzb250YWJsZSBpbnB1dCxcbi5oYW5kc29udGFibGUgdGV4dGFyZWEge1xuICBtaW4taGVpZ2h0OiBpbml0aWFsO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRhYmxlLmh0Q29yZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XG4gIC8qIGl0IG11c3QgYmUgc2VwYXJhdGUsIG90aGVyd2lzZSB0aGVyZSBhcmUgb2Zmc2V0IG1pc2NhbGN1bGF0aW9ucyBpbiBXZWJLaXQ6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjY1NTk4Ny9ib3JkZXItY29sbGFwc2UtZGlmZmVyZW5jZXMtaW4tZmYtYW5kLXdlYmtpdCAqL1xuICAvKiB0aGlzIGFjdHVhbGx5IG9ubHkgY2hhbmdlcyBhcHBlYXJhbmNlIG9mIHVzZXIgc2VsZWN0aW9uIC0gZG9lcyBub3QgbWFrZSB0ZXh0IHVuc2VsZWN0YWJsZSAqL1xuICAvKiAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1vLXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lOyAqLyAvKiBubyBicm93c2VyIHN1cHBvcnRzIHVucHJlZml4ZWQgdmVyc2lvbiAqL1xuICBib3JkZXItc3BhY2luZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXItd2lkdGg6IDA7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIHdpZHRoOiAwO1xuICBvdXRsaW5lLXdpZHRoOiAwO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIC8qIHJlc2V0IGJvb3RzdHJhcCB0YWJsZSBzdHlsZS4gZm9yIG1vcmUgaW5mbyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5kc29udGFibGUvaGFuZHNvbnRhYmxlL2lzc3Vlcy8yMjQgKi9cbiAgbWF4LXdpZHRoOiBub25lO1xuICBtYXgtaGVpZ2h0OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIGNvbCB7XG4gIHdpZHRoOiA1MHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIGNvbC5yb3dIZWFkZXIge1xuICB3aWR0aDogNTBweDtcbn1cblxuLmhhbmRzb250YWJsZSB0aCxcbi5oYW5kc29udGFibGUgdGQge1xuICBib3JkZXItdG9wLXdpZHRoOiAwO1xuICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQztcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNDQ0M7XG4gIGhlaWdodDogMjJweDtcbiAgZW1wdHktY2VsbHM6IHNob3c7XG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICBwYWRkaW5nOiAwIDRweCAwIDRweDtcbiAgLyogdG9wLCBib3R0b20gcGFkZGluZyBkaWZmZXJlbnQgdGhhbiAwIGlzIGhhbmRsZWQgcG9vcmx5IGJ5IEZGIHdpdGggSFRNTDUgZG9jdHlwZSAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdXRsaW5lLXdpZHRoOiAwO1xuICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG4gIC8qIHByZXNlcnZlIG5ldyBsaW5lIGNoYXJhY3RlciBpbiBjZWxsICovXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG59XG5cbi5oYW5kc29udGFibGUgdGQuaHRJbnZhbGlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNGM0MiAhaW1wb3J0YW50OyAvKmdpdmVzIHByaW9yaXR5IG92ZXIgdGQuYXJlYSBzZWxlY3Rpb24gYmFja2dyb3VuZCovXG59XG5cbi5oYW5kc29udGFibGUgdGQuaHROb1dyYXAge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoOmxhc3QtY2hpbGQge1xuICAvKkZvdW5kYXRpb24gZnJhbWV3b3JrIGZpeCovXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0M7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRyOmZpcnN0LWNoaWxkIHRoLmh0Tm9GcmFtZSxcbi5oYW5kc29udGFibGUgdGg6Zmlyc3QtY2hpbGQuaHROb0ZyYW1lLFxuLmhhbmRzb250YWJsZSB0aC5odE5vRnJhbWUge1xuICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1jb2xvcjogI0ZGRjtcbn1cblxuLmhhbmRzb250YWJsZSB0aDpmaXJzdC1jaGlsZCxcbi5oYW5kc29udGFibGUgdGg6bnRoLWNoaWxkKDIpLFxuLmhhbmRzb250YWJsZSB0ZDpmaXJzdC1vZi10eXBlLFxuLmhhbmRzb250YWJsZSAuaHROb0ZyYW1lICsgdGgsXG4uaGFuZHNvbnRhYmxlIC5odE5vRnJhbWUgKyB0ZCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQztcbn1cblxuLmhhbmRzb250YWJsZS5odFJvd0hlYWRlcnMgdGhlYWQgdHIgdGg6bnRoLWNoaWxkKDIpIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRyOmZpcnN0LWNoaWxkIHRoLFxuLmhhbmRzb250YWJsZSB0cjpmaXJzdC1jaGlsZCB0ZCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaHRfbWFzdGVyOm5vdCguaW5uZXJCb3JkZXJMZWZ0KTpub3QoLmVtcHR5Q29sdW1ucykgfiAuaGFuZHNvbnRhYmxlIHRib2R5IHRyIHRoLFxuLmh0X21hc3Rlcjpub3QoLmlubmVyQm9yZGVyTGVmdCk6bm90KC5lbXB0eUNvbHVtbnMpIH4gLmhhbmRzb250YWJsZTpub3QoLmh0X2Nsb25lX3RvcCkgdGhlYWQgdHIgdGg6Zmlyc3QtY2hpbGQge1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG59XG5cbi5odF9tYXN0ZXI6bm90KC5pbm5lckJvcmRlclRvcCkgdGhlYWQgdHI6bGFzdC1jaGlsZCB0aCxcbi5odF9tYXN0ZXI6bm90KC5pbm5lckJvcmRlclRvcCkgfiAuaGFuZHNvbnRhYmxlIHRoZWFkIHRyOmxhc3QtY2hpbGQgdGgsXG4uaHRfbWFzdGVyOm5vdCguaW5uZXJCb3JkZXJUb3ApIHRoZWFkIHRyLmxhc3RDaGlsZCB0aCxcbi5odF9tYXN0ZXI6bm90KC5pbm5lckJvcmRlclRvcCkgfiAuaGFuZHNvbnRhYmxlIHRoZWFkIHRyLmxhc3RDaGlsZCB0aCB7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG59XG5cbi5oYW5kc29udGFibGUgdGgge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICBjb2xvcjogIzIyMjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoZWFkIHRoIHtcbiAgcGFkZGluZzogMDtcbn1cblxuLmhhbmRzb250YWJsZSB0aC5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDO1xufVxuLmhhbmRzb250YWJsZSB0aGVhZCB0aCAucmVsYXRpdmUge1xuICBwYWRkaW5nOiAycHggNHB4O1xufVxuXG4jaG90LWRpc3BsYXktbGljZW5zZS1pbmZvIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogIzMyMzIzMiA7XG4gIHBhZGRpbmc6IDVweCAwIDNweCAwO1xuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuI2hvdC1kaXNwbGF5LWxpY2Vuc2UtaW5mbyBhIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG4vKiBwbHVnaW5zICovXG5cbi8qIHJvdyArIGNvbHVtbiByZXNpemVyKi9cbi5oYW5kc29udGFibGUgLm1hbnVhbENvbHVtblJlc2l6ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICB6LWluZGV4OiAxMTA7XG4gIHdpZHRoOiA1cHg7XG4gIGhlaWdodDogMjVweDtcbn1cblxuLmhhbmRzb250YWJsZSAubWFudWFsUm93UmVzaXplciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgY3Vyc29yOiByb3ctcmVzaXplO1xuICB6LWluZGV4OiAxMTA7XG4gIGhlaWdodDogNXB4O1xuICB3aWR0aDogNTBweDtcbn1cblxuLmhhbmRzb250YWJsZSAubWFudWFsQ29sdW1uUmVzaXplcjpob3Zlcixcbi5oYW5kc29udGFibGUgLm1hbnVhbENvbHVtblJlc2l6ZXIuYWN0aXZlLFxuLmhhbmRzb250YWJsZSAubWFudWFsUm93UmVzaXplcjpob3Zlcixcbi5oYW5kc29udGFibGUgLm1hbnVhbFJvd1Jlc2l6ZXIuYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0YTlkYjtcbn1cblxuLmhhbmRzb250YWJsZSAubWFudWFsQ29sdW1uUmVzaXplckd1aWRlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzRhOWRiO1xuICBkaXNwbGF5OiBub25lO1xuICB3aWR0aDogMDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggZGFzaGVkICM3Nzc7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5oYW5kc29udGFibGUgLm1hbnVhbFJvd1Jlc2l6ZXJHdWlkZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzRhOWRiO1xuICBkaXNwbGF5OiBub25lO1xuICBoZWlnaHQ6IDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgIzc3NztcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5tYW51YWxDb2x1bW5SZXNpemVyR3VpZGUuYWN0aXZlLFxuLmhhbmRzb250YWJsZSAubWFudWFsUm93UmVzaXplckd1aWRlLmFjdGl2ZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB6LWluZGV4OiAxOTk7XG59XG5cbi5oYW5kc29udGFibGUgLmNvbHVtblNvcnRpbmcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5oYW5kc29udGFibGUgLmNvbHVtblNvcnRpbmcuc29ydEFjdGlvbjpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGxpbmUtaGVpZ2h0OiAxLjE7XG59XG5cbi8qIEFycm93IHBvc2l0aW9uICovXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmc6OmJlZm9yZSB7XG4gIC8qIENlbnRlcmluZyBzdGFydCAqL1xuICB0b3A6IDUwJTtcbiAgbWFyZ2luLXRvcDogLTZweDsgLyogT25lIGV4dHJhIHBpeGVsIGZvciBwdXJwb3NlIG9mIHByb3BlciBwb3NpdGlvbmluZyBvZiBzb3J0aW5nIGFycm93LCB3aGVuIGBmb250LXNpemVgIHNldCB0byBkZWZhdWx0ICovXG4gIC8qIENlbnRlcmluZyBlbmQgKi9cblxuICBwYWRkaW5nLWxlZnQ6IDhweDsgLyogRm9yIHB1cnBvc2Ugb2YgY29udGludW91cyBtb3VzZSBvdmVyIGV4cGVyaWVuY2UsIHdoZW4gbW92aW5nIGJldHdlZW4gdGhlIGBzcGFuYCBhbmQgdGhlIGA6OmJlZm9yZWAgZWxlbWVudHMgKi9cbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogLTlweDtcblxuICBjb250ZW50OiAnJztcbiAgaGVpZ2h0OiAxMHB4O1xuICB3aWR0aDogNXB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogcmlnaHQ7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5hc2NlbmRpbmc6OmJlZm9yZSB7XG4gIC8qIGFycm93IHVwOyAyMCB4IDQwIHB4LCBzY2FsZWQgdG8gNSB4IDEwIHB4OyBiYXNlNjQgc2l6ZTogMC4za0IgKi9cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFvQ0FNQUFBREo3eXJwQUFBQUtsQk1WRVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUtFODZJQUFBQURYUlNUbE1BQkJFbVJHcHJsSlc3MmU3N3RUa1RLd0FBQUZOSlJFRlVlQUh0emprU2dDQVVCTkhQZ3NveTk3K3VsR1hScUpFNUwreGt4b1l0MlVkc0xiNWJxRklOeithTHV1TG41ckl1MlJrTzNmWnBXRU5pbU5naXc2aUJZUlRQTUxKakdGeFFaMWh4eGIveEJJMXFDOGszOUNkS0FBQUFBRWxGVGtTdVFtQ0NcIik7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5kZXNjZW5kaW5nOjpiZWZvcmUge1xuICAvKiBhcnJvdyBkb3duOyAyMCB4IDQwIHB4LCBzY2FsZWQgdG8gNSB4IDEwIHB4OyBiYXNlNjQgc2l6ZTogMC4za0IgKi9cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFvQ0FNQUFBREo3eXJwQUFBQUtsQk1WRVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUtFODZJQUFBQURYUlNUbE1BQkJFbVJHcHJsSlc3MmU3N3RUa1RLd0FBQUZKSlJFRlVlQUh0emprU2dDQVFSTkZtUVlVWjduOWRLVXZydTBUbXZQQW4zYnIwUWZnZFo1eHg2eCtyUW4yM0dxVFlucTFGRGNudXpaSU8yV21lZFZxSVJWeGdHS0V5ak5nWVJqS0drWjFoRklaM0k3MEx5TTBWdFU4QUFBQUFTVVZPUks1Q1lJST1cIik7XG59XG5cbi5odEdob3N0VGFibGUgLmh0Q29yZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nOm5vdCguaW5kaWNhdG9yRGlzYWJsZWQpOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcqJztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC8qIFRoZSBtdWx0aS1saW5lIGhlYWRlciBhbmQgaGVhZGVyIHdpdGggbG9uZ2VyIHRleHQgbmVlZCBtb3JlIHBhZGRpbmcgdG8gbm90IGhpZGUgYXJyb3csXG4gIHdlIG1ha2UgaGVhZGVyIHdpZGVyIGluIGBHaG9zdFRhYmxlYCB0byBtYWtlIHNvbWUgc3BhY2UgZm9yIGFycm93IHdoaWNoIGlzIHBvc2l0aW9uZWQgYWJzb2x1dGVseSBpbiB0aGUgbWFpbiB0YWJsZSAqL1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xufVxuXG4vKiBTZWxlY3Rpb24gKi9cbi5oYW5kc29udGFibGUgLnd0Qm9yZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBmb250LXNpemU6IDA7XG59XG4uaGFuZHNvbnRhYmxlIC53dEJvcmRlci5oaWRkZW57XG4gIGRpc3BsYXk6bm9uZSAhaW1wb3J0YW50O1xufVxuXG4vKiBBIGxheWVyIG9yZGVyIG9mIHRoZSBzZWxlY3Rpb24gdHlwZXMgKi9cbi5oYW5kc29udGFibGUgLnd0Qm9yZGVyLmN1cnJlbnQge1xuICB6LWluZGV4OiAxMDtcbn1cbi5oYW5kc29udGFibGUgLnd0Qm9yZGVyLmFyZWEge1xuICB6LWluZGV4OiA4O1xufVxuLmhhbmRzb250YWJsZSAud3RCb3JkZXIuZmlsbCB7XG4gIHotaW5kZXg6IDY7XG59XG5cbi5oYW5kc29udGFibGUgdGQuYXJlYSxcbi5oYW5kc29udGFibGUgdGQuYXJlYS0xLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTIsXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtMyxcbi5oYW5kc29udGFibGUgdGQuYXJlYS00LFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTUsXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtNixcbi5oYW5kc29udGFibGUgdGQuYXJlYS03IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWE6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTE6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTI6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTM6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTQ6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTU6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTY6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTc6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBib3R0b206IC0xMDAlXFw5OyAvKiBGaXggZm9yIElFOSB0byBzcHJlYWQgdGhlIFwiOmJlZm9yZVwiIHBzZXVkbyBlbGVtZW50IHRvIDEwMCUgaGVpZ2h0IG9mIHRoZSBwYXJlbnQgZWxlbWVudCAqL1xuICBiYWNrZ3JvdW5kOiAjMDA1ZWZmO1xufVxuXG4vKiBGaXggZm9yIElFMTAgYW5kIElFMTEgdG8gc3ByZWFkIHRoZSBcIjpiZWZvcmVcIiBwc2V1ZG8gZWxlbWVudCB0byAxMDAlIGhlaWdodCBvZiB0aGUgcGFyZW50IGVsZW1lbnQgKi9cbkBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSB7XG4gIC5oYW5kc29udGFibGUgdGQuYXJlYTpiZWZvcmUsXG4gIC5oYW5kc29udGFibGUgdGQuYXJlYS0xOmJlZm9yZSxcbiAgLmhhbmRzb250YWJsZSB0ZC5hcmVhLTI6YmVmb3JlLFxuICAuaGFuZHNvbnRhYmxlIHRkLmFyZWEtMzpiZWZvcmUsXG4gIC5oYW5kc29udGFibGUgdGQuYXJlYS00OmJlZm9yZSxcbiAgLmhhbmRzb250YWJsZSB0ZC5hcmVhLTU6YmVmb3JlLFxuICAuaGFuZHNvbnRhYmxlIHRkLmFyZWEtNjpiZWZvcmUsXG4gIC5oYW5kc29udGFibGUgdGQuYXJlYS03OmJlZm9yZSB7XG4gICAgYm90dG9tOiAtMTAwJTtcbiAgfVxufVxuXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWE6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC4xO1xufVxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTE6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC4yO1xufVxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTI6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC4yNztcbn1cbi5oYW5kc29udGFibGUgdGQuYXJlYS0zOmJlZm9yZSB7XG4gIG9wYWNpdHk6IDAuMzU7XG59XG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtNDpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjQxO1xufVxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTU6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC40Nztcbn1cbi5oYW5kc29udGFibGUgdGQuYXJlYS02OmJlZm9yZSB7XG4gIG9wYWNpdHk6IDAuNTQ7XG59XG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtNzpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjU4O1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRoLmh0X19oaWdobGlnaHQsXG4uaGFuZHNvbnRhYmxlIHRoZWFkIHRoLmh0X19oaWdobGlnaHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNkY2RjO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRoLmh0X19hY3RpdmVfaGlnaGxpZ2h0LFxuLmhhbmRzb250YWJsZSB0aGVhZCB0aC5odF9fYWN0aXZlX2hpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZWIwZTc7XG4gIGNvbG9yOiAjMDAwO1xufVxuXG4vKiBmaWxsIGhhbmRsZSAqL1xuXG4uaGFuZHNvbnRhYmxlIC53dEJvcmRlci5jb3JuZXIge1xuICBmb250LXNpemU6IDA7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odEJvcmRlci5odEZpbGxCb3JkZXIge1xuICBiYWNrZ3JvdW5kOiByZWQ7XG4gIHdpZHRoOiAxcHg7XG4gIGhlaWdodDogMXB4O1xufVxuXG4uaGFuZHNvbnRhYmxlSW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmUtd2lkdGg6IDA7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMXB4IDVweCAwIDVweDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCAjNTI5MkY3IGluc2V0O1xuICByZXNpemU6IG5vbmU7XG4gIC8qYmVsb3cgYXJlIG5lZWRlZCB0byBvdmVyd3JpdGUgc3R1ZmYgYWRkZWQgYnkgalF1ZXJ5IFVJIEJvb3RzdHJhcCB0aGVtZSovXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogIzAwMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgLypvdmVyd3JpdGUgc3R5bGVzIHBvdGVudGlvbmFsbHkgbWFkZSBieSBhIGZyYW1ld29yayovXG59XG5cbi5oYW5kc29udGFibGVJbnB1dEhvbGRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAxMDQ7XG59XG5cbi5odFNlbGVjdEVkaXRvciB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbWVudWxpc3QtYnV0dG9uICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IGF1dG87XG59XG5cbi8qXG5UZXh0UmVuZGVyZXIgcmVhZE9ubHkgY2VsbFxuKi9cblxuLmhhbmRzb250YWJsZSAuaHREaW1tZWQge1xuICBjb2xvcjogIzc3Nztcbn1cblxuLmhhbmRzb250YWJsZSAuaHRTdWJtZW51IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFN1Ym1lbnUgOmFmdGVye1xuICBjb250ZW50OiAnXFwyNUI2JztcbiAgY29sb3I6ICM3Nzc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDVweDtcbiAgZm9udC1zaXplOiA5cHg7XG59XG5cblxuLypcblRleHRSZW5kZXJlciBob3Jpem9udGFsIGFsaWdubWVudFxuKi9cbi5oYW5kc29udGFibGUgLmh0TGVmdHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5oYW5kc29udGFibGUgLmh0Q2VudGVye1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaGFuZHNvbnRhYmxlIC5odFJpZ2h0e1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbi5oYW5kc29udGFibGUgLmh0SnVzdGlmeXtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbi8qXG5UZXh0UmVuZGVyZXIgdmVydGljYWwgYWxpZ25tZW50XG4qL1xuLmhhbmRzb250YWJsZSAuaHRUb3B7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG59XG4uaGFuZHNvbnRhYmxlIC5odE1pZGRsZXtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5oYW5kc29udGFibGUgLmh0Qm90dG9te1xuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xufVxuXG4vKlxuVGV4dFJlbmRlcmVyIHBsYWNlaG9sZGVyIHZhbHVlXG4qL1xuXG4uaGFuZHNvbnRhYmxlIC5odFBsYWNlaG9sZGVyIHtcbiAgY29sb3I6ICM5OTk7XG59XG5cbi8qXG5BdXRvY29tcGxldGVSZW5kZXJlciBkb3duIGFycm93XG4qL1xuXG4uaGFuZHNvbnRhYmxlIC5odEF1dG9jb21wbGV0ZUFycm93IHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGNvbG9yOiAjRUVFO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIHdpZHRoOiAxNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5oYW5kc29udGFibGUgdGQgLmh0QXV0b2NvbXBsZXRlQXJyb3c6aG92ZXIge1xuICBjb2xvcjogIzc3Nztcbn1cblxuLmhhbmRzb250YWJsZSB0ZC5hcmVhIC5odEF1dG9jb21wbGV0ZUFycm93IHtcbiAgY29sb3I6ICNkM2QzZDM7XG59XG5cbi8qXG5DaGVja2JveFJlbmRlcmVyXG4qL1xuLmhhbmRzb250YWJsZSAuaHRDaGVja2JveFJlbmRlcmVySW5wdXQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4uaGFuZHNvbnRhYmxlIC5odENoZWNrYm94UmVuZGVyZXJJbnB1dC5ub1ZhbHVlIHtcbiAgb3BhY2l0eTogMC41O1xufVxuLmhhbmRzb250YWJsZSAuaHRDaGVja2JveFJlbmRlcmVyTGFiZWwge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLyoqXG4gKiBIYW5kc29udGFibGUgaW4gSGFuZHNvbnRhYmxlXG4gKi9cblxuLmhhbmRzb250YWJsZSAuaGFuZHNvbnRhYmxlLmh0X2Nsb25lX3RvcCAud3RIaWRlciB7XG4gIHBhZGRpbmc6IDAgMCA1cHggMDtcbn1cblxuLyoqXG4qIEF1dG9jb21wbGV0ZSBFZGl0b3JcbiovXG4uaGFuZHNvbnRhYmxlIC5hdXRvY29tcGxldGVFZGl0b3IuaGFuZHNvbnRhYmxlIHtcbiAgcGFkZGluZy1yaWdodDogMTdweDtcbn1cbi5oYW5kc29udGFibGUgLmF1dG9jb21wbGV0ZUVkaXRvci5oYW5kc29udGFibGUuaHRNYWNTY3JvbGwge1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xufVxuXG5cbi8qKlxuICogSGFuZHNvbnRhYmxlIGxpc3Rib3ggdGhlbWVcbiAqL1xuXG4uaGFuZHNvbnRhYmxlLmxpc3Rib3gge1xuICBtYXJnaW46IDA7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCAuaHRfbWFzdGVyIHRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCB0aCxcbi5oYW5kc29udGFibGUubGlzdGJveCB0cjpmaXJzdC1jaGlsZCB0aCxcbi5oYW5kc29udGFibGUubGlzdGJveCB0cjpsYXN0LWNoaWxkIHRoLFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRyOmZpcnN0LWNoaWxkIHRkLFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRkIHtcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRoLFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRkIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCB0ZC5odERpbW1lZCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQtc3R5bGU6IGluaGVyaXQ7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCAud3RCb3JkZXIge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCB0ciB0ZC5jdXJyZW50LFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRyOmhvdmVyIHRkIHtcbiAgYmFja2dyb3VuZDogI2VlZTtcbn1cblxuLmh0X2Nsb25lX3RvcCB7XG4gIHotaW5kZXg6IDEwMTtcbn1cblxuLmh0X2Nsb25lX2xlZnQge1xuICB6LWluZGV4OiAxMDI7XG59XG5cbi5odF9jbG9uZV90b3BfbGVmdF9jb3JuZXIsXG4uaHRfY2xvbmVfYm90dG9tX2xlZnRfY29ybmVyIHtcbiAgei1pbmRleDogMTAzO1xufVxuXG4uaHRfY2xvbmVfZGVidWcge1xuICB6LWluZGV4OiAxMDM7XG59XG5cbi5oYW5kc29udGFibGUgdGQuaHRTZWFyY2hSZXN1bHQge1xuICBiYWNrZ3JvdW5kOiAjZmNlZGQ5O1xuICBjb2xvcjogIzU4MzcwNztcbn1cblxuLypcbkNlbGwgYm9yZGVyc1xuKi9cbi5odEJvcmRlcmVke1xuICAvKmJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDsqL1xuICBib3JkZXItd2lkdGg6IDFweDtcbn1cbi5odEJvcmRlcmVkLmh0VG9wQm9yZGVyU29saWQge1xuICBib3JkZXItdG9wLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzAwMDtcbn1cbi5odEJvcmRlcmVkLmh0UmlnaHRCb3JkZXJTb2xpZCB7XG4gIGJvcmRlci1yaWdodC1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1yaWdodC1jb2xvcjogIzAwMDtcbn1cbi5odEJvcmRlcmVkLmh0Qm90dG9tQm9yZGVyU29saWQge1xuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzAwMDtcbn1cbi5odEJvcmRlcmVkLmh0TGVmdEJvcmRlclNvbGlkIHtcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IHNvbGlkO1xuICBib3JkZXItbGVmdC1jb2xvcjogIzAwMDtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ciB0aDpudGgtbGFzdC1jaGlsZCgyKSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0M7XG59XG5cbi5oYW5kc29udGFibGUgdGhlYWQgdHI6bnRoLWxhc3QtY2hpbGQoMikgdGguaHRHcm91cEluZGljYXRvckNvbnRhaW5lciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQ0NDO1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuXG5cbi5odF9jbG9uZV90b3BfbGVmdF9jb3JuZXIgdGhlYWQgdHIgdGg6bnRoLWxhc3QtY2hpbGQoMikge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaHRDb2xsYXBzZUJ1dHRvbiB7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGxpbmUtaGVpZ2h0OiAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YzZjNmMztcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG4gIGJveC1zaGFkb3c6IDFweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tYm90dG9tOiAzcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmh0Q29sbGFwc2VCdXR0b246YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBoZWlnaHQ6IDMwMCU7XG4gIHdpZHRoOiAxcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kOiAjY2NjO1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIC8qdG9wOiAtMzAwJTsqL1xuICBib3R0b206IDEwcHg7XG59XG5cblxudGhlYWQgLmh0Q29sbGFwc2VCdXR0b24ge1xuICByaWdodDogNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuXG50aGVhZCAuaHRDb2xsYXBzZUJ1dHRvbjphZnRlciB7XG4gIGhlaWdodDogMXB4O1xuICB3aWR0aDogNzAwJTtcbiAgcmlnaHQ6IDEwcHg7XG4gIHRvcDogNHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIHRyIHRoIC5odEV4cGFuZEJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwcHg7XG4gIGhlaWdodDogMTBweDtcbiAgbGluZS1oZWlnaHQ6IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjNmM2YzO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDFweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRvcDogMDtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmhhbmRzb250YWJsZSB0aGVhZCB0ciB0aCAuaHRFeHBhbmRCdXR0b24ge1xuICAvKmxlZnQ6IDVweDsqL1xuICB0b3A6IDVweDtcbn1cblxuLmhhbmRzb250YWJsZSB0ciB0aCAuaHRFeHBhbmRCdXR0b24uY2xpY2thYmxlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5jb2xsYXBzaWJsZUluZGljYXRvciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAlICwtNTAlKTtcbiAgcmlnaHQ6IDVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0E2QTZBNjtcbiAgbGluZS1oZWlnaHQ6IDEwcHg7XG4gIGNvbG9yOiAjMjIyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCA2cHggcmdiYSgyMzgsMjM4LDIzOCwxKTtcbiAgLW1vei1ib3gtc2hhZG93OiAwIDAgMCA2cHggcmdiYSgyMzgsMjM4LDIzOCwxKTtcbiAgYm94LXNoYWRvdzogMCAwIDAgNnB4IHJnYmEoMjM4LDIzOCwyMzgsMSk7XG4gIGJhY2tncm91bmQ6ICNlZWU7XG59XG5cbi5oYW5kc29udGFibGUgY29sLmhpZGRlbiB7XG4gIHdpZHRoOiAwICFpbXBvcnRhbnQ7XG59XG5cbi5oYW5kc29udGFibGUgdGFibGUgdHIgdGgubGlnaHRSaWdodEJvcmRlciB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNFNkU2RTY7XG59XG5cbi5oYW5kc29udGFibGUgdHIuaGlkZGVuLFxuLmhhbmRzb250YWJsZSB0ci5oaWRkZW4gdGQsXG4uaGFuZHNvbnRhYmxlIHRyLmhpZGRlbiB0aCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5odF9tYXN0ZXIsXG4uaHRfY2xvbmVfbGVmdCxcbi5odF9jbG9uZV90b3AsXG4uaHRfY2xvbmVfYm90dG9tIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLmhhbmRzb250YWJsZSAuaHRfbWFzdGVyIHRoZWFkLFxuLmhhbmRzb250YWJsZSAuaHRfbWFzdGVyIHRyIHRoLFxuLmhhbmRzb250YWJsZSAuaHRfY2xvbmVfbGVmdCB0aGVhZCB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmh0X2Nsb25lX3RvcCAud3RIb2xkZXIsXG4uaHRfY2xvbmVfbGVmdCAud3RIb2xkZXIsXG4uaHRfY2xvbmVfYm90dG9tIC53dEhvbGRlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi8qXG5cbiBIYW5kc29udGFibGUgTW9iaWxlIFRleHQgRWRpdG9yIHN0eWxlc2hlZXRcblxuICovXG5cbi5oYW5kc29udGFibGUubW9iaWxlLFxuLmhhbmRzb250YWJsZS5tb2JpbGUgLnd0SG9sZGVyIHtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0Om5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6bm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0Om5vbmU7XG4gIHVzZXItc2VsZWN0Om5vbmU7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO1xuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICB3aWR0aDogNzAlO1xuICBoZWlnaHQ6IDU0cHQ7XG4gIGJhY2tncm91bmQ6ICNmOGY4Zjg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlYmViZWI7XG4gIHotaW5kZXg6IDk5OTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG59XG5cbi50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlOm5vdCguaHRfbWFzdGVyIC50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlKSxcbi50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlLUhpdEFyZWE6bm90KC5odF9tYXN0ZXIgLnRvcExlZnRTZWxlY3Rpb25IYW5kbGUtSGl0QXJlYSkge1xuICB6LWluZGV4OiA5OTk5O1xufVxuXG4vKiBJbml0aWFsIGxlZnQvdG9wIGNvb3JkaW5hdGVzIC0gb3ZlcndyaXR0ZW4gd2hlbiBhY3R1YWwgcG9zaXRpb24gaXMgc2V0ICovXG4udG9wTGVmdFNlbGVjdGlvbkhhbmRsZSxcbi50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlLUhpdEFyZWEsXG4uYm90dG9tUmlnaHRTZWxlY3Rpb25IYW5kbGUsXG4uYm90dG9tUmlnaHRTZWxlY3Rpb25IYW5kbGUtSGl0QXJlYSB7XG4gIGxlZnQ6IC0xMDAwMHB4O1xuICB0b3A6IC0xMDAwMHB4O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIuYWN0aXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAuaW5wdXRzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMjEwcHQ7XG4gIGJvdHRvbTogMTBwdDtcbiAgdG9wOiAxMHB0O1xuICBsZWZ0OiAxNHB4O1xuICBoZWlnaHQ6IDM0cHQ7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAuaW5wdXRzIHRleHRhcmVhIHtcbiAgZm9udC1zaXplOiAxM3B0O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYTFhMWExO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xuICBib3gtc2hhZG93OiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDE0cHg7XG4gIHJpZ2h0OiAxNHB4O1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgcGFkZGluZzogN3B0O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLmNlbGxQb2ludGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC0xM3B0O1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xuICBsZWZ0OiAzMHB4O1xuXG4gIGJvcmRlci1sZWZ0OiAxM3B0IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDEzcHQgc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IDEzcHQgc29saWQgI2ViZWJlYjtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5jZWxsUG9pbnRlci5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLmNlbGxQb2ludGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDJweDtcbiAgaGVpZ2h0OiAwO1xuICB3aWR0aDogMDtcbiAgbGVmdDogLTEzcHQ7XG5cbiAgYm9yZGVyLWxlZnQ6IDEzcHQgc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yaWdodDogMTNwdCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWJvdHRvbTogMTNwdCBzb2xpZCAjZjhmOGY4O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLm1vdmVIYW5kbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTBwdDtcbiAgbGVmdDogNXB4O1xuICB3aWR0aDogMzBweDtcbiAgYm90dG9tOiAwcHg7XG4gIGN1cnNvcjogbW92ZTtcbiAgei1pbmRleDogOTk5OTtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5tb3ZlSGFuZGxlOmFmdGVyIHtcbiAgY29udGVudDogXCIuLlxcYS4uXFxhLi5cXGEuLlwiO1xuICB3aGl0ZS1zcGFjZTogcHJlO1xuICBsaW5lLWhlaWdodDogMTBweDtcbiAgZm9udC1zaXplOiAyMHB0O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi10b3A6IC04cHg7XG4gIGNvbG9yOiAjZWJlYmViO1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnBvc2l0aW9uQ29udHJvbHMge1xuICB3aWR0aDogMjA1cHQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDVwdDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAucG9zaXRpb25Db250cm9scyA+IGRpdiB7XG4gIHdpZHRoOiA1MHB0O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnBvc2l0aW9uQ29udHJvbHMgPiBkaXY6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxNXB0O1xuICBoZWlnaHQ6IDE1cHQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDUwcHQ7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAubGVmdEJ1dHRvbjphZnRlcixcbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAucmlnaHRCdXR0b246YWZ0ZXIsXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnVwQnV0dG9uOmFmdGVyLFxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5kb3duQnV0dG9uOmFmdGVyIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogNXB0IDVwdDtcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1cHQgNXB0O1xuICBtYXJnaW46IDIxcHQgMCAwIDIxcHQ7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAubGVmdEJ1dHRvbjphZnRlciB7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjMjg4ZmZlO1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICMyODhmZmU7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgLyptYXJnaW4tdG9wOiAxN3B0OyovXG4gIC8qbWFyZ2luLWxlZnQ6IDIwcHQ7Ki9cbn1cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAubGVmdEJ1dHRvbjphY3RpdmU6YWZ0ZXIge1xuICBib3JkZXItY29sb3I6ICNjZmNmY2Y7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAucmlnaHRCdXR0b246YWZ0ZXIge1xuICBib3JkZXItdG9wOiAycHggc29saWQgIzI4OGZmZTtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjMjg4ZmZlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG4gIC8qbWFyZ2luLXRvcDogMTdwdDsqL1xuICAvKm1hcmdpbi1sZWZ0OiAxMHB0OyovXG59XG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnJpZ2h0QnV0dG9uOmFjdGl2ZTphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI2NmY2ZjZjtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC51cEJ1dHRvbjphZnRlciB7XG4gIC8qYm9yZGVyLXRvcDogMnB4IHNvbGlkICNjZmNmY2Y7Ki9cbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICMyODhmZmU7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzI4OGZmZTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIC8qbWFyZ2luLXRvcDogMjJwdDsqL1xuICAvKm1hcmdpbi1sZWZ0OiAxNXB0OyovXG59XG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnVwQnV0dG9uOmFjdGl2ZTphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI2NmY2ZjZjtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5kb3duQnV0dG9uOmFmdGVyIHtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICMyODhmZmU7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzI4OGZmZTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyMjVkZWcpO1xuICAvKm1hcmdpbi10b3A6IDE1cHQ7Ki9cbiAgLyptYXJnaW4tbGVmdDogMTVwdDsqL1xufVxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5kb3duQnV0dG9uOmFjdGl2ZTphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI2NmY2ZjZjtcbn1cblxuLmhhbmRzb250YWJsZS5oaWRlLXR3ZWVuIHtcbiAgLXdlYmtpdC1hbmltYXRpb246IG9wYWNpdHktaGlkZSAwLjNzO1xuICBhbmltYXRpb246IG9wYWNpdHktaGlkZSAwLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbn1cblxuLmhhbmRzb250YWJsZS5zaG93LXR3ZWVuIHtcbiAgLXdlYmtpdC1hbmltYXRpb246IG9wYWNpdHktc2hvdyAwLjNzO1xuICBhbmltYXRpb246IG9wYWNpdHktc2hvdyAwLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbn1cblxuQGNoYXJzZXQgXCJVVEYtOFwiO1xuXG4vKiFcbiAqIFBpa2FkYXlcbiAqIENvcHlyaWdodCDCqSAyMDE0IERhdmlkIEJ1c2hlbGwgfCBCU0QgJiBNSVQgbGljZW5zZSB8IGh0dHA6Ly9kYnVzaGVsbC5jb20vXG4gKi9cblxuLnBpa2Etc2luZ2xlIHtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBjb2xvcjogIzMzMztcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2JiYjtcbiAgICBmb250LWZhbWlseTogXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG4vKlxuY2xlYXIgY2hpbGQgZmxvYXQgKHBpa2EtbGVuZGFyKSwgdXNpbmcgdGhlIGZhbW91cyBtaWNybyBjbGVhcmZpeCBoYWNrXG5odHRwOi8vbmljb2xhc2dhbGxhZ2hlci5jb20vbWljcm8tY2xlYXJmaXgtaGFjay9cbiovXG4ucGlrYS1zaW5nbGU6YmVmb3JlLFxuLnBpa2Etc2luZ2xlOmFmdGVyIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbn1cbi5waWthLXNpbmdsZTphZnRlciB7IGNsZWFyOiBib3RoIH1cbi5waWthLXNpbmdsZSB7ICp6b29tOiAxIH1cblxuLnBpa2Etc2luZ2xlLmlzLWhpZGRlbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLnBpa2Etc2luZ2xlLmlzLWJvdW5kIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm94LXNoYWRvdzogMCA1cHggMTVweCAtNXB4IHJnYmEoMCwwLDAsLjUpO1xufVxuXG4ucGlrYS1sZW5kYXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAyNDBweDtcbiAgICBtYXJnaW46IDhweDtcbn1cblxuLnBpa2EtdGl0bGUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5waWthLWxhYmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgKmRpc3BsYXk6IGlubGluZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogOTk5OTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiA1cHggM3B4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuLnBpa2EtdGl0bGUgc2VsZWN0IHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDk5OTg7XG4gICAgbWFyZ2luOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiA1cHg7XG4gICAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTApO1xuICAgIG9wYWNpdHk6IDA7XG59XG5cbi5waWthLXByZXYsXG4ucGlrYS1uZXh0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIC8qIGhpZGUgdGV4dCB1c2luZyB0ZXh0LWluZGVudCB0cmljaywgdXNpbmcgd2lkdGggdmFsdWUgKGl0J3MgZW5vdWdoKSAqL1xuICAgIHRleHQtaW5kZW50OiAyMHB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiA3NSUgNzUlO1xuICAgIG9wYWNpdHk6IC41O1xuICAgICpwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgKnRvcDogMDtcbn1cblxuLnBpa2EtcHJldjpob3Zlcixcbi5waWthLW5leHQ6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbi5waWthLXByZXYsXG4uaXMtcnRsIC5waWthLW5leHQge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFlQ0FZQUFBQXNFajVyQUFBQVVrbEVRVlI0MnUzVk1Rb0FJQkFEUWY4UGdqK09EOWhHMkN0T05KQjJ5bVFrS2UwSGJ3QVAweHVjRGlRV0FSSVRJREVCRW5NZ01ROFM4K0FxQklsNmtLZ0hpWHFRcUFlSmVwQm8vejM4Si9VMHVBSGxhQmtCbDlJNEd3QUFBQUJKUlU1RXJrSmdnZz09Jyk7XG4gICAgKmxlZnQ6IDA7XG59XG5cbi5waWthLW5leHQsXG4uaXMtcnRsIC5waWthLXByZXYge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQlFBQUFBZUNBWUFBQUFzRWo1ckFBQUFVMGxFUVZSNDJ1M1ZPd29BTUFnRTBkd2ZBbk5qVTI2YllrQkNGR3dmaUw5VlZXb08rQko0R2YzZ3RzRUtLb0ZCTlRDb0NBWVZ3YUFpR05RR01VSE1rakdiZ2prMm1JT051WG8wbkM4WG5DZjFKWGdBclZJWkFRaDVUS1lBQUFBQVNVVk9SSzVDWUlJPScpO1xuICAgICpyaWdodDogMDtcbn1cblxuLnBpa2EtcHJldi5pcy1kaXNhYmxlZCxcbi5waWthLW5leHQuaXMtZGlzYWJsZWQge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBvcGFjaXR5OiAuMjtcbn1cblxuLnBpa2Etc2VsZWN0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgKmRpc3BsYXk6IGlubGluZTtcbn1cblxuLnBpa2EtdGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XG4gICAgYm9yZGVyOiAwO1xufVxuXG4ucGlrYS10YWJsZSB0aCxcbi5waWthLXRhYmxlIHRkIHtcbiAgICB3aWR0aDogMTQuMjg1NzE0Mjg1NzE0Mjg2JTtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4ucGlrYS10YWJsZSB0aCB7XG4gICAgY29sb3I6ICM5OTk7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnBpa2EtYnV0dG9uIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXI6IDA7XG4gICAgbWFyZ2luOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBjb2xvcjogIzY2NjtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDE1cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbn1cblxuLnBpa2Etd2VlayB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGNvbG9yOiAjOTk5O1xufVxuXG4uaXMtdG9kYXkgLnBpa2EtYnV0dG9uIHtcbiAgICBjb2xvcjogIzMzYWFmZjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmlzLXNlbGVjdGVkIC5waWthLWJ1dHRvbiB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYmFja2dyb3VuZDogIzMzYWFmZjtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAzcHggIzE3OGZlNTtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbi5pcy1pbnJhbmdlIC5waWthLWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogI0Q1RTlGNztcbn1cblxuLmlzLXN0YXJ0cmFuZ2UgLnBpa2EtYnV0dG9uIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjNkNCMzFEO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4uaXMtZW5kcmFuZ2UgLnBpa2EtYnV0dG9uIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjMzNhYWZmO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4uaXMtZGlzYWJsZWQgLnBpa2EtYnV0dG9uLFxuLmlzLW91dHNpZGUtY3VycmVudC1tb250aCAucGlrYS1idXR0b24ge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBjb2xvcjogIzk5OTtcbiAgICBvcGFjaXR5OiAuMztcbn1cblxuLnBpa2EtYnV0dG9uOmhvdmVyIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjZmY4MDAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4vKiBzdHlsaW5nIGZvciBhYmJyICovXG4ucGlrYS10YWJsZSBhYmJyIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIGN1cnNvcjogaGVscDtcbn1cblxuXG4uaHRDb21tZW50Q2VsbCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaHRDb21tZW50Q2VsbDphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci10b3A6IDZweCBzb2xpZCBibGFjaztcbn1cblxuLmh0Q29tbWVudHMge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgei1pbmRleDogMTA1OTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5odENvbW1lbnRUZXh0QXJlYSB7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjExNzY0NykgMCAxcHggM3B4LCByZ2JhKDAsIDAsIDAsIDAuMjM5MjE2KSAwIDFweCAycHg7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNjY2M7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICB3aWR0aDogMjE1cHg7XG4gICAgaGVpZ2h0OiA5MHB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgb3V0bGluZTogMHB4ICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4uaHRDb21tZW50VGV4dEFyZWE6Zm9jdXMge1xuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xMTc2NDcpIDAgMXB4IDNweCwgcmdiYSgwLCAwLCAwLCAwLjIzOTIxNikgMCAxcHggMnB4LCBpbnNldCAwIDAgMCAxcHggIzUyOTJmNztcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICM1MjkyZjc7XG59XG5cbi8qIVxuICogSGFuZHNvbnRhYmxlIENvbnRleHRNZW51XG4gKi9cblxuLmh0Q29udGV4dE1lbnU6bm90KC5odEdob3N0VGFibGUpIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDYwOyAvKiBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxMDUwIC0gei1pbmRleCBmb3IgVHdpdHRlciBCb290c3RyYXAgbW9kYWwgKCMxNTY5KSAqL1xufVxuXG4uaHRDb250ZXh0TWVudSAuaHRfY2xvbmVfdG9wLFxuLmh0Q29udGV4dE1lbnUgLmh0X2Nsb25lX2xlZnQsXG4uaHRDb250ZXh0TWVudSAuaHRfY2xvbmVfY29ybmVyLFxuLmh0Q29udGV4dE1lbnUgLmh0X2Nsb25lX2RlYnVnIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUuaHRDb3JlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDJweDtcbn1cblxuLmh0Q29udGV4dE1lbnUgLnd0Qm9yZGVyIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItd2lkdGg6IDA7XG4gIHBhZGRpbmc6IDRweCA2cHggMCA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5odENvbnRleHRNZW51IHRhYmxlIHRib2R5IHRyIHRkOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyOiAwO1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpbW1lZCB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgY29sb3I6ICMzMjMyMzI7XG59XG5cbi5odENvbnRleHRNZW51IHRhYmxlIHRib2R5IHRyIHRkLmN1cnJlbnQsXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZC56ZXJvY2xpcGJvYXJkLWlzLWhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2YzZjNmMztcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUgdGJvZHkgdHIgdGQuaHRTZXBhcmF0b3Ige1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcbiAgaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5odENvbnRleHRNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0RGlzYWJsZWQge1xuICBjb2xvcjogIzk5OTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpc2FibGVkOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM5OTk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUgdGJvZHkgdHIuaHRIaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZCAuaHRJdGVtV3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDZweDtcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUgdGJvZHkgdHIgdGQgZGl2IHNwYW4uc2VsZWN0ZWQge1xuICBtYXJnaW4tdG9wOiAtMnB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDRweDtcbn1cblxuLmh0Q29udGV4dE1lbnUgLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG50ZXh0YXJlYSNIYW5kc29udGFibGVDb3B5UGFzdGUge1xuICBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDtcbiAgdG9wOiAwICFpbXBvcnRhbnQ7XG4gIHJpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIG91dGxpbmU6IDAgbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uaHRSb3dIZWFkZXJzIC5odF9tYXN0ZXIuaW5uZXJCb3JkZXJMZWZ0IH4gLmh0X2Nsb25lX3RvcF9sZWZ0X2Nvcm5lciB0aDpudGgtY2hpbGQoMiksXG4uaHRSb3dIZWFkZXJzIC5odF9tYXN0ZXIuaW5uZXJCb3JkZXJMZWZ0IH4gLmh0X2Nsb25lX2xlZnQgdGQ6Zmlyc3Qtb2YtdHlwZSB7XG4gIGJvcmRlci1sZWZ0OiAwIG5vbmU7XG59XG5cbi5oYW5kc29udGFibGUgLnd0SGlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxDb2x1bW5Nb3ZlLmFmdGVyLXNlbGVjdGlvbi0tY29sdW1ucyB0aGVhZCB0aC5odF9faGlnaGxpZ2h0IHtcbiAgY3Vyc29yOiBtb3ZlO1xuICBjdXJzb3I6IC1tb3otZ3JhYjtcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XG4gIGN1cnNvcjogZ3JhYjtcbn1cbi5oYW5kc29udGFibGUuaHRfX21hbnVhbENvbHVtbk1vdmUub24tbW92aW5nLS1jb2x1bW5zLFxuLmhhbmRzb250YWJsZS5odF9fbWFudWFsQ29sdW1uTW92ZS5vbi1tb3ZpbmctLWNvbHVtbnMgdGhlYWQgdGguaHRfX2hpZ2hsaWdodCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxDb2x1bW5Nb3ZlLm9uLW1vdmluZy0tY29sdW1ucyAubWFudWFsQ29sdW1uUmVzaXplciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uaGFuZHNvbnRhYmxlIC5odF9fbWFudWFsQ29sdW1uTW92ZS0tZ3VpZGVsaW5lLFxuLmhhbmRzb250YWJsZSAuaHRfX21hbnVhbENvbHVtbk1vdmUtLWJhY2tsaWdodCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBub25lO1xufVxuLmhhbmRzb250YWJsZSAuaHRfX21hbnVhbENvbHVtbk1vdmUtLWd1aWRlbGluZSB7XG4gIGJhY2tncm91bmQ6ICM3NTc1NzU7XG4gIHdpZHRoOiAycHg7XG4gIHRvcDogMDtcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XG4gIHotaW5kZXg6IDEwNTtcbn1cbi5oYW5kc29udGFibGUgLmh0X19tYW51YWxDb2x1bW5Nb3ZlLS1iYWNrbGlnaHQge1xuICBiYWNrZ3JvdW5kOiAjMzQzNDM0O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDUyLCA1MiwgNTIsIDAuMjUpO1xuICBkaXNwbGF5OiBub25lO1xuICB6LWluZGV4OiAxMDU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmhhbmRzb250YWJsZS5vbi1tb3ZpbmctLWNvbHVtbnMuc2hvdy11aSAuaHRfX21hbnVhbENvbHVtbk1vdmUtLWd1aWRlbGluZSxcbi5oYW5kc29udGFibGUub24tbW92aW5nLS1jb2x1bW5zIC5odF9fbWFudWFsQ29sdW1uTW92ZS0tYmFja2xpZ2h0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgLnd0SGlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxSb3dNb3ZlLmFmdGVyLXNlbGVjdGlvbi0tcm93cyB0Ym9keSB0aC5odF9faGlnaGxpZ2h0IHtcbiAgY3Vyc29yOiBtb3ZlO1xuICBjdXJzb3I6IC1tb3otZ3JhYjtcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XG4gIGN1cnNvcjogZ3JhYjtcbn1cbi5oYW5kc29udGFibGUuaHRfX21hbnVhbFJvd01vdmUub24tbW92aW5nLS1yb3dzLFxuLmhhbmRzb250YWJsZS5odF9fbWFudWFsUm93TW92ZS5vbi1tb3ZpbmctLXJvd3MgdGJvZHkgdGguaHRfX2hpZ2hsaWdodCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxSb3dNb3ZlLm9uLW1vdmluZy0tcm93cyAubWFudWFsUm93UmVzaXplciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uaGFuZHNvbnRhYmxlIC5odF9fbWFudWFsUm93TW92ZS0tZ3VpZGVsaW5lLFxuLmhhbmRzb250YWJsZSAuaHRfX21hbnVhbFJvd01vdmUtLWJhY2tsaWdodCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uaGFuZHNvbnRhYmxlIC5odF9fbWFudWFsUm93TW92ZS0tZ3VpZGVsaW5lIHtcbiAgYmFja2dyb3VuZDogIzc1NzU3NTtcbiAgaGVpZ2h0OiAycHg7XG4gIGxlZnQ6IDA7XG4gIG1hcmdpbi10b3A6IC0xcHg7XG4gIHotaW5kZXg6IDEwNTtcbn1cbi5oYW5kc29udGFibGUgLmh0X19tYW51YWxSb3dNb3ZlLS1iYWNrbGlnaHQge1xuICBiYWNrZ3JvdW5kOiAjMzQzNDM0O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDUyLCA1MiwgNTIsIDAuMjUpO1xuICBkaXNwbGF5OiBub25lO1xuICB6LWluZGV4OiAxMDU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmhhbmRzb250YWJsZS5vbi1tb3ZpbmctLXJvd3Muc2hvdy11aSAuaHRfX21hbnVhbFJvd01vdmUtLWd1aWRlbGluZSxcbi5oYW5kc29udGFibGUub24tbW92aW5nLS1yb3dzIC5odF9fbWFudWFsUm93TW92ZS0tYmFja2xpZ2h0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgdGJvZHkgdGRbcm93c3Bhbl1bY2xhc3MqPVwiYXJlYVwiXVtjbGFzcyo9XCJoaWdobGlnaHRcIl06bm90KFtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbFwiXSk6YmVmb3JlIHtcbiAgICBvcGFjaXR5OiAwO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRkW3Jvd3NwYW5dW2NsYXNzKj1cImFyZWFcIl1bY2xhc3MqPVwiaGlnaGxpZ2h0XCJdW2NsYXNzKj1cImZ1bGx5U2VsZWN0ZWRNZXJnZWRDZWxsLW11bHRpcGxlXCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC4xO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRkW3Jvd3NwYW5dW2NsYXNzKj1cImFyZWFcIl1bY2xhc3MqPVwiaGlnaGxpZ2h0XCJdW2NsYXNzKj1cImZ1bGx5U2VsZWN0ZWRNZXJnZWRDZWxsLTBcIl06YmVmb3JlIHtcbiAgICBvcGFjaXR5OiAwLjE7XG59XG5cbi5oYW5kc29udGFibGUgdGJvZHkgdGRbcm93c3Bhbl1bY2xhc3MqPVwiYXJlYVwiXVtjbGFzcyo9XCJoaWdobGlnaHRcIl1bY2xhc3MqPVwiZnVsbHlTZWxlY3RlZE1lcmdlZENlbGwtMVwiXTpiZWZvcmUge1xuICAgIG9wYWNpdHk6IDAuMjtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC0yXCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC4yNztcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC0zXCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC4zNTtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC00XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC40MTtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC01XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC40Nztcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC02XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC41NDtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC03XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC41ODtcbn1cblxuLyohXG4gKiBIYW5kc29udGFibGUgRHJvcGRvd25NZW51XG4gKi9cbi5oYW5kc29udGFibGUgLmNoYW5nZVR5cGUge1xuICBiYWNrZ3JvdW5kOiAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiYmI7XG4gIGNvbG9yOiAjYmJiO1xuICBmb250LXNpemU6IDlweDtcbiAgbGluZS1oZWlnaHQ6IDlweDtcbiAgcGFkZGluZzogMnB4O1xuICBtYXJnaW46IDNweCAxcHggMCA1cHg7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5oYW5kc29udGFibGUgLmNoYW5nZVR5cGU6YmVmb3JlIHtcbiAgY29udGVudDogJ1xcMjVCQ1xcICc7XG59XG5cbi5oYW5kc29udGFibGUgLmNoYW5nZVR5cGU6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNzc3O1xuICBjb2xvcjogIzc3NztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaHREcm9wZG93bk1lbnU6bm90KC5odEdob3N0VGFibGUpIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDYwOyAvKiBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxMDUwIC0gei1pbmRleCBmb3IgVHdpdHRlciBCb290c3RyYXAgbW9kYWwgKCMxNTY5KSAqL1xufVxuXG4uaHREcm9wZG93bk1lbnUgLmh0X2Nsb25lX3RvcCxcbi5odERyb3Bkb3duTWVudSAuaHRfY2xvbmVfbGVmdCxcbi5odERyb3Bkb3duTWVudSAuaHRfY2xvbmVfY29ybmVyLFxuLmh0RHJvcGRvd25NZW51IC5odF9jbG9uZV9kZWJ1ZyB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZS5odENvcmUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XG4gIGJvcmRlci1yaWdodC13aWR0aDogMnB4O1xufVxuXG4uaHREcm9wZG93bk1lbnUgLnd0Qm9yZGVyIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uaHREcm9wZG93bk1lbnUgdGFibGUgdGJvZHkgdHIgdGQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXdpZHRoOiAwO1xuICBwYWRkaW5nOiA0cHggNnB4IDAgNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uaHREcm9wZG93bk1lbnUgdGFibGUgdGJvZHkgdHIgdGQ6Zmlyc3QtY2hpbGQge1xuICBib3JkZXI6IDA7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpbW1lZCB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgY29sb3I6ICMzMjMyMzI7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5jdXJyZW50LFxuLmh0RHJvcGRvd25NZW51IHRhYmxlIHRib2R5IHRyIHRkLnplcm9jbGlwYm9hcmQtaXMtaG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTllOWU5O1xufVxuXG4uaHREcm9wZG93bk1lbnUgdGFibGUgdGJvZHkgdHIgdGQuaHRTZXBhcmF0b3Ige1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcbiAgaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpc2FibGVkIHtcbiAgY29sb3I6ICM5OTk7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpc2FibGVkOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM5OTk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmh0RHJvcGRvd25NZW51Om5vdCguaHRHaG9zdFRhYmxlKSB0YWJsZSB0Ym9keSB0ci5odEhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZCAuaHRJdGVtV3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZCBkaXYgc3Bhbi5zZWxlY3RlZCB7XG4gIG1hcmdpbi10b3A6IC0ycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNHB4O1xufVxuXG4uaHREcm9wZG93bk1lbnUgLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBDb2x1bW4ncyBudW1iZXIgcG9zaXRpb24gKi9cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZzo6YWZ0ZXIge1xuICAvKiBDZW50ZXJpbmcgc3RhcnQgKi9cbiAgdG9wOiA1MCU7XG4gIG1hcmdpbi10b3A6IC0ycHg7IC8qIFR3byBleHRyYSBwaXhlbHMgKC0yIGluc3RlYWQgb2YgLTQpIGZvciBwdXJwb3NlIG9mIHByb3BlciBwb3NpdGlvbmluZyBvZiBudW1lcmljIGluZGljYXRvcnMsIHdoZW4gYGZvbnQtc2l6ZWAgc2V0IHRvIGRlZmF1bHQgKi9cbiAgLyogQ2VudGVyaW5nIGVuZCAqL1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IC0xNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDVweDsgOyAvKiBGb3IgcHVycG9zZSBvZiBjb250aW51b3VzIG1vdXNlIG92ZXIgZXhwZXJpZW5jZSwgd2hlbiBtb3ZpbmcgYmV0d2VlbiB0aGUgYDo6YmVmb3JlYCBhbmQgdGhlIGA6OmFmdGVyYCBlbGVtZW50cyAqL1xuXG4gIGZvbnQtc2l6ZTogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbGluZS1oZWlnaHQ6IDEuMTtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIFdvcmthcm91bmQgZm9yIElFOSAtIElFMTEgKi9cbn1cblxuLyogV29ya2Fyb3VuZCBmb3IgSUU5IC0gSUUxMSwgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxOTAyNTY2LCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzIxMjAyNDcgKi9cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZzo6YWZ0ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi8qIFdlIHN1cHBvcnQgdXAgdG8gNyBudW1lcmljIGluZGljYXRvcnMsIGRlc2NyaWJpbmcgb3JkZXIgb2YgY29sdW1uIGluIHNvcnRlZCBjb2x1bW5zIHF1ZXVlICovXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmdbY2xhc3NePVwic29ydC1cIl06OmFmdGVyLFxuLmhhbmRzb250YWJsZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nW2NsYXNzKj1cIiBzb3J0LVwiXTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIitcIlxufVxuXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmcuc29ydC0xOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcxJztcbn1cblxuLmhhbmRzb250YWJsZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nLnNvcnQtMjo6YWZ0ZXIge1xuICBjb250ZW50OiAnMic7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5zb3J0LTM6OmFmdGVyIHtcbiAgY29udGVudDogJzMnO1xufVxuXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmcuc29ydC00OjphZnRlciB7XG4gIGNvbnRlbnQ6ICc0Jztcbn1cblxuLmhhbmRzb250YWJsZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nLnNvcnQtNTo6YWZ0ZXIge1xuICBjb250ZW50OiAnNSc7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5zb3J0LTY6OmFmdGVyIHtcbiAgY29udGVudDogJzYnO1xufVxuXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmcuc29ydC03OjphZnRlciB7XG4gIGNvbnRlbnQ6ICc3Jztcbn1cblxuLyogRHJvcC1kb3duIG1lbnUgd2lkZW5zIGhlYWRlciBieSA1IHBpeGVscywgc29ydCBzZXF1ZW5jZSBudW1iZXJzIHdvbid0IG92ZXJsYXAgdGhlIGljb247IG1haW5seSBmb3IgdGhlIElFOSsgKi9cbi5odEdob3N0VGFibGUgdGggZGl2IGJ1dHRvbi5jaGFuZ2VUeXBlICsgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZzpub3QoLmluZGljYXRvckRpc2FibGVkKSB7XG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcbn1cblxuLyohXG4gKiBIYW5kc29udGFibGUgRmlsdGVyc1xuICovXG5cbi8qIENvbmRpdGlvbnMgbWVudSAqL1xuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51Om5vdCguaHRHaG9zdFRhYmxlKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTA3MDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IC5odF9jbG9uZV90b3AsXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgLmh0X2Nsb25lX2xlZnQsXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgLmh0X2Nsb25lX2Nvcm5lcixcbi5odEZpbHRlcnNDb25kaXRpb25zTWVudSAuaHRfY2xvbmVfZGVidWcge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUuaHRDb3JlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDJweDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IC53dEJvcmRlciB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci13aWR0aDogMDtcbiAgcGFkZGluZzogNHB4IDZweCAwIDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyOiAwO1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQuaHREaW1tZWQge1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGNvbG9yOiAjMzIzMjMyO1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQuY3VycmVudCxcbi5odEZpbHRlcnNDb25kaXRpb25zTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC56ZXJvY2xpcGJvYXJkLWlzLWhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2U5ZTllOTtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0U2VwYXJhdG9yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNmU2ZTY7XG4gIGhlaWdodDogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0RGlzYWJsZWQge1xuICBjb2xvcjogIzk5OTtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0RGlzYWJsZWQ6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzk5OTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQgLmh0SXRlbVdyYXBwZXIge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQgZGl2IHNwYW4uc2VsZWN0ZWQge1xuICBtYXJnaW4tdG9wOiAtMnB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDRweDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IC5odF9tYXN0ZXIgLnd0SG9sZGVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmhhbmRzb250YWJsZSAuaHRNZW51RmlsdGVyaW5nIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAjY2NjO1xuICBoZWlnaHQ6IDEzNXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odF9tYXN0ZXIgdGFibGUgdGQuaHRDdXN0b21NZW51UmVuZGVyZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBjdXJzb3I6IGF1dG87XG59XG5cbi8qIE1lbnUgbGFiZWwgKi9cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVMYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC43NWVtO1xufVxuXG4vKiBDb21wb25lbnQgYWN0aW9uIGJhciAqL1xuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudUFjdGlvbkJhciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAzcHg7XG59XG5cbi8qIENvbXBvbmVudCBmaWx0ZXIgYnkgY29uZGl0aW9uYWwgKi9cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVDb25kaXRpb24uYm9yZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAjY2NjICFpbXBvcnRhbnQ7XG59XG4uaGFuZHNvbnRhYmxlIC5odEZpbHRlcnNNZW51Q29uZGl0aW9uIC5odFVJSW5wdXQge1xuICBwYWRkaW5nOiAwIDAgNXB4IDA7XG59XG5cbi8qIENvbXBvbmVudCBmaWx0ZXIgYnkgdmFsdWUgKi9cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVWYWx1ZSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQgI2NjYyAhaW1wb3J0YW50O1xufVxuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudVZhbHVlIC5odFVJTXVsdGlwbGVTZWxlY3RTZWFyY2gge1xuICBwYWRkaW5nOiAwO1xufVxuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudUNvbmRpdGlvbiAuaHRVSUlucHV0IGlucHV0LFxuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudVZhbHVlIC5odFVJTXVsdGlwbGVTZWxlY3RTZWFyY2ggaW5wdXQge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjc1ZW07XG4gIHBhZGRpbmc6IDRweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5odFVJTXVsdGlwbGVTZWxlY3QgLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc0FjdGl2ZSAuY2hhbmdlVHlwZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM1MDkyNzI7XG4gIGNvbG9yOiAjMTg4MDRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJlMGQ5O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJU2VsZWN0QWxsIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJQ2xlYXJBbGwsIC5oYW5kc29udGFibGUgLmh0VUlTZWxlY3RBbGwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlDbGVhckFsbCBhLCAuaGFuZHNvbnRhYmxlIC5odFVJU2VsZWN0QWxsIGEge1xuICBjb2xvcjogIzMyODNEODtcbiAgZm9udC1zaXplOiAwLjc1ZW07XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3Rpb25Db250cm9scyB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odENoZWNrYm94UmVuZGVyZXJJbnB1dCB7XG4gIG1hcmdpbjogMCA1cHggMCAwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBoZWlnaHQ6IDFlbTtcbn1cblxuLyogVUkgZWxlbWVudHMgKi9cbi8qIElucHV0ICovXG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQge1xuICBwYWRkaW5nOiAzcHggMCA3cHggMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQgaW5wdXQge1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkMmQxZDE7XG59XG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQgaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiAwO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0SWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLyogQnV0dG9uICovXG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQuaHRVSUJ1dHRvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0Lmh0VUlCdXR0b24gaW5wdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBjb2xvcjogIzAwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjdlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGhlaWdodDogMTlweDtcbiAgbWluLXdpZHRoOiA2NHB4O1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0Lmh0VUlCdXR0b24gaW5wdXQ6aG92ZXIge1xuICBib3JkZXItY29sb3I6ICNiOWI5Yjk7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlJbnB1dC5odFVJQnV0dG9uT0sge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlJbnB1dC5odFVJQnV0dG9uT0sgaW5wdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4O1xuICBib3JkZXItY29sb3I6ICMxODgwNGU7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0Lmh0VUlCdXR0b25PSyBpbnB1dDpob3ZlciB7XG4gIGJvcmRlci1jb2xvcjogIzFhNmY0Njtcbn1cblxuLyogU2VsZWN0ICovXG4uaGFuZHNvbnRhYmxlIC5odFVJU2VsZWN0IHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tYm90dG9tOiA3cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3RDYXB0aW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDJkMWQxO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjdlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHBhZGRpbmc6IDNweCAyMHB4IDNweCAxMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3RDYXB0aW9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcbiAgYm9yZGVyOiAxcHggc29saWQgI2I5YjliOTtcbn1cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3REcm9wZG93bjphZnRlciB7XG4gIGNvbnRlbnQ6ICdcXDI1QjInO1xuICBmb250LXNpemU6IDdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTBweDtcbiAgdG9wOiAwO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSVNlbGVjdERyb3Bkb3duOmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICdcXDI1QkMnO1xuICBmb250LXNpemU6IDdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTBweDtcbiAgdG9wOiA4cHg7XG59XG5cbi8qIFNlbGVjdE11bHRpcGxlICovXG4uaGFuZHNvbnRhYmxlIC5odFVJTXVsdGlwbGVTZWxlY3QgLmhhbmRzb250YWJsZSAuaHRDb3JlIHtcbiAgYm9yZGVyOiBub25lO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSU11bHRpcGxlU2VsZWN0IC5oYW5kc29udGFibGUgLmh0Q29yZSB0ZDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGNUY1RjU7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlNdWx0aXBsZVNlbGVjdFNlYXJjaCBpbnB1dCB7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2QyZDFkMTtcbiAgcGFkZGluZzogM3B4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJUmFkaW8ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlSYWRpbzpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJUmFkaW8gPiBpbnB1dFt0eXBlPXJhZGlvXSB7XG4gIG1hcmdpbi1yaWdodDogMC41ZXg7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlSYWRpbyBsYWJlbCB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVPcGVyYXRvcnMge1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuXG4uaGFuZHNvbnRhYmxlLmdhbnR0Q2hhcnQgdHI6Zmlyc3QtY2hpbGQgdGggZGl2LnJlbGF0aXZlIHtcbiAgcGFkZGluZy1yaWdodDogMjFweDtcbn1cbi5oYW5kc29udGFibGUuZ2FudHRDaGFydCAuY29sSGVhZGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uaGFuZHNvbnRhYmxlLmdhbnR0Q2hhcnQgdGQucmFuZ2VCYXIge1xuICBiYWNrZ3JvdW5kOiAjNDhiNzAzO1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDNweCAwICNmZmZmZmY7XG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAzcHggMCAjZmZmZmZmO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDNweCAwICNmZmZmZmY7XG59XG4uaGFuZHNvbnRhYmxlLmdhbnR0Q2hhcnQgdGQucmFuZ2VCYXIubGFzdCB7XG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xufVxuLmhhbmRzb250YWJsZS5nYW50dENoYXJ0IHRkLnJhbmdlQmFyLmFyZWEge1xuICBiYWNrZ3JvdW5kOiAjN0VDNDgxO1xufVxuLmhhbmRzb250YWJsZS5nYW50dENoYXJ0IHRkLnJhbmdlQmFyLnBhcnRpYWwge1xuICBiYWNrZ3JvdW5kOiAjOGVkZjVhO1xufVxuLmhhbmRzb250YWJsZS5nYW50dENoYXJ0IHRkLnJhbmdlQmFyLmFyZWEucGFydGlhbCB7XG4gIGJhY2tncm91bmQ6ICNBMUQ4QUQ7XG59XG5cbi5oYW5kc29udGFibGUgdGhlYWQgdGguaGlkZGVuSGVhZGVyOm5vdCg6Zmlyc3Qtb2YtdHlwZSkge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoLmh0X25lc3RpbmdMZXZlbHMge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgcGFkZGluZy1sZWZ0OiA3cHg7XG59XG5cbi5oYW5kc29udGFibGUgdGggZGl2Lmh0X25lc3RpbmdMZXZlbHMge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMTFweDtcbn1cblxuLmhhbmRzb250YWJsZS5pbm5lckJvcmRlckxlZnQgdGggZGl2Lmh0X25lc3RpbmdMZXZlbHMsXG4uaGFuZHNvbnRhYmxlLmlubmVyQm9yZGVyTGVmdCB+IC5oYW5kc29udGFibGUgdGggZGl2Lmh0X25lc3RpbmdMZXZlbHMge1xuICAgIHJpZ2h0OiAxMHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoIHNwYW4uaHRfbmVzdGluZ0xldmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgdGggc3Bhbi5odF9uZXN0aW5nTGV2ZWxfZW1wdHkge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTBweDtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBmbG9hdDogbGVmdDtcbn1cblxuLmhhbmRzb250YWJsZSB0aCBzcGFuLmh0X25lc3RpbmdMZXZlbDo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiXFwyNTEwXCI7XG4gICAgZm9udC1zaXplOiA5cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3R0b206IDNweDtcbn1cblxuXG4uaGFuZHNvbnRhYmxlIHRoIGRpdi5odF9uZXN0aW5nQnV0dG9uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmhhbmRzb250YWJsZSB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbi5odF9uZXN0aW5nRXhwYW5kOjphZnRlciB7XG4gICAgY29udGVudDogXCJcXDAwMkJcIjtcbn1cblxuLmhhbmRzb250YWJsZSB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbi5odF9uZXN0aW5nQ29sbGFwc2U6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIlxcMDAyRFwiO1xufVxuXG4uaGFuZHNvbnRhYmxlLmlubmVyQm9yZGVyTGVmdCB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbixcbi5oYW5kc29udGFibGUuaW5uZXJCb3JkZXJMZWZ0IH4gLmhhbmRzb250YWJsZSB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbiB7XG4gICAgcmlnaHQ6IDA7XG59XG4vKlxuICogSGFuZHNvbnRhYmxlIEhpZGRlbkNvbHVtbnNcbiAqL1xuLmhhbmRzb250YWJsZSB0aC5iZWZvcmVIaWRkZW5Db2x1bW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5oYW5kc29udGFibGUgdGguYmVmb3JlSGlkZGVuQ29sdW1uOjphZnRlcixcbi5oYW5kc29udGFibGUgdGguYWZ0ZXJIaWRkZW5Db2x1bW46OmJlZm9yZSB7XG4gIGNvbG9yOiAjYmJiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBmb250LXNpemU6IDVwdDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoLmFmdGVySGlkZGVuQ29sdW1uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmhhbmRzb250YWJsZSB0aC5iZWZvcmVIaWRkZW5Db2x1bW46OmFmdGVyIHtcbiAgcmlnaHQ6IDFweDtcbiAgY29udGVudDogJ1xcMjVDMCc7XG59XG4uaGFuZHNvbnRhYmxlIHRoLmFmdGVySGlkZGVuQ29sdW1uOjpiZWZvcmUge1xuICBsZWZ0OiAxcHg7XG4gIGNvbnRlbnQ6ICdcXDI1QjYnO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRkLmZpcnN0VmlzaWJsZUNvbHVtbixcbi5oYW5kc29udGFibGUgdGguZmlyc3RWaXNpYmxlQ29sdW1uIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4vKiFcbiAqIEhhbmRzb250YWJsZSBIaWRkZW5Sb3dzXG4gKi9cbi5oYW5kc29udGFibGUgdGguYmVmb3JlSGlkZGVuUm93OjpiZWZvcmUsXG4uaGFuZHNvbnRhYmxlIHRoLmFmdGVySGlkZGVuUm93OjphZnRlciB7XG4gIGNvbG9yOiAjYmJiO1xuICBmb250LXNpemU6IDZwdDtcbiAgbGluZS1oZWlnaHQ6IDZwdDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAycHg7XG59XG5cbi5oYW5kc29udGFibGUgdGguYmVmb3JlSGlkZGVuUm93LFxuLmhhbmRzb250YWJsZSB0aC5hZnRlckhpZGRlblJvdyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmhhbmRzb250YWJsZSB0aC5iZWZvcmVIaWRkZW5Sb3c6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICdcXDI1QjInO1xuICBib3R0b206IDJweDtcbn1cblxuLmhhbmRzb250YWJsZSB0aC5hZnRlckhpZGRlblJvdzo6YWZ0ZXIge1xuICBjb250ZW50OiAnXFwyNUJDJztcbiAgdG9wOiAycHg7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19zZWxlY3Rpb24tLXJvd3MgdGJvZHkgdGguYmVmb3JlSGlkZGVuUm93Lmh0X19oaWdobGlnaHQ6YmVmb3JlLFxuLmhhbmRzb250YWJsZS5odF9fc2VsZWN0aW9uLS1yb3dzIHRib2R5IHRoLmFmdGVySGlkZGVuUm93Lmh0X19oaWdobGlnaHQ6YWZ0ZXIge1xuICBjb2xvcjogI2VlZTtcbn1cbi5oYW5kc29udGFibGUgdGQuYWZ0ZXJIaWRkZW5Sb3cuZmlyc3RWaXNpYmxlUm93LFxuLmhhbmRzb250YWJsZSB0aC5hZnRlckhpZGRlblJvdy5maXJzdFZpc2libGVSb3cge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQztcbn1cblxuIiwiQGltcG9ydCAnfmhhbmRzb250YWJsZS9kaXN0L2hhbmRzb250YWJsZS5mdWxsLmNzcyc7XHJcblxyXG4uaGVhZGVye1xyXG4gICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDJhNjU7XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gIFxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gICNzcnNfbG9nb3tcclxuICAgIHdpZHRoOjEzMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NDBweDtcclxuICAgIC8qIGhlaWdodDo2MHB4OyAqL1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcblxyXG4gIFxyXG4gICNzcnNfbmFtZXtcclxuICAgIHdpZHRoOjUwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NzBweDtcclxuICAgIG1hcmdpbi10b3A6MjBweDtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICAgIGZvbnQtc2l6ZTogMzJwdDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICAvKiBoZWlnaHQ6NjBweDsgKi9cclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgfVxyXG4gIFxyXG4gICNob3N0ZWxfbmFtZXtcclxuICAgIG1hcmdpbi10b3A6MzVweDtcclxuICAgIGNvbG9yOiM1ZGY3ZDE7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC1zaXplOiAxNHB0O1xyXG4gICAgd2lkdGg6MjkwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAjaG9yaXpvbnRhbF9uYXZ7XHJcbiAgICBtYXJnaW4tbGVmdDo3NzBweDtcclxuICB9XHJcbiAgXHJcbiAgI3Nyc190ZXh0e1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBjb2xvcjojYTFjMGU3O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gIH1cclxuICBcclxuICAjc3JzX3RleHQ6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg3LCAxMzAsIDI1KTtcclxuICB9XHJcbiAgXHJcbiAgI2hvcml6b250YWxfb3B0aW9uc3tcclxuICAgIG1hcmdpbi1sZWZ0OjIwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC5ib2R5X2NvbnRlbnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2FkZF9jb25zdW1wdGlvbntcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgd2lkdGg6MTUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgI3ZpZXdfY29uc3VtcHRpb257XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6MzkwcHg7XHJcbiAgICBtYXJnaW4tdG9wOjUzcHg7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjbW9kaWZ5X2NvbnN1bXB0aW9ue1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNzBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OjU0MXB4O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2xpbmV7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB3aWR0aDogMzBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOjYwNXB4O1xyXG4gICAgaGVpZ2h0OiAzcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIzLCAyMTMsIDIxMyk7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcclxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsqLyBcclxuICAgIG1hcmdpbi1sZWZ0OiA3MTFweDtcclxuICB9XHJcblxyXG5cclxuICAuc3ByZWFkc2hlZXR7XHJcbiAgICBoZWlnaHQ6NTAwcHg7XHJcbiAgICBtYXgtd2lkdGg6NTBweDtcclxuICAgIG92ZXJmbG93OiBzY3JvbGw7XHJcbiAgICBvdmVyZmxvdy14OiBoaWRkZW47XHJcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDoyNDBweDtcclxuICAgIG1hcmdpbi10b3A6IDE0NXB4O1xyXG4gIH1cclxuICBcclxuICAuc2F2ZV9idXR0b257XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1Y2FiO1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgd2lkdGg6IDEyMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgb3V0bGluZTpub25lO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIC5mb290ZXJ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBkMTtcclxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgLmxvYWRlciB7XHJcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjZjNmM2YzO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNjAlO1xyXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkICMzMzMzMWE7XHJcbiAgICB3aWR0aDogMzBweDtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIG1hcmdpbi10b3A6IDgwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDo2NTBweDtcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOyAvKiBTYWZhcmkgKi9cclxuICAgIGFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTtcclxuICB9XHJcbiAgXHJcbiAgLyogU2FmYXJpICovXHJcbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4ge1xyXG4gICAgMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgICAxMDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XHJcbiAgfVxyXG4gIFxyXG4gIEBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxyXG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/modify-consumption/modify-consumption.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/modify-consumption/modify-consumption.component.ts ***!
  \********************************************************************/
/*! exports provided: ModifyConsumptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyConsumptionComponent", function() { return ModifyConsumptionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _handsontable_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handsontable/angular */ "./node_modules/@handsontable/angular/fesm2015/handsontable-angular.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let ModifyConsumptionComponent = class ModifyConsumptionComponent {
    constructor(http, hotRegisterer) {
        this.http = http;
        this.hotRegisterer = hotRegisterer;
        this.instance = 'instance';
        this.dataBank = [];
        this.columns = [];
        this.flag = false;
        this.model = {};
        this.dataset = [];
        this.headers = [];
        this.edited_consumption_list = [];
        this.display_sheet = 'none';
        this.colHeaders = ['Date of Consumption', 'Product Name', 'Consumed Quantity'];
        this.settings = {
            minRows: 1000,
            minCols: 256,
            stretchH: 'all',
            rowHeaders: true,
            colHeaders: true,
            colWidths: 165,
            rowHeights: 30,
            rowHeaderWidth: 55,
            filters: true,
            dropdownMenu: true
        };
        this.columns = [];
        this.display_sheet = 'none';
        this.show = true;
        this.http.get('http://localhost:9090/getAllConsumption').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(res => {
            //console.log("data: ", res);
            let data = [];
            res.forEach(element => {
                data.push(element);
            });
            this.dataBank = data;
            //console.log("data bank ",this.dataBank);
            this.headers = Object.keys(data[0]);
            //console.log("Headers ",this.headers);
            for (let num = 0; num < this.headers.length; num++) {
                this.columns.push({ data: this.headers[num] });
            }
            ;
            this.display_sheet = 'block';
            this.show = false;
        }, err => {
            this.show = false;
            this.isErrorMessage = true;
            this.errorMessage = "No Records Found";
            console.log(this.errorMessage);
        });
    }
    ngOnInit() {
    }
    saveData() {
        this.totalRows = this.hotRegisterer.getInstance('instance').countSourceRows();
        this.rows_containing_data = this.totalRows - this.hotRegisterer.getInstance('instance').countEmptyRows();
        for (let i = 0; i < this.rows_containing_data; i++) {
            //console.log("Data at row ",i," is "+this.hotRegisterer.getInstance('instance').getDataAtRow(i));
            this.edited_consumption_list.push(this.hotRegisterer.getInstance('instance').getDataAtRow(i));
        }
        let formData = new FormData();
        console.log("Stringified json " + JSON.stringify(this.edited_consumption_list));
        //formData.append('formdata',amountString);
        formData.append('formdata', JSON.stringify(this.edited_consumption_list));
        var temp = 'http://localhost:9090/addEditedConsumption';
        console.log("Formdata ", formData);
        this.http.post(temp, formData).subscribe(data => {
            console.log("Data is ", data);
            alert("Updated successfully!!!");
        });
        this.edited_consumption_list.splice(0);
    }
};
ModifyConsumptionComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _handsontable_angular__WEBPACK_IMPORTED_MODULE_3__["HotTableRegisterer"] }
];
ModifyConsumptionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-modify-consumption',
        template: __webpack_require__(/*! raw-loader!./modify-consumption.component.html */ "./node_modules/raw-loader/index.js!./src/app/modify-consumption/modify-consumption.component.html"),
        styles: [__webpack_require__(/*! ./modify-consumption.component.css */ "./src/app/modify-consumption/modify-consumption.component.css")]
    })
], ModifyConsumptionComponent);



/***/ }),

/***/ "./src/app/modify-purchase/modify-purchase.component.css":
/*!***************************************************************!*\
  !*** ./src/app/modify-purchase/modify-purchase.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/*!\n * Copyright (c) HANDSONCODE sp. z o. o.\n * \n * HANDSONTABLE is a software distributed by HANDSONCODE sp. z o. o.,\n * a Polish corporation, based in Gdynia, Poland, at 96/98 Aleja Zwycięstwa,\n * registered with the National Court Register under number 538651,\n * EU tax ID number: PL5862294002, share capital: PLN 62,800.00.\n * \n * This software is protected by applicable copyright laws, including\n * international treaties, and dual-licensed – depending on whether\n * your use is intended for or may result in commercial advantage\n * or monetary compensation (commercial purposes), or not.\n * \n * If your use involves only such purposes as research, private study,\n * evaluation and the like, you agree to be bound by the terms included\n * in the “handsontable-non-commercial-license.pdf” file, available\n * in the main directory of this software repository.\n * \n * By installing, copying, or otherwise using this software for\n * commercial purposes, you agree to be bound by the terms included\n * in the “handsontable-general-terms.pdf” file, available in the main\n * directory of this software repository.\n * \n * HANDSONCODE PROVIDES THIS SOFTWARE ON AN “AS IS” BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND. IN NO EVENT\n * AND UNDER NO LEGAL THEORY, SHALL HANDSONCODE BE LIABLE\n * TO YOU FOR DAMAGES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL,\n * INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER ARISING\n * FROM USE OR INABILITY TO USE THIS SOFTWARE.\n * \n * Version: 7.1.0\n * Release date: 11/06/2019 (built at 10/06/2019 10:35:58)\n */\n/**\n * Fix for bootstrap styles\n */\n.handsontable .table th, .handsontable .table td {\n  border-top: none;\n}\n.handsontable tr {\n  background: #fff;\n}\n.handsontable td {\n  background-color: inherit;\n}\n.handsontable .table caption + thead tr:first-child th,\n.handsontable .table caption + thead tr:first-child td,\n.handsontable .table colgroup + thead tr:first-child th,\n.handsontable .table colgroup + thead tr:first-child td,\n.handsontable .table thead:first-child tr:first-child th,\n.handsontable .table thead:first-child tr:first-child td {\n  border-top: 1px solid #CCCCCC;\n}\n/* table-bordered */\n.handsontable .table-bordered {\n  border: 0;\n  border-collapse: separate;\n}\n.handsontable .table-bordered th,\n.handsontable .table-bordered td {\n  border-left: none;\n}\n.handsontable .table-bordered th:first-child,\n.handsontable .table-bordered td:first-child {\n  border-left: 1px solid #CCCCCC;\n}\n.handsontable .table > tbody > tr > td,\n.handsontable .table > tbody > tr > th,\n.handsontable .table > tfoot > tr > td,\n.handsontable .table > tfoot > tr > th,\n.handsontable .table > thead > tr > td,\n.handsontable .table > thead > tr > th {\n  line-height: 21px;\n  padding: 0 4px;\n}\n.col-lg-1.handsontable, .col-lg-10.handsontable, .col-lg-11.handsontable, .col-lg-12.handsontable,\n.col-lg-2.handsontable, .col-lg-3.handsontable, .col-lg-4.handsontable, .col-lg-5.handsontable, .col-lg-6.handsontable, .col-lg-7.handsontable, .col-lg-8.handsontable, .col-lg-9.handsontable,\n.col-md-1.handsontable, .col-md-10.handsontable, .col-md-11.handsontable, .col-md-12.handsontable,\n.col-md-2.handsontable, .col-md-3.handsontable, .col-md-4.handsontable, .col-md-5.handsontable, .col-md-6.handsontable, .col-md-7.handsontable, .col-md-8.handsontable, .col-md-9.handsontable\n.col-sm-1.handsontable, .col-sm-10.handsontable, .col-sm-11.handsontable, .col-sm-12.handsontable,\n.col-sm-2.handsontable, .col-sm-3.handsontable, .col-sm-4.handsontable, .col-sm-5.handsontable, .col-sm-6.handsontable, .col-sm-7.handsontable, .col-sm-8.handsontable, .col-sm-9.handsontable\n.col-xs-1.handsontable, .col-xs-10.handsontable, .col-xs-11.handsontable, .col-xs-12.handsontable,\n.col-xs-2.handsontable, .col-xs-3.handsontable, .col-xs-4.handsontable, .col-xs-5.handsontable, .col-xs-6.handsontable, .col-xs-7.handsontable, .col-xs-8.handsontable, .col-xs-9.handsontable {\n  padding-left: 0;\n  padding-right: 0;\n}\n.handsontable .table-striped > tbody > tr:nth-of-type(even) {\n  background-color: #FFF;\n}\n.handsontable {\n  position: relative;\n}\n.handsontable .hide{\n  display: none;\n}\n.handsontable .relative {\n  position: relative;\n}\n.handsontable.htAutoSize {\n  visibility: hidden;\n  left: -99000px;\n  position: absolute;\n  top: -99000px;\n}\n.handsontable .wtHider {\n  width: 0;\n}\n.handsontable .wtSpreader {\n  position: relative;\n  width: 0; /*must be 0, otherwise blank space appears in scroll demo after scrolling max to the right */\n  height: auto;\n}\n.handsontable table,\n.handsontable tbody,\n.handsontable thead,\n.handsontable td,\n.handsontable th,\n.handsontable input,\n.handsontable textarea,\n.handsontable div {\n  box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n}\n.handsontable input,\n.handsontable textarea {\n  min-height: initial;\n}\n.handsontable table.htCore {\n  border-collapse: separate;\n  /* it must be separate, otherwise there are offset miscalculations in WebKit: http://stackoverflow.com/questions/2655987/border-collapse-differences-in-ff-and-webkit */\n  /* this actually only changes appearance of user selection - does not make text unselectable */\n  /* -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  -ms-user-select: none;\n  user-select: none; */ /* no browser supports unprefixed version */\n  border-spacing: 0;\n  margin: 0;\n  border-width: 0;\n  table-layout: fixed;\n  width: 0;\n  outline-width: 0;\n  cursor: default;\n  /* reset bootstrap table style. for more info see: https://github.com/handsontable/handsontable/issues/224 */\n  max-width: none;\n  max-height: none;\n}\n.handsontable col {\n  width: 50px;\n}\n.handsontable col.rowHeader {\n  width: 50px;\n}\n.handsontable th,\n.handsontable td {\n  border-top-width: 0;\n  border-left-width: 0;\n  border-right: 1px solid #CCC;\n  border-bottom: 1px solid #CCC;\n  height: 22px;\n  empty-cells: show;\n  line-height: 21px;\n  padding: 0 4px 0 4px;\n  /* top, bottom padding different than 0 is handled poorly by FF with HTML5 doctype */\n  background-color: #FFF;\n  vertical-align: top;\n  overflow: hidden;\n  outline-width: 0;\n  white-space: pre-line;\n  /* preserve new line character in cell */\n  background-clip: padding-box;\n}\n.handsontable td.htInvalid {\n  background-color: #ff4c42 !important; /*gives priority over td.area selection background*/\n}\n.handsontable td.htNoWrap {\n  white-space: nowrap;\n}\n.handsontable th:last-child {\n  /*Foundation framework fix*/\n  border-right: 1px solid #CCC;\n  border-bottom: 1px solid #CCC;\n}\n.handsontable tr:first-child th.htNoFrame,\n.handsontable th:first-child.htNoFrame,\n.handsontable th.htNoFrame {\n  border-left-width: 0;\n  background-color: white;\n  border-color: #FFF;\n}\n.handsontable th:first-child,\n.handsontable th:nth-child(2),\n.handsontable td:first-of-type,\n.handsontable .htNoFrame + th,\n.handsontable .htNoFrame + td {\n  border-left: 1px solid #CCC;\n}\n.handsontable.htRowHeaders thead tr th:nth-child(2) {\n  border-left: 1px solid #CCC;\n}\n.handsontable tr:first-child th,\n.handsontable tr:first-child td {\n  border-top: 1px solid #CCC;\n}\n.ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable tbody tr th,\n.ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable:not(.ht_clone_top) thead tr th:first-child {\n  border-right-width: 0;\n}\n.ht_master:not(.innerBorderTop) thead tr:last-child th,\n.ht_master:not(.innerBorderTop) ~ .handsontable thead tr:last-child th,\n.ht_master:not(.innerBorderTop) thead tr.lastChild th,\n.ht_master:not(.innerBorderTop) ~ .handsontable thead tr.lastChild th {\n  border-bottom-width: 0;\n}\n.handsontable th {\n  background-color: #f0f0f0;\n  color: #222;\n  text-align: center;\n  font-weight: normal;\n  white-space: nowrap;\n}\n.handsontable thead th {\n  padding: 0;\n}\n.handsontable th.active {\n  background-color: #CCC;\n}\n.handsontable thead th .relative {\n  padding: 2px 4px;\n}\n#hot-display-license-info {\n  font-size: 10px;\n  color: #323232 ;\n  padding: 5px 0 3px 0;\n  font-family: Helvetica, Arial, sans-serif;\n  text-align: left;\n}\n#hot-display-license-info a {\n  font-size: 10px;\n}\n/* plugins */\n/* row + column resizer*/\n.handsontable .manualColumnResizer {\n  position: absolute;\n  top: 0;\n  cursor: col-resize;\n  z-index: 110;\n  width: 5px;\n  height: 25px;\n}\n.handsontable .manualRowResizer {\n  position: absolute;\n  left: 0;\n  cursor: row-resize;\n  z-index: 110;\n  height: 5px;\n  width: 50px;\n}\n.handsontable .manualColumnResizer:hover,\n.handsontable .manualColumnResizer.active,\n.handsontable .manualRowResizer:hover,\n.handsontable .manualRowResizer.active {\n  background-color: #34a9db;\n}\n.handsontable .manualColumnResizerGuide {\n  position: absolute;\n  right: 0;\n  top: 0;\n  background-color: #34a9db;\n  display: none;\n  width: 0;\n  border-right: 1px dashed #777;\n  margin-left: 5px;\n}\n.handsontable .manualRowResizerGuide {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  background-color: #34a9db;\n  display: none;\n  height: 0;\n  border-bottom: 1px dashed #777;\n  margin-top: 5px;\n}\n.handsontable .manualColumnResizerGuide.active,\n.handsontable .manualRowResizerGuide.active {\n  display: block;\n  z-index: 199;\n}\n.handsontable .columnSorting {\n  position: relative;\n}\n.handsontable .columnSorting.sortAction:hover {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.handsontable span.colHeader {\n  display: inline-block;\n  line-height: 1.1;\n}\n/* Arrow position */\n.handsontable span.colHeader.columnSorting::before {\n  /* Centering start */\n  top: 50%;\n  margin-top: -6px; /* One extra pixel for purpose of proper positioning of sorting arrow, when `font-size` set to default */\n  /* Centering end */\n\n  padding-left: 8px; /* For purpose of continuous mouse over experience, when moving between the `span` and the `::before` elements */\n  position: absolute;\n  right: -9px;\n\n  content: '';\n  height: 10px;\n  width: 5px;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position-x: right;\n}\n.handsontable span.colHeader.columnSorting.ascending::before {\n  /* arrow up; 20 x 40 px, scaled to 5 x 10 px; base64 size: 0.3kB */\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFNJREFUeAHtzjkSgCAUBNHPgsoy97+ulGXRqJE5L+xkxoYt2UdsLb5bqFINz+aLuuLn5rIu2RkO3fZpWENimNgiw6iBYRTPMLJjGFxQZ1hxxb/xBI1qC8k39CdKAAAAAElFTkSuQmCC\");\n}\n.handsontable span.colHeader.columnSorting.descending::before {\n  /* arrow down; 20 x 40 px, scaled to 5 x 10 px; base64 size: 0.3kB */\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMABBEmRGprlJW72e77tTkTKwAAAFJJREFUeAHtzjkSgCAQRNFmQYUZ7n9dKUvru0TmvPAn3br0QfgdZ5xx6x+rQn23GqTYnq1FDcnuzZIO2WmedVqIRVxgGKEyjNgYRjKGkZ1hFIZ3I70LyM0VtU8AAAAASUVORK5CYII=\");\n}\n.htGhostTable .htCore span.colHeader.columnSorting:not(.indicatorDisabled)::after {\n  content: '*';\n  display: inline-block;\n  position: relative;\n  /* The multi-line header and header with longer text need more padding to not hide arrow,\n  we make header wider in `GhostTable` to make some space for arrow which is positioned absolutely in the main table */\n  padding-right: 20px;\n}\n/* Selection */\n.handsontable .wtBorder {\n  position: absolute;\n  font-size: 0;\n}\n.handsontable .wtBorder.hidden{\n  display:none !important;\n}\n/* A layer order of the selection types */\n.handsontable .wtBorder.current {\n  z-index: 10;\n}\n.handsontable .wtBorder.area {\n  z-index: 8;\n}\n.handsontable .wtBorder.fill {\n  z-index: 6;\n}\n.handsontable td.area,\n.handsontable td.area-1,\n.handsontable td.area-2,\n.handsontable td.area-3,\n.handsontable td.area-4,\n.handsontable td.area-5,\n.handsontable td.area-6,\n.handsontable td.area-7 {\n  position: relative;\n}\n.handsontable td.area:before,\n.handsontable td.area-1:before,\n.handsontable td.area-2:before,\n.handsontable td.area-3:before,\n.handsontable td.area-4:before,\n.handsontable td.area-5:before,\n.handsontable td.area-6:before,\n.handsontable td.area-7:before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  bottom: -100%\\9; /* Fix for IE9 to spread the \":before\" pseudo element to 100% height of the parent element */\n  background: #005eff;\n}\n/* Fix for IE10 and IE11 to spread the \":before\" pseudo element to 100% height of the parent element */\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .handsontable td.area:before,\n  .handsontable td.area-1:before,\n  .handsontable td.area-2:before,\n  .handsontable td.area-3:before,\n  .handsontable td.area-4:before,\n  .handsontable td.area-5:before,\n  .handsontable td.area-6:before,\n  .handsontable td.area-7:before {\n    bottom: -100%;\n  }\n}\n.handsontable td.area:before {\n  opacity: 0.1;\n}\n.handsontable td.area-1:before {\n  opacity: 0.2;\n}\n.handsontable td.area-2:before {\n  opacity: 0.27;\n}\n.handsontable td.area-3:before {\n  opacity: 0.35;\n}\n.handsontable td.area-4:before {\n  opacity: 0.41;\n}\n.handsontable td.area-5:before {\n  opacity: 0.47;\n}\n.handsontable td.area-6:before {\n  opacity: 0.54;\n}\n.handsontable td.area-7:before {\n  opacity: 0.58;\n}\n.handsontable tbody th.ht__highlight,\n.handsontable thead th.ht__highlight {\n  background-color: #dcdcdc;\n}\n.handsontable tbody th.ht__active_highlight,\n.handsontable thead th.ht__active_highlight {\n  background-color: #8eb0e7;\n  color: #000;\n}\n/* fill handle */\n.handsontable .wtBorder.corner {\n  font-size: 0;\n  cursor: crosshair;\n}\n.handsontable .htBorder.htFillBorder {\n  background: red;\n  width: 1px;\n  height: 1px;\n}\n.handsontableInput {\n  border: none;\n  outline-width: 0;\n  margin: 0;\n  padding: 1px 5px 0 5px;\n  font-family: inherit;\n  line-height: 21px;\n  font-size: inherit;\n  box-shadow: 0 0 0 2px #5292F7 inset;\n  resize: none;\n  /*below are needed to overwrite stuff added by jQuery UI Bootstrap theme*/\n  display: block;\n  color: #000;\n  border-radius: 0;\n  background-color: #FFF;\n  /*overwrite styles potentionally made by a framework*/\n}\n.handsontableInputHolder {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 104;\n}\n.htSelectEditor {\n  -webkit-appearance: menulist-button !important;\n  position: absolute;\n  width: auto;\n}\n/*\nTextRenderer readOnly cell\n*/\n.handsontable .htDimmed {\n  color: #777;\n}\n.handsontable .htSubmenu {\n  position: relative;\n}\n.handsontable .htSubmenu :after{\n  content: '\\25B6';\n  color: #777;\n  position: absolute;\n  right: 5px;\n  font-size: 9px;\n}\n/*\nTextRenderer horizontal alignment\n*/\n.handsontable .htLeft{\n  text-align: left;\n}\n.handsontable .htCenter{\n  text-align: center;\n}\n.handsontable .htRight{\n  text-align: right;\n}\n.handsontable .htJustify{\n  text-align: justify;\n}\n/*\nTextRenderer vertical alignment\n*/\n.handsontable .htTop{\n  vertical-align: top;\n}\n.handsontable .htMiddle{\n  vertical-align: middle;\n}\n.handsontable .htBottom{\n  vertical-align: bottom;\n}\n/*\nTextRenderer placeholder value\n*/\n.handsontable .htPlaceholder {\n  color: #999;\n}\n/*\nAutocompleteRenderer down arrow\n*/\n.handsontable .htAutocompleteArrow {\n  float: right;\n  font-size: 10px;\n  color: #EEE;\n  cursor: default;\n  width: 16px;\n  text-align: center;\n}\n.handsontable td .htAutocompleteArrow:hover {\n  color: #777;\n}\n.handsontable td.area .htAutocompleteArrow {\n  color: #d3d3d3;\n}\n/*\nCheckboxRenderer\n*/\n.handsontable .htCheckboxRendererInput {\n  display: inline-block;\n}\n.handsontable .htCheckboxRendererInput.noValue {\n  opacity: 0.5;\n}\n.handsontable .htCheckboxRendererLabel {\n  font-size: inherit;\n  vertical-align: middle;\n  cursor: pointer;\n  display: inline-block;\n  width: 100%;\n}\n/**\n * Handsontable in Handsontable\n */\n.handsontable .handsontable.ht_clone_top .wtHider {\n  padding: 0 0 5px 0;\n}\n/**\n* Autocomplete Editor\n*/\n.handsontable .autocompleteEditor.handsontable {\n  padding-right: 17px;\n}\n.handsontable .autocompleteEditor.handsontable.htMacScroll {\n  padding-right: 15px;\n}\n/**\n * Handsontable listbox theme\n */\n.handsontable.listbox {\n  margin: 0;\n}\n.handsontable.listbox .ht_master table {\n  border: 1px solid #ccc;\n  border-collapse: separate;\n  background: white;\n}\n.handsontable.listbox th,\n.handsontable.listbox tr:first-child th,\n.handsontable.listbox tr:last-child th,\n.handsontable.listbox tr:first-child td,\n.handsontable.listbox td {\n  border-color: transparent;\n}\n.handsontable.listbox th,\n.handsontable.listbox td {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.handsontable.listbox td.htDimmed {\n  cursor: default;\n  color: inherit;\n  font-style: inherit;\n}\n.handsontable.listbox .wtBorder {\n  visibility: hidden;\n}\n.handsontable.listbox tr td.current,\n.handsontable.listbox tr:hover td {\n  background: #eee;\n}\n.ht_clone_top {\n  z-index: 101;\n}\n.ht_clone_left {\n  z-index: 102;\n}\n.ht_clone_top_left_corner,\n.ht_clone_bottom_left_corner {\n  z-index: 103;\n}\n.ht_clone_debug {\n  z-index: 103;\n}\n.handsontable td.htSearchResult {\n  background: #fcedd9;\n  color: #583707;\n}\n/*\nCell borders\n*/\n.htBordered{\n  /*box-sizing: border-box !important;*/\n  border-width: 1px;\n}\n.htBordered.htTopBorderSolid {\n  border-top-style: solid;\n  border-top-color: #000;\n}\n.htBordered.htRightBorderSolid {\n  border-right-style: solid;\n  border-right-color: #000;\n}\n.htBordered.htBottomBorderSolid {\n  border-bottom-style: solid;\n  border-bottom-color: #000;\n}\n.htBordered.htLeftBorderSolid {\n  border-left-style: solid;\n  border-left-color: #000;\n}\n.handsontable tbody tr th:nth-last-child(2) {\n  border-right: 1px solid #CCC;\n}\n.handsontable thead tr:nth-last-child(2) th.htGroupIndicatorContainer {\n  border-bottom: 1px solid #CCC;\n  padding-bottom: 5px;\n}\n.ht_clone_top_left_corner thead tr th:nth-last-child(2) {\n  border-right: 1px solid #CCC;\n}\n.htCollapseButton {\n  width: 10px;\n  height: 10px;\n  line-height: 10px;\n  text-align: center;\n  border-radius: 5px;\n  border: 1px solid #f3f3f3;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n  cursor: pointer;\n  margin-bottom: 3px;\n  position: relative;\n}\n.htCollapseButton:after {\n  content: \"\";\n  height: 300%;\n  width: 1px;\n  display: block;\n  background: #ccc;\n  margin-left: 4px;\n  position: absolute;\n  /*top: -300%;*/\n  bottom: 10px;\n}\nthead .htCollapseButton {\n  right: 5px;\n  position: absolute;\n  top: 5px;\n  background: #fff;\n}\nthead .htCollapseButton:after {\n  height: 1px;\n  width: 700%;\n  right: 10px;\n  top: 4px;\n}\n.handsontable tr th .htExpandButton {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  line-height: 10px;\n  text-align: center;\n  border-radius: 5px;\n  border: 1px solid #f3f3f3;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);\n  cursor: pointer;\n  top: 0;\n  display: none;\n}\n.handsontable thead tr th .htExpandButton {\n  /*left: 5px;*/\n  top: 5px;\n}\n.handsontable tr th .htExpandButton.clickable {\n  display: block;\n}\n.collapsibleIndicator {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(0% ,-50%);\n          transform: translate(0% ,-50%);\n  right: 5px;\n  border: 1px solid #A6A6A6;\n  line-height: 10px;\n  color: #222;\n  border-radius: 10px;\n  font-size: 10px;\n  width: 10px;\n  height: 10px;\n  cursor: pointer;\n  box-shadow: 0 0 0 6px rgba(238,238,238,1);\n  background: #eee;\n}\n.handsontable col.hidden {\n  width: 0 !important;\n}\n.handsontable table tr th.lightRightBorder {\n  border-right: 1px solid #E6E6E6;\n}\n.handsontable tr.hidden,\n.handsontable tr.hidden td,\n.handsontable tr.hidden th {\n  display: none;\n}\n.ht_master,\n.ht_clone_left,\n.ht_clone_top,\n.ht_clone_bottom {\n  overflow: hidden;\n}\n.ht_master .wtHolder {\n  overflow: auto;\n}\n.handsontable .ht_master thead,\n.handsontable .ht_master tr th,\n.handsontable .ht_clone_left thead {\n  visibility: hidden;\n}\n.ht_clone_top .wtHolder,\n.ht_clone_left .wtHolder,\n.ht_clone_bottom .wtHolder {\n  overflow: hidden;\n}\n/*\n\n Handsontable Mobile Text Editor stylesheet\n\n */\n.handsontable.mobile,\n.handsontable.mobile .wtHolder {\n  -webkit-touch-callout:none;\n  -webkit-user-select:none;\n  -moz-user-select:none;\n  -ms-user-select:none;\n  user-select:none;\n  -webkit-tap-highlight-color:rgba(0,0,0,0);\n  -webkit-overflow-scrolling: touch;\n}\n.htMobileEditorContainer {\n  display: none;\n  position: absolute;\n  top: 0;\n  width: 70%;\n  height: 54pt;\n  background: #f8f8f8;\n  border-radius: 20px;\n  border: 1px solid #ebebeb;\n  z-index: 999;\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -webkit-text-size-adjust: none;\n}\n.topLeftSelectionHandle:not(.ht_master .topLeftSelectionHandle),\n.topLeftSelectionHandle-HitArea:not(.ht_master .topLeftSelectionHandle-HitArea) {\n  z-index: 9999;\n}\n/* Initial left/top coordinates - overwritten when actual position is set */\n.topLeftSelectionHandle,\n.topLeftSelectionHandle-HitArea,\n.bottomRightSelectionHandle,\n.bottomRightSelectionHandle-HitArea {\n  left: -10000px;\n  top: -10000px;\n}\n.htMobileEditorContainer.active {\n  display: block;\n}\n.htMobileEditorContainer .inputs {\n  position: absolute;\n  right: 210pt;\n  bottom: 10pt;\n  top: 10pt;\n  left: 14px;\n  height: 34pt;\n}\n.htMobileEditorContainer .inputs textarea {\n  font-size: 13pt;\n  border: 1px solid #a1a1a1;\n  -webkit-appearance: none;\n  box-shadow: none;\n  position: absolute;\n  left: 14px;\n  right: 14px;\n  top: 0;\n  bottom: 0;\n  padding: 7pt;\n}\n.htMobileEditorContainer .cellPointer {\n  position: absolute;\n  top: -13pt;\n  height: 0;\n  width: 0;\n  left: 30px;\n\n  border-left: 13pt solid transparent;\n  border-right: 13pt solid transparent;\n  border-bottom: 13pt solid #ebebeb;\n}\n.htMobileEditorContainer .cellPointer.hidden {\n  display: none;\n}\n.htMobileEditorContainer .cellPointer:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 2px;\n  height: 0;\n  width: 0;\n  left: -13pt;\n\n  border-left: 13pt solid transparent;\n  border-right: 13pt solid transparent;\n  border-bottom: 13pt solid #f8f8f8;\n}\n.htMobileEditorContainer .moveHandle {\n  position: absolute;\n  top: 10pt;\n  left: 5px;\n  width: 30px;\n  bottom: 0px;\n  cursor: move;\n  z-index: 9999;\n}\n.htMobileEditorContainer .moveHandle:after {\n  content: \"..\\a..\\a..\\a..\";\n  white-space: pre;\n  line-height: 10px;\n  font-size: 20pt;\n  display: inline-block;\n  margin-top: -8px;\n  color: #ebebeb;\n}\n.htMobileEditorContainer .positionControls {\n  width: 205pt;\n  position: absolute;\n  right: 5pt;\n  top: 0;\n  bottom: 0;\n}\n.htMobileEditorContainer .positionControls > div {\n  width: 50pt;\n  height: 100%;\n  float: left;\n}\n.htMobileEditorContainer .positionControls > div:after {\n  content: \" \";\n  display: block;\n  width: 15pt;\n  height: 15pt;\n  text-align: center;\n  line-height: 50pt;\n}\n.htMobileEditorContainer .leftButton:after,\n.htMobileEditorContainer .rightButton:after,\n.htMobileEditorContainer .upButton:after,\n.htMobileEditorContainer .downButton:after {\n  transform-origin: 5pt 5pt;\n  -webkit-transform-origin: 5pt 5pt;\n  margin: 21pt 0 0 21pt;\n}\n.htMobileEditorContainer .leftButton:after {\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(-45deg);\n  /*margin-top: 17pt;*/\n  /*margin-left: 20pt;*/\n}\n.htMobileEditorContainer .leftButton:active:after {\n  border-color: #cfcfcf;\n}\n.htMobileEditorContainer .rightButton:after {\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(135deg);\n  /*margin-top: 17pt;*/\n  /*margin-left: 10pt;*/\n}\n.htMobileEditorContainer .rightButton:active:after {\n  border-color: #cfcfcf;\n}\n.htMobileEditorContainer .upButton:after {\n  /*border-top: 2px solid #cfcfcf;*/\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(45deg);\n  /*margin-top: 22pt;*/\n  /*margin-left: 15pt;*/\n}\n.htMobileEditorContainer .upButton:active:after {\n  border-color: #cfcfcf;\n}\n.htMobileEditorContainer .downButton:after {\n  border-top: 2px solid #288ffe;\n  border-left: 2px solid #288ffe;\n  -webkit-transform: rotate(225deg);\n  /*margin-top: 15pt;*/\n  /*margin-left: 15pt;*/\n}\n.htMobileEditorContainer .downButton:active:after {\n  border-color: #cfcfcf;\n}\n.handsontable.hide-tween {\n  -webkit-animation: opacity-hide 0.3s;\n  animation: opacity-hide 0.3s;\n  animation-fill-mode: forwards;\n  -webkit-animation-fill-mode: forwards;\n}\n.handsontable.show-tween {\n  -webkit-animation: opacity-show 0.3s;\n  animation: opacity-show 0.3s;\n  animation-fill-mode: forwards;\n  -webkit-animation-fill-mode: forwards;\n}\n@charset \"UTF-8\";\n/*!\n * Pikaday\n * Copyright © 2014 David Bushell | BSD & MIT license | http://dbushell.com/\n */\n.pika-single {\n    z-index: 9999;\n    display: block;\n    position: relative;\n    color: #333;\n    background: #fff;\n    border: 1px solid #ccc;\n    border-bottom-color: #bbb;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n/*\nclear child float (pika-lendar), using the famous micro clearfix hack\nhttp://nicolasgallagher.com/micro-clearfix-hack/\n*/\n.pika-single:before,\n.pika-single:after {\n    content: \" \";\n    display: table;\n}\n.pika-single:after { clear: both }\n.pika-single { *zoom: 1 }\n.pika-single.is-hidden {\n    display: none;\n}\n.pika-single.is-bound {\n    position: absolute;\n    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);\n}\n.pika-lendar {\n    float: left;\n    width: 240px;\n    margin: 8px;\n}\n.pika-title {\n    position: relative;\n    text-align: center;\n}\n.pika-label {\n    display: inline-block;\n    *display: inline;\n    position: relative;\n    z-index: 9999;\n    overflow: hidden;\n    margin: 0;\n    padding: 5px 3px;\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n    background-color: #fff;\n}\n.pika-title select {\n    cursor: pointer;\n    position: absolute;\n    z-index: 9998;\n    margin: 0;\n    left: 0;\n    top: 5px;\n    filter: alpha(opacity=0);\n    opacity: 0;\n}\n.pika-prev,\n.pika-next {\n    display: block;\n    cursor: pointer;\n    position: relative;\n    outline: none;\n    border: 0;\n    padding: 0;\n    width: 20px;\n    height: 30px;\n    /* hide text using text-indent trick, using width value (it's enough) */\n    text-indent: 20px;\n    white-space: nowrap;\n    overflow: hidden;\n    background-color: transparent;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 75% 75%;\n    opacity: .5;\n    *position: absolute;\n    *top: 0;\n}\n.pika-prev:hover,\n.pika-next:hover {\n    opacity: 1;\n}\n.pika-prev,\n.is-rtl .pika-next {\n    float: left;\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');\n    *left: 0;\n}\n.pika-next,\n.is-rtl .pika-prev {\n    float: right;\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');\n    *right: 0;\n}\n.pika-prev.is-disabled,\n.pika-next.is-disabled {\n    cursor: default;\n    opacity: .2;\n}\n.pika-select {\n    display: inline-block;\n    *display: inline;\n}\n.pika-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 0;\n}\n.pika-table th,\n.pika-table td {\n    width: 14.285714285714286%;\n    padding: 0;\n}\n.pika-table th {\n    color: #999;\n    font-size: 12px;\n    line-height: 25px;\n    font-weight: bold;\n    text-align: center;\n}\n.pika-button {\n    cursor: pointer;\n    display: block;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    outline: none;\n    border: 0;\n    margin: 0;\n    width: 100%;\n    padding: 5px;\n    color: #666;\n    font-size: 12px;\n    line-height: 15px;\n    text-align: right;\n    background: #f5f5f5;\n}\n.pika-week {\n    font-size: 11px;\n    color: #999;\n}\n.is-today .pika-button {\n    color: #33aaff;\n    font-weight: bold;\n}\n.is-selected .pika-button {\n    color: #fff;\n    font-weight: bold;\n    background: #33aaff;\n    box-shadow: inset 0 1px 3px #178fe5;\n    border-radius: 3px;\n}\n.is-inrange .pika-button {\n    background: #D5E9F7;\n}\n.is-startrange .pika-button {\n    color: #fff;\n    background: #6CB31D;\n    box-shadow: none;\n    border-radius: 3px;\n}\n.is-endrange .pika-button {\n    color: #fff;\n    background: #33aaff;\n    box-shadow: none;\n    border-radius: 3px;\n}\n.is-disabled .pika-button,\n.is-outside-current-month .pika-button {\n    pointer-events: none;\n    cursor: default;\n    color: #999;\n    opacity: .3;\n}\n.pika-button:hover {\n    color: #fff;\n    background: #ff8000;\n    box-shadow: none;\n    border-radius: 3px;\n}\n/* styling for abbr */\n.pika-table abbr {\n    border-bottom: none;\n    cursor: help;\n}\n.htCommentCell {\n    position: relative;\n}\n.htCommentCell:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0;\n    border-left: 6px solid transparent;\n    border-top: 6px solid black;\n}\n.htComments {\n    display: none;\n    z-index: 1059;\n    position: absolute;\n}\n.htCommentTextArea {\n    box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px;\n    box-sizing: border-box;\n    border: none;\n    border-left: 3px solid #ccc;\n    background-color: #fff;\n    width: 215px;\n    height: 90px;\n    font-size: 12px;\n    padding: 5px;\n    outline: 0px !important;\n    -webkit-appearance: none;\n}\n.htCommentTextArea:focus {\n    box-shadow: rgba(0, 0, 0, 0.117647) 0 1px 3px, rgba(0, 0, 0, 0.239216) 0 1px 2px, inset 0 0 0 1px #5292f7;\n    border-left: 3px solid #5292f7;\n}\n/*!\n * Handsontable ContextMenu\n */\n.htContextMenu:not(.htGhostTable) {\n  display: none;\n  position: absolute;\n  z-index: 1060; /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */\n}\n.htContextMenu .ht_clone_top,\n.htContextMenu .ht_clone_left,\n.htContextMenu .ht_clone_corner,\n.htContextMenu .ht_clone_debug {\n  display: none;\n}\n.htContextMenu table.htCore {\n  border: 1px solid #ccc;\n  border-bottom-width: 2px;\n  border-right-width: 2px;\n}\n.htContextMenu .wtBorder {\n  visibility: hidden;\n}\n.htContextMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.htContextMenu table tbody tr td:first-child {\n  border: 0;\n}\n.htContextMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232;\n}\n.htContextMenu table tbody tr td.current,\n.htContextMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #f3f3f3;\n}\n.htContextMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #e6e6e6;\n  height: 0;\n  padding: 0;\n  cursor: default;\n}\n.htContextMenu table tbody tr td.htDisabled {\n  color: #999;\n  cursor: default;\n}\n.htContextMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default;\n}\n.htContextMenu table tbody tr.htHidden {\n  display: none;\n}\n.htContextMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 6px;\n}\n.htContextMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px;\n}\n.htContextMenu .ht_master .wtHolder {\n  overflow: hidden;\n}\ntextarea#HandsontableCopyPaste {\n  position: fixed !important;\n  top: 0 !important;\n  right: 100% !important;\n  overflow: hidden;\n  opacity: 0;\n  outline: 0 none !important;\n}\n.htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_top_left_corner th:nth-child(2),\n.htRowHeaders .ht_master.innerBorderLeft ~ .ht_clone_left td:first-of-type {\n  border-left: 0 none;\n}\n.handsontable .wtHider {\n  position: relative;\n}\n.handsontable.ht__manualColumnMove.after-selection--columns thead th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.handsontable.ht__manualColumnMove.on-moving--columns,\n.handsontable.ht__manualColumnMove.on-moving--columns thead th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n.handsontable.ht__manualColumnMove.on-moving--columns .manualColumnResizer {\n  display: none;\n}\n.handsontable .ht__manualColumnMove--guideline,\n.handsontable .ht__manualColumnMove--backlight {\n  position: absolute;\n  height: 100%;\n  display: none;\n}\n.handsontable .ht__manualColumnMove--guideline {\n  background: #757575;\n  width: 2px;\n  top: 0;\n  margin-left: -1px;\n  z-index: 105;\n}\n.handsontable .ht__manualColumnMove--backlight {\n  background: #343434;\n  background: rgba(52, 52, 52, 0.25);\n  display: none;\n  z-index: 105;\n  pointer-events: none;\n}\n.handsontable.on-moving--columns.show-ui .ht__manualColumnMove--guideline,\n.handsontable.on-moving--columns .ht__manualColumnMove--backlight {\n  display: block;\n}\n.handsontable .wtHider {\n  position: relative;\n}\n.handsontable.ht__manualRowMove.after-selection--rows tbody th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.handsontable.ht__manualRowMove.on-moving--rows,\n.handsontable.ht__manualRowMove.on-moving--rows tbody th.ht__highlight {\n  cursor: move;\n  cursor: -webkit-grabbing;\n  cursor: grabbing;\n}\n.handsontable.ht__manualRowMove.on-moving--rows .manualRowResizer {\n  display: none;\n}\n.handsontable .ht__manualRowMove--guideline,\n.handsontable .ht__manualRowMove--backlight {\n  position: absolute;\n  width: 100%;\n  display: none;\n}\n.handsontable .ht__manualRowMove--guideline {\n  background: #757575;\n  height: 2px;\n  left: 0;\n  margin-top: -1px;\n  z-index: 105;\n}\n.handsontable .ht__manualRowMove--backlight {\n  background: #343434;\n  background: rgba(52, 52, 52, 0.25);\n  display: none;\n  z-index: 105;\n  pointer-events: none;\n}\n.handsontable.on-moving--rows.show-ui .ht__manualRowMove--guideline,\n.handsontable.on-moving--rows .ht__manualRowMove--backlight {\n  display: block;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"]:not([class*=\"fullySelectedMergedCell\"]):before {\n    opacity: 0;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-multiple\"]:before {\n    opacity: 0.1;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-0\"]:before {\n    opacity: 0.1;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-1\"]:before {\n    opacity: 0.2;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-2\"]:before {\n    opacity: 0.27;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-3\"]:before {\n    opacity: 0.35;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-4\"]:before {\n    opacity: 0.41;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-5\"]:before {\n    opacity: 0.47;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-6\"]:before {\n    opacity: 0.54;\n}\n.handsontable tbody td[rowspan][class*=\"area\"][class*=\"highlight\"][class*=\"fullySelectedMergedCell-7\"]:before {\n    opacity: 0.58;\n}\n/*!\n * Handsontable DropdownMenu\n */\n.handsontable .changeType {\n  background: #eee;\n  border-radius: 2px;\n  border: 1px solid #bbb;\n  color: #bbb;\n  font-size: 9px;\n  line-height: 9px;\n  padding: 2px;\n  margin: 3px 1px 0 5px;\n  float: right;\n}\n.handsontable .changeType:before {\n  content: '\\25BC\\ ';\n}\n.handsontable .changeType:hover {\n  border: 1px solid #777;\n  color: #777;\n  cursor: pointer;\n}\n.htDropdownMenu:not(.htGhostTable) {\n  display: none;\n  position: absolute;\n  z-index: 1060; /* needs to be higher than 1050 - z-index for Twitter Bootstrap modal (#1569) */\n}\n.htDropdownMenu .ht_clone_top,\n.htDropdownMenu .ht_clone_left,\n.htDropdownMenu .ht_clone_corner,\n.htDropdownMenu .ht_clone_debug {\n  display: none;\n}\n.htDropdownMenu table.htCore {\n  border: 1px solid #bbb;\n  border-bottom-width: 2px;\n  border-right-width: 2px;\n}\n.htDropdownMenu .wtBorder {\n  visibility: hidden;\n}\n.htDropdownMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.htDropdownMenu table tbody tr td:first-child {\n  border: 0;\n}\n.htDropdownMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232;\n}\n.htDropdownMenu table tbody tr td.current,\n.htDropdownMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #e9e9e9;\n}\n.htDropdownMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #e6e6e6;\n  height: 0;\n  padding: 0;\n  cursor: default;\n}\n.htDropdownMenu table tbody tr td.htDisabled {\n  color: #999;\n}\n.htDropdownMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default;\n}\n.htDropdownMenu:not(.htGhostTable) table tbody tr.htHidden {\n  display: none;\n}\n.htDropdownMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.htDropdownMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px;\n}\n.htDropdownMenu .ht_master .wtHolder {\n  overflow: hidden;\n}\n/* Column's number position */\n.handsontable span.colHeader.columnSorting::after {\n  /* Centering start */\n  top: 50%;\n  margin-top: -2px; /* Two extra pixels (-2 instead of -4) for purpose of proper positioning of numeric indicators, when `font-size` set to default */\n  /* Centering end */\n\n  position: absolute;\n  right: -15px;\n  padding-left: 5px; ; /* For purpose of continuous mouse over experience, when moving between the `::before` and the `::after` elements */\n\n  font-size: 8px;\n  height: 8px;\n  line-height: 1.1;\n  text-decoration: underline; /* Workaround for IE9 - IE11 */\n}\n/* Workaround for IE9 - IE11, https://stackoverflow.com/a/21902566, https://stackoverflow.com/a/32120247 */\n.handsontable span.colHeader.columnSorting::after {\n  text-decoration: none;\n}\n/* We support up to 7 numeric indicators, describing order of column in sorted columns queue */\n.handsontable span.colHeader.columnSorting[class^=\"sort-\"]::after,\n.handsontable span.colHeader.columnSorting[class*=\" sort-\"]::after {\n  content: \"+\"\n}\n.handsontable span.colHeader.columnSorting.sort-1::after {\n  content: '1';\n}\n.handsontable span.colHeader.columnSorting.sort-2::after {\n  content: '2';\n}\n.handsontable span.colHeader.columnSorting.sort-3::after {\n  content: '3';\n}\n.handsontable span.colHeader.columnSorting.sort-4::after {\n  content: '4';\n}\n.handsontable span.colHeader.columnSorting.sort-5::after {\n  content: '5';\n}\n.handsontable span.colHeader.columnSorting.sort-6::after {\n  content: '6';\n}\n.handsontable span.colHeader.columnSorting.sort-7::after {\n  content: '7';\n}\n/* Drop-down menu widens header by 5 pixels, sort sequence numbers won't overlap the icon; mainly for the IE9+ */\n.htGhostTable th div button.changeType + span.colHeader.columnSorting:not(.indicatorDisabled) {\n  padding-right: 5px;\n}\n/*!\n * Handsontable Filters\n */\n/* Conditions menu */\n.htFiltersConditionsMenu:not(.htGhostTable) {\n  display: none;\n  position: absolute;\n  z-index: 1070;\n}\n.htFiltersConditionsMenu .ht_clone_top,\n.htFiltersConditionsMenu .ht_clone_left,\n.htFiltersConditionsMenu .ht_clone_corner,\n.htFiltersConditionsMenu .ht_clone_debug {\n  display: none;\n}\n.htFiltersConditionsMenu table.htCore {\n  border: 1px solid #bbb;\n  border-bottom-width: 2px;\n  border-right-width: 2px;\n}\n.htFiltersConditionsMenu .wtBorder {\n  visibility: hidden;\n}\n.htFiltersConditionsMenu table tbody tr td {\n  background: white;\n  border-width: 0;\n  padding: 4px 6px 0 6px;\n  cursor: pointer;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.htFiltersConditionsMenu table tbody tr td:first-child {\n  border: 0;\n}\n.htFiltersConditionsMenu table tbody tr td.htDimmed {\n  font-style: normal;\n  color: #323232;\n}\n.htFiltersConditionsMenu table tbody tr td.current,\n.htFiltersConditionsMenu table tbody tr td.zeroclipboard-is-hover {\n  background: #e9e9e9;\n}\n.htFiltersConditionsMenu table tbody tr td.htSeparator {\n  border-top: 1px solid #e6e6e6;\n  height: 0;\n  padding: 0;\n}\n.htFiltersConditionsMenu table tbody tr td.htDisabled {\n  color: #999;\n}\n.htFiltersConditionsMenu table tbody tr td.htDisabled:hover {\n  background: #fff;\n  color: #999;\n  cursor: default;\n}\n.htFiltersConditionsMenu table tbody tr td .htItemWrapper {\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.htFiltersConditionsMenu table tbody tr td div span.selected {\n  margin-top: -2px;\n  position: absolute;\n  left: 4px;\n}\n.htFiltersConditionsMenu .ht_master .wtHolder {\n  overflow: hidden;\n}\n.handsontable .htMenuFiltering {\n  border-bottom: 1px dotted #ccc;\n  height: 135px;\n  overflow: hidden;\n}\n.handsontable .ht_master table td.htCustomMenuRenderer {\n  background-color: #fff;\n  cursor: auto;\n}\n/* Menu label */\n.handsontable .htFiltersMenuLabel {\n  font-size: 0.75em;\n}\n/* Component action bar */\n.handsontable .htFiltersMenuActionBar {\n  text-align: center;\n  padding-top: 10px;\n  padding-bottom: 3px;\n}\n/* Component filter by conditional */\n.handsontable .htFiltersMenuCondition.border {\n  border-bottom: 1px dotted #ccc !important;\n}\n.handsontable .htFiltersMenuCondition .htUIInput {\n  padding: 0 0 5px 0;\n}\n/* Component filter by value */\n.handsontable .htFiltersMenuValue {\n  border-bottom: 1px dotted #ccc !important;\n}\n.handsontable .htFiltersMenuValue .htUIMultipleSelectSearch {\n  padding: 0;\n}\n.handsontable .htFiltersMenuCondition .htUIInput input,\n.handsontable .htFiltersMenuValue .htUIMultipleSelectSearch input {\n  font-family: inherit;\n  font-size: 0.75em;\n  padding: 4px;\n  box-sizing: border-box;\n  width: 100%;\n}\n.htUIMultipleSelect .ht_master .wtHolder {\n  overflow-y: scroll;\n}\n.handsontable .htFiltersActive .changeType {\n  border: 1px solid #509272;\n  color: #18804e;\n  background-color: #d2e0d9;\n}\n.handsontable .htUISelectAll {\n  margin-right: 10px;\n}\n.handsontable .htUIClearAll, .handsontable .htUISelectAll {\n  display: inline-block;\n}\n.handsontable .htUIClearAll a, .handsontable .htUISelectAll a {\n  color: #3283D8;\n  font-size: 0.75em;\n}\n.handsontable .htUISelectionControls {\n  text-align: right;\n}\n.handsontable .htCheckboxRendererInput {\n  margin: 0 5px 0 0;\n  vertical-align: middle;\n  height: 1em;\n}\n/* UI elements */\n/* Input */\n.handsontable .htUIInput {\n  padding: 3px 0 7px 0;\n  position: relative;\n  text-align: center;\n}\n.handsontable .htUIInput input {\n  border-radius: 2px;\n  border: 1px solid #d2d1d1;\n}\n.handsontable .htUIInput input:focus {\n  outline: 0;\n}\n.handsontable .htUIInputIcon {\n  position: absolute;\n}\n/* Button */\n.handsontable .htUIInput.htUIButton {\n  cursor: pointer;\n  display: inline-block;\n}\n.handsontable .htUIInput.htUIButton input {\n  background-color: #eee;\n  color: #000;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: 0.7em;\n  font-weight: bold;\n  height: 19px;\n  min-width: 64px;\n}\n.handsontable .htUIInput.htUIButton input:hover {\n  border-color: #b9b9b9;\n}\n.handsontable .htUIInput.htUIButtonOK {\n  margin-right: 10px;\n}\n.handsontable .htUIInput.htUIButtonOK input {\n  background-color: #0f9d58;\n  border-color: #18804e;\n  color: #fff;\n}\n.handsontable .htUIInput.htUIButtonOK input:hover {\n  border-color: #1a6f46;\n}\n/* Select */\n.handsontable .htUISelect {\n  cursor: pointer;\n  margin-bottom: 7px;\n  position: relative;\n}\n.handsontable .htUISelectCaption {\n  background-color: #e8e8e8;\n  border-radius: 2px;\n  border: 1px solid #d2d1d1;\n  font-family: inherit;\n  font-size: 0.7em;\n  font-weight: bold;\n  padding: 3px 20px 3px 10px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.handsontable .htUISelectCaption:hover {\n  background-color: #e8e8e8;\n  border: 1px solid #b9b9b9;\n}\n.handsontable .htUISelectDropdown:after {\n  content: '\\25B2';\n  font-size: 7px;\n  position: absolute;\n  right: 10px;\n  top: 0;\n}\n.handsontable .htUISelectDropdown:before {\n  content: '\\25BC';\n  font-size: 7px;\n  position: absolute;\n  right: 10px;\n  top: 8px;\n}\n/* SelectMultiple */\n.handsontable .htUIMultipleSelect .handsontable .htCore {\n  border: none;\n}\n.handsontable .htUIMultipleSelect .handsontable .htCore td:hover {\n  background-color: #F5F5F5;\n}\n.handsontable .htUIMultipleSelectSearch input {\n  border-radius: 2px;\n  border: 1px solid #d2d1d1;\n  padding: 3px;\n}\n.handsontable .htUIRadio {\n  display: inline-block;\n  margin-right: 5px;\n  height: 100%;\n}\n.handsontable .htUIRadio:last-child {\n  margin-right: 0;\n}\n.handsontable .htUIRadio > input[type=radio] {\n  margin-right: 0.5ex;\n}\n.handsontable .htUIRadio label {\n  vertical-align: middle;\n}\n.handsontable .htFiltersMenuOperators {\n  padding-bottom: 5px;\n}\n.handsontable.ganttChart tr:first-child th div.relative {\n  padding-right: 21px;\n}\n.handsontable.ganttChart .colHeader {\n  display: block;\n}\n.handsontable.ganttChart td.rangeBar {\n  background: #48b703;\n  border-right-width: 0;\n  position: relative;\n  box-shadow: inset 0 3px 0 #ffffff;\n}\n.handsontable.ganttChart td.rangeBar.last {\n  border-right-width: 1px;\n}\n.handsontable.ganttChart td.rangeBar.area {\n  background: #7EC481;\n}\n.handsontable.ganttChart td.rangeBar.partial {\n  background: #8edf5a;\n}\n.handsontable.ganttChart td.rangeBar.area.partial {\n  background: #A1D8AD;\n}\n.handsontable thead th.hiddenHeader:not(:first-of-type) {\n  display: none;\n}\n.handsontable th.ht_nestingLevels {\n    text-align: left;\n    padding-left: 7px;\n}\n.handsontable th div.ht_nestingLevels {\n    display: inline-block;\n    position: absolute;\n    left: 11px;\n}\n.handsontable.innerBorderLeft th div.ht_nestingLevels,\n.handsontable.innerBorderLeft ~ .handsontable th div.ht_nestingLevels {\n    right: 10px;\n}\n.handsontable th span.ht_nestingLevel {\n    display: inline-block;\n}\n.handsontable th span.ht_nestingLevel_empty {\n    display: inline-block;\n    width: 10px;\n    height: 1px;\n    float: left;\n}\n.handsontable th span.ht_nestingLevel::after {\n    content: \"\\2510\";\n    font-size: 9px;\n    display: inline-block;\n    position: relative;\n    bottom: 3px;\n}\n.handsontable th div.ht_nestingButton {\n    display: inline-block;\n    position: absolute;\n    right: -2px;\n    cursor: pointer;\n}\n.handsontable th div.ht_nestingButton.ht_nestingExpand::after {\n    content: \"\\002B\";\n}\n.handsontable th div.ht_nestingButton.ht_nestingCollapse::after {\n    content: \"\\002D\";\n}\n.handsontable.innerBorderLeft th div.ht_nestingButton,\n.handsontable.innerBorderLeft ~ .handsontable th div.ht_nestingButton {\n    right: 0;\n}\n/*\n * Handsontable HiddenColumns\n */\n.handsontable th.beforeHiddenColumn {\n  position: relative;\n}\n.handsontable th.beforeHiddenColumn::after,\n.handsontable th.afterHiddenColumn::before {\n  color: #bbb;\n  position: absolute;\n  top: 50%;\n  font-size: 5pt;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n.handsontable th.afterHiddenColumn {\n  position: relative;\n}\n.handsontable th.beforeHiddenColumn::after {\n  right: 1px;\n  content: '\\25C0';\n}\n.handsontable th.afterHiddenColumn::before {\n  left: 1px;\n  content: '\\25B6';\n}\n.handsontable td.firstVisibleColumn,\n.handsontable th.firstVisibleColumn {\n  border-left: 1px solid #CCC;\n}\n/*!\n * Handsontable HiddenRows\n */\n.handsontable th.beforeHiddenRow::before,\n.handsontable th.afterHiddenRow::after {\n  color: #bbb;\n  font-size: 6pt;\n  line-height: 6pt;\n  position: absolute;\n  left: 2px;\n}\n.handsontable th.beforeHiddenRow,\n.handsontable th.afterHiddenRow {\n  position: relative;\n}\n.handsontable th.beforeHiddenRow::before {\n  content: '\\25B2';\n  bottom: 2px;\n}\n.handsontable th.afterHiddenRow::after {\n  content: '\\25BC';\n  top: 2px;\n}\n.handsontable.ht__selection--rows tbody th.beforeHiddenRow.ht__highlight:before,\n.handsontable.ht__selection--rows tbody th.afterHiddenRow.ht__highlight:after {\n  color: #eee;\n}\n.handsontable td.afterHiddenRow.firstVisibleRow,\n.handsontable th.afterHiddenRow.firstVisibleRow {\n  border-top: 1px solid #CCC;\n}\n.header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n  \r\n    \r\n  }\n#srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\n#srs_name{\r\n    width:500px;\r\n    margin-left:70px;\r\n    margin-top:20px;\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size: 32pt;\r\n    font-family: daimler !important;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\n#hostel_name{\r\n    margin-top:35px;\r\n    color:#5df7d1;\r\n    float:left;\r\n    font-size: 14pt;\r\n    width:290px;\r\n    font-family: daimler !important;\r\n  }\n#horizontal_nav{\r\n    margin-left:770px;\r\n  }\n#srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n  }\n#srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n  }\n#horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n  }\n.body_content{\r\n    background-color: white;\r\n  }\n#add_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    margin-top:53px;\r\n    position: absolute;\r\n    margin-left: 240px;\r\n    text-decoration: none;\r\n    color: black;\r\n    text-align: center;\r\n    float:left;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n#view_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:390px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n#modify_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #005cab;\r\n    position:absolute;\r\n    margin-left:541px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: white;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n#line{\r\n    color: black;\r\n    width: 30px;\r\n    position: absolute;\r\n    width:625px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 100px;\r\n    /* position: absolute;*/ \r\n    margin-left: 691px;\r\n  }\n.spreadsheet{\r\n    height:500px;\r\n    max-width:750px;\r\n    overflow: scroll;\r\n    overflow-x: hidden;\r\n    overflow-y: hidden;\r\n    position: absolute;\r\n    margin-left:240px;\r\n    margin-top: 145px;\r\n  }\n.save_button{\r\n    cursor: pointer;\r\n    background-color: #005cab;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: none;\r\n    color:white;\r\n    outline:none;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\n.footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n  }\n.loader {\r\n    border: 5px solid #f3f3f3;\r\n    border-radius: 60%;\r\n    border-top: 5px solid #33331a;\r\n    width: 30px;\r\n    height: 30px;\r\n    margin-top: 80px;\r\n    margin-left:650px;\r\n    -webkit-animation: spin 1.5s linear infinite; /* Safari */\r\n    animation: spin 1.5s linear infinite;\r\n  }\n/* Safari */\n@-webkit-keyframes spin {\r\n    0% { -webkit-transform: rotate(0deg); }\r\n    100% { -webkit-transform: rotate(360deg); }\r\n  }\n@keyframes spin {\r\n    0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\r\n    100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\r\n  }\r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9oYW5kc29udGFibGUvZGlzdC9oYW5kc29udGFibGUuZnVsbC5jc3MiLCJzcmMvYXBwL21vZGlmeS1wdXJjaGFzZS9tb2RpZnktcHVyY2hhc2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQ0U7QUFDRjs7RUFFRTtBQUNGO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUVBOzs7Ozs7RUFNRSw2QkFBNkI7QUFDL0I7QUFFQSxtQkFBbUI7QUFDbkI7RUFDRSxTQUFTO0VBQ1QseUJBQXlCO0FBQzNCO0FBRUE7O0VBRUUsaUJBQWlCO0FBQ25CO0FBRUE7O0VBRUUsOEJBQThCO0FBQ2hDO0FBRUE7Ozs7OztFQU1FLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCO0FBRUE7Ozs7Ozs7O0VBUUUsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixhQUFhO0FBQ2Y7QUFFQTtFQUNFLFFBQVE7QUFDVjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVEsRUFBRSw0RkFBNEY7RUFDdEcsWUFBWTtBQUNkO0FBRUE7Ozs7Ozs7O0VBUUUsdUJBQXVCO0VBQ3ZCLCtCQUErQjtFQUMvQiw0QkFBNEI7QUFDOUI7QUFFQTs7RUFFRSxtQkFBbUI7QUFDckI7QUFFQTtFQUNFLHlCQUF5QjtFQUN6Qix1S0FBdUs7RUFDdkssOEZBQThGO0VBQzlGOzs7OztzQkFLb0IsRUFBRSwyQ0FBMkM7RUFDakUsaUJBQWlCO0VBQ2pCLFNBQVM7RUFDVCxlQUFlO0VBQ2YsbUJBQW1C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QUF1QixFQUFFO0lBQzlCLE9BQU8saUNBQXlCLEVBQXpCLHlCQUF5QixFQUFFO0VBQ3BDIiwiZmlsZSI6InNyYy9hcHAvbW9kaWZ5LXB1cmNoYXNlL21vZGlmeS1wdXJjaGFzZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBDb3B5cmlnaHQgKGMpIEhBTkRTT05DT0RFIHNwLiB6IG8uIG8uXG4gKiBcbiAqIEhBTkRTT05UQUJMRSBpcyBhIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIGJ5IEhBTkRTT05DT0RFIHNwLiB6IG8uIG8uLFxuICogYSBQb2xpc2ggY29ycG9yYXRpb24sIGJhc2VkIGluIEdkeW5pYSwgUG9sYW5kLCBhdCA5Ni85OCBBbGVqYSBad3ljaWXMqHN0d2EsXG4gKiByZWdpc3RlcmVkIHdpdGggdGhlIE5hdGlvbmFsIENvdXJ0IFJlZ2lzdGVyIHVuZGVyIG51bWJlciA1Mzg2NTEsXG4gKiBFVSB0YXggSUQgbnVtYmVyOiBQTDU4NjIyOTQwMDIsIHNoYXJlIGNhcGl0YWw6IFBMTiA2Miw4MDAuMDAuXG4gKiBcbiAqIFRoaXMgc29mdHdhcmUgaXMgcHJvdGVjdGVkIGJ5IGFwcGxpY2FibGUgY29weXJpZ2h0IGxhd3MsIGluY2x1ZGluZ1xuICogaW50ZXJuYXRpb25hbCB0cmVhdGllcywgYW5kIGR1YWwtbGljZW5zZWQg4oCTIGRlcGVuZGluZyBvbiB3aGV0aGVyXG4gKiB5b3VyIHVzZSBpcyBpbnRlbmRlZCBmb3Igb3IgbWF5IHJlc3VsdCBpbiBjb21tZXJjaWFsIGFkdmFudGFnZVxuICogb3IgbW9uZXRhcnkgY29tcGVuc2F0aW9uIChjb21tZXJjaWFsIHB1cnBvc2VzKSwgb3Igbm90LlxuICogXG4gKiBJZiB5b3VyIHVzZSBpbnZvbHZlcyBvbmx5IHN1Y2ggcHVycG9zZXMgYXMgcmVzZWFyY2gsIHByaXZhdGUgc3R1ZHksXG4gKiBldmFsdWF0aW9uIGFuZCB0aGUgbGlrZSwgeW91IGFncmVlIHRvIGJlIGJvdW5kIGJ5IHRoZSB0ZXJtcyBpbmNsdWRlZFxuICogaW4gdGhlIOKAnGhhbmRzb250YWJsZS1ub24tY29tbWVyY2lhbC1saWNlbnNlLnBkZuKAnSBmaWxlLCBhdmFpbGFibGVcbiAqIGluIHRoZSBtYWluIGRpcmVjdG9yeSBvZiB0aGlzIHNvZnR3YXJlIHJlcG9zaXRvcnkuXG4gKiBcbiAqIEJ5IGluc3RhbGxpbmcsIGNvcHlpbmcsIG9yIG90aGVyd2lzZSB1c2luZyB0aGlzIHNvZnR3YXJlIGZvclxuICogY29tbWVyY2lhbCBwdXJwb3NlcywgeW91IGFncmVlIHRvIGJlIGJvdW5kIGJ5IHRoZSB0ZXJtcyBpbmNsdWRlZFxuICogaW4gdGhlIOKAnGhhbmRzb250YWJsZS1nZW5lcmFsLXRlcm1zLnBkZuKAnSBmaWxlLCBhdmFpbGFibGUgaW4gdGhlIG1haW5cbiAqIGRpcmVjdG9yeSBvZiB0aGlzIHNvZnR3YXJlIHJlcG9zaXRvcnkuXG4gKiBcbiAqIEhBTkRTT05DT0RFIFBST1ZJREVTIFRISVMgU09GVFdBUkUgT04gQU4g4oCcQVMgSVPigJ0gQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORC4gSU4gTk8gRVZFTlRcbiAqIEFORCBVTkRFUiBOTyBMRUdBTCBUSEVPUlksIFNIQUxMIEhBTkRTT05DT0RFIEJFIExJQUJMRVxuICogVE8gWU9VIEZPUiBEQU1BR0VTLCBJTkNMVURJTkcgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIFNQRUNJQUwsXG4gKiBJTkNJREVOVEFMLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT0YgQU5ZIENIQVJBQ1RFUiBBUklTSU5HXG4gKiBGUk9NIFVTRSBPUiBJTkFCSUxJVFkgVE8gVVNFIFRISVMgU09GVFdBUkUuXG4gKiBcbiAqIFZlcnNpb246IDcuMS4wXG4gKiBSZWxlYXNlIGRhdGU6IDExLzA2LzIwMTkgKGJ1aWx0IGF0IDEwLzA2LzIwMTkgMTA6MzU6NTgpXG4gKi9cbi8qKlxuICogRml4IGZvciBib290c3RyYXAgc3R5bGVzXG4gKi9cbi5oYW5kc29udGFibGUgLnRhYmxlIHRoLCAuaGFuZHNvbnRhYmxlIC50YWJsZSB0ZCB7XG4gIGJvcmRlci10b3A6IG5vbmU7XG59XG5cbi5oYW5kc29udGFibGUgdHIge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbn1cblxuLmhhbmRzb250YWJsZSAudGFibGUgY2FwdGlvbiArIHRoZWFkIHRyOmZpcnN0LWNoaWxkIHRoLFxuLmhhbmRzb250YWJsZSAudGFibGUgY2FwdGlvbiArIHRoZWFkIHRyOmZpcnN0LWNoaWxkIHRkLFxuLmhhbmRzb250YWJsZSAudGFibGUgY29sZ3JvdXAgKyB0aGVhZCB0cjpmaXJzdC1jaGlsZCB0aCxcbi5oYW5kc29udGFibGUgLnRhYmxlIGNvbGdyb3VwICsgdGhlYWQgdHI6Zmlyc3QtY2hpbGQgdGQsXG4uaGFuZHNvbnRhYmxlIC50YWJsZSB0aGVhZDpmaXJzdC1jaGlsZCB0cjpmaXJzdC1jaGlsZCB0aCxcbi5oYW5kc29udGFibGUgLnRhYmxlIHRoZWFkOmZpcnN0LWNoaWxkIHRyOmZpcnN0LWNoaWxkIHRkIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNDQ0NDQ0M7XG59XG5cbi8qIHRhYmxlLWJvcmRlcmVkICovXG4uaGFuZHNvbnRhYmxlIC50YWJsZS1ib3JkZXJlZCB7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcbn1cblxuLmhhbmRzb250YWJsZSAudGFibGUtYm9yZGVyZWQgdGgsXG4uaGFuZHNvbnRhYmxlIC50YWJsZS1ib3JkZXJlZCB0ZCB7XG4gIGJvcmRlci1sZWZ0OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIC50YWJsZS1ib3JkZXJlZCB0aDpmaXJzdC1jaGlsZCxcbi5oYW5kc29udGFibGUgLnRhYmxlLWJvcmRlcmVkIHRkOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDQ0NDO1xufVxuXG4uaGFuZHNvbnRhYmxlIC50YWJsZSA+IHRib2R5ID4gdHIgPiB0ZCxcbi5oYW5kc29udGFibGUgLnRhYmxlID4gdGJvZHkgPiB0ciA+IHRoLFxuLmhhbmRzb250YWJsZSAudGFibGUgPiB0Zm9vdCA+IHRyID4gdGQsXG4uaGFuZHNvbnRhYmxlIC50YWJsZSA+IHRmb290ID4gdHIgPiB0aCxcbi5oYW5kc29udGFibGUgLnRhYmxlID4gdGhlYWQgPiB0ciA+IHRkLFxuLmhhbmRzb250YWJsZSAudGFibGUgPiB0aGVhZCA+IHRyID4gdGgge1xuICBsaW5lLWhlaWdodDogMjFweDtcbiAgcGFkZGluZzogMCA0cHg7XG59XG5cbi5jb2wtbGctMS5oYW5kc29udGFibGUsIC5jb2wtbGctMTAuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTExLmhhbmRzb250YWJsZSwgLmNvbC1sZy0xMi5oYW5kc29udGFibGUsXG4uY29sLWxnLTIuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTMuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTQuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTUuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTYuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTcuaGFuZHNvbnRhYmxlLCAuY29sLWxnLTguaGFuZHNvbnRhYmxlLCAuY29sLWxnLTkuaGFuZHNvbnRhYmxlLFxuLmNvbC1tZC0xLmhhbmRzb250YWJsZSwgLmNvbC1tZC0xMC5oYW5kc29udGFibGUsIC5jb2wtbWQtMTEuaGFuZHNvbnRhYmxlLCAuY29sLW1kLTEyLmhhbmRzb250YWJsZSxcbi5jb2wtbWQtMi5oYW5kc29udGFibGUsIC5jb2wtbWQtMy5oYW5kc29udGFibGUsIC5jb2wtbWQtNC5oYW5kc29udGFibGUsIC5jb2wtbWQtNS5oYW5kc29udGFibGUsIC5jb2wtbWQtNi5oYW5kc29udGFibGUsIC5jb2wtbWQtNy5oYW5kc29udGFibGUsIC5jb2wtbWQtOC5oYW5kc29udGFibGUsIC5jb2wtbWQtOS5oYW5kc29udGFibGVcbi5jb2wtc20tMS5oYW5kc29udGFibGUsIC5jb2wtc20tMTAuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTExLmhhbmRzb250YWJsZSwgLmNvbC1zbS0xMi5oYW5kc29udGFibGUsXG4uY29sLXNtLTIuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTMuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTQuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTUuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTYuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTcuaGFuZHNvbnRhYmxlLCAuY29sLXNtLTguaGFuZHNvbnRhYmxlLCAuY29sLXNtLTkuaGFuZHNvbnRhYmxlXG4uY29sLXhzLTEuaGFuZHNvbnRhYmxlLCAuY29sLXhzLTEwLmhhbmRzb250YWJsZSwgLmNvbC14cy0xMS5oYW5kc29udGFibGUsIC5jb2wteHMtMTIuaGFuZHNvbnRhYmxlLFxuLmNvbC14cy0yLmhhbmRzb250YWJsZSwgLmNvbC14cy0zLmhhbmRzb250YWJsZSwgLmNvbC14cy00LmhhbmRzb250YWJsZSwgLmNvbC14cy01LmhhbmRzb250YWJsZSwgLmNvbC14cy02LmhhbmRzb250YWJsZSwgLmNvbC14cy03LmhhbmRzb250YWJsZSwgLmNvbC14cy04LmhhbmRzb250YWJsZSwgLmNvbC14cy05LmhhbmRzb250YWJsZSB7XG4gIHBhZGRpbmctbGVmdDogMDtcbiAgcGFkZGluZy1yaWdodDogMDtcbn1cblxuLmhhbmRzb250YWJsZSAudGFibGUtc3RyaXBlZCA+IHRib2R5ID4gdHI6bnRoLW9mLXR5cGUoZXZlbikge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xufVxuXG4uaGFuZHNvbnRhYmxlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5oaWRle1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5yZWxhdGl2ZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmhhbmRzb250YWJsZS5odEF1dG9TaXplIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBsZWZ0OiAtOTkwMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC05OTAwMHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC53dEhpZGVyIHtcbiAgd2lkdGg6IDA7XG59XG5cbi5oYW5kc29udGFibGUgLnd0U3ByZWFkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAwOyAvKm11c3QgYmUgMCwgb3RoZXJ3aXNlIGJsYW5rIHNwYWNlIGFwcGVhcnMgaW4gc2Nyb2xsIGRlbW8gYWZ0ZXIgc2Nyb2xsaW5nIG1heCB0byB0aGUgcmlnaHQgKi9cbiAgaGVpZ2h0OiBhdXRvO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRhYmxlLFxuLmhhbmRzb250YWJsZSB0Ym9keSxcbi5oYW5kc29udGFibGUgdGhlYWQsXG4uaGFuZHNvbnRhYmxlIHRkLFxuLmhhbmRzb250YWJsZSB0aCxcbi5oYW5kc29udGFibGUgaW5wdXQsXG4uaGFuZHNvbnRhYmxlIHRleHRhcmVhLFxuLmhhbmRzb250YWJsZSBkaXYge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgLW1vei1ib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbn1cblxuLmhhbmRzb250YWJsZSBpbnB1dCxcbi5oYW5kc29udGFibGUgdGV4dGFyZWEge1xuICBtaW4taGVpZ2h0OiBpbml0aWFsO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRhYmxlLmh0Q29yZSB7XG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XG4gIC8qIGl0IG11c3QgYmUgc2VwYXJhdGUsIG90aGVyd2lzZSB0aGVyZSBhcmUgb2Zmc2V0IG1pc2NhbGN1bGF0aW9ucyBpbiBXZWJLaXQ6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjY1NTk4Ny9ib3JkZXItY29sbGFwc2UtZGlmZmVyZW5jZXMtaW4tZmYtYW5kLXdlYmtpdCAqL1xuICAvKiB0aGlzIGFjdHVhbGx5IG9ubHkgY2hhbmdlcyBhcHBlYXJhbmNlIG9mIHVzZXIgc2VsZWN0aW9uIC0gZG9lcyBub3QgbWFrZSB0ZXh0IHVuc2VsZWN0YWJsZSAqL1xuICAvKiAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1vLXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lOyAqLyAvKiBubyBicm93c2VyIHN1cHBvcnRzIHVucHJlZml4ZWQgdmVyc2lvbiAqL1xuICBib3JkZXItc3BhY2luZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXItd2lkdGg6IDA7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG4gIHdpZHRoOiAwO1xuICBvdXRsaW5lLXdpZHRoOiAwO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIC8qIHJlc2V0IGJvb3RzdHJhcCB0YWJsZSBzdHlsZS4gZm9yIG1vcmUgaW5mbyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5kc29udGFibGUvaGFuZHNvbnRhYmxlL2lzc3Vlcy8yMjQgKi9cbiAgbWF4LXdpZHRoOiBub25lO1xuICBtYXgtaGVpZ2h0OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIGNvbCB7XG4gIHdpZHRoOiA1MHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIGNvbC5yb3dIZWFkZXIge1xuICB3aWR0aDogNTBweDtcbn1cblxuLmhhbmRzb250YWJsZSB0aCxcbi5oYW5kc29udGFibGUgdGQge1xuICBib3JkZXItdG9wLXdpZHRoOiAwO1xuICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0NDQztcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNDQ0M7XG4gIGhlaWdodDogMjJweDtcbiAgZW1wdHktY2VsbHM6IHNob3c7XG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICBwYWRkaW5nOiAwIDRweCAwIDRweDtcbiAgLyogdG9wLCBib3R0b20gcGFkZGluZyBkaWZmZXJlbnQgdGhhbiAwIGlzIGhhbmRsZWQgcG9vcmx5IGJ5IEZGIHdpdGggSFRNTDUgZG9jdHlwZSAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdXRsaW5lLXdpZHRoOiAwO1xuICB3aGl0ZS1zcGFjZTogcHJlLWxpbmU7XG4gIC8qIHByZXNlcnZlIG5ldyBsaW5lIGNoYXJhY3RlciBpbiBjZWxsICovXG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG59XG5cbi5oYW5kc29udGFibGUgdGQuaHRJbnZhbGlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNGM0MiAhaW1wb3J0YW50OyAvKmdpdmVzIHByaW9yaXR5IG92ZXIgdGQuYXJlYSBzZWxlY3Rpb24gYmFja2dyb3VuZCovXG59XG5cbi5oYW5kc29udGFibGUgdGQuaHROb1dyYXAge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoOmxhc3QtY2hpbGQge1xuICAvKkZvdW5kYXRpb24gZnJhbWV3b3JrIGZpeCovXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0M7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRyOmZpcnN0LWNoaWxkIHRoLmh0Tm9GcmFtZSxcbi5oYW5kc29udGFibGUgdGg6Zmlyc3QtY2hpbGQuaHROb0ZyYW1lLFxuLmhhbmRzb250YWJsZSB0aC5odE5vRnJhbWUge1xuICBib3JkZXItbGVmdC13aWR0aDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlci1jb2xvcjogI0ZGRjtcbn1cblxuLmhhbmRzb250YWJsZSB0aDpmaXJzdC1jaGlsZCxcbi5oYW5kc29udGFibGUgdGg6bnRoLWNoaWxkKDIpLFxuLmhhbmRzb250YWJsZSB0ZDpmaXJzdC1vZi10eXBlLFxuLmhhbmRzb250YWJsZSAuaHROb0ZyYW1lICsgdGgsXG4uaGFuZHNvbnRhYmxlIC5odE5vRnJhbWUgKyB0ZCB7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI0NDQztcbn1cblxuLmhhbmRzb250YWJsZS5odFJvd0hlYWRlcnMgdGhlYWQgdHIgdGg6bnRoLWNoaWxkKDIpIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRyOmZpcnN0LWNoaWxkIHRoLFxuLmhhbmRzb250YWJsZSB0cjpmaXJzdC1jaGlsZCB0ZCB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaHRfbWFzdGVyOm5vdCguaW5uZXJCb3JkZXJMZWZ0KTpub3QoLmVtcHR5Q29sdW1ucykgfiAuaGFuZHNvbnRhYmxlIHRib2R5IHRyIHRoLFxuLmh0X21hc3Rlcjpub3QoLmlubmVyQm9yZGVyTGVmdCk6bm90KC5lbXB0eUNvbHVtbnMpIH4gLmhhbmRzb250YWJsZTpub3QoLmh0X2Nsb25lX3RvcCkgdGhlYWQgdHIgdGg6Zmlyc3QtY2hpbGQge1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG59XG5cbi5odF9tYXN0ZXI6bm90KC5pbm5lckJvcmRlclRvcCkgdGhlYWQgdHI6bGFzdC1jaGlsZCB0aCxcbi5odF9tYXN0ZXI6bm90KC5pbm5lckJvcmRlclRvcCkgfiAuaGFuZHNvbnRhYmxlIHRoZWFkIHRyOmxhc3QtY2hpbGQgdGgsXG4uaHRfbWFzdGVyOm5vdCguaW5uZXJCb3JkZXJUb3ApIHRoZWFkIHRyLmxhc3RDaGlsZCB0aCxcbi5odF9tYXN0ZXI6bm90KC5pbm5lckJvcmRlclRvcCkgfiAuaGFuZHNvbnRhYmxlIHRoZWFkIHRyLmxhc3RDaGlsZCB0aCB7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG59XG5cbi5oYW5kc29udGFibGUgdGgge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICBjb2xvcjogIzIyMjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoZWFkIHRoIHtcbiAgcGFkZGluZzogMDtcbn1cblxuLmhhbmRzb250YWJsZSB0aC5hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0NDO1xufVxuLmhhbmRzb250YWJsZSB0aGVhZCB0aCAucmVsYXRpdmUge1xuICBwYWRkaW5nOiAycHggNHB4O1xufVxuXG4jaG90LWRpc3BsYXktbGljZW5zZS1pbmZvIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogIzMyMzIzMiA7XG4gIHBhZGRpbmc6IDVweCAwIDNweCAwO1xuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuI2hvdC1kaXNwbGF5LWxpY2Vuc2UtaW5mbyBhIHtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuXG4vKiBwbHVnaW5zICovXG5cbi8qIHJvdyArIGNvbHVtbiByZXNpemVyKi9cbi5oYW5kc29udGFibGUgLm1hbnVhbENvbHVtblJlc2l6ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICB6LWluZGV4OiAxMTA7XG4gIHdpZHRoOiA1cHg7XG4gIGhlaWdodDogMjVweDtcbn1cblxuLmhhbmRzb250YWJsZSAubWFudWFsUm93UmVzaXplciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgY3Vyc29yOiByb3ctcmVzaXplO1xuICB6LWluZGV4OiAxMTA7XG4gIGhlaWdodDogNXB4O1xuICB3aWR0aDogNTBweDtcbn1cblxuLmhhbmRzb250YWJsZSAubWFudWFsQ29sdW1uUmVzaXplcjpob3Zlcixcbi5oYW5kc29udGFibGUgLm1hbnVhbENvbHVtblJlc2l6ZXIuYWN0aXZlLFxuLmhhbmRzb250YWJsZSAubWFudWFsUm93UmVzaXplcjpob3Zlcixcbi5oYW5kc29udGFibGUgLm1hbnVhbFJvd1Jlc2l6ZXIuYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM0YTlkYjtcbn1cblxuLmhhbmRzb250YWJsZSAubWFudWFsQ29sdW1uUmVzaXplckd1aWRlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzRhOWRiO1xuICBkaXNwbGF5OiBub25lO1xuICB3aWR0aDogMDtcbiAgYm9yZGVyLXJpZ2h0OiAxcHggZGFzaGVkICM3Nzc7XG4gIG1hcmdpbi1sZWZ0OiA1cHg7XG59XG5cbi5oYW5kc29udGFibGUgLm1hbnVhbFJvd1Jlc2l6ZXJHdWlkZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzRhOWRiO1xuICBkaXNwbGF5OiBub25lO1xuICBoZWlnaHQ6IDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgIzc3NztcbiAgbWFyZ2luLXRvcDogNXB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5tYW51YWxDb2x1bW5SZXNpemVyR3VpZGUuYWN0aXZlLFxuLmhhbmRzb250YWJsZSAubWFudWFsUm93UmVzaXplckd1aWRlLmFjdGl2ZSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB6LWluZGV4OiAxOTk7XG59XG5cbi5oYW5kc29udGFibGUgLmNvbHVtblNvcnRpbmcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5oYW5kc29udGFibGUgLmNvbHVtblNvcnRpbmcuc29ydEFjdGlvbjpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGxpbmUtaGVpZ2h0OiAxLjE7XG59XG5cbi8qIEFycm93IHBvc2l0aW9uICovXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmc6OmJlZm9yZSB7XG4gIC8qIENlbnRlcmluZyBzdGFydCAqL1xuICB0b3A6IDUwJTtcbiAgbWFyZ2luLXRvcDogLTZweDsgLyogT25lIGV4dHJhIHBpeGVsIGZvciBwdXJwb3NlIG9mIHByb3BlciBwb3NpdGlvbmluZyBvZiBzb3J0aW5nIGFycm93LCB3aGVuIGBmb250LXNpemVgIHNldCB0byBkZWZhdWx0ICovXG4gIC8qIENlbnRlcmluZyBlbmQgKi9cblxuICBwYWRkaW5nLWxlZnQ6IDhweDsgLyogRm9yIHB1cnBvc2Ugb2YgY29udGludW91cyBtb3VzZSBvdmVyIGV4cGVyaWVuY2UsIHdoZW4gbW92aW5nIGJldHdlZW4gdGhlIGBzcGFuYCBhbmQgdGhlIGA6OmJlZm9yZWAgZWxlbWVudHMgKi9cbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogLTlweDtcblxuICBjb250ZW50OiAnJztcbiAgaGVpZ2h0OiAxMHB4O1xuICB3aWR0aDogNXB4O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogcmlnaHQ7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5hc2NlbmRpbmc6OmJlZm9yZSB7XG4gIC8qIGFycm93IHVwOyAyMCB4IDQwIHB4LCBzY2FsZWQgdG8gNSB4IDEwIHB4OyBiYXNlNjQgc2l6ZTogMC4za0IgKi9cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFvQ0FNQUFBREo3eXJwQUFBQUtsQk1WRVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUtFODZJQUFBQURYUlNUbE1BQkJFbVJHcHJsSlc3MmU3N3RUa1RLd0FBQUZOSlJFRlVlQUh0emprU2dDQVVCTkhQZ3NveTk3K3VsR1hScUpFNUwreGt4b1l0MlVkc0xiNWJxRklOeithTHV1TG41ckl1MlJrTzNmWnBXRU5pbU5naXc2aUJZUlRQTUxKakdGeFFaMWh4eGIveEJJMXFDOGszOUNkS0FBQUFBRWxGVGtTdVFtQ0NcIik7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5kZXNjZW5kaW5nOjpiZWZvcmUge1xuICAvKiBhcnJvdyBkb3duOyAyMCB4IDQwIHB4LCBzY2FsZWQgdG8gNSB4IDEwIHB4OyBiYXNlNjQgc2l6ZTogMC4za0IgKi9cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFvQ0FNQUFBREo3eXJwQUFBQUtsQk1WRVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUtFODZJQUFBQURYUlNUbE1BQkJFbVJHcHJsSlc3MmU3N3RUa1RLd0FBQUZKSlJFRlVlQUh0emprU2dDQVFSTkZtUVlVWjduOWRLVXZydTBUbXZQQW4zYnIwUWZnZFo1eHg2eCtyUW4yM0dxVFlucTFGRGNudXpaSU8yV21lZFZxSVJWeGdHS0V5ak5nWVJqS0drWjFoRklaM0k3MEx5TTBWdFU4QUFBQUFTVVZPUks1Q1lJST1cIik7XG59XG5cbi5odEdob3N0VGFibGUgLmh0Q29yZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nOm5vdCguaW5kaWNhdG9yRGlzYWJsZWQpOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcqJztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC8qIFRoZSBtdWx0aS1saW5lIGhlYWRlciBhbmQgaGVhZGVyIHdpdGggbG9uZ2VyIHRleHQgbmVlZCBtb3JlIHBhZGRpbmcgdG8gbm90IGhpZGUgYXJyb3csXG4gIHdlIG1ha2UgaGVhZGVyIHdpZGVyIGluIGBHaG9zdFRhYmxlYCB0byBtYWtlIHNvbWUgc3BhY2UgZm9yIGFycm93IHdoaWNoIGlzIHBvc2l0aW9uZWQgYWJzb2x1dGVseSBpbiB0aGUgbWFpbiB0YWJsZSAqL1xuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xufVxuXG4vKiBTZWxlY3Rpb24gKi9cbi5oYW5kc29udGFibGUgLnd0Qm9yZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBmb250LXNpemU6IDA7XG59XG4uaGFuZHNvbnRhYmxlIC53dEJvcmRlci5oaWRkZW57XG4gIGRpc3BsYXk6bm9uZSAhaW1wb3J0YW50O1xufVxuXG4vKiBBIGxheWVyIG9yZGVyIG9mIHRoZSBzZWxlY3Rpb24gdHlwZXMgKi9cbi5oYW5kc29udGFibGUgLnd0Qm9yZGVyLmN1cnJlbnQge1xuICB6LWluZGV4OiAxMDtcbn1cbi5oYW5kc29udGFibGUgLnd0Qm9yZGVyLmFyZWEge1xuICB6LWluZGV4OiA4O1xufVxuLmhhbmRzb250YWJsZSAud3RCb3JkZXIuZmlsbCB7XG4gIHotaW5kZXg6IDY7XG59XG5cbi5oYW5kc29udGFibGUgdGQuYXJlYSxcbi5oYW5kc29udGFibGUgdGQuYXJlYS0xLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTIsXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtMyxcbi5oYW5kc29udGFibGUgdGQuYXJlYS00LFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTUsXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtNixcbi5oYW5kc29udGFibGUgdGQuYXJlYS03IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWE6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTE6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTI6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTM6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTQ6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTU6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTY6YmVmb3JlLFxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTc6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBib3R0b206IC0xMDAlXFw5OyAvKiBGaXggZm9yIElFOSB0byBzcHJlYWQgdGhlIFwiOmJlZm9yZVwiIHBzZXVkbyBlbGVtZW50IHRvIDEwMCUgaGVpZ2h0IG9mIHRoZSBwYXJlbnQgZWxlbWVudCAqL1xuICBiYWNrZ3JvdW5kOiAjMDA1ZWZmO1xufVxuXG4vKiBGaXggZm9yIElFMTAgYW5kIElFMTEgdG8gc3ByZWFkIHRoZSBcIjpiZWZvcmVcIiBwc2V1ZG8gZWxlbWVudCB0byAxMDAlIGhlaWdodCBvZiB0aGUgcGFyZW50IGVsZW1lbnQgKi9cbkBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSB7XG4gIC5oYW5kc29udGFibGUgdGQuYXJlYTpiZWZvcmUsXG4gIC5oYW5kc29udGFibGUgdGQuYXJlYS0xOmJlZm9yZSxcbiAgLmhhbmRzb250YWJsZSB0ZC5hcmVhLTI6YmVmb3JlLFxuICAuaGFuZHNvbnRhYmxlIHRkLmFyZWEtMzpiZWZvcmUsXG4gIC5oYW5kc29udGFibGUgdGQuYXJlYS00OmJlZm9yZSxcbiAgLmhhbmRzb250YWJsZSB0ZC5hcmVhLTU6YmVmb3JlLFxuICAuaGFuZHNvbnRhYmxlIHRkLmFyZWEtNjpiZWZvcmUsXG4gIC5oYW5kc29udGFibGUgdGQuYXJlYS03OmJlZm9yZSB7XG4gICAgYm90dG9tOiAtMTAwJTtcbiAgfVxufVxuXG4uaGFuZHNvbnRhYmxlIHRkLmFyZWE6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC4xO1xufVxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTE6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC4yO1xufVxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTI6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC4yNztcbn1cbi5oYW5kc29udGFibGUgdGQuYXJlYS0zOmJlZm9yZSB7XG4gIG9wYWNpdHk6IDAuMzU7XG59XG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtNDpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjQxO1xufVxuLmhhbmRzb250YWJsZSB0ZC5hcmVhLTU6YmVmb3JlIHtcbiAgb3BhY2l0eTogMC40Nztcbn1cbi5oYW5kc29udGFibGUgdGQuYXJlYS02OmJlZm9yZSB7XG4gIG9wYWNpdHk6IDAuNTQ7XG59XG4uaGFuZHNvbnRhYmxlIHRkLmFyZWEtNzpiZWZvcmUge1xuICBvcGFjaXR5OiAwLjU4O1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRoLmh0X19oaWdobGlnaHQsXG4uaGFuZHNvbnRhYmxlIHRoZWFkIHRoLmh0X19oaWdobGlnaHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGNkY2RjO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRoLmh0X19hY3RpdmVfaGlnaGxpZ2h0LFxuLmhhbmRzb250YWJsZSB0aGVhZCB0aC5odF9fYWN0aXZlX2hpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM4ZWIwZTc7XG4gIGNvbG9yOiAjMDAwO1xufVxuXG4vKiBmaWxsIGhhbmRsZSAqL1xuXG4uaGFuZHNvbnRhYmxlIC53dEJvcmRlci5jb3JuZXIge1xuICBmb250LXNpemU6IDA7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odEJvcmRlci5odEZpbGxCb3JkZXIge1xuICBiYWNrZ3JvdW5kOiByZWQ7XG4gIHdpZHRoOiAxcHg7XG4gIGhlaWdodDogMXB4O1xufVxuXG4uaGFuZHNvbnRhYmxlSW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmUtd2lkdGg6IDA7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMXB4IDVweCAwIDVweDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGxpbmUtaGVpZ2h0OiAyMXB4O1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDJweCAjNTI5MkY3IGluc2V0O1xuICByZXNpemU6IG5vbmU7XG4gIC8qYmVsb3cgYXJlIG5lZWRlZCB0byBvdmVyd3JpdGUgc3R1ZmYgYWRkZWQgYnkgalF1ZXJ5IFVJIEJvb3RzdHJhcCB0aGVtZSovXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogIzAwMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgLypvdmVyd3JpdGUgc3R5bGVzIHBvdGVudGlvbmFsbHkgbWFkZSBieSBhIGZyYW1ld29yayovXG59XG5cbi5oYW5kc29udGFibGVJbnB1dEhvbGRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAxMDQ7XG59XG5cbi5odFNlbGVjdEVkaXRvciB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbWVudWxpc3QtYnV0dG9uICFpbXBvcnRhbnQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IGF1dG87XG59XG5cbi8qXG5UZXh0UmVuZGVyZXIgcmVhZE9ubHkgY2VsbFxuKi9cblxuLmhhbmRzb250YWJsZSAuaHREaW1tZWQge1xuICBjb2xvcjogIzc3Nztcbn1cblxuLmhhbmRzb250YWJsZSAuaHRTdWJtZW51IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFN1Ym1lbnUgOmFmdGVye1xuICBjb250ZW50OiAnXFwyNUI2JztcbiAgY29sb3I6ICM3Nzc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDVweDtcbiAgZm9udC1zaXplOiA5cHg7XG59XG5cblxuLypcblRleHRSZW5kZXJlciBob3Jpem9udGFsIGFsaWdubWVudFxuKi9cbi5oYW5kc29udGFibGUgLmh0TGVmdHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5oYW5kc29udGFibGUgLmh0Q2VudGVye1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaGFuZHNvbnRhYmxlIC5odFJpZ2h0e1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbi5oYW5kc29udGFibGUgLmh0SnVzdGlmeXtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbn1cbi8qXG5UZXh0UmVuZGVyZXIgdmVydGljYWwgYWxpZ25tZW50XG4qL1xuLmhhbmRzb250YWJsZSAuaHRUb3B7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG59XG4uaGFuZHNvbnRhYmxlIC5odE1pZGRsZXtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cbi5oYW5kc29udGFibGUgLmh0Qm90dG9te1xuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xufVxuXG4vKlxuVGV4dFJlbmRlcmVyIHBsYWNlaG9sZGVyIHZhbHVlXG4qL1xuXG4uaGFuZHNvbnRhYmxlIC5odFBsYWNlaG9sZGVyIHtcbiAgY29sb3I6ICM5OTk7XG59XG5cbi8qXG5BdXRvY29tcGxldGVSZW5kZXJlciBkb3duIGFycm93XG4qL1xuXG4uaGFuZHNvbnRhYmxlIC5odEF1dG9jb21wbGV0ZUFycm93IHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGNvbG9yOiAjRUVFO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG4gIHdpZHRoOiAxNnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5oYW5kc29udGFibGUgdGQgLmh0QXV0b2NvbXBsZXRlQXJyb3c6aG92ZXIge1xuICBjb2xvcjogIzc3Nztcbn1cblxuLmhhbmRzb250YWJsZSB0ZC5hcmVhIC5odEF1dG9jb21wbGV0ZUFycm93IHtcbiAgY29sb3I6ICNkM2QzZDM7XG59XG5cbi8qXG5DaGVja2JveFJlbmRlcmVyXG4qL1xuLmhhbmRzb250YWJsZSAuaHRDaGVja2JveFJlbmRlcmVySW5wdXQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG4uaGFuZHNvbnRhYmxlIC5odENoZWNrYm94UmVuZGVyZXJJbnB1dC5ub1ZhbHVlIHtcbiAgb3BhY2l0eTogMC41O1xufVxuLmhhbmRzb250YWJsZSAuaHRDaGVja2JveFJlbmRlcmVyTGFiZWwge1xuICBmb250LXNpemU6IGluaGVyaXQ7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLyoqXG4gKiBIYW5kc29udGFibGUgaW4gSGFuZHNvbnRhYmxlXG4gKi9cblxuLmhhbmRzb250YWJsZSAuaGFuZHNvbnRhYmxlLmh0X2Nsb25lX3RvcCAud3RIaWRlciB7XG4gIHBhZGRpbmc6IDAgMCA1cHggMDtcbn1cblxuLyoqXG4qIEF1dG9jb21wbGV0ZSBFZGl0b3JcbiovXG4uaGFuZHNvbnRhYmxlIC5hdXRvY29tcGxldGVFZGl0b3IuaGFuZHNvbnRhYmxlIHtcbiAgcGFkZGluZy1yaWdodDogMTdweDtcbn1cbi5oYW5kc29udGFibGUgLmF1dG9jb21wbGV0ZUVkaXRvci5oYW5kc29udGFibGUuaHRNYWNTY3JvbGwge1xuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xufVxuXG5cbi8qKlxuICogSGFuZHNvbnRhYmxlIGxpc3Rib3ggdGhlbWVcbiAqL1xuXG4uaGFuZHNvbnRhYmxlLmxpc3Rib3gge1xuICBtYXJnaW46IDA7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCAuaHRfbWFzdGVyIHRhYmxlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCB0aCxcbi5oYW5kc29udGFibGUubGlzdGJveCB0cjpmaXJzdC1jaGlsZCB0aCxcbi5oYW5kc29udGFibGUubGlzdGJveCB0cjpsYXN0LWNoaWxkIHRoLFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRyOmZpcnN0LWNoaWxkIHRkLFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRkIHtcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRoLFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRkIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCB0ZC5odERpbW1lZCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQtc3R5bGU6IGluaGVyaXQ7XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCAud3RCb3JkZXIge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi5oYW5kc29udGFibGUubGlzdGJveCB0ciB0ZC5jdXJyZW50LFxuLmhhbmRzb250YWJsZS5saXN0Ym94IHRyOmhvdmVyIHRkIHtcbiAgYmFja2dyb3VuZDogI2VlZTtcbn1cblxuLmh0X2Nsb25lX3RvcCB7XG4gIHotaW5kZXg6IDEwMTtcbn1cblxuLmh0X2Nsb25lX2xlZnQge1xuICB6LWluZGV4OiAxMDI7XG59XG5cbi5odF9jbG9uZV90b3BfbGVmdF9jb3JuZXIsXG4uaHRfY2xvbmVfYm90dG9tX2xlZnRfY29ybmVyIHtcbiAgei1pbmRleDogMTAzO1xufVxuXG4uaHRfY2xvbmVfZGVidWcge1xuICB6LWluZGV4OiAxMDM7XG59XG5cbi5oYW5kc29udGFibGUgdGQuaHRTZWFyY2hSZXN1bHQge1xuICBiYWNrZ3JvdW5kOiAjZmNlZGQ5O1xuICBjb2xvcjogIzU4MzcwNztcbn1cblxuLypcbkNlbGwgYm9yZGVyc1xuKi9cbi5odEJvcmRlcmVke1xuICAvKmJveC1zaXppbmc6IGJvcmRlci1ib3ggIWltcG9ydGFudDsqL1xuICBib3JkZXItd2lkdGg6IDFweDtcbn1cbi5odEJvcmRlcmVkLmh0VG9wQm9yZGVyU29saWQge1xuICBib3JkZXItdG9wLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLXRvcC1jb2xvcjogIzAwMDtcbn1cbi5odEJvcmRlcmVkLmh0UmlnaHRCb3JkZXJTb2xpZCB7XG4gIGJvcmRlci1yaWdodC1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1yaWdodC1jb2xvcjogIzAwMDtcbn1cbi5odEJvcmRlcmVkLmh0Qm90dG9tQm9yZGVyU29saWQge1xuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzAwMDtcbn1cbi5odEJvcmRlcmVkLmh0TGVmdEJvcmRlclNvbGlkIHtcbiAgYm9yZGVyLWxlZnQtc3R5bGU6IHNvbGlkO1xuICBib3JkZXItbGVmdC1jb2xvcjogIzAwMDtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ciB0aDpudGgtbGFzdC1jaGlsZCgyKSB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDQ0M7XG59XG5cbi5oYW5kc29udGFibGUgdGhlYWQgdHI6bnRoLWxhc3QtY2hpbGQoMikgdGguaHRHcm91cEluZGljYXRvckNvbnRhaW5lciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQ0NDO1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuXG5cbi5odF9jbG9uZV90b3BfbGVmdF9jb3JuZXIgdGhlYWQgdHIgdGg6bnRoLWxhc3QtY2hpbGQoMikge1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4uaHRDb2xsYXBzZUJ1dHRvbiB7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGxpbmUtaGVpZ2h0OiAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2YzZjNmMztcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG4gIGJveC1zaGFkb3c6IDFweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tYm90dG9tOiAzcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmh0Q29sbGFwc2VCdXR0b246YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBoZWlnaHQ6IDMwMCU7XG4gIHdpZHRoOiAxcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kOiAjY2NjO1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIC8qdG9wOiAtMzAwJTsqL1xuICBib3R0b206IDEwcHg7XG59XG5cblxudGhlYWQgLmh0Q29sbGFwc2VCdXR0b24ge1xuICByaWdodDogNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xufVxuXG50aGVhZCAuaHRDb2xsYXBzZUJ1dHRvbjphZnRlciB7XG4gIGhlaWdodDogMXB4O1xuICB3aWR0aDogNzAwJTtcbiAgcmlnaHQ6IDEwcHg7XG4gIHRvcDogNHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIHRyIHRoIC5odEV4cGFuZEJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwcHg7XG4gIGhlaWdodDogMTBweDtcbiAgbGluZS1oZWlnaHQ6IDEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZjNmM2YzO1xuICAtd2Via2l0LWJveC1zaGFkb3c6IDFweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRvcDogMDtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmhhbmRzb250YWJsZSB0aGVhZCB0ciB0aCAuaHRFeHBhbmRCdXR0b24ge1xuICAvKmxlZnQ6IDVweDsqL1xuICB0b3A6IDVweDtcbn1cblxuLmhhbmRzb250YWJsZSB0ciB0aCAuaHRFeHBhbmRCdXR0b24uY2xpY2thYmxlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5jb2xsYXBzaWJsZUluZGljYXRvciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAlICwtNTAlKTtcbiAgcmlnaHQ6IDVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI0E2QTZBNjtcbiAgbGluZS1oZWlnaHQ6IDEwcHg7XG4gIGNvbG9yOiAjMjIyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIHdpZHRoOiAxMHB4O1xuICBoZWlnaHQ6IDEwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMCA2cHggcmdiYSgyMzgsMjM4LDIzOCwxKTtcbiAgLW1vei1ib3gtc2hhZG93OiAwIDAgMCA2cHggcmdiYSgyMzgsMjM4LDIzOCwxKTtcbiAgYm94LXNoYWRvdzogMCAwIDAgNnB4IHJnYmEoMjM4LDIzOCwyMzgsMSk7XG4gIGJhY2tncm91bmQ6ICNlZWU7XG59XG5cbi5oYW5kc29udGFibGUgY29sLmhpZGRlbiB7XG4gIHdpZHRoOiAwICFpbXBvcnRhbnQ7XG59XG5cbi5oYW5kc29udGFibGUgdGFibGUgdHIgdGgubGlnaHRSaWdodEJvcmRlciB7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNFNkU2RTY7XG59XG5cbi5oYW5kc29udGFibGUgdHIuaGlkZGVuLFxuLmhhbmRzb250YWJsZSB0ci5oaWRkZW4gdGQsXG4uaGFuZHNvbnRhYmxlIHRyLmhpZGRlbiB0aCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5odF9tYXN0ZXIsXG4uaHRfY2xvbmVfbGVmdCxcbi5odF9jbG9uZV90b3AsXG4uaHRfY2xvbmVfYm90dG9tIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLmhhbmRzb250YWJsZSAuaHRfbWFzdGVyIHRoZWFkLFxuLmhhbmRzb250YWJsZSAuaHRfbWFzdGVyIHRyIHRoLFxuLmhhbmRzb250YWJsZSAuaHRfY2xvbmVfbGVmdCB0aGVhZCB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmh0X2Nsb25lX3RvcCAud3RIb2xkZXIsXG4uaHRfY2xvbmVfbGVmdCAud3RIb2xkZXIsXG4uaHRfY2xvbmVfYm90dG9tIC53dEhvbGRlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi8qXG5cbiBIYW5kc29udGFibGUgTW9iaWxlIFRleHQgRWRpdG9yIHN0eWxlc2hlZXRcblxuICovXG5cbi5oYW5kc29udGFibGUubW9iaWxlLFxuLmhhbmRzb250YWJsZS5tb2JpbGUgLnd0SG9sZGVyIHtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0Om5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6bm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0Om5vbmU7XG4gIHVzZXItc2VsZWN0Om5vbmU7XG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjpyZ2JhKDAsMCwwLDApO1xuICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICB3aWR0aDogNzAlO1xuICBoZWlnaHQ6IDU0cHQ7XG4gIGJhY2tncm91bmQ6ICNmOGY4Zjg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlYmViZWI7XG4gIHotaW5kZXg6IDk5OTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XG59XG5cbi50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlOm5vdCguaHRfbWFzdGVyIC50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlKSxcbi50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlLUhpdEFyZWE6bm90KC5odF9tYXN0ZXIgLnRvcExlZnRTZWxlY3Rpb25IYW5kbGUtSGl0QXJlYSkge1xuICB6LWluZGV4OiA5OTk5O1xufVxuXG4vKiBJbml0aWFsIGxlZnQvdG9wIGNvb3JkaW5hdGVzIC0gb3ZlcndyaXR0ZW4gd2hlbiBhY3R1YWwgcG9zaXRpb24gaXMgc2V0ICovXG4udG9wTGVmdFNlbGVjdGlvbkhhbmRsZSxcbi50b3BMZWZ0U2VsZWN0aW9uSGFuZGxlLUhpdEFyZWEsXG4uYm90dG9tUmlnaHRTZWxlY3Rpb25IYW5kbGUsXG4uYm90dG9tUmlnaHRTZWxlY3Rpb25IYW5kbGUtSGl0QXJlYSB7XG4gIGxlZnQ6IC0xMDAwMHB4O1xuICB0b3A6IC0xMDAwMHB4O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIuYWN0aXZlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAuaW5wdXRzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMjEwcHQ7XG4gIGJvdHRvbTogMTBwdDtcbiAgdG9wOiAxMHB0O1xuICBsZWZ0OiAxNHB4O1xuICBoZWlnaHQ6IDM0cHQ7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAuaW5wdXRzIHRleHRhcmVhIHtcbiAgZm9udC1zaXplOiAxM3B0O1xuICBib3JkZXI6IDFweCBzb2xpZCAjYTFhMWExO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xuICBib3gtc2hhZG93OiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDE0cHg7XG4gIHJpZ2h0OiAxNHB4O1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgcGFkZGluZzogN3B0O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLmNlbGxQb2ludGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC0xM3B0O1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xuICBsZWZ0OiAzMHB4O1xuXG4gIGJvcmRlci1sZWZ0OiAxM3B0IHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDEzcHQgc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1ib3R0b206IDEzcHQgc29saWQgI2ViZWJlYjtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5jZWxsUG9pbnRlci5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLmNlbGxQb2ludGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDJweDtcbiAgaGVpZ2h0OiAwO1xuICB3aWR0aDogMDtcbiAgbGVmdDogLTEzcHQ7XG5cbiAgYm9yZGVyLWxlZnQ6IDEzcHQgc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yaWdodDogMTNwdCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWJvdHRvbTogMTNwdCBzb2xpZCAjZjhmOGY4O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLm1vdmVIYW5kbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTBwdDtcbiAgbGVmdDogNXB4O1xuICB3aWR0aDogMzBweDtcbiAgYm90dG9tOiAwcHg7XG4gIGN1cnNvcjogbW92ZTtcbiAgei1pbmRleDogOTk5OTtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5tb3ZlSGFuZGxlOmFmdGVyIHtcbiAgY29udGVudDogXCIuLlxcYS4uXFxhLi5cXGEuLlwiO1xuICB3aGl0ZS1zcGFjZTogcHJlO1xuICBsaW5lLWhlaWdodDogMTBweDtcbiAgZm9udC1zaXplOiAyMHB0O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi10b3A6IC04cHg7XG4gIGNvbG9yOiAjZWJlYmViO1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnBvc2l0aW9uQ29udHJvbHMge1xuICB3aWR0aDogMjA1cHQ7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDVwdDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAucG9zaXRpb25Db250cm9scyA+IGRpdiB7XG4gIHdpZHRoOiA1MHB0O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZsb2F0OiBsZWZ0O1xufVxuXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnBvc2l0aW9uQ29udHJvbHMgPiBkaXY6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxNXB0O1xuICBoZWlnaHQ6IDE1cHQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDUwcHQ7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAubGVmdEJ1dHRvbjphZnRlcixcbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAucmlnaHRCdXR0b246YWZ0ZXIsXG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnVwQnV0dG9uOmFmdGVyLFxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5kb3duQnV0dG9uOmFmdGVyIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogNXB0IDVwdDtcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1cHQgNXB0O1xuICBtYXJnaW46IDIxcHQgMCAwIDIxcHQ7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAubGVmdEJ1dHRvbjphZnRlciB7XG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjMjg4ZmZlO1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkICMyODhmZmU7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgLyptYXJnaW4tdG9wOiAxN3B0OyovXG4gIC8qbWFyZ2luLWxlZnQ6IDIwcHQ7Ki9cbn1cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAubGVmdEJ1dHRvbjphY3RpdmU6YWZ0ZXIge1xuICBib3JkZXItY29sb3I6ICNjZmNmY2Y7XG59XG5cbi5odE1vYmlsZUVkaXRvckNvbnRhaW5lciAucmlnaHRCdXR0b246YWZ0ZXIge1xuICBib3JkZXItdG9wOiAycHggc29saWQgIzI4OGZmZTtcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjMjg4ZmZlO1xuICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEzNWRlZyk7XG4gIC8qbWFyZ2luLXRvcDogMTdwdDsqL1xuICAvKm1hcmdpbi1sZWZ0OiAxMHB0OyovXG59XG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnJpZ2h0QnV0dG9uOmFjdGl2ZTphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI2NmY2ZjZjtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC51cEJ1dHRvbjphZnRlciB7XG4gIC8qYm9yZGVyLXRvcDogMnB4IHNvbGlkICNjZmNmY2Y7Ki9cbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICMyODhmZmU7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzI4OGZmZTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gIC8qbWFyZ2luLXRvcDogMjJwdDsqL1xuICAvKm1hcmdpbi1sZWZ0OiAxNXB0OyovXG59XG4uaHRNb2JpbGVFZGl0b3JDb250YWluZXIgLnVwQnV0dG9uOmFjdGl2ZTphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI2NmY2ZjZjtcbn1cblxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5kb3duQnV0dG9uOmFmdGVyIHtcbiAgYm9yZGVyLXRvcDogMnB4IHNvbGlkICMyODhmZmU7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzI4OGZmZTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgyMjVkZWcpO1xuICAvKm1hcmdpbi10b3A6IDE1cHQ7Ki9cbiAgLyptYXJnaW4tbGVmdDogMTVwdDsqL1xufVxuLmh0TW9iaWxlRWRpdG9yQ29udGFpbmVyIC5kb3duQnV0dG9uOmFjdGl2ZTphZnRlciB7XG4gIGJvcmRlci1jb2xvcjogI2NmY2ZjZjtcbn1cblxuLmhhbmRzb250YWJsZS5oaWRlLXR3ZWVuIHtcbiAgLXdlYmtpdC1hbmltYXRpb246IG9wYWNpdHktaGlkZSAwLjNzO1xuICBhbmltYXRpb246IG9wYWNpdHktaGlkZSAwLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbn1cblxuLmhhbmRzb250YWJsZS5zaG93LXR3ZWVuIHtcbiAgLXdlYmtpdC1hbmltYXRpb246IG9wYWNpdHktc2hvdyAwLjNzO1xuICBhbmltYXRpb246IG9wYWNpdHktc2hvdyAwLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgLXdlYmtpdC1hbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbn1cblxuQGNoYXJzZXQgXCJVVEYtOFwiO1xuXG4vKiFcbiAqIFBpa2FkYXlcbiAqIENvcHlyaWdodCDCqSAyMDE0IERhdmlkIEJ1c2hlbGwgfCBCU0QgJiBNSVQgbGljZW5zZSB8IGh0dHA6Ly9kYnVzaGVsbC5jb20vXG4gKi9cblxuLnBpa2Etc2luZ2xlIHtcbiAgICB6LWluZGV4OiA5OTk5O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBjb2xvcjogIzMzMztcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI2JiYjtcbiAgICBmb250LWZhbWlseTogXCJIZWx2ZXRpY2EgTmV1ZVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xufVxuXG4vKlxuY2xlYXIgY2hpbGQgZmxvYXQgKHBpa2EtbGVuZGFyKSwgdXNpbmcgdGhlIGZhbW91cyBtaWNybyBjbGVhcmZpeCBoYWNrXG5odHRwOi8vbmljb2xhc2dhbGxhZ2hlci5jb20vbWljcm8tY2xlYXJmaXgtaGFjay9cbiovXG4ucGlrYS1zaW5nbGU6YmVmb3JlLFxuLnBpa2Etc2luZ2xlOmFmdGVyIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiB0YWJsZTtcbn1cbi5waWthLXNpbmdsZTphZnRlciB7IGNsZWFyOiBib3RoIH1cbi5waWthLXNpbmdsZSB7ICp6b29tOiAxIH1cblxuLnBpa2Etc2luZ2xlLmlzLWhpZGRlbiB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLnBpa2Etc2luZ2xlLmlzLWJvdW5kIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm94LXNoYWRvdzogMCA1cHggMTVweCAtNXB4IHJnYmEoMCwwLDAsLjUpO1xufVxuXG4ucGlrYS1sZW5kYXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIHdpZHRoOiAyNDBweDtcbiAgICBtYXJnaW46IDhweDtcbn1cblxuLnBpa2EtdGl0bGUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5waWthLWxhYmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgKmRpc3BsYXk6IGlubGluZTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogOTk5OTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiA1cHggM3B4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuLnBpa2EtdGl0bGUgc2VsZWN0IHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDk5OTg7XG4gICAgbWFyZ2luOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiA1cHg7XG4gICAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTApO1xuICAgIG9wYWNpdHk6IDA7XG59XG5cbi5waWthLXByZXYsXG4ucGlrYS1uZXh0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIC8qIGhpZGUgdGV4dCB1c2luZyB0ZXh0LWluZGVudCB0cmljaywgdXNpbmcgd2lkdGggdmFsdWUgKGl0J3MgZW5vdWdoKSAqL1xuICAgIHRleHQtaW5kZW50OiAyMHB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiA3NSUgNzUlO1xuICAgIG9wYWNpdHk6IC41O1xuICAgICpwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgKnRvcDogMDtcbn1cblxuLnBpa2EtcHJldjpob3Zlcixcbi5waWthLW5leHQ6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG59XG5cbi5waWthLXByZXYsXG4uaXMtcnRsIC5waWthLW5leHQge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFlQ0FZQUFBQXNFajVyQUFBQVVrbEVRVlI0MnUzVk1Rb0FJQkFEUWY4UGdqK09EOWhHMkN0T05KQjJ5bVFrS2UwSGJ3QVAweHVjRGlRV0FSSVRJREVCRW5NZ01ROFM4K0FxQklsNmtLZ0hpWHFRcUFlSmVwQm8vejM4Si9VMHVBSGxhQmtCbDlJNEd3QUFBQUJKUlU1RXJrSmdnZz09Jyk7XG4gICAgKmxlZnQ6IDA7XG59XG5cbi5waWthLW5leHQsXG4uaXMtcnRsIC5waWthLXByZXYge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQlFBQUFBZUNBWUFBQUFzRWo1ckFBQUFVMGxFUVZSNDJ1M1ZPd29BTUFnRTBkd2ZBbk5qVTI2YllrQkNGR3dmaUw5VlZXb08rQko0R2YzZ3RzRUtLb0ZCTlRDb0NBWVZ3YUFpR05RR01VSE1rakdiZ2prMm1JT051WG8wbkM4WG5DZjFKWGdBclZJWkFRaDVUS1lBQUFBQVNVVk9SSzVDWUlJPScpO1xuICAgICpyaWdodDogMDtcbn1cblxuLnBpa2EtcHJldi5pcy1kaXNhYmxlZCxcbi5waWthLW5leHQuaXMtZGlzYWJsZWQge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBvcGFjaXR5OiAuMjtcbn1cblxuLnBpa2Etc2VsZWN0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgKmRpc3BsYXk6IGlubGluZTtcbn1cblxuLnBpa2EtdGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XG4gICAgYm9yZGVyOiAwO1xufVxuXG4ucGlrYS10YWJsZSB0aCxcbi5waWthLXRhYmxlIHRkIHtcbiAgICB3aWR0aDogMTQuMjg1NzE0Mjg1NzE0Mjg2JTtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4ucGlrYS10YWJsZSB0aCB7XG4gICAgY29sb3I6ICM5OTk7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnBpa2EtYnV0dG9uIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXI6IDA7XG4gICAgbWFyZ2luOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDVweDtcbiAgICBjb2xvcjogIzY2NjtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbGluZS1oZWlnaHQ6IDE1cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbn1cblxuLnBpa2Etd2VlayB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGNvbG9yOiAjOTk5O1xufVxuXG4uaXMtdG9kYXkgLnBpa2EtYnV0dG9uIHtcbiAgICBjb2xvcjogIzMzYWFmZjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmlzLXNlbGVjdGVkIC5waWthLWJ1dHRvbiB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYmFja2dyb3VuZDogIzMzYWFmZjtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAzcHggIzE3OGZlNTtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG59XG5cbi5pcy1pbnJhbmdlIC5waWthLWJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogI0Q1RTlGNztcbn1cblxuLmlzLXN0YXJ0cmFuZ2UgLnBpa2EtYnV0dG9uIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjNkNCMzFEO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4uaXMtZW5kcmFuZ2UgLnBpa2EtYnV0dG9uIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjMzNhYWZmO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4uaXMtZGlzYWJsZWQgLnBpa2EtYnV0dG9uLFxuLmlzLW91dHNpZGUtY3VycmVudC1tb250aCAucGlrYS1idXR0b24ge1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBjb2xvcjogIzk5OTtcbiAgICBvcGFjaXR5OiAuMztcbn1cblxuLnBpa2EtYnV0dG9uOmhvdmVyIHtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kOiAjZmY4MDAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xufVxuXG4vKiBzdHlsaW5nIGZvciBhYmJyICovXG4ucGlrYS10YWJsZSBhYmJyIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIGN1cnNvcjogaGVscDtcbn1cblxuXG4uaHRDb21tZW50Q2VsbCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uaHRDb21tZW50Q2VsbDphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci10b3A6IDZweCBzb2xpZCBibGFjaztcbn1cblxuLmh0Q29tbWVudHMge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgei1pbmRleDogMTA1OTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5odENvbW1lbnRUZXh0QXJlYSB7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjExNzY0NykgMCAxcHggM3B4LCByZ2JhKDAsIDAsIDAsIDAuMjM5MjE2KSAwIDFweCAycHg7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICNjY2M7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICB3aWR0aDogMjE1cHg7XG4gICAgaGVpZ2h0OiA5MHB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgb3V0bGluZTogMHB4ICFpbXBvcnRhbnQ7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4uaHRDb21tZW50VGV4dEFyZWE6Zm9jdXMge1xuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xMTc2NDcpIDAgMXB4IDNweCwgcmdiYSgwLCAwLCAwLCAwLjIzOTIxNikgMCAxcHggMnB4LCBpbnNldCAwIDAgMCAxcHggIzUyOTJmNztcbiAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkICM1MjkyZjc7XG59XG5cbi8qIVxuICogSGFuZHNvbnRhYmxlIENvbnRleHRNZW51XG4gKi9cblxuLmh0Q29udGV4dE1lbnU6bm90KC5odEdob3N0VGFibGUpIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDYwOyAvKiBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxMDUwIC0gei1pbmRleCBmb3IgVHdpdHRlciBCb290c3RyYXAgbW9kYWwgKCMxNTY5KSAqL1xufVxuXG4uaHRDb250ZXh0TWVudSAuaHRfY2xvbmVfdG9wLFxuLmh0Q29udGV4dE1lbnUgLmh0X2Nsb25lX2xlZnQsXG4uaHRDb250ZXh0TWVudSAuaHRfY2xvbmVfY29ybmVyLFxuLmh0Q29udGV4dE1lbnUgLmh0X2Nsb25lX2RlYnVnIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUuaHRDb3JlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDJweDtcbn1cblxuLmh0Q29udGV4dE1lbnUgLnd0Qm9yZGVyIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZCB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItd2lkdGg6IDA7XG4gIHBhZGRpbmc6IDRweCA2cHggMCA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5odENvbnRleHRNZW51IHRhYmxlIHRib2R5IHRyIHRkOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyOiAwO1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpbW1lZCB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgY29sb3I6ICMzMjMyMzI7XG59XG5cbi5odENvbnRleHRNZW51IHRhYmxlIHRib2R5IHRyIHRkLmN1cnJlbnQsXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZC56ZXJvY2xpcGJvYXJkLWlzLWhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2YzZjNmMztcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUgdGJvZHkgdHIgdGQuaHRTZXBhcmF0b3Ige1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcbiAgaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5odENvbnRleHRNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0RGlzYWJsZWQge1xuICBjb2xvcjogIzk5OTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpc2FibGVkOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM5OTk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUgdGJvZHkgdHIuaHRIaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHRDb250ZXh0TWVudSB0YWJsZSB0Ym9keSB0ciB0ZCAuaHRJdGVtV3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDZweDtcbn1cblxuLmh0Q29udGV4dE1lbnUgdGFibGUgdGJvZHkgdHIgdGQgZGl2IHNwYW4uc2VsZWN0ZWQge1xuICBtYXJnaW4tdG9wOiAtMnB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDRweDtcbn1cblxuLmh0Q29udGV4dE1lbnUgLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG50ZXh0YXJlYSNIYW5kc29udGFibGVDb3B5UGFzdGUge1xuICBwb3NpdGlvbjogZml4ZWQgIWltcG9ydGFudDtcbiAgdG9wOiAwICFpbXBvcnRhbnQ7XG4gIHJpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG9wYWNpdHk6IDA7XG4gIG91dGxpbmU6IDAgbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uaHRSb3dIZWFkZXJzIC5odF9tYXN0ZXIuaW5uZXJCb3JkZXJMZWZ0IH4gLmh0X2Nsb25lX3RvcF9sZWZ0X2Nvcm5lciB0aDpudGgtY2hpbGQoMiksXG4uaHRSb3dIZWFkZXJzIC5odF9tYXN0ZXIuaW5uZXJCb3JkZXJMZWZ0IH4gLmh0X2Nsb25lX2xlZnQgdGQ6Zmlyc3Qtb2YtdHlwZSB7XG4gIGJvcmRlci1sZWZ0OiAwIG5vbmU7XG59XG5cbi5oYW5kc29udGFibGUgLnd0SGlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxDb2x1bW5Nb3ZlLmFmdGVyLXNlbGVjdGlvbi0tY29sdW1ucyB0aGVhZCB0aC5odF9faGlnaGxpZ2h0IHtcbiAgY3Vyc29yOiBtb3ZlO1xuICBjdXJzb3I6IC1tb3otZ3JhYjtcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XG4gIGN1cnNvcjogZ3JhYjtcbn1cbi5oYW5kc29udGFibGUuaHRfX21hbnVhbENvbHVtbk1vdmUub24tbW92aW5nLS1jb2x1bW5zLFxuLmhhbmRzb250YWJsZS5odF9fbWFudWFsQ29sdW1uTW92ZS5vbi1tb3ZpbmctLWNvbHVtbnMgdGhlYWQgdGguaHRfX2hpZ2hsaWdodCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxDb2x1bW5Nb3ZlLm9uLW1vdmluZy0tY29sdW1ucyAubWFudWFsQ29sdW1uUmVzaXplciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uaGFuZHNvbnRhYmxlIC5odF9fbWFudWFsQ29sdW1uTW92ZS0tZ3VpZGVsaW5lLFxuLmhhbmRzb250YWJsZSAuaHRfX21hbnVhbENvbHVtbk1vdmUtLWJhY2tsaWdodCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBub25lO1xufVxuLmhhbmRzb250YWJsZSAuaHRfX21hbnVhbENvbHVtbk1vdmUtLWd1aWRlbGluZSB7XG4gIGJhY2tncm91bmQ6ICM3NTc1NzU7XG4gIHdpZHRoOiAycHg7XG4gIHRvcDogMDtcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XG4gIHotaW5kZXg6IDEwNTtcbn1cbi5oYW5kc29udGFibGUgLmh0X19tYW51YWxDb2x1bW5Nb3ZlLS1iYWNrbGlnaHQge1xuICBiYWNrZ3JvdW5kOiAjMzQzNDM0O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDUyLCA1MiwgNTIsIDAuMjUpO1xuICBkaXNwbGF5OiBub25lO1xuICB6LWluZGV4OiAxMDU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmhhbmRzb250YWJsZS5vbi1tb3ZpbmctLWNvbHVtbnMuc2hvdy11aSAuaHRfX21hbnVhbENvbHVtbk1vdmUtLWd1aWRlbGluZSxcbi5oYW5kc29udGFibGUub24tbW92aW5nLS1jb2x1bW5zIC5odF9fbWFudWFsQ29sdW1uTW92ZS0tYmFja2xpZ2h0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgLnd0SGlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxSb3dNb3ZlLmFmdGVyLXNlbGVjdGlvbi0tcm93cyB0Ym9keSB0aC5odF9faGlnaGxpZ2h0IHtcbiAgY3Vyc29yOiBtb3ZlO1xuICBjdXJzb3I6IC1tb3otZ3JhYjtcbiAgY3Vyc29yOiAtd2Via2l0LWdyYWI7XG4gIGN1cnNvcjogZ3JhYjtcbn1cbi5oYW5kc29udGFibGUuaHRfX21hbnVhbFJvd01vdmUub24tbW92aW5nLS1yb3dzLFxuLmhhbmRzb250YWJsZS5odF9fbWFudWFsUm93TW92ZS5vbi1tb3ZpbmctLXJvd3MgdGJvZHkgdGguaHRfX2hpZ2hsaWdodCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgY3Vyc29yOiAtbW96LWdyYWJiaW5nO1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19tYW51YWxSb3dNb3ZlLm9uLW1vdmluZy0tcm93cyAubWFudWFsUm93UmVzaXplciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uaGFuZHNvbnRhYmxlIC5odF9fbWFudWFsUm93TW92ZS0tZ3VpZGVsaW5lLFxuLmhhbmRzb250YWJsZSAuaHRfX21hbnVhbFJvd01vdmUtLWJhY2tsaWdodCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uaGFuZHNvbnRhYmxlIC5odF9fbWFudWFsUm93TW92ZS0tZ3VpZGVsaW5lIHtcbiAgYmFja2dyb3VuZDogIzc1NzU3NTtcbiAgaGVpZ2h0OiAycHg7XG4gIGxlZnQ6IDA7XG4gIG1hcmdpbi10b3A6IC0xcHg7XG4gIHotaW5kZXg6IDEwNTtcbn1cbi5oYW5kc29udGFibGUgLmh0X19tYW51YWxSb3dNb3ZlLS1iYWNrbGlnaHQge1xuICBiYWNrZ3JvdW5kOiAjMzQzNDM0O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDUyLCA1MiwgNTIsIDAuMjUpO1xuICBkaXNwbGF5OiBub25lO1xuICB6LWluZGV4OiAxMDU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmhhbmRzb250YWJsZS5vbi1tb3ZpbmctLXJvd3Muc2hvdy11aSAuaHRfX21hbnVhbFJvd01vdmUtLWd1aWRlbGluZSxcbi5oYW5kc29udGFibGUub24tbW92aW5nLS1yb3dzIC5odF9fbWFudWFsUm93TW92ZS0tYmFja2xpZ2h0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgdGJvZHkgdGRbcm93c3Bhbl1bY2xhc3MqPVwiYXJlYVwiXVtjbGFzcyo9XCJoaWdobGlnaHRcIl06bm90KFtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbFwiXSk6YmVmb3JlIHtcbiAgICBvcGFjaXR5OiAwO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRkW3Jvd3NwYW5dW2NsYXNzKj1cImFyZWFcIl1bY2xhc3MqPVwiaGlnaGxpZ2h0XCJdW2NsYXNzKj1cImZ1bGx5U2VsZWN0ZWRNZXJnZWRDZWxsLW11bHRpcGxlXCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC4xO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRib2R5IHRkW3Jvd3NwYW5dW2NsYXNzKj1cImFyZWFcIl1bY2xhc3MqPVwiaGlnaGxpZ2h0XCJdW2NsYXNzKj1cImZ1bGx5U2VsZWN0ZWRNZXJnZWRDZWxsLTBcIl06YmVmb3JlIHtcbiAgICBvcGFjaXR5OiAwLjE7XG59XG5cbi5oYW5kc29udGFibGUgdGJvZHkgdGRbcm93c3Bhbl1bY2xhc3MqPVwiYXJlYVwiXVtjbGFzcyo9XCJoaWdobGlnaHRcIl1bY2xhc3MqPVwiZnVsbHlTZWxlY3RlZE1lcmdlZENlbGwtMVwiXTpiZWZvcmUge1xuICAgIG9wYWNpdHk6IDAuMjtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC0yXCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC4yNztcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC0zXCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC4zNTtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC00XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC40MTtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC01XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC40Nztcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC02XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC41NDtcbn1cblxuLmhhbmRzb250YWJsZSB0Ym9keSB0ZFtyb3dzcGFuXVtjbGFzcyo9XCJhcmVhXCJdW2NsYXNzKj1cImhpZ2hsaWdodFwiXVtjbGFzcyo9XCJmdWxseVNlbGVjdGVkTWVyZ2VkQ2VsbC03XCJdOmJlZm9yZSB7XG4gICAgb3BhY2l0eTogMC41ODtcbn1cblxuLyohXG4gKiBIYW5kc29udGFibGUgRHJvcGRvd25NZW51XG4gKi9cbi5oYW5kc29udGFibGUgLmNoYW5nZVR5cGUge1xuICBiYWNrZ3JvdW5kOiAjZWVlO1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNiYmI7XG4gIGNvbG9yOiAjYmJiO1xuICBmb250LXNpemU6IDlweDtcbiAgbGluZS1oZWlnaHQ6IDlweDtcbiAgcGFkZGluZzogMnB4O1xuICBtYXJnaW46IDNweCAxcHggMCA1cHg7XG4gIGZsb2F0OiByaWdodDtcbn1cbi5oYW5kc29udGFibGUgLmNoYW5nZVR5cGU6YmVmb3JlIHtcbiAgY29udGVudDogJ1xcMjVCQ1xcICc7XG59XG5cbi5oYW5kc29udGFibGUgLmNoYW5nZVR5cGU6aG92ZXIge1xuICBib3JkZXI6IDFweCBzb2xpZCAjNzc3O1xuICBjb2xvcjogIzc3NztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaHREcm9wZG93bk1lbnU6bm90KC5odEdob3N0VGFibGUpIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxMDYwOyAvKiBuZWVkcyB0byBiZSBoaWdoZXIgdGhhbiAxMDUwIC0gei1pbmRleCBmb3IgVHdpdHRlciBCb290c3RyYXAgbW9kYWwgKCMxNTY5KSAqL1xufVxuXG4uaHREcm9wZG93bk1lbnUgLmh0X2Nsb25lX3RvcCxcbi5odERyb3Bkb3duTWVudSAuaHRfY2xvbmVfbGVmdCxcbi5odERyb3Bkb3duTWVudSAuaHRfY2xvbmVfY29ybmVyLFxuLmh0RHJvcGRvd25NZW51IC5odF9jbG9uZV9kZWJ1ZyB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZS5odENvcmUge1xuICBib3JkZXI6IDFweCBzb2xpZCAjYmJiO1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAycHg7XG4gIGJvcmRlci1yaWdodC13aWR0aDogMnB4O1xufVxuXG4uaHREcm9wZG93bk1lbnUgLnd0Qm9yZGVyIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuXG4uaHREcm9wZG93bk1lbnUgdGFibGUgdGJvZHkgdHIgdGQge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm9yZGVyLXdpZHRoOiAwO1xuICBwYWRkaW5nOiA0cHggNnB4IDAgNnB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uaHREcm9wZG93bk1lbnUgdGFibGUgdGJvZHkgdHIgdGQ6Zmlyc3QtY2hpbGQge1xuICBib3JkZXI6IDA7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpbW1lZCB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgY29sb3I6ICMzMjMyMzI7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5jdXJyZW50LFxuLmh0RHJvcGRvd25NZW51IHRhYmxlIHRib2R5IHRyIHRkLnplcm9jbGlwYm9hcmQtaXMtaG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZTllOWU5O1xufVxuXG4uaHREcm9wZG93bk1lbnUgdGFibGUgdGJvZHkgdHIgdGQuaHRTZXBhcmF0b3Ige1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI2U2ZTZlNjtcbiAgaGVpZ2h0OiAwO1xuICBwYWRkaW5nOiAwO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpc2FibGVkIHtcbiAgY29sb3I6ICM5OTk7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC5odERpc2FibGVkOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICM5OTk7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmh0RHJvcGRvd25NZW51Om5vdCguaHRHaG9zdFRhYmxlKSB0YWJsZSB0Ym9keSB0ci5odEhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZCAuaHRJdGVtV3JhcHBlciB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5odERyb3Bkb3duTWVudSB0YWJsZSB0Ym9keSB0ciB0ZCBkaXYgc3Bhbi5zZWxlY3RlZCB7XG4gIG1hcmdpbi10b3A6IC0ycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNHB4O1xufVxuXG4uaHREcm9wZG93bk1lbnUgLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4vKiBDb2x1bW4ncyBudW1iZXIgcG9zaXRpb24gKi9cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZzo6YWZ0ZXIge1xuICAvKiBDZW50ZXJpbmcgc3RhcnQgKi9cbiAgdG9wOiA1MCU7XG4gIG1hcmdpbi10b3A6IC0ycHg7IC8qIFR3byBleHRyYSBwaXhlbHMgKC0yIGluc3RlYWQgb2YgLTQpIGZvciBwdXJwb3NlIG9mIHByb3BlciBwb3NpdGlvbmluZyBvZiBudW1lcmljIGluZGljYXRvcnMsIHdoZW4gYGZvbnQtc2l6ZWAgc2V0IHRvIGRlZmF1bHQgKi9cbiAgLyogQ2VudGVyaW5nIGVuZCAqL1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IC0xNXB4O1xuICBwYWRkaW5nLWxlZnQ6IDVweDsgOyAvKiBGb3IgcHVycG9zZSBvZiBjb250aW51b3VzIG1vdXNlIG92ZXIgZXhwZXJpZW5jZSwgd2hlbiBtb3ZpbmcgYmV0d2VlbiB0aGUgYDo6YmVmb3JlYCBhbmQgdGhlIGA6OmFmdGVyYCBlbGVtZW50cyAqL1xuXG4gIGZvbnQtc2l6ZTogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgbGluZS1oZWlnaHQ6IDEuMTtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIFdvcmthcm91bmQgZm9yIElFOSAtIElFMTEgKi9cbn1cblxuLyogV29ya2Fyb3VuZCBmb3IgSUU5IC0gSUUxMSwgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxOTAyNTY2LCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzIxMjAyNDcgKi9cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZzo6YWZ0ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi8qIFdlIHN1cHBvcnQgdXAgdG8gNyBudW1lcmljIGluZGljYXRvcnMsIGRlc2NyaWJpbmcgb3JkZXIgb2YgY29sdW1uIGluIHNvcnRlZCBjb2x1bW5zIHF1ZXVlICovXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmdbY2xhc3NePVwic29ydC1cIl06OmFmdGVyLFxuLmhhbmRzb250YWJsZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nW2NsYXNzKj1cIiBzb3J0LVwiXTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIitcIlxufVxuXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmcuc29ydC0xOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcxJztcbn1cblxuLmhhbmRzb250YWJsZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nLnNvcnQtMjo6YWZ0ZXIge1xuICBjb250ZW50OiAnMic7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5zb3J0LTM6OmFmdGVyIHtcbiAgY29udGVudDogJzMnO1xufVxuXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmcuc29ydC00OjphZnRlciB7XG4gIGNvbnRlbnQ6ICc0Jztcbn1cblxuLmhhbmRzb250YWJsZSBzcGFuLmNvbEhlYWRlci5jb2x1bW5Tb3J0aW5nLnNvcnQtNTo6YWZ0ZXIge1xuICBjb250ZW50OiAnNSc7XG59XG5cbi5oYW5kc29udGFibGUgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZy5zb3J0LTY6OmFmdGVyIHtcbiAgY29udGVudDogJzYnO1xufVxuXG4uaGFuZHNvbnRhYmxlIHNwYW4uY29sSGVhZGVyLmNvbHVtblNvcnRpbmcuc29ydC03OjphZnRlciB7XG4gIGNvbnRlbnQ6ICc3Jztcbn1cblxuLyogRHJvcC1kb3duIG1lbnUgd2lkZW5zIGhlYWRlciBieSA1IHBpeGVscywgc29ydCBzZXF1ZW5jZSBudW1iZXJzIHdvbid0IG92ZXJsYXAgdGhlIGljb247IG1haW5seSBmb3IgdGhlIElFOSsgKi9cbi5odEdob3N0VGFibGUgdGggZGl2IGJ1dHRvbi5jaGFuZ2VUeXBlICsgc3Bhbi5jb2xIZWFkZXIuY29sdW1uU29ydGluZzpub3QoLmluZGljYXRvckRpc2FibGVkKSB7XG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcbn1cblxuLyohXG4gKiBIYW5kc29udGFibGUgRmlsdGVyc1xuICovXG5cbi8qIENvbmRpdGlvbnMgbWVudSAqL1xuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51Om5vdCguaHRHaG9zdFRhYmxlKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTA3MDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IC5odF9jbG9uZV90b3AsXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgLmh0X2Nsb25lX2xlZnQsXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgLmh0X2Nsb25lX2Nvcm5lcixcbi5odEZpbHRlcnNDb25kaXRpb25zTWVudSAuaHRfY2xvbmVfZGVidWcge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUuaHRDb3JlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2JiYjtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMnB4O1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDJweDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IC53dEJvcmRlciB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGJvcmRlci13aWR0aDogMDtcbiAgcGFkZGluZzogNHB4IDZweCAwIDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkOmZpcnN0LWNoaWxkIHtcbiAgYm9yZGVyOiAwO1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQuaHREaW1tZWQge1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGNvbG9yOiAjMzIzMjMyO1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQuY3VycmVudCxcbi5odEZpbHRlcnNDb25kaXRpb25zTWVudSB0YWJsZSB0Ym9keSB0ciB0ZC56ZXJvY2xpcGJvYXJkLWlzLWhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2U5ZTllOTtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0U2VwYXJhdG9yIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNmU2ZTY7XG4gIGhlaWdodDogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0RGlzYWJsZWQge1xuICBjb2xvcjogIzk5OTtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IHRhYmxlIHRib2R5IHRyIHRkLmh0RGlzYWJsZWQ6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzk5OTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQgLmh0SXRlbVdyYXBwZXIge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uaHRGaWx0ZXJzQ29uZGl0aW9uc01lbnUgdGFibGUgdGJvZHkgdHIgdGQgZGl2IHNwYW4uc2VsZWN0ZWQge1xuICBtYXJnaW4tdG9wOiAtMnB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDRweDtcbn1cblxuLmh0RmlsdGVyc0NvbmRpdGlvbnNNZW51IC5odF9tYXN0ZXIgLnd0SG9sZGVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmhhbmRzb250YWJsZSAuaHRNZW51RmlsdGVyaW5nIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAjY2NjO1xuICBoZWlnaHQ6IDEzNXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odF9tYXN0ZXIgdGFibGUgdGQuaHRDdXN0b21NZW51UmVuZGVyZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICBjdXJzb3I6IGF1dG87XG59XG5cbi8qIE1lbnUgbGFiZWwgKi9cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVMYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC43NWVtO1xufVxuXG4vKiBDb21wb25lbnQgYWN0aW9uIGJhciAqL1xuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudUFjdGlvbkJhciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAzcHg7XG59XG5cbi8qIENvbXBvbmVudCBmaWx0ZXIgYnkgY29uZGl0aW9uYWwgKi9cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVDb25kaXRpb24uYm9yZGVyIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCAjY2NjICFpbXBvcnRhbnQ7XG59XG4uaGFuZHNvbnRhYmxlIC5odEZpbHRlcnNNZW51Q29uZGl0aW9uIC5odFVJSW5wdXQge1xuICBwYWRkaW5nOiAwIDAgNXB4IDA7XG59XG5cbi8qIENvbXBvbmVudCBmaWx0ZXIgYnkgdmFsdWUgKi9cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVWYWx1ZSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQgI2NjYyAhaW1wb3J0YW50O1xufVxuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudVZhbHVlIC5odFVJTXVsdGlwbGVTZWxlY3RTZWFyY2gge1xuICBwYWRkaW5nOiAwO1xufVxuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudUNvbmRpdGlvbiAuaHRVSUlucHV0IGlucHV0LFxuLmhhbmRzb250YWJsZSAuaHRGaWx0ZXJzTWVudVZhbHVlIC5odFVJTXVsdGlwbGVTZWxlY3RTZWFyY2ggaW5wdXQge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjc1ZW07XG4gIHBhZGRpbmc6IDRweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5odFVJTXVsdGlwbGVTZWxlY3QgLmh0X21hc3RlciAud3RIb2xkZXIge1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc0FjdGl2ZSAuY2hhbmdlVHlwZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM1MDkyNzI7XG4gIGNvbG9yOiAjMTg4MDRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDJlMGQ5O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJU2VsZWN0QWxsIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJQ2xlYXJBbGwsIC5oYW5kc29udGFibGUgLmh0VUlTZWxlY3RBbGwge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlDbGVhckFsbCBhLCAuaGFuZHNvbnRhYmxlIC5odFVJU2VsZWN0QWxsIGEge1xuICBjb2xvcjogIzMyODNEODtcbiAgZm9udC1zaXplOiAwLjc1ZW07XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3Rpb25Db250cm9scyB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odENoZWNrYm94UmVuZGVyZXJJbnB1dCB7XG4gIG1hcmdpbjogMCA1cHggMCAwO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBoZWlnaHQ6IDFlbTtcbn1cblxuLyogVUkgZWxlbWVudHMgKi9cbi8qIElucHV0ICovXG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQge1xuICBwYWRkaW5nOiAzcHggMCA3cHggMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQgaW5wdXQge1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkMmQxZDE7XG59XG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQgaW5wdXQ6Zm9jdXMge1xuICBvdXRsaW5lOiAwO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0SWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLyogQnV0dG9uICovXG4uaGFuZHNvbnRhYmxlIC5odFVJSW5wdXQuaHRVSUJ1dHRvbiB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0Lmh0VUlCdXR0b24gaW5wdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICBjb2xvcjogIzAwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjdlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGhlaWdodDogMTlweDtcbiAgbWluLXdpZHRoOiA2NHB4O1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0Lmh0VUlCdXR0b24gaW5wdXQ6aG92ZXIge1xuICBib3JkZXItY29sb3I6ICNiOWI5Yjk7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlJbnB1dC5odFVJQnV0dG9uT0sge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlJbnB1dC5odFVJQnV0dG9uT0sgaW5wdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGY5ZDU4O1xuICBib3JkZXItY29sb3I6ICMxODgwNGU7XG4gIGNvbG9yOiAjZmZmO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSUlucHV0Lmh0VUlCdXR0b25PSyBpbnB1dDpob3ZlciB7XG4gIGJvcmRlci1jb2xvcjogIzFhNmY0Njtcbn1cblxuLyogU2VsZWN0ICovXG4uaGFuZHNvbnRhYmxlIC5odFVJU2VsZWN0IHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tYm90dG9tOiA3cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3RDYXB0aW9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZDJkMWQxO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjdlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHBhZGRpbmc6IDNweCAyMHB4IDNweCAxMHB4O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3RDYXB0aW9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZThlODtcbiAgYm9yZGVyOiAxcHggc29saWQgI2I5YjliOTtcbn1cbi5oYW5kc29udGFibGUgLmh0VUlTZWxlY3REcm9wZG93bjphZnRlciB7XG4gIGNvbnRlbnQ6ICdcXDI1QjInO1xuICBmb250LXNpemU6IDdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTBweDtcbiAgdG9wOiAwO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSVNlbGVjdERyb3Bkb3duOmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICdcXDI1QkMnO1xuICBmb250LXNpemU6IDdweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTBweDtcbiAgdG9wOiA4cHg7XG59XG5cbi8qIFNlbGVjdE11bHRpcGxlICovXG4uaGFuZHNvbnRhYmxlIC5odFVJTXVsdGlwbGVTZWxlY3QgLmhhbmRzb250YWJsZSAuaHRDb3JlIHtcbiAgYm9yZGVyOiBub25lO1xufVxuLmhhbmRzb250YWJsZSAuaHRVSU11bHRpcGxlU2VsZWN0IC5oYW5kc29udGFibGUgLmh0Q29yZSB0ZDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGNUY1RjU7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlNdWx0aXBsZVNlbGVjdFNlYXJjaCBpbnB1dCB7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2QyZDFkMTtcbiAgcGFkZGluZzogM3B4O1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJUmFkaW8ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlSYWRpbzpsYXN0LWNoaWxkIHtcbiAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuXG4uaGFuZHNvbnRhYmxlIC5odFVJUmFkaW8gPiBpbnB1dFt0eXBlPXJhZGlvXSB7XG4gIG1hcmdpbi1yaWdodDogMC41ZXg7XG59XG5cbi5oYW5kc29udGFibGUgLmh0VUlSYWRpbyBsYWJlbCB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5oYW5kc29udGFibGUgLmh0RmlsdGVyc01lbnVPcGVyYXRvcnMge1xuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xufVxuXG4uaGFuZHNvbnRhYmxlLmdhbnR0Q2hhcnQgdHI6Zmlyc3QtY2hpbGQgdGggZGl2LnJlbGF0aXZlIHtcbiAgcGFkZGluZy1yaWdodDogMjFweDtcbn1cbi5oYW5kc29udGFibGUuZ2FudHRDaGFydCAuY29sSGVhZGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uaGFuZHNvbnRhYmxlLmdhbnR0Q2hhcnQgdGQucmFuZ2VCYXIge1xuICBiYWNrZ3JvdW5kOiAjNDhiNzAzO1xuICBib3JkZXItcmlnaHQtd2lkdGg6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDNweCAwICNmZmZmZmY7XG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAzcHggMCAjZmZmZmZmO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDNweCAwICNmZmZmZmY7XG59XG4uaGFuZHNvbnRhYmxlLmdhbnR0Q2hhcnQgdGQucmFuZ2VCYXIubGFzdCB7XG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xufVxuLmhhbmRzb250YWJsZS5nYW50dENoYXJ0IHRkLnJhbmdlQmFyLmFyZWEge1xuICBiYWNrZ3JvdW5kOiAjN0VDNDgxO1xufVxuLmhhbmRzb250YWJsZS5nYW50dENoYXJ0IHRkLnJhbmdlQmFyLnBhcnRpYWwge1xuICBiYWNrZ3JvdW5kOiAjOGVkZjVhO1xufVxuLmhhbmRzb250YWJsZS5nYW50dENoYXJ0IHRkLnJhbmdlQmFyLmFyZWEucGFydGlhbCB7XG4gIGJhY2tncm91bmQ6ICNBMUQ4QUQ7XG59XG5cbi5oYW5kc29udGFibGUgdGhlYWQgdGguaGlkZGVuSGVhZGVyOm5vdCg6Zmlyc3Qtb2YtdHlwZSkge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoLmh0X25lc3RpbmdMZXZlbHMge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgcGFkZGluZy1sZWZ0OiA3cHg7XG59XG5cbi5oYW5kc29udGFibGUgdGggZGl2Lmh0X25lc3RpbmdMZXZlbHMge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMTFweDtcbn1cblxuLmhhbmRzb250YWJsZS5pbm5lckJvcmRlckxlZnQgdGggZGl2Lmh0X25lc3RpbmdMZXZlbHMsXG4uaGFuZHNvbnRhYmxlLmlubmVyQm9yZGVyTGVmdCB+IC5oYW5kc29udGFibGUgdGggZGl2Lmh0X25lc3RpbmdMZXZlbHMge1xuICAgIHJpZ2h0OiAxMHB4O1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoIHNwYW4uaHRfbmVzdGluZ0xldmVsIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5oYW5kc29udGFibGUgdGggc3Bhbi5odF9uZXN0aW5nTGV2ZWxfZW1wdHkge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTBweDtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBmbG9hdDogbGVmdDtcbn1cblxuLmhhbmRzb250YWJsZSB0aCBzcGFuLmh0X25lc3RpbmdMZXZlbDo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiXFwyNTEwXCI7XG4gICAgZm9udC1zaXplOiA5cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3R0b206IDNweDtcbn1cblxuXG4uaGFuZHNvbnRhYmxlIHRoIGRpdi5odF9uZXN0aW5nQnV0dG9uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmhhbmRzb250YWJsZSB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbi5odF9uZXN0aW5nRXhwYW5kOjphZnRlciB7XG4gICAgY29udGVudDogXCJcXDAwMkJcIjtcbn1cblxuLmhhbmRzb250YWJsZSB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbi5odF9uZXN0aW5nQ29sbGFwc2U6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIlxcMDAyRFwiO1xufVxuXG4uaGFuZHNvbnRhYmxlLmlubmVyQm9yZGVyTGVmdCB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbixcbi5oYW5kc29udGFibGUuaW5uZXJCb3JkZXJMZWZ0IH4gLmhhbmRzb250YWJsZSB0aCBkaXYuaHRfbmVzdGluZ0J1dHRvbiB7XG4gICAgcmlnaHQ6IDA7XG59XG4vKlxuICogSGFuZHNvbnRhYmxlIEhpZGRlbkNvbHVtbnNcbiAqL1xuLmhhbmRzb250YWJsZSB0aC5iZWZvcmVIaWRkZW5Db2x1bW4ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5oYW5kc29udGFibGUgdGguYmVmb3JlSGlkZGVuQ29sdW1uOjphZnRlcixcbi5oYW5kc29udGFibGUgdGguYWZ0ZXJIaWRkZW5Db2x1bW46OmJlZm9yZSB7XG4gIGNvbG9yOiAjYmJiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBmb250LXNpemU6IDVwdDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRoLmFmdGVySGlkZGVuQ29sdW1uIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmhhbmRzb250YWJsZSB0aC5iZWZvcmVIaWRkZW5Db2x1bW46OmFmdGVyIHtcbiAgcmlnaHQ6IDFweDtcbiAgY29udGVudDogJ1xcMjVDMCc7XG59XG4uaGFuZHNvbnRhYmxlIHRoLmFmdGVySGlkZGVuQ29sdW1uOjpiZWZvcmUge1xuICBsZWZ0OiAxcHg7XG4gIGNvbnRlbnQ6ICdcXDI1QjYnO1xufVxuXG4uaGFuZHNvbnRhYmxlIHRkLmZpcnN0VmlzaWJsZUNvbHVtbixcbi5oYW5kc29udGFibGUgdGguZmlyc3RWaXNpYmxlQ29sdW1uIHtcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjQ0NDO1xufVxuXG4vKiFcbiAqIEhhbmRzb250YWJsZSBIaWRkZW5Sb3dzXG4gKi9cbi5oYW5kc29udGFibGUgdGguYmVmb3JlSGlkZGVuUm93OjpiZWZvcmUsXG4uaGFuZHNvbnRhYmxlIHRoLmFmdGVySGlkZGVuUm93OjphZnRlciB7XG4gIGNvbG9yOiAjYmJiO1xuICBmb250LXNpemU6IDZwdDtcbiAgbGluZS1oZWlnaHQ6IDZwdDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAycHg7XG59XG5cbi5oYW5kc29udGFibGUgdGguYmVmb3JlSGlkZGVuUm93LFxuLmhhbmRzb250YWJsZSB0aC5hZnRlckhpZGRlblJvdyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmhhbmRzb250YWJsZSB0aC5iZWZvcmVIaWRkZW5Sb3c6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICdcXDI1QjInO1xuICBib3R0b206IDJweDtcbn1cblxuLmhhbmRzb250YWJsZSB0aC5hZnRlckhpZGRlblJvdzo6YWZ0ZXIge1xuICBjb250ZW50OiAnXFwyNUJDJztcbiAgdG9wOiAycHg7XG59XG4uaGFuZHNvbnRhYmxlLmh0X19zZWxlY3Rpb24tLXJvd3MgdGJvZHkgdGguYmVmb3JlSGlkZGVuUm93Lmh0X19oaWdobGlnaHQ6YmVmb3JlLFxuLmhhbmRzb250YWJsZS5odF9fc2VsZWN0aW9uLS1yb3dzIHRib2R5IHRoLmFmdGVySGlkZGVuUm93Lmh0X19oaWdobGlnaHQ6YWZ0ZXIge1xuICBjb2xvcjogI2VlZTtcbn1cbi5oYW5kc29udGFibGUgdGQuYWZ0ZXJIaWRkZW5Sb3cuZmlyc3RWaXNpYmxlUm93LFxuLmhhbmRzb250YWJsZSB0aC5hZnRlckhpZGRlblJvdy5maXJzdFZpc2libGVSb3cge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgI0NDQztcbn1cblxuIiwiQGltcG9ydCAnfmhhbmRzb250YWJsZS9kaXN0L2hhbmRzb250YWJsZS5mdWxsLmNzcyc7XHJcblxyXG4uaGVhZGVye1xyXG4gICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDJhNjU7XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gIFxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gICNzcnNfbG9nb3tcclxuICAgIHdpZHRoOjEzMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NDBweDtcclxuICAgIC8qIGhlaWdodDo2MHB4OyAqL1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcblxyXG4gICNzcnNfbmFtZXtcclxuICAgIHdpZHRoOjUwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NzBweDtcclxuICAgIG1hcmdpbi10b3A6MjBweDtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICAgIGZvbnQtc2l6ZTogMzJwdDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICAvKiBoZWlnaHQ6NjBweDsgKi9cclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgfVxyXG4gIFxyXG4gICNob3N0ZWxfbmFtZXtcclxuICAgIG1hcmdpbi10b3A6MzVweDtcclxuICAgIGNvbG9yOiM1ZGY3ZDE7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC1zaXplOiAxNHB0O1xyXG4gICAgd2lkdGg6MjkwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAjaG9yaXpvbnRhbF9uYXZ7XHJcbiAgICBtYXJnaW4tbGVmdDo3NzBweDtcclxuICB9XHJcbiAgXHJcbiAgI3Nyc190ZXh0e1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBjb2xvcjojYTFjMGU3O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gIH1cclxuICBcclxuICAjc3JzX3RleHQ6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg3LCAxMzAsIDI1KTtcclxuICB9XHJcbiAgXHJcbiAgI2hvcml6b250YWxfb3B0aW9uc3tcclxuICAgIG1hcmdpbi1sZWZ0OjIwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC5ib2R5X2NvbnRlbnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2FkZF9wdXJjaGFzZXtcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgd2lkdGg6MTUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgI3ZpZXdfcHVyY2hhc2V7XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6MzkwcHg7XHJcbiAgICBtYXJnaW4tdG9wOjUzcHg7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjbW9kaWZ5X3B1cmNoYXNle1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OjU0MXB4O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2xpbmV7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB3aWR0aDogMzBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOjYyNXB4O1xyXG4gICAgaGVpZ2h0OiAzcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIzLCAyMTMsIDIxMyk7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcclxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsqLyBcclxuICAgIG1hcmdpbi1sZWZ0OiA2OTFweDtcclxuICB9XHJcblxyXG5cclxuICAuc3ByZWFkc2hlZXR7XHJcbiAgICBoZWlnaHQ6NTAwcHg7XHJcbiAgICBtYXgtd2lkdGg6NzUwcHg7XHJcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6MjQwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxNDVweDtcclxuICB9XHJcbiAgXHJcblxyXG4gIC5zYXZlX2J1dHRvbntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBvdXRsaW5lOm5vbmU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIC5mb290ZXJ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UwZTBkMTtcclxuICAgIHRleHQtYWxpZ246Y2VudGVyO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgLmxvYWRlciB7XHJcbiAgICBib3JkZXI6IDVweCBzb2xpZCAjZjNmM2YzO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNjAlO1xyXG4gICAgYm9yZGVyLXRvcDogNXB4IHNvbGlkICMzMzMzMWE7XHJcbiAgICB3aWR0aDogMzBweDtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIG1hcmdpbi10b3A6IDgwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDo2NTBweDtcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOyAvKiBTYWZhcmkgKi9cclxuICAgIGFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTtcclxuICB9XHJcbiAgXHJcbiAgLyogU2FmYXJpICovXHJcbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4ge1xyXG4gICAgMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgICAxMDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XHJcbiAgfVxyXG4gIFxyXG4gIEBrZXlmcmFtZXMgc3BpbiB7XHJcbiAgICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxyXG4gIH1cclxuICAiXX0= */"

/***/ }),

/***/ "./src/app/modify-purchase/modify-purchase.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/modify-purchase/modify-purchase.component.ts ***!
  \**************************************************************/
/*! exports provided: ModifyPurchaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyPurchaseComponent", function() { return ModifyPurchaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _handsontable_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @handsontable/angular */ "./node_modules/@handsontable/angular/fesm2015/handsontable-angular.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let ModifyPurchaseComponent = class ModifyPurchaseComponent {
    constructor(http, hotRegisterer) {
        this.http = http;
        this.hotRegisterer = hotRegisterer;
        this.instance = 'instance';
        this.dataBank = [];
        this.columns = [];
        this.flag = false;
        this.model = {};
        this.dataset = [];
        this.headers = [];
        this.edited_purchase_list = [];
        this.display_sheet = 'none';
        this.colHeaders = ['Bill Number', 'Product Name', 'Vendor Name', 'Date',
            'Price', 'Quantity', 'Amount'];
        this.settings = {
            minRows: 1000,
            minCols: 256,
            stretchH: 'all',
            rowHeaders: true,
            colHeaders: true,
            colWidths: 125,
            rowHeights: 30,
            rowHeaderWidth: 55,
            filters: true,
            dropdownMenu: true
        };
        this.opacity_property = '0.3';
        this.cursor_property = 'default';
        this.isErrorMessage = false;
        this.columns = [];
        this.display_sheet = 'none';
        this.show = true;
        this.http.get('http://localhost:9090/getAllPurchase').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(res => {
            //console.log("data: ", res);
            let data = [];
            res.forEach(element => {
                data.push(element);
            });
            this.dataBank = data;
            //console.log("data bank ",this.dataBank);
            this.headers = Object.keys(data[0]);
            //console.log("Headers ",this.headers);
            for (let num = 0; num < this.headers.length; num++) {
                this.columns.push({ data: this.headers[num] });
            }
            ;
            this.display_sheet = 'block';
            this.show = false;
        }, err => {
            this.show = false;
            this.isErrorMessage = true;
            this.errorMessage = "No Records Found";
            console.log(this.errorMessage);
        });
    }
    ngOnInit() {
    }
    // onAfterChange() {
    //   this.opacity_property='1';
    //   this.cursor_property='pointer';
    // }
    saveData() {
        this.totalRows = this.hotRegisterer.getInstance('instance').countSourceRows();
        this.rows_containing_data = this.totalRows - this.hotRegisterer.getInstance('instance').countEmptyRows();
        for (let i = 0; i < this.rows_containing_data; i++) {
            //console.log("Data at row ",i," is "+this.hotRegisterer.getInstance('instance').getDataAtRow(i));
            this.edited_purchase_list.push(this.hotRegisterer.getInstance('instance').getDataAtRow(i));
        }
        let formData = new FormData();
        console.log("Stringified json " + JSON.stringify(this.edited_purchase_list));
        //formData.append('formdata',amountString);
        formData.append('formdata', JSON.stringify(this.edited_purchase_list));
        var temp = 'http://localhost:9090/addEditedPurchase';
        console.log("Formdata ", formData);
        this.http.post(temp, formData).subscribe(data => {
            console.log("Data is ", data);
            alert("Updated successfully!!!");
        });
        this.edited_purchase_list.splice(0);
    }
};
ModifyPurchaseComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _handsontable_angular__WEBPACK_IMPORTED_MODULE_3__["HotTableRegisterer"] }
];
ModifyPurchaseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-modify-purchase',
        template: __webpack_require__(/*! raw-loader!./modify-purchase.component.html */ "./node_modules/raw-loader/index.js!./src/app/modify-purchase/modify-purchase.component.html"),
        styles: [__webpack_require__(/*! ./modify-purchase.component.css */ "./src/app/modify-purchase/modify-purchase.component.css")]
    })
], ModifyPurchaseComponent);



/***/ }),

/***/ "./src/app/view-consumption/view-consumption.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/view-consumption/view-consumption.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n  \r\n    \r\n  }\r\n  \r\n  #srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #srs_name{\r\n    width:500px;\r\n    margin-left:70px;\r\n    margin-top:20px;\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size: 32pt;\r\n    font-family: daimler !important;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #hostel_name{\r\n    margin-top:35px;\r\n    color:#5df7d1;\r\n    float:left;\r\n    font-size: 14pt;\r\n    width:290px;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #horizontal_nav{\r\n    margin-left:770px;\r\n  }\r\n  \r\n  #srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n  }\r\n  \r\n  #srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n  }\r\n  \r\n  #horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n  }\r\n  \r\n  .body_content{\r\n    background-color: white;\r\n  }\r\n  \r\n  #add_consumption{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    margin-top:53px;\r\n    position: absolute;\r\n    margin-left: 240px;\r\n    text-decoration: none;\r\n    color: black;\r\n    text-align: center;\r\n    float:left;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #view_consumption{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #005cab;\r\n    position:absolute;\r\n    margin-left:390px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: white;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #modify_consumption{\r\n    height:50px;\r\n    width:170px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:541px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #line{\r\n    color: black;\r\n    width: 30px;\r\n    position: absolute;\r\n    width:775px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 100px;\r\n    /* position: absolute;*/ \r\n    margin-left: 540px;\r\n  }\r\n  \r\n  #form_bnum{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:200px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_bnum:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #searchPurchase_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-207px;\r\n    margin-top:2px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_bnum:focus + #searchPurchase_id, #form_bnum:not(:placeholder-shown) + #searchPurchase_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  .reset_button{\r\n    cursor: pointer;\r\n    margin-top: 127px;\r\n    margin-left: 845px;\r\n    background-color: white;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: #ccc solid 2px;\r\n    color:grey;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  .reset_button:focus{\r\n    outline: 0;\r\n  }\r\n  \r\n  .submit_button:focus{\r\n    outline: 0;\r\n  }\r\n  \r\n  .submit_button{\r\n    cursor: pointer;\r\n    margin-top: 106px;\r\n    margin-left: 55px;\r\n    background-color: #005cab;\r\n    height: 40px;\r\n    width: 120px;\r\n    border-radius: 30px;\r\n    border: none;\r\n    color:white;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  .table-heading-container{\r\n    width:1075px;\r\n    position: absolute;\r\n    background-color:white;\r\n    margin-left: 240px;\r\n    margin-top: 47px;\r\n  }\r\n  \r\n  .table-container{\r\n    height: 350px;\r\n    width:1075px;\r\n    background-color:white;\r\n    position: absolute;\r\n    margin-top: 113px;\r\n    margin-left: 240px;\r\n    overflow-y: auto;\r\n    /* margin-bottom: 1000px; */\r\n  }\r\n  \r\n  .table-container1{\r\n    height: 280px;\r\n    width:1094px;\r\n    background-color:white;\r\n    position: absolute;\r\n    margin-top: 113px;\r\n    margin-left: 240px;\r\n    overflow-y: auto;\r\n    display:block;\r\n    /* margin-bottom: 1000px; */\r\n  }\r\n  \r\n  table { \r\n    /* table-layout: fixed; */\r\n    width: 100%;\r\n    font-family: daimler !important; \r\n    font-size:large; \r\n    border-collapse: collapse; \r\n   \r\n    border: 2px solid #acacac; \r\n  }\r\n  \r\n  th{\r\n    color: black; \r\n    font-family: daimler !important;\r\n    height:35px;\r\n    border: 2px solid #acacac; \r\n  }\r\n  \r\n  tr{\r\n    border: 2px solid #acacac; \r\n    \r\n  }\r\n  \r\n  td { \r\n  \r\n    border: 2px solid #acacac; \r\n  }\r\n  \r\n  .dropdown-content{\r\n    \r\n    /* width: 262px; */\r\n    z-index: 1;\r\n    min-width: 197px;\r\n    margin-top: 170px;\r\n    margin-left: 240px;\r\n    position: absolute;\r\n    background-color: white;\r\n    border: solid #cacaca;\r\n    border-width: 1.5px 1.5px 1.5px 1.5px;\r\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\r\n  }\r\n  \r\n  .dropdown-content a {\r\n    color: black;\r\n    padding: 12px 16px;\r\n    font-family: daimler !important; \r\n    text-decoration: none;\r\n    display: block;\r\n    cursor: default;\r\n  }\r\n  \r\n  .dropdown-content a:hover {background-color: #ddd;}\r\n  \r\n  .dropdown-content {\r\n    border: solid 1 px black;\r\n    display: block;\r\n  }\r\n  \r\n  .disabledClass { \r\n    display: none;\r\n    border-width: 0px;\r\n  }\r\n  \r\n  .disabledSubmit{\r\n    opacity:0.3;\r\n    cursor:default;\r\n   \r\n  }\r\n  \r\n  #inkgs{\r\n    font-style:italic;\r\n    font-size: 8pt;\r\n  \r\n  }\r\n  \r\n  .footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n  }\r\n  \r\n  ul{\r\n   position:absolute;\r\n   margin-top:100px;\r\n   margin-left:700px;\r\n   -webkit-transform:translate(-50%,-50%);\r\n           transform:translate(-50%,-50%);\r\n   display:flex;\r\n\r\n }\r\n  \r\n  ul li{\r\n   list-style:none;\r\n   width:6px;\r\n   height:25px;\r\n   background:#005cab;\r\n   margin : 0 4px;\r\n   -webkit-animation: animate .7s infinite alternate;\r\n           animation: animate .7s infinite alternate;\r\n\r\n }\r\n  \r\n  @-webkit-keyframes animate{\r\n   0%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   25%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  50%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  75%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  100%{\r\n    -webkit-transform:scaleY(3);\r\n            transform:scaleY(3);\r\n  }\r\n }\r\n  \r\n  @keyframes animate{\r\n   0%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   25%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  50%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  75%{\r\n    -webkit-transform:scaleY(1);\r\n            transform:scaleY(1);\r\n  }\r\n  100%{\r\n    -webkit-transform:scaleY(3);\r\n            transform:scaleY(3);\r\n  }\r\n }\r\n  \r\n  ul li:nth-child(1){\r\n   -webkit-animation-delay: .1s;\r\n           animation-delay: .1s;\r\n }\r\n  \r\n  ul li:nth-child(2){\r\n  -webkit-animation-delay: .2s;\r\n          animation-delay: .2s;\r\n}\r\n  \r\n  ul li:nth-child(3){\r\n  -webkit-animation-delay: .3s;\r\n          animation-delay: .3s;\r\n}\r\n  \r\n  ul li:nth-child(4){\r\n  -webkit-animation-delay: .4s;\r\n          animation-delay: .4s;\r\n}\r\n  \r\n  ul li:nth-child(5){\r\n  -webkit-animation-delay: .5s;\r\n          animation-delay: .5s;\r\n}\r\n  \r\n  ul li:nth-child(6){\r\n  -webkit-animation-delay: .6s;\r\n          animation-delay: .6s;\r\n} \r\n  \r\n  \r\n  \r\n  \r\n  \r\n \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlldy1jb25zdW1wdGlvbi92aWV3LWNvbnN1bXB0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0lBRUkseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixVQUFVOzs7RUFHWjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLFVBQVU7RUFDWjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLCtCQUErQjtJQUMvQixpQkFBaUI7SUFDakIsVUFBVTtFQUNaOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYixVQUFVO0lBQ1YsZUFBZTtJQUNmLFdBQVc7SUFDWCwrQkFBK0I7RUFDakM7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsK0JBQStCO0lBQy9CLGVBQWU7SUFDZixhQUFhO0lBQ2IsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxtQ0FBbUM7RUFDckM7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0VBQ3BCOztFQUlBO0lBQ0UsdUJBQXVCO0VBQ3pCOztFQUdBO0lBQ0UsV0FBVztJQUNYLFdBQVc7SUFDWCx5QkFBeUI7SUFDekIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQiwrQkFBK0I7RUFDakM7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsV0FBVztJQUNYLHlCQUF5QjtJQUN6QixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLCtCQUErQjtFQUNqQzs7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O0FBQ3RCOztFQUNBO0VBQ0UsNEJBQW9CO1VBQXBCLG9CQUFvQjtBQUN0Qjs7RUFDQTtFQUNFLDRCQUFvQjtVQUFwQixvQkFBb0I7QUFDdEIiLCJmaWxlIjoic3JjL2FwcC92aWV3LWNvbnN1bXB0aW9uL3ZpZXctY29uc3VtcHRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJ7XHJcbiAgIFxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMmE2NTtcclxuICAgIGhlaWdodDogOTBweDtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgXHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgI3Nyc19sb2dve1xyXG4gICAgd2lkdGg6MTMwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDo0MHB4O1xyXG4gICAgLyogaGVpZ2h0OjYwcHg7ICovXHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuXHJcbiAgI3Nyc19uYW1le1xyXG4gICAgd2lkdGg6NTAwcHg7XHJcbiAgICBtYXJnaW4tbGVmdDo3MHB4O1xyXG4gICAgbWFyZ2luLXRvcDoyMHB4O1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXdlaWdodDpib2xkO1xyXG4gICAgZm9udC1zaXplOiAzMnB0O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIC8qIGhlaWdodDo2MHB4OyAqL1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgI2hvc3RlbF9uYW1le1xyXG4gICAgbWFyZ2luLXRvcDozNXB4O1xyXG4gICAgY29sb3I6IzVkZjdkMTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBmb250LXNpemU6IDE0cHQ7XHJcbiAgICB3aWR0aDoyOTBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gICNob3Jpem9udGFsX25hdntcclxuICAgIG1hcmdpbi1sZWZ0Ojc3MHB4O1xyXG4gIH1cclxuICBcclxuICAjc3JzX3RleHR7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGNvbG9yOiNhMWMwZTc7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDE3cHg7XHJcbiAgfVxyXG4gIFxyXG4gICNzcnNfdGV4dDpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODcsIDEzMCwgMjUpO1xyXG4gIH1cclxuICBcclxuICAjaG9yaXpvbnRhbF9vcHRpb25ze1xyXG4gICAgbWFyZ2luLWxlZnQ6MjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgLmJvZHlfY29udGVudHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuICBcclxuICBcclxuICAjYWRkX2NvbnN1bXB0aW9ue1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XHJcbiAgICBtYXJnaW4tdG9wOjUzcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDogMjQwcHg7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAjdmlld19jb25zdW1wdGlvbntcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgd2lkdGg6MTUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA1Y2FiO1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tbGVmdDozOTBweDtcclxuICAgIG1hcmdpbi10b3A6NTNweDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gICNtb2RpZnlfY29uc3VtcHRpb257XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE3MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6NTQxcHg7XHJcbiAgICBtYXJnaW4tdG9wOjUzcHg7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjbGluZXtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6Nzc1cHg7XHJcbiAgICBoZWlnaHQ6IDNweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjMsIDIxMywgMjEzKTtcclxuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xyXG4gICAgLyogcG9zaXRpb246IGFic29sdXRlOyovIFxyXG4gICAgbWFyZ2luLWxlZnQ6IDU0MHB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9ibnVte1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBib3JkZXItYm90dG9tOiAjY2NjIHNvbGlkIDFweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGhlaWdodDozMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2Zvcm1fYm51bTpmb2N1c3tcclxuICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICBib3JkZXItbGVmdDpub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gICAgb3V0bGluZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206IGJsdWUgc29saWQgMXB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICAjc2VhcmNoUHVyY2hhc2VfaWQge1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6MTBweDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6LTIwN3B4O1xyXG4gICAgbWFyZ2luLXRvcDoycHg7XHJcbiAgICAvKiBsZWZ0OjA7ICovXHJcbiAgICB0b3A6MDtcclxuICAgIHRyYW5zaXRpb246IDAuMnM7XHJcbiAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKTtcclxuICAgIG9wYWNpdHk6MC41O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9ibnVtOmZvY3VzICsgI3NlYXJjaFB1cmNoYXNlX2lkLCAjZm9ybV9ibnVtOm5vdCg6cGxhY2Vob2xkZXItc2hvd24pICsgI3NlYXJjaFB1cmNoYXNlX2lkIHtcclxuICAgIG9wYWNpdHk6MTtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSkgdHJhbnNsYXRlWSgtODAlKSB0cmFuc2xhdGVYKC0yMHB4KTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLnJlc2V0X2J1dHRvbntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIG1hcmdpbi10b3A6IDEyN3B4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDg0NXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiAjY2NjIHNvbGlkIDJweDtcclxuICAgIGNvbG9yOmdyZXk7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5yZXNldF9idXR0b246Zm9jdXN7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gIH1cclxuICBcclxuICAuc3VibWl0X2J1dHRvbjpmb2N1c3tcclxuICAgIG91dGxpbmU6IDA7XHJcbiAgfVxyXG4gIFxyXG4gIC5zdWJtaXRfYnV0dG9ue1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgbWFyZ2luLXRvcDogMTA2cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNTVweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDVjYWI7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC50YWJsZS1oZWFkaW5nLWNvbnRhaW5lcntcclxuICAgIHdpZHRoOjEwNzVweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XHJcbiAgICBtYXJnaW4tbGVmdDogMjQwcHg7XHJcbiAgICBtYXJnaW4tdG9wOiA0N3B4O1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbiAgLnRhYmxlLWNvbnRhaW5lcntcclxuICAgIGhlaWdodDogMzUwcHg7XHJcbiAgICB3aWR0aDoxMDc1cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLXRvcDogMTEzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMjQwcHg7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgLyogbWFyZ2luLWJvdHRvbTogMTAwMHB4OyAqL1xyXG4gIH1cclxuXHJcblxyXG4gIC50YWJsZS1jb250YWluZXIxe1xyXG4gICAgaGVpZ2h0OiAyODBweDtcclxuICAgIHdpZHRoOjEwOTRweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tdG9wOiAxMTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyNDBweDtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgLyogbWFyZ2luLWJvdHRvbTogMTAwMHB4OyAqL1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgXHJcbiAgdGFibGUgeyBcclxuICAgIC8qIHRhYmxlLWxheW91dDogZml4ZWQ7ICovXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7IFxyXG4gICAgZm9udC1zaXplOmxhcmdlOyBcclxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IFxyXG4gICBcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNhY2FjYWM7IFxyXG4gIH0gXHJcbiAgXHJcbiAgdGh7XHJcbiAgICBjb2xvcjogYmxhY2s7IFxyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDozNXB4O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2FjYWNhYzsgXHJcbiAgfVxyXG4gIFxyXG4gIHRye1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2FjYWNhYzsgXHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgdGQgeyBcclxuICBcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNhY2FjYWM7IFxyXG4gIH1cclxuICBcclxuICBcclxuICBcclxuICBcclxuICAuZHJvcGRvd24tY29udGVudHtcclxuICAgIFxyXG4gICAgLyogd2lkdGg6IDI2MnB4OyAqL1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIG1pbi13aWR0aDogMTk3cHg7XHJcbiAgICBtYXJnaW4tdG9wOiAxNzBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyNDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyOiBzb2xpZCAjY2FjYWNhO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAxLjVweCAxLjVweCAxLjVweCAxLjVweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCA4cHggMTZweCAwcHggcmdiYSgwLDAsMCwwLjIpO1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZHJvcGRvd24tY29udGVudCBhIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIHBhZGRpbmc6IDEycHggMTZweDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7IFxyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5kcm9wZG93bi1jb250ZW50IGE6aG92ZXIge2JhY2tncm91bmQtY29sb3I6ICNkZGQ7fVxyXG4gIFxyXG4gIC5kcm9wZG93bi1jb250ZW50IHtcclxuICAgIGJvcmRlcjogc29saWQgMSBweCBibGFjaztcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZGlzYWJsZWRDbGFzcyB7IFxyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGJvcmRlci13aWR0aDogMHB4O1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZGlzYWJsZWRTdWJtaXR7XHJcbiAgICBvcGFjaXR5OjAuMztcclxuICAgIGN1cnNvcjpkZWZhdWx0O1xyXG4gICBcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgI2lua2dze1xyXG4gICAgZm9udC1zdHlsZTppdGFsaWM7XHJcbiAgICBmb250LXNpemU6IDhwdDtcclxuICBcclxuICB9XHJcbiAgXHJcbiAgLmZvb3RlcntcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGQxO1xyXG4gICAgdGV4dC1hbGlnbjpjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiB1bHtcclxuICAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgIG1hcmdpbi10b3A6MTAwcHg7XHJcbiAgIG1hcmdpbi1sZWZ0OjcwMHB4O1xyXG4gICB0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7XHJcbiAgIGRpc3BsYXk6ZmxleDtcclxuXHJcbiB9XHJcblxyXG4gdWwgbGl7XHJcbiAgIGxpc3Qtc3R5bGU6bm9uZTtcclxuICAgd2lkdGg6NnB4O1xyXG4gICBoZWlnaHQ6MjVweDtcclxuICAgYmFja2dyb3VuZDojMDA1Y2FiO1xyXG4gICBtYXJnaW4gOiAwIDRweDtcclxuICAgYW5pbWF0aW9uOiBhbmltYXRlIC43cyBpbmZpbml0ZSBhbHRlcm5hdGU7XHJcblxyXG4gfVxyXG5cclxuIEBrZXlmcmFtZXMgYW5pbWF0ZXtcclxuICAgMCV7XHJcbiAgICAgdHJhbnNmb3JtOnNjYWxlWSgxKTtcclxuICAgfVxyXG4gICAyNSV7XHJcbiAgICB0cmFuc2Zvcm06c2NhbGVZKDEpO1xyXG4gIH1cclxuICA1MCV7XHJcbiAgICB0cmFuc2Zvcm06c2NhbGVZKDEpO1xyXG4gIH1cclxuICA3NSV7XHJcbiAgICB0cmFuc2Zvcm06c2NhbGVZKDEpO1xyXG4gIH1cclxuICAxMDAle1xyXG4gICAgdHJhbnNmb3JtOnNjYWxlWSgzKTtcclxuICB9XHJcbiB9XHJcblxyXG4gdWwgbGk6bnRoLWNoaWxkKDEpe1xyXG4gICBhbmltYXRpb24tZGVsYXk6IC4xcztcclxuIH1cclxuIHVsIGxpOm50aC1jaGlsZCgyKXtcclxuICBhbmltYXRpb24tZGVsYXk6IC4ycztcclxufVxyXG51bCBsaTpudGgtY2hpbGQoMyl7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAuM3M7XHJcbn1cclxudWwgbGk6bnRoLWNoaWxkKDQpe1xyXG4gIGFuaW1hdGlvbi1kZWxheTogLjRzO1xyXG59XHJcbnVsIGxpOm50aC1jaGlsZCg1KXtcclxuICBhbmltYXRpb24tZGVsYXk6IC41cztcclxufVxyXG51bCBsaTpudGgtY2hpbGQoNil7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAuNnM7XHJcbn0gXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAiXX0= */"

/***/ }),

/***/ "./src/app/view-consumption/view-consumption.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/view-consumption/view-consumption.component.ts ***!
  \****************************************************************/
/*! exports provided: ViewConsumptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewConsumptionComponent", function() { return ViewConsumptionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let ViewConsumptionComponent = class ViewConsumptionComponent {
    constructor(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        this.model = {};
        this.errorMessage = "";
        this.isErrorMessage = false;
        this.productNameIsNotEntered = false;
        this.productNameIsNotEntered_1 = true;
        this.productNameIsEntered = false;
        this.productNameIsEntered_1 = false;
        this.myDate = new Date();
        this.Dates = {
            fromDate: '',
            toDate: ''
        };
        this.display_dropdown = 'none';
        this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
        this.display_table_header = 'none';
        this.display_mode = 'none';
    }
    ngOnInit() {
    }
    checkDate() {
        this.fromDate = new _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]('en-US').transform(this.Dates.fromDate, 'dd-MM-yyyy');
        this.toDate = new _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]('en-US').transform(this.Dates.toDate, 'dd-MM-yyyy');
        //alert("From date "+this.fromdate+" To date "+this.todate);
    }
    onKey(event) {
        this.display_dropdown = 'block';
        let formData = new FormData();
        this.product_name_on_submit = event.target.value;
        if (this.product_name_on_submit == '') {
            this.display_dropdown = 'none';
        }
        var temp = 'http://localhost:9090/webapp/getAllProducts/' + this.product_name_on_submit;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(data => {
            console.log("Data is ", data);
            this.productList = data;
            if (!this.productList.length) {
                //alert("Empty list")
                this.display_dropdown = 'none';
            }
            console.log("Product list ", this.productList);
        });
    }
    getUrlText(val) {
        //alert(val);
        this.model['productName'] = val;
        this.display_dropdown = 'none';
        this.product_name_on_submit = val;
    }
    changeItem() {
        this.display_mode = 'none';
        this.isErrorMessage = false;
    }
    erase() {
        this.display_mode = 'none';
        this.isErrorMessage = false;
    }
    findConsumptionData(val) {
        this.checkDate();
        let fromDate;
        let toDate;
        let productName;
        this.totalconsumed = 0;
        this.productName = val;
        this.show = true;
        var temp = 'http://localhost:9090/getConsumptionDetails?pname=' + this.productName + '&fromdate=' + this.fromDate + '&todate=' + this.toDate;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(res => res.json())).subscribe(res => {
            if (this.productName == '') {
                this.productNameIsNotEntered = true;
                this.productNameIsNotEntered_1 = true;
                this.productNameIsEntered = false;
                this.productNameIsEntered_1 = false;
                this.product_name_typed = 'All Products';
                this.display_mode = 'block';
            }
            else {
                this.productNameIsNotEntered = false;
                this.productNameIsNotEntered_1 = false;
                this.productNameIsEntered = true;
                this.productNameIsEntered_1 = true;
                this.product_name_typed = this.productName;
                this.display_mode = 'block';
            }
            console.log("Data: ", res);
            this.consumptionList = res;
            this.show = false;
            if (!this.consumptionList.length) {
                //alert("Empty list")
                this.display_table_header = 'block';
                this.isErrorMessage = true;
                this.errorMessage = "No Records Found";
                //this.margin_top_onclick = '0px';
            }
            else if (this.consumptionList.length < 12) {
                this.isErrorMessage = false;
                this.display_table_header = 'block';
                this.lessthan12 = true;
                this.greaterthan12 = false;
                this.display_mode = 'block';
                this.fewthan12 = true;
                this.morethan12 = false;
            }
            else if (this.consumptionList.length >= 12) {
                this.display_mode = 'block';
                this.lessthan12 = false;
                this.greaterthan12 = true;
                this.fewthan12 = false;
                this.morethan12 = true;
                this.isErrorMessage = false;
                this.display_table_header = 'block';
                //this.margin_top_onclick = '0px';
            }
            for (let obj of this.consumptionList) {
                for (let key in obj) {
                    if (key == 'consumedquantity') {
                        this.totalconsumed += obj[key];
                    }
                }
            }
        }, err => {
            this.show = false;
            this.isErrorMessage = true;
            this.errorMessage = "No Records Found";
            this.display_mode = 'none';
            console.log(this.errorMessage);
        });
    }
    downloadFile() {
        if (this.productName == '') {
            this.download_url = 'http://localhost:9090/webapp/downloadConsumptionReport/allProducts';
        }
        else {
            this.download_url = 'http://localhost:9090/webapp/downloadConsumptionReport/' + this.productName;
        }
    }
};
ViewConsumptionComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"] }
];
ViewConsumptionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-view-consumption',
        template: __webpack_require__(/*! raw-loader!./view-consumption.component.html */ "./node_modules/raw-loader/index.js!./src/app/view-consumption/view-consumption.component.html"),
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]],
        styles: [__webpack_require__(/*! ./view-consumption.component.css */ "./src/app/view-consumption/view-consumption.component.css")]
    })
], ViewConsumptionComponent);



/***/ }),

/***/ "./src/app/view-purchase/view-purchase.component.css":
/*!***********************************************************!*\
  !*** ./src/app/view-purchase/view-purchase.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header{\r\n   \r\n    background-color: #002a65;\r\n    height: 90px;\r\n    width:100%;\r\n  \r\n    \r\n  }\r\n  \r\n  #srs_logo{\r\n    width:130px;\r\n    margin-left:40px;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #srs_name{\r\n    width:500px;\r\n    margin-left:70px;\r\n    margin-top:20px;\r\n    color:white;\r\n    font-weight:bold;\r\n    font-size: 32pt;\r\n    font-family: daimler !important;\r\n    /* height:60px; */\r\n    float:left;\r\n  }\r\n  \r\n  #hostel_name{\r\n    margin-top:35px;\r\n    color:#5df7d1;\r\n    float:left;\r\n    font-size: 14pt;\r\n    width:290px;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #horizontal_nav{\r\n    margin-left:770px;\r\n  }\r\n  \r\n  #srs_text{\r\n    float:left;\r\n    font-family: daimler !important;\r\n    font-size: 18px;\r\n    color:#a1c0e7;\r\n    display: block;\r\n    text-align: center;\r\n    margin-top: 17px;\r\n  }\r\n  \r\n  #srs_text:hover{\r\n    background-color: rgb(187, 130, 25);\r\n  }\r\n  \r\n  #horizontal_options{\r\n    margin-left:20px;\r\n    margin-right: 20px;\r\n  }\r\n  \r\n  .body_content{\r\n    background-color: white;\r\n  }\r\n  \r\n  #add_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    margin-top:53px;\r\n    position: absolute;\r\n    margin-left: 240px;\r\n    text-decoration: none;\r\n    color: black;\r\n    text-align: center;\r\n    float:left;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #view_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #005cab;\r\n    position:absolute;\r\n    margin-left:390px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: white;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #modify_purchase{\r\n    height:50px;\r\n    width:150px;\r\n    background-color: #f7f7f7;\r\n    position:absolute;\r\n    margin-left:541px;\r\n    margin-top:53px;\r\n    text-decoration: none;\r\n    color: black;\r\n    float:left;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-family: daimler !important;\r\n  }\r\n  \r\n  #line{\r\n    color: black;\r\n    width: 30px;\r\n    position: absolute;\r\n    width:775px;\r\n    height: 3px;\r\n    border: none;\r\n    background-color: rgb(223, 213, 213);\r\n    margin-top: 100px;\r\n    /* position: absolute;*/ \r\n    margin-left: 540px;\r\n  }\r\n  \r\n  #form_bnum{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    border-bottom: #ccc solid 1px;\r\n    font-size: 18px;\r\n    height:30px;\r\n    font-family: daimler !important;\r\n    width:262px;\r\n    float:left;\r\n  }\r\n  \r\n  #form_bnum:focus{\r\n    border-top: none;\r\n    border-left:none;\r\n    border-right: none;\r\n    outline: none;\r\n    border-bottom: blue solid 1px;\r\n  }\r\n  \r\n  #searchPurchase_id {\r\n    font-family: daimler !important;\r\n    padding:10px;\r\n    pointer-events: none;\r\n    position:absolute;\r\n    float:left;\r\n    margin-left:-270px;\r\n    margin-top:2px;\r\n    /* left:0; */\r\n    top:0;\r\n    transition: 0.2s;\r\n    transition-timing-function: ease;\r\n    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);\r\n    opacity:0.5;\r\n  }\r\n  \r\n  #form_bnum:focus + #searchPurchase_id, #form_bnum:not(:placeholder-shown) + #searchPurchase_id {\r\n    opacity:1;\r\n    -webkit-transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n            transform: scale(0.75) translateY(-80%) translateX(-20px);\r\n  }\r\n  \r\n  #search {\r\n    margin-top: 10px;\r\n    color: blue;\r\n    cursor: pointer;\r\n  }\r\n  \r\n  .table-heading-container{\r\n    width:1075px;\r\n    position: absolute;\r\n    background-color:white;\r\n    margin-left: 240px;\r\n    margin-top: 210px;\r\n  }\r\n  \r\n  .table-container{\r\n    height: 350px;\r\n    width:1075px;\r\n    background-color:white;\r\n    position: absolute;\r\n    margin-top: 384px;\r\n    margin-left: 240px;\r\n    overflow-y: auto;\r\n    /* margin-bottom: 1000px; */\r\n  }\r\n  \r\n  .table-container1{\r\n    height: 280px;\r\n    width:1094px;\r\n    background-color:white;\r\n    position: absolute;\r\n    margin-top: 346px;\r\n    margin-left: 240px;\r\n    overflow-y: auto;\r\n    display:block;\r\n    /* margin-bottom: 1000px; */\r\n  }\r\n  \r\n  table { \r\n    table-layout: fixed;\r\n    font-family: daimler !important; \r\n    font-size:large; \r\n    border-collapse: collapse; \r\n    width: 100%;\r\n    border: 2px solid #acacac; \r\n  }\r\n  \r\n  th{\r\n    color: black; \r\n    font-family: daimler !important;\r\n    height:35px;\r\n\r\n    border: 2px solid #acacac; \r\n  }\r\n  \r\n  tr{\r\n    border: 2px solid #acacac; \r\n    \r\n  }\r\n  \r\n  td { \r\n  \r\n    border: 2px solid #acacac; \r\n  }\r\n  \r\n  #inkgs{\r\n    font-style:italic;\r\n    font-size: 8pt;\r\n  \r\n  }\r\n  \r\n  .dropdown-content{\r\n  \r\n  /* width: 262px; */\r\n  z-index: 1;\r\n  min-width: 262px;\r\n  margin-top: 170px;\r\n  margin-left: 990px;\r\n  position: absolute;\r\n  background-color: white;\r\n  border: solid #cacaca;\r\n  border-width: 1.5px 1.5px 1.5px 1.5px;\r\n  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\r\n}\r\n  \r\n  .dropdown-content a {\r\n  color: black;\r\n  padding: 12px 16px;\r\n  font-family: daimler !important; \r\n  text-decoration: none;\r\n  display: block;\r\n  cursor: default;\r\n}\r\n  \r\n  .dropdown-content a:hover {background-color: #ddd;}\r\n  \r\n  .dropdown-content {\r\n  border: solid 1 px black;\r\n  display: block;\r\n}\r\n  \r\n  .disabledClass { \r\n  display: none;\r\n  border-width: 0px;\r\n}\r\n  \r\n  .footer{\r\n    font-family: daimler !important;\r\n    background-color: #e0e0d1;\r\n    text-align:center;\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    width: 100%;\r\n    color: grey;\r\n    text-align: center;\r\n    font-size: 12px;\r\n  }\r\n  \r\n  ul{\r\n    position:absolute;\r\n    margin-top:260px;\r\n    margin-left:650px;\r\n    -webkit-transform:translate(-50%,-50%);\r\n            transform:translate(-50%,-50%);\r\n    display:flex;\r\n  \r\n  }\r\n  \r\n  ul li{\r\n    list-style:none;\r\n    width:6px;\r\n    height:20px;\r\n    background:#005cab;\r\n    margin : 0 4px;\r\n    -webkit-animation: animate .7s infinite alternate;\r\n            animation: animate .7s infinite alternate;\r\n  \r\n  }\r\n  \r\n  @-webkit-keyframes animate{\r\n    0%{\r\n      -webkit-transform:scaleY(1);\r\n              transform:scaleY(1);\r\n    }\r\n    25%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   50%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   75%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   100%{\r\n     -webkit-transform:scaleY(3);\r\n             transform:scaleY(3);\r\n   }\r\n  }\r\n  \r\n  @keyframes animate{\r\n    0%{\r\n      -webkit-transform:scaleY(1);\r\n              transform:scaleY(1);\r\n    }\r\n    25%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   50%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   75%{\r\n     -webkit-transform:scaleY(1);\r\n             transform:scaleY(1);\r\n   }\r\n   100%{\r\n     -webkit-transform:scaleY(3);\r\n             transform:scaleY(3);\r\n   }\r\n  }\r\n  \r\n  ul li:nth-child(1){\r\n    -webkit-animation-delay: .1s;\r\n            animation-delay: .1s;\r\n  }\r\n  \r\n  ul li:nth-child(2){\r\n   -webkit-animation-delay: .2s;\r\n           animation-delay: .2s;\r\n  }\r\n  \r\n  ul li:nth-child(3){\r\n   -webkit-animation-delay: .3s;\r\n           animation-delay: .3s;\r\n  }\r\n  \r\n  ul li:nth-child(4){\r\n   -webkit-animation-delay: .4s;\r\n           animation-delay: .4s;\r\n  }\r\n  \r\n  ul li:nth-child(5){\r\n   -webkit-animation-delay: .5s;\r\n           animation-delay: .5s;\r\n  }\r\n  \r\n  ul li:nth-child(6){\r\n   -webkit-animation-delay: .6s;\r\n           animation-delay: .6s;\r\n  } \r\n  \r\n  \r\n  \r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlldy1wdXJjaGFzZS92aWV3LXB1cmNoYXNlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0lBRUkseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixVQUFVOzs7RUFHWjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLFVBQVU7RUFDWjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLCtCQUErQjtJQUMvQixpQkFBaUI7SUFDakIsVUFBVTtFQUNaOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYixVQUFVO0lBQ1YsZUFBZTtJQUNmLFdBQVc7SUFDWCwrQkFBK0I7RUFDakM7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsK0JBQStCO0lBQy9CLGVBQWU7SUFDZixhQUFhO0lBQ2IsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxtQ0FBbUM7RUFDckM7O0VBRUE7SUFDRSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0VBQ3BCOztFQUlBO0lBQ0UsdUJBQXVCO0VBQ3pCOztFQUdBO0lBQ0UsV0FBVztJQUNYLFdBQVc7SUFDWCx5QkFBeUI7SUFDekIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQiwrQkFBK0I7RUFDakM7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsV0FBVztJQUNYLHlCQUF5QjtJQUN6QixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLCtCQUErQjtFQUNqQzs7RUFHQTtJ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QUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxpREFBeUM7WUFBekMseUNBQXlDOztFQUUzQzs7RUFFQTtJQUNFO01BQ0UsMkJBQW1CO2NBQW5CLG1CQUFtQjtJQUNyQjtJQUNBO0tBQ0MsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtHQUNBO0tBQ0UsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtHQUNBO0tBQ0UsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtHQUNBO0tBQ0UsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtFQUNEOztFQWhCQTtJQUNFO01BQ0UsMkJBQW1CO2NBQW5CLG1CQUFtQjtJQUNyQjtJQUNBO0tBQ0MsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtHQUNBO0tBQ0UsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtHQUNBO0tBQ0UsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtHQUNBO0tBQ0UsMkJBQW1CO2FBQW5CLG1CQUFtQjtHQUNyQjtFQUNEOztFQUVBO0lBQ0UsNEJBQW9CO1lBQXBCLG9CQUFvQjtFQUN0Qjs7RUFDQTtHQUNDLDRCQUFvQjtXQUFwQixvQkFBb0I7RUFDckI7O0VBQ0E7R0FDQyw0QkFBb0I7V0FBcEIsb0JBQW9CO0VBQ3JCOztFQUNBO0dBQ0MsNEJBQW9CO1dBQXBCLG9CQUFvQjtFQUNyQjs7RUFDQTtHQUNDLDRCQUFvQjtXQUFwQixvQkFBb0I7RUFDckI7O0VBQ0E7R0FDQyw0QkFBb0I7V0FBcEIsb0JBQW9CO0VBQ3JCIiwiZmlsZSI6InNyYy9hcHAvdmlldy1wdXJjaGFzZS92aWV3LXB1cmNoYXNlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVye1xyXG4gICBcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDJhNjU7XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gIFxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gICNzcnNfbG9nb3tcclxuICAgIHdpZHRoOjEzMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NDBweDtcclxuICAgIC8qIGhlaWdodDo2MHB4OyAqL1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICB9XHJcblxyXG4gICNzcnNfbmFtZXtcclxuICAgIHdpZHRoOjUwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6NzBweDtcclxuICAgIG1hcmdpbi10b3A6MjBweDtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICAgIGZvbnQtc2l6ZTogMzJwdDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICAvKiBoZWlnaHQ6NjBweDsgKi9cclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgfVxyXG4gIFxyXG4gICNob3N0ZWxfbmFtZXtcclxuICAgIG1hcmdpbi10b3A6MzVweDtcclxuICAgIGNvbG9yOiM1ZGY3ZDE7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgZm9udC1zaXplOiAxNHB0O1xyXG4gICAgd2lkdGg6MjkwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICAjaG9yaXpvbnRhbF9uYXZ7XHJcbiAgICBtYXJnaW4tbGVmdDo3NzBweDtcclxuICB9XHJcbiAgXHJcbiAgI3Nyc190ZXh0e1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBjb2xvcjojYTFjMGU3O1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gIH1cclxuICBcclxuICAjc3JzX3RleHQ6aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg3LCAxMzAsIDI1KTtcclxuICB9XHJcbiAgXHJcbiAgI2hvcml6b250YWxfb3B0aW9uc3tcclxuICAgIG1hcmdpbi1sZWZ0OjIwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gIC5ib2R5X2NvbnRlbnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2FkZF9wdXJjaGFzZXtcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgd2lkdGg6MTUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgI3ZpZXdfcHVyY2hhc2V7XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNWNhYjtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6MzkwcHg7XHJcbiAgICBtYXJnaW4tdG9wOjUzcHg7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjbW9kaWZ5X3B1cmNoYXNle1xyXG4gICAgaGVpZ2h0OjUwcHg7XHJcbiAgICB3aWR0aDoxNTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y3Zjc7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIG1hcmdpbi1sZWZ0OjU0MXB4O1xyXG4gICAgbWFyZ2luLXRvcDo1M3B4O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgZmxvYXQ6bGVmdDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgI2xpbmV7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB3aWR0aDogMzBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHdpZHRoOjc3NXB4O1xyXG4gICAgaGVpZ2h0OiAzcHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjIzLCAyMTMsIDIxMyk7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcclxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTsqLyBcclxuICAgIG1hcmdpbi1sZWZ0OiA1NDBweDtcclxuICB9XHJcbiAgXHJcblxyXG4gICNmb3JtX2JudW17XHJcbiAgICBib3JkZXItdG9wOiBub25lO1xyXG4gICAgYm9yZGVyLWxlZnQ6bm9uZTtcclxuICAgIGJvcmRlci1yaWdodDogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b206ICNjY2Mgc29saWQgMXB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6MjYycHg7XHJcbiAgICBmbG9hdDpsZWZ0O1xyXG4gIH1cclxuICBcclxuICBcclxuICAjZm9ybV9ibnVtOmZvY3Vze1xyXG4gICAgYm9yZGVyLXRvcDogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0Om5vbmU7XHJcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogYmx1ZSBzb2xpZCAxcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIFxyXG4gICNzZWFyY2hQdXJjaGFzZV9pZCB7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzoxMHB4O1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGZsb2F0OmxlZnQ7XHJcbiAgICBtYXJnaW4tbGVmdDotMjcwcHg7XHJcbiAgICBtYXJnaW4tdG9wOjJweDtcclxuICAgIC8qIGxlZnQ6MDsgKi9cclxuICAgIHRvcDowO1xyXG4gICAgdHJhbnNpdGlvbjogMC4ycztcclxuICAgIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpO1xyXG4gICAgb3BhY2l0eTowLjU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gICNmb3JtX2JudW06Zm9jdXMgKyAjc2VhcmNoUHVyY2hhc2VfaWQsICNmb3JtX2JudW06bm90KDpwbGFjZWhvbGRlci1zaG93bikgKyAjc2VhcmNoUHVyY2hhc2VfaWQge1xyXG4gICAgb3BhY2l0eToxO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KSB0cmFuc2xhdGVZKC04MCUpIHRyYW5zbGF0ZVgoLTIwcHgpO1xyXG4gIH1cclxuICBcclxuXHJcblxyXG4gICNzZWFyY2gge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGNvbG9yOiBibHVlO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAudGFibGUtaGVhZGluZy1jb250YWluZXJ7XHJcbiAgICB3aWR0aDoxMDc1cHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMjEwcHg7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAudGFibGUtY29udGFpbmVye1xyXG4gICAgaGVpZ2h0OiAzNTBweDtcclxuICAgIHdpZHRoOjEwNzVweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBtYXJnaW4tdG9wOiAzODRweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyNDBweDtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAvKiBtYXJnaW4tYm90dG9tOiAxMDAwcHg7ICovXHJcbiAgfVxyXG5cclxuXHJcbiAgLnRhYmxlLWNvbnRhaW5lcjF7XHJcbiAgICBoZWlnaHQ6IDI4MHB4O1xyXG4gICAgd2lkdGg6MTA5NHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIG1hcmdpbi10b3A6IDM0NnB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI0MHB4O1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICAvKiBtYXJnaW4tYm90dG9tOiAxMDAwcHg7ICovXHJcbiAgfVxyXG5cclxuXHJcbiAgdGFibGUgeyBcclxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XHJcbiAgICBmb250LWZhbWlseTogZGFpbWxlciAhaW1wb3J0YW50OyBcclxuICAgIGZvbnQtc2l6ZTpsYXJnZTsgXHJcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyBcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2FjYWNhYzsgXHJcbiAgfSBcclxuXHJcbiAgdGh7XHJcbiAgICBjb2xvcjogYmxhY2s7IFxyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGhlaWdodDozNXB4O1xyXG5cclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICNhY2FjYWM7IFxyXG4gIH1cclxuXHJcbiAgdHJ7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjYWNhY2FjOyBcclxuICAgIFxyXG4gIH1cclxuICBcclxuICB0ZCB7IFxyXG4gIFxyXG4gICAgYm9yZGVyOiAycHggc29saWQgI2FjYWNhYzsgXHJcbiAgfVxyXG5cclxuICAjaW5rZ3N7XHJcbiAgICBmb250LXN0eWxlOml0YWxpYztcclxuICAgIGZvbnQtc2l6ZTogOHB0O1xyXG4gIFxyXG4gIH1cclxuXHJcbiAgXHJcblxyXG4uZHJvcGRvd24tY29udGVudHtcclxuICBcclxuICAvKiB3aWR0aDogMjYycHg7ICovXHJcbiAgei1pbmRleDogMTtcclxuICBtaW4td2lkdGg6IDI2MnB4O1xyXG4gIG1hcmdpbi10b3A6IDE3MHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiA5OTBweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBzb2xpZCAjY2FjYWNhO1xyXG4gIGJvcmRlci13aWR0aDogMS41cHggMS41cHggMS41cHggMS41cHg7XHJcbiAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsMCwwLDAuMik7XHJcbn1cclxuXHJcblxyXG4uZHJvcGRvd24tY29udGVudCBhIHtcclxuICBjb2xvcjogYmxhY2s7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gIGZvbnQtZmFtaWx5OiBkYWltbGVyICFpbXBvcnRhbnQ7IFxyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBjdXJzb3I6IGRlZmF1bHQ7XHJcbn1cclxuXHJcblxyXG4uZHJvcGRvd24tY29udGVudCBhOmhvdmVyIHtiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO31cclxuXHJcbi5kcm9wZG93bi1jb250ZW50IHtcclxuICBib3JkZXI6IHNvbGlkIDEgcHggYmxhY2s7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcblxyXG5cclxuLmRpc2FibGVkQ2xhc3MgeyBcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIGJvcmRlci13aWR0aDogMHB4O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAuZm9vdGVye1xyXG4gICAgZm9udC1mYW1pbHk6IGRhaW1sZXIgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlMGUwZDE7XHJcbiAgICB0ZXh0LWFsaWduOmNlbnRlcjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGNvbG9yOiBncmV5O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gIH1cclxuICBcclxuICB1bHtcclxuICAgIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gICAgbWFyZ2luLXRvcDoyNjBweDtcclxuICAgIG1hcmdpbi1sZWZ0OjY1MHB4O1xyXG4gICAgdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gIFxyXG4gIH1cclxuICBcclxuICB1bCBsaXtcclxuICAgIGxpc3Qtc3R5bGU6bm9uZTtcclxuICAgIHdpZHRoOjZweDtcclxuICAgIGhlaWdodDoyMHB4O1xyXG4gICAgYmFja2dyb3VuZDojMDA1Y2FiO1xyXG4gICAgbWFyZ2luIDogMCA0cHg7XHJcbiAgICBhbmltYXRpb246IGFuaW1hdGUgLjdzIGluZmluaXRlIGFsdGVybmF0ZTtcclxuICBcclxuICB9XHJcbiAgXHJcbiAgQGtleWZyYW1lcyBhbmltYXRle1xyXG4gICAgMCV7XHJcbiAgICAgIHRyYW5zZm9ybTpzY2FsZVkoMSk7XHJcbiAgICB9XHJcbiAgICAyNSV7XHJcbiAgICAgdHJhbnNmb3JtOnNjYWxlWSgxKTtcclxuICAgfVxyXG4gICA1MCV7XHJcbiAgICAgdHJhbnNmb3JtOnNjYWxlWSgxKTtcclxuICAgfVxyXG4gICA3NSV7XHJcbiAgICAgdHJhbnNmb3JtOnNjYWxlWSgxKTtcclxuICAgfVxyXG4gICAxMDAle1xyXG4gICAgIHRyYW5zZm9ybTpzY2FsZVkoMyk7XHJcbiAgIH1cclxuICB9XHJcbiAgXHJcbiAgdWwgbGk6bnRoLWNoaWxkKDEpe1xyXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAuMXM7XHJcbiAgfVxyXG4gIHVsIGxpOm50aC1jaGlsZCgyKXtcclxuICAgYW5pbWF0aW9uLWRlbGF5OiAuMnM7XHJcbiAgfVxyXG4gIHVsIGxpOm50aC1jaGlsZCgzKXtcclxuICAgYW5pbWF0aW9uLWRlbGF5OiAuM3M7XHJcbiAgfVxyXG4gIHVsIGxpOm50aC1jaGlsZCg0KXtcclxuICAgYW5pbWF0aW9uLWRlbGF5OiAuNHM7XHJcbiAgfVxyXG4gIHVsIGxpOm50aC1jaGlsZCg1KXtcclxuICAgYW5pbWF0aW9uLWRlbGF5OiAuNXM7XHJcbiAgfVxyXG4gIHVsIGxpOm50aC1jaGlsZCg2KXtcclxuICAgYW5pbWF0aW9uLWRlbGF5OiAuNnM7XHJcbiAgfSBcclxuICBcclxuICBcclxuICBcclxuICAiXX0= */"

/***/ }),

/***/ "./src/app/view-purchase/view-purchase.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/view-purchase/view-purchase.component.ts ***!
  \**********************************************************/
/*! exports provided: ViewPurchaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPurchaseComponent", function() { return ViewPurchaseComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");



//import { ViewPurchase } from './view-purchase';


let ViewPurchaseComponent = class ViewPurchaseComponent {
    constructor(http, datePipe) {
        this.http = http;
        this.datePipe = datePipe;
        this.model = {};
        this.searchValue = '';
        this.myDate = new Date();
        this.errorMessage = "";
        this.isErrorMessage = false;
        this.Dates = {
            fromDate: '',
            toDate: ''
        };
        this.display_mode = 'none';
        this.display_dropdown = 'none';
        this.opacity_property = '0.5';
        this.color_property = '#ccc';
        this.cursor_property = 'none';
        this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    }
    ngOnInit() {
    }
    checkDate() {
        this.fromDate = new _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]('en-US').transform(this.Dates.fromDate, 'dd-MM-yyyy');
        this.toDate = new _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]('en-US').transform(this.Dates.toDate, 'dd-MM-yyyy');
        //alert("From date "+this.fromdate+" To date "+this.todate);
    }
    openFile() {
        // alert("Hello");
    }
    changeItem() {
        this.display_mode = 'none';
        this.isErrorMessage = false;
    }
    textAreaEmpty(event) {
        this.opacity_property = '0.5';
        this.color_property = '#ccc';
        this.cursor_property = 'none';
        this.display_mode = 'none';
    }
    onKey(event) {
        this.display_dropdown = 'block';
        let formData = new FormData();
        this.vendor_name = event.target.value;
        var temp = 'http://localhost:9090/webapp/getVendors/' + this.vendor_name;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => res.json())).subscribe(data => {
            console.log("Data is ", data);
            this.vendorList = data;
            if (!this.vendorList.length) {
                //alert("Empty list")
                // this.border_top_dimension='0px';
                this.display_dropdown = 'none';
            }
            console.log("vendors list ", this.vendorList);
        });
    }
    onKeydown(event) {
        this.display_mode = 'none';
    }
    closeDiv() {
        alert('Hi Sudeendra');
    }
    // textAreaEmpty(){
    //     //console.log('Value in search field '+this.searchValue);
    //     if (this.searchValue == "") {
    //       console.log("Value cleared");
    //       this.display_dropdown= 'none';
    //     }
    // }
    getUrlText(val) {
        //alert(val);
        this.model['search'] = val;
        this.display_dropdown = 'none';
        this.vendor_name_on_submit = val;
        this.color_property = 'blue';
        this.cursor_property = 'auto';
        this.opacity_property = '1';
    }
    findPurchaseData() {
        this.checkDate();
        let vendor_name;
        //alert("Vendor name "+this.vendor_name_on_submit);
        this.show = true;
        var temp = 'http://localhost:9090/getPurchase/' + this.vendor_name_on_submit + '?fromdate=' + this.fromDate + '&todate=' + this.toDate;
        this.http.get(temp).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(res => res.json())).subscribe(res => {
            console.log("purchase data: ", res);
            this.purchaseList = res;
            this.show = false;
            if (!this.purchaseList.length) {
                //alert("Empty list")
                this.display_mode = 'none';
                this.isErrorMessage = true;
                this.errorMessage = "No Records Found";
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '273px';
            }
            else if (this.purchaseList.length < 12) {
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.lessthan12 = true;
                this.greaterthan12 = false;
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '273px';
            }
            else if (this.purchaseList.length >= 12) {
                this.lessthan12 = false;
                this.greaterthan12 = true;
                this.isErrorMessage = false;
                this.display_mode = "block";
                this.margin_top_onclick = '0px';
                this.table_container_marg_top = '273px';
            }
        }, err => {
            this.display_mode = 'none';
            this.isErrorMessage = true;
            this.show = false;
            this.errorMessage = "No Records Found";
            console.log(this.errorMessage);
        });
    }
};
ViewPurchaseComponent.ctorParameters = () => [
    { type: _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"] }
];
ViewPurchaseComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-view-purchase',
        template: __webpack_require__(/*! raw-loader!./view-purchase.component.html */ "./node_modules/raw-loader/index.js!./src/app/view-purchase/view-purchase.component.html"),
        providers: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]],
        styles: [__webpack_require__(/*! ./view-purchase.component.css */ "./src/app/view-purchase/view-purchase.component.css")]
    })
], ViewPurchaseComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! H:\Angular Projects\Bharath_SRS\Bharath\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map