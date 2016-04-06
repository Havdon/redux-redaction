(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["redux-redaction"] = factory();
	else
		root["redux-redaction"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Redaction = exports.redaction = exports.createRedaction = undefined;
	
	var _createRedaction = __webpack_require__(1);
	
	var _createRedaction2 = _interopRequireDefault(_createRedaction);
	
	var _redaction = __webpack_require__(3);
	
	var _redaction2 = _interopRequireDefault(_redaction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.createRedaction = _createRedaction2.default;
	exports.redaction = _redaction2.default;
	exports.Redaction = _redaction.Redaction;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _utils = __webpack_require__(2);
	
	var _redaction = __webpack_require__(3);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	exports.default = function (mod) {
	    return createRedaction(mod);
	};
	
	var isFunction = function isFunction(f) {
	    return Object.prototype.toString.call(f) === '[object Function]';
	};
	
	function createRedaction(mod, parentName) {
	
	    var redaction = Object.keys(mod).reduce(function (prev, key) {
	        if (key === 'initialState') {
	            return prev;
	        }
	
	        var obj = mod[key];
	        var name = parentName ? parentName + '.' + key : key;
	        if (isFunction(obj)) {
	            return _extends({}, prev, {
	                reducers: _extends({}, prev.reducers, _defineProperty({}, name, obj)),
	                actions: _extends({}, prev.actions, _defineProperty({}, key, function () {
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }
	
	                    return { type: name, payload: args.length === 1 ? args[0] : args };
	                }))
	            });
	        }
	
	        if (obj instanceof _redaction.Redaction) {
	            return _extends({}, prev, {
	                reducers: _extends({}, prev.reducers, _defineProperty({}, name, obj.handleReduce.bind(obj))),
	                actions: _extends({}, prev.actions, _defineProperty({}, key, function () {
	                    var action = obj.getAction.apply(obj, arguments) || {};
	                    if (isFunction(action)) {
	                        // Pass functions through so that thunks, etc still work.
	                        return action;
	                    } else if (typeof action === 'string') {
	                        action = {
	                            payload: action
	                        };
	                    }
	                    return _extends({}, action, {
	                        type: name
	                    });
	                }))
	            });
	        }
	
	        // Any object with initialState is assumed to be a redaction module.
	        if (typeof obj.initialState !== 'undefined') {
	            if (_typeof(prev.initialState) !== 'object') {
	                throw new Error('Redaction ' + name + ' cannot have subredactions if the initial state is not an object.');
	            }
	            var subRedaction = createRedaction(obj, name);
	            return _extends({}, prev, {
	                initialState: _extends({}, prev.initialState, _defineProperty({}, key, subRedaction.initialState)),
	                reducers: _extends({}, prev.reducers, subRedaction.reducers),
	                actions: _extends({}, prev.actions, _defineProperty({}, key, subRedaction.actions))
	            });
	        }
	        return prev;
	    }, { initialState: typeof mod.initialState !== 'undefined' ? mod.initialState : {} });
	
	    redaction.reducer = function () {
	        var state = arguments.length <= 0 || arguments[0] === undefined ? redaction.initialState : arguments[0];
	        var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        var func = redaction.reducers[action.type];
	        if (func) {
	
	            var split = action.type.split('.');
	            if (split.length == 1) return func(state, action);
	            split.pop();
	            return (0, _utils.pathMap)(state, split, function (subState) {
	                return func(subState, action);
	            });
	        } else {
	            return state;
	        }
	    };
	    return redaction;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var pathMap = exports.pathMap = function pathMap(obj, path, cb) {
	    if (typeof path === 'string') path = path.split('.');
	    path = [].concat(_toConsumableArray(path));
	    var key = path.shift();
	    if (typeof obj[key] !== 'undefined') {
	        if (path.length > 0) {
	            return _extends({}, obj, _defineProperty({}, key, pathMap(obj[key], path, cb)));
	        } else {
	            return _extends({}, obj, _defineProperty({}, key, cb(obj[key])));
	        }
	    }
	    return obj;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Redaction = exports.Redaction = function () {
	    function Redaction(actionFn) {
	        _classCallCheck(this, Redaction);
	
	        this.actionFn = actionFn;
	        this.name = null;
	    }
	
	    _createClass(Redaction, [{
	        key: 'reduce',
	        value: function reduce(cb) {
	            this.reduceCb = cb;
	            return this;
	        }
	    }, {
	        key: 'onError',
	        value: function onError(cb) {
	            this.onErrorCb = cb;
	            return this;
	        }
	    }, {
	        key: 'onPending',
	        value: function onPending(cb) {
	            this.onPendingCb = cb;
	            return this;
	        }
	    }, {
	        key: 'getAction',
	        value: function getAction() {
	            if (typeof this.actionFn === 'function') return this.actionFn.apply(this, arguments);else return this.actionFn;
	        }
	    }, {
	        key: 'handleReduce',
	        value: function handleReduce(state) {
	            var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	            if (Redaction.isPending(action)) {
	                if (this.onPendingCb) return this.onPendingCb(state, action);
	            } else if (Redaction.isError(action)) {
	                if (this.onErrorCb) return this.onErrorCb(state, action);
	            } else if (this.reduceCb) {
	                return this.reduceCb(state, action);
	            }
	            return state;
	        }
	    }], [{
	        key: 'isPending',
	        value: function isPending(action) {
	            return action.pending;
	        }
	    }, {
	        key: 'isError',
	        value: function isError(action) {
	            return action.error;
	        }
	    }]);
	
	    return Redaction;
	}();
	
	var redaction = function redaction(action) {
	    return new Redaction(action);
	};
	
	exports.default = redaction;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map