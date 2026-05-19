"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i8 = decorators.length - 1, decorator; i8 >= 0; i8--)
      if (decorator = decorators[i8])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/object-keys/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/object-keys/isArguments.js"(exports, module) {
      "use strict";
      var toStr = Object.prototype.toString;
      module.exports = function isArguments(value) {
        var str = toStr.call(value);
        var isArgs = str === "[object Arguments]";
        if (!isArgs) {
          isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
        }
        return isArgs;
      };
    }
  });

  // node_modules/object-keys/implementation.js
  var require_implementation = __commonJS({
    "node_modules/object-keys/implementation.js"(exports, module) {
      "use strict";
      var keysShim;
      if (!Object.keys) {
        has2 = Object.prototype.hasOwnProperty;
        toStr = Object.prototype.toString;
        isArgs = require_isArguments();
        isEnumerable = Object.prototype.propertyIsEnumerable;
        hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
        hasProtoEnumBug = isEnumerable.call(function() {
        }, "prototype");
        dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor"
        ];
        equalsConstructorPrototype = function(o7) {
          var ctor = o7.constructor;
          return ctor && ctor.prototype === o7;
        };
        excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $innerHeight: true,
          $innerWidth: true,
          $onmozfullscreenchange: true,
          $onmozfullscreenerror: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        hasAutomationEqualityBug = function() {
          if (typeof window === "undefined") {
            return false;
          }
          for (var k3 in window) {
            try {
              if (!excludedKeys["$" + k3] && has2.call(window, k3) && window[k3] !== null && typeof window[k3] === "object") {
                try {
                  equalsConstructorPrototype(window[k3]);
                } catch (e8) {
                  return true;
                }
              }
            } catch (e8) {
              return true;
            }
          }
          return false;
        }();
        equalsConstructorPrototypeIfNotBuggy = function(o7) {
          if (typeof window === "undefined" || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o7);
          }
          try {
            return equalsConstructorPrototype(o7);
          } catch (e8) {
            return false;
          }
        };
        keysShim = function keys(object) {
          var isObject = object !== null && typeof object === "object";
          var isFunction2 = toStr.call(object) === "[object Function]";
          var isArguments = isArgs(object);
          var isString = isObject && toStr.call(object) === "[object String]";
          var theKeys = [];
          if (!isObject && !isFunction2 && !isArguments) {
            throw new TypeError("Object.keys called on a non-object");
          }
          var skipProto = hasProtoEnumBug && isFunction2;
          if (isString && object.length > 0 && !has2.call(object, 0)) {
            for (var i8 = 0; i8 < object.length; ++i8) {
              theKeys.push(String(i8));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j3 = 0; j3 < object.length; ++j3) {
              theKeys.push(String(j3));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === "prototype") && has2.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k3 = 0; k3 < dontEnums.length; ++k3) {
              if (!(skipConstructor && dontEnums[k3] === "constructor") && has2.call(object, dontEnums[k3])) {
                theKeys.push(dontEnums[k3]);
              }
            }
          }
          return theKeys;
        };
      }
      var has2;
      var toStr;
      var isArgs;
      var isEnumerable;
      var hasDontEnumBug;
      var hasProtoEnumBug;
      var dontEnums;
      var equalsConstructorPrototype;
      var excludedKeys;
      var hasAutomationEqualityBug;
      var equalsConstructorPrototypeIfNotBuggy;
      module.exports = keysShim;
    }
  });

  // node_modules/object-keys/index.js
  var require_object_keys = __commonJS({
    "node_modules/object-keys/index.js"(exports, module) {
      "use strict";
      var slice = Array.prototype.slice;
      var isArgs = require_isArguments();
      var origKeys = Object.keys;
      var keysShim = origKeys ? function keys(o7) {
        return origKeys(o7);
      } : require_implementation();
      var originalKeys = Object.keys;
      keysShim.shim = function shimObjectKeys() {
        if (Object.keys) {
          var keysWorksWithArguments = function() {
            var args = Object.keys(arguments);
            return args && args.length === arguments.length;
          }(1, 2);
          if (!keysWorksWithArguments) {
            Object.keys = function keys(object) {
              if (isArgs(object)) {
                return originalKeys(slice.call(object));
              }
              return originalKeys(object);
            };
          }
        } else {
          Object.keys = keysShim;
        }
        return Object.keys || keysShim;
      };
      module.exports = keysShim;
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e8) {
          $defineProperty = false;
        }
      }
      module.exports = $defineProperty;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js"(exports, module) {
      "use strict";
      module.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js"(exports, module) {
      "use strict";
      module.exports = TypeError;
    }
  });

  // node_modules/gopd/gOPD.js
  var require_gOPD = __commonJS({
    "node_modules/gopd/gOPD.js"(exports, module) {
      "use strict";
      module.exports = Object.getOwnPropertyDescriptor;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js"(exports, module) {
      "use strict";
      var $gOPD = require_gOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e8) {
          $gOPD = null;
        }
      }
      module.exports = $gOPD;
    }
  });

  // node_modules/define-data-property/index.js
  var require_define_data_property = __commonJS({
    "node_modules/define-data-property/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var gopd = require_gopd();
      module.exports = function defineDataProperty(obj, property, value) {
        if (!obj || typeof obj !== "object" && typeof obj !== "function") {
          throw new $TypeError("`obj` must be an object or a function`");
        }
        if (typeof property !== "string" && typeof property !== "symbol") {
          throw new $TypeError("`property` must be a string or a symbol`");
        }
        if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
          throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
          throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
          throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
        }
        if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
          throw new $TypeError("`loose`, if provided, must be a boolean");
        }
        var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
        var nonWritable = arguments.length > 4 ? arguments[4] : null;
        var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
        var loose = arguments.length > 6 ? arguments[6] : false;
        var desc = !!gopd && gopd(obj, property);
        if ($defineProperty) {
          $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
          });
        } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
          obj[property] = value;
        } else {
          throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
        }
      };
    }
  });

  // node_modules/has-property-descriptors/index.js
  var require_has_property_descriptors = __commonJS({
    "node_modules/has-property-descriptors/index.js"(exports, module) {
      "use strict";
      var $defineProperty = require_es_define_property();
      var hasPropertyDescriptors = function hasPropertyDescriptors2() {
        return !!$defineProperty;
      };
      hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
        if (!$defineProperty) {
          return null;
        }
        try {
          return $defineProperty([], "length", { value: 1 }).length !== 1;
        } catch (e8) {
          return true;
        }
      };
      module.exports = hasPropertyDescriptors;
    }
  });

  // node_modules/define-properties/index.js
  var require_define_properties = __commonJS({
    "node_modules/define-properties/index.js"(exports, module) {
      "use strict";
      var keys = require_object_keys();
      var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
      var toStr = Object.prototype.toString;
      var concat = Array.prototype.concat;
      var defineDataProperty = require_define_data_property();
      var isFunction2 = function(fn2) {
        return typeof fn2 === "function" && toStr.call(fn2) === "[object Function]";
      };
      var supportsDescriptors = require_has_property_descriptors()();
      var defineProperty = function(object, name, value, predicate) {
        if (name in object) {
          if (predicate === true) {
            if (object[name] === value) {
              return;
            }
          } else if (!isFunction2(predicate) || !predicate()) {
            return;
          }
        }
        if (supportsDescriptors) {
          defineDataProperty(object, name, value, true);
        } else {
          defineDataProperty(object, name, value);
        }
      };
      var defineProperties = function(object, map) {
        var predicates = arguments.length > 2 ? arguments[2] : {};
        var props = keys(map);
        if (hasSymbols) {
          props = concat.call(props, Object.getOwnPropertySymbols(map));
        }
        for (var i8 = 0; i8 < props.length; i8 += 1) {
          defineProperty(object, props[i8], map[props[i8]], predicates[props[i8]]);
        }
      };
      defineProperties.supportsDescriptors = !!supportsDescriptors;
      module.exports = defineProperties;
    }
  });

  // node_modules/es-object-atoms/index.js
  var require_es_object_atoms = __commonJS({
    "node_modules/es-object-atoms/index.js"(exports, module) {
      "use strict";
      module.exports = Object;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js"(exports, module) {
      "use strict";
      module.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js"(exports, module) {
      "use strict";
      module.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js"(exports, module) {
      "use strict";
      module.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js"(exports, module) {
      "use strict";
      module.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js"(exports, module) {
      "use strict";
      module.exports = URIError;
    }
  });

  // node_modules/math-intrinsics/abs.js
  var require_abs = __commonJS({
    "node_modules/math-intrinsics/abs.js"(exports, module) {
      "use strict";
      module.exports = Math.abs;
    }
  });

  // node_modules/math-intrinsics/floor.js
  var require_floor = __commonJS({
    "node_modules/math-intrinsics/floor.js"(exports, module) {
      "use strict";
      module.exports = Math.floor;
    }
  });

  // node_modules/math-intrinsics/max.js
  var require_max = __commonJS({
    "node_modules/math-intrinsics/max.js"(exports, module) {
      "use strict";
      module.exports = Math.max;
    }
  });

  // node_modules/math-intrinsics/min.js
  var require_min = __commonJS({
    "node_modules/math-intrinsics/min.js"(exports, module) {
      "use strict";
      module.exports = Math.min;
    }
  });

  // node_modules/math-intrinsics/pow.js
  var require_pow = __commonJS({
    "node_modules/math-intrinsics/pow.js"(exports, module) {
      "use strict";
      module.exports = Math.pow;
    }
  });

  // node_modules/math-intrinsics/round.js
  var require_round = __commonJS({
    "node_modules/math-intrinsics/round.js"(exports, module) {
      "use strict";
      module.exports = Math.round;
    }
  });

  // node_modules/math-intrinsics/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/math-intrinsics/isNaN.js"(exports, module) {
      "use strict";
      module.exports = Number.isNaN || function isNaN2(a4) {
        return a4 !== a4;
      };
    }
  });

  // node_modules/math-intrinsics/sign.js
  var require_sign = __commonJS({
    "node_modules/math-intrinsics/sign.js"(exports, module) {
      "use strict";
      var $isNaN = require_isNaN();
      module.exports = function sign(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports, module) {
      "use strict";
      module.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _3 in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports, module) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/get-proto/Reflect.getPrototypeOf.js
  var require_Reflect_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
    }
  });

  // node_modules/get-proto/Object.getPrototypeOf.js
  var require_Object_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
      "use strict";
      var $Object = require_es_object_atoms();
      module.exports = $Object.getPrototypeOf || null;
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation2 = __commonJS({
    "node_modules/function-bind/implementation.js"(exports, module) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a4, b4) {
        var arr = [];
        for (var i8 = 0; i8 < a4.length; i8 += 1) {
          arr[i8] = a4[i8];
        }
        for (var j3 = 0; j3 < b4.length; j3 += 1) {
          arr[j3 + a4.length] = b4[j3];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i8 = offset || 0, j3 = 0; i8 < arrLike.length; i8 += 1, j3 += 1) {
          arr[j3] = arrLike[i8];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i8 = 0; i8 < arr.length; i8 += 1) {
          str += arr[i8];
          if (i8 + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module.exports = function bind2(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for (var i8 = 0; i8 < boundLength; i8++) {
          boundArgs[i8] = "$" + i8;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports, module) {
      "use strict";
      var implementation = require_implementation2();
      module.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/call-bind-apply-helpers/functionCall.js
  var require_functionCall = __commonJS({
    "node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
      "use strict";
      module.exports = Function.prototype.call;
    }
  });

  // node_modules/call-bind-apply-helpers/functionApply.js
  var require_functionApply = __commonJS({
    "node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
      "use strict";
      module.exports = Function.prototype.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/reflectApply.js
  var require_reflectApply = __commonJS({
    "node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
      "use strict";
      module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/actualApply.js
  var require_actualApply = __commonJS({
    "node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
      "use strict";
      var bind2 = require_function_bind();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var $reflectApply = require_reflectApply();
      module.exports = $reflectApply || bind2.call($call, $apply);
    }
  });

  // node_modules/call-bind-apply-helpers/index.js
  var require_call_bind_apply_helpers = __commonJS({
    "node_modules/call-bind-apply-helpers/index.js"(exports, module) {
      "use strict";
      var bind2 = require_function_bind();
      var $TypeError = require_type();
      var $call = require_functionCall();
      var $actualApply = require_actualApply();
      module.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind2, $call, args);
      };
    }
  });

  // node_modules/dunder-proto/get.js
  var require_get = __commonJS({
    "node_modules/dunder-proto/get.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind_apply_helpers();
      var gOPD = require_gopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e8) {
        if (!e8 || typeof e8 !== "object" || !("code" in e8) || e8.code !== "ERR_PROTO_ACCESS") {
          throw e8;
        }
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
    }
  });

  // node_modules/get-proto/index.js
  var require_get_proto = __commonJS({
    "node_modules/get-proto/index.js"(exports, module) {
      "use strict";
      var reflectGetProto = require_Reflect_getPrototypeOf();
      var originalGetProto = require_Object_getPrototypeOf();
      var getDunderProto = require_get();
      module.exports = reflectGetProto ? function getProto(O2) {
        return reflectGetProto(O2);
      } : originalGetProto ? function getProto(O2) {
        if (!O2 || typeof O2 !== "object" && typeof O2 !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O2);
      } : getDunderProto ? function getProto(O2) {
        return getDunderProto(O2);
      } : null;
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js"(exports, module) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind2 = require_function_bind();
      module.exports = bind2.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports, module) {
      "use strict";
      var undefined2;
      var $Object = require_es_object_atoms();
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var abs = require_abs();
      var floor = require_floor();
      var max = require_max();
      var min = require_min();
      var pow = require_pow();
      var round = require_round();
      var sign = require_sign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e8) {
        }
      };
      var $gOPD = require_gopd();
      var $defineProperty = require_es_define_property();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      }() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = require_get_proto();
      var $ObjectGPO = require_Object_getPrototypeOf();
      var $ReflectGPO = require_Reflect_getPrototypeOf();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max,
        "%Math.min%": min,
        "%Math.pow%": pow,
        "%Math.round%": round,
        "%Math.sign%": sign,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto) {
        try {
          null.error;
        } catch (e8) {
          errorProto = getProto(getProto(e8));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn2 = doEval2("%AsyncGeneratorFunction%");
          if (fn2) {
            value = fn2.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind2 = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind2.call($call, Array.prototype.concat);
      var $spliceApply = bind2.call($apply, Array.prototype.splice);
      var $replace = bind2.call($call, String.prototype.replace);
      var $strSlice = bind2.call($call, String.prototype.slice);
      var $exec = bind2.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i8 = 1, isOwn = true; i8 < parts.length; i8 += 1) {
          var part = parts[i8];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void 0;
            }
            if ($gOPD && i8 + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/set-function-length/index.js
  var require_set_function_length = __commonJS({
    "node_modules/set-function-length/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var define = require_define_data_property();
      var hasDescriptors = require_has_property_descriptors()();
      var gOPD = require_gopd();
      var $TypeError = require_type();
      var $floor = GetIntrinsic("%Math.floor%");
      module.exports = function setFunctionLength(fn2, length) {
        if (typeof fn2 !== "function") {
          throw new $TypeError("`fn` is not a function");
        }
        if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
          throw new $TypeError("`length` must be a positive 32-bit integer");
        }
        var loose = arguments.length > 2 && !!arguments[2];
        var functionLengthIsConfigurable = true;
        var functionLengthIsWritable = true;
        if ("length" in fn2 && gOPD) {
          var desc = gOPD(fn2, "length");
          if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
          }
          if (desc && !desc.writable) {
            functionLengthIsWritable = false;
          }
        }
        if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
          if (hasDescriptors) {
            define(
              /** @type {Parameters<define>[0]} */
              fn2,
              "length",
              length,
              true,
              true
            );
          } else {
            define(
              /** @type {Parameters<define>[0]} */
              fn2,
              "length",
              length
            );
          }
        }
        return fn2;
      };
    }
  });

  // node_modules/call-bind-apply-helpers/applyBind.js
  var require_applyBind = __commonJS({
    "node_modules/call-bind-apply-helpers/applyBind.js"(exports, module) {
      "use strict";
      var bind2 = require_function_bind();
      var $apply = require_functionApply();
      var actualApply = require_actualApply();
      module.exports = function applyBind() {
        return actualApply(bind2, $apply, arguments);
      };
    }
  });

  // node_modules/call-bind/index.js
  var require_call_bind = __commonJS({
    "node_modules/call-bind/index.js"(exports, module) {
      "use strict";
      var setFunctionLength = require_set_function_length();
      var $defineProperty = require_es_define_property();
      var callBindBasic = require_call_bind_apply_helpers();
      var applyBind = require_applyBind();
      module.exports = function callBind(originalFunction) {
        var func = callBindBasic(arguments);
        var adjustedLength = originalFunction.length - (arguments.length - 1);
        return setFunctionLength(
          func,
          1 + (adjustedLength > 0 ? adjustedLength : 0),
          true
        );
      };
      if ($defineProperty) {
        $defineProperty(module.exports, "apply", { value: applyBind });
      } else {
        module.exports.apply = applyBind;
      }
    }
  });

  // node_modules/call-bound/index.js
  var require_call_bound = __commonJS({
    "node_modules/call-bound/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBindBasic = require_call_bind_apply_helpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
    }
  });

  // node_modules/object.assign/implementation.js
  var require_implementation3 = __commonJS({
    "node_modules/object.assign/implementation.js"(exports, module) {
      "use strict";
      var objectKeys = require_object_keys();
      var hasSymbols = require_shams()();
      var callBound = require_call_bound();
      var $Object = require_es_object_atoms();
      var $push = callBound("Array.prototype.push");
      var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
      var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;
      module.exports = function assign(target, source1) {
        if (target == null) {
          throw new TypeError("target must be an object");
        }
        var to = $Object(target);
        if (arguments.length === 1) {
          return to;
        }
        for (var s6 = 1; s6 < arguments.length; ++s6) {
          var from = $Object(arguments[s6]);
          var keys = objectKeys(from);
          var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
          if (getSymbols) {
            var syms = getSymbols(from);
            for (var j3 = 0; j3 < syms.length; ++j3) {
              var key = syms[j3];
              if ($propIsEnumerable(from, key)) {
                $push(keys, key);
              }
            }
          }
          for (var i8 = 0; i8 < keys.length; ++i8) {
            var nextKey = keys[i8];
            if ($propIsEnumerable(from, nextKey)) {
              var propValue = from[nextKey];
              to[nextKey] = propValue;
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/object.assign/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/object.assign/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation3();
      var lacksProperEnumerationOrder = function() {
        if (!Object.assign) {
          return false;
        }
        var str = "abcdefghijklmnopqrst";
        var letters = str.split("");
        var map = {};
        for (var i8 = 0; i8 < letters.length; ++i8) {
          map[letters[i8]] = letters[i8];
        }
        var obj = Object.assign({}, map);
        var actual = "";
        for (var k3 in obj) {
          actual += k3;
        }
        return str !== actual;
      };
      var assignHasPendingExceptions = function() {
        if (!Object.assign || !Object.preventExtensions) {
          return false;
        }
        var thrower = Object.preventExtensions({ 1: 2 });
        try {
          Object.assign(thrower, "xy");
        } catch (e8) {
          return thrower[1] === "y";
        }
        return false;
      };
      module.exports = function getPolyfill() {
        if (!Object.assign) {
          return implementation;
        }
        if (lacksProperEnumerationOrder()) {
          return implementation;
        }
        if (assignHasPendingExceptions()) {
          return implementation;
        }
        return Object.assign;
      };
    }
  });

  // node_modules/object.assign/shim.js
  var require_shim = __commonJS({
    "node_modules/object.assign/shim.js"(exports, module) {
      "use strict";
      var define = require_define_properties();
      var getPolyfill = require_polyfill();
      module.exports = function shimAssign() {
        var polyfill = getPolyfill();
        define(
          Object,
          { assign: polyfill },
          { assign: function() {
            return Object.assign !== polyfill;
          } }
        );
        return polyfill;
      };
    }
  });

  // node_modules/object.assign/index.js
  var require_object = __commonJS({
    "node_modules/object.assign/index.js"(exports, module) {
      "use strict";
      var defineProperties = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation3();
      var getPolyfill = require_polyfill();
      var shim = require_shim();
      var polyfill = callBind.apply(getPolyfill());
      var bound = function assign(target, source1) {
        return polyfill(Object, arguments);
      };
      defineProperties(bound, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = bound;
    }
  });

  // node_modules/call-bind/callBound.js
  var require_callBound = __commonJS({
    "node_modules/call-bind/callBound.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBind = require_call_bind();
      var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
      module.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBind(intrinsic);
        }
        return intrinsic;
      };
    }
  });

  // node_modules/functions-have-names/index.js
  var require_functions_have_names = __commonJS({
    "node_modules/functions-have-names/index.js"(exports, module) {
      "use strict";
      var functionsHaveNames = function functionsHaveNames2() {
        return typeof function f4() {
        }.name === "string";
      };
      var gOPD = Object.getOwnPropertyDescriptor;
      if (gOPD) {
        try {
          gOPD([], "length");
        } catch (e8) {
          gOPD = null;
        }
      }
      functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
        if (!functionsHaveNames() || !gOPD) {
          return false;
        }
        var desc = gOPD(function() {
        }, "name");
        return !!desc && !!desc.configurable;
      };
      var $bind = Function.prototype.bind;
      functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
        return functionsHaveNames() && typeof $bind === "function" && function f4() {
        }.bind().name !== "";
      };
      module.exports = functionsHaveNames;
    }
  });

  // node_modules/set-function-name/index.js
  var require_set_function_name = __commonJS({
    "node_modules/set-function-name/index.js"(exports, module) {
      "use strict";
      var define = require_define_data_property();
      var hasDescriptors = require_has_property_descriptors()();
      var functionsHaveConfigurableNames = require_functions_have_names().functionsHaveConfigurableNames();
      var $TypeError = require_type();
      module.exports = function setFunctionName(fn2, name) {
        if (typeof fn2 !== "function") {
          throw new $TypeError("`fn` is not a function");
        }
        var loose = arguments.length > 2 && !!arguments[2];
        if (!loose || functionsHaveConfigurableNames) {
          if (hasDescriptors) {
            define(
              /** @type {Parameters<define>[0]} */
              fn2,
              "name",
              name,
              true,
              true
            );
          } else {
            define(
              /** @type {Parameters<define>[0]} */
              fn2,
              "name",
              name
            );
          }
        }
        return fn2;
      };
    }
  });

  // node_modules/regexp.prototype.flags/implementation.js
  var require_implementation4 = __commonJS({
    "node_modules/regexp.prototype.flags/implementation.js"(exports, module) {
      "use strict";
      var setFunctionName = require_set_function_name();
      var $TypeError = require_type();
      var $Object = Object;
      module.exports = setFunctionName(function flags() {
        if (this == null || this !== $Object(this)) {
          throw new $TypeError("RegExp.prototype.flags getter called on non-object");
        }
        var result = "";
        if (this.hasIndices) {
          result += "d";
        }
        if (this.global) {
          result += "g";
        }
        if (this.ignoreCase) {
          result += "i";
        }
        if (this.multiline) {
          result += "m";
        }
        if (this.dotAll) {
          result += "s";
        }
        if (this.unicode) {
          result += "u";
        }
        if (this.unicodeSets) {
          result += "v";
        }
        if (this.sticky) {
          result += "y";
        }
        return result;
      }, "get flags", true);
    }
  });

  // node_modules/regexp.prototype.flags/polyfill.js
  var require_polyfill2 = __commonJS({
    "node_modules/regexp.prototype.flags/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation4();
      var supportsDescriptors = require_define_properties().supportsDescriptors;
      var $gOPD = Object.getOwnPropertyDescriptor;
      module.exports = function getPolyfill() {
        if (supportsDescriptors && /a/mig.flags === "gim") {
          var descriptor = $gOPD(RegExp.prototype, "flags");
          if (descriptor && typeof descriptor.get === "function" && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
            var calls = "";
            var o7 = {};
            Object.defineProperty(o7, "hasIndices", {
              get: function() {
                calls += "d";
              }
            });
            Object.defineProperty(o7, "sticky", {
              get: function() {
                calls += "y";
              }
            });
            descriptor.get.call(o7);
            if (calls === "dy") {
              return descriptor.get;
            }
          }
        }
        return implementation;
      };
    }
  });

  // node_modules/regexp.prototype.flags/shim.js
  var require_shim2 = __commonJS({
    "node_modules/regexp.prototype.flags/shim.js"(exports, module) {
      "use strict";
      var supportsDescriptors = require_define_properties().supportsDescriptors;
      var getPolyfill = require_polyfill2();
      var gOPD = require_gopd();
      var defineProperty = Object.defineProperty;
      var $TypeError = require_es_errors();
      var getProto = require_get_proto();
      var regex = /a/;
      module.exports = function shimFlags() {
        if (!supportsDescriptors || !getProto) {
          throw new $TypeError("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
        }
        var polyfill = getPolyfill();
        var proto = getProto(regex);
        var descriptor = gOPD(proto, "flags");
        if (!descriptor || descriptor.get !== polyfill) {
          defineProperty(proto, "flags", {
            configurable: true,
            enumerable: false,
            get: polyfill
          });
        }
        return polyfill;
      };
    }
  });

  // node_modules/regexp.prototype.flags/index.js
  var require_regexp_prototype = __commonJS({
    "node_modules/regexp.prototype.flags/index.js"(exports, module) {
      "use strict";
      var define = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation4();
      var getPolyfill = require_polyfill2();
      var shim = require_shim2();
      var flagsBound = callBind(getPolyfill());
      define(flagsBound, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = flagsBound;
    }
  });

  // node_modules/has-tostringtag/shams.js
  var require_shams2 = __commonJS({
    "node_modules/has-tostringtag/shams.js"(exports, module) {
      "use strict";
      var hasSymbols = require_shams();
      module.exports = function hasToStringTagShams() {
        return hasSymbols() && !!Symbol.toStringTag;
      };
    }
  });

  // node_modules/is-arguments/index.js
  var require_is_arguments = __commonJS({
    "node_modules/is-arguments/index.js"(exports, module) {
      "use strict";
      var hasToStringTag = require_shams2()();
      var callBound = require_call_bound();
      var $toString = callBound("Object.prototype.toString");
      var isStandardArguments = function isArguments(value) {
        if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
          return false;
        }
        return $toString(value) === "[object Arguments]";
      };
      var isLegacyArguments = function isArguments(value) {
        if (isStandardArguments(value)) {
          return true;
        }
        return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
      };
      var supportsStandardArguments = function() {
        return isStandardArguments(arguments);
      }();
      isStandardArguments.isLegacyArguments = isLegacyArguments;
      module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
    }
  });

  // (disabled):node_modules/object-inspect/util.inspect
  var require_util = __commonJS({
    "(disabled):node_modules/object-inspect/util.inspect"() {
    }
  });

  // node_modules/object-inspect/index.js
  var require_object_inspect = __commonJS({
    "node_modules/object-inspect/index.js"(exports, module) {
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O2) {
        return O2.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require_util();
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      var quotes = {
        __proto__: null,
        "double": '"',
        single: "'"
      };
      var quoteREs = {
        __proto__: null,
        "double": /(["\\])/g,
        single: /(['\\])/g
      };
      module.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has2(opts, "quoteStyle") && !has2(quotes, opts.quoteStyle)) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has2(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has2(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has2(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has2(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has2(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp(obj)) {
          var name = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s6 = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i8 = 0; i8 < attrs.length; i8++) {
            s6 += " " + attrs[i8].name + "=" + wrapQuotes(quote(attrs[i8].value), "double", opts);
          }
          s6 += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s6 += "...";
          }
          s6 += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s6;
        }
        if (isArray(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          }
          if (parts.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap2(obj)) {
          var mapParts = [];
          if (mapForEach) {
            mapForEach.call(obj, function(value, key) {
              mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
            });
          }
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet2(obj)) {
          var setParts = [];
          if (setForEach) {
            setForEach.call(obj, function(value) {
              setParts.push(inspect(value, obj));
            });
          }
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (typeof window !== "undefined" && obj === window) {
          return "{ [object Window] }";
        }
        if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
          return "{ [object globalThis] }";
        }
        if (!isDate(obj) && !isRegExp(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag + "{}";
          }
          if (indent) {
            return tag + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s6, defaultStyle, opts) {
        var style = opts.quoteStyle || defaultStyle;
        var quoteChar = quotes[style];
        return quoteChar + s6 + quoteChar;
      }
      function quote(s6) {
        return $replace.call(String(s6), /"/g, "&quot;");
      }
      function canTrustToString(obj) {
        return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
      }
      function isArray(obj) {
        return toStr(obj) === "[object Array]" && canTrustToString(obj);
      }
      function isDate(obj) {
        return toStr(obj) === "[object Date]" && canTrustToString(obj);
      }
      function isRegExp(obj) {
        return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
      }
      function isError(obj) {
        return toStr(obj) === "[object Error]" && canTrustToString(obj);
      }
      function isString(obj) {
        return toStr(obj) === "[object String]" && canTrustToString(obj);
      }
      function isNumber(obj) {
        return toStr(obj) === "[object Number]" && canTrustToString(obj);
      }
      function isBoolean(obj) {
        return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e8) {
        }
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e8) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has2(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f4) {
        if (f4.name) {
          return f4.name;
        }
        var m4 = $match.call(functionToString.call(f4), /^function\s*([\w$]+)/);
        if (m4) {
          return m4[1];
        }
        return null;
      }
      function indexOf(xs, x3) {
        if (xs.indexOf) {
          return xs.indexOf(x3);
        }
        for (var i8 = 0, l4 = xs.length; i8 < l4; i8++) {
          if (xs[i8] === x3) {
            return i8;
          }
        }
        return -1;
      }
      function isMap2(x3) {
        if (!mapSize || !x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          mapSize.call(x3);
          try {
            setSize.call(x3);
          } catch (s6) {
            return true;
          }
          return x3 instanceof Map;
        } catch (e8) {
        }
        return false;
      }
      function isWeakMap(x3) {
        if (!weakMapHas || !x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x3, weakMapHas);
          try {
            weakSetHas.call(x3, weakSetHas);
          } catch (s6) {
            return true;
          }
          return x3 instanceof WeakMap;
        } catch (e8) {
        }
        return false;
      }
      function isWeakRef(x3) {
        if (!weakRefDeref || !x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x3);
          return true;
        } catch (e8) {
        }
        return false;
      }
      function isSet2(x3) {
        if (!setSize || !x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          setSize.call(x3);
          try {
            mapSize.call(x3);
          } catch (m4) {
            return true;
          }
          return x3 instanceof Set;
        } catch (e8) {
        }
        return false;
      }
      function isWeakSet(x3) {
        if (!weakSetHas || !x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x3, weakSetHas);
          try {
            weakMapHas.call(x3, weakMapHas);
          } catch (s6) {
            return true;
          }
          return x3 instanceof WeakSet;
        } catch (e8) {
        }
        return false;
      }
      function isElement(x3) {
        if (!x3 || typeof x3 !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x3 instanceof HTMLElement) {
          return true;
        }
        return typeof x3.nodeName === "string" && typeof x3.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var quoteRE = quoteREs[opts.quoteStyle || "single"];
        quoteRE.lastIndex = 0;
        var s6 = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s6, "single", opts);
      }
      function lowbyte(c6) {
        var n6 = c6.charCodeAt(0);
        var x3 = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n6];
        if (x3) {
          return "\\" + x3;
        }
        return "\\x" + (n6 < 16 ? "0" : "") + $toUpperCase.call(n6.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type) {
        return type + " { ? }";
      }
      function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i8 = 0; i8 < xs.length; i8++) {
          if (indexOf(xs[i8], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i8 = 0; i8 < obj.length; i8++) {
            xs[i8] = has2(obj, i8) ? inspect(obj[i8], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k3 = 0; k3 < syms.length; k3++) {
            symMap["$" + syms[k3]] = syms[k3];
          }
        }
        for (var key in obj) {
          if (!has2(obj, key)) {
            continue;
          }
          if (isArr && String(Number(key)) === key && key < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
          } else {
            xs.push(key + ": " + inspect(obj[key], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j3 = 0; j3 < syms.length; j3++) {
            if (isEnumerable.call(obj, syms[j3])) {
              xs.push("[" + inspect(syms[j3]) + "]: " + inspect(obj[syms[j3]], obj));
            }
          }
        }
        return xs;
      }
    }
  });

  // node_modules/side-channel-list/index.js
  var require_side_channel_list = __commonJS({
    "node_modules/side-channel-list/index.js"(exports, module) {
      "use strict";
      var inspect = require_object_inspect();
      var $TypeError = require_type();
      var listGetNode = function(list, key, isDelete) {
        var prev = list;
        var curr;
        for (; (curr = prev.next) != null; prev = curr) {
          if (curr.key === key) {
            prev.next = curr.next;
            if (!isDelete) {
              curr.next = /** @type {NonNullable<typeof list.next>} */
              list.next;
              list.next = curr;
            }
            return curr;
          }
        }
      };
      var listGet = function(objects, key) {
        if (!objects) {
          return void 0;
        }
        var node = listGetNode(objects, key);
        return node && node.value;
      };
      var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) {
          node.value = value;
        } else {
          objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
          {
            // eslint-disable-line no-param-reassign, no-extra-parens
            key,
            next: objects.next,
            value
          };
        }
      };
      var listHas = function(objects, key) {
        if (!objects) {
          return false;
        }
        return !!listGetNode(objects, key);
      };
      var listDelete = function(objects, key) {
        if (objects) {
          return listGetNode(objects, key, true);
        }
      };
      module.exports = function getSideChannelList() {
        var $o;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            var root = $o && $o.next;
            var deletedNode = listDelete($o, key);
            if (deletedNode && root && root === deletedNode) {
              $o = void 0;
            }
            return !!deletedNode;
          },
          get: function(key) {
            return listGet($o, key);
          },
          has: function(key) {
            return listHas($o, key);
          },
          set: function(key, value) {
            if (!$o) {
              $o = {
                next: void 0
              };
            }
            listSet(
              /** @type {NonNullable<typeof $o>} */
              $o,
              key,
              value
            );
          }
        };
        return channel;
      };
    }
  });

  // node_modules/side-channel-map/index.js
  var require_side_channel_map = __commonJS({
    "node_modules/side-channel-map/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_call_bound();
      var inspect = require_object_inspect();
      var $TypeError = require_type();
      var $Map = GetIntrinsic("%Map%", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSet = callBound("Map.prototype.set", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var $mapDelete = callBound("Map.prototype.delete", true);
      var $mapSize = callBound("Map.prototype.size", true);
      module.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
      function getSideChannelMap() {
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($m) {
              var result = $mapDelete($m, key);
              if ($mapSize($m) === 0) {
                $m = void 0;
              }
              return result;
            }
            return false;
          },
          get: function(key) {
            if ($m) {
              return $mapGet($m, key);
            }
          },
          has: function(key) {
            if ($m) {
              return $mapHas($m, key);
            }
            return false;
          },
          set: function(key, value) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          }
        };
        return channel;
      };
    }
  });

  // node_modules/side-channel-weakmap/index.js
  var require_side_channel_weakmap = __commonJS({
    "node_modules/side-channel-weakmap/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_call_bound();
      var inspect = require_object_inspect();
      var getSideChannelMap = require_side_channel_map();
      var $TypeError = require_type();
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $weakMapGet = callBound("WeakMap.prototype.get", true);
      var $weakMapSet = callBound("WeakMap.prototype.set", true);
      var $weakMapHas = callBound("WeakMap.prototype.has", true);
      var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
      module.exports = $WeakMap ? (
        /** @type {Exclude<import('.'), false>} */
        function getSideChannelWeakMap() {
          var $wm;
          var $m;
          var channel = {
            assert: function(key) {
              if (!channel.has(key)) {
                throw new $TypeError("Side channel does not contain " + inspect(key));
              }
            },
            "delete": function(key) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if ($wm) {
                  return $weakMapDelete($wm, key);
                }
              } else if (getSideChannelMap) {
                if ($m) {
                  return $m["delete"](key);
                }
              }
              return false;
            },
            get: function(key) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if ($wm) {
                  return $weakMapGet($wm, key);
                }
              }
              return $m && $m.get(key);
            },
            has: function(key) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if ($wm) {
                  return $weakMapHas($wm, key);
                }
              }
              return !!$m && $m.has(key);
            },
            set: function(key, value) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if (!$wm) {
                  $wm = new $WeakMap();
                }
                $weakMapSet($wm, key, value);
              } else if (getSideChannelMap) {
                if (!$m) {
                  $m = getSideChannelMap();
                }
                $m.set(key, value);
              }
            }
          };
          return channel;
        }
      ) : getSideChannelMap;
    }
  });

  // node_modules/side-channel/index.js
  var require_side_channel = __commonJS({
    "node_modules/side-channel/index.js"(exports, module) {
      "use strict";
      var $TypeError = require_type();
      var inspect = require_object_inspect();
      var getSideChannelList = require_side_channel_list();
      var getSideChannelMap = require_side_channel_map();
      var getSideChannelWeakMap = require_side_channel_weakmap();
      var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
      module.exports = function getSideChannel() {
        var $channelData;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            return !!$channelData && $channelData["delete"](key);
          },
          get: function(key) {
            return $channelData && $channelData.get(key);
          },
          has: function(key) {
            return !!$channelData && $channelData.has(key);
          },
          set: function(key, value) {
            if (!$channelData) {
              $channelData = makeChannel();
            }
            $channelData.set(key, value);
          }
        };
        return channel;
      };
    }
  });

  // node_modules/internal-slot/index.js
  var require_internal_slot = __commonJS({
    "node_modules/internal-slot/index.js"(exports, module) {
      "use strict";
      var hasOwn = require_hasown();
      var channel = require_side_channel()();
      var $TypeError = require_type();
      var SLOT = {
        assert: function(O2, slot) {
          if (!O2 || typeof O2 !== "object" && typeof O2 !== "function") {
            throw new $TypeError("`O` is not an object");
          }
          if (typeof slot !== "string") {
            throw new $TypeError("`slot` must be a string");
          }
          channel.assert(O2);
          if (!SLOT.has(O2, slot)) {
            throw new $TypeError("`" + slot + "` is not present on `O`");
          }
        },
        get: function(O2, slot) {
          if (!O2 || typeof O2 !== "object" && typeof O2 !== "function") {
            throw new $TypeError("`O` is not an object");
          }
          if (typeof slot !== "string") {
            throw new $TypeError("`slot` must be a string");
          }
          var slots = channel.get(O2);
          return slots && slots[
            /** @type {SaltedInternalSlot} */
            "$" + slot
          ];
        },
        has: function(O2, slot) {
          if (!O2 || typeof O2 !== "object" && typeof O2 !== "function") {
            throw new $TypeError("`O` is not an object");
          }
          if (typeof slot !== "string") {
            throw new $TypeError("`slot` must be a string");
          }
          var slots = channel.get(O2);
          return !!slots && hasOwn(
            slots,
            /** @type {SaltedInternalSlot} */
            "$" + slot
          );
        },
        set: function(O2, slot, V3) {
          if (!O2 || typeof O2 !== "object" && typeof O2 !== "function") {
            throw new $TypeError("`O` is not an object");
          }
          if (typeof slot !== "string") {
            throw new $TypeError("`slot` must be a string");
          }
          var slots = channel.get(O2);
          if (!slots) {
            slots = {};
            channel.set(O2, slots);
          }
          slots[
            /** @type {SaltedInternalSlot} */
            "$" + slot
          ] = V3;
        }
      };
      if (Object.freeze) {
        Object.freeze(SLOT);
      }
      module.exports = SLOT;
    }
  });

  // node_modules/stop-iteration-iterator/index.js
  var require_stop_iteration_iterator = __commonJS({
    "node_modules/stop-iteration-iterator/index.js"(exports, module) {
      "use strict";
      var SLOT = require_internal_slot();
      var $SyntaxError = require_syntax();
      var $StopIteration = typeof StopIteration === "object" ? StopIteration : null;
      module.exports = function getStopIterationIterator(origIterator) {
        if (!$StopIteration) {
          throw new $SyntaxError("this environment lacks StopIteration");
        }
        SLOT.set(origIterator, "[[Done]]", false);
        var siIterator = {
          next: (
            /** @type {() => IteratorResult<T>} */
            function next() {
              var iterator = (
                /** @type {typeof origIterator} */
                SLOT.get(this, "[[Iterator]]")
              );
              var done = !!SLOT.get(iterator, "[[Done]]");
              try {
                return {
                  done,
                  // eslint-disable-next-line no-extra-parens
                  value: done ? void 0 : (
                    /** @type {T} */
                    iterator.next()
                  )
                };
              } catch (e8) {
                SLOT.set(iterator, "[[Done]]", true);
                if (e8 !== $StopIteration) {
                  throw e8;
                }
                return {
                  done: true,
                  value: void 0
                };
              }
            }
          )
        };
        SLOT.set(siIterator, "[[Iterator]]", origIterator);
        return siIterator;
      };
    }
  });

  // node_modules/isarray/index.js
  var require_isarray = __commonJS({
    "node_modules/isarray/index.js"(exports, module) {
      var toString = {}.toString;
      module.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }
  });

  // node_modules/is-string/index.js
  var require_is_string = __commonJS({
    "node_modules/is-string/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var $strValueOf = callBound("String.prototype.valueOf");
      var tryStringObject = function tryStringObject2(value) {
        try {
          $strValueOf(value);
          return true;
        } catch (e8) {
          return false;
        }
      };
      var $toString = callBound("Object.prototype.toString");
      var strClass = "[object String]";
      var hasToStringTag = require_shams2()();
      module.exports = function isString(value) {
        if (typeof value === "string") {
          return true;
        }
        if (!value || typeof value !== "object") {
          return false;
        }
        return hasToStringTag ? tryStringObject(value) : $toString(value) === strClass;
      };
    }
  });

  // node_modules/is-map/index.js
  var require_is_map = __commonJS({
    "node_modules/is-map/index.js"(exports, module) {
      "use strict";
      var $Map = typeof Map === "function" && Map.prototype ? Map : null;
      var $Set = typeof Set === "function" && Set.prototype ? Set : null;
      var exported;
      if (!$Map) {
        exported = function isMap2(x3) {
          return false;
        };
      }
      var $mapHas = $Map ? Map.prototype.has : null;
      var $setHas = $Set ? Set.prototype.has : null;
      if (!exported && !$mapHas) {
        exported = function isMap2(x3) {
          return false;
        };
      }
      module.exports = exported || function isMap2(x3) {
        if (!x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          $mapHas.call(x3);
          if ($setHas) {
            try {
              $setHas.call(x3);
            } catch (e8) {
              return true;
            }
          }
          return x3 instanceof $Map;
        } catch (e8) {
        }
        return false;
      };
    }
  });

  // node_modules/is-set/index.js
  var require_is_set = __commonJS({
    "node_modules/is-set/index.js"(exports, module) {
      "use strict";
      var $Map = typeof Map === "function" && Map.prototype ? Map : null;
      var $Set = typeof Set === "function" && Set.prototype ? Set : null;
      var exported;
      if (!$Set) {
        exported = function isSet2(x3) {
          return false;
        };
      }
      var $mapHas = $Map ? Map.prototype.has : null;
      var $setHas = $Set ? Set.prototype.has : null;
      if (!exported && !$setHas) {
        exported = function isSet2(x3) {
          return false;
        };
      }
      module.exports = exported || function isSet2(x3) {
        if (!x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          $setHas.call(x3);
          if ($mapHas) {
            try {
              $mapHas.call(x3);
            } catch (e8) {
              return true;
            }
          }
          return x3 instanceof $Set;
        } catch (e8) {
        }
        return false;
      };
    }
  });

  // node_modules/es-get-iterator/index.js
  var require_es_get_iterator = __commonJS({
    "node_modules/es-get-iterator/index.js"(exports, module) {
      "use strict";
      var isArguments = require_is_arguments();
      var getStopIterationIterator = require_stop_iteration_iterator();
      if (require_has_symbols()() || require_shams()()) {
        $iterator = Symbol.iterator;
        module.exports = function getIterator(iterable) {
          if (iterable != null && typeof iterable[$iterator] !== "undefined") {
            return iterable[$iterator]();
          }
          if (isArguments(iterable)) {
            return Array.prototype[$iterator].call(iterable);
          }
        };
      } else {
        isArray = require_isarray();
        isString = require_is_string();
        GetIntrinsic = require_get_intrinsic();
        $Map = GetIntrinsic("%Map%", true);
        $Set = GetIntrinsic("%Set%", true);
        callBound = require_callBound();
        $arrayPush = callBound("Array.prototype.push");
        $charCodeAt = callBound("String.prototype.charCodeAt");
        $stringSlice = callBound("String.prototype.slice");
        advanceStringIndex = function advanceStringIndex2(S4, index) {
          var length = S4.length;
          if (index + 1 >= length) {
            return index + 1;
          }
          var first = $charCodeAt(S4, index);
          if (first < 55296 || first > 56319) {
            return index + 1;
          }
          var second = $charCodeAt(S4, index + 1);
          if (second < 56320 || second > 57343) {
            return index + 1;
          }
          return index + 2;
        };
        getArrayIterator = function getArrayIterator2(arraylike) {
          var i8 = 0;
          return {
            next: function next() {
              var done = i8 >= arraylike.length;
              var value;
              if (!done) {
                value = arraylike[i8];
                i8 += 1;
              }
              return {
                done,
                value
              };
            }
          };
        };
        getNonCollectionIterator = function getNonCollectionIterator2(iterable, noPrimordialCollections) {
          if (isArray(iterable) || isArguments(iterable)) {
            return getArrayIterator(iterable);
          }
          if (isString(iterable)) {
            var i8 = 0;
            return {
              next: function next() {
                var nextIndex = advanceStringIndex(iterable, i8);
                var value = $stringSlice(iterable, i8, nextIndex);
                i8 = nextIndex;
                return {
                  done: nextIndex > iterable.length,
                  value
                };
              }
            };
          }
          if (noPrimordialCollections && typeof iterable["_es6-shim iterator_"] !== "undefined") {
            return iterable["_es6-shim iterator_"]();
          }
        };
        if (!$Map && !$Set) {
          module.exports = function getIterator(iterable) {
            if (iterable != null) {
              return getNonCollectionIterator(iterable, true);
            }
          };
        } else {
          isMap2 = require_is_map();
          isSet2 = require_is_set();
          $mapForEach = callBound("Map.prototype.forEach", true);
          $setForEach = callBound("Set.prototype.forEach", true);
          if (typeof process === "undefined" || !process.versions || !process.versions.node) {
            $mapIterator = callBound("Map.prototype.iterator", true);
            $setIterator = callBound("Set.prototype.iterator", true);
          }
          $mapAtAtIterator = callBound("Map.prototype.@@iterator", true) || callBound("Map.prototype._es6-shim iterator_", true);
          $setAtAtIterator = callBound("Set.prototype.@@iterator", true) || callBound("Set.prototype._es6-shim iterator_", true);
          getCollectionIterator = function getCollectionIterator2(iterable) {
            if (isMap2(iterable)) {
              if ($mapIterator) {
                return getStopIterationIterator($mapIterator(iterable));
              }
              if ($mapAtAtIterator) {
                return $mapAtAtIterator(iterable);
              }
              if ($mapForEach) {
                var entries = [];
                $mapForEach(iterable, function(v4, k3) {
                  $arrayPush(entries, [k3, v4]);
                });
                return getArrayIterator(entries);
              }
            }
            if (isSet2(iterable)) {
              if ($setIterator) {
                return getStopIterationIterator($setIterator(iterable));
              }
              if ($setAtAtIterator) {
                return $setAtAtIterator(iterable);
              }
              if ($setForEach) {
                var values = [];
                $setForEach(iterable, function(v4) {
                  $arrayPush(values, v4);
                });
                return getArrayIterator(values);
              }
            }
          };
          module.exports = function getIterator(iterable) {
            return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
          };
        }
      }
      var $iterator;
      var isArray;
      var isString;
      var GetIntrinsic;
      var $Map;
      var $Set;
      var callBound;
      var $arrayPush;
      var $charCodeAt;
      var $stringSlice;
      var advanceStringIndex;
      var getArrayIterator;
      var getNonCollectionIterator;
      var isMap2;
      var isSet2;
      var $mapForEach;
      var $setForEach;
      var $mapIterator;
      var $setIterator;
      var $mapAtAtIterator;
      var $setAtAtIterator;
      var getCollectionIterator;
    }
  });

  // node_modules/object-is/implementation.js
  var require_implementation5 = __commonJS({
    "node_modules/object-is/implementation.js"(exports, module) {
      "use strict";
      var numberIsNaN = function(value) {
        return value !== value;
      };
      module.exports = function is2(a4, b4) {
        if (a4 === 0 && b4 === 0) {
          return 1 / a4 === 1 / b4;
        }
        if (a4 === b4) {
          return true;
        }
        if (numberIsNaN(a4) && numberIsNaN(b4)) {
          return true;
        }
        return false;
      };
    }
  });

  // node_modules/object-is/polyfill.js
  var require_polyfill3 = __commonJS({
    "node_modules/object-is/polyfill.js"(exports, module) {
      "use strict";
      var implementation = require_implementation5();
      module.exports = function getPolyfill() {
        return typeof Object.is === "function" ? Object.is : implementation;
      };
    }
  });

  // node_modules/object-is/shim.js
  var require_shim3 = __commonJS({
    "node_modules/object-is/shim.js"(exports, module) {
      "use strict";
      var getPolyfill = require_polyfill3();
      var define = require_define_properties();
      module.exports = function shimObjectIs() {
        var polyfill = getPolyfill();
        define(Object, { is: polyfill }, {
          is: function testObjectIs() {
            return Object.is !== polyfill;
          }
        });
        return polyfill;
      };
    }
  });

  // node_modules/object-is/index.js
  var require_object_is = __commonJS({
    "node_modules/object-is/index.js"(exports, module) {
      "use strict";
      var define = require_define_properties();
      var callBind = require_call_bind();
      var implementation = require_implementation5();
      var getPolyfill = require_polyfill3();
      var shim = require_shim3();
      var polyfill = callBind(getPolyfill(), Object);
      define(polyfill, {
        getPolyfill,
        implementation,
        shim
      });
      module.exports = polyfill;
    }
  });

  // node_modules/is-array-buffer/index.js
  var require_is_array_buffer = __commonJS({
    "node_modules/is-array-buffer/index.js"(exports, module) {
      "use strict";
      var callBind = require_call_bind();
      var callBound = require_call_bound();
      var GetIntrinsic = require_get_intrinsic();
      var $ArrayBuffer = GetIntrinsic("%ArrayBuffer%", true);
      var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
      var $toString = callBound("Object.prototype.toString");
      var abSlice = !!$ArrayBuffer && !$byteLength && new $ArrayBuffer(0).slice;
      var $abSlice = !!abSlice && callBind(abSlice);
      module.exports = $byteLength || $abSlice ? function isArrayBuffer(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        try {
          if ($byteLength) {
            $byteLength(obj);
          } else {
            $abSlice(obj, 0);
          }
          return true;
        } catch (e8) {
          return false;
        }
      } : $ArrayBuffer ? function isArrayBuffer(obj) {
        return $toString(obj) === "[object ArrayBuffer]";
      } : function isArrayBuffer(obj) {
        return false;
      };
    }
  });

  // node_modules/is-date-object/index.js
  var require_is_date_object = __commonJS({
    "node_modules/is-date-object/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var getDay = callBound("Date.prototype.getDay");
      var tryDateObject = function tryDateGetDayCall(value) {
        try {
          getDay(value);
          return true;
        } catch (e8) {
          return false;
        }
      };
      var toStr = callBound("Object.prototype.toString");
      var dateClass = "[object Date]";
      var hasToStringTag = require_shams2()();
      module.exports = function isDateObject(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        return hasToStringTag ? tryDateObject(value) : toStr(value) === dateClass;
      };
    }
  });

  // node_modules/is-regex/index.js
  var require_is_regex = __commonJS({
    "node_modules/is-regex/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var hasToStringTag = require_shams2()();
      var hasOwn = require_hasown();
      var gOPD = require_gopd();
      var fn2;
      if (hasToStringTag) {
        $exec = callBound("RegExp.prototype.exec");
        isRegexMarker = {};
        throwRegexMarker = function() {
          throw isRegexMarker;
        };
        badStringifier = {
          toString: throwRegexMarker,
          valueOf: throwRegexMarker
        };
        if (typeof Symbol.toPrimitive === "symbol") {
          badStringifier[Symbol.toPrimitive] = throwRegexMarker;
        }
        fn2 = function isRegex(value) {
          if (!value || typeof value !== "object") {
            return false;
          }
          var descriptor = (
            /** @type {NonNullable<typeof gOPD>} */
            gOPD(
              /** @type {{ lastIndex?: unknown }} */
              value,
              "lastIndex"
            )
          );
          var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, "value");
          if (!hasLastIndexDataProperty) {
            return false;
          }
          try {
            $exec(
              value,
              /** @type {string} */
              /** @type {unknown} */
              badStringifier
            );
          } catch (e8) {
            return e8 === isRegexMarker;
          }
        };
      } else {
        $toString = callBound("Object.prototype.toString");
        regexClass = "[object RegExp]";
        fn2 = function isRegex(value) {
          if (!value || typeof value !== "object" && typeof value !== "function") {
            return false;
          }
          return $toString(value) === regexClass;
        };
      }
      var $exec;
      var isRegexMarker;
      var throwRegexMarker;
      var badStringifier;
      var $toString;
      var regexClass;
      module.exports = fn2;
    }
  });

  // node_modules/is-shared-array-buffer/index.js
  var require_is_shared_array_buffer = __commonJS({
    "node_modules/is-shared-array-buffer/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var $byteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
      module.exports = $byteLength ? function isSharedArrayBuffer(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        try {
          $byteLength(obj);
          return true;
        } catch (e8) {
          return false;
        }
      } : function isSharedArrayBuffer(_obj) {
        return false;
      };
    }
  });

  // node_modules/is-number-object/index.js
  var require_is_number_object = __commonJS({
    "node_modules/is-number-object/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var $numToStr = callBound("Number.prototype.toString");
      var tryNumberObject = function tryNumberObject2(value) {
        try {
          $numToStr(value);
          return true;
        } catch (e8) {
          return false;
        }
      };
      var $toString = callBound("Object.prototype.toString");
      var numClass = "[object Number]";
      var hasToStringTag = require_shams2()();
      module.exports = function isNumberObject(value) {
        if (typeof value === "number") {
          return true;
        }
        if (!value || typeof value !== "object") {
          return false;
        }
        return hasToStringTag ? tryNumberObject(value) : $toString(value) === numClass;
      };
    }
  });

  // node_modules/is-boolean-object/index.js
  var require_is_boolean_object = __commonJS({
    "node_modules/is-boolean-object/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var $boolToStr = callBound("Boolean.prototype.toString");
      var $toString = callBound("Object.prototype.toString");
      var tryBooleanObject = function booleanBrandCheck(value) {
        try {
          $boolToStr(value);
          return true;
        } catch (e8) {
          return false;
        }
      };
      var boolClass = "[object Boolean]";
      var hasToStringTag = require_shams2()();
      module.exports = function isBoolean(value) {
        if (typeof value === "boolean") {
          return true;
        }
        if (value === null || typeof value !== "object") {
          return false;
        }
        return hasToStringTag ? tryBooleanObject(value) : $toString(value) === boolClass;
      };
    }
  });

  // node_modules/safe-regex-test/index.js
  var require_safe_regex_test = __commonJS({
    "node_modules/safe-regex-test/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var isRegex = require_is_regex();
      var $exec = callBound("RegExp.prototype.exec");
      var $TypeError = require_type();
      module.exports = function regexTester(regex) {
        if (!isRegex(regex)) {
          throw new $TypeError("`regex` must be a RegExp");
        }
        return function test(s6) {
          return $exec(regex, s6) !== null;
        };
      };
    }
  });

  // node_modules/is-symbol/index.js
  var require_is_symbol = __commonJS({
    "node_modules/is-symbol/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var $toString = callBound("Object.prototype.toString");
      var hasSymbols = require_has_symbols()();
      var safeRegexTest = require_safe_regex_test();
      if (hasSymbols) {
        $symToStr = callBound("Symbol.prototype.toString");
        isSymString = safeRegexTest(/^Symbol\(.*\)$/);
        isSymbolObject = function isRealSymbolObject(value) {
          if (typeof value.valueOf() !== "symbol") {
            return false;
          }
          return isSymString($symToStr(value));
        };
        module.exports = function isSymbol(value) {
          if (typeof value === "symbol") {
            return true;
          }
          if (!value || typeof value !== "object" || $toString(value) !== "[object Symbol]") {
            return false;
          }
          try {
            return isSymbolObject(value);
          } catch (e8) {
            return false;
          }
        };
      } else {
        module.exports = function isSymbol(value) {
          return false;
        };
      }
      var $symToStr;
      var isSymString;
      var isSymbolObject;
    }
  });

  // node_modules/has-bigints/index.js
  var require_has_bigints = __commonJS({
    "node_modules/has-bigints/index.js"(exports, module) {
      "use strict";
      var $BigInt = typeof BigInt !== "undefined" && BigInt;
      module.exports = function hasNativeBigInts() {
        return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
      };
    }
  });

  // node_modules/is-bigint/index.js
  var require_is_bigint = __commonJS({
    "node_modules/is-bigint/index.js"(exports, module) {
      "use strict";
      var hasBigInts = require_has_bigints()();
      if (hasBigInts) {
        bigIntValueOf = BigInt.prototype.valueOf;
        tryBigInt = function tryBigIntObject(value) {
          try {
            bigIntValueOf.call(value);
            return true;
          } catch (e8) {
          }
          return false;
        };
        module.exports = function isBigInt(value) {
          if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
            return false;
          }
          if (typeof value === "bigint") {
            return true;
          }
          return tryBigInt(value);
        };
      } else {
        module.exports = function isBigInt(value) {
          return false;
        };
      }
      var bigIntValueOf;
      var tryBigInt;
    }
  });

  // node_modules/which-boxed-primitive/index.js
  var require_which_boxed_primitive = __commonJS({
    "node_modules/which-boxed-primitive/index.js"(exports, module) {
      "use strict";
      var isString = require_is_string();
      var isNumber = require_is_number_object();
      var isBoolean = require_is_boolean_object();
      var isSymbol = require_is_symbol();
      var isBigInt = require_is_bigint();
      module.exports = function whichBoxedPrimitive(value) {
        if (value == null || typeof value !== "object" && typeof value !== "function") {
          return null;
        }
        if (isString(value)) {
          return "String";
        }
        if (isNumber(value)) {
          return "Number";
        }
        if (isBoolean(value)) {
          return "Boolean";
        }
        if (isSymbol(value)) {
          return "Symbol";
        }
        if (isBigInt(value)) {
          return "BigInt";
        }
      };
    }
  });

  // node_modules/is-weakmap/index.js
  var require_is_weakmap = __commonJS({
    "node_modules/is-weakmap/index.js"(exports, module) {
      "use strict";
      var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
      var $WeakSet = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
      var exported;
      if (!$WeakMap) {
        exported = function isWeakMap(x3) {
          return false;
        };
      }
      var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
      var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
      if (!exported && !$mapHas) {
        exported = function isWeakMap(x3) {
          return false;
        };
      }
      module.exports = exported || function isWeakMap(x3) {
        if (!x3 || typeof x3 !== "object") {
          return false;
        }
        try {
          $mapHas.call(x3, $mapHas);
          if ($setHas) {
            try {
              $setHas.call(x3, $setHas);
            } catch (e8) {
              return true;
            }
          }
          return x3 instanceof $WeakMap;
        } catch (e8) {
        }
        return false;
      };
    }
  });

  // node_modules/is-weakset/index.js
  var require_is_weakset = __commonJS({
    "node_modules/is-weakset/index.js"(exports, module) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_call_bound();
      var $WeakSet = GetIntrinsic("%WeakSet%", true);
      var $setHas = callBound("WeakSet.prototype.has", true);
      if ($setHas) {
        $mapHas = callBound("WeakMap.prototype.has", true);
        module.exports = function isWeakSet(x3) {
          if (!x3 || typeof x3 !== "object") {
            return false;
          }
          try {
            $setHas(x3, $setHas);
            if ($mapHas) {
              try {
                $mapHas(x3, $mapHas);
              } catch (e8) {
                return true;
              }
            }
            return x3 instanceof $WeakSet;
          } catch (e8) {
          }
          return false;
        };
      } else {
        module.exports = function isWeakSet(x3) {
          return false;
        };
      }
      var $mapHas;
    }
  });

  // node_modules/which-collection/index.js
  var require_which_collection = __commonJS({
    "node_modules/which-collection/index.js"(exports, module) {
      "use strict";
      var isMap2 = require_is_map();
      var isSet2 = require_is_set();
      var isWeakMap = require_is_weakmap();
      var isWeakSet = require_is_weakset();
      module.exports = function whichCollection(value) {
        if (value && typeof value === "object") {
          if (isMap2(value)) {
            return "Map";
          }
          if (isSet2(value)) {
            return "Set";
          }
          if (isWeakMap(value)) {
            return "WeakMap";
          }
          if (isWeakSet(value)) {
            return "WeakSet";
          }
        }
        return false;
      };
    }
  });

  // node_modules/is-callable/index.js
  var require_is_callable = __commonJS({
    "node_modules/is-callable/index.js"(exports, module) {
      "use strict";
      var fnToStr = Function.prototype.toString;
      var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
      var badArrayLike;
      var isCallableMarker;
      if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
        try {
          badArrayLike = Object.defineProperty({}, "length", {
            get: function() {
              throw isCallableMarker;
            }
          });
          isCallableMarker = {};
          reflectApply(function() {
            throw 42;
          }, null, badArrayLike);
        } catch (_3) {
          if (_3 !== isCallableMarker) {
            reflectApply = null;
          }
        }
      } else {
        reflectApply = null;
      }
      var constructorRegex = /^\s*class\b/;
      var isES6ClassFn = function isES6ClassFunction(value) {
        try {
          var fnStr = fnToStr.call(value);
          return constructorRegex.test(fnStr);
        } catch (e8) {
          return false;
        }
      };
      var tryFunctionObject = function tryFunctionToStr(value) {
        try {
          if (isES6ClassFn(value)) {
            return false;
          }
          fnToStr.call(value);
          return true;
        } catch (e8) {
          return false;
        }
      };
      var toStr = Object.prototype.toString;
      var objectClass = "[object Object]";
      var fnClass = "[object Function]";
      var genClass = "[object GeneratorFunction]";
      var ddaClass = "[object HTMLAllCollection]";
      var ddaClass2 = "[object HTML document.all class]";
      var ddaClass3 = "[object HTMLCollection]";
      var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
      var isIE68 = !(0 in [,]);
      var isDDA = function isDocumentDotAll() {
        return false;
      };
      if (typeof document === "object") {
        all = document.all;
        if (toStr.call(all) === toStr.call(document.all)) {
          isDDA = function isDocumentDotAll(value) {
            if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
              try {
                var str = toStr.call(value);
                return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
              } catch (e8) {
              }
            }
            return false;
          };
        }
      }
      var all;
      module.exports = reflectApply ? function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        try {
          reflectApply(value, null, badArrayLike);
        } catch (e8) {
          if (e8 !== isCallableMarker) {
            return false;
          }
        }
        return !isES6ClassFn(value) && tryFunctionObject(value);
      } : function isCallable(value) {
        if (isDDA(value)) {
          return true;
        }
        if (!value) {
          return false;
        }
        if (typeof value !== "function" && typeof value !== "object") {
          return false;
        }
        if (hasToStringTag) {
          return tryFunctionObject(value);
        }
        if (isES6ClassFn(value)) {
          return false;
        }
        var strClass = toStr.call(value);
        if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
          return false;
        }
        return tryFunctionObject(value);
      };
    }
  });

  // node_modules/for-each/index.js
  var require_for_each = __commonJS({
    "node_modules/for-each/index.js"(exports, module) {
      "use strict";
      var isCallable = require_is_callable();
      var toStr = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var forEachArray = function forEachArray2(array, iterator, receiver) {
        for (var i8 = 0, len = array.length; i8 < len; i8++) {
          if (hasOwnProperty.call(array, i8)) {
            if (receiver == null) {
              iterator(array[i8], i8, array);
            } else {
              iterator.call(receiver, array[i8], i8, array);
            }
          }
        }
      };
      var forEachString = function forEachString2(string, iterator, receiver) {
        for (var i8 = 0, len = string.length; i8 < len; i8++) {
          if (receiver == null) {
            iterator(string.charAt(i8), i8, string);
          } else {
            iterator.call(receiver, string.charAt(i8), i8, string);
          }
        }
      };
      var forEachObject = function forEachObject2(object, iterator, receiver) {
        for (var k3 in object) {
          if (hasOwnProperty.call(object, k3)) {
            if (receiver == null) {
              iterator(object[k3], k3, object);
            } else {
              iterator.call(receiver, object[k3], k3, object);
            }
          }
        }
      };
      function isArray(x3) {
        return toStr.call(x3) === "[object Array]";
      }
      module.exports = function forEach(list, iterator, thisArg) {
        if (!isCallable(iterator)) {
          throw new TypeError("iterator must be a function");
        }
        var receiver;
        if (arguments.length >= 3) {
          receiver = thisArg;
        }
        if (isArray(list)) {
          forEachArray(list, iterator, receiver);
        } else if (typeof list === "string") {
          forEachString(list, iterator, receiver);
        } else {
          forEachObject(list, iterator, receiver);
        }
      };
    }
  });

  // node_modules/possible-typed-array-names/index.js
  var require_possible_typed_array_names = __commonJS({
    "node_modules/possible-typed-array-names/index.js"(exports, module) {
      "use strict";
      module.exports = [
        "Float16Array",
        "Float32Array",
        "Float64Array",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "BigInt64Array",
        "BigUint64Array"
      ];
    }
  });

  // node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS({
    "node_modules/available-typed-arrays/index.js"(exports, module) {
      "use strict";
      var possibleNames = require_possible_typed_array_names();
      var g3 = typeof globalThis === "undefined" ? global : globalThis;
      module.exports = function availableTypedArrays() {
        var out = [];
        for (var i8 = 0; i8 < possibleNames.length; i8++) {
          if (typeof g3[possibleNames[i8]] === "function") {
            out[out.length] = possibleNames[i8];
          }
        }
        return out;
      };
    }
  });

  // node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS({
    "node_modules/which-typed-array/index.js"(exports, module) {
      "use strict";
      var forEach = require_for_each();
      var availableTypedArrays = require_available_typed_arrays();
      var callBind = require_call_bind();
      var callBound = require_call_bound();
      var gOPD = require_gopd();
      var getProto = require_get_proto();
      var $toString = callBound("Object.prototype.toString");
      var hasToStringTag = require_shams2()();
      var g3 = typeof globalThis === "undefined" ? global : globalThis;
      var typedArrays = availableTypedArrays();
      var $slice = callBound("String.prototype.slice");
      var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
        for (var i8 = 0; i8 < array.length; i8 += 1) {
          if (array[i8] === value) {
            return i8;
          }
        }
        return -1;
      };
      var cache = { __proto__: null };
      if (hasToStringTag && gOPD && getProto) {
        forEach(typedArrays, function(typedArray) {
          var arr = new g3[typedArray]();
          if (Symbol.toStringTag in arr && getProto) {
            var proto = getProto(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor && proto) {
              var superProto = getProto(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            cache["$" + typedArray] = callBind(descriptor.get);
          }
        });
      } else {
        forEach(typedArrays, function(typedArray) {
          var arr = new g3[typedArray]();
          var fn2 = arr.slice || arr.set;
          if (fn2) {
            cache[
              /** @type {`$${import('.').TypedArrayName}`} */
              "$" + typedArray
            ] = /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
            // @ts-expect-error TODO FIXME
            callBind(fn2);
          }
        });
      }
      var tryTypedArrays = function tryAllTypedArrays(value) {
        var found = false;
        forEach(
          /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
          cache,
          /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
          function(getter, typedArray) {
            if (!found) {
              try {
                if ("$" + getter(value) === typedArray) {
                  found = /** @type {import('.').TypedArrayName} */
                  $slice(typedArray, 1);
                }
              } catch (e8) {
              }
            }
          }
        );
        return found;
      };
      var trySlices = function tryAllSlices(value) {
        var found = false;
        forEach(
          /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
          cache,
          /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
          function(getter, name) {
            if (!found) {
              try {
                getter(value);
                found = /** @type {import('.').TypedArrayName} */
                $slice(name, 1);
              } catch (e8) {
              }
            }
          }
        );
        return found;
      };
      module.exports = function whichTypedArray(value) {
        if (!value || typeof value !== "object") {
          return false;
        }
        if (!hasToStringTag) {
          var tag = $slice($toString(value), 8, -1);
          if ($indexOf(typedArrays, tag) > -1) {
            return tag;
          }
          if (tag !== "Object") {
            return false;
          }
          return trySlices(value);
        }
        if (!gOPD) {
          return null;
        }
        return tryTypedArrays(value);
      };
    }
  });

  // node_modules/array-buffer-byte-length/index.js
  var require_array_buffer_byte_length = __commonJS({
    "node_modules/array-buffer-byte-length/index.js"(exports, module) {
      "use strict";
      var callBound = require_call_bound();
      var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
      var isArrayBuffer = require_is_array_buffer();
      module.exports = function byteLength(ab) {
        if (!isArrayBuffer(ab)) {
          return NaN;
        }
        return $byteLength ? $byteLength(ab) : ab.byteLength;
      };
    }
  });

  // node_modules/deep-equal/index.js
  var require_deep_equal = __commonJS({
    "node_modules/deep-equal/index.js"(exports, module) {
      "use strict";
      var assign = require_object();
      var callBound = require_callBound();
      var flags = require_regexp_prototype();
      var GetIntrinsic = require_get_intrinsic();
      var getIterator = require_es_get_iterator();
      var getSideChannel = require_side_channel();
      var is2 = require_object_is();
      var isArguments = require_is_arguments();
      var isArray = require_isarray();
      var isArrayBuffer = require_is_array_buffer();
      var isDate = require_is_date_object();
      var isRegex = require_is_regex();
      var isSharedArrayBuffer = require_is_shared_array_buffer();
      var objectKeys = require_object_keys();
      var whichBoxedPrimitive = require_which_boxed_primitive();
      var whichCollection = require_which_collection();
      var whichTypedArray = require_which_typed_array();
      var byteLength = require_array_buffer_byte_length();
      var sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
      var $getTime = callBound("Date.prototype.getTime");
      var gPO = Object.getPrototypeOf;
      var $objToString = callBound("Object.prototype.toString");
      var $Set = GetIntrinsic("%Set%", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSize = callBound("Map.prototype.size", true);
      var $setAdd = callBound("Set.prototype.add", true);
      var $setDelete = callBound("Set.prototype.delete", true);
      var $setHas = callBound("Set.prototype.has", true);
      var $setSize = callBound("Set.prototype.size", true);
      function setHasEqualElement(set2, val1, opts, channel) {
        var i8 = getIterator(set2);
        var result;
        while ((result = i8.next()) && !result.done) {
          if (internalDeepEqual(val1, result.value, opts, channel)) {
            $setDelete(set2, result.value);
            return true;
          }
        }
        return false;
      }
      function findLooseMatchingPrimitives(prim) {
        if (typeof prim === "undefined") {
          return null;
        }
        if (typeof prim === "object") {
          return void 0;
        }
        if (typeof prim === "symbol") {
          return false;
        }
        if (typeof prim === "string" || typeof prim === "number") {
          return +prim === +prim;
        }
        return true;
      }
      function mapMightHaveLoosePrim(a4, b4, prim, item, opts, channel) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) {
          return altValue;
        }
        var curB = $mapGet(b4, altValue);
        var looseOpts = assign({}, opts, { strict: false });
        if (typeof curB === "undefined" && !$mapHas(b4, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) {
          return false;
        }
        return !$mapHas(a4, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
      }
      function setMightHaveLoosePrim(a4, b4, prim) {
        var altValue = findLooseMatchingPrimitives(prim);
        if (altValue != null) {
          return altValue;
        }
        return $setHas(b4, altValue) && !$setHas(a4, altValue);
      }
      function mapHasEqualEntry(set2, map, key1, item1, opts, channel) {
        var i8 = getIterator(set2);
        var result;
        var key2;
        while ((result = i8.next()) && !result.done) {
          key2 = result.value;
          if (
            // eslint-disable-next-line no-use-before-define
            internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)
          ) {
            $setDelete(set2, key2);
            return true;
          }
        }
        return false;
      }
      function internalDeepEqual(actual, expected, options, channel) {
        var opts = options || {};
        if (opts.strict ? is2(actual, expected) : actual === expected) {
          return true;
        }
        var actualBoxed = whichBoxedPrimitive(actual);
        var expectedBoxed = whichBoxedPrimitive(expected);
        if (actualBoxed !== expectedBoxed) {
          return false;
        }
        if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
          return opts.strict ? is2(actual, expected) : actual == expected;
        }
        var hasActual = channel.has(actual);
        var hasExpected = channel.has(expected);
        var sentinel;
        if (hasActual && hasExpected) {
          if (channel.get(actual) === channel.get(expected)) {
            return true;
          }
        } else {
          sentinel = {};
        }
        if (!hasActual) {
          channel.set(actual, sentinel);
        }
        if (!hasExpected) {
          channel.set(expected, sentinel);
        }
        return objEquiv(actual, expected, opts, channel);
      }
      function isBuffer(x3) {
        if (!x3 || typeof x3 !== "object" || typeof x3.length !== "number") {
          return false;
        }
        if (typeof x3.copy !== "function" || typeof x3.slice !== "function") {
          return false;
        }
        if (x3.length > 0 && typeof x3[0] !== "number") {
          return false;
        }
        return !!(x3.constructor && x3.constructor.isBuffer && x3.constructor.isBuffer(x3));
      }
      function setEquiv(a4, b4, opts, channel) {
        if ($setSize(a4) !== $setSize(b4)) {
          return false;
        }
        var iA = getIterator(a4);
        var iB = getIterator(b4);
        var resultA;
        var resultB;
        var set2;
        while ((resultA = iA.next()) && !resultA.done) {
          if (resultA.value && typeof resultA.value === "object") {
            if (!set2) {
              set2 = new $Set();
            }
            $setAdd(set2, resultA.value);
          } else if (!$setHas(b4, resultA.value)) {
            if (opts.strict) {
              return false;
            }
            if (!setMightHaveLoosePrim(a4, b4, resultA.value)) {
              return false;
            }
            if (!set2) {
              set2 = new $Set();
            }
            $setAdd(set2, resultA.value);
          }
        }
        if (set2) {
          while ((resultB = iB.next()) && !resultB.done) {
            if (resultB.value && typeof resultB.value === "object") {
              if (!setHasEqualElement(set2, resultB.value, opts.strict, channel)) {
                return false;
              }
            } else if (!opts.strict && !$setHas(a4, resultB.value) && !setHasEqualElement(set2, resultB.value, opts.strict, channel)) {
              return false;
            }
          }
          return $setSize(set2) === 0;
        }
        return true;
      }
      function mapEquiv(a4, b4, opts, channel) {
        if ($mapSize(a4) !== $mapSize(b4)) {
          return false;
        }
        var iA = getIterator(a4);
        var iB = getIterator(b4);
        var resultA;
        var resultB;
        var set2;
        var key;
        var item1;
        var item2;
        while ((resultA = iA.next()) && !resultA.done) {
          key = resultA.value[0];
          item1 = resultA.value[1];
          if (key && typeof key === "object") {
            if (!set2) {
              set2 = new $Set();
            }
            $setAdd(set2, key);
          } else {
            item2 = $mapGet(b4, key);
            if (typeof item2 === "undefined" && !$mapHas(b4, key) || !internalDeepEqual(item1, item2, opts, channel)) {
              if (opts.strict) {
                return false;
              }
              if (!mapMightHaveLoosePrim(a4, b4, key, item1, opts, channel)) {
                return false;
              }
              if (!set2) {
                set2 = new $Set();
              }
              $setAdd(set2, key);
            }
          }
        }
        if (set2) {
          while ((resultB = iB.next()) && !resultB.done) {
            key = resultB.value[0];
            item2 = resultB.value[1];
            if (key && typeof key === "object") {
              if (!mapHasEqualEntry(set2, a4, key, item2, opts, channel)) {
                return false;
              }
            } else if (!opts.strict && (!a4.has(key) || !internalDeepEqual($mapGet(a4, key), item2, opts, channel)) && !mapHasEqualEntry(set2, a4, key, item2, assign({}, opts, { strict: false }), channel)) {
              return false;
            }
          }
          return $setSize(set2) === 0;
        }
        return true;
      }
      function objEquiv(a4, b4, opts, channel) {
        var i8, key;
        if (typeof a4 !== typeof b4) {
          return false;
        }
        if (a4 == null || b4 == null) {
          return false;
        }
        if ($objToString(a4) !== $objToString(b4)) {
          return false;
        }
        if (isArguments(a4) !== isArguments(b4)) {
          return false;
        }
        var aIsArray = isArray(a4);
        var bIsArray = isArray(b4);
        if (aIsArray !== bIsArray) {
          return false;
        }
        var aIsError = a4 instanceof Error;
        var bIsError = b4 instanceof Error;
        if (aIsError !== bIsError) {
          return false;
        }
        if (aIsError || bIsError) {
          if (a4.name !== b4.name || a4.message !== b4.message) {
            return false;
          }
        }
        var aIsRegex = isRegex(a4);
        var bIsRegex = isRegex(b4);
        if (aIsRegex !== bIsRegex) {
          return false;
        }
        if ((aIsRegex || bIsRegex) && (a4.source !== b4.source || flags(a4) !== flags(b4))) {
          return false;
        }
        var aIsDate = isDate(a4);
        var bIsDate = isDate(b4);
        if (aIsDate !== bIsDate) {
          return false;
        }
        if (aIsDate || bIsDate) {
          if ($getTime(a4) !== $getTime(b4)) {
            return false;
          }
        }
        if (opts.strict && gPO && gPO(a4) !== gPO(b4)) {
          return false;
        }
        var aWhich = whichTypedArray(a4);
        var bWhich = whichTypedArray(b4);
        if (aWhich !== bWhich) {
          return false;
        }
        if (aWhich || bWhich) {
          if (a4.length !== b4.length) {
            return false;
          }
          for (i8 = 0; i8 < a4.length; i8++) {
            if (a4[i8] !== b4[i8]) {
              return false;
            }
          }
          return true;
        }
        var aIsBuffer = isBuffer(a4);
        var bIsBuffer = isBuffer(b4);
        if (aIsBuffer !== bIsBuffer) {
          return false;
        }
        if (aIsBuffer || bIsBuffer) {
          if (a4.length !== b4.length) {
            return false;
          }
          for (i8 = 0; i8 < a4.length; i8++) {
            if (a4[i8] !== b4[i8]) {
              return false;
            }
          }
          return true;
        }
        var aIsArrayBuffer = isArrayBuffer(a4);
        var bIsArrayBuffer = isArrayBuffer(b4);
        if (aIsArrayBuffer !== bIsArrayBuffer) {
          return false;
        }
        if (aIsArrayBuffer || bIsArrayBuffer) {
          if (byteLength(a4) !== byteLength(b4)) {
            return false;
          }
          return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a4), new Uint8Array(b4), opts, channel);
        }
        var aIsSAB = isSharedArrayBuffer(a4);
        var bIsSAB = isSharedArrayBuffer(b4);
        if (aIsSAB !== bIsSAB) {
          return false;
        }
        if (aIsSAB || bIsSAB) {
          if (sabByteLength(a4) !== sabByteLength(b4)) {
            return false;
          }
          return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a4), new Uint8Array(b4), opts, channel);
        }
        if (typeof a4 !== typeof b4) {
          return false;
        }
        var ka = objectKeys(a4);
        var kb = objectKeys(b4);
        if (ka.length !== kb.length) {
          return false;
        }
        ka.sort();
        kb.sort();
        for (i8 = ka.length - 1; i8 >= 0; i8--) {
          if (ka[i8] != kb[i8]) {
            return false;
          }
        }
        for (i8 = ka.length - 1; i8 >= 0; i8--) {
          key = ka[i8];
          if (!internalDeepEqual(a4[key], b4[key], opts, channel)) {
            return false;
          }
        }
        var aCollection = whichCollection(a4);
        var bCollection = whichCollection(b4);
        if (aCollection !== bCollection) {
          return false;
        }
        if (aCollection === "Set" || bCollection === "Set") {
          return setEquiv(a4, b4, opts, channel);
        }
        if (aCollection === "Map") {
          return mapEquiv(a4, b4, opts, channel);
        }
        return true;
      }
      module.exports = function deepEqual2(a4, b4, opts) {
        return internalDeepEqual(a4, b4, opts, getSideChannel());
      };
    }
  });

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t7, e8, o7) {
      if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e8;
    }
    get styleSheet() {
      let t7 = this.o;
      const s6 = this.t;
      if (e && void 0 === t7) {
        const e8 = void 0 !== s6 && 1 === s6.length;
        e8 && (t7 = o.get(s6)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s6, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t7) => new n("string" == typeof t7 ? t7 : t7 + "", void 0, s);
  var i = (t7, ...e8) => {
    const o7 = 1 === t7.length ? t7[0] : e8.reduce((e9, s6, o8) => e9 + ((t8) => {
      if (true === t8._$cssResult$) return t8.cssText;
      if ("number" == typeof t8) return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t7[o8 + 1], t7[0]);
    return new n(o7, t7, s);
  };
  var S = (s6, o7) => {
    if (e) s6.adoptedStyleSheets = o7.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
    else for (const e8 of o7) {
      const o8 = document.createElement("style"), n6 = t.litNonce;
      void 0 !== n6 && o8.setAttribute("nonce", n6), o8.textContent = e8.cssText, s6.appendChild(o8);
    }
  };
  var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e8 = "";
    for (const s6 of t8.cssRules) e8 += s6.cssText;
    return r(e8);
  })(t7) : t7;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t7, s6) => t7;
  var u = { toAttribute(t7, s6) {
    switch (s6) {
      case Boolean:
        t7 = t7 ? l : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, s6) {
    let i8 = t7;
    switch (s6) {
      case Boolean:
        i8 = null !== t7;
        break;
      case Number:
        i8 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          i8 = JSON.parse(t7);
        } catch (t8) {
          i8 = null;
        }
    }
    return i8;
  } };
  var f = (t7, s6) => !i2(t7, s6);
  var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
  Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
  var y = class extends HTMLElement {
    static addInitializer(t7) {
      this._$Ei(), (this.l ?? (this.l = [])).push(t7);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t7, s6 = b) {
      if (s6.state && (s6.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s6 = Object.create(s6)).wrapped = true), this.elementProperties.set(t7, s6), !s6.noAccessor) {
        const i8 = Symbol(), h5 = this.getPropertyDescriptor(t7, i8, s6);
        void 0 !== h5 && e2(this.prototype, t7, h5);
      }
    }
    static getPropertyDescriptor(t7, s6, i8) {
      const { get: e8, set: r7 } = h(this.prototype, t7) ?? { get() {
        return this[s6];
      }, set(t8) {
        this[s6] = t8;
      } };
      return { get: e8, set(s7) {
        const h5 = e8?.call(this);
        r7?.call(this, s7), this.requestUpdate(t7, h5, i8);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) ?? b;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t7 = n2(this);
      t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t8 = this.properties, s6 = [...r2(t8), ...o2(t8)];
        for (const i8 of s6) this.createProperty(i8, t8[i8]);
      }
      const t7 = this[Symbol.metadata];
      if (null !== t7) {
        const s6 = litPropertyMetadata.get(t7);
        if (void 0 !== s6) for (const [t8, i8] of s6) this.elementProperties.set(t8, i8);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t8, s6] of this.elementProperties) {
        const i8 = this._$Eu(t8, s6);
        void 0 !== i8 && this._$Eh.set(i8, t8);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s6) {
      const i8 = [];
      if (Array.isArray(s6)) {
        const e8 = new Set(s6.flat(1 / 0).reverse());
        for (const s7 of e8) i8.unshift(c(s7));
      } else void 0 !== s6 && i8.push(c(s6));
      return i8;
    }
    static _$Eu(t7, s6) {
      const i8 = s6.attribute;
      return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
    }
    addController(t7) {
      (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
    }
    removeController(t7) {
      this._$EO?.delete(t7);
    }
    _$E_() {
      const t7 = /* @__PURE__ */ new Map(), s6 = this.constructor.elementProperties;
      for (const i8 of s6.keys()) this.hasOwnProperty(i8) && (t7.set(i8, this[i8]), delete this[i8]);
      t7.size > 0 && (this._$Ep = t7);
    }
    createRenderRoot() {
      const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t7, this.constructor.elementStyles), t7;
    }
    connectedCallback() {
      this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t7) => t7.hostDisconnected?.());
    }
    attributeChangedCallback(t7, s6, i8) {
      this._$AK(t7, i8);
    }
    _$ET(t7, s6) {
      const i8 = this.constructor.elementProperties.get(t7), e8 = this.constructor._$Eu(t7, i8);
      if (void 0 !== e8 && true === i8.reflect) {
        const h5 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u).toAttribute(s6, i8.type);
        this._$Em = t7, null == h5 ? this.removeAttribute(e8) : this.setAttribute(e8, h5), this._$Em = null;
      }
    }
    _$AK(t7, s6) {
      const i8 = this.constructor, e8 = i8._$Eh.get(t7);
      if (void 0 !== e8 && this._$Em !== e8) {
        const t8 = i8.getPropertyOptions(e8), h5 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
        this._$Em = e8;
        const r7 = h5.fromAttribute(s6, t8.type);
        this[e8] = r7 ?? this._$Ej?.get(e8) ?? r7, this._$Em = null;
      }
    }
    requestUpdate(t7, s6, i8, e8 = false, h5) {
      if (void 0 !== t7) {
        const r7 = this.constructor;
        if (false === e8 && (h5 = this[t7]), i8 ?? (i8 = r7.getPropertyOptions(t7)), !((i8.hasChanged ?? f)(h5, s6) || i8.useDefault && i8.reflect && h5 === this._$Ej?.get(t7) && !this.hasAttribute(r7._$Eu(t7, i8)))) return;
        this.C(t7, s6, i8);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t7, s6, { useDefault: i8, reflect: e8, wrapped: h5 }, r7) {
      i8 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t7) && (this._$Ej.set(t7, r7 ?? s6 ?? this[t7]), true !== h5 || void 0 !== r7) || (this._$AL.has(t7) || (this.hasUpdated || i8 || (s6 = void 0), this._$AL.set(t7, s6)), true === e8 && this._$Em !== t7 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t7));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
          for (const [t9, s7] of this._$Ep) this[t9] = s7;
          this._$Ep = void 0;
        }
        const t8 = this.constructor.elementProperties;
        if (t8.size > 0) for (const [s7, i8] of t8) {
          const { wrapped: t9 } = i8, e8 = this[s7];
          true !== t9 || this._$AL.has(s7) || void 0 === e8 || this.C(s7, void 0, i8, e8);
        }
      }
      let t7 = false;
      const s6 = this._$AL;
      try {
        t7 = this.shouldUpdate(s6), t7 ? (this.willUpdate(s6), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s6)) : this._$EM();
      } catch (s7) {
        throw t7 = false, this._$EM(), s7;
      }
      t7 && this._$AE(s6);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EM() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      this._$Eq && (this._$Eq = this._$Eq.forEach((t8) => this._$ET(t8, this[t8]))), this._$EM();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = (t7) => t7;
  var s2 = t2.trustedTypes;
  var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var h2 = "$lit$";
  var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
  var n3 = "?" + o3;
  var r3 = `<${n3}>`;
  var l2 = document;
  var c3 = () => l2.createComment("");
  var a2 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var u2 = Array.isArray;
  var d2 = (t7) => u2(t7) || "function" == typeof t7?.[Symbol.iterator];
  var f2 = "[ 	\n\f\r]";
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $ = /"/g;
  var y2 = /^(?:script|style|textarea|title)$/i;
  var x = (t7) => (i8, ...s6) => ({ _$litType$: t7, strings: i8, values: s6 });
  var b2 = x(1);
  var w = x(2);
  var T = x(3);
  var E = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var C = /* @__PURE__ */ new WeakMap();
  var P = l2.createTreeWalker(l2, 129);
  function V(t7, i8) {
    if (!u2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i8) : i8;
  }
  var N = (t7, i8) => {
    const s6 = t7.length - 1, e8 = [];
    let n6, l4 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c6 = v;
    for (let i9 = 0; i9 < s6; i9++) {
      const s7 = t7[i9];
      let a4, u6, d4 = -1, f4 = 0;
      for (; f4 < s7.length && (c6.lastIndex = f4, u6 = c6.exec(s7), null !== u6); ) f4 = c6.lastIndex, c6 === v ? "!--" === u6[1] ? c6 = _ : void 0 !== u6[1] ? c6 = m : void 0 !== u6[2] ? (y2.test(u6[2]) && (n6 = RegExp("</" + u6[2], "g")), c6 = p2) : void 0 !== u6[3] && (c6 = p2) : c6 === p2 ? ">" === u6[0] ? (c6 = n6 ?? v, d4 = -1) : void 0 === u6[1] ? d4 = -2 : (d4 = c6.lastIndex - u6[2].length, a4 = u6[1], c6 = void 0 === u6[3] ? p2 : '"' === u6[3] ? $ : g) : c6 === $ || c6 === g ? c6 = p2 : c6 === _ || c6 === m ? c6 = v : (c6 = p2, n6 = void 0);
      const x3 = c6 === p2 && t7[i9 + 1].startsWith("/>") ? " " : "";
      l4 += c6 === v ? s7 + r3 : d4 >= 0 ? (e8.push(a4), s7.slice(0, d4) + h2 + s7.slice(d4) + o3 + x3) : s7 + o3 + (-2 === d4 ? i9 : x3);
    }
    return [V(t7, l4 + (t7[s6] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), e8];
  };
  var S2 = class _S {
    constructor({ strings: t7, _$litType$: i8 }, e8) {
      let r7;
      this.parts = [];
      let l4 = 0, a4 = 0;
      const u6 = t7.length - 1, d4 = this.parts, [f4, v4] = N(t7, i8);
      if (this.el = _S.createElement(f4, e8), P.currentNode = this.el.content, 2 === i8 || 3 === i8) {
        const t8 = this.el.content.firstChild;
        t8.replaceWith(...t8.childNodes);
      }
      for (; null !== (r7 = P.nextNode()) && d4.length < u6; ) {
        if (1 === r7.nodeType) {
          if (r7.hasAttributes()) for (const t8 of r7.getAttributeNames()) if (t8.endsWith(h2)) {
            const i9 = v4[a4++], s6 = r7.getAttribute(t8).split(o3), e9 = /([.?@])?(.*)/.exec(i9);
            d4.push({ type: 1, index: l4, name: e9[2], strings: s6, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r7.removeAttribute(t8);
          } else t8.startsWith(o3) && (d4.push({ type: 6, index: l4 }), r7.removeAttribute(t8));
          if (y2.test(r7.tagName)) {
            const t8 = r7.textContent.split(o3), i9 = t8.length - 1;
            if (i9 > 0) {
              r7.textContent = s2 ? s2.emptyScript : "";
              for (let s6 = 0; s6 < i9; s6++) r7.append(t8[s6], c3()), P.nextNode(), d4.push({ type: 2, index: ++l4 });
              r7.append(t8[i9], c3());
            }
          }
        } else if (8 === r7.nodeType) if (r7.data === n3) d4.push({ type: 2, index: l4 });
        else {
          let t8 = -1;
          for (; -1 !== (t8 = r7.data.indexOf(o3, t8 + 1)); ) d4.push({ type: 7, index: l4 }), t8 += o3.length - 1;
        }
        l4++;
      }
    }
    static createElement(t7, i8) {
      const s6 = l2.createElement("template");
      return s6.innerHTML = t7, s6;
    }
  };
  function M(t7, i8, s6 = t7, e8) {
    if (i8 === E) return i8;
    let h5 = void 0 !== e8 ? s6._$Co?.[e8] : s6._$Cl;
    const o7 = a2(i8) ? void 0 : i8._$litDirective$;
    return h5?.constructor !== o7 && (h5?._$AO?.(false), void 0 === o7 ? h5 = void 0 : (h5 = new o7(t7), h5._$AT(t7, s6, e8)), void 0 !== e8 ? (s6._$Co ?? (s6._$Co = []))[e8] = h5 : s6._$Cl = h5), void 0 !== h5 && (i8 = M(t7, h5._$AS(t7, i8.values), h5, e8)), i8;
  }
  var R = class {
    constructor(t7, i8) {
      this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i8;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t7) {
      const { el: { content: i8 }, parts: s6 } = this._$AD, e8 = (t7?.creationScope ?? l2).importNode(i8, true);
      P.currentNode = e8;
      let h5 = P.nextNode(), o7 = 0, n6 = 0, r7 = s6[0];
      for (; void 0 !== r7; ) {
        if (o7 === r7.index) {
          let i9;
          2 === r7.type ? i9 = new k(h5, h5.nextSibling, this, t7) : 1 === r7.type ? i9 = new r7.ctor(h5, r7.name, r7.strings, this, t7) : 6 === r7.type && (i9 = new Z(h5, this, t7)), this._$AV.push(i9), r7 = s6[++n6];
        }
        o7 !== r7?.index && (h5 = P.nextNode(), o7++);
      }
      return P.currentNode = l2, e8;
    }
    p(t7) {
      let i8 = 0;
      for (const s6 of this._$AV) void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t7, s6, i8), i8 += s6.strings.length - 2) : s6._$AI(t7[i8])), i8++;
    }
  };
  var k = class _k {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t7, i8, s6, e8) {
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t7, this._$AB = i8, this._$AM = s6, this.options = e8, this._$Cv = e8?.isConnected ?? true;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i8 = this._$AM;
      return void 0 !== i8 && 11 === t7?.nodeType && (t7 = i8.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i8 = this) {
      t7 = M(this, t7, i8), a2(t7) ? t7 === A || null == t7 || "" === t7 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t7 !== this._$AH && t7 !== E && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : d2(t7) ? this.k(t7) : this._(t7);
    }
    O(t7) {
      return this._$AA.parentNode.insertBefore(t7, this._$AB);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    _(t7) {
      this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(l2.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      const { values: i8, _$litType$: s6 } = t7, e8 = "number" == typeof s6 ? this._$AC(t7) : (void 0 === s6.el && (s6.el = S2.createElement(V(s6.h, s6.h[0]), this.options)), s6);
      if (this._$AH?._$AD === e8) this._$AH.p(i8);
      else {
        const t8 = new R(e8, this), s7 = t8.u(this.options);
        t8.p(i8), this.T(s7), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i8 = C.get(t7.strings);
      return void 0 === i8 && C.set(t7.strings, i8 = new S2(t7)), i8;
    }
    k(t7) {
      u2(this._$AH) || (this._$AH = [], this._$AR());
      const i8 = this._$AH;
      let s6, e8 = 0;
      for (const h5 of t7) e8 === i8.length ? i8.push(s6 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s6 = i8[e8], s6._$AI(h5), e8++;
      e8 < i8.length && (this._$AR(s6 && s6._$AB.nextSibling, e8), i8.length = e8);
    }
    _$AR(t7 = this._$AA.nextSibling, s6) {
      for (this._$AP?.(false, true, s6); t7 !== this._$AB; ) {
        const s7 = i3(t7).nextSibling;
        i3(t7).remove(), t7 = s7;
      }
    }
    setConnected(t7) {
      void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
    }
  };
  var H = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t7, i8, s6, e8, h5) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t7, this.name = i8, this._$AM = e8, this.options = h5, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = A;
    }
    _$AI(t7, i8 = this, s6, e8) {
      const h5 = this.strings;
      let o7 = false;
      if (void 0 === h5) t7 = M(this, t7, i8, 0), o7 = !a2(t7) || t7 !== this._$AH && t7 !== E, o7 && (this._$AH = t7);
      else {
        const e9 = t7;
        let n6, r7;
        for (t7 = h5[0], n6 = 0; n6 < h5.length - 1; n6++) r7 = M(this, e9[s6 + n6], i8, n6), r7 === E && (r7 = this._$AH[n6]), o7 || (o7 = !a2(r7) || r7 !== this._$AH[n6]), r7 === A ? t7 = A : t7 !== A && (t7 += (r7 ?? "") + h5[n6 + 1]), this._$AH[n6] = r7;
      }
      o7 && !e8 && this.j(t7);
    }
    j(t7) {
      t7 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
    }
  };
  var I = class extends H {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === A ? void 0 : t7;
    }
  };
  var L = class extends H {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      this.element.toggleAttribute(this.name, !!t7 && t7 !== A);
    }
  };
  var z = class extends H {
    constructor(t7, i8, s6, e8, h5) {
      super(t7, i8, s6, e8, h5), this.type = 5;
    }
    _$AI(t7, i8 = this) {
      if ((t7 = M(this, t7, i8, 0) ?? A) === E) return;
      const s6 = this._$AH, e8 = t7 === A && s6 !== A || t7.capture !== s6.capture || t7.once !== s6.once || t7.passive !== s6.passive, h5 = t7 !== A && (s6 === A || e8);
      e8 && this.element.removeEventListener(this.name, this, s6), h5 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var Z = class {
    constructor(t7, i8, s6) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      M(this, t7);
    }
  };
  var j = { M: h2, P: o3, A: n3, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
  var B = t2.litHtmlPolyfillSupport;
  B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
  var D = (t7, i8, s6) => {
    const e8 = s6?.renderBefore ?? i8;
    let h5 = e8._$litPart$;
    if (void 0 === h5) {
      const t8 = s6?.renderBefore ?? null;
      e8._$litPart$ = h5 = new k(i8.insertBefore(c3(), t8), t8, void 0, s6 ?? {});
    }
    return h5._$AI(t7), h5;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = globalThis;
  var i4 = class extends y {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var _a;
      const t7 = super.createRenderRoot();
      return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t7.firstChild), t7;
    }
    update(t7) {
      const r7 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = D(r7, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return E;
    }
  };
  i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
  var o4 = s3.litElementPolyfillSupport;
  o4?.({ LitElement: i4 });
  (s3.litElementVersions ?? (s3.litElementVersions = [])).push("4.2.2");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t7) => (e8, o7) => {
    void 0 !== o7 ? o7.addInitializer(() => {
      customElements.define(t7, e8);
    }) : customElements.define(t7, e8);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r4 = (t7 = o5, e8, r7) => {
    const { kind: n6, metadata: i8 } = r7;
    let s6 = globalThis.litPropertyMetadata.get(i8);
    if (void 0 === s6 && globalThis.litPropertyMetadata.set(i8, s6 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t7 = Object.create(t7)).wrapped = true), s6.set(r7.name, t7), "accessor" === n6) {
      const { name: o7 } = r7;
      return { set(r8) {
        const n7 = e8.get.call(this);
        e8.set.call(this, r8), this.requestUpdate(o7, n7, t7, true, r8);
      }, init(e9) {
        return void 0 !== e9 && this.C(o7, void 0, t7, e9), e9;
      } };
    }
    if ("setter" === n6) {
      const { name: o7 } = r7;
      return function(r8) {
        const n7 = this[o7];
        e8.call(this, r8), this.requestUpdate(o7, n7, t7, true, r8);
      };
    }
    throw Error("Unsupported decorator location: " + n6);
  };
  function n4(t7) {
    return (e8, o7) => "object" == typeof o7 ? r4(t7, e8, o7) : ((t8, e9, o8) => {
      const r7 = e9.hasOwnProperty(o8);
      return e9.constructor.createProperty(o8, t8), r7 ? Object.getOwnPropertyDescriptor(e9, o8) : void 0;
    })(t7, e8, o7);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function r5(r7) {
    return n4({ ...r7, state: true, attribute: false });
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var e4 = (e8, t7, c6) => (c6.configurable = true, c6.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e8, t7, c6), c6);

  // node_modules/@lit/reactive-element/decorators/query.js
  function e5(e8, r7) {
    return (n6, s6, i8) => {
      const o7 = (t7) => t7.renderRoot?.querySelector(e8) ?? null;
      if (r7) {
        const { get: e9, set: r8 } = "object" == typeof s6 ? n6 : i8 ?? (() => {
          const t7 = Symbol();
          return { get() {
            return this[t7];
          }, set(e10) {
            this[t7] = e10;
          } };
        })();
        return e4(n6, s6, { get() {
          let t7 = e9.call(this);
          return void 0 === t7 && (t7 = o7(this), (null !== t7 || this.hasUpdated) && r8.call(this, t7)), t7;
        } });
      }
      return e4(n6, s6, { get() {
        return o7(this);
      } });
    };
  }

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e6 = (t7) => (...e8) => ({ _$litDirective$: t7, values: e8 });
  var i5 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e8, i8) {
      this._$Ct = t7, this._$AM = e8, this._$Ci = i8;
    }
    _$AS(t7, e8) {
      return this.update(t7, e8);
    }
    update(t7, e8) {
      return this.render(...e8);
    }
  };

  // node_modules/lit-html/directive-helpers.js
  var { I: t5 } = j;
  var i6 = (o7) => o7;
  var s4 = () => document.createComment("");
  var v2 = (o7, n6, e8) => {
    const l4 = o7._$AA.parentNode, d4 = void 0 === n6 ? o7._$AB : n6._$AA;
    if (void 0 === e8) {
      const i8 = l4.insertBefore(s4(), d4), n7 = l4.insertBefore(s4(), d4);
      e8 = new t5(i8, n7, o7, o7.options);
    } else {
      const t7 = e8._$AB.nextSibling, n7 = e8._$AM, c6 = n7 !== o7;
      if (c6) {
        let t8;
        e8._$AQ?.(o7), e8._$AM = o7, void 0 !== e8._$AP && (t8 = o7._$AU) !== n7._$AU && e8._$AP(t8);
      }
      if (t7 !== d4 || c6) {
        let o8 = e8._$AA;
        for (; o8 !== t7; ) {
          const t8 = i6(o8).nextSibling;
          i6(l4).insertBefore(o8, d4), o8 = t8;
        }
      }
    }
    return e8;
  };
  var u3 = (o7, t7, i8 = o7) => (o7._$AI(t7, i8), o7);
  var m2 = {};
  var p3 = (o7, t7 = m2) => o7._$AH = t7;
  var M2 = (o7) => o7._$AH;
  var h3 = (o7) => {
    o7._$AR(), o7._$AA.remove();
  };

  // node_modules/lit-html/directives/repeat.js
  var u4 = (e8, s6, t7) => {
    const r7 = /* @__PURE__ */ new Map();
    for (let l4 = s6; l4 <= t7; l4++) r7.set(e8[l4], l4);
    return r7;
  };
  var c4 = e6(class extends i5 {
    constructor(e8) {
      if (super(e8), e8.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
    }
    dt(e8, s6, t7) {
      let r7;
      void 0 === t7 ? t7 = s6 : void 0 !== s6 && (r7 = s6);
      const l4 = [], o7 = [];
      let i8 = 0;
      for (const s7 of e8) l4[i8] = r7 ? r7(s7, i8) : i8, o7[i8] = t7(s7, i8), i8++;
      return { values: o7, keys: l4 };
    }
    render(e8, s6, t7) {
      return this.dt(e8, s6, t7).values;
    }
    update(s6, [t7, r7, c6]) {
      const d4 = M2(s6), { values: p5, keys: a4 } = this.dt(t7, r7, c6);
      if (!Array.isArray(d4)) return this.ut = a4, p5;
      const h5 = this.ut ?? (this.ut = []), v4 = [];
      let m4, y4, x3 = 0, j3 = d4.length - 1, k3 = 0, w3 = p5.length - 1;
      for (; x3 <= j3 && k3 <= w3; ) if (null === d4[x3]) x3++;
      else if (null === d4[j3]) j3--;
      else if (h5[x3] === a4[k3]) v4[k3] = u3(d4[x3], p5[k3]), x3++, k3++;
      else if (h5[j3] === a4[w3]) v4[w3] = u3(d4[j3], p5[w3]), j3--, w3--;
      else if (h5[x3] === a4[w3]) v4[w3] = u3(d4[x3], p5[w3]), v2(s6, v4[w3 + 1], d4[x3]), x3++, w3--;
      else if (h5[j3] === a4[k3]) v4[k3] = u3(d4[j3], p5[k3]), v2(s6, d4[x3], d4[j3]), j3--, k3++;
      else if (void 0 === m4 && (m4 = u4(a4, k3, w3), y4 = u4(h5, x3, j3)), m4.has(h5[x3])) if (m4.has(h5[j3])) {
        const e8 = y4.get(a4[k3]), t8 = void 0 !== e8 ? d4[e8] : null;
        if (null === t8) {
          const e9 = v2(s6, d4[x3]);
          u3(e9, p5[k3]), v4[k3] = e9;
        } else v4[k3] = u3(t8, p5[k3]), v2(s6, d4[x3], t8), d4[e8] = null;
        k3++;
      } else h3(d4[j3]), j3--;
      else h3(d4[x3]), x3++;
      for (; k3 <= w3; ) {
        const e8 = v2(s6, v4[w3 + 1]);
        u3(e8, p5[k3]), v4[k3++] = e8;
      }
      for (; x3 <= j3; ) {
        const e8 = d4[x3++];
        null !== e8 && h3(e8);
      }
      return this.ut = a4, p3(s6, v4), E;
    }
  });

  // src/chat_history.ts
  var SCROLL_THRESHOLD = 10;
  var ChatHistory = class extends i4 {
    constructor() {
      super(...arguments);
      this.history = [];
      this.isScrolledToBottom = true;
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("scroll", this.handleScroll);
      this.resizeObserver = new ResizeObserver(() => {
        if (this.isScrolledToBottom) {
          this.scrollToBottom();
        }
      });
      this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("scroll", this.handleScroll);
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    }
    handleScroll() {
      const atBottom = this.scrollHeight - this.scrollTop <= this.clientHeight + SCROLL_THRESHOLD;
      this.isScrolledToBottom = atBottom;
    }
    scrollToBottom() {
      this.scrollTop = this.scrollHeight;
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      if (changedProperties.has("history") && this.isScrolledToBottom) {
        Promise.resolve().then(() => this.scrollToBottom());
      }
    }
    getTokenInfoText(message) {
      let latencyInfo = "";
      const { latencyMilliseconds, generatedTokenCount } = message;
      if (latencyMilliseconds != null && generatedTokenCount != null) {
        latencyInfo = ` in ${(latencyMilliseconds / 1e3).toFixed(1)} sec`;
      }
      const tokenCount = message.templateApplied?.tokenCount ?? "N/A";
      return `(${tokenCount} Tokens${latencyInfo})`;
    }
    handleRedoLastMessage() {
      const event = new CustomEvent("regenerate-last-model-message", {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
    handleRemoveLastMessage() {
      const event = new CustomEvent("remove-last-message", {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
    render() {
      return b2`
      ${c4(
        this.history,
        (message, index) => `${message.role}-${index}-${message.text.length}-${message.doneGenerating}`,
        (message, index) => {
          const isLastMessage = index === this.history.length - 1 && this.history.length > 0;
          const canShowActions = isLastMessage && (message.role === "model" ? message.doneGenerating : true);
          return b2`
            <div class="message-wrapper ${message.role === "user" ? "user-message" : "model-message"}">
              <div class="message-container">
                <div class="role">
                  ${message.role.charAt(0).toUpperCase() + message.role.slice(1)}
                </div>
                <div class="text">${message.text}</div>
                ${message.templateApplied ? b2`
                      <div class="token-info">
                        ${this.getTokenInfoText(message)}
                      </div>
                    ` : ""}
              </div>

              ${canShowActions ? b2`
                    <div class="action-buttons-container">
                      <button
                        class="action-button remove-button"
                        @click=${this.handleRemoveLastMessage}
                        title="Remove this message"
                      >
                        ✕
                      </button>
                      ${message.role === "model" && message.doneGenerating === true ? b2`
                            <button
                              class="action-button redo-button"
                              @click=${this.handleRedoLastMessage}
                              title="Regenerate this message"
                            >
                              ↻
                            </button>` : ""}
                    </div>
                  ` : ""}
            </div>
          `;
        }
      )}
    `;
    }
  };
  ChatHistory.styles = i`
    :host {
      display: block;
      font-family: sans-serif;
      padding: 16px;
      overflow-y: auto;
      flex-grow: 1;
      min-height: 0;
    }

    .message-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }

    .message-container {
      padding: 8px;
      border-radius: 6px;
      max-width: 80%;
      word-wrap: break-word;
    }

    .user-message .message-container {
      background-color: #e1f5fe;
      margin-left: auto;
      text-align: right;
    }
    .user-message {
      align-items: flex-end;
    }

    .model-message .message-container {
      background-color: #f0f0f0;
      margin-right: auto;
      text-align: left;
    }
    .model-message {
      align-items: flex-start;
    }

    .role {
      font-weight: bold;
      font-size: 0.9em;
      margin-bottom: 4px;
      color: #555;
    }

    .text {
      font-size: 1em;
      white-space: pre-wrap;
    }

    .token-info {
      font-size: 0.7em;
      color: grey;
      margin-top: 5px;
    }

    .action-buttons-container {
      margin-top: 2px; /* Reduced margin slightly for icon buttons */
      max-width: 80%;
      display: flex;
      gap: 4px; /* Reduced gap slightly */
    }

    .model-message .action-buttons-container {
      justify-content: flex-start;
    }

    .user-message .action-buttons-container {
      justify-content: flex-end;
    }

    .action-button {
      border: none;
      background-color: transparent;
      padding: 4px; /* Adjust padding for icon size */
      font-size: 1.1em; /* Make icons a bit larger */
      cursor: pointer;
      color: #555; /* Default icon color */
      border-radius: 4px; /* Optional: for hover effect consistency */
      line-height: 1; /* Ensure icon is vertically centered */
    }

    .action-button:hover {
      background-color: #e0e0e0; /* Subtle hover effect */
      color: #333;
    }
    .action-button:active {
      background-color: #d0d0d0; /* Subtle active effect */
    }

    .redo-button {
      /* Specific styles for redo icon if needed, e.g., color */
    }

    .remove-button {
      color: #c82333; /* Red color for the 'x' icon */
    }
    .remove-button:hover {
      color: #a81d2a;
      background-color: #f8d7da; /* Light red hover for remove */
    }
    .remove-button:active {
      background-color: #f1c1c7;
    }
  `;
  __decorateClass([
    n4({ type: Array })
  ], ChatHistory.prototype, "history", 2);
  __decorateClass([
    r5()
  ], ChatHistory.prototype, "isScrolledToBottom", 2);
  ChatHistory = __decorateClass([
    t3("chat-history")
  ], ChatHistory);

  // src/constants.ts
  var DEFAULT_OPTIONS = {
    baseOptions: {
      modelAssetPath: void 0
    },
    numResponses: 1,
    topK: 64,
    temperature: 1,
    maxTokens: 1536,
    forceF32: false
  };

  // node_modules/@mediapipe/tasks-genai/genai_bundle.mjs
  var t6 = "undefined" != typeof self ? self : {};
  function e7(e8, n6) {
    t: {
      for (var r7 = ["CLOSURE_FLAGS"], i8 = t6, o7 = 0; o7 < r7.length; o7++) if (null == (i8 = i8[r7[o7]])) {
        r7 = null;
        break t;
      }
      r7 = i8;
    }
    return null != (e8 = r7 && r7[e8]) ? e8 : n6;
  }
  var n5;
  var r6 = "undefined" != typeof TextEncoder;
  function i7(t7) {
    if (r6) t7 = (n5 || (n5 = new TextEncoder())).encode(t7);
    else {
      let n6 = 0;
      const r7 = new Uint8Array(3 * t7.length);
      for (let i8 = 0; i8 < t7.length; i8++) {
        var e8 = t7.charCodeAt(i8);
        if (e8 < 128) r7[n6++] = e8;
        else {
          if (e8 < 2048) r7[n6++] = e8 >> 6 | 192;
          else {
            if (e8 >= 55296 && e8 <= 57343) {
              if (e8 <= 56319 && i8 < t7.length) {
                const o7 = t7.charCodeAt(++i8);
                if (o7 >= 56320 && o7 <= 57343) {
                  e8 = 1024 * (e8 - 55296) + o7 - 56320 + 65536, r7[n6++] = e8 >> 18 | 240, r7[n6++] = e8 >> 12 & 63 | 128, r7[n6++] = e8 >> 6 & 63 | 128, r7[n6++] = 63 & e8 | 128;
                  continue;
                }
                i8--;
              }
              e8 = 65533;
            }
            r7[n6++] = e8 >> 12 | 224, r7[n6++] = e8 >> 6 & 63 | 128;
          }
          r7[n6++] = 63 & e8 | 128;
        }
      }
      t7 = n6 === r7.length ? r7 : r7.subarray(0, n6);
    }
    return t7;
  }
  var o6;
  var s5 = e7(610401301, false);
  var a3 = e7(748402147, true);
  var u5 = e7(824656860, e7(1, true));
  function c5() {
    var e8 = t6.navigator;
    return e8 && (e8 = e8.userAgent) ? e8 : "";
  }
  var l3 = t6.navigator;
  o6 = l3 && l3.userAgentData || null;
  var h4 = {};
  var f3 = null;
  function d3(t7) {
    const e8 = t7.length;
    let n6 = 3 * e8 / 4;
    n6 % 3 ? n6 = Math.floor(n6) : -1 != "=.".indexOf(t7[e8 - 1]) && (n6 = -1 != "=.".indexOf(t7[e8 - 2]) ? n6 - 2 : n6 - 1);
    const r7 = new Uint8Array(n6);
    let i8 = 0;
    return function(t8, e9) {
      function n7(e10) {
        for (; r8 < t8.length; ) {
          const e11 = t8.charAt(r8++), n8 = f3[e11];
          if (null != n8) return n8;
          if (!/^[\s\xa0]*$/.test(e11)) throw Error("Unknown base64 encoding at char: " + e11);
        }
        return e10;
      }
      p4();
      let r8 = 0;
      for (; ; ) {
        const t9 = n7(-1), r9 = n7(0), i9 = n7(64), o7 = n7(64);
        if (64 === o7 && -1 === t9) break;
        e9(t9 << 2 | r9 >> 4), 64 != i9 && (e9(r9 << 4 & 240 | i9 >> 2), 64 != o7 && e9(i9 << 6 & 192 | o7));
      }
    }(t7, function(t8) {
      r7[i8++] = t8;
    }), i8 !== n6 ? r7.subarray(0, i8) : r7;
  }
  function p4() {
    if (!f3) {
      f3 = {};
      var t7 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e8 = ["+/=", "+/", "-_=", "-_.", "-_"];
      for (let n6 = 0; n6 < 5; n6++) {
        const r7 = t7.concat(e8[n6].split(""));
        h4[n6] = r7;
        for (let t8 = 0; t8 < r7.length; t8++) {
          const e9 = r7[t8];
          void 0 === f3[e9] && (f3[e9] = t8);
        }
      }
    }
  }
  var m3 = "undefined" != typeof Uint8Array;
  var g2 = !(!(s5 && o6 && o6.brands.length > 0) && (-1 != c5().indexOf("Trident") || -1 != c5().indexOf("MSIE"))) && "function" == typeof btoa;
  var _2 = /[-_.]/g;
  var y3 = { "-": "+", _: "/", ".": "=" };
  function w2(t7) {
    return y3[t7] || "";
  }
  function b3(t7) {
    if (!g2) return d3(t7);
    t7 = _2.test(t7) ? t7.replace(_2, w2) : t7, t7 = atob(t7);
    const e8 = new Uint8Array(t7.length);
    for (let n6 = 0; n6 < t7.length; n6++) e8[n6] = t7.charCodeAt(n6);
    return e8;
  }
  function v3(t7) {
    return m3 && null != t7 && t7 instanceof Uint8Array;
  }
  var S3 = {};
  function E2() {
    return I2 || (I2 = new A2(null, S3));
  }
  var A2 = class {
    constructor(t7, e8) {
      if (L2(e8), this.i = t7, null != t7 && 0 === t7.length) throw Error("ByteString should be constructed with non-empty values");
    }
  };
  var I2;
  var T2;
  function L2(t7) {
    if (t7 !== S3) throw Error("illegal external caller");
  }
  function P2(t7, e8) {
    t7.__closure__error__context__984382 || (t7.__closure__error__context__984382 = {}), t7.__closure__error__context__984382.severity = e8;
  }
  function O(t7) {
    return P2(t7 = Error(t7), "warning"), t7;
  }
  function j2(e8, n6) {
    if (null != e8) {
      var r7 = T2 ?? (T2 = {}), i8 = r7[e8] || 0;
      i8 >= n6 || (r7[e8] = i8 + 1, P2(e8 = Error(), "incident"), function(e9) {
        t6.setTimeout(() => {
          throw e9;
        }, 0);
      }(e8));
    }
  }
  function k2() {
    return "function" == typeof BigInt;
  }
  var x2 = "function" == typeof Symbol && "symbol" == typeof Symbol();
  function U(t7, e8, n6 = false) {
    return "function" == typeof Symbol && "symbol" == typeof Symbol() ? n6 && Symbol.for && t7 ? Symbol.for(t7) : null != t7 ? Symbol(t7) : Symbol() : e8;
  }
  var B2 = U("jas", void 0, true);
  var N2 = U(void 0, "1oa");
  var F = U(void 0, "0ubsb");
  var R2 = U(void 0, "0actk");
  var D2 = U("m_m", "pa", true);
  var C2 = { ha: { value: 0, configurable: true, writable: true, enumerable: false } };
  var M3 = Object.defineProperties;
  var V2 = x2 ? B2 : "ha";
  var G;
  var z2 = [];
  function W(t7, e8) {
    x2 || V2 in t7 || M3(t7, C2), t7[V2] |= e8;
  }
  function H2(t7, e8) {
    x2 || V2 in t7 || M3(t7, C2), t7[V2] = e8;
  }
  H2(z2, 7), G = Object.freeze(z2);
  var $2 = {};
  function q(t7, e8) {
    return void 0 === e8 ? t7.i !== K && !!(2 & (0 | t7.m[V2])) : !!(2 & e8) && t7.i !== K;
  }
  var K = {};
  var Y = Object.freeze({});
  function J(t7) {
    return t7.oa = true, t7;
  }
  var X = J((t7) => "number" == typeof t7);
  var Q = J((t7) => "string" == typeof t7);
  var Z2 = J((t7) => "boolean" == typeof t7);
  var tt = "function" == typeof t6.BigInt && "bigint" == typeof t6.BigInt(0);
  var et = J((t7) => tt ? t7 >= rt && t7 <= ot : "-" === t7[0] ? st(t7, nt) : st(t7, it));
  var nt = Number.MIN_SAFE_INTEGER.toString();
  var rt = tt ? BigInt(Number.MIN_SAFE_INTEGER) : void 0;
  var it = Number.MAX_SAFE_INTEGER.toString();
  var ot = tt ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
  function st(t7, e8) {
    if (t7.length > e8.length) return false;
    if (t7.length < e8.length || t7 === e8) return true;
    for (let n6 = 0; n6 < t7.length; n6++) {
      const r7 = t7[n6], i8 = e8[n6];
      if (r7 > i8) return false;
      if (r7 < i8) return true;
    }
  }
  var at;
  var ut = 0;
  var ct = 0;
  function lt(t7) {
    const e8 = t7 >>> 0;
    ut = e8, ct = (t7 - e8) / 4294967296 >>> 0;
  }
  function ht(t7) {
    if (t7 < 0) {
      lt(-t7);
      const [e8, n6] = gt(ut, ct);
      ut = e8 >>> 0, ct = n6 >>> 0;
    } else lt(t7);
  }
  function ft(t7, e8) {
    const n6 = 4294967296 * e8 + (t7 >>> 0);
    return Number.isSafeInteger(n6) ? n6 : dt(t7, e8);
  }
  function dt(t7, e8) {
    if (t7 >>>= 0, (e8 >>>= 0) <= 2097151) var n6 = "" + (4294967296 * e8 + t7);
    else k2() ? n6 = "" + (BigInt(e8) << BigInt(32) | BigInt(t7)) : (t7 = (16777215 & t7) + 6777216 * (n6 = 16777215 & (t7 >>> 24 | e8 << 8)) + 6710656 * (e8 = e8 >> 16 & 65535), n6 += 8147497 * e8, e8 *= 2, t7 >= 1e7 && (n6 += t7 / 1e7 >>> 0, t7 %= 1e7), n6 >= 1e7 && (e8 += n6 / 1e7 >>> 0, n6 %= 1e7), n6 = e8 + pt(n6) + pt(t7));
    return n6;
  }
  function pt(t7) {
    return t7 = String(t7), "0000000".slice(t7.length) + t7;
  }
  function mt(t7) {
    if (t7.length < 16) ht(Number(t7));
    else if (k2()) t7 = BigInt(t7), ut = Number(t7 & BigInt(4294967295)) >>> 0, ct = Number(t7 >> BigInt(32) & BigInt(4294967295));
    else {
      const e8 = +("-" === t7[0]);
      ct = ut = 0;
      const n6 = t7.length;
      for (let r7 = e8, i8 = (n6 - e8) % 6 + e8; i8 <= n6; r7 = i8, i8 += 6) {
        const e9 = Number(t7.slice(r7, i8));
        ct *= 1e6, ut = 1e6 * ut + e9, ut >= 4294967296 && (ct += Math.trunc(ut / 4294967296), ct >>>= 0, ut >>>= 0);
      }
      if (e8) {
        const [t8, e9] = gt(ut, ct);
        ut = t8, ct = e9;
      }
    }
  }
  function gt(t7, e8) {
    return e8 = ~e8, t7 ? t7 = 1 + ~t7 : e8 += 1, [t7, e8];
  }
  function _t(t7) {
    return Array.prototype.slice.call(t7);
  }
  var yt = "function" == typeof BigInt ? BigInt.asIntN : void 0;
  var wt = "function" == typeof BigInt ? BigInt.asUintN : void 0;
  var bt = Number.isSafeInteger;
  var vt = Number.isFinite;
  var St = Math.trunc;
  function Et(t7) {
    if (null != t7 && "number" != typeof t7) throw Error(`Value of float/double field must be a number, found ${typeof t7}: ${t7}`);
    return t7;
  }
  function At(t7) {
    return null == t7 || "number" == typeof t7 ? t7 : "NaN" === t7 || "Infinity" === t7 || "-Infinity" === t7 ? Number(t7) : void 0;
  }
  function It(t7) {
    if (null != t7 && "boolean" != typeof t7) {
      var e8 = typeof t7;
      throw Error(`Expected boolean but got ${"object" != e8 ? e8 : t7 ? Array.isArray(t7) ? "array" : e8 : "null"}: ${t7}`);
    }
    return t7;
  }
  function Tt(t7) {
    return null == t7 || "boolean" == typeof t7 ? t7 : "number" == typeof t7 ? !!t7 : void 0;
  }
  var Lt = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function Pt(t7) {
    switch (typeof t7) {
      case "bigint":
        return true;
      case "number":
        return vt(t7);
      case "string":
        return Lt.test(t7);
      default:
        return false;
    }
  }
  function Ot(t7) {
    if ("number" != typeof t7) throw O("int32");
    if (!vt(t7)) throw O("int32");
    return 0 | t7;
  }
  function jt(t7) {
    return null == t7 ? t7 : Ot(t7);
  }
  function kt(t7) {
    if (null == t7) return t7;
    if ("string" == typeof t7 && t7) t7 = +t7;
    else if ("number" != typeof t7) return;
    return vt(t7) ? 0 | t7 : void 0;
  }
  function xt(t7) {
    if (null == t7) return t7;
    if ("string" == typeof t7 && t7) t7 = +t7;
    else if ("number" != typeof t7) return;
    return vt(t7) ? t7 >>> 0 : void 0;
  }
  function Ut(t7) {
    return null == t7 || "string" == typeof t7 ? t7 : void 0;
  }
  function Bt(t7, e8, n6) {
    if (null != t7 && t7[D2] === $2) return t7;
    if (Array.isArray(t7)) {
      var r7 = 0 | t7[V2];
      return (n6 = r7 | 32 & n6 | 2 & n6) !== r7 && H2(t7, n6), new e8(t7);
    }
  }
  function Nt(t7, e8, n6, r7) {
    var i8 = void 0 !== r7;
    r7 = !!r7;
    const o7 = [];
    var s6 = t7.length;
    let a4, u6 = 4294967295, c6 = false;
    const l4 = !!(64 & e8), h5 = l4 ? 128 & e8 ? 0 : -1 : void 0;
    for (1 & e8 || (a4 = s6 && t7[s6 - 1], null != a4 && "object" == typeof a4 && a4.constructor === Object ? u6 = --s6 : a4 = void 0, !l4 || 128 & e8 || i8 || (c6 = true, u6 = u6 - h5 + h5)), e8 = void 0, i8 = 0; i8 < s6; i8++) {
      let s7 = t7[i8];
      if (null != s7 && null != (s7 = n6(s7, r7))) if (l4 && i8 >= u6) {
        const t8 = i8 - h5;
        (e8 ?? (e8 = {}))[t8] = s7;
      } else o7[i8] = s7;
    }
    if (a4) for (let i9 in a4) {
      if (null == (t7 = a4[i9]) || null == (t7 = n6(t7, r7))) continue;
      let c7;
      s6 = +i9, l4 && !Number.isNaN(s6) && (c7 = s6 + h5) < u6 ? o7[c7] = t7 : (e8 ?? (e8 = {}))[i9] = t7;
    }
    return e8 && (c6 ? o7.push(e8) : o7[u6] = e8), o7;
  }
  function Ft(t7) {
    switch (typeof t7) {
      case "number":
        return Number.isFinite(t7) ? t7 : "" + t7;
      case "bigint":
        return et(t7) ? Number(t7) : "" + t7;
      case "boolean":
        return t7 ? 1 : 0;
      case "object":
        if (Array.isArray(t7)) {
          var e8 = 0 | t7[V2];
          return 0 === t7.length && 1 & e8 ? void 0 : Nt(t7, e8, Ft);
        }
        if (null != t7 && t7[D2] === $2) return Rt(t7);
        if (t7 instanceof A2) {
          if (null == (e8 = t7.i)) t7 = "";
          else if ("string" == typeof e8) t7 = e8;
          else {
            if (g2) {
              for (var n6 = "", r7 = 0, i8 = e8.length - 10240; r7 < i8; ) n6 += String.fromCharCode.apply(null, e8.subarray(r7, r7 += 10240));
              n6 += String.fromCharCode.apply(null, r7 ? e8.subarray(r7) : e8), e8 = btoa(n6);
            } else {
              void 0 === n6 && (n6 = 0), p4(), n6 = h4[n6], r7 = Array(Math.floor(e8.length / 3)), i8 = n6[64] || "";
              let t8 = 0, c6 = 0;
              for (; t8 < e8.length - 2; t8 += 3) {
                var o7 = e8[t8], s6 = e8[t8 + 1], a4 = e8[t8 + 2], u6 = n6[o7 >> 2];
                o7 = n6[(3 & o7) << 4 | s6 >> 4], s6 = n6[(15 & s6) << 2 | a4 >> 6], a4 = n6[63 & a4], r7[c6++] = u6 + o7 + s6 + a4;
              }
              switch (u6 = 0, a4 = i8, e8.length - t8) {
                case 2:
                  a4 = n6[(15 & (u6 = e8[t8 + 1])) << 2] || i8;
                case 1:
                  e8 = e8[t8], r7[c6] = n6[e8 >> 2] + n6[(3 & e8) << 4 | u6 >> 4] + a4 + i8;
              }
              e8 = r7.join("");
            }
            t7 = t7.i = e8;
          }
          return t7;
        }
        return;
    }
    return t7;
  }
  function Rt(t7) {
    return Nt(t7 = t7.m, 0 | t7[V2], Ft);
  }
  var Dt;
  var Ct;
  function Mt(t7, e8, n6, r7 = 0) {
    if (null == t7) {
      var i8 = 32;
      n6 ? (t7 = [n6], i8 |= 128) : t7 = [], e8 && (i8 = -16760833 & i8 | (1023 & e8) << 14);
    } else {
      if (!Array.isArray(t7)) throw Error("narr");
      if (i8 = 0 | t7[V2], a3 && 1 & i8) throw Error("rfarr");
      if (2048 & i8 && !(2 & i8) && function() {
        if (a3) throw Error("carr");
        j2(R2, 5);
      }(), 256 & i8) throw Error("farr");
      if (64 & i8) return (i8 | r7) !== i8 && H2(t7, i8 | r7), t7;
      if (n6 && (i8 |= 128, n6 !== t7[0])) throw Error("mid");
      t: {
        i8 |= 64;
        var o7 = (n6 = t7).length;
        if (o7) {
          var s6 = o7 - 1;
          const t8 = n6[s6];
          if (null != t8 && "object" == typeof t8 && t8.constructor === Object) {
            if ((s6 -= e8 = 128 & i8 ? 0 : -1) >= 1024) throw Error("pvtlmt");
            for (var u6 in t8) (o7 = +u6) < s6 && (n6[o7 + e8] = t8[u6], delete t8[u6]);
            i8 = -16760833 & i8 | (1023 & s6) << 14;
            break t;
          }
        }
        if (e8) {
          if ((u6 = Math.max(e8, o7 - (128 & i8 ? 0 : -1))) > 1024) throw Error("spvt");
          i8 = -16760833 & i8 | (1023 & u6) << 14;
        }
      }
    }
    return H2(t7, 64 | i8 | r7), t7;
  }
  function Vt(t7, e8) {
    if ("object" != typeof t7) return t7;
    if (Array.isArray(t7)) {
      var n6 = 0 | t7[V2];
      return 0 === t7.length && 1 & n6 ? t7 = void 0 : 2 & n6 || (!e8 || 4096 & n6 || 16 & n6 ? t7 = zt(t7, n6, false, e8 && !(16 & n6)) : (W(t7, 34), 4 & n6 && Object.freeze(t7))), t7;
    }
    return null != t7 && t7[D2] === $2 ? q(t7, n6 = 0 | (e8 = t7.m)[V2]) ? t7 : qt(t7, e8, n6) ? Gt(t7, e8) : zt(e8, n6) : t7 instanceof A2 ? t7 : void 0;
  }
  function Gt(t7, e8, n6) {
    return t7 = new t7.constructor(e8), n6 && (t7.i = K), t7.o = K, t7;
  }
  function zt(t7, e8, n6, r7) {
    return r7 ?? (r7 = !!(34 & e8)), t7 = Nt(t7, e8, Vt, r7), r7 = 32, n6 && (r7 |= 2), H2(t7, e8 = 16769217 & e8 | r7), t7;
  }
  function Wt(t7) {
    if (t7.i !== K) return false;
    var e8 = t7.m;
    return W(e8 = zt(e8, 0 | e8[V2]), 2048), t7.m = e8, t7.i = void 0, t7.o = void 0, true;
  }
  function Ht(t7) {
    if (!Wt(t7) && q(t7, 0 | t7.m[V2])) throw Error();
  }
  function $t(t7, e8) {
    void 0 === e8 && (e8 = 0 | t7[V2]), 32 & e8 && !(4096 & e8) && H2(t7, 4096 | e8);
  }
  function qt(t7, e8, n6) {
    return !!(2 & n6) || !(!(32 & n6) || 4096 & n6) && (H2(e8, 2 | n6), t7.i = K, true);
  }
  function Kt(t7, e8, n6) {
    if (null !== (t7 = Yt(t7.m, e8, void 0, n6))) return t7;
  }
  function Yt(t7, e8, n6, r7) {
    if (-1 === e8) return null;
    const i8 = e8 + (n6 ? 0 : -1), o7 = t7.length - 1;
    let s6, a4;
    if (!(o7 < 1 + (n6 ? 0 : -1))) {
      if (i8 >= o7) if (s6 = t7[o7], null != s6 && "object" == typeof s6 && s6.constructor === Object) n6 = s6[e8], a4 = true;
      else {
        if (i8 !== o7) return;
        n6 = s6;
      }
      else n6 = t7[i8];
      if (r7 && null != n6) {
        if (null == (r7 = r7(n6))) return r7;
        if (!Object.is(r7, n6)) return a4 ? s6[e8] = r7 : t7[i8] = r7, r7;
      }
      return n6;
    }
  }
  function Jt(t7, e8, n6) {
    Ht(t7), Xt(t7 = t7.m, 0 | t7[V2], e8, n6);
  }
  function Xt(t7, e8, n6, r7, i8) {
    const o7 = n6 + (i8 ? 0 : -1);
    var s6 = t7.length - 1;
    if (s6 >= 1 + (i8 ? 0 : -1) && o7 >= s6) {
      const i9 = t7[s6];
      if (null != i9 && "object" == typeof i9 && i9.constructor === Object) return i9[n6] = r7, e8;
    }
    return o7 <= s6 ? (t7[o7] = r7, e8) : (void 0 !== r7 && (n6 >= (s6 = (e8 ?? (e8 = 0 | t7[V2])) >> 14 & 1023 || 536870912) ? null != r7 && (t7[s6 + (i8 ? 0 : -1)] = { [n6]: r7 }) : t7[o7] = r7), e8);
  }
  function Qt(t7, e8, n6, r7, i8) {
    let o7 = t7.m, s6 = 0 | o7[V2];
    r7 = q(t7, s6) ? 1 : r7, i8 = !!i8 || 3 === r7, 2 === r7 && Wt(t7) && (o7 = t7.m, s6 = 0 | o7[V2]);
    let a4 = (t7 = te(o7, e8)) === G ? 7 : 0 | t7[V2], u6 = ee(a4, s6);
    var c6 = !(4 & u6);
    if (c6) {
      4 & u6 && (t7 = _t(t7), a4 = 0, u6 = le(u6, s6), s6 = Xt(o7, s6, e8, t7));
      let r8 = 0, i9 = 0;
      for (; r8 < t7.length; r8++) {
        const e9 = n6(t7[r8]);
        null != e9 && (t7[i9++] = e9);
      }
      i9 < r8 && (t7.length = i9), n6 = -513 & (4 | u6), u6 = n6 &= -1025, u6 &= -4097;
    }
    return u6 !== a4 && (H2(t7, u6), 2 & u6 && Object.freeze(t7)), Zt(t7, u6, o7, s6, e8, r7, c6, i8);
  }
  function Zt(t7, e8, n6, r7, i8, o7, s6, a4) {
    let u6 = e8;
    return 1 === o7 || 4 === o7 && (2 & e8 || !(16 & e8) && 32 & r7) ? ne(e8) || ((e8 |= !t7.length || s6 && !(4096 & e8) || 32 & r7 && !(4096 & e8 || 16 & e8) ? 2 : 256) !== u6 && H2(t7, e8), Object.freeze(t7)) : (2 === o7 && ne(e8) && (t7 = _t(t7), u6 = 0, e8 = le(e8, r7), r7 = Xt(n6, r7, i8, t7)), ne(e8) || (a4 || (e8 |= 16), e8 !== u6 && H2(t7, e8))), 2 & e8 || !(4096 & e8 || 16 & e8) || $t(n6, r7), t7;
  }
  function te(t7, e8, n6) {
    return t7 = Yt(t7, e8, n6), Array.isArray(t7) ? t7 : G;
  }
  function ee(t7, e8) {
    return 2 & e8 && (t7 |= 2), 1 | t7;
  }
  function ne(t7) {
    return !!(2 & t7) && !!(4 & t7) || !!(256 & t7);
  }
  function re(t7, e8, n6) {
    Ht(t7);
    let r7 = 0 | (t7 = t7.m)[V2];
    if (null == n6) Xt(t7, r7, e8);
    else {
      var i8 = n6 === G ? 7 : 0 | n6[V2], o7 = i8, s6 = ne(i8), a4 = s6 || Object.isFrozen(n6);
      for (s6 || (i8 = 0), a4 || (n6 = _t(n6), o7 = 0, i8 = le(i8, r7), a4 = false), i8 |= 5, i8 |= (4 & i8 ? 512 & i8 ? 512 : 1024 & i8 ? 1024 : 0 : void 0) ?? (u5 ? 1024 : 0), s6 = 0; s6 < n6.length; s6++) {
        const t8 = n6[s6], e9 = Ot(t8);
        Object.is(t8, e9) || (a4 && (n6 = _t(n6), o7 = 0, i8 = le(i8, r7), a4 = false), n6[s6] = e9);
      }
      i8 !== o7 && (a4 && (n6 = _t(n6), i8 = le(i8, r7)), H2(n6, i8)), Xt(t7, r7, e8, n6);
    }
  }
  function ie(t7, e8, n6, r7) {
    Ht(t7), Xt(t7 = t7.m, 0 | t7[V2], e8, ("0" === r7 ? 0 === Number(n6) : n6 === r7) ? void 0 : n6);
  }
  function oe(t7) {
    if (x2) return t7[N2] ?? (t7[N2] = /* @__PURE__ */ new Map());
    if (N2 in t7) return t7[N2];
    const e8 = /* @__PURE__ */ new Map();
    return Object.defineProperty(t7, N2, { value: e8 }), e8;
  }
  function se(t7, e8, n6) {
    var r7 = Hr;
    let i8 = t7.get(r7);
    if (null != i8) return i8;
    i8 = 0;
    for (let t8 = 0; t8 < r7.length; t8++) {
      const o7 = r7[t8];
      null != Yt(e8, o7) && (0 !== i8 && (n6 = Xt(e8, n6, i8)), i8 = o7);
    }
    return t7.set(r7, i8), i8;
  }
  function ae(t7, e8, n6) {
    let r7 = t7.m, i8 = 0 | r7[V2];
    if (e8 = function(t8, e9, n7, r8) {
      let i9 = false;
      if (null != (r8 = Yt(t8, r8, void 0, (t9) => {
        const r9 = Bt(t9, n7, e9);
        return i9 = r9 !== t9 && null != r9, r9;
      }))) return i9 && !q(r8) && $t(t8, e9), r8;
    }(r7, i8, e8, n6), null == e8) return e8;
    if (i8 = 0 | r7[V2], !q(t7, i8)) {
      var o7, s6 = e8;
      const a4 = s6.m, u6 = 0 | a4[V2];
      (o7 = q(s6, u6) ? qt(s6, a4, u6) ? Gt(s6, a4, true) : new s6.constructor(zt(a4, u6, false)) : s6) !== e8 && (Wt(t7) && (r7 = t7.m, i8 = 0 | r7[V2]), i8 = Xt(r7, i8, n6, e8 = o7), $t(r7, i8));
    }
    return e8;
  }
  function ue(t7) {
    return null == t7 && (t7 = void 0), t7;
  }
  function ce(t7, e8, n6) {
    return Jt(t7, e8, n6 = ue(n6)), n6 && !q(n6) && $t(t7.m), t7;
  }
  function le(t7, e8) {
    return -273 & (2 & e8 ? 2 | t7 : -3 & t7);
  }
  function he(t7, e8, n6, r7) {
    var i8 = r7;
    Ht(t7);
    var o7 = r7 = t7.m, s6 = 0 | r7[V2];
    const a4 = q(t7, s6) ? 1 : 2;
    2 === a4 && Wt(t7) && (s6 = 0 | (o7 = t7.m)[V2]);
    let u6 = (t7 = te(o7, e8)) === G ? 7 : 0 | t7[V2];
    var c6 = ee(u6, s6);
    const l4 = !(4 & c6);
    if (l4) {
      var h5 = t7, f4 = s6;
      const e9 = !!(2 & c6);
      e9 && (f4 |= 2);
      let r8 = !e9, i9 = true, o8 = 0, a5 = 0;
      for (; o8 < h5.length; o8++) {
        const t8 = Bt(h5[o8], n6, f4);
        if (t8 instanceof n6) {
          if (!e9) {
            const e10 = q(t8);
            r8 && (r8 = !e10), i9 && (i9 = e10);
          }
          h5[a5++] = t8;
        }
      }
      a5 < o8 && (h5.length = a5), c6 |= 4, c6 = i9 ? -4097 & c6 : 4096 | c6, c6 = r8 ? 8 | c6 : -9 & c6;
    }
    c6 !== u6 && (H2(t7, c6), 2 & c6 && Object.freeze(t7)), e8 = t7 = Zt(t7, c6, o7, s6, e8, a4, l4, true), i8 = null != i8 ? i8 : new n6(), e8.push(i8), o7 = n6 = e8 === G ? 7 : 0 | e8[V2], (i8 = q(i8)) ? (n6 &= -9, 1 === e8.length && (n6 &= -4097)) : n6 |= 4096, n6 !== o7 && H2(e8, n6), i8 || $t(r7);
  }
  function fe(t7, e8) {
    return xt(Kt(t7, e8)) ?? 0;
  }
  function de(t7, e8, n6) {
    ie(t7, e8, jt(n6), 0);
  }
  function pe(t7, e8, n6) {
    if (null != n6) {
      if ("number" != typeof n6) throw O("uint32");
      if (!vt(n6)) throw O("uint32");
      n6 >>>= 0;
    }
    Jt(t7, e8, n6);
  }
  function me(t7, e8, n6) {
    if (null != n6 && "string" != typeof n6) throw Error();
    ie(t7, e8, n6, "");
  }
  function ge(t7, e8, n6) {
    if (Ht(t7), e8 = (t7 = Qt(t7, e8, Ut, 2, true)).push, "string" != typeof n6) throw Error();
    e8.call(t7, n6);
  }
  var _e = class {
    constructor(t7, e8, n6) {
      if (this.buffer = t7, n6 && !e8) throw Error();
    }
  };
  function ye(t7) {
    if ("string" == typeof t7) return new _e(b3(t7), true);
    if (Array.isArray(t7)) return new _e(new Uint8Array(t7), true);
    if (t7.constructor === Uint8Array) return new _e(t7, false);
    if (t7.constructor === ArrayBuffer) return t7 = new Uint8Array(t7), new _e(t7, false);
    if (t7.constructor === A2) {
      L2(S3);
      var e8 = t7.i;
      return e8 = (null == (e8 = null == e8 || v3(e8) ? e8 : "string" == typeof e8 ? b3(e8) : null) ? e8 : t7.i = e8) || new Uint8Array(0), new _e(e8, true, t7);
    }
    if (t7 instanceof Uint8Array) return t7 = t7.constructor === Uint8Array ? t7 : new Uint8Array(t7.buffer, t7.byteOffset, t7.byteLength), new _e(t7, false);
    throw Error();
  }
  function we(t7) {
    return t7 ? /^\d+$/.test(t7) ? (mt(t7), new be(ut, ct)) : null : ve || (ve = new be(0, 0));
  }
  var be = class {
    constructor(t7, e8) {
      this.j = t7 >>> 0, this.i = e8 >>> 0;
    }
  };
  var ve;
  function Se(t7) {
    return t7 ? /^-?\d+$/.test(t7) ? (mt(t7), new Ee(ut, ct)) : null : Ae || (Ae = new Ee(0, 0));
  }
  var Ee = class {
    constructor(t7, e8) {
      this.j = t7 >>> 0, this.i = e8 >>> 0;
    }
  };
  var Ae;
  function Ie(t7, e8, n6) {
    for (; n6 > 0 || e8 > 127; ) t7.i.push(127 & e8 | 128), e8 = (e8 >>> 7 | n6 << 25) >>> 0, n6 >>>= 7;
    t7.i.push(e8);
  }
  function Te(t7, e8) {
    for (; e8 > 127; ) t7.i.push(127 & e8 | 128), e8 >>>= 7;
    t7.i.push(e8);
  }
  function Le(t7, e8) {
    if (e8 >= 0) Te(t7, e8);
    else {
      for (let n6 = 0; n6 < 9; n6++) t7.i.push(127 & e8 | 128), e8 >>= 7;
      t7.i.push(1);
    }
  }
  function Pe(t7, e8) {
    0 !== e8.length && (t7.l.push(e8), t7.j += e8.length);
  }
  function Oe(t7, e8, n6) {
    Te(t7.i, 8 * e8 + n6);
  }
  function je(t7, e8) {
    return Oe(t7, e8, 2), e8 = t7.i.end(), Pe(t7, e8), e8.push(t7.j), e8;
  }
  function ke(t7, e8) {
    var n6 = e8.pop();
    for (n6 = t7.j + t7.i.length() - n6; n6 > 127; ) e8.push(127 & n6 | 128), n6 >>>= 7, t7.j++;
    e8.push(n6), t7.j++;
  }
  function xe(t7, e8, n6) {
    Oe(t7, e8, 2), Te(t7.i, n6.length), Pe(t7, t7.i.end()), Pe(t7, n6);
  }
  function Ue() {
    const t7 = class {
      constructor() {
        throw Error();
      }
    };
    return Object.setPrototypeOf(t7, t7.prototype), t7;
  }
  var Be = Ue();
  var Ne = Ue();
  var Fe = Ue();
  var Re = Ue();
  var De = Ue();
  var Ce = Ue();
  var Me = Ue();
  var Ve = Ue();
  var Ge = Ue();
  var ze = Ue();
  var We = class {
    constructor(t7, e8) {
      this.m = Mt(t7, e8, void 0, 2048);
    }
    toJSON() {
      return Rt(this);
    }
  };
  We.prototype[D2] = $2, We.prototype.toString = function() {
    return this.m.toString();
  };
  var He = class {
    constructor(t7, e8) {
      this.i = t7, t7 = Be, this.j = !!t7 && e8 === t7 || false;
    }
  };
  function $e(t7, e8, n6, r7, i8) {
    null != (e8 = Ze(e8, r7)) && (n6 = je(t7, n6), i8(e8, t7), ke(t7, n6));
  }
  var qe = new He($e, Be);
  var Ke = new He($e, Be);
  var Ye = Symbol();
  var Je = Symbol();
  var Xe;
  function Qe(t7) {
    var e8 = tn, n6 = en, r7 = t7[Ye];
    if (r7) return r7;
    (r7 = {}).na = t7, r7.W = function(t8) {
      switch (typeof t8) {
        case "boolean":
          return Dt || (Dt = [0, void 0, true]);
        case "number":
          return t8 > 0 ? void 0 : 0 === t8 ? Ct || (Ct = [0, void 0]) : [-t8, void 0];
        case "string":
          return [0, t8];
        case "object":
          return t8;
      }
    }(t7[0]);
    var i8 = t7[1];
    let o7 = 1;
    i8 && i8.constructor === Object && (r7.ca = i8, "function" == typeof (i8 = t7[++o7]) && (r7.ia = true, Xe ?? (Xe = t7[o7 + 1]), i8 = t7[o7 += 2]));
    const s6 = {};
    for (; i8 && Array.isArray(i8) && i8.length && "number" == typeof i8[0] && i8[0] > 0; ) {
      for (var a4 = 0; a4 < i8.length; a4++) s6[i8[a4]] = i8;
      i8 = t7[++o7];
    }
    for (a4 = 1; void 0 !== i8; ) {
      let s7;
      "number" == typeof i8 && (a4 += i8, i8 = t7[++o7]);
      var u6 = void 0;
      if (i8 instanceof He ? s7 = i8 : (s7 = qe, o7--), s7?.j) {
        i8 = t7[++o7], u6 = t7;
        var c6 = o7;
        "function" == typeof i8 && (i8 = i8(), u6[c6] = i8), u6 = i8;
      }
      for (c6 = a4 + 1, "number" == typeof (i8 = t7[++o7]) && i8 < 0 && (c6 -= i8, i8 = t7[++o7]); a4 < c6; a4++) u6 ? n6(r7, a4, s7, u6) : e8(r7, a4, s7);
    }
    return t7[Ye] = r7;
  }
  function Ze(t7, e8) {
    return t7 instanceof We ? t7.m : Array.isArray(t7) ? Mt(t7, e8[0], e8[1]) : void 0;
  }
  function tn(t7, e8, n6) {
    t7[e8] = n6.i;
  }
  function en(t7, e8, n6, r7) {
    let i8, o7;
    const s6 = n6.i;
    t7[e8] = (t8, e9, n7) => s6(t8, e9, n7, o7 || (o7 = Qe(r7).W), i8 || (i8 = nn(r7)));
  }
  function nn(t7) {
    let e8 = t7[Je];
    if (!e8) {
      const n6 = Qe(t7);
      e8 = (t8, e9) => rn(t8, e9, n6), t7[Je] = e8;
    }
    return e8;
  }
  function rn(t7, e8, n6) {
    !function(t8, e9, n7) {
      const r7 = 128 & e9 ? 0 : -1, i8 = t8.length;
      var o7;
      (o7 = !!i8) && (o7 = null != (o7 = t8[i8 - 1]) && "object" == typeof o7 && o7.constructor === Object);
      const s6 = i8 + (o7 ? -1 : 0);
      for (e9 = 128 & e9 ? 1 : 0; e9 < s6; e9++) n7(e9 - r7, t8[e9]);
      if (o7) {
        t8 = t8[i8 - 1];
        for (const e10 in t8) !isNaN(e10) && n7(+e10, t8[e10]);
      }
    }(t7, 0 | t7[V2], (t8, r7) => {
      if (null != r7) {
        var i8 = function(t9, e9) {
          var n7 = t9[e9];
          if (n7) return n7;
          if ((n7 = t9.ca) && (n7 = n7[e9])) {
            var r8 = (n7 = Array.isArray(n7) ? n7[0] instanceof He ? n7 : [Ke, n7] : [n7, void 0])[0].i;
            if (n7 = n7[1]) {
              const e10 = nn(n7), i9 = Qe(n7).W;
              n7 = t9.ia ? Xe(i9, e10) : (t10, n8, o7) => r8(t10, n8, o7, i9, e10);
            } else n7 = r8;
            return t9[e9] = n7;
          }
        }(n6, t8);
        i8 ? i8(e8, r7, t8) : t8 < 500 || j2(F, 3);
      }
    });
  }
  var on;
  var sn = 0;
  var an = sn;
  if (Q(an)) {
    if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(an)) throw Error(String(an));
  } else if ((on = X(an)) && (on = !Number.isSafeInteger(an)), on) throw Error(String(an));
  function un(t7, e8) {
    if (Array.isArray(e8)) {
      var n6 = 0 | e8[V2];
      if (4 & n6) return e8;
      for (var r7 = 0, i8 = 0; r7 < e8.length; r7++) {
        const n7 = t7(e8[r7]);
        null != n7 && (e8[i8++] = n7);
      }
      return i8 < r7 && (e8.length = i8), (t7 = -1537 & (5 | n6)) !== n6 && H2(e8, t7), 2 & t7 && Object.freeze(e8), e8;
    }
  }
  function cn(t7, e8) {
    return new He(t7, e8);
  }
  function ln(t7, e8, n6) {
    null != (e8 = At(e8)) && (Oe(t7, n6, 5), t7 = t7.i, (n6 = at || (at = new DataView(new ArrayBuffer(8)))).setFloat32(0, +e8, true), ct = 0, e8 = ut = n6.getUint32(0, true), t7.i.push(e8 >>> 0 & 255), t7.i.push(e8 >>> 8 & 255), t7.i.push(e8 >>> 16 & 255), t7.i.push(e8 >>> 24 & 255));
  }
  function hn(t7, e8, n6) {
    null != (e8 = kt(e8)) && null != e8 && (Oe(t7, n6, 0), Le(t7.i, e8));
  }
  function fn(t7, e8, n6) {
    null != (e8 = Tt(e8)) && (Oe(t7, n6, 0), t7.i.i.push(e8 ? 1 : 0));
  }
  function dn(t7, e8, n6) {
    null != (e8 = Ut(e8)) && xe(t7, n6, i7(e8));
  }
  function pn(t7, e8, n6, r7, i8) {
    null != (e8 = Ze(e8, r7)) && (n6 = je(t7, n6), i8(e8, t7), ke(t7, n6));
  }
  function mn(t7, e8, n6) {
    null != (e8 = kt(e8)) && (e8 = parseInt(e8, 10), Oe(t7, n6, 0), Le(t7.i, e8));
  }
  tt || (sn = Z2(sn) ? sn ? "1" : "0" : Q(sn) ? sn.trim() || "0" : String(sn));
  var gn;
  var _n = cn(ln, Ve);
  var yn = cn(ln, Ve);
  var wn = cn(function(t7, e8, n6) {
    if (e8 = function(t8) {
      if (null == t8) return t8;
      var e9 = typeof t8;
      if ("bigint" === e9) return String(yt(64, t8));
      if (Pt(t8)) {
        if ("string" === e9) {
          if (e9 = St(Number(t8)), bt(e9)) t8 = String(e9);
          else if (-1 !== (e9 = t8.indexOf(".")) && (t8 = t8.substring(0, e9)), e9 = t8.length, !("-" === t8[0] ? e9 < 20 || 20 === e9 && t8 <= "-9223372036854775808" : e9 < 19 || 19 === e9 && t8 <= "9223372036854775807")) if (mt(t8), t8 = ut, 2147483648 & (e9 = ct)) if (k2()) t8 = "" + (BigInt(0 | e9) << BigInt(32) | BigInt(t8 >>> 0));
          else {
            const [n8, r7] = gt(t8, e9);
            t8 = "-" + dt(n8, r7);
          }
          else t8 = dt(t8, e9);
          return t8;
        }
        if ("number" === e9) {
          if (t8 = St(t8), !bt(t8)) {
            ht(t8), e9 = ut;
            var n7 = ct;
            (t8 = 2147483648 & n7) && (n7 = ~n7 >>> 0, 0 == (e9 = 1 + ~e9 >>> 0) && (n7 = n7 + 1 >>> 0)), t8 = "number" == typeof (e9 = ft(e9, n7)) ? t8 ? -e9 : e9 : t8 ? "-" + e9 : e9;
          }
          return t8;
        }
      }
    }(e8), null != e8) {
      if ("string" == typeof e8) Se(e8);
      if (null != e8) switch (Oe(t7, n6, 0), typeof e8) {
        case "number":
          t7 = t7.i, ht(e8), Ie(t7, ut, ct);
          break;
        case "bigint":
          n6 = BigInt.asUintN(64, e8), n6 = new Ee(Number(n6 & BigInt(4294967295)), Number(n6 >> BigInt(32))), Ie(t7.i, n6.j, n6.i);
          break;
        default:
          n6 = Se(e8), Ie(t7.i, n6.j, n6.i);
      }
    }
  }, Ce);
  var bn = cn(function(t7, e8, n6) {
    if (e8 = function(t8) {
      if (null == t8) return t8;
      var e9 = typeof t8;
      if ("bigint" === e9) return String(wt(64, t8));
      if (Pt(t8)) {
        if ("string" === e9) return e9 = St(Number(t8)), bt(e9) && e9 >= 0 ? t8 = String(e9) : (-1 !== (e9 = t8.indexOf(".")) && (t8 = t8.substring(0, e9)), (e9 = "-" !== t8[0] && ((e9 = t8.length) < 20 || 20 === e9 && t8 <= "18446744073709551615")) || (mt(t8), t8 = dt(ut, ct))), t8;
        if ("number" === e9) return (t8 = St(t8)) >= 0 && bt(t8) || (ht(t8), t8 = ft(ut, ct)), t8;
      }
    }(e8), null != e8) {
      if ("string" == typeof e8) we(e8);
      if (null != e8) switch (Oe(t7, n6, 0), typeof e8) {
        case "number":
          t7 = t7.i, ht(e8), Ie(t7, ut, ct);
          break;
        case "bigint":
          n6 = BigInt.asUintN(64, e8), n6 = new be(Number(n6 & BigInt(4294967295)), Number(n6 >> BigInt(32))), Ie(t7.i, n6.j, n6.i);
          break;
        default:
          n6 = we(e8), Ie(t7.i, n6.j, n6.i);
      }
    }
  }, Me);
  var vn = cn(hn, Re);
  gn = new He(function(t7, e8, n6) {
    if (null != (e8 = un(kt, e8)) && e8.length) {
      n6 = je(t7, n6);
      for (let n7 = 0; n7 < e8.length; n7++) Le(t7.i, e8[n7]);
      ke(t7, n6);
    }
  }, Re);
  var Sn;
  var En = cn(hn, Re);
  var An = cn(hn, Re);
  var In = cn(fn, Ne);
  var Tn = cn(fn, Ne);
  var Ln = cn(dn, Fe);
  Sn = new He(function(t7, e8, n6) {
    if (null != (e8 = un(Ut, e8))) for (let a4 = 0; a4 < e8.length; a4++) {
      var r7 = t7, o7 = n6, s6 = e8[a4];
      null != s6 && xe(r7, o7, i7(s6));
    }
  }, Fe);
  var Pn;
  var On = cn(dn, Fe);
  var jn = cn(dn, Fe);
  var kn = function(t7, e8, n6 = Be) {
    return new He(e8, n6);
  }(0, function(t7, e8, n6, r7, i8) {
    if (Array.isArray(e8)) {
      for (let o7 = 0; o7 < e8.length; o7++) pn(t7, e8[o7], n6, r7, i8);
      1 & (t7 = 0 | e8[V2]) || H2(e8, 1 | t7);
    }
  });
  var xn = new He(pn, Be);
  var Un = cn(function(t7, e8, n6) {
    null != (e8 = xt(e8)) && null != e8 && (Oe(t7, n6, 0), Te(t7.i, e8));
  }, De);
  var Bn = cn(mn, ze);
  Pn = new He(function(t7, e8, n6) {
    if (null != (e8 = un(kt, e8)) && e8.length) {
      n6 = je(t7, n6);
      for (let n7 = 0; n7 < e8.length; n7++) Le(t7.i, e8[n7]);
      ke(t7, n6);
    }
  }, ze);
  var Nn = cn(mn, ze);
  function Fn(t7) {
    return function() {
      const e8 = new class {
        constructor() {
          this.l = [], this.j = 0, this.i = new class {
            constructor() {
              this.i = [];
            }
            length() {
              return this.i.length;
            }
            end() {
              const t8 = this.i;
              return this.i = [], t8;
            }
          }();
        }
      }();
      rn(this.m, e8, Qe(t7)), Pe(e8, e8.i.end());
      const n6 = new Uint8Array(e8.j), r7 = e8.l, i8 = r7.length;
      let o7 = 0;
      for (let t8 = 0; t8 < i8; t8++) {
        const e9 = r7[t8];
        n6.set(e9, o7), o7 += e9.length;
      }
      return e8.l = [n6], n6;
    };
  }
  function Rn(t7, e8) {
    if (null != e8) if (Array.isArray(e8)) Jt(t7, 2, Nt(e8, 0, Ft));
    else {
      if (!("string" == typeof e8 || e8 instanceof A2 || v3(e8))) throw Error("invalid value in Any.value field: " + e8 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
      if (null != e8) {
        if ("string" == typeof e8) e8 = e8 ? new A2(e8, S3) : E2();
        else if (e8.constructor !== A2) {
          if (!v3(e8)) throw Error();
          e8 = e8.length ? new A2(new Uint8Array(e8), S3) : E2();
        }
      }
      ie(t7, 2, e8, E2());
    }
  }
  var Dn = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Cn = [0, On, cn(function(t7, e8, n6) {
    if (null != e8) {
      if (e8 instanceof We) {
        const r7 = e8.qa;
        return void (r7 ? (e8 = r7(e8), null != e8 && xe(t7, n6, ye(e8).buffer)) : j2(F, 3));
      }
      if (Array.isArray(e8)) return void j2(F, 3);
    }
    null != (e8 = null == e8 || "string" == typeof e8 || e8 instanceof A2 ? e8 : void 0) && xe(t7, n6, ye(e8).buffer);
  }, Ge)];
  var Mn;
  var Vn = globalThis.trustedTypes;
  function Gn(t7) {
    var e8;
    return void 0 === Mn && (Mn = function() {
      let t8 = null;
      if (!Vn) return t8;
      try {
        const e9 = (t9) => t9;
        t8 = Vn.createPolicy("goog#html", { createHTML: e9, createScript: e9, createScriptURL: e9 });
      } catch (t9) {
      }
      return t8;
    }()), t7 = (e8 = Mn) ? e8.createScriptURL(t7) : t7, new class {
      constructor(t8) {
        this.i = t8;
      }
      toString() {
        return this.i + "";
      }
    }(t7);
  }
  function zn(t7, ...e8) {
    if (0 === e8.length) return Gn(t7[0]);
    let n6 = t7[0];
    for (let r7 = 0; r7 < e8.length; r7++) n6 += encodeURIComponent(e8[r7]) + t7[r7 + 1];
    return Gn(n6);
  }
  var Wn = {};
  Wn[336783863] = [0, Ln, In, -1, vn, [0, [1, 2, 3, 4, 5, 6, 7, 8, 9], xn, [0], xn, [0, In, Ln, In, Bn, -1, Pn, Ln, -1, [0, In, -1], Bn, In, -1], xn, [0, Ln, -2], xn, [0, vn, In, 1, In, -4], xn, [0, vn, Bn, In, -1, gn, Bn, -1, In], xn, [0, Ln, -2], xn, [0, Ln, Bn], xn, [0, 3, In, -1, 2, [0, vn], [0, Bn, In], [0, Ln, -1], [0]], xn, [0, Bn, -1, In]], [0, Ln], In, [0, [1, 3], [2, 4], xn, [0, gn], -1, xn, [0, Sn], -1, kn, [0, Ln, -1]], Ln];
  var Hn = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var $n = [0, wn, -1, Tn, -3, wn, gn, On, En, wn, -1, Tn, En, Tn, -2, On];
  var qn = class extends We {
    constructor(t7) {
      super(t7, 500);
    }
    N(t7) {
      return ce(this, 7, t7);
    }
  };
  var Kn = [-1, {}];
  var Yn = [0, Ln, 1, Kn];
  var Jn = [0, Ln, Sn, Kn];
  function Xn(t7, e8) {
    he(t7, 1, qn, e8);
  }
  var Qn = class extends We {
    constructor(t7) {
      super(t7, 500);
    }
    N(t7) {
      return ce(this, 1001, t7);
    }
  };
  Qn.prototype.j = Fn([-500, kn, [-500, On, -1, Sn, -3, [-2, Wn, In], kn, Cn, En, -1, Yn, Jn, kn, [0, On, Tn], On, $n, En, Sn, 987, Sn], 4, kn, [-500, Ln, -1, [-1, {}], 998, Ln], kn, [-500, Ln, Sn, -1, [-2, {}, In], 997, Sn, -1], En, kn, [-500, Ln, Sn, Kn, 998, Sn], Sn, En, Yn, Jn, kn, [0, On, -1, Kn], Sn, -2, $n, On, -1, Tn, [0, Tn, Un], 978, Kn, kn, Cn]);
  var Zn = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var tr;
  var er = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
  async function nr() {
    if (void 0 === tr) try {
      await WebAssembly.instantiate(er), tr = true;
    } catch {
      tr = false;
    }
    return tr;
  }
  async function rr(t7, e8 = zn``) {
    const n6 = await nr() ? "wasm_internal" : "wasm_nosimd_internal";
    return { wasmLoaderPath: `${e8}/${t7}_${n6}.js`, wasmBinaryPath: `${e8}/${t7}_${n6}.wasm` };
  }
  var ir = class {
  };
  function or(t7) {
    function e8(e9, n7) {
      return new ReadableStream({ start() {
      }, async pull(r8) {
        i8 = i8.then(async () => {
          if (e9.cache.length > 0) r8.enqueue(e9.cache.shift());
          else {
            var { value: i9, done: o8 } = await t7.read();
            i9 && (n7.active && n7.cache.push(i9), e9.active && r8.enqueue(i9)), o8 && r8.close();
          }
        }), await i8;
      }, cancel() {
        e9.active = false, e9.cache.length = 0, n7.active || t7.cancel();
      } });
    }
    var n6 = { cache: [], active: true };
    const r7 = { cache: [], active: true };
    let i8 = Promise.resolve();
    const o7 = e8(n6, r7);
    return n6 = e8(r7, n6), [o7.getReader(), n6.getReader()];
  }
  async function sr(t7, e8) {
    const n6 = new Uint8Array(e8);
    let r7 = 0;
    for (; r7 < e8; ) {
      const { value: i8, done: o7 } = await t7.read();
      if (i8) {
        const t8 = i8.subarray(0, e8 - r7);
        n6.set(t8, r7), r7 += t8.length;
      }
      if (o7) throw Error(`Expected ${e8} bytes, but stream ended after reading ${r7} bytes.`);
    }
    return await t7.cancel(), n6;
  }
  ir.forVisionTasks = function(t7) {
    return rr("vision", t7);
  }, ir.forTextTasks = function(t7) {
    return rr("text", t7);
  }, ir.forGenAiExperimentalTasks = function(t7) {
    return rr("genai_experimental", t7);
  }, ir.forGenAiTasks = function(t7) {
    return rr("genai", t7);
  }, ir.forAudioTasks = function(t7) {
    return rr("audio", t7);
  }, ir.isSimdSupported = function() {
    return nr();
  };
  var ar = [[0, async (t7) => {
    const e8 = new TextEncoder().encode("TFL3").length;
    return t7 = await sr(t7, e8 + 4), "TFL3" === new TextDecoder("utf-8").decode(t7.subarray(4, e8 + 4));
  }], [1, async (t7) => 80 === (t7 = await sr(t7, 6))[4] && 75 === t7[5]]];
  function ur() {
    var t7 = navigator;
    return "undefined" != typeof OffscreenCanvas && (!function(t8 = navigator) {
      return (t8 = t8.userAgent).includes("Safari") && !t8.includes("Chrome");
    }(t7) || !!((t7 = t7.userAgent.match(/Version\/([\d]+).*Safari/)) && t7.length >= 1 && Number(t7[1]) >= 17));
  }
  async function cr(t7) {
    if ("function" != typeof importScripts) {
      const e8 = document.createElement("script");
      return e8.src = t7.toString(), e8.crossOrigin = "anonymous", new Promise((t8, n6) => {
        e8.addEventListener("load", () => {
          t8();
        }, false), e8.addEventListener("error", (t9) => {
          n6(t9);
        }, false), document.body.appendChild(e8);
      });
    }
    try {
      importScripts(t7.toString());
    } catch (e8) {
      if (!(e8 instanceof TypeError)) throw e8;
      await self.import(t7.toString());
    }
  }
  function lr(t7, e8, n6) {
    t7.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n6(e8 = t7.h.stringToNewUTF8(e8)), t7.h._free(e8);
  }
  function hr(t7, e8, n6) {
    t7.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
    const r7 = new Uint32Array(e8.length);
    for (let n7 = 0; n7 < e8.length; n7++) r7[n7] = t7.h.stringToNewUTF8(e8[n7]);
    e8 = t7.h._malloc(4 * r7.length), t7.h.HEAPU32.set(r7, e8 >> 2), n6(e8);
    for (const e9 of r7) t7.h._free(e9);
    t7.h._free(e8);
  }
  function fr(t7, e8, n6) {
    t7.h.simpleListeners = t7.h.simpleListeners || {}, t7.h.simpleListeners[e8] = n6;
  }
  function dr(t7, e8, n6) {
    let r7 = [];
    t7.h.simpleListeners = t7.h.simpleListeners || {}, t7.h.simpleListeners[e8] = (t8, e9, i8) => {
      e9 ? (n6(r7, i8), r7 = []) : r7.push(t8);
    };
  }
  var pr = (mr = class {
    constructor(t7, e8) {
      this.l = true, this.h = t7, this.i = null, this.j = 0, this.o = "function" == typeof this.h._addIntToInputStream, void 0 !== e8 ? this.h.canvas = e8 : ur() ? this.h.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.h.canvas = document.createElement("canvas"));
    }
    async initializeGraph(t7) {
      const e8 = await (await fetch(t7)).arrayBuffer();
      t7 = !(t7.endsWith(".pbtxt") || t7.endsWith(".textproto")), this.setGraph(new Uint8Array(e8), t7);
    }
    setGraphFromString(t7) {
      this.setGraph(new TextEncoder().encode(t7), false);
    }
    setGraph(t7, e8) {
      const n6 = t7.length, r7 = this.h._malloc(n6);
      this.h.HEAPU8.set(t7, r7), e8 ? this.h._changeBinaryGraph(n6, r7) : this.h._changeTextGraph(n6, r7), this.h._free(r7);
    }
    configureAudio(t7, e8, n6, r7, i8) {
      this.h._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), lr(this, r7 || "input_audio", (r8) => {
        lr(this, i8 = i8 || "audio_header", (i9) => {
          this.h._configureAudio(r8, i9, t7, e8 ?? 0, n6);
        });
      });
    }
    setAutoResizeCanvas(t7) {
      this.l = t7;
    }
    setAutoRenderToScreen(t7) {
      this.h._setAutoRenderToScreen(t7);
    }
    setGpuBufferVerticalFlip(t7) {
      this.h.gpuOriginForWebTexturesIsBottomLeft = t7;
    }
    attachErrorListener(t7) {
      this.h.errorListener = t7;
    }
    attachEmptyPacketListener(t7, e8) {
      this.h.emptyPacketListeners = this.h.emptyPacketListeners || {}, this.h.emptyPacketListeners[t7] = e8;
    }
    addAudioToStream(t7, e8, n6) {
      this.addAudioToStreamWithShape(t7, 0, 0, e8, n6);
    }
    addAudioToStreamWithShape(t7, e8, n6, r7, i8) {
      const o7 = 4 * t7.length;
      this.j !== o7 && (this.i && this.h._free(this.i), this.i = this.h._malloc(o7), this.j = o7), this.h.HEAPF32.set(t7, this.i / 4), lr(this, r7, (t8) => {
        this.h._addAudioToInputStream(this.i, e8, n6, t8, i8);
      });
    }
    addGpuBufferToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        if (!this.h.canvas) throw Error("No OpenGL canvas configured.");
        e9 ? this.h._bindTextureToStream(e9) : this.h._bindTextureToCanvas();
        const r7 = this.h.canvas.getContext("webgl2") || this.h.canvas.getContext("webgl");
        if (!r7) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
        this.h.gpuOriginForWebTexturesIsBottomLeft && r7.pixelStorei(r7.UNPACK_FLIP_Y_WEBGL, true), r7.texImage2D(r7.TEXTURE_2D, 0, r7.RGBA, r7.RGBA, r7.UNSIGNED_BYTE, t7), this.h.gpuOriginForWebTexturesIsBottomLeft && r7.pixelStorei(r7.UNPACK_FLIP_Y_WEBGL, false);
        const [i8, o7] = void 0 !== t7.videoWidth ? [t7.videoWidth, t7.videoHeight] : void 0 !== t7.naturalWidth ? [t7.naturalWidth, t7.naturalHeight] : void 0 !== t7.displayWidth ? [t7.displayWidth, t7.displayHeight] : [t7.width, t7.height];
        !this.l || i8 === this.h.canvas.width && o7 === this.h.canvas.height || (this.h.canvas.width = i8, this.h.canvas.height = o7);
        const [s6, a4] = [i8, o7];
        this.h._addBoundTextureToStream(e9, s6, a4, n6);
      });
    }
    addBoolToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        this.h._addBoolToInputStream(t7, e9, n6);
      });
    }
    addDoubleToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        this.h._addDoubleToInputStream(t7, e9, n6);
      });
    }
    addFloatToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        this.h._addFloatToInputStream(t7, e9, n6);
      });
    }
    addIntToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        this.h._addIntToInputStream(t7, e9, n6);
      });
    }
    addUintToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        this.h._addUintToInputStream(t7, e9, n6);
      });
    }
    addStringToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        lr(this, t7, (t8) => {
          this.h._addStringToInputStream(t8, e9, n6);
        });
      });
    }
    addStringRecordToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        hr(this, Object.keys(t7), (r7) => {
          hr(this, Object.values(t7), (i8) => {
            this.h._addFlatHashMapToInputStream(r7, i8, Object.keys(t7).length, e9, n6);
          });
        });
      });
    }
    addProtoToStream(t7, e8, n6, r7) {
      lr(this, n6, (n7) => {
        lr(this, e8, (e9) => {
          const i8 = this.h._malloc(t7.length);
          this.h.HEAPU8.set(t7, i8), this.h._addProtoToInputStream(i8, t7.length, e9, n7, r7), this.h._free(i8);
        });
      });
    }
    addEmptyPacketToStream(t7, e8) {
      lr(this, t7, (t8) => {
        this.h._addEmptyPacketToInputStream(t8, e8);
      });
    }
    addBoolVectorToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        const r7 = this.h._allocateBoolVector(t7.length);
        if (!r7) throw Error("Unable to allocate new bool vector on heap.");
        for (const e10 of t7) this.h._addBoolVectorEntry(r7, e10);
        this.h._addBoolVectorToInputStream(r7, e9, n6);
      });
    }
    addDoubleVectorToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        const r7 = this.h._allocateDoubleVector(t7.length);
        if (!r7) throw Error("Unable to allocate new double vector on heap.");
        for (const e10 of t7) this.h._addDoubleVectorEntry(r7, e10);
        this.h._addDoubleVectorToInputStream(r7, e9, n6);
      });
    }
    addFloatVectorToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        const r7 = this.h._allocateFloatVector(t7.length);
        if (!r7) throw Error("Unable to allocate new float vector on heap.");
        for (const e10 of t7) this.h._addFloatVectorEntry(r7, e10);
        this.h._addFloatVectorToInputStream(r7, e9, n6);
      });
    }
    addIntVectorToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        const r7 = this.h._allocateIntVector(t7.length);
        if (!r7) throw Error("Unable to allocate new int vector on heap.");
        for (const e10 of t7) this.h._addIntVectorEntry(r7, e10);
        this.h._addIntVectorToInputStream(r7, e9, n6);
      });
    }
    addUintVectorToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        const r7 = this.h._allocateUintVector(t7.length);
        if (!r7) throw Error("Unable to allocate new unsigned int vector on heap.");
        for (const e10 of t7) this.h._addUintVectorEntry(r7, e10);
        this.h._addUintVectorToInputStream(r7, e9, n6);
      });
    }
    addStringVectorToStream(t7, e8, n6) {
      lr(this, e8, (e9) => {
        const r7 = this.h._allocateStringVector(t7.length);
        if (!r7) throw Error("Unable to allocate new string vector on heap.");
        for (const e10 of t7) lr(this, e10, (t8) => {
          this.h._addStringVectorEntry(r7, t8);
        });
        this.h._addStringVectorToInputStream(r7, e9, n6);
      });
    }
    addBoolToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        this.h._addBoolToInputSidePacket(t7, e9);
      });
    }
    addDoubleToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        this.h._addDoubleToInputSidePacket(t7, e9);
      });
    }
    addFloatToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        this.h._addFloatToInputSidePacket(t7, e9);
      });
    }
    addIntToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        this.h._addIntToInputSidePacket(t7, e9);
      });
    }
    addUintToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        this.h._addUintToInputSidePacket(t7, e9);
      });
    }
    addStringToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        lr(this, t7, (t8) => {
          this.h._addStringToInputSidePacket(t8, e9);
        });
      });
    }
    addProtoToInputSidePacket(t7, e8, n6) {
      lr(this, n6, (n7) => {
        lr(this, e8, (e9) => {
          const r7 = this.h._malloc(t7.length);
          this.h.HEAPU8.set(t7, r7), this.h._addProtoToInputSidePacket(r7, t7.length, e9, n7), this.h._free(r7);
        });
      });
    }
    addBoolVectorToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        const n6 = this.h._allocateBoolVector(t7.length);
        if (!n6) throw Error("Unable to allocate new bool vector on heap.");
        for (const e10 of t7) this.h._addBoolVectorEntry(n6, e10);
        this.h._addBoolVectorToInputSidePacket(n6, e9);
      });
    }
    addDoubleVectorToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        const n6 = this.h._allocateDoubleVector(t7.length);
        if (!n6) throw Error("Unable to allocate new double vector on heap.");
        for (const e10 of t7) this.h._addDoubleVectorEntry(n6, e10);
        this.h._addDoubleVectorToInputSidePacket(n6, e9);
      });
    }
    addFloatVectorToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        const n6 = this.h._allocateFloatVector(t7.length);
        if (!n6) throw Error("Unable to allocate new float vector on heap.");
        for (const e10 of t7) this.h._addFloatVectorEntry(n6, e10);
        this.h._addFloatVectorToInputSidePacket(n6, e9);
      });
    }
    addIntVectorToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        const n6 = this.h._allocateIntVector(t7.length);
        if (!n6) throw Error("Unable to allocate new int vector on heap.");
        for (const e10 of t7) this.h._addIntVectorEntry(n6, e10);
        this.h._addIntVectorToInputSidePacket(n6, e9);
      });
    }
    addUintVectorToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        const n6 = this.h._allocateUintVector(t7.length);
        if (!n6) throw Error("Unable to allocate new unsigned int vector on heap.");
        for (const e10 of t7) this.h._addUintVectorEntry(n6, e10);
        this.h._addUintVectorToInputSidePacket(n6, e9);
      });
    }
    addStringVectorToInputSidePacket(t7, e8) {
      lr(this, e8, (e9) => {
        const n6 = this.h._allocateStringVector(t7.length);
        if (!n6) throw Error("Unable to allocate new string vector on heap.");
        for (const e10 of t7) lr(this, e10, (t8) => {
          this.h._addStringVectorEntry(n6, t8);
        });
        this.h._addStringVectorToInputSidePacket(n6, e9);
      });
    }
    attachBoolListener(t7, e8) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachBoolListener(t8);
      });
    }
    attachBoolVectorListener(t7, e8) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachBoolVectorListener(t8);
      });
    }
    attachIntListener(t7, e8) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachIntListener(t8);
      });
    }
    attachIntVectorListener(t7, e8) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachIntVectorListener(t8);
      });
    }
    attachUintListener(t7, e8) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachUintListener(t8);
      });
    }
    attachUintVectorListener(t7, e8) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachUintVectorListener(t8);
      });
    }
    attachDoubleListener(t7, e8) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachDoubleListener(t8);
      });
    }
    attachDoubleVectorListener(t7, e8) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachDoubleVectorListener(t8);
      });
    }
    attachFloatListener(t7, e8) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachFloatListener(t8);
      });
    }
    attachFloatVectorListener(t7, e8) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachFloatVectorListener(t8);
      });
    }
    attachStringListener(t7, e8) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachStringListener(t8);
      });
    }
    attachStringVectorListener(t7, e8) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachStringVectorListener(t8);
      });
    }
    attachProtoListener(t7, e8, n6) {
      fr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachProtoListener(t8, n6 || false);
      });
    }
    attachProtoVectorListener(t7, e8, n6) {
      dr(this, t7, e8), lr(this, t7, (t8) => {
        this.h._attachProtoVectorListener(t8, n6 || false);
      });
    }
    attachAudioListener(t7, e8, n6) {
      this.h._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), fr(this, t7, (t8, n7) => {
        t8 = new Float32Array(t8.buffer, t8.byteOffset, t8.length / 4), e8(t8, n7);
      }), lr(this, t7, (t8) => {
        this.h._attachAudioListener(t8, n6 || false);
      });
    }
    finishProcessing() {
      this.h._waitUntilIdle();
    }
    closeGraph() {
      this.h._closeGraph(), this.h.simpleListeners = void 0, this.h.emptyPacketListeners = void 0;
    }
  }, class extends mr {
    ka() {
      this.h._registerModelResourcesGraphService();
    }
  });
  var mr;
  async function gr(t7, e8) {
    const n6 = await (async (t8, e9, n7) => {
      var r7 = ni;
      if (t8 && await cr(t8), !self.ModuleFactory) throw Error("ModuleFactory not set.");
      if (e9 && (await cr(e9), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
      return self.Module && n7 && ((t8 = self.Module).locateFile = n7.locateFile, n7.mainScriptUrlOrBlob && (t8.mainScriptUrlOrBlob = n7.mainScriptUrlOrBlob)), n7 = await self.ModuleFactory(self.Module || n7), self.ModuleFactory = self.Module = void 0, new r7(n7, null);
    })(t7.wasmLoaderPath, t7.assetLoaderPath, { locateFile: (e9) => e9.endsWith(".wasm") ? t7.wasmBinaryPath.toString() : t7.assetBinaryPath && e9.endsWith(".data") ? t7.assetBinaryPath.toString() : e9 });
    return await n6.N(e8), n6;
  }
  async function _r(t7, e8) {
    return gr(t7, e8);
  }
  function yr(t7) {
    try {
      const e8 = t7.J.length;
      if (1 === e8) throw Error(t7.J[0].message);
      if (e8 > 1) throw Error("Encountered multiple errors: " + t7.J.map((t8) => t8.message).join(", "));
    } finally {
      t7.J = [];
    }
  }
  function wr(t7, e8) {
    t7.I = Math.max(t7.I, e8);
  }
  var br = class {
    constructor(t7) {
      this.j = t7, this.J = [], this.I = 0, this.j.setAutoRenderToScreen(false);
    }
    setGraph(t7, e8) {
      this.j.attachErrorListener((t8, e9) => {
        this.J.push(Error(e9));
      }), this.j.ka(), this.j.setGraph(t7, e8), yr(this);
    }
    finishProcessing() {
      this.j.finishProcessing(), yr(this);
    }
    close() {
      this.j.closeGraph();
    }
  };
  br.prototype.close = br.prototype.close;
  var vr = class extends We {
    constructor(t7) {
      super(t7);
    }
    j() {
      return kt(Kt(this, 2)) ?? 0;
    }
  };
  function Sr(t7, e8) {
    ce(t7, 1, e8);
  }
  var Er = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Ar = [0, Nn, En, yn, -1, vn];
  function Ir(t7, e8, n6, r7) {
    if (void 0 !== t7.data) {
      var i8 = new Uint8Array(t7.data.buffer, e8, n6);
      return 1 === r7 && function(t8, e9, n7) {
        t8.i.push([e9, n7]), t8.i.sort((t9, e10) => t9[0] - e10[0]), e9 = 0;
        for (const [r8, i9] of t8.i) {
          const t9 = i9;
          (n7 = r8) <= e9 && (e9 = Math.max(e9, n7 + t9));
        }
        e9 === t8.length && (t8.data = void 0);
      }(t7, e8, n6), i8;
    }
  }
  vr.prototype.l = Fn(Ar);
  var Tr = class {
    constructor(t7) {
      this.i = [], this.data = t7, this.length = t7.length;
    }
  };
  function Lr(t7, e8) {
    return new Or(async () => {
      const { value: e9, done: n6 } = await t7.read();
      return n6 ? void 0 : e9;
    }, e8);
  }
  async function Pr(t7, e8, n6, r7, i8) {
    if (2 === i8) return t7.i = [], t7.j = () => Promise.resolve(void 0), setTimeout(() => {
      t7.l();
    }, 0), Promise.resolve(0);
    for (; t7.size < n6 + r7; ) {
      var o7 = await t7.j();
      if (void 0 === o7) break;
      t7.i.push(new Tr(o7));
    }
    if (t7.size < n6 + r7) throw Error(`Data size is too small: ${t7.size}, expected at least ${n6 + r7}.`);
    o7 = e8._malloc(r7) >>> 0;
    let s6 = 0;
    for (let a4 = 0; a4 < t7.i.length; a4++) {
      const u6 = t7.i[a4];
      if (n6 >= u6.length) {
        n6 -= u6.length;
        continue;
      }
      const c6 = Math.min(r7, u6.length - n6);
      if (void 0 === (n6 = Ir(u6, n6, c6, i8))) throw Error("Data has already been released.");
      if (e8.HEAPU8.set(n6, o7 + s6), n6 = 0, s6 += c6, 0 === (r7 -= c6)) break;
    }
    if (0 !== r7) throw Error("Data not found.");
    return Promise.resolve(o7);
  }
  var Or = class {
    constructor(t7, e8) {
      this.i = [], this.j = t7, this.l = e8;
    }
    get size() {
      let t7 = 0;
      for (let e8 = 0; e8 < this.i.length; e8++) t7 += this.i[e8].length;
      return t7;
    }
  };
  function jr(t7) {
    return "object" == typeof t7 && null != t7 && "imageSource" in t7;
  }
  function kr(t7) {
    return "object" == typeof t7 && null != t7 && "audioSource" in t7;
  }
  async function xr(t7, e8, n6) {
    t7 = new Br(t7, n6);
    let r7 = 0;
    for (e8 = e8.getReader(); ; ) {
      const { value: n7, done: i8 } = await e8.read();
      if (i8) break;
      t7.set(n7, r7), r7 += n7.byteLength;
    }
    if (n6 !== r7) throw Ur(t7), Error(`File could not be fully loaded to memory, so was not retained. Loaded ${r7}/${n6} bytes before failure`);
    return t7;
  }
  function Ur(t7) {
    if (t7.i) try {
      t7.h._free(t7.j);
    } catch {
    } finally {
      t7.i = false;
    }
  }
  var Br = class {
    constructor(t7, e8) {
      this.h = t7, this.l = e8, this.j = this.h._malloc(e8) >>> 0, this.o = this.h.HEAPU8, this.i = !!this.j;
    }
    get offset() {
      if (!this.i) throw Error("WasmFileReference has been freed.");
      return this.j;
    }
    get size() {
      if (!this.i) throw Error("WasmFileReference has been freed.");
      return this.l;
    }
    set(t7, e8) {
      this.o.set(t7, this.j + (e8 ?? 0));
    }
  };
  var Nr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  Nr.prototype.j = Fn([0, On, 2, Sn, En, Tn]);
  var Fr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Rr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Dr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Cr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Mr = [0, En, -6, 1, En, 1, [0, Tn, Nn, -2], [0, Tn, yn], Nn, -2, [0, Tn, -1, Nn, yn, Bn, vn, In, -1], 1, Tn, En, vn, -1, [0, Nn, En], Tn, -1, _n, En, -5, _n, -1, [0, vn, _n], vn, In, [0, vn, -2], _n, [0, En], [0, En, -4], In, vn, -2, In, -1];
  var Vr = [0, On, -2];
  var Gr = [0, [4, 6], Mr, En, 1, An, Sn, jn, Pn, Vr, vn, [0, [0, En, -1, kn, [0, En, [0, En, -1], -1, [0, Nn, -1], Tn], Tn, -2, En, -1], [0, En, -1, Tn], Mr, Tn, En, [0, En], -1], Ln, -3, [0, En, Tn], Mr, [0, Vr, -2], gn];
  Cr.prototype.j = Fn([0, On, 8, [0, Tn, -6], 1, En, 1, En, [0, kn, [0, On, bn, -1, Nn], Gr, En], [0, En, Tn, -3], 1, Nn, 1, Gr, 1, En, 5, Nn, gn, 1, Ar, Tn, En, Tn]);
  var zr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Wr = class extends We {
    constructor(t7) {
      super(t7);
    }
  };
  var Hr = [2, 4];
  Wr.prototype.j = Fn([0, Hr, En, jn, En, xn, [0, 1, On]]);
  var $r = /* @__PURE__ */ function(t7) {
    return class extends t7 {
      constructor() {
        super(...arguments), this.P = false, this.F = this.H = 0;
      }
      M() {
        if (this.P) throw Error("Cannot process because LLM inference engine is currently loading or processing.");
        this.P = true;
      }
      L() {
        this.P = false;
      }
      async createLlmInferenceEngine(t8, e8) {
        this.M();
        try {
          const n6 = Lr(t8, () => {
          });
          await this.h.createLlmInferenceEngine(fe(e8, 2) ?? 512, ae(e8, vr, 3)?.j() ?? 40, Tt(Kt(e8, 6)) ?? false ?? false, fe(e8, 7) ?? 0, Tt(Kt(e8, 8)) ?? false ?? false, (t9, e9, r7) => Pr(n6, this.h, t9, e9, r7));
        } finally {
          this.L();
        }
      }
      async ba(t8, e8) {
        this.M();
        try {
          await this.ma(t8), await this.h.ccall("CreateLlmInferenceEngineConverted", "void", ["number", "number", "boolean"], [fe(e8, 2) ?? 512, ae(e8, vr, 3)?.j() ?? 40, Tt(Kt(e8, 6)) ?? false ?? false], { async: true });
        } finally {
          this.L();
        }
      }
      V() {
        this.M();
        try {
          const t8 = this.h;
          t8.ccall("DeleteLlmInferenceEngine", "void", [], [], { async: false }), this.H && (t8._FreeSession(this.H), this.F === this.H && (this.F = 0), this.H = 0), this.F && (t8._FreeSession(this.F), this.F = 0);
        } finally {
          this.L();
        }
      }
      async R(t8, e8, n6) {
        this.M();
        try {
          const r7 = [], i8 = this.h;
          i8._userProgressListener = (t9, e9) => {
            t9 && r7.push(t9), n6 && n6(t9, e9);
          };
          const o7 = e8.l(), s6 = o7.length, a4 = this.h._malloc(s6);
          this.h.HEAPU8.set(o7, a4);
          const u6 = t8.some(kr), c6 = t8.some(jr);
          i8.ccallNum = i8.ccall;
          const l4 = await i8.ccallNum("MakeSessionForPredict", "number", ["number", "number", "boolean", "boolean"], [a4, s6, c6, u6], { async: true });
          e8 = [];
          for (const n7 of t8) if ("string" == typeof n7) lr(this, n7, (t9) => {
            i8._AddTextQueryChunk(l4, t9);
          });
          else if (jr(n7)) {
            const { image: t9, width: r8, height: o8 } = await this.fa(n7.imageSource), s7 = "undefined" != typeof OffscreenCanvas ? new OffscreenCanvas(r8, o8) : document.createElement("canvas");
            s7.width = r8, s7.height = o8;
            const a5 = s7.getContext("2d");
            a5.drawImage(t9, 0, 0);
            const u7 = a5.getImageData(0, 0, r8, o8), c7 = this.h._malloc(u7.width * u7.height * 4);
            this.h.HEAPU8.set(u7.data, c7), i8._AddImageQueryChunk(l4, c7, u7.width, u7.height), e8.push(c7);
          } else {
            if (!kr(n7)) throw Error("Unsupported PromptPart type in query.");
            {
              const t9 = await this.ea(n7.audioSource), r8 = this.h._malloc(t9.audioSamples.byteLength);
              this.h.HEAPF32.set(t9.audioSamples, r8 / 4), i8._AddAudioQueryChunk(l4, t9.audioSampleRateHz, r8, t9.audioSamples.length), e8.push(r8);
            }
          }
          await i8.ccall("PredictSession", "void", ["number"], [l4], { async: true }), t8 = true, c6 && 0 === this.F && (this.F = l4, t8 = false), u6 && 0 === this.H && (this.H = l4, t8 = false), t8 && i8._FreeSession(l4);
          for (const t9 of e8) this.h._free(t9);
          return e8.length = 0, n6 && n6("", true), this.h._free(a4), i8._userProgressListener = void 0, r7.join("");
        } finally {
          this.L();
        }
      }
      S(t8) {
        this.M();
        let e8 = 0, n6 = "";
        for (const r7 of t8) "string" == typeof r7 ? n6 += r7 : jr(r7) ? e8 += 260 : kr(r7) && console.warn("sizeInTokens is not yet implemented for audio; audio tokens will not be counted");
        try {
          let t9;
          return lr(this, n6, (e9) => {
            t9 = this.h._GetSizeInTokens(e9);
          }), e8 + t9;
        } finally {
          this.L();
        }
      }
      async ma(t8) {
        t8 = await async function(t9) {
          const e8 = [];
          for (var n6 = 0; ; ) {
            const { done: r7, value: i8 } = await t9.read();
            if (r7) break;
            e8.push(i8), n6 += i8.length;
          }
          if (0 === e8.length) return new Uint8Array(0);
          if (1 === e8.length) return e8[0];
          t9 = new Uint8Array(n6), n6 = 0;
          for (const r7 of e8) t9.set(r7, n6), n6 += r7.length;
          return t9;
        }(t8);
        try {
          this.h.FS_unlink("llm.task");
        } catch {
        }
        this.h.FS_createDataFile("/", "llm.task", t8, true, false, false);
      }
      async fa(t8) {
        if ("string" == typeof t8) {
          const e8 = new Image();
          e8.src = t8, e8.crossOrigin = "Anonymous";
          try {
            await e8.decode();
          } catch {
            throw Error(`Image from URL ${t8} failed to load`);
          }
          return { image: e8, width: e8.naturalWidth, height: e8.naturalHeight };
        }
        if (t8 instanceof HTMLImageElement) {
          try {
            await t8.decode();
          } catch {
            throw Error("Image from HTMLImageElement failed to load");
          }
          return { image: t8, width: t8.naturalWidth, height: t8.naturalHeight };
        }
        return t8 instanceof HTMLVideoElement ? { image: t8, width: t8.videoWidth, height: t8.videoHeight } : t8 instanceof VideoFrame ? { image: t8, width: t8.displayWidth, height: t8.displayHeight } : { image: t8, width: t8.width, height: t8.height };
      }
      async ea(t8) {
        if ("string" == typeof t8) {
          const e8 = await fetch(t8);
          if (!e8.ok) throw Error(`Audio fetch for ${t8} had error: ${e8.status}`);
          return t8 = await e8.arrayBuffer(), { audioSamples: (t8 = await new AudioContext({ sampleRate: 16e3 }).decodeAudioData(t8)).getChannelData(0), audioSampleRateHz: t8.sampleRate };
        }
        return "object" == typeof t8 && null != t8 && "audioSamples" in t8 && "audioSampleRateHz" in t8 ? t8 : { audioSamples: t8.getChannelData(0), audioSampleRateHz: t8.sampleRate };
      }
    };
  }(/* @__PURE__ */ function(t7) {
    const e8 = class extends t7 {
      static async la(t8, n6) {
        let r7;
        n6 || (n6 = await e8.X());
        const i8 = [];
        for (const e9 of t8?.requiredFeatures ?? []) n6.features.has(e9) ? i8.push(e9) : console.warn(`WebGPU feature ${e9} is not supported.`);
        t8 = { ...t8, requiredFeatures: i8 };
        try {
          r7 = await n6.requestDevice(t8);
        } catch (t9) {
          throw console.error("Unable to initialize WebGPU with the requested features."), t9;
        }
        return (t8 = r7).adapterInfo || (t8.adapterInfo = n6.info), r7;
      }
      static async X(t8) {
        if (!(t8 = await navigator.gpu.requestAdapter(t8))) throw Error("Unable to request adapter from navigator.gpu; Ensure WebGPU is enabled.");
        return t8;
      }
      ga(t8) {
        if (e9) "undefined" != typeof HTMLCanvasElement && e9 instanceof HTMLCanvasElement && (e9.id = "canvas_webgpu");
        else var e9 = new OffscreenCanvas(1, 1);
        e9.getContext("webgpu").configure({ device: t8, format: navigator.gpu.getPreferredCanvasFormat() }), this.h.preinitializedWebGPUDevice = t8;
      }
      aa() {
        return this.h.ccall("closeGraph", "void", [], [], { async: true });
      }
    };
    return e8;
  }(/* @__PURE__ */ function(t7) {
    return class extends t7 {
      addStreamingReaderToInputSidePacket(t8, e8) {
        this.h.addStreamingReaderToInputSidePacket((e9, n6, r7) => Pr(t8, this.h, e9, n6, r7), e8);
      }
    };
  }(/* @__PURE__ */ function(t7) {
    return class extends t7 {
      Y(t8, e8) {
        lr(this, "lora_model_ref_in", (n6) => {
          this.h._addRawDataSpanToInputStream(t8.offset, t8.size, n6, e8);
        });
      }
    };
  }(class extends pr {
  }))));
  var qr = class extends $r {
  };
  var Kr = class {
    constructor(t7) {
      this.j = t7, this.i = Yr, Yr++;
    }
  };
  var Yr = 1;
  var Jr = class {
    constructor() {
      let t7, e8;
      this.promise = new Promise((n6, r7) => {
        t7 = n6, e8 = r7;
      }), this.resolve = t7, this.reject = e8;
    }
  };
  function Xr(t7) {
    return 1 === t7 ? 1 : t7 + t7 % 2;
  }
  async function Qr() {
    const t7 = await qr.X({ powerPreference: "high-performance" });
    var e8 = t7.limits.maxBufferSize, n6 = t7.limits.maxStorageBufferBindingSize;
    return e8 < 524550144 && console.warn(`This WebGPU device is unable to execute most LLM tasks, because the required maxBufferSize is usually at least 524550144, but your device only supports maxBufferSize of ${e8}`), n6 < 524550144 && console.warn(`The WebGPU device is unable to execute LLM tasks, because the required maxStorageBufferBindingSize is usually at least 524550144, but your device only supports maxStorageBufferBindingSize of ${n6}`), e8 = { requiredFeatures: ["shader-f16"], requiredLimits: { maxStorageBufferBindingSize: n6, maxBufferSize: e8, maxStorageBuffersPerShaderStage: t7.limits.maxStorageBuffersPerShaderStage } }, t7.features.has("subgroups") && (console.warn("Experimental Chromium WGSL subgroup support detected. Enabling this feature in the inference engine."), n6 = ["shader-f16", "subgroups"], t7.features.has("subgroups-f16") && n6.push("subgroups-f16"), e8.requiredFeatures = n6), qr.la(e8, t7);
  }
  function Zr(t7) {
    if (t7.D.length > 0) {
      const e8 = [...t7.D];
      if (t7.D.length = 0, !t7.o) throw e8;
      t7.o.reject(e8), t7.o = void 0;
    }
  }
  function ti(t7) {
    const e8 = function(t8) {
      const e9 = new Qn();
      ge(e9, 10, "text_in"), ge(e9, 10, "token_cost_in"), ge(e9, 10, "lora_model_id_to_apply_in"), ge(e9, 10, "lora_model_ref_in"), ge(e9, 10, "lora_model_id_to_load_in"), ge(e9, 16, "streaming_reader"), ge(e9, 15, "text_out"), ge(e9, 15, "text_end"), ge(e9, 15, "token_cost_out");
      var n7 = new qn();
      me(n7, 2, "TokenizerInputBuildCalculator"), ge(n7, 3, "PROMPT:text_in"), ge(n7, 3, "LORA_ID:lora_model_id_to_apply_in"), ge(n7, 4, "prompt"), Xn(e9, n7), me(n7 = new qn(), 2, "ModelDataCalculator"), ge(n7, 6, "MODEL_DATA:__side_packet_1"), ge(n7, 6, "MODEL_TYPE:model_type"), ge(n7, 5, "READ_DATA_FN:streaming_reader"), ge(n7, 3, "LORA_MODEL_SPAN:lora_model_ref_in"), ge(n7, 3, "LORA_MODEL_ID:lora_model_id_to_load_in"), ge(n7, 4, "LORA_DATA:lora_model_data"), Xn(e9, n7), me(n7 = new qn(), 2, "Gpt2UnicodeMappingCalculator"), ge(n7, 5, "MODEL_TYPE:model_type"), ge(n7, 6, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), Xn(e9, n7), me(n7 = new Dn(), 1, "type.googleapis.com/odml.infra.proto.TokenizerCalculatorOptions");
      var r7 = new Wr(), i8 = fe(t8.i, 2);
      de(r7, 1, i8), me(i8 = new zr(), 2, "spm_vocab_model"), i8 = ue(i8);
      t: {
        Ht(r7);
        var o7 = r7.m, s6 = 0 | o7[V2];
        if (null == i8) {
          var a4 = oe(o7);
          if (4 !== se(a4, o7, s6)) break t;
          a4.set(Hr, 0);
        } else {
          const t9 = oe(a4 = o7), e10 = se(t9, a4, s6);
          4 !== e10 && (e10 && (s6 = Xt(a4, s6, e10)), t9.set(Hr, 4));
        }
        Xt(o7, s6, 4, i8);
      }
      return i8 && !q(i8) && $t(r7.m), de(r7, 3, 2), Rn(n7, r7.j()), me(r7 = new qn(), 2, "TokenizerCalculator"), he(r7, 8, Dn, n7), ge(r7, 5, "MODEL_DATA:__side_packet_1"), ge(r7, 3, "PROMPT_AND_INPUT_OPTIONS:prompt"), ge(r7, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), ge(r7, 6, "PROCESSOR_GETTER:__input_side_1"), ge(r7, 4, "IDS_AND_INPUT_OPTIONS:__stream_0"), Xn(e9, r7), me(n7 = new Dn(), 1, "type.googleapis.com/odml.infra.proto.LlmGpuCalculatorOptions"), de(r7 = new Cr(), 12, 3), me(r7, 1, "llm.tflite"), de(r7, 14, 0), i8 = Xr(fe(t8.i, 5)), de(r7, 22, i8), i8 = ae(t8.i, vr, 3), ce(r7, 31, i8), ie(i8 = new Fr(), 1, It(true), false), null != Tt(Kt(t8.i, 6)) && (Tt(Kt(t8.i, 6)) ?? false) && ie(i8, 1, It(false), false), ie(i8, 2, It(true), false), ie(i8, 5, It(true), false), ce(r7, 10, i8), i8 = Qt(t8.i, 4, kt, void 0 === Y ? 2 : 4), re(r7, 29, i8), i8 = new Dr(), de(o7 = new Rr(), 1, 1), a4 = fe(t8.i, 2), de(o7, 2, a4), ce(i8, 1, o7), ce(r7, 20, i8), Rn(n7, r7.j()), me(r7 = new qn(), 2, "LlmGpuCalculator"), he(r7, 8, Dn, n7), ge(r7, 3, "IDS_AND_INPUT_OPTIONS:__stream_0"), ge(r7, 3, "FINISH:finish"), ge(r7, 3, "LORA_DATA:lora_model_data"), ge(r7, 5, "MODEL_DATA:__side_packet_1"), ge(r7, 4, "DECODED_IDS:__stream_3"), ge(r7, 4, "OUTPUT_END:__stream_4"), me(n7 = new Hn(), 1, "FINISH"), ie(n7, 2, It(true), false), he(r7, 13, Hn, n7), Xn(e9, r7), me(n7 = new qn(), 2, "IsPacketPresentCalculator"), ge(n7, 3, "__stream_4"), ge(n7, 4, "text_end"), Xn(e9, n7), me(n7 = new Dn(), 1, "type.googleapis.com/odml.infra.proto.DetokenizerCalculatorOptions"), r7 = new Nr(), t8 = Xr(fe(t8.i, 5)), de(r7, 5, t8), ge(r7, 4, "<eos>"), ge(r7, 4, "<|endoftext|>"), Rn(n7, r7.j()), me(t8 = new qn(), 2, "DetokenizerCalculator"), he(t8, 8, Dn, n7), ge(t8, 3, "IDS_AND_INPUT_OPTIONS:__stream_3"), ge(t8, 5, "PROCESSOR_GETTER:__input_side_1"), ge(t8, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), ge(t8, 5, "MODEL_DATA:__side_packet_1"), ge(t8, 4, "FINISH_AND_INPUT_OPTIONS:finish"), ge(t8, 4, "WORDS:text_out"), Xn(e9, t8), me(t8 = new qn(), 2, "TokenCostCalculator"), ge(t8, 3, "PROMPT:token_cost_in"), ge(t8, 5, "PROCESSOR_GETTER:__input_side_1"), ge(t8, 5, "BYTES_TO_UNICODE_MAPPING:tokenizer_mapping"), ge(t8, 4, "NUM_TOKENS:token_cost_out"), Xn(e9, t8), e9;
    }(t7);
    t7.j.attachStringVectorListener("text_out", (e9, n7) => {
      e9 = function(t8, e10) {
        return null == t8 || 0 === t8.length ? [] : t8.map((t9) => (t9 = (t9 = t9.replaceAll("\u2581", " ")).replaceAll("<0x0A>", "\n"), e10 && (t9 = t9.trimStart()), t9.split("\\[eod\\]", 1)[0]));
      }(e9, 0 === t7.G.length), e9.forEach((e10, n8) => {
        n8 < fe(t7.i, 5) && t7.G[n8].push(e10);
      }), t7.A && 0 === t7.D.length && (t7.B ? (e9.length > fe(t7.i, 5) && e9.pop(), t7.A(e9, false)) : t7.A(e9[0], false)), wr(t7, n7);
    }), t7.j.attachEmptyPacketListener("text_out", (e9) => {
      wr(t7, e9);
    }), t7.j.attachBoolListener("text_end", (e9, n7) => {
      wr(t7, n7);
      try {
        Zr(t7);
      } catch (e10) {
        throw t7.l = false, e10;
      }
      if (t7.o && (t7.o.resolve(t7.G.map((t8) => t8.join(""))), t7.o = void 0), t7.A) if (t7.B) {
        for (e9 = [], n7 = 0; n7 < fe(t7.i, 5); n7++) e9.push("");
        t7.A(e9, true);
      } else t7.A("", true);
      t7.l = false, t7.B = void 0;
    }), t7.j.attachEmptyPacketListener("text_end", (e9) => {
      t7.l = false, t7.B = void 0, wr(t7, e9), Zr(t7), t7.o && (t7.o.resolve(t7.G.map((t8) => t8.join(""))), t7.o = void 0);
    }), t7.j.attachIntListener("token_cost_out", (e9, n7) => {
      t7.T = e9, wr(t7, n7);
    }), t7.U && t7.j.addStreamingReaderToInputSidePacket(t7.U, "streaming_reader");
    const n6 = e8.j();
    return t7.C?.removeEventListener("uncapturederror", t7.K), t7.j.aa().then(() => {
      t7.C?.addEventListener("uncapturederror", t7.K), t7.D.length = 0, t7.setGraph(new Uint8Array(n6), true), t7.finishProcessing();
    });
  }
  function ei(t7, e8, n6, r7) {
    if (t7.A = "function" == typeof n6 ? n6 : r7, (r7 = (e8 = Array.isArray(e8) ? e8 : [e8]).filter((t8) => jr(t8)).length) > 0 && (null == xt(Kt(t7.i, 7)) || fe(t7.i, 7) < r7)) throw Error(`maxNumImages is set to ${null != xt(Kt(t7.i, 7)) ? fe(t7.i, 7) : 0}, but the query included ${r7} images.`);
    if ((r7 = e8.filter((t8) => kr(t8)).length) > 0 && (null == Tt(Kt(t7.i, 8)) || !Tt(Kt(t7.i, 8)))) throw Error(`supportAudio was not enabled, but the query included ${r7} audio chunks.`);
    if (t7.v) {
      if (t7.B && fe(t7.i, 5) > 1) throw Error("Multi-response generation is not supported for converted LLM models (.task format) yet, nor is it supported for multimodality. Please use the .bin format without multimodality or request only one response.");
      if (n6 instanceof Kr) throw Error("LoRA is not supported for converted LLM models (.task format) yet, nor is it supported for multimodality. Please use the .bin format without multimodality to use LoRA.");
      return t7.j.h.LLM_CANCEL_FLAG = void 0, t7.j.R(e8, t7.u, (e9, n7) => {
        0 === t7.D.length && t7.A && (t7.B ? t7.A([e9], n7) : t7.A(e9, n7));
      }).then((e9) => (Zr(t7), [e9]));
    }
    if (t7.l) throw Error("Previous invocation or loading is still ongoing.");
    for (t7.l = true, t7.j.h.LLM_CANCEL_FLAG = void 0, t7.G.length = 0, r7 = 0; r7 < fe(t7.i, 5); r7++) t7.G[r7] = [];
    if (r7 = t7.I + 1, t7.j.addStringToStream(e8.join(""), "text_in", r7), n6 instanceof Kr) {
      if (n6.j !== t7) throw t7.l = false, t7.B = void 0, Error("The LoRA model was not loaded by this LLM Inference task.");
      t7.j.addUintToStream(n6.i, "lora_model_id_to_apply_in", r7);
    } else t7.j.addEmptyPacketToStream("lora_model_id_to_apply_in", r7);
    return t7.finishProcessing(), t7.o = new Jr(), t7.o.promise;
  }
  var ni = class extends br {
    constructor(t7, e8) {
      if (super(new qr(t7, e8)), this.G = [], this.O = this.v = this.l = false, this.D = [], this.K = (t8) => {
        if ((t8 = t8.error).message.match(/exceeds the max buffer size limit/)) throw Error(`Failed to run this LLM model because it requires a buffer size that exceeds the maximum size your device supports, but you could try a smaller LLM model or different device.
WebGPU throws: "${t8.message}"`);
        if (t8.message.match(/is larger than the maximum storage buffer binding size/)) throw Error(`Failed to run this LLM model because it requires a storage buffer binding size that exceeds the maximum size your device supports, but you could try a smaller LLM model or different device.
WebGPU throws: "${t8.message}"`);
        this.D.push(t8);
      }, this.i = new Er(), Sr(this.i, new Zn()), this.u = new vr(), ce(this.i, 3, this.u), pe(this.i, 2, 512), t7 = this.u, !vt(2)) throw O("enum");
      ie(t7, 1, 2, 0), de(this.u, 2, 40), ie(this.u, 3, Et(1), 0), Jt(this.u, 5, jt(0)), ie(this.u, 4, Et(0.8), 0), pe(this.i, 5, 1);
    }
    async N(t7) {
      if (this.l) throw Error("Cannot set options while loading or processing.");
      if (t7.baseOptions?.modelAssetPath && t7.baseOptions?.modelAssetBuffer) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      let e8;
      const n6 = new Promise((t8) => {
        e8 = t8;
      });
      if (t7.baseOptions?.modelAssetPath) {
        var r7 = await fetch(t7.baseOptions.modelAssetPath.toString());
        if (!r7.ok) throw Error(`Failed to fetch model: ${t7.baseOptions.modelAssetPath} (${r7.status})`);
        if (!r7.body) throw Error(`Failed to fetch model: ${t7.baseOptions.modelAssetPath} (no body)`);
        r7 = r7.body.getReader();
      } else t7.baseOptions?.modelAssetBuffer instanceof Uint8Array ? r7 = function(t8) {
        return new ReadableStream({ start() {
        }, async pull(e9) {
          e9.enqueue(t8), e9.close();
        } });
      }(t7.baseOptions.modelAssetBuffer).getReader() : t7.baseOptions?.modelAssetBuffer instanceof ReadableStreamDefaultReader ? (r7 = t7.baseOptions.modelAssetBuffer, t7.baseOptions.modelAssetBuffer = void 0) : e8();
      if (!r7) throw Error("No model asset provided.");
      {
        const [n7, s6] = or(r7);
        this.O = 1 === await async function(t8) {
          const e9 = [];
          let n8;
          for (const [i9, o8] of ar) {
            const s7 = i9;
            var r8 = o8;
            [t8, n8] = or(t8), r8 = await r8(n8), await n8.cancel(), r8 && e9.push(s7);
          }
          if (await t8.cancel(), 0 === e9.length) throw Error("No model format matched.");
          if (1 === e9.length) return e9[0];
          throw Error(`Multiple model formats matched: ${e9}`);
        }(s6);
        var i8 = "maxNumImages" in t7 && t7.maxNumImages ? t7.maxNumImages : 0;
        pe(this.i, 7, i8);
        var o7 = "supportAudio" in t7 && !!t7.supportAudio;
        Jt(this.i, 8, It(o7)), this.O || i8 > 0 || o7 ? (this.v = true, r7 = n7) : (this.v = false, this.U = Lr(n7, e8));
      }
      if (t7.baseOptions?.gpuOptions?.device && (this.C && this.C.removeEventListener("uncapturederror", this.K), this.C = t7.baseOptions.gpuOptions.device, this.j.ga(this.C), this.C.addEventListener("uncapturederror", this.K)), "maxTokens" in t7 && pe(this.i, 2, t7.maxTokens ?? 512), "topK" in t7 && de(this.u, 2, t7.topK ?? 40), "temperature" in t7 && ie(this.u, 4, Et(t7.temperature ?? 0.8), 0), "randomSeed" in t7 && Jt(this.u, 5, jt(t7.randomSeed ?? 0)), "loraRanks" in t7 && function(t8, e9) {
        re(t8, 4, e9);
      }(this.i, t7.loraRanks ?? []), "numResponses" in t7) {
        if ((i8 = t7.numResponses ?? 1) < 1) throw Error("'numResponses' must be at least 1.");
        if (this.v && i8 > 1) throw Error("'numResponses > 1' is not supported for converted LLM models yet, and is also not supported with multimodality.");
        pe(this.i, 5, i8), o7 = ae(this.i, vr, 3), i8 > 1 && o7 && (o7.j() <= 1 || (Kt(o7, 4, At) ?? 0) <= 0) && console.warn("To generate multiple responses, it is expected topK > 1 and temperature > 0; otherwise, all the generated responses may be the same.");
      }
      return "forceF32" in t7 && void 0 !== t7.forceF32 && Jt(this.i, 6, It(t7.forceF32)), this.v ? (this.j.V(), this.O ? this.j.ba(r7, this.i).then(() => {
        Zr(this);
      }) : this.j.createLlmInferenceEngine(r7, this.i).then(() => {
        Zr(this);
      })) : (this.l = true, t7 = ti(this).then(() => {
      }), Promise.all([n6, t7]).then(() => {
        this.l = false, Zr(this);
      }));
    }
    get baseOptions() {
      return ae(this.i, Zn, 1);
    }
    set baseOptions(t7) {
      Sr(this.i, t7);
    }
    get isIdle() {
      return !this.l && !this.o;
    }
    R(t7, e8, n6) {
      return fe(this.i, 5) > 1 && console.warn("'numResponses' is set larger than 1 and this function only returns the first response, so we recommend either using 'generateResponses()' to obtain multiple responses, or else setting 'numResponses' to 1 for better performance."), this.B = false, ei(this, t7, e8, n6).then((t8) => t8[0]);
    }
    da(t7, e8, n6) {
      return this.B = true, ei(this, t7, e8, n6);
    }
    S(t7) {
      if (t7 = Array.isArray(t7) ? t7 : [t7], this.v) return this.j.S(t7);
      if (this.l) throw Error("Previous invocation or loading is still ongoing.");
      if (t7.some(jr)) throw Error("sizeInTokens requires maxNumImages > 0 for images.");
      if (t7.some(kr)) throw Error("sizeInTokens requires supportAudio for audio.");
      return t7 = t7.join(""), this.l = true, this.T = void 0, this.j.addStringToStream(t7, "token_cost_in", this.I + 1), this.finishProcessing(), this.l = false, this.T;
    }
    Z() {
      const t7 = this.j.h;
      (this.v || this.l) && (t7.LLM_CANCEL_FLAG = 1);
    }
    async ja(t7) {
      if (this.v) throw Error("LoRA is not supported for converted LLM models (.task format) yet, nor is it supported for multimodality. Please use the old format (.bin) without multimodality to use LoRA.");
      if (this.l) throw Error("Cannot load LoRA model while loading or processing.");
      if (this.l = true, t7 instanceof Uint8Array) {
        var e8 = new Br(this.j.h, t7.length);
        e8.set(t7), t7 = e8;
      } else t7 = t7 instanceof Blob ? await async function(t8, e9) {
        return xr(t8, e9.stream(), e9.size);
      }(this.j.h, t7) : await async function(t8, e9) {
        e9 = await fetch(e9.toString());
        const n7 = Number(e9.headers.get("content-length"));
        if (!e9.body) throw Error("Response body is not available.");
        if (!n7) throw Error("File size is 0.");
        return xr(t8, e9.body, n7);
      }(this.j.h, t7);
      e8 = new Kr(this);
      const n6 = this.I + 1;
      return this.j.Y(t7, n6), this.j.addUintToStream(e8.i, "lora_model_id_to_load_in", n6), this.finishProcessing(), Ur(t7), wr(this, n6), this.l = false, e8;
    }
    close() {
      this.v && this.j.V(), this.C?.removeEventListener("uncapturederror", this.K), super.close();
    }
  };
  ni.prototype.loadLoraModel = ni.prototype.ja, ni.prototype.cancelProcessing = ni.prototype.Z, ni.prototype.sizeInTokens = ni.prototype.S, ni.prototype.generateResponses = ni.prototype.da, ni.prototype.generateResponse = ni.prototype.R, ni.prototype.setOptions = ni.prototype.N, ni.createWebGpuDevice = Qr, ni.createFromModelPath = async function(t7, e8) {
    return _r(t7, e8 = { baseOptions: { gpuOptions: { device: await Qr() }, modelAssetPath: e8 } });
  }, ni.createFromModelBuffer = async function(t7, e8) {
    return _r(t7, e8 = { baseOptions: { gpuOptions: { device: await Qr() }, modelAssetBuffer: e8 } });
  }, ni.createFromOptions = async function(t7, e8) {
    if (!e8.baseOptions?.gpuOptions?.device) {
      const t8 = await Qr();
      e8.baseOptions = e8.baseOptions ?? {}, e8.baseOptions.gpuOptions = e8?.baseOptions?.gpuOptions ?? {}, e8.baseOptions.gpuOptions.device = t8;
    }
    return _r(t7, e8);
  };

  // node_modules/tslib/tslib.es6.mjs
  var extendStatics = function(d4, b4) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d5, b5) {
      d5.__proto__ = b5;
    } || function(d5, b5) {
      for (var p5 in b5) if (Object.prototype.hasOwnProperty.call(b5, p5)) d5[p5] = b5[p5];
    };
    return extendStatics(d4, b4);
  };
  function __extends(d4, b4) {
    if (typeof b4 !== "function" && b4 !== null)
      throw new TypeError("Class extends value " + String(b4) + " is not a constructor or null");
    extendStatics(d4, b4);
    function __() {
      this.constructor = d4;
    }
    d4.prototype = b4 === null ? Object.create(b4) : (__.prototype = b4.prototype, new __());
  }
  function __values(o7) {
    var s6 = typeof Symbol === "function" && Symbol.iterator, m4 = s6 && o7[s6], i8 = 0;
    if (m4) return m4.call(o7);
    if (o7 && typeof o7.length === "number") return {
      next: function() {
        if (o7 && i8 >= o7.length) o7 = void 0;
        return { value: o7 && o7[i8++], done: !o7 };
      }
    };
    throw new TypeError(s6 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o7, n6) {
    var m4 = typeof Symbol === "function" && o7[Symbol.iterator];
    if (!m4) return o7;
    var i8 = m4.call(o7), r7, ar2 = [], e8;
    try {
      while ((n6 === void 0 || n6-- > 0) && !(r7 = i8.next()).done) ar2.push(r7.value);
    } catch (error) {
      e8 = { error };
    } finally {
      try {
        if (r7 && !r7.done && (m4 = i8["return"])) m4.call(i8);
      } finally {
        if (e8) throw e8.error;
      }
    }
    return ar2;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i8 = 0, l4 = from.length, ar2; i8 < l4; i8++) {
      if (ar2 || !(i8 in from)) {
        if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i8);
        ar2[i8] = from[i8];
      }
    }
    return to.concat(ar2 || Array.prototype.slice.call(from));
  }

  // node_modules/rxjs/dist/esm5/internal/util/isFunction.js
  function isFunction(value) {
    return typeof value === "function";
  }

  // node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  // node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors2) {
      _super(this);
      this.message = errors2 ? errors2.length + " errors occurred during unsubscription:\n" + errors2.map(function(err, i8) {
        return i8 + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors2;
    };
  });

  // node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscription.js
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors2;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e8) {
            errors2 = e8 instanceof UnsubscriptionError ? e8.errors : [e8];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors2 = errors2 !== null && errors2 !== void 0 ? errors2 : [];
                if (err instanceof UnsubscriptionError) {
                  errors2 = __spreadArray(__spreadArray([], __read(errors2)), __read(err.errors));
                } else {
                  errors2.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
        }
        if (errors2) {
          throw new UnsubscriptionError(errors2);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  // node_modules/rxjs/dist/esm5/internal/config.js
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };

  // node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var delegate = timeoutProvider.delegate;
      if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
        return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      var delegate = timeoutProvider.delegate;
      return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: void 0
  };

  // node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      var onUnhandledError = config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  // node_modules/rxjs/dist/esm5/internal/util/noop.js
  function noop() {
  }

  // node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
  var COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }

  // node_modules/rxjs/dist/esm5/internal/util/errorContext.js
  var context = null;
  function errorContext(cb) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  function captureError(err) {
    if (config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }

  // node_modules/rxjs/dist/esm5/internal/Subscriber.js
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn2, thisArg) {
    return _bind.call(fn2, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      captureError(error);
    } else {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config.onStoppedNotification;
    onStoppedNotification && timeoutProvider.setTimeout(function() {
      return onStoppedNotification(notification, subscriber);
    });
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };

  // node_modules/rxjs/dist/esm5/internal/symbol/observable.js
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();

  // node_modules/rxjs/dist/esm5/internal/util/identity.js
  function identity(x3) {
    return x3;
  }

  // node_modules/rxjs/dist/esm5/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn2) {
        return fn2(prev);
      }, input);
    };
  }

  // node_modules/rxjs/dist/esm5/internal/Observable.js
  var Observable = function() {
    function Observable2(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable2.prototype.lift = function(operator) {
      var observable2 = new Observable2();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable2.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable2.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable2.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable2.prototype[observable] = function() {
      return this;
    };
    Observable2.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable2.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x3) {
          return value = x3;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable2.create = function(subscribe) {
      return new Observable2(subscribe);
    };
    return Observable2;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }

  // node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedError = createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/Subject.js
  var Subject = function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(function() {
        _this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  }(Observable);
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject);

  // node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js
  var BehaviorSubject = function(_super) {
    __extends(BehaviorSubject2, _super);
    function BehaviorSubject2(_value) {
      var _this = _super.call(this) || this;
      _this._value = _value;
      return _this;
    }
    Object.defineProperty(BehaviorSubject2.prototype, "value", {
      get: function() {
        return this.getValue();
      },
      enumerable: false,
      configurable: true
    });
    BehaviorSubject2.prototype._subscribe = function(subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);
      !subscription.closed && subscriber.next(this._value);
      return subscription;
    };
    BehaviorSubject2.prototype.getValue = function() {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
      if (hasError) {
        throw thrownError;
      }
      this._throwIfClosed();
      return _value;
    };
    BehaviorSubject2.prototype.next = function(value) {
      _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject2;
  }(Subject);

  // node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
  var EmptyError = createErrorClass(function(_super) {
    return function EmptyErrorImpl() {
      _super(this);
      this.name = "EmptyError";
      this.message = "no elements in sequence";
    };
  });

  // node_modules/rxjs/dist/esm5/internal/lastValueFrom.js
  function lastValueFrom(source, config2) {
    var hasConfig = typeof config2 === "object";
    return new Promise(function(resolve, reject) {
      var _hasValue = false;
      var _value;
      source.subscribe({
        next: function(value) {
          _value = value;
          _hasValue = true;
        },
        error: reject,
        complete: function() {
          if (_hasValue) {
            resolve(_value);
          } else if (hasConfig) {
            resolve(config2.defaultValue);
          } else {
            reject(new EmptyError());
          }
        }
      });
    });
  }

  // node_modules/immer/dist/immer.mjs
  var NOTHING = Symbol.for("immer-nothing");
  var DRAFTABLE = Symbol.for("immer-draftable");
  var DRAFT_STATE = Symbol.for("immer-state");
  var errors = true ? [
    // All error codes, starting by 0:
    function(plugin) {
      return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
    },
    function(thing) {
      return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
    },
    "This object has been frozen and should not be mutated",
    function(data) {
      return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
    },
    "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    "Immer forbids circular references",
    "The first or second argument to `produce` must be a function",
    "The third argument to `produce` must be a function or undefined",
    "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    "First argument to `finishDraft` must be a draft returned by `createDraft`",
    function(thing) {
      return `'current' expects a draft, got: ${thing}`;
    },
    "Object.defineProperty() cannot be used on an Immer draft",
    "Object.setPrototypeOf() cannot be used on an Immer draft",
    "Immer only supports deleting array indices",
    "Immer only supports setting array indices and the 'length' property",
    function(thing) {
      return `'original' expects a draft, got: ${thing}`;
    }
    // Note: if more errors are added, the errorOffset in Patches.ts should be increased
    // See Patches.ts for additional errors
  ] : [];
  function die(error, ...args) {
    if (true) {
      const e8 = errors[error];
      const msg = typeof e8 === "function" ? e8.apply(null, args) : e8;
      throw new Error(`[Immer] ${msg}`);
    }
    throw new Error(
      `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
    );
  }
  var getPrototypeOf = Object.getPrototypeOf;
  function isDraft(value) {
    return !!value && !!value[DRAFT_STATE];
  }
  function isDraftable(value) {
    if (!value)
      return false;
    return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
  }
  var objectCtorString = Object.prototype.constructor.toString();
  var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
  function isPlainObject(value) {
    if (!value || typeof value !== "object")
      return false;
    const proto = Object.getPrototypeOf(value);
    if (proto === null || proto === Object.prototype)
      return true;
    const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    if (Ctor === Object)
      return true;
    if (typeof Ctor !== "function")
      return false;
    let ctorString = cachedCtorStrings.get(Ctor);
    if (ctorString === void 0) {
      ctorString = Function.toString.call(Ctor);
      cachedCtorStrings.set(Ctor, ctorString);
    }
    return ctorString === objectCtorString;
  }
  function each(obj, iter, strict = true) {
    if (getArchtype(obj) === 0) {
      const keys = strict ? Reflect.ownKeys(obj) : Object.keys(obj);
      keys.forEach((key) => {
        iter(key, obj[key], obj);
      });
    } else {
      obj.forEach((entry, index) => iter(index, entry, obj));
    }
  }
  function getArchtype(thing) {
    const state = thing[DRAFT_STATE];
    return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
  }
  function has(thing, prop) {
    return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
  }
  function set(thing, propOrOldValue, value) {
    const t7 = getArchtype(thing);
    if (t7 === 2)
      thing.set(propOrOldValue, value);
    else if (t7 === 3) {
      thing.add(value);
    } else
      thing[propOrOldValue] = value;
  }
  function is(x3, y4) {
    if (x3 === y4) {
      return x3 !== 0 || 1 / x3 === 1 / y4;
    } else {
      return x3 !== x3 && y4 !== y4;
    }
  }
  function isMap(target) {
    return target instanceof Map;
  }
  function isSet(target) {
    return target instanceof Set;
  }
  function latest(state) {
    return state.copy_ || state.base_;
  }
  function shallowCopy(base, strict) {
    if (isMap(base)) {
      return new Map(base);
    }
    if (isSet(base)) {
      return new Set(base);
    }
    if (Array.isArray(base))
      return Array.prototype.slice.call(base);
    const isPlain = isPlainObject(base);
    if (strict === true || strict === "class_only" && !isPlain) {
      const descriptors = Object.getOwnPropertyDescriptors(base);
      delete descriptors[DRAFT_STATE];
      let keys = Reflect.ownKeys(descriptors);
      for (let i8 = 0; i8 < keys.length; i8++) {
        const key = keys[i8];
        const desc = descriptors[key];
        if (desc.writable === false) {
          desc.writable = true;
          desc.configurable = true;
        }
        if (desc.get || desc.set)
          descriptors[key] = {
            configurable: true,
            writable: true,
            // could live with !!desc.set as well here...
            enumerable: desc.enumerable,
            value: base[key]
          };
      }
      return Object.create(getPrototypeOf(base), descriptors);
    } else {
      const proto = getPrototypeOf(base);
      if (proto !== null && isPlain) {
        return { ...base };
      }
      const obj = Object.create(proto);
      return Object.assign(obj, base);
    }
  }
  function freeze(obj, deep = false) {
    if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
      return obj;
    if (getArchtype(obj) > 1) {
      Object.defineProperties(obj, {
        set: dontMutateMethodOverride,
        add: dontMutateMethodOverride,
        clear: dontMutateMethodOverride,
        delete: dontMutateMethodOverride
      });
    }
    Object.freeze(obj);
    if (deep)
      Object.values(obj).forEach((value) => freeze(value, true));
    return obj;
  }
  function dontMutateFrozenCollections() {
    die(2);
  }
  var dontMutateMethodOverride = {
    value: dontMutateFrozenCollections
  };
  function isFrozen(obj) {
    if (obj === null || typeof obj !== "object")
      return true;
    return Object.isFrozen(obj);
  }
  var plugins = {};
  function getPlugin(pluginKey) {
    const plugin = plugins[pluginKey];
    if (!plugin) {
      die(0, pluginKey);
    }
    return plugin;
  }
  var currentScope;
  function getCurrentScope() {
    return currentScope;
  }
  function createScope(parent_, immer_) {
    return {
      drafts_: [],
      parent_,
      immer_,
      // Whenever the modified draft contains a draft from another scope, we
      // need to prevent auto-freezing so the unowned draft can be finalized.
      canAutoFreeze_: true,
      unfinalizedDrafts_: 0
    };
  }
  function usePatchesInScope(scope, patchListener) {
    if (patchListener) {
      getPlugin("Patches");
      scope.patches_ = [];
      scope.inversePatches_ = [];
      scope.patchListener_ = patchListener;
    }
  }
  function revokeScope(scope) {
    leaveScope(scope);
    scope.drafts_.forEach(revokeDraft);
    scope.drafts_ = null;
  }
  function leaveScope(scope) {
    if (scope === currentScope) {
      currentScope = scope.parent_;
    }
  }
  function enterScope(immer2) {
    return currentScope = createScope(currentScope, immer2);
  }
  function revokeDraft(draft) {
    const state = draft[DRAFT_STATE];
    if (state.type_ === 0 || state.type_ === 1)
      state.revoke_();
    else
      state.revoked_ = true;
  }
  function processResult(result, scope) {
    scope.unfinalizedDrafts_ = scope.drafts_.length;
    const baseDraft = scope.drafts_[0];
    const isReplaced = result !== void 0 && result !== baseDraft;
    if (isReplaced) {
      if (baseDraft[DRAFT_STATE].modified_) {
        revokeScope(scope);
        die(4);
      }
      if (isDraftable(result)) {
        result = finalize(scope, result);
        if (!scope.parent_)
          maybeFreeze(scope, result);
      }
      if (scope.patches_) {
        getPlugin("Patches").generateReplacementPatches_(
          baseDraft[DRAFT_STATE].base_,
          result,
          scope.patches_,
          scope.inversePatches_
        );
      }
    } else {
      result = finalize(scope, baseDraft, []);
    }
    revokeScope(scope);
    if (scope.patches_) {
      scope.patchListener_(scope.patches_, scope.inversePatches_);
    }
    return result !== NOTHING ? result : void 0;
  }
  function finalize(rootScope, value, path) {
    if (isFrozen(value))
      return value;
    const useStrictIteration = rootScope.immer_.shouldUseStrictIteration();
    const state = value[DRAFT_STATE];
    if (!state) {
      each(
        value,
        (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
        useStrictIteration
      );
      return value;
    }
    if (state.scope_ !== rootScope)
      return value;
    if (!state.modified_) {
      maybeFreeze(rootScope, state.base_, true);
      return state.base_;
    }
    if (!state.finalized_) {
      state.finalized_ = true;
      state.scope_.unfinalizedDrafts_--;
      const result = state.copy_;
      let resultEach = result;
      let isSet2 = false;
      if (state.type_ === 3) {
        resultEach = new Set(result);
        result.clear();
        isSet2 = true;
      }
      each(
        resultEach,
        (key, childValue) => finalizeProperty(
          rootScope,
          state,
          result,
          key,
          childValue,
          path,
          isSet2
        ),
        useStrictIteration
      );
      maybeFreeze(rootScope, result, false);
      if (path && rootScope.patches_) {
        getPlugin("Patches").generatePatches_(
          state,
          path,
          rootScope.patches_,
          rootScope.inversePatches_
        );
      }
    }
    return state.copy_;
  }
  function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
    if (childValue == null) {
      return;
    }
    if (typeof childValue !== "object" && !targetIsSet) {
      return;
    }
    const childIsFrozen = isFrozen(childValue);
    if (childIsFrozen && !targetIsSet) {
      return;
    }
    if (childValue === targetObject)
      die(5);
    if (isDraft(childValue)) {
      const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
      !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
      const res = finalize(rootScope, childValue, path);
      set(targetObject, prop, res);
      if (isDraft(res)) {
        rootScope.canAutoFreeze_ = false;
      } else
        return;
    } else if (targetIsSet) {
      targetObject.add(childValue);
    }
    if (isDraftable(childValue) && !childIsFrozen) {
      if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
        return;
      }
      if (parentState && parentState.base_ && parentState.base_[prop] === childValue && childIsFrozen) {
        return;
      }
      finalize(rootScope, childValue);
      if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
        maybeFreeze(rootScope, childValue);
    }
  }
  function maybeFreeze(scope, value, deep = false) {
    if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
      freeze(value, deep);
    }
  }
  function createProxyProxy(base, parent) {
    const isArray = Array.isArray(base);
    const state = {
      type_: isArray ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: parent ? parent.scope_ : getCurrentScope(),
      // True for both shallow and deep changes.
      modified_: false,
      // Used during finalization.
      finalized_: false,
      // Track which properties have been assigned (true) or deleted (false).
      assigned_: {},
      // The parent draft state.
      parent_: parent,
      // The base state.
      base_: base,
      // The base proxy.
      draft_: null,
      // set below
      // The base copy with any updated values.
      copy_: null,
      // Called by the `produce` function.
      revoke_: null,
      isManual_: false
    };
    let target = state;
    let traps = objectTraps;
    if (isArray) {
      target = [state];
      traps = arrayTraps;
    }
    const { revoke, proxy } = Proxy.revocable(target, traps);
    state.draft_ = proxy;
    state.revoke_ = revoke;
    return proxy;
  }
  var objectTraps = {
    get(state, prop) {
      if (prop === DRAFT_STATE)
        return state;
      const source = latest(state);
      if (!has(source, prop)) {
        return readPropFromProto(state, source, prop);
      }
      const value = source[prop];
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value === peek(state.base_, prop)) {
        prepareCopy(state);
        return state.copy_[prop] = createProxy(value, state);
      }
      return value;
    },
    has(state, prop) {
      return prop in latest(state);
    },
    ownKeys(state) {
      return Reflect.ownKeys(latest(state));
    },
    set(state, prop, value) {
      const desc = getDescriptorFromProto(latest(state), prop);
      if (desc?.set) {
        desc.set.call(state.draft_, value);
        return true;
      }
      if (!state.modified_) {
        const current2 = peek(latest(state), prop);
        const currentState = current2?.[DRAFT_STATE];
        if (currentState && currentState.base_ === value) {
          state.copy_[prop] = value;
          state.assigned_[prop] = false;
          return true;
        }
        if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
          return true;
        prepareCopy(state);
        markChanged(state);
      }
      if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
      (value !== void 0 || prop in state.copy_) || // special case: NaN
      Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
        return true;
      state.copy_[prop] = value;
      state.assigned_[prop] = true;
      return true;
    },
    deleteProperty(state, prop) {
      if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
        state.assigned_[prop] = false;
        prepareCopy(state);
        markChanged(state);
      } else {
        delete state.assigned_[prop];
      }
      if (state.copy_) {
        delete state.copy_[prop];
      }
      return true;
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(state, prop) {
      const owner = latest(state);
      const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
      if (!desc)
        return desc;
      return {
        writable: true,
        configurable: state.type_ !== 1 || prop !== "length",
        enumerable: desc.enumerable,
        value: owner[prop]
      };
    },
    defineProperty() {
      die(11);
    },
    getPrototypeOf(state) {
      return getPrototypeOf(state.base_);
    },
    setPrototypeOf() {
      die(12);
    }
  };
  var arrayTraps = {};
  each(objectTraps, (key, fn2) => {
    arrayTraps[key] = function() {
      arguments[0] = arguments[0][0];
      return fn2.apply(this, arguments);
    };
  });
  arrayTraps.deleteProperty = function(state, prop) {
    if (isNaN(parseInt(prop)))
      die(13);
    return arrayTraps.set.call(this, state, prop, void 0);
  };
  arrayTraps.set = function(state, prop, value) {
    if (prop !== "length" && isNaN(parseInt(prop)))
      die(14);
    return objectTraps.set.call(this, state[0], prop, value, state[0]);
  };
  function peek(draft, prop) {
    const state = draft[DRAFT_STATE];
    const source = state ? latest(state) : draft;
    return source[prop];
  }
  function readPropFromProto(state, source, prop) {
    const desc = getDescriptorFromProto(source, prop);
    return desc ? `value` in desc ? desc.value : (
      // This is a very special case, if the prop is a getter defined by the
      // prototype, we should invoke it with the draft as context!
      desc.get?.call(state.draft_)
    ) : void 0;
  }
  function getDescriptorFromProto(source, prop) {
    if (!(prop in source))
      return void 0;
    let proto = getPrototypeOf(source);
    while (proto) {
      const desc = Object.getOwnPropertyDescriptor(proto, prop);
      if (desc)
        return desc;
      proto = getPrototypeOf(proto);
    }
    return void 0;
  }
  function markChanged(state) {
    if (!state.modified_) {
      state.modified_ = true;
      if (state.parent_) {
        markChanged(state.parent_);
      }
    }
  }
  function prepareCopy(state) {
    if (!state.copy_) {
      state.copy_ = shallowCopy(
        state.base_,
        state.scope_.immer_.useStrictShallowCopy_
      );
    }
  }
  var Immer2 = class {
    constructor(config2) {
      this.autoFreeze_ = true;
      this.useStrictShallowCopy_ = false;
      this.useStrictIteration_ = true;
      this.produce = (base, recipe, patchListener) => {
        if (typeof base === "function" && typeof recipe !== "function") {
          const defaultBase = recipe;
          recipe = base;
          const self2 = this;
          return function curriedProduce(base2 = defaultBase, ...args) {
            return self2.produce(base2, (draft) => recipe.call(this, draft, ...args));
          };
        }
        if (typeof recipe !== "function")
          die(6);
        if (patchListener !== void 0 && typeof patchListener !== "function")
          die(7);
        let result;
        if (isDraftable(base)) {
          const scope = enterScope(this);
          const proxy = createProxy(base, void 0);
          let hasError = true;
          try {
            result = recipe(proxy);
            hasError = false;
          } finally {
            if (hasError)
              revokeScope(scope);
            else
              leaveScope(scope);
          }
          usePatchesInScope(scope, patchListener);
          return processResult(result, scope);
        } else if (!base || typeof base !== "object") {
          result = recipe(base);
          if (result === void 0)
            result = base;
          if (result === NOTHING)
            result = void 0;
          if (this.autoFreeze_)
            freeze(result, true);
          if (patchListener) {
            const p5 = [];
            const ip = [];
            getPlugin("Patches").generateReplacementPatches_(base, result, p5, ip);
            patchListener(p5, ip);
          }
          return result;
        } else
          die(1, base);
      };
      this.produceWithPatches = (base, recipe) => {
        if (typeof base === "function") {
          return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
        }
        let patches, inversePatches;
        const result = this.produce(base, recipe, (p5, ip) => {
          patches = p5;
          inversePatches = ip;
        });
        return [result, patches, inversePatches];
      };
      if (typeof config2?.autoFreeze === "boolean")
        this.setAutoFreeze(config2.autoFreeze);
      if (typeof config2?.useStrictShallowCopy === "boolean")
        this.setUseStrictShallowCopy(config2.useStrictShallowCopy);
      if (typeof config2?.useStrictIteration === "boolean")
        this.setUseStrictIteration(config2.useStrictIteration);
    }
    createDraft(base) {
      if (!isDraftable(base))
        die(8);
      if (isDraft(base))
        base = current(base);
      const scope = enterScope(this);
      const proxy = createProxy(base, void 0);
      proxy[DRAFT_STATE].isManual_ = true;
      leaveScope(scope);
      return proxy;
    }
    finishDraft(draft, patchListener) {
      const state = draft && draft[DRAFT_STATE];
      if (!state || !state.isManual_)
        die(9);
      const { scope_: scope } = state;
      usePatchesInScope(scope, patchListener);
      return processResult(void 0, scope);
    }
    /**
     * Pass true to automatically freeze all copies created by Immer.
     *
     * By default, auto-freezing is enabled.
     */
    setAutoFreeze(value) {
      this.autoFreeze_ = value;
    }
    /**
     * Pass true to enable strict shallow copy.
     *
     * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
     */
    setUseStrictShallowCopy(value) {
      this.useStrictShallowCopy_ = value;
    }
    /**
     * Pass false to use faster iteration that skips non-enumerable properties
     * but still handles symbols for compatibility.
     *
     * By default, strict iteration is enabled (includes all own properties).
     */
    setUseStrictIteration(value) {
      this.useStrictIteration_ = value;
    }
    shouldUseStrictIteration() {
      return this.useStrictIteration_;
    }
    applyPatches(base, patches) {
      let i8;
      for (i8 = patches.length - 1; i8 >= 0; i8--) {
        const patch = patches[i8];
        if (patch.path.length === 0 && patch.op === "replace") {
          base = patch.value;
          break;
        }
      }
      if (i8 > -1) {
        patches = patches.slice(i8 + 1);
      }
      const applyPatchesImpl = getPlugin("Patches").applyPatches_;
      if (isDraft(base)) {
        return applyPatchesImpl(base, patches);
      }
      return this.produce(
        base,
        (draft) => applyPatchesImpl(draft, patches)
      );
    }
  };
  function createProxy(value, parent) {
    const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
    const scope = parent ? parent.scope_ : getCurrentScope();
    scope.drafts_.push(draft);
    return draft;
  }
  function current(value) {
    if (!isDraft(value))
      die(10, value);
    return currentImpl(value);
  }
  function currentImpl(value) {
    if (!isDraftable(value) || isFrozen(value))
      return value;
    const state = value[DRAFT_STATE];
    let copy;
    let strict = true;
    if (state) {
      if (!state.modified_)
        return state.base_;
      state.finalized_ = true;
      copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
      strict = state.scope_.immer_.shouldUseStrictIteration();
    } else {
      copy = shallowCopy(value, true);
    }
    each(
      copy,
      (key, childValue) => {
        set(copy, key, currentImpl(childValue));
      },
      strict
    );
    if (state) {
      state.finalized_ = false;
    }
    return copy;
  }
  var immer = new Immer2();
  var produce = immer.produce;

  // src/personas/base_gemma4.ts
  var BASE_GEMMA4_PERSONA = {
    name: "Base Gemma4",
    instructions: [],
    promptTemplate: {
      user: {
        pre: "<|turn>user\n",
        post: "<turn|>\n"
      },
      model: {
        pre: "<|turn>model\n",
        post: "<turn|>\n"
      },
      system: {
        pre: "<|turn>user\n",
        post: "<turn|>\n"
      }
    }
  };

  // src/streaming_utils.ts
  function createProgressTransformer(contentLength, progress$) {
    let bytesRead = 0;
    return new TransformStream({
      transform(chunk, controller) {
        bytesRead += chunk.length;
        const percentage = bytesRead / contentLength;
        progress$.next({
          progress: percentage,
          downloadedBytes: bytesRead,
          totalBytes: contentLength
        });
        controller.enqueue(chunk);
      },
      flush() {
        progress$.next({
          progress: 1,
          downloadedBytes: contentLength,
          totalBytes: contentLength
        });
        progress$.complete();
      }
    });
  }
  function streamWithProgress(inputStream, contentLength) {
    const progress$ = new BehaviorSubject({
      progress: 0,
      downloadedBytes: 0,
      totalBytes: contentLength
    });
    const progressTransformer = createProgressTransformer(contentLength, progress$);
    const stream = inputStream.pipeThrough(progressTransformer);
    return { stream, progress$ };
  }

  // src/opfs_cache.ts
  function getFileName(path) {
    const parts = path.split("/");
    return parts[parts.length - 1];
  }
  var writingToCachePromise = void 0;
  async function loadModelWithCache(modelPath, modelFile) {
    if (modelFile) {
      return { stream: modelFile.stream(), size: modelFile.size };
    }
    const fileName = getFileName(modelPath);
    const opfsRoot = await navigator.storage.getDirectory();
    try {
      const fileHandle = await opfsRoot.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      const sizeHandle = await opfsRoot.getFileHandle(fileName + "_size");
      const sizeFile = await sizeHandle.getFile();
      const expectedSizeText = await sizeFile.text();
      const expectedSize2 = parseInt(expectedSizeText);
      if (file.size === expectedSize2) {
        console.log("Found valid model in cache.");
        return { stream: file.stream(), size: file.size };
      } else {
        console.warn("Cached model has incorrect size. Deleting and re-downloading.");
        console.warn("Expected size text: ", expectedSizeText);
        console.warn("Expected size: ", expectedSize2);
        console.warn("Actual size: ", file.size);
        await opfsRoot.removeEntry(fileName);
        await opfsRoot.removeEntry(fileName + "_size");
        throw new Error("Incorrect file size");
      }
    } catch (e8) {
      if (e8.name !== "NotFoundError") {
        console.error("Error accessing OPFS:", e8);
      }
    }
    let expectedSize = -1;
    try {
      const headResponse = await fetch(modelPath, { method: "HEAD" });
      if (!headResponse.ok) {
        const hfError = `Ensure you have accepted the proper model license on your HuggingFace account for the selected model.`;
        const localError = `Ensure the model is hosted at ${modelPath}.`;
        const error = isHostedOnHuggingFace() ? hfError : localError;
        throw new Error(`Failed to fetch model headers for ${modelPath}: ${headResponse.statusText}. ${error}`);
      }
      expectedSize = Number(headResponse.headers.get("Content-Length"));
      if (isNaN(expectedSize) || expectedSize <= 0) {
        throw new Error("Invalid Content-Length header received.");
      }
    } catch (e8) {
      console.warn(e8);
    }
    console.log("Fetching model from network and caching to OPFS.");
    const response = await fetch(modelPath);
    if (!response.ok || !response.body) {
      const hfError = `Ensure you have accepted the proper model license on your HuggingFace account for the selected model.`;
      const localError = `Ensure the model is hosted at ${modelPath}.`;
      const error = isHostedOnHuggingFace() ? hfError : localError;
      throw new Error(`Failed to download model from ${modelPath}: ${response.statusText}. ${error}`);
    }
    const [streamForConsumer, streamForCache] = response.body.tee();
    (async () => {
      try {
        const fileHandle = await opfsRoot.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        const sizeHandle = await opfsRoot.getFileHandle(fileName + "_size", { create: true });
        const sizeWritable = await sizeHandle.createWritable();
        const sizeWriter = sizeWritable.getWriter();
        const encoder = new TextEncoder();
        await sizeWriter.write(encoder.encode(expectedSize.toString()));
        await sizeWriter.close();
        const cacheEstimate = await navigator.storage.estimate();
        if (expectedSize > cacheEstimate.quota - cacheEstimate.usage) {
          alert(`The browser reports it does not have enough space in cache for this model. Ensure you are not running in incognito mode, or else try to free up some space. Model size: ${expectedSize}. Cache quota: ${cacheEstimate.quota}. Cache usage: ${cacheEstimate.usage}.`);
        }
        writingToCachePromise = streamForCache.pipeTo(writable);
        await writingToCachePromise;
        console.log(`Successfully cached ${fileName}.`);
      } catch (error) {
        console.error(`Failed to cache model ${fileName}:`, error);
        try {
          await opfsRoot.removeEntry(fileName);
          await opfsRoot.removeEntry(fileName + "_size");
        } catch (_cleanupError) {
        }
      }
    })();
    return { stream: streamForConsumer, size: expectedSize };
  }
  async function getCachedModelsInfo() {
    if (writingToCachePromise) await writingToCachePromise;
    const opfsRoot = await navigator.storage.getDirectory();
    const models = /* @__PURE__ */ new Map();
    const filesToRemove = /* @__PURE__ */ new Set();
    const fileHandles = /* @__PURE__ */ new Map();
    for await (const handle of opfsRoot.values()) {
      if (handle.kind === "file") {
        fileHandles.set(handle.name, handle);
      }
    }
    for (const [name, handle] of fileHandles.entries()) {
      if (name.endsWith("_size") || name.endsWith("crswap")) {
        continue;
      }
      const sizeFileName = name + "_size";
      const sizeFileHandle = fileHandles.get(sizeFileName);
      if (!sizeFileHandle) {
        filesToRemove.add(name);
        continue;
      }
      try {
        const modelFile = await handle.getFile();
        const sizeFile = await sizeFileHandle.getFile();
        const expectedSize = parseInt(await sizeFile.text());
        if (modelFile.size === expectedSize) {
          models.set(name, modelFile.size);
        } else {
          filesToRemove.add(name);
          filesToRemove.add(sizeFileName);
        }
      } catch (e8) {
        console.warn(`Error validating cache for ${name}, removing.`, e8);
        filesToRemove.add(name);
        filesToRemove.add(sizeFileName);
      }
    }
    for (const name of fileHandles.keys()) {
      if (name.endsWith("_size")) {
        const modelFileName = name.slice(0, -5);
        if (!fileHandles.has(modelFileName)) {
          filesToRemove.add(name);
        }
      }
    }
    for (const fileName of filesToRemove) {
      try {
        await opfsRoot.removeEntry(fileName);
      } catch (e8) {
      }
    }
    return models;
  }
  async function removeCachedModel(modelPath) {
    const fileName = getFileName(modelPath);
    const opfsRoot = await navigator.storage.getDirectory();
    try {
      await opfsRoot.removeEntry(fileName);
      await opfsRoot.removeEntry(fileName + "_size");
      console.log(`Successfully removed ${fileName} from cache.`);
    } catch (e8) {
      if (e8.name !== "NotFoundError") {
        console.error(`Failed to remove ${fileName} from cache:`, e8);
      }
    }
  }
  async function removeAllCachedModels() {
    const opfsRoot = await navigator.storage.getDirectory();
    try {
      const names = [];
      for await (const handle of opfsRoot.values()) {
        names.push(handle.name);
      }
      for (const name of names) {
        await opfsRoot.removeEntry(name);
      }
      console.log("Successfully removed all models from cache.");
    } catch (e8) {
      console.error("Failed to remove all models from cache:", e8);
    }
  }

  // src/llm_service.ts
  function isHostedOnHuggingFace() {
    return window.location.hostname.endsWith("hf.space");
  }
  var MODEL_PATHS = [
    {
      name: "Gemma 4 E2B",
      hfUrl: "https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm/resolve/main/gemma-4-E2B-it-web.task",
      localUrl: "./models/gemma-4-E2B-it-web.task"
    },
    {
      name: "Gemma 4 E4B",
      hfUrl: "https://huggingface.co/litert-community/gemma-4-E4B-it-litert-lm/resolve/main/gemma-4-E4B-it-web.task",
      localUrl: "./models/gemma-4-E4B-it-web.task"
    }
  ];
  function getModelUrl(model) {
    return isHostedOnHuggingFace() ? model.hfUrl : model.localUrl;
  }
  var DEFAULT_MAX_TOKENS = 1024;
  var LlmService = class {
    constructor() {
      this.options = {
        numResponses: 1,
        topK: 10,
        temperature: 0.8,
        maxTokens: 1024,
        forceF32: false
      };
      this.history = new BehaviorSubject([]);
      this.loadingProgress$ = new BehaviorSubject(null);
      this.persona = BASE_GEMMA4_PERSONA;
      this.promptTemplate = BASE_GEMMA4_PERSONA.promptTemplate;
      // Minimum number of tokens for the model's response. History is clipped to
      // always allow the model this many tokens to respond in.
      this.responseTokens = 384;
      this.genaiFileset = ir.forGenAiTasks(
        "wasm"
      );
    }
    isInitialized() {
      return !!this.llmInference;
    }
    setPersona(persona) {
      this.persona = persona;
      this.promptTemplate = this.persona.promptTemplate ?? BASE_GEMMA4_PERSONA.promptTemplate;
    }
    async setOptions(options) {
      await this.llmInferencePromise?.catch(console.warn);
      this.llmInference?.close();
      this.llmInference = void 0;
      this.llmInferencePromise = void 0;
      this.options = options;
      const modelAssetPath = options.baseOptions?.modelAssetPath;
      const modelAssetFile = options.baseOptions?.modelAssetFile;
      if (!modelAssetPath && !modelAssetFile) {
        throw new Error("modelAssetPath or modelAssetFile is required");
      }
      try {
        const { stream: modelStream, size: contentLength } = await loadModelWithCache(modelAssetPath, modelAssetFile);
        const { stream, progress$ } = streamWithProgress(modelStream, contentLength);
        const progressSub = progress$.subscribe((p5) => this.loadingProgress$.next(p5));
        const newOptions = structuredClone(options);
        newOptions.baseOptions ?? (newOptions.baseOptions = {});
        newOptions.baseOptions.modelAssetBuffer = stream.getReader();
        delete newOptions.baseOptions.modelAssetPath;
        delete newOptions.baseOptions.modelAssetFile;
        this.llmInferencePromise = ni.createFromOptions(
          await this.genaiFileset,
          newOptions
        );
        this.llmInference = await this.llmInferencePromise;
        progressSub.unsubscribe();
      } finally {
        this.loadingProgress$.next(null);
      }
    }
    clearHistory() {
      this.history.next([]);
    }
    removeLastMessage() {
      this.history.next(produce(this.history.value, (history) => {
        history.pop();
      }));
    }
    async generate() {
      if (!this.llmInference) {
        throw new Error("Llm not done loading");
      }
      const renderedText = this.renderChatHistoryForModel(this.history.value);
      const responseSubject = new BehaviorSubject("");
      this.history.next(produce(this.history.value, (messages) => {
        messages.push({
          role: "model",
          text: ""
        });
      }));
      const start = performance.now();
      this.llmInference.generateResponse(renderedText, async (partialResult, done) => {
        responseSubject.next(responseSubject.value + partialResult);
        this.history.next(produce(this.history.value, (messages) => {
          if (messages.length === 0) {
            return;
          }
          const lastMessage = messages.at(-1);
          lastMessage.text = responseSubject.value;
          lastMessage.doneGenerating = false;
        }));
        if (done) {
          const latencyMilliseconds = performance.now() - start;
          await sleep(0);
          this.history.next(produce(this.history.value, (messages) => {
            if (messages.length === 0) {
              return;
            }
            const lastMessage = messages[messages.length - 1];
            lastMessage.latencyMilliseconds = latencyMilliseconds;
            lastMessage.generatedTokenCount = this.llmInference?.sizeInTokens(lastMessage.text) ?? 0;
            lastMessage.doneGenerating = true;
            messages[messages.length - 1] = this.applyTemplate(lastMessage);
          }));
          responseSubject.complete();
        }
      });
      const response = await lastValueFrom(responseSubject);
      const tool = this.checkTools(response);
      if (tool) {
        const toolResponse = await tool(response);
        this.history.next(produce(this.history.value, (messages) => {
          messages.push(this.applyTemplate({
            role: "system",
            text: toolResponse
          }));
        }));
        await this.generate();
      }
    }
    checkTools(response) {
      for (const [key, tool] of Object.entries(this.persona.tools ?? {})) {
        if (response.includes(key)) {
          return tool;
        }
      }
    }
    cancelProcessing() {
      if (!this.llmInference) {
        return;
      }
      this.llmInference.cancelProcessing();
    }
    addUserMessage(text) {
      if (!this.llmInference) {
        throw new Error("Llm not done loading");
      }
      this.history.next(produce(this.history.value, (messages) => {
        messages.push(this.applyTemplate({
          role: "user",
          text
        }));
      }));
    }
    generateResponse(text) {
      this.addUserMessage(text);
      return this.generate();
    }
    applyTemplate(message) {
      if (!this.llmInference) {
        throw new Error("Llm not done loading");
      }
      const { pre, post } = this.promptTemplate[message.role];
      const strippedText = this.stripThoughts(message.text);
      const text = `${pre}${strippedText}${post}`;
      const tokenCount = this.llmInference.sizeInTokens(text) ?? 0;
      return produce(message, (newMessage) => {
        newMessage.templateApplied = {
          text,
          tokenCount
        };
      });
    }
    stripThoughts(text) {
      return text.replace(/<\|channel>thought.*?<channel\|>/gs, "");
    }
    applyTemplateToMessages(messages) {
      return messages.map((message) => this.applyTemplate(message));
    }
    /**
     * Render the chat history for the model, concatenating it together with the
     * template applied. Only includes as many recent messages as fit in contextLimit.
     *
     * Additionally, applies the selected persona by prepending all its context
     * to the conversation.
     */
    renderChatHistoryForModel(history) {
      const contextLimit = (this.options.maxTokens ?? DEFAULT_MAX_TOKENS) - this.responseTokens;
      const personaMessages = this.applyTemplateToMessages(this.persona.instructions);
      const personaContextRequirement = personaMessages.reduce(
        (sum, message) => sum + message.templateApplied?.tokenCount,
        0
      );
      if (personaContextRequirement > contextLimit) {
        throw new Error(`Persona ${this.persona.name} requires at least ${personaContextRequirement} tokens of context and only ${contextLimit} are available (${this.responseTokens} of the total ${this.options.maxTokens} are reserved for the model's response.)`);
      }
      let personaText = "";
      for (const personaMessage of personaMessages) {
        personaText += personaMessage.templateApplied.text;
      }
      let usedContext = personaContextRequirement;
      let text = "";
      for (let i8 = history.length - 1; i8 >= 0; i8--) {
        const message = history[i8];
        const contextWithNewMessage = usedContext + message.templateApplied.tokenCount;
        if (contextWithNewMessage >= contextLimit) {
          break;
        }
        text = message.templateApplied.text + text;
        usedContext = contextWithNewMessage;
      }
      return personaText + text + this.promptTemplate.model.pre;
    }
  };
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // src/custom_dropdown.ts
  var CustomDropdown = class extends i4 {
    constructor() {
      super();
      this.value = "";
      this.isOpen = false;
      this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this.boundHandleOutsideClick);
    }
    setOpen(isOpen) {
      if (this.isOpen === isOpen) {
        return;
      }
      this.isOpen = isOpen;
      if (this.isOpen) {
        setTimeout(() => {
          document.addEventListener("click", this.boundHandleOutsideClick);
        }, 0);
      } else {
        document.removeEventListener("click", this.boundHandleOutsideClick);
      }
    }
    handleOutsideClick(e8) {
      if (!this.contains(e8.target)) {
        this.setOpen(false);
      }
    }
    toggleDropdown() {
      this.setOpen(!this.isOpen);
    }
    handleItemClick(e8) {
      const target = e8.target.closest("[data-value]");
      if (target?.dataset["value"] && !target.hasAttribute("disabled")) {
        this.value = target.dataset["value"];
        this.setOpen(false);
        this.dispatchEvent(new CustomEvent("change", { detail: this.value }));
      }
    }
    render() {
      const items = Array.from(this.querySelectorAll("[data-value]"));
      const selectedItem = items.find((item) => item.dataset["value"] === this.value);
      const buttonText = selectedItem ? selectedItem.querySelector("span")?.textContent ?? selectedItem.textContent : "Select...";
      return b2`
      <button class="dropdown-button" @click=${this.toggleDropdown}>
        ${buttonText}
      </button>
      <div class="dropdown-content ${this.isOpen ? "show" : ""}">
        <slot @slotchange=${() => this.requestUpdate()} @click=${this.handleItemClick}></slot>
      </div>
    `;
    }
  };
  CustomDropdown.styles = i`
    :host {
      display: block;
      position: relative;
      font-family: Arial, Helvetica, sans-serif;
    }
    .dropdown-button {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: #fff;
      cursor: pointer;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dropdown-button:after {
      content: '▼';
      font-size: 0.8em;
    }
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      width: 100%;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      border-radius: 4px;
      max-height: 300px;
      overflow-y: auto;
    }
    .dropdown-content.show {
      display: block;
    }
    ::slotted([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #eee;
    }
    ::slotted([disabled]:hover) {
      background-color: #eee;
    }
  `;
  __decorateClass([
    n4({ type: String })
  ], CustomDropdown.prototype, "value", 2);
  __decorateClass([
    r5()
  ], CustomDropdown.prototype, "isOpen", 2);
  CustomDropdown = __decorateClass([
    t3("custom-dropdown")
  ], CustomDropdown);

  // src/llm_options.ts
  var LlmOptions = class extends i4 {
    constructor() {
      super(...arguments);
      this.cachedModels = /* @__PURE__ */ new Map();
      this.thinking = false;
      this.options = structuredClone(DEFAULT_OPTIONS);
    }
    async connectedCallback() {
      super.connectedCallback();
      this.cachedModels = await getCachedModelsInfo();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
    }
    dispatchOptionsChanged() {
      const event = new CustomEvent("options-changed", {
        detail: structuredClone(this.options),
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
    handleTemperatureChange(e8) {
      this.options = produce(this.options, (options) => {
        options.temperature = parseFloat(e8.target.value);
      });
      this.dispatchOptionsChanged();
    }
    handleMaxTokensChange(e8) {
      this.options = produce(this.options, (options) => {
        options.maxTokens = parseInt(e8.target.value);
      });
      this.dispatchOptionsChanged();
    }
    handleTopKChange(e8) {
      this.options = produce(this.options, (options) => {
        options.topK = parseInt(e8.target.value);
      });
      this.dispatchOptionsChanged();
    }
    handleForceF32Change(e8) {
      this.options = produce(this.options, (options) => {
        options.forceF32 = e8.target.checked;
      });
      this.dispatchOptionsChanged();
    }
    handleThinkingChange(e8) {
      const event = new CustomEvent("thinking-changed", {
        detail: e8.target.checked,
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
    async handleRemoveCached(e8, path) {
      e8.stopPropagation();
      if (confirm("Remove model from cache?")) {
        await removeCachedModel(path);
        this.cachedModels = await getCachedModelsInfo();
        this._dispatchCachedModelsChanged();
      }
    }
    async handleRemoveAllCached(e8) {
      e8.stopPropagation();
      if (confirm("Remove all models from cache?")) {
        await removeAllCachedModels();
        this.cachedModels = await getCachedModelsInfo();
        this._dispatchCachedModelsChanged();
      }
    }
    _dispatchCachedModelsChanged() {
      const event = new CustomEvent("cached-models-changed", {
        detail: this.cachedModels,
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
    getFileName(path) {
      return path.split("/").pop();
    }
    handleModelFileChange(e8) {
      const file = e8.target.files?.[0];
      if (file) {
        this.options = produce(this.options, (options) => {
          options.baseOptions.modelAssetPath = file.name;
          options.baseOptions.modelAssetFile = file;
        });
        this.dispatchOptionsChanged();
      }
    }
    getTotalCacheSize() {
      const totalSize = Array.from(this.cachedModels.values()).reduce((acc, size) => acc + size, 0);
      return (totalSize / 1e9).toFixed(2);
    }
    handleModelChange(e8) {
      this.options = produce(this.options, (options) => {
        options.baseOptions.modelAssetPath = e8.detail;
      });
      this.dispatchOptionsChanged();
    }
    render() {
      const isChrome = navigator.userAgent.includes("Chrome");
      const isEdge = navigator.userAgent.includes("Edg");
      const showNativeFileChooser = false;
      return b2`
      <h3>LLM Options</h3>
      <div class="options-grid">
        <div>
          <label for="model-select">Model:</label>
          ${showNativeFileChooser ? b2`
              <input type="file" @change=${this.handleModelFileChange} />
              <p>Selected model: ${this.options.baseOptions?.modelAssetPath?.replace("file:", "")}</p>
            ` : b2`
              <custom-dropdown
                .value=${this.options.baseOptions?.modelAssetPath}
                @change=${this.handleModelChange}
              >
                ${MODEL_PATHS.map(
        (model) => {
          const path = getModelUrl(model);
          const cachedSize = this.cachedModels.get(this.getFileName(path));
          return b2`
                    <div class="dropdown-item" data-value=${path}>
                      <span>${model.name}</span>
                      ${cachedSize ? b2`
                          <span class="cached-info">
                            <span>${(cachedSize / 1e9).toFixed(2)}GB</span>
                            <button class="delete-cache-btn" title="Remove from cache" @click=${(e8) => this.handleRemoveCached(e8, path)}>✕</button>
                          </span>
                        ` : ""}
                    </div>
                  `;
        }
      )}
              </custom-dropdown>
              <div class="cache-info">
                <span>Total cached: ${this.getTotalCacheSize()}GB</span>
                ${this.cachedModels.size > 0 ? b2`<button class="clear-all-btn" title="Remove all from cache" @click=${this.handleRemoveAllCached}>Clear all</button>` : ""}
              </div>
            `}
        </div>
        <div>
          <label for="thinking">
            <input
              type="checkbox"
              id="thinking"
              .checked=${this.thinking}
              @change=${this.handleThinkingChange}
              style="width: auto; margin-right: 8px;"
            />
            Thinking
          </label>
        </div>
        <div>
          <label for="temperature"
            >Temperature: ${this.options.temperature.toFixed(2)}</label
          >
          <input
            type="range"
            id="temperature"
            min="0"
            max="2"
            step="0.01"
            .value=${this.options.temperature.toString()}
            @input=${this.handleTemperatureChange}
          />
        </div>
        <div>
          <label for="max-tokens">Max Tokens:</label> <input
            type="number"
            id="max-tokens"
            min="64"
            max="4096"
            step="64"
            .value=${this.options.maxTokens.toString()}
            @input=${this.handleMaxTokensChange}
          />
        </div>
        <div>
          <label for="top-k">Top K:</label>
          <input
            type="number"
            id="top-k"
            min="1"
            max="100"
            step="1"
            .value=${this.options.topK.toString()}
            @input=${this.handleTopKChange}
          />
        </div>
        <div>
          <label for="force-f32">
            <input
              type="checkbox"
              id="force-f32"
              .checked=${this.options.forceF32}
              @change=${this.handleForceF32Change}
              style="width: auto; margin-right: 8px;"
            />
            Force F32 Fallback
          </label>
        </div>
      </div>
    `;
    }
  };
  LlmOptions.styles = i`
    :host {
      display: block;
      padding: 16px;
      background-color: #f9f9f9;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      font-family: Arial, Helvetica, sans-serif;
    }
    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
      font-size: 0.9em;
    }
    input,
    select {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      font-family: inherit;
    }
    input[type=range] {
      padding: 0;
    }
    .full-width {
      grid-column: 1 / -1;
    }
    h3 {
      margin-top: 0;
      font-size: 1.2em;
      color: #333;
      margin-bottom: 16px;
    }
    .dropdown-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      cursor: pointer;
    }
    .dropdown-item:hover {
      background-color: #f0f0f0;
    }
    .cached-info {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: #e0e0e0;
      color: #333;
      padding: 2px 4px 2px 6px;
      border-radius: 4px;
      font-size: 0.8em;
      margin-left: 8px;
    }
    .delete-cache-btn {
      background: transparent;
      border: none;
      color: #888;
      cursor: pointer;
      font-weight: bold;
      padding: 0;
      margin: 0;
      font-size: 1.2em;
      line-height: 1;
    }
    .delete-cache-btn:hover {
      color: #c00;
    }
    .clear-all-btn {
      background: transparent;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 0;
      margin: 0;
      line-height: 1;
      text-decoration: underline;
    }
    .clear-all-btn:hover {
      color: #c00;
    }
    .cache-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      font-size: 0.9em;
      color: #666;
    }
  `;
  __decorateClass([
    n4({ type: Array })
  ], LlmOptions.prototype, "cachedModels", 2);
  __decorateClass([
    n4({ type: Boolean })
  ], LlmOptions.prototype, "thinking", 2);
  __decorateClass([
    r5()
  ], LlmOptions.prototype, "options", 2);
  LlmOptions = __decorateClass([
    t3("llm-options")
  ], LlmOptions);

  // src/llm_chat.ts
  var import_deep_equal = __toESM(require_deep_equal());

  // src/personas/base_gemma4_thinking.ts
  var BASE_GEMMA4_THINKING_PERSONA = {
    ...BASE_GEMMA4_PERSONA,
    name: "Base Gemma4 Thinking",
    instructions: [
      {
        role: "system",
        text: "<|think|>"
      }
    ]
  };

  // src/llm_chat.ts
  function isChromium() {
    if (navigator.userAgent.includes("Chrome")) {
      return true;
    }
    if (navigator.userAgent.includes("Edg")) {
      return true;
    }
    return false;
  }
  if (!isChromium()) {
    alert(
      "Your browser may not have full WebGPU support. Please run the demo on Chrome for the best possible experience."
    );
  }
  var LlmChat = class extends i4 {
    constructor() {
      super();
      this.userInput = "";
      this.isLoadingModel = false;
      this.isGenerating = false;
      this.errorMessage = null;
      this.chatHistory = [];
      this.loadingProgress = null;
      this.currentAppliedOptions = structuredClone(DEFAULT_OPTIONS);
      this.pendingOptions = structuredClone(DEFAULT_OPTIONS);
      this.hasPendingOptionsChanges = false;
      this.isThinkingEnabled = false;
      this.cachedModels = /* @__PURE__ */ new Map();
      this.llmService = new LlmService();
      this.llmService.history.subscribe((history) => {
        this.chatHistory = history;
        this.requestUpdate();
      });
      this.llmService.loadingProgress$.subscribe((progress) => {
        this.loadingProgress = progress;
        this.requestUpdate();
      });
      this.llmService.setPersona(this.selectedPersona);
      getCachedModelsInfo().then((models) => {
        this.cachedModels = models;
      });
    }
    get selectedPersona() {
      return this.isThinkingEnabled ? BASE_GEMMA4_THINKING_PERSONA : BASE_GEMMA4_PERSONA;
    }
    handleThinkingToggle(event) {
      this.isThinkingEnabled = event.detail;
      this.llmService.setPersona(this.selectedPersona);
      this.requestUpdate();
    }
    getModelName() {
      const modelPath = this.currentAppliedOptions.baseOptions?.modelAssetPath;
      if (!modelPath) {
        return "default model";
      }
      const model = MODEL_PATHS.find((m4) => getModelUrl(m4) === modelPath);
      return model ? model.name : "custom model";
    }
    handleOptionsChange(event) {
      const newOptionsFromChild = event.detail;
      this.pendingOptions = newOptionsFromChild;
      this.hasPendingOptionsChanges = !(0, import_deep_equal.default)(
        this.currentAppliedOptions,
        this.pendingOptions
      );
      this.requestUpdate();
    }
    async _applyPendingOptionsIfNeeded() {
      if (this.hasPendingOptionsChanges || !this.llmService.isInitialized()) {
        console.log("Applying pending LLM options:", this.pendingOptions);
        this.isLoadingModel = true;
        this.errorMessage = null;
        this.requestUpdate();
        try {
          if (!this.llmService.isInitialized()) {
            this.llmService.setPersona(this.selectedPersona);
          }
          await this.llmService.setOptions(structuredClone(this.pendingOptions));
          this.currentAppliedOptions = structuredClone(this.pendingOptions);
          this.hasPendingOptionsChanges = false;
          console.log("LLM options applied successfully.");
          this.isLoadingModel = false;
          this.cachedModels = await getCachedModelsInfo();
          this.requestUpdate();
          return true;
        } catch (error) {
          console.error("Failed to apply pending LLM options:", error);
          this.errorMessage = `Failed to apply new options. Error: ${error instanceof Error ? error.message : String(error)}`;
          this.isLoadingModel = false;
          this.cachedModels = await getCachedModelsInfo();
          this.requestUpdate();
          return false;
        }
      }
      return true;
    }
    handleRemoveLastMessage() {
      this.llmService.removeLastMessage();
    }
    handleRegenerateLastMessage() {
      const currentHistory = this.llmService.history.value;
      const lastMessage = currentHistory[currentHistory.length - 1];
      if (lastMessage) {
        if (lastMessage.role === "model") {
          this.llmService.removeLastMessage();
          this.generate();
        } else if (lastMessage.role === "user") {
          this.generate();
        }
      }
    }
    handleUserInput(event) {
      this.userInput = event.target.value;
    }
    async generate() {
      if (this.isGenerating || this.isLoadingModel) {
        return;
      }
      const optionsApplied = await this._applyPendingOptionsIfNeeded();
      if (!optionsApplied) {
        return;
      }
      this.isGenerating = true;
      this.errorMessage = null;
      this.requestUpdate();
      try {
        await this.llmService.generate();
      } catch (error) {
        console.error("Failed to send message or generate response:", error);
        this.errorMessage = `Failed to send message. Error: ${error instanceof Error ? error.message : String(error)}`;
      } finally {
        this.isGenerating = false;
        this.userInputElement?.focus();
        this.requestUpdate();
      }
    }
    async sendMessage() {
      if (!this.userInput.trim()) {
        return;
      }
      const userMessageText = this.userInput.trim();
      this.userInput = "";
      const optionsApplied = await this._applyPendingOptionsIfNeeded();
      if (!optionsApplied) {
        return;
      }
      this.llmService.addUserMessage(userMessageText);
      return this.generate();
    }
    render() {
      let statusMessageHtml = b2``;
      if (this.errorMessage) {
        statusMessageHtml = b2`<div class="status-bar error-message">${this.errorMessage}</div>`;
      } else if (this.isLoadingModel) {
        let message = "Loading...";
        if (this.loadingProgress !== null && this.loadingProgress.progress < 1) {
          const downloadedMB = (this.loadingProgress.downloadedBytes / 1e6).toFixed(2);
          const totalMB = (this.loadingProgress.totalBytes / 1e6).toFixed(2);
          message = `Loading model... (${downloadedMB}MB / ${totalMB}MB)`;
        } else if (this.hasPendingOptionsChanges) {
          message = "Applying new options...";
        } else {
          message = `Setting up ${this.selectedPersona.name}...`;
        }
        statusMessageHtml = b2`
        <div class="status-bar loading-message">
          <span>${message}</span>
          ${this.loadingProgress !== null && this.loadingProgress.progress < 1 ? b2`<progress .value=${this.loadingProgress.progress}></progress>` : ""}
        </div>
      `;
      } else if (this.isGenerating) {
        statusMessageHtml = b2`<div class="status-bar generating-message">Generating response with ${this.getModelName()}...</div>`;
      }
      return b2`
      <div class="main-chat-area">
        ${statusMessageHtml}
        <div class="chat-area">
          <chat-history
            .history=${this.chatHistory}
            @regenerate-last-model-message=${this.handleRegenerateLastMessage}
            @remove-last-message=${this.handleRemoveLastMessage}
          ></chat-history>
        </div>
        <div class="disclaimer">
          This is a demonstration for illustrative purposes and is not a Google product.
        </div>
        <div class="input-area">
          <input
            type="text"
            id="userInput"
            placeholder=${!this.pendingOptions.baseOptions?.modelAssetPath ? "Select a model to begin..." : `Chat with ${this.selectedPersona.name}...`}
            .value=${this.userInput}
            @input=${this.handleUserInput}
            @keypress=${(e8) => e8.key === "Enter" && this.sendMessage()}
            ?disabled=${!this.pendingOptions.baseOptions?.modelAssetPath}
          />
          <button
            @click=${this.sendMessage}
            ?disabled=${this.isGenerating || this.isLoadingModel || !this.userInput.trim() || !this.pendingOptions.baseOptions?.modelAssetPath}
          >
            Send
          </button>
          ${this.isGenerating ? b2`<button @click=${this.handleCancel} ?disabled=${this.isLoadingModel}>
                  Stop Generation
                </button>` : ""}
        </div>
      </div>

      <div class="options-container">
        <llm-options
          .options=${this.pendingOptions}
          .cachedModels=${this.cachedModels}
          .thinking=${this.isThinkingEnabled}
          @options-changed=${this.handleOptionsChange}
          @thinking-changed=${this.handleThinkingToggle}
          @cached-models-changed=${this.handleCachedModelsChanged}
          ?disabled=${this.isLoadingModel || this.isGenerating}
        >
        </llm-options>
      </div>
    `;
    }
    handleCancel() {
      this.llmService.cancelProcessing();
    }
    handleCachedModelsChanged(event) {
      this.cachedModels = event.detail;
    }
  };
  LlmChat.styles = i`
    :host {
      display: flex;
      flex-direction: row; /* Main layout: personas | chat | options */
      height: calc(100vh - 40px);
      max-width: 1400px; /* Adjusted max-width for three panels */
      margin: 20px auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }

    .status-bar {
      padding: 8px 16px;
      text-align: center;
      font-size: 0.9em;
      transition: background-color 0.3s ease;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .error-message {
      color: white;
      background-color: #d32f2f;
    }
    .loading-message {
      color: white;
      background-color: #1976d2;
    }
    .generating-message {
      color: #333;
      background-color: #fff59d;
    }

    progress {
      width: 100px;
    }

    .main-chat-area {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden;
      height: 100%;
      position: relative;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }

    .options-container {
      width: 320px;
      flex-shrink: 0;
      overflow-y: auto;
      background-color: #f9f9f9;
      height: 100%;
      box-sizing: border-box;
    }

    .options-container llm-options {
        display: block;
        height: 100%;
    }

    .chat-area {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow-y: auto;
      padding: 16px;
      padding-top: 50px;
    }

    .disclaimer {
      padding: 8px 16px;
      text-align: center;
      font-size: 0.9em;
      font-family: Arial, Helvetica, sans-serif;
      color: #666;
      background-color: #f9f9f9;
      border-top: 1px solid #ddd;
    }

    .input-area {
      display: flex;
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 16px;
      background-color: #f9f9f9;
    }

    #userInput {
      flex-grow: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 8px;
      font-size: 1em;
    }

    button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1em;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    @media (max-width: 900px) {
      :host {
        flex-direction: column;
        height: calc(100vh - 20px);
        margin: 10px auto;
      }

      .status-bar {
        position: static;
        border-radius: 8px 8px 0 0;
        order: -1;
      }

      .main-chat-area {
        width: 100%;
        order: 1;
        border-left: none;
        border-right: none;
      }

      .options-container {
        width: 100%;
        order: 2;
        border-left: none;
        border-top: 1px solid #ddd;
        max-height: 35vh;
        height: auto;
      }

      .chat-area {
        padding-top: 16px;
      }
    }
  `;
  __decorateClass([
    r5()
  ], LlmChat.prototype, "userInput", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "isLoadingModel", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "isGenerating", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "errorMessage", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "chatHistory", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "loadingProgress", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "currentAppliedOptions", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "pendingOptions", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "hasPendingOptionsChanges", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "isThinkingEnabled", 2);
  __decorateClass([
    r5()
  ], LlmChat.prototype, "cachedModels", 2);
  __decorateClass([
    e5("#userInput")
  ], LlmChat.prototype, "userInputElement", 2);
  LlmChat = __decorateClass([
    t3("llm-chat")
  ], LlmChat);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=bundle.js.map
