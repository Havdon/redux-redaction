!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.redaction=e.createReducers=e.createActions=void 0;var o=n(6),u=r(o),i=n(7),c=r(i),f=n(1),a=r(f);e.createActions=u["default"],e.createReducers=c["default"],e.redaction=a["default"]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Redaction=void 0;var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(5),i=e.Redaction=function(){function t(e){r(this,t),this.payload=e,this.name=null}return o(t,[{key:"reduce",value:function(t){return this.reduceCb=t,this}},{key:"onError",value:function(t){return this.onErrorCb=t,this}},{key:"onPending",value:function(t){return this.onPendingCb=t,this}},{key:"getPayload",value:function(){return"function"==typeof this.payload?this.payload.apply(this,arguments):this.payload}},{key:"getActionCreator",value:function(){var t=this;if(!this.name)throw new Error("Redaction has no name!");var e=(0,u.createAction)(this.name);return function(){var n=t.getPayload.apply(t,arguments);return e(n)}}},{key:"reducer",value:function(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(t.isPending(n)){if(this.onPendingCb)return this.onPendingCb(e,n)}else if(t.isError(n)){if(this.onErrorCb)return this.onErrorCb(e,n)}else if(this.reduceCb)return this.reduceCb(e,n);return e}}],[{key:"isPending",value:function(t){return t.pending}},{key:"isError",value:function(t){return t.error}}]),t}(),c=function(t){return new i(t)};e["default"]=c},function(t,e,n){"use strict";function r(t,e,n){var i={},c=!0;for(var f in t){var a=t[f],l=n?n+"."+f:f;if("object"===("undefined"==typeof a?"undefined":o(a))){if(a.__esModule===!0){var s=r(a,e,l);s&&(i[f]=s,c=!1)}else if(a instanceof u.Redaction){a.name=l;var d=e(a,l);d&&(i[f]=d,c=!1)}}else if("function"==typeof a){var p=e(a,l);p&&(i[f]=p,c=!1)}}return c&&n?void 0:i}Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};e.mapRedaction=r;var u=n(1)},function(t,e){function n(t){return function(e){return null==e?void 0:e[t]}}function r(t){return u(t)&&v.call(t,"callee")&&(!h.call(t,"callee")||b.call(t)==s)}function o(t){return null!=t&&c(_(t))&&!i(t)}function u(t){return a(t)&&o(t)}function i(t){var e=f(t)?b.call(t):"";return e==d||e==p}function c(t){return"number"==typeof t&&t>-1&&t%1==0&&l>=t}function f(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function a(t){return!!t&&"object"==typeof t}var l=9007199254740991,s="[object Arguments]",d="[object Function]",p="[object GeneratorFunction]",y=Object.prototype,v=y.hasOwnProperty,b=y.toString,h=y.propertyIsEnumerable,_=n("length");t.exports=r},function(t,e,n){"use strict";function r(t){return"function"==typeof t}function o(t,e){return function(n,o){if(o.type!==t)return n;var i=u.isError(o)?"throw":"next";r(e)&&(e.next=e["throw"]=e);var c=e[i];return r(c)?c(n,o):n}}e.__esModule=!0,e["default"]=o;var u=n(8);t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(14),u=r(o),i=n(4),c=r(i),f=n(15),a=r(f);e.createAction=u["default"],e.handleAction=c["default"],e.handleActions=a["default"]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(5),o=n(2),u=function(t,e){return(0,o.mapRedaction)(t,function(t,e){return"function"==typeof t?(0,r.createAction)(e):t.getActionCreator()})};e["default"]=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),o=function(t){return(0,r.mapRedaction)(t,function(t,e){return"function"==typeof t?t:t.reducer.bind(t)})};e["default"]=o},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t){return a.indexOf(t)>-1}function u(t){return f["default"](t)&&"undefined"!=typeof t.type&&Object.keys(t).every(o)}function i(t){return t.error===!0}e.__esModule=!0,e.isFSA=u,e.isError=i;var c=n(11),f=r(c),a=["type","payload","error","meta"]},function(t,e){function n(t){return function(e,n,r){for(var o=-1,u=Object(e),i=r(e),c=i.length;c--;){var f=i[t?c:++o];if(n(u[f],f,u)===!1)break}return e}}var r=n();t.exports=r},function(t,e){function n(t){return!!t&&"object"==typeof t}function r(t,e){var n=null==t?void 0:t[e];return c(n)?n:void 0}function o(t){return"number"==typeof t&&t>-1&&t%1==0&&h>=t}function u(t){return i(t)&&y.call(t)==a}function i(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function c(t){return null==t?!1:u(t)?v.test(d.call(t)):n(t)&&l.test(t)}var f="[object Array]",a="[object Function]",l=/^\[object .+?Constructor\]$/,s=Object.prototype,d=Function.prototype.toString,p=s.hasOwnProperty,y=s.toString,v=RegExp("^"+d.call(p).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),b=r(Array,"isArray"),h=9007199254740991,_=b||function(t){return n(t)&&o(t.length)&&y.call(t)==f};t.exports=_},function(t,e,n){function r(t){return!!t&&"object"==typeof t}function o(t,e){return i(t,e,f)}function u(t){var e;if(!r(t)||d.call(t)!=a||c(t)||!s.call(t,"constructor")&&(e=t.constructor,"function"==typeof e&&!(e instanceof e)))return!1;var n;return o(t,function(t,e){n=e}),void 0===n||s.call(t,n)}var i=n(9),c=n(3),f=n(12),a="[object Object]",l=Object.prototype,s=l.hasOwnProperty,d=l.toString;t.exports=u},function(t,e,n){function r(t,e){return t="number"==typeof t||a.test(t)?+t:-1,e=null==e?d:e,t>-1&&t%1==0&&e>t}function o(t){return"number"==typeof t&&t>-1&&t%1==0&&d>=t}function u(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function i(t){if(null==t)return[];u(t)||(t=Object(t));var e=t.length;e=e&&o(e)&&(f(t)||c(t))&&e||0;for(var n=t.constructor,i=-1,a="function"==typeof n&&n.prototype===t,l=Array(e),d=e>0;++i<e;)l[i]=i+"";for(var p in t)d&&r(p,e)||"constructor"==p&&(a||!s.call(t,p))||l.push(p);return l}var c=n(3),f=n(10),a=/^\d+$/,l=Object.prototype,s=l.hasOwnProperty,d=9007199254740991;t.exports=i},function(t,e){"use strict";function n(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return function(t,n){return e.reduce(function(t,e){return e(t,n)},t)}}e.__esModule=!0,e["default"]=n,t.exports=e["default"]},function(t,e){"use strict";function n(t){return t}function r(t,e,r){var o="function"==typeof e?e:n;return function(){for(var e=arguments.length,n=Array(e),u=0;e>u;u++)n[u]=arguments[u];var i={type:t,payload:o.apply(void 0,n)};return 1===n.length&&n[0]instanceof Error&&(i.error=!0),"function"==typeof r&&(i.meta=r.apply(void 0,n)),i}}e.__esModule=!0,e["default"]=r,t.exports=e["default"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){var n=f["default"](t).map(function(e){return i["default"](e,t[e])});return"undefined"!=typeof e?function(t,r){return void 0===t&&(t=e),l["default"].apply(void 0,n)(t,r)}:l["default"].apply(void 0,n)}e.__esModule=!0,e["default"]=o;var u=n(4),i=r(u),c=n(16),f=r(c),a=n(13),l=r(a);t.exports=e["default"]},function(t,e){"use strict";function n(t){if("undefined"!=typeof Reflect&&"function"==typeof Reflect.ownKeys)return Reflect.ownKeys(t);var e=Object.getOwnPropertyNames(t);return"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(t))),e}e.__esModule=!0,e["default"]=n,t.exports=e["default"]}]);
//# sourceMappingURL=redux-redaction.js.map