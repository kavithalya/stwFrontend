(window["webpackJsonp_N_E"] = window["webpackJsonp_N_E"] || []).push([[1],{

/***/ "./node_modules/@apollo/client/react/ssr/RenderPromises.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/client/react/ssr/RenderPromises.js ***!
  \*****************************************************************/
/*! exports provided: RenderPromises */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPromises", function() { return RenderPromises; });
function makeDefaultQueryInfo() {
    return {
        seen: false,
        observable: null
    };
}
var RenderPromises = (function () {
    function RenderPromises() {
        this.queryPromises = new Map();
        this.queryInfoTrie = new Map();
    }
    RenderPromises.prototype.registerSSRObservable = function (observable, props) {
        this.lookupQueryInfo(props).observable = observable;
    };
    RenderPromises.prototype.getSSRObservable = function (props) {
        return this.lookupQueryInfo(props).observable;
    };
    RenderPromises.prototype.addQueryPromise = function (queryInstance, finish) {
        var info = this.lookupQueryInfo(queryInstance.getOptions());
        if (!info.seen) {
            this.queryPromises.set(queryInstance.getOptions(), new Promise(function (resolve) {
                resolve(queryInstance.fetchData());
            }));
            return null;
        }
        return finish();
    };
    RenderPromises.prototype.hasPromises = function () {
        return this.queryPromises.size > 0;
    };
    RenderPromises.prototype.consumeAndAwaitPromises = function () {
        var _this = this;
        var promises = [];
        this.queryPromises.forEach(function (promise, queryInstance) {
            _this.lookupQueryInfo(queryInstance).seen = true;
            promises.push(promise);
        });
        this.queryPromises.clear();
        return Promise.all(promises);
    };
    RenderPromises.prototype.lookupQueryInfo = function (props) {
        var queryInfoTrie = this.queryInfoTrie;
        var query = props.query, variables = props.variables;
        var varMap = queryInfoTrie.get(query) || new Map();
        if (!queryInfoTrie.has(query))
            queryInfoTrie.set(query, varMap);
        var variablesString = JSON.stringify(variables);
        var info = varMap.get(variablesString) || makeDefaultQueryInfo();
        if (!varMap.has(variablesString))
            varMap.set(variablesString, info);
        return info;
    };
    return RenderPromises;
}());

//# sourceMappingURL=RenderPromises.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/react/ssr/getDataFromTree.js":
/*!******************************************************************!*\
  !*** ./node_modules/@apollo/client/react/ssr/getDataFromTree.js ***!
  \******************************************************************/
/*! exports provided: getDataFromTree, getMarkupFromTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataFromTree", function() { return getDataFromTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMarkupFromTree", function() { return getMarkupFromTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/index.js */ "./node_modules/@apollo/client/react/context/index.js");
/* harmony import */ var _RenderPromises_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RenderPromises.js */ "./node_modules/@apollo/client/react/ssr/RenderPromises.js");




function getDataFromTree(tree, context) {
    if (context === void 0) { context = {}; }
    return getMarkupFromTree({
        tree: tree,
        context: context,
        renderFunction: __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.browser.js").renderToStaticMarkup
    });
}
function getMarkupFromTree(_a) {
    var tree = _a.tree, _b = _a.context, context = _b === void 0 ? {} : _b, _c = _a.renderFunction, renderFunction = _c === void 0 ? __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.browser.js").renderToStaticMarkup : _c;
    var renderPromises = new _RenderPromises_js__WEBPACK_IMPORTED_MODULE_3__["RenderPromises"]();
    function process() {
        var ApolloContext = Object(_context_index_js__WEBPACK_IMPORTED_MODULE_2__["getApolloContext"])();
        return new Promise(function (resolve) {
            var element = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ApolloContext.Provider, { value: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, context), { renderPromises: renderPromises }) }, tree);
            resolve(renderFunction(element));
        }).then(function (html) {
            return renderPromises.hasPromises()
                ? renderPromises.consumeAndAwaitPromises().then(process)
                : html;
        });
    }
    return Promise.resolve().then(process);
}
//# sourceMappingURL=getDataFromTree.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/react/ssr/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@apollo/client/react/ssr/index.js ***!
  \********************************************************/
/*! exports provided: getMarkupFromTree, getDataFromTree, renderToStringWithData, RenderPromises */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getDataFromTree_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromTree.js */ "./node_modules/@apollo/client/react/ssr/getDataFromTree.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMarkupFromTree", function() { return _getDataFromTree_js__WEBPACK_IMPORTED_MODULE_0__["getMarkupFromTree"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDataFromTree", function() { return _getDataFromTree_js__WEBPACK_IMPORTED_MODULE_0__["getDataFromTree"]; });

/* harmony import */ var _renderToStringWithData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderToStringWithData.js */ "./node_modules/@apollo/client/react/ssr/renderToStringWithData.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderToStringWithData", function() { return _renderToStringWithData_js__WEBPACK_IMPORTED_MODULE_1__["renderToStringWithData"]; });

/* harmony import */ var _RenderPromises_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderPromises.js */ "./node_modules/@apollo/client/react/ssr/RenderPromises.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderPromises", function() { return _RenderPromises_js__WEBPACK_IMPORTED_MODULE_2__["RenderPromises"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/react/ssr/renderToStringWithData.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@apollo/client/react/ssr/renderToStringWithData.js ***!
  \*************************************************************************/
/*! exports provided: renderToStringWithData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderToStringWithData", function() { return renderToStringWithData; });
/* harmony import */ var _getDataFromTree_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataFromTree.js */ "./node_modules/@apollo/client/react/ssr/getDataFromTree.js");

function renderToStringWithData(component) {
    return Object(_getDataFromTree_js__WEBPACK_IMPORTED_MODULE_0__["getMarkupFromTree"])({
        tree: component,
        renderFunction: __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.browser.js").renderToString
    });
}
//# sourceMappingURL=renderToStringWithData.js.map

/***/ }),

/***/ "./node_modules/@apollo/react-ssr/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@apollo/react-ssr/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! @apollo/client/react/ssr */ "./node_modules/@apollo/client/react/ssr/index.js");


/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom-server.browser.development.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom-server.browser.development.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.14.0
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var _assign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

// Do not require this module directly! Use normal `invariant` calls with
// template literal strings. The messages will be replaced with error codes
// during build.
function formatProdErrorMessage(code) {
  var url = 'https://reactjs.org/docs/error-decoder.html?invariant=' + code;

  for (var i = 1; i < arguments.length; i++) {
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }

  return "Minified React error #" + code + "; visit " + url + " for the full message or " + 'use the non-minified dev environment for full errors and additional ' + 'helpful warnings.';
}

var ReactVersion = '16.14.0';

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED; // Prevent newer renderers from RTE when used with older react package versions.
// Current owner and dispatcher used to share the same ref,
// but PR #14548 split them out to better support the react-debug-tools package.

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
  ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  };
}

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentBatchConfig')) {
  ReactSharedInternals.ReactCurrentBatchConfig = {
    suspense: null
  };
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

    if (!hasExistingStack) {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      }
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  }
}

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

var Uninitialized = -1;
var Pending = 0;
var Resolved = 1;
var Rejected = 2;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}
function initializeLazyComponentType(lazyComponent) {
  if (lazyComponent._status === Uninitialized) {
    lazyComponent._status = Pending;
    var ctor = lazyComponent._ctor;
    var thenable = ctor();
    lazyComponent._result = thenable;
    thenable.then(function (moduleObject) {
      if (lazyComponent._status === Pending) {
        var defaultExport = moduleObject.default;

        {
          if (defaultExport === undefined) {
            error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + "const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
          }
        }

        lazyComponent._status = Resolved;
        lazyComponent._result = defaultExport;
      }
    }, function (error) {
      if (lazyComponent._status === Pending) {
        lazyComponent._status = Rejected;
        lazyComponent._result = error;
      }
    });
  }
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type.render);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
}

var enableSuspenseServerRenderer = false;

var enableDeprecatedFlareAPI = false; // Experimental Host Component support.

var ReactDebugCurrentFrame;
var didWarnAboutInvalidateContextType;

{
  ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
  didWarnAboutInvalidateContextType = new Set();
}

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

function maskContext(type, context) {
  var contextTypes = type.contextTypes;

  if (!contextTypes) {
    return emptyObject;
  }

  var maskedContext = {};

  for (var contextName in contextTypes) {
    maskedContext[contextName] = context[contextName];
  }

  return maskedContext;
}

function checkContextTypes(typeSpecs, values, location) {
  {
    checkPropTypes(typeSpecs, values, location, 'Component', ReactDebugCurrentFrame.getCurrentStack);
  }
}

function validateContextBounds(context, threadID) {
  // If we don't have enough slots in this context to store this threadID,
  // fill it in without leaving any holes to ensure that the VM optimizes
  // this as non-holey index properties.
  // (Note: If `react` package is < 16.6, _threadCount is undefined.)
  for (var i = context._threadCount | 0; i <= threadID; i++) {
    // We assume that this is the same as the defaultValue which might not be
    // true if we're rendering inside a secondary renderer but they are
    // secondary because these use cases are very rare.
    context[i] = context._currentValue2;
    context._threadCount = i + 1;
  }
}
function processContext(type, context, threadID, isClass) {
  if (isClass) {
    var contextType = type.contextType;

    {
      if ('contextType' in type) {
        var isValid = // Allow null for conditional declaration
        contextType === null || contextType !== undefined && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === undefined; // Not a <Context.Consumer>

        if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
          didWarnAboutInvalidateContextType.add(type);
          var addendum = '';

          if (contextType === undefined) {
            addendum = ' However, it is set to undefined. ' + 'This can be caused by a typo or by mixing up named and default imports. ' + 'This can also happen due to a circular dependency, so ' + 'try moving the createContext() call to a separate file.';
          } else if (typeof contextType !== 'object') {
            addendum = ' However, it is set to a ' + typeof contextType + '.';
          } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
            addendum = ' Did you accidentally pass the Context.Provider instead?';
          } else if (contextType._context !== undefined) {
            // <Context.Consumer>
            addendum = ' Did you accidentally pass the Context.Consumer instead?';
          } else {
            addendum = ' However, it is set to an object with keys {' + Object.keys(contextType).join(', ') + '}.';
          }

          error('%s defines an invalid contextType. ' + 'contextType should point to the Context object returned by React.createContext().%s', getComponentName(type) || 'Component', addendum);
        }
      }
    }

    if (typeof contextType === 'object' && contextType !== null) {
      validateContextBounds(contextType, threadID);
      return contextType[threadID];
    }

    {
      var maskedContext = maskContext(type, context);

      {
        if (type.contextTypes) {
          checkContextTypes(type.contextTypes, maskedContext, 'context');
        }
      }

      return maskedContext;
    }
  } else {
    {
      var _maskedContext = maskContext(type, context);

      {
        if (type.contextTypes) {
          checkContextTypes(type.contextTypes, _maskedContext, 'context');
        }
      }

      return _maskedContext;
    }
  }
}

var nextAvailableThreadIDs = new Uint16Array(16);

for (var i = 0; i < 15; i++) {
  nextAvailableThreadIDs[i] = i + 1;
}

nextAvailableThreadIDs[15] = 0;

function growThreadCountAndReturnNextAvailable() {
  var oldArray = nextAvailableThreadIDs;
  var oldSize = oldArray.length;
  var newSize = oldSize * 2;

  if (!(newSize <= 0x10000)) {
    {
      throw Error( "Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic." );
    }
  }

  var newArray = new Uint16Array(newSize);
  newArray.set(oldArray);
  nextAvailableThreadIDs = newArray;
  nextAvailableThreadIDs[0] = oldSize + 1;

  for (var _i = oldSize; _i < newSize - 1; _i++) {
    nextAvailableThreadIDs[_i] = _i + 1;
  }

  nextAvailableThreadIDs[newSize - 1] = 0;
  return oldSize;
}

function allocThreadID() {
  var nextID = nextAvailableThreadIDs[0];

  if (nextID === 0) {
    return growThreadCountAndReturnNextAvailable();
  }

  nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
  return nextID;
}
function freeThreadID(id) {
  nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
  nextAvailableThreadIDs[0] = id;
}

// A reserved attribute.
// It is handled by React separately and shouldn't be written to the DOM.
var RESERVED = 0; // A simple string attribute.
// Attributes that aren't in the whitelist are presumed to have this type.

var STRING = 1; // A string attribute that accepts booleans in React. In HTML, these are called
// "enumerated" attributes with "true" and "false" as possible values.
// When true, it should be set to a "true" string.
// When false, it should be set to a "false" string.

var BOOLEANISH_STRING = 2; // A real boolean attribute.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.

var BOOLEAN = 3; // An attribute that can be used as a flag as well as with a value.
// When true, it should be present (set either to an empty string or its name).
// When false, it should be omitted.
// For any other value, should be present with that value.

var OVERLOADED_BOOLEAN = 4; // An attribute that must be numeric or parse as a numeric.
// When falsy, it should be removed.

var NUMERIC = 5; // An attribute that must be positive numeric or parse as a positive numeric.
// When falsy, it should be removed.

var POSITIVE_NUMERIC = 6;

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
/* eslint-enable max-len */

var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
    return true;
  }

  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
    return false;
  }

  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }

  illegalAttributeNameCache[attributeName] = true;

  {
    error('Invalid attribute name: `%s`', attributeName);
  }

  return false;
}
function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
  if (propertyInfo !== null) {
    return propertyInfo.type === RESERVED;
  }

  if (isCustomComponentTag) {
    return false;
  }

  if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
    return true;
  }

  return false;
}
function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
  if (propertyInfo !== null && propertyInfo.type === RESERVED) {
    return false;
  }

  switch (typeof value) {
    case 'function': // $FlowIssue symbol is perfectly valid here

    case 'symbol':
      // eslint-disable-line
      return true;

    case 'boolean':
      {
        if (isCustomComponentTag) {
          return false;
        }

        if (propertyInfo !== null) {
          return !propertyInfo.acceptsBooleans;
        } else {
          var prefix = name.toLowerCase().slice(0, 5);
          return prefix !== 'data-' && prefix !== 'aria-';
        }
      }

    default:
      return false;
  }
}
function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
  if (value === null || typeof value === 'undefined') {
    return true;
  }

  if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
    return true;
  }

  if (isCustomComponentTag) {
    return false;
  }

  if (propertyInfo !== null) {
    switch (propertyInfo.type) {
      case BOOLEAN:
        return !value;

      case OVERLOADED_BOOLEAN:
        return value === false;

      case NUMERIC:
        return isNaN(value);

      case POSITIVE_NUMERIC:
        return isNaN(value) || value < 1;
    }
  }

  return false;
}
function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL) {
  this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
} // When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.


var properties = {}; // These props are reserved by React. They shouldn't be written to the DOM.

var reservedProps = ['children', 'dangerouslySetInnerHTML', // TODO: This prevents the assignment of defaultValue to regular
// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'];

reservedProps.forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // A few React string attributes have a different name.
// This is a mapping from React prop names to the attribute names.

[['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
  var name = _ref[0],
      attributeName = _ref[1];
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, // attributeName
  null, // attributeNamespace
  false);
}); // These are "enumerated" HTML attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).

['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
}); // These are "enumerated" SVG attributes that accept "true" and "false".
// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.

['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML boolean attributes.

['allowFullScreen', 'async', // Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'disablePictureInPicture', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless', // Microdata
'itemScope'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
}); // These are the few React props that we set as DOM properties
// rather than attributes. These are all booleans.

['checked', // Note: `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`. We have special logic for handling this.
'multiple', 'muted', 'selected' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML attributes that are "overloaded booleans": they behave like
// booleans, but can also accept a string value.

['capture', 'download' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML attributes that must be positive numbers.

['cols', 'rows', 'size', 'span' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
  name, // attributeName
  null, // attributeNamespace
  false);
}); // These are HTML attributes that must be numbers.

['rowSpan', 'start'].forEach(function (name) {
  properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
  name.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
});
var CAMELIZE = /[\-\:]([a-z])/g;

var capitalize = function (token) {
  return token[1].toUpperCase();
}; // This is a list of all SVG attributes that need special casing, namespacing,
// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML whitelist.
// Some of these attributes can be hard to find. This list was created by
// scraping the MDN documentation.


['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, null, // attributeNamespace
  false);
}); // String SVG attributes with the xlink namespace.

['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/1999/xlink', false);
}); // String SVG attributes with the xml namespace.

['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
// you'll need to set attributeName to name.toLowerCase()
// instead in the assignment below.
].forEach(function (attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
  attributeName, 'http://www.w3.org/XML/1998/namespace', false);
}); // These attribute exists both in HTML and SVG.
// The attribute name is case-sensitive in SVG so we can't just use
// the React name like we do for attributes that exist only in HTML.

['tabIndex', 'crossOrigin'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  false);
}); // These attributes accept URLs. These must not allow javascript: URLS.
// These will also need to accept Trusted Types object in the future.

var xlinkHref = 'xlinkHref';
properties[xlinkHref] = new PropertyInfoRecord('xlinkHref', STRING, false, // mustUseProperty
'xlink:href', 'http://www.w3.org/1999/xlink', true);
['src', 'href', 'action', 'formAction'].forEach(function (attributeName) {
  properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, // mustUseProperty
  attributeName.toLowerCase(), // attributeName
  null, // attributeNamespace
  true);
});

var ReactDebugCurrentFrame$1 = null;

{
  ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
} // A javascript: URL can contain leading C0 control or \u0020 SPACE,
// and any newline or tab are filtered out as if they're not part of the URL.
// https://url.spec.whatwg.org/#url-parsing
// Tab or newline are defined as \r\n\t:
// https://infra.spec.whatwg.org/#ascii-tab-or-newline
// A C0 control is a code point in the range \u0000 NULL to \u001F
// INFORMATION SEPARATOR ONE, inclusive:
// https://infra.spec.whatwg.org/#c0-control-or-space

/* eslint-disable max-len */


var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
var didWarn = false;

function sanitizeURL(url) {
  {
    if (!didWarn && isJavaScriptProtocol.test(url)) {
      didWarn = true;

      error('A future version of React will block javascript: URLs as a security precaution. ' + 'Use event handlers instead if you can. If you need to generate unsafe HTML try ' + 'using dangerouslySetInnerHTML instead. React was passed %s.', JSON.stringify(url));
    }
  }
}

// code copied and modified from escape-html

/**
 * Module variables.
 * @private
 */
var matchHtmlRegExp = /["'&<>]/;
/**
 * Escapes special characters and HTML entities in a given html string.
 *
 * @param  {string} string HTML string to escape for later insertion
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;

      case 38:
        // &
        escape = '&amp;';
        break;

      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'

        break;

      case 60:
        // <
        escape = '&lt;';
        break;

      case 62:
        // >
        escape = '&gt;';
        break;

      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
} // end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */


function escapeTextForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }

  return escapeHtml(text);
}

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */

function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextForBrowser(value) + '"';
}

function createMarkupForRoot() {
  return ROOT_ATTRIBUTE_NAME + '=""';
}
/**
 * Creates markup for a property.
 *
 * @param {string} name
 * @param {*} value
 * @return {?string} Markup string, or null if the property was invalid.
 */

function createMarkupForProperty(name, value) {
  var propertyInfo = getPropertyInfo(name);

  if (name !== 'style' && shouldIgnoreAttribute(name, propertyInfo, false)) {
    return '';
  }

  if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
    return '';
  }

  if (propertyInfo !== null) {
    var attributeName = propertyInfo.attributeName;
    var type = propertyInfo.type;

    if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
      return attributeName + '=""';
    } else {
      if (propertyInfo.sanitizeURL) {
        value = '' + value;
        sanitizeURL(value);
      }

      return attributeName + '=' + quoteAttributeValueForBrowser(value);
    }
  } else if (isAttributeNameSafe(name)) {
    return name + '=' + quoteAttributeValueForBrowser(value);
  }

  return '';
}
/**
 * Creates markup for a custom property.
 *
 * @param {string} name
 * @param {*} value
 * @return {string} Markup string, or empty string if the property was invalid.
 */

function createMarkupForCustomAttribute(name, value) {
  if (!isAttributeNameSafe(name) || value == null) {
    return '';
  }

  return name + '=' + quoteAttributeValueForBrowser(value);
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

var currentlyRenderingComponent = null;
var firstWorkInProgressHook = null;
var workInProgressHook = null; // Whether the work-in-progress hook is a re-rendered hook

var isReRender = false; // Whether an update was scheduled during the currently executing render pass.

var didScheduleRenderPhaseUpdate = false; // Lazily created map of render-phase updates

var renderPhaseUpdates = null; // Counter to prevent infinite loops.

var numberOfReRenders = 0;
var RE_RENDER_LIMIT = 25;
var isInHookUserCodeInDev = false; // In DEV, this is the name of the currently executing primitive hook

var currentHookNameInDev;

function resolveCurrentlyRenderingComponent() {
  if (!(currentlyRenderingComponent !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }

  {
    if (isInHookUserCodeInDev) {
      error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' + 'You can only call Hooks at the top level of your React function. ' + 'For more information, see ' + 'https://fb.me/rules-of-hooks');
    }
  }

  return currentlyRenderingComponent;
}

function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    {
      error('%s received a final argument during this render, but not during ' + 'the previous render. Even though the final argument is optional, ' + 'its type cannot change between renders.', currentHookNameInDev);
    }

    return false;
  }

  {
    // Don't bother comparing lengths in prod because these arrays should be
    // passed inline.
    if (nextDeps.length !== prevDeps.length) {
      error('The final argument passed to %s changed size between renders. The ' + 'order and size of this array must remain constant.\n\n' + 'Previous: %s\n' + 'Incoming: %s', currentHookNameInDev, "[" + nextDeps.join(', ') + "]", "[" + prevDeps.join(', ') + "]");
    }
  }

  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue;
    }

    return false;
  }

  return true;
}

function createHook() {
  if (numberOfReRenders > 0) {
    {
      {
        throw Error( "Rendered more hooks than during the previous render" );
      }
    }
  }

  return {
    memoizedState: null,
    queue: null,
    next: null
  };
}

function createWorkInProgressHook() {
  if (workInProgressHook === null) {
    // This is the first hook in the list
    if (firstWorkInProgressHook === null) {
      isReRender = false;
      firstWorkInProgressHook = workInProgressHook = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = firstWorkInProgressHook;
    }
  } else {
    if (workInProgressHook.next === null) {
      isReRender = false; // Append to the end of the list

      workInProgressHook = workInProgressHook.next = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = workInProgressHook.next;
    }
  }

  return workInProgressHook;
}

function prepareToUseHooks(componentIdentity) {
  currentlyRenderingComponent = componentIdentity;

  {
    isInHookUserCodeInDev = false;
  } // The following should have already been reset
  // didScheduleRenderPhaseUpdate = false;
  // firstWorkInProgressHook = null;
  // numberOfReRenders = 0;
  // renderPhaseUpdates = null;
  // workInProgressHook = null;

}
function finishHooks(Component, props, children, refOrContext) {
  // This must be called after every function component to prevent hooks from
  // being used in classes.
  while (didScheduleRenderPhaseUpdate) {
    // Updates were scheduled during the render phase. They are stored in
    // the `renderPhaseUpdates` map. Call the component again, reusing the
    // work-in-progress hooks and applying the additional updates on top. Keep
    // restarting until no more updates are scheduled.
    didScheduleRenderPhaseUpdate = false;
    numberOfReRenders += 1; // Start over from the beginning of the list

    workInProgressHook = null;
    children = Component(props, refOrContext);
  }

  currentlyRenderingComponent = null;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  renderPhaseUpdates = null;
  workInProgressHook = null;

  {
    isInHookUserCodeInDev = false;
  } // These were reset above
  // currentlyRenderingComponent = null;
  // didScheduleRenderPhaseUpdate = false;
  // firstWorkInProgressHook = null;
  // numberOfReRenders = 0;
  // renderPhaseUpdates = null;
  // workInProgressHook = null;


  return children;
}

function readContext(context, observedBits) {
  var threadID = currentThreadID;
  validateContextBounds(context, threadID);

  {
    if (isInHookUserCodeInDev) {
      error('Context can only be read while React is rendering. ' + 'In classes, you can read it in the render method or getDerivedStateFromProps. ' + 'In function components, you can read it directly in the function body, but not ' + 'inside Hooks like useReducer() or useMemo().');
    }
  }

  return context[threadID];
}

function useContext(context, observedBits) {
  {
    currentHookNameInDev = 'useContext';
  }

  resolveCurrentlyRenderingComponent();
  var threadID = currentThreadID;
  validateContextBounds(context, threadID);
  return context[threadID];
}

function basicStateReducer(state, action) {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function useState(initialState) {
  {
    currentHookNameInDev = 'useState';
  }

  return useReducer(basicStateReducer, // useReducer has a special case to support lazy useState initializers
  initialState);
}
function useReducer(reducer, initialArg, init) {
  {
    if (reducer !== basicStateReducer) {
      currentHookNameInDev = 'useReducer';
    }
  }

  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();

  if (isReRender) {
    // This is a re-render. Apply the new render phase updates to the previous
    // current hook.
    var queue = workInProgressHook.queue;
    var dispatch = queue.dispatch;

    if (renderPhaseUpdates !== null) {
      // Render phase updates are stored in a map of queue -> linked list
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

      if (firstRenderPhaseUpdate !== undefined) {
        renderPhaseUpdates.delete(queue);
        var newState = workInProgressHook.memoizedState;
        var update = firstRenderPhaseUpdate;

        do {
          // Process this render phase update. We don't have to check the
          // priority because it will always be the same as the current
          // render's.
          var action = update.action;

          {
            isInHookUserCodeInDev = true;
          }

          newState = reducer(newState, action);

          {
            isInHookUserCodeInDev = false;
          }

          update = update.next;
        } while (update !== null);

        workInProgressHook.memoizedState = newState;
        return [newState, dispatch];
      }
    }

    return [workInProgressHook.memoizedState, dispatch];
  } else {
    {
      isInHookUserCodeInDev = true;
    }

    var initialState;

    if (reducer === basicStateReducer) {
      // Special case for `useState`.
      initialState = typeof initialArg === 'function' ? initialArg() : initialArg;
    } else {
      initialState = init !== undefined ? init(initialArg) : initialArg;
    }

    {
      isInHookUserCodeInDev = false;
    }

    workInProgressHook.memoizedState = initialState;

    var _queue = workInProgressHook.queue = {
      last: null,
      dispatch: null
    };

    var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);

    return [workInProgressHook.memoizedState, _dispatch];
  }
}

function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;

  if (workInProgressHook !== null) {
    var prevState = workInProgressHook.memoizedState;

    if (prevState !== null) {
      if (nextDeps !== null) {
        var prevDeps = prevState[1];

        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0];
        }
      }
    }
  }

  {
    isInHookUserCodeInDev = true;
  }

  var nextValue = nextCreate();

  {
    isInHookUserCodeInDev = false;
  }

  workInProgressHook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function useRef(initialValue) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  var previousRef = workInProgressHook.memoizedState;

  if (previousRef === null) {
    var ref = {
      current: initialValue
    };

    {
      Object.seal(ref);
    }

    workInProgressHook.memoizedState = ref;
    return ref;
  } else {
    return previousRef;
  }
}

function useLayoutEffect(create, inputs) {
  {
    currentHookNameInDev = 'useLayoutEffect';

    error('useLayoutEffect does nothing on the server, because its effect cannot ' + "be encoded into the server renderer's output format. This will lead " + 'to a mismatch between the initial, non-hydrated UI and the intended ' + 'UI. To avoid this, useLayoutEffect should only be used in ' + 'components that render exclusively on the client. ' + 'See https://fb.me/react-uselayouteffect-ssr for common fixes.');
  }
}

function dispatchAction(componentIdentity, queue, action) {
  if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
    {
      throw Error( "Too many re-renders. React limits the number of renders to prevent an infinite loop." );
    }
  }

  if (componentIdentity === currentlyRenderingComponent) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    var update = {
      action: action,
      next: null
    };

    if (renderPhaseUpdates === null) {
      renderPhaseUpdates = new Map();
    }

    var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

    if (firstRenderPhaseUpdate === undefined) {
      renderPhaseUpdates.set(queue, update);
    } else {
      // Append the update to the end of the list.
      var lastRenderPhaseUpdate = firstRenderPhaseUpdate;

      while (lastRenderPhaseUpdate.next !== null) {
        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      }

      lastRenderPhaseUpdate.next = update;
    }
  }
}

function useCallback(callback, deps) {
  // Callbacks are passed as they are in the server environment.
  return callback;
}

function useResponder(responder, props) {
  return {
    props: props,
    responder: responder
  };
}

function useDeferredValue(value, config) {
  resolveCurrentlyRenderingComponent();
  return value;
}

function useTransition(config) {
  resolveCurrentlyRenderingComponent();

  var startTransition = function (callback) {
    callback();
  };

  return [startTransition, false];
}

function noop() {}

var currentThreadID = 0;
function setCurrentThreadID(threadID) {
  currentThreadID = threadID;
}
var Dispatcher = {
  readContext: readContext,
  useContext: useContext,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,
  useLayoutEffect: useLayoutEffect,
  useCallback: useCallback,
  // useImperativeHandle is not run in the server environment
  useImperativeHandle: noop,
  // Effects are not run in the server environment.
  useEffect: noop,
  // Debugging effect
  useDebugValue: noop,
  useResponder: useResponder,
  useDeferredValue: useDeferredValue,
  useTransition: useTransition
};

var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var Namespaces = {
  html: HTML_NAMESPACE,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
}; // Assumes there is no parent namespace.

function getIntrinsicNamespace(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;

    case 'math':
      return MATH_NAMESPACE;

    default:
      return HTML_NAMESPACE;
  }
}
function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace(type);
  }

  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
    // We're leaving SVG.
    return HTML_NAMESPACE;
  } // By default, pass namespace below.


  return parentNamespace;
}

var ReactDebugCurrentFrame$2 = null;
var ReactControlledValuePropTypes = {
  checkPropTypes: null
};

{
  ReactDebugCurrentFrame$2 = ReactSharedInternals.ReactDebugCurrentFrame;
  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
  };
  var propTypes = {
    value: function (props, propName, componentName) {
      if (hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled || props[propName] == null || enableDeprecatedFlareAPI ) {
        return null;
      }

      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    checked: function (props, propName, componentName) {
      if (props.onChange || props.readOnly || props.disabled || props[propName] == null || enableDeprecatedFlareAPI ) {
        return null;
      }

      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    }
  };
  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */

  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props) {
    checkPropTypes(propTypes, props, 'prop', tagName, ReactDebugCurrentFrame$2.getStackAddendum);
  };
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true // NOTE: menuitem's close tag should be omitted, but that causes problems.

};

// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
  menuitem: true
}, omittedCloseTags);

var HTML = '__html';
var ReactDebugCurrentFrame$3 = null;

{
  ReactDebugCurrentFrame$3 = ReactSharedInternals.ReactDebugCurrentFrame;
}

function assertValidProps(tag, props) {
  if (!props) {
    return;
  } // Note the use of `==` which checks for null or undefined.


  if (voidElementTags[tag]) {
    if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
      {
        throw Error( tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`." + ( ReactDebugCurrentFrame$3.getStackAddendum() ) );
      }
    }
  }

  if (props.dangerouslySetInnerHTML != null) {
    if (!(props.children == null)) {
      {
        throw Error( "Can only set one of `children` or `props.dangerouslySetInnerHTML`." );
      }
    }

    if (!(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML)) {
      {
        throw Error( "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information." );
      }
    }
  }

  {
    if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
      error('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
    }
  }

  if (!(props.style == null || typeof props.style === 'object')) {
    {
      throw Error( "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX." + ( ReactDebugCurrentFrame$3.getStackAddendum() ) );
    }
  }
}

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */


var prefixes = ['Webkit', 'ms', 'Moz', 'O']; // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.

Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */

function dangerousStyleValue(name, value, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901
  var isEmpty = value == null || typeof value === 'boolean' || value === '';

  if (isEmpty) {
    return '';
  }

  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

var uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */

function hyphenateStyleName(name) {
  return name.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
}

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string';
  }

  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;

    default:
      return true;
  }
}

var warnValidStyle = function () {};

{
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
  var msPattern$1 = /^-ms-/;
  var hyphenPattern = /-(.)/g; // style values shouldn't contain a semicolon

  var badStyleValueWithSemicolonPattern = /;\s*$/;
  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;
  var warnedForInfinityValue = false;

  var camelize = function (string) {
    return string.replace(hyphenPattern, function (_, character) {
      return character.toUpperCase();
    });
  };

  var warnHyphenatedStyleName = function (name) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;

    error('Unsupported style property %s. Did you mean %s?', name, // As Andi Smith suggests
    // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
    // is converted to lowercase `ms`.
    camelize(name.replace(msPattern$1, 'ms-')));
  };

  var warnBadVendoredStyleName = function (name) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;

    error('Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1));
  };

  var warnStyleValueWithSemicolon = function (name, value) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;

    error("Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, ''));
  };

  var warnStyleValueIsNaN = function (name, value) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;

    error('`NaN` is an invalid value for the `%s` css style property.', name);
  };

  var warnStyleValueIsInfinity = function (name, value) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;

    error('`Infinity` is an invalid value for the `%s` css style property.', name);
  };

  warnValidStyle = function (name, value) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        warnStyleValueIsNaN(name, value);
      } else if (!isFinite(value)) {
        warnStyleValueIsInfinity(name, value);
      }
    }
  };
}

var warnValidStyle$1 = warnValidStyle;

var ariaProperties = {
  'aria-current': 0,
  // state
  'aria-details': 0,
  'aria-disabled': 0,
  // state
  'aria-hidden': 0,
  // state
  'aria-invalid': 0,
  // state
  'aria-keyshortcuts': 0,
  'aria-label': 0,
  'aria-roledescription': 0,
  // Widget Attributes
  'aria-autocomplete': 0,
  'aria-checked': 0,
  'aria-expanded': 0,
  'aria-haspopup': 0,
  'aria-level': 0,
  'aria-modal': 0,
  'aria-multiline': 0,
  'aria-multiselectable': 0,
  'aria-orientation': 0,
  'aria-placeholder': 0,
  'aria-pressed': 0,
  'aria-readonly': 0,
  'aria-required': 0,
  'aria-selected': 0,
  'aria-sort': 0,
  'aria-valuemax': 0,
  'aria-valuemin': 0,
  'aria-valuenow': 0,
  'aria-valuetext': 0,
  // Live Region Attributes
  'aria-atomic': 0,
  'aria-busy': 0,
  'aria-live': 0,
  'aria-relevant': 0,
  // Drag-and-Drop Attributes
  'aria-dropeffect': 0,
  'aria-grabbed': 0,
  // Relationship Attributes
  'aria-activedescendant': 0,
  'aria-colcount': 0,
  'aria-colindex': 0,
  'aria-colspan': 0,
  'aria-controls': 0,
  'aria-describedby': 0,
  'aria-errormessage': 0,
  'aria-flowto': 0,
  'aria-labelledby': 0,
  'aria-owns': 0,
  'aria-posinset': 0,
  'aria-rowcount': 0,
  'aria-rowindex': 0,
  'aria-rowspan': 0,
  'aria-setsize': 0
};

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function validateProperty(tagName, name) {
  {
    if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
      return true;
    }

    if (rARIACamel.test(name)) {
      var ariaName = 'aria-' + name.slice(4).toLowerCase();
      var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null; // If this is an aria-* attribute, but is not listed in the known DOM
      // DOM properties, then it is an invalid aria-* attribute.

      if (correctName == null) {
        error('Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.', name);

        warnedProperties[name] = true;
        return true;
      } // aria-* attributes should be lowercase; suggest the lowercase version.


      if (name !== correctName) {
        error('Invalid ARIA attribute `%s`. Did you mean `%s`?', name, correctName);

        warnedProperties[name] = true;
        return true;
      }
    }

    if (rARIA.test(name)) {
      var lowerCasedName = name.toLowerCase();
      var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null; // If this is an aria-* attribute, but is not listed in the known DOM
      // DOM properties, then it is an invalid aria-* attribute.

      if (standardName == null) {
        warnedProperties[name] = true;
        return false;
      } // aria-* attributes should be lowercase; suggest the lowercase version.


      if (name !== standardName) {
        error('Unknown ARIA attribute `%s`. Did you mean `%s`?', name, standardName);

        warnedProperties[name] = true;
        return true;
      }
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props) {
  {
    var invalidProps = [];

    for (var key in props) {
      var isValid = validateProperty(type, key);

      if (!isValid) {
        invalidProps.push(key);
      }
    }

    var unknownPropString = invalidProps.map(function (prop) {
      return '`' + prop + '`';
    }).join(', ');

    if (invalidProps.length === 1) {
      error('Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop', unknownPropString, type);
    } else if (invalidProps.length > 1) {
      error('Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop', unknownPropString, type);
    }
  }
}

function validateProperties(type, props) {
  if (isCustomComponent(type, props)) {
    return;
  }

  warnInvalidARIAProps(type, props);
}

var didWarnValueNull = false;
function validateProperties$1(type, props) {
  {
    if (type !== 'input' && type !== 'textarea' && type !== 'select') {
      return;
    }

    if (props != null && props.value === null && !didWarnValueNull) {
      didWarnValueNull = true;

      if (type === 'select' && props.multiple) {
        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.', type);
      } else {
        error('`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.', type);
      }
    }
  }
}

/**
 * Mapping from registration name to plugin module
 */

var registrationNameModules = {};
/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */

var possibleRegistrationNames =  {} ; // Trust the developer to only use possibleRegistrationNames in true

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  class: 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  default: 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  disablepictureinpicture: 'disablePictureInPicture',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  for: 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nomodule: 'noModule',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',
  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  in: 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  suppresscontenteditablewarning: 'suppressContentEditableWarning',
  suppresshydrationwarning: 'suppressHydrationWarning',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  to: 'to',
  transform: 'transform',
  typeof: 'typeof',
  u1: 'u1',
  u2: 'u2',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

var validateProperty$1 = function () {};

{
  var warnedProperties$1 = {};
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var EVENT_NAME_REGEX = /^on./;
  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

  validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
    if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
      return true;
    }

    var lowerCasedName = name.toLowerCase();

    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
      error('React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');

      warnedProperties$1[name] = true;
      return true;
    } // We can't rely on the event system being injected on the server.


    if (canUseEventSystem) {
      if (registrationNameModules.hasOwnProperty(name)) {
        return true;
      }

      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

      if (registrationName != null) {
        error('Invalid event handler property `%s`. Did you mean `%s`?', name, registrationName);

        warnedProperties$1[name] = true;
        return true;
      }

      if (EVENT_NAME_REGEX.test(name)) {
        error('Unknown event handler property `%s`. It will be ignored.', name);

        warnedProperties$1[name] = true;
        return true;
      }
    } else if (EVENT_NAME_REGEX.test(name)) {
      // If no event plugins have been injected, we are in a server environment.
      // So we can't tell if the event name is correct for sure, but we can filter
      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
      if (INVALID_EVENT_NAME_REGEX.test(name)) {
        error('Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.', name);
      }

      warnedProperties$1[name] = true;
      return true;
    } // Let the ARIA attribute hook validate ARIA attributes


    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
      return true;
    }

    if (lowerCasedName === 'innerhtml') {
      error('Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');

      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'aria') {
      error('The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');

      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
      error('Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.', typeof value);

      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'number' && isNaN(value)) {
      error('Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.', name);

      warnedProperties$1[name] = true;
      return true;
    }

    var propertyInfo = getPropertyInfo(name);
    var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED; // Known attributes should match the casing specified in the property config.

    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
      var standardName = possibleStandardNames[lowerCasedName];

      if (standardName !== name) {
        error('Invalid DOM property `%s`. Did you mean `%s`?', name, standardName);

        warnedProperties$1[name] = true;
        return true;
      }
    } else if (!isReserved && name !== lowerCasedName) {
      // Unknown attributes should have lowercase casing since that's how they
      // will be cased anyway with server rendering.
      error('React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.', name, lowerCasedName);

      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
      if (value) {
        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.', value, name, name, value, name);
      } else {
        error('Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
      }

      warnedProperties$1[name] = true;
      return true;
    } // Now that we've validated casing, do not validate
    // data types for reserved props


    if (isReserved) {
      return true;
    } // Warn when a known attribute is a bad type


    if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
      warnedProperties$1[name] = true;
      return false;
    } // Warn when passing the strings 'false' or 'true' into a boolean prop


    if ((value === 'false' || value === 'true') && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
      error('Received the string `%s` for the boolean attribute `%s`. ' + '%s ' + 'Did you mean %s={%s}?', value, name, value === 'false' ? 'The browser will interpret it as a truthy value.' : 'Although this works, it will not work as expected if you pass the string "false".', name, value);

      warnedProperties$1[name] = true;
      return true;
    }

    return true;
  };
}

var warnUnknownProperties = function (type, props, canUseEventSystem) {
  {
    var unknownProps = [];

    for (var key in props) {
      var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);

      if (!isValid) {
        unknownProps.push(key);
      }
    }

    var unknownPropString = unknownProps.map(function (prop) {
      return '`' + prop + '`';
    }).join(', ');

    if (unknownProps.length === 1) {
      error('Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior', unknownPropString, type);
    } else if (unknownProps.length > 1) {
      error('Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior', unknownPropString, type);
    }
  }
};

function validateProperties$2(type, props, canUseEventSystem) {
  if (isCustomComponent(type, props)) {
    return;
  }

  warnUnknownProperties(type, props, canUseEventSystem);
}

var toArray = React.Children.toArray; // This is only used in DEV.
// Each entry is `this.stack` from a currently executing renderer instance.
// (There may be more than one because ReactDOMServer is reentrant).
// Each stack is an array of frames which may contain nested stacks of elements.

var currentDebugStacks = [];
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var ReactDebugCurrentFrame$4;
var prevGetCurrentStackImpl = null;

var getCurrentServerStackImpl = function () {
  return '';
};

var describeStackFrame = function (element) {
  return '';
};

var validatePropertiesInDevelopment = function (type, props) {};

var pushCurrentDebugStack = function (stack) {};

var pushElementToDebugStack = function (element) {};

var popCurrentDebugStack = function () {};

var hasWarnedAboutUsingContextAsConsumer = false;

{
  ReactDebugCurrentFrame$4 = ReactSharedInternals.ReactDebugCurrentFrame;

  validatePropertiesInDevelopment = function (type, props) {
    validateProperties(type, props);
    validateProperties$1(type, props);
    validateProperties$2(type, props,
    /* canUseEventSystem */
    false);
  };

  describeStackFrame = function (element) {
    var source = element._source;
    var type = element.type;
    var name = getComponentName(type);
    var ownerName = null;
    return describeComponentFrame(name, source, ownerName);
  };

  pushCurrentDebugStack = function (stack) {
    currentDebugStacks.push(stack);

    if (currentDebugStacks.length === 1) {
      // We are entering a server renderer.
      // Remember the previous (e.g. client) global stack implementation.
      prevGetCurrentStackImpl = ReactDebugCurrentFrame$4.getCurrentStack;
      ReactDebugCurrentFrame$4.getCurrentStack = getCurrentServerStackImpl;
    }
  };

  pushElementToDebugStack = function (element) {
    // For the innermost executing ReactDOMServer call,
    var stack = currentDebugStacks[currentDebugStacks.length - 1]; // Take the innermost executing frame (e.g. <Foo>),

    var frame = stack[stack.length - 1]; // and record that it has one more element associated with it.

    frame.debugElementStack.push(element); // We only need this because we tail-optimize single-element
    // children and directly handle them in an inner loop instead of
    // creating separate frames for them.
  };

  popCurrentDebugStack = function () {
    currentDebugStacks.pop();

    if (currentDebugStacks.length === 0) {
      // We are exiting the server renderer.
      // Restore the previous (e.g. client) global stack implementation.
      ReactDebugCurrentFrame$4.getCurrentStack = prevGetCurrentStackImpl;
      prevGetCurrentStackImpl = null;
    }
  };

  getCurrentServerStackImpl = function () {
    if (currentDebugStacks.length === 0) {
      // Nothing is currently rendering.
      return '';
    } // ReactDOMServer is reentrant so there may be multiple calls at the same time.
    // Take the frames from the innermost call which is the last in the array.


    var frames = currentDebugStacks[currentDebugStacks.length - 1];
    var stack = ''; // Go through every frame in the stack from the innermost one.

    for (var i = frames.length - 1; i >= 0; i--) {
      var frame = frames[i]; // Every frame might have more than one debug element stack entry associated with it.
      // This is because single-child nesting doesn't create materialized frames.
      // Instead it would push them through `pushElementToDebugStack()`.

      var debugElementStack = frame.debugElementStack;

      for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
        stack += describeStackFrame(debugElementStack[ii]);
      }
    }

    return stack;
  };
}

var didWarnDefaultInputValue = false;
var didWarnDefaultChecked = false;
var didWarnDefaultSelectValue = false;
var didWarnDefaultTextareaValue = false;
var didWarnInvalidOptionChildren = false;
var didWarnAboutNoopUpdateForComponent = {};
var didWarnAboutBadClass = {};
var didWarnAboutModulePatternComponent = {};
var didWarnAboutDeprecatedWillMount = {};
var didWarnAboutUndefinedDerivedState = {};
var didWarnAboutUninitializedState = {};
var valuePropNames = ['value', 'defaultValue'];
var newlineEatingTags = {
  listing: true,
  pre: true,
  textarea: true
}; // We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name

var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset

var validatedTagCache = {};

function validateDangerousTag(tag) {
  if (!validatedTagCache.hasOwnProperty(tag)) {
    if (!VALID_TAG_REGEX.test(tag)) {
      {
        throw Error( "Invalid tag: " + tag );
      }
    }

    validatedTagCache[tag] = true;
  }
}

var styleNameCache = {};

var processStyleName = function (styleName) {
  if (styleNameCache.hasOwnProperty(styleName)) {
    return styleNameCache[styleName];
  }

  var result = hyphenateStyleName(styleName);
  styleNameCache[styleName] = result;
  return result;
};

function createMarkupForStyles(styles) {
  var serialized = '';
  var delimiter = '';

  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }

    var isCustomProperty = styleName.indexOf('--') === 0;
    var styleValue = styles[styleName];

    {
      if (!isCustomProperty) {
        warnValidStyle$1(styleName, styleValue);
      }
    }

    if (styleValue != null) {
      serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ':';
      serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
      delimiter = ';';
    }
  }

  return serialized || null;
}

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && getComponentName(_constructor) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;

    if (didWarnAboutNoopUpdateForComponent[warningKey]) {
      return;
    }

    error('%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);

    didWarnAboutNoopUpdateForComponent[warningKey] = true;
  }
}

function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

function getNonChildrenInnerMarkup(props) {
  var innerHTML = props.dangerouslySetInnerHTML;

  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      return innerHTML.__html;
    }
  } else {
    var content = props.children;

    if (typeof content === 'string' || typeof content === 'number') {
      return escapeTextForBrowser(content);
    }
  }

  return null;
}

function flattenTopLevelChildren(children) {
  if (!React.isValidElement(children)) {
    return toArray(children);
  }

  var element = children;

  if (element.type !== REACT_FRAGMENT_TYPE) {
    return [element];
  }

  var fragmentChildren = element.props.children;

  if (!React.isValidElement(fragmentChildren)) {
    return toArray(fragmentChildren);
  }

  var fragmentChildElement = fragmentChildren;
  return [fragmentChildElement];
}

function flattenOptionChildren(children) {
  if (children === undefined || children === null) {
    return children;
  }

  var content = ''; // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.

  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }

    content += child;

    {
      if (!didWarnInvalidOptionChildren && typeof child !== 'string' && typeof child !== 'number') {
        didWarnInvalidOptionChildren = true;

        error('Only strings and numbers are supported as <option> children.');
      }
    }
  });
  return content;
}

var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var STYLE = 'style';
var RESERVED_PROPS = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null,
  suppressHydrationWarning: null
};

function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
  var ret = '<' + tagVerbatim;

  for (var propKey in props) {
    if (!hasOwnProperty$2.call(props, propKey)) {
      continue;
    }

    var propValue = props[propKey];

    if (propValue == null) {
      continue;
    }

    if (propKey === STYLE) {
      propValue = createMarkupForStyles(propValue);
    }

    var markup = null;

    if (isCustomComponent(tagLowercase, props)) {
      if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
        markup = createMarkupForCustomAttribute(propKey, propValue);
      }
    } else {
      markup = createMarkupForProperty(propKey, propValue);
    }

    if (markup) {
      ret += ' ' + markup;
    }
  } // For static pages, no need to put React ID and checksum. Saves lots of
  // bytes.


  if (makeStaticMarkup) {
    return ret;
  }

  if (isRootElement) {
    ret += ' ' + createMarkupForRoot();
  }

  return ret;
}

function validateRenderResult(child, type) {
  if (child === undefined) {
    {
      {
        throw Error( (getComponentName(type) || 'Component') + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null." );
      }
    }
  }
}

function resolve(child, context, threadID) {
  while (React.isValidElement(child)) {
    // Safe because we just checked it's an element.
    var element = child;
    var Component = element.type;

    {
      pushElementToDebugStack(element);
    }

    if (typeof Component !== 'function') {
      break;
    }

    processChild(element, Component);
  } // Extra closure so queue and replace can be captured properly


  function processChild(element, Component) {
    var isClass = shouldConstruct(Component);
    var publicContext = processContext(Component, context, threadID, isClass);
    var queue = [];
    var replace = false;
    var updater = {
      isMounted: function (publicInstance) {
        return false;
      },
      enqueueForceUpdate: function (publicInstance) {
        if (queue === null) {
          warnNoop(publicInstance, 'forceUpdate');
          return null;
        }
      },
      enqueueReplaceState: function (publicInstance, completeState) {
        replace = true;
        queue = [completeState];
      },
      enqueueSetState: function (publicInstance, currentPartialState) {
        if (queue === null) {
          warnNoop(publicInstance, 'setState');
          return null;
        }

        queue.push(currentPartialState);
      }
    };
    var inst;

    if (isClass) {
      inst = new Component(element.props, publicContext, updater);

      if (typeof Component.getDerivedStateFromProps === 'function') {
        {
          if (inst.state === null || inst.state === undefined) {
            var componentName = getComponentName(Component) || 'Unknown';

            if (!didWarnAboutUninitializedState[componentName]) {
              error('`%s` uses `getDerivedStateFromProps` but its initial state is ' + '%s. This is not recommended. Instead, define the initial state by ' + 'assigning an object to `this.state` in the constructor of `%s`. ' + 'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.', componentName, inst.state === null ? 'null' : 'undefined', componentName);

              didWarnAboutUninitializedState[componentName] = true;
            }
          }
        }

        var partialState = Component.getDerivedStateFromProps.call(null, element.props, inst.state);

        {
          if (partialState === undefined) {
            var _componentName = getComponentName(Component) || 'Unknown';

            if (!didWarnAboutUndefinedDerivedState[_componentName]) {
              error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', _componentName);

              didWarnAboutUndefinedDerivedState[_componentName] = true;
            }
          }
        }

        if (partialState != null) {
          inst.state = _assign({}, inst.state, partialState);
        }
      }
    } else {
      {
        if (Component.prototype && typeof Component.prototype.render === 'function') {
          var _componentName2 = getComponentName(Component) || 'Unknown';

          if (!didWarnAboutBadClass[_componentName2]) {
            error("The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', _componentName2, _componentName2);

            didWarnAboutBadClass[_componentName2] = true;
          }
        }
      }

      var componentIdentity = {};
      prepareToUseHooks(componentIdentity);
      inst = Component(element.props, publicContext, updater);
      inst = finishHooks(Component, element.props, inst, publicContext);

      if (inst == null || inst.render == null) {
        child = inst;
        validateRenderResult(child, Component);
        return;
      }

      {
        var _componentName3 = getComponentName(Component) || 'Unknown';

        if (!didWarnAboutModulePatternComponent[_componentName3]) {
          error('The <%s /> component appears to be a function component that returns a class instance. ' + 'Change %s to a class that extends React.Component instead. ' + "If you can't use a class try assigning the prototype on the function as a workaround. " + "`%s.prototype = React.Component.prototype`. Don't use an arrow function since it " + 'cannot be called with `new` by React.', _componentName3, _componentName3, _componentName3);

          didWarnAboutModulePatternComponent[_componentName3] = true;
        }
      }
    }

    inst.props = element.props;
    inst.context = publicContext;
    inst.updater = updater;
    var initialState = inst.state;

    if (initialState === undefined) {
      inst.state = initialState = null;
    }

    if (typeof inst.UNSAFE_componentWillMount === 'function' || typeof inst.componentWillMount === 'function') {
      if (typeof inst.componentWillMount === 'function') {
        {
          if ( inst.componentWillMount.__suppressDeprecationWarning !== true) {
            var _componentName4 = getComponentName(Component) || 'Unknown';

            if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
              warn( // keep this warning in sync with ReactStrictModeWarning.js
              'componentWillMount has been renamed, and is not recommended for use. ' + 'See https://fb.me/react-unsafe-component-lifecycles for details.\n\n' + '* Move code from componentWillMount to componentDidMount (preferred in most cases) ' + 'or the constructor.\n' + '\nPlease update the following components: %s', _componentName4);

              didWarnAboutDeprecatedWillMount[_componentName4] = true;
            }
          }
        } // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for any component with the new gDSFP.


        if (typeof Component.getDerivedStateFromProps !== 'function') {
          inst.componentWillMount();
        }
      }

      if (typeof inst.UNSAFE_componentWillMount === 'function' && typeof Component.getDerivedStateFromProps !== 'function') {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for any component with the new gDSFP.
        inst.UNSAFE_componentWillMount();
      }

      if (queue.length) {
        var oldQueue = queue;
        var oldReplace = replace;
        queue = null;
        replace = false;

        if (oldReplace && oldQueue.length === 1) {
          inst.state = oldQueue[0];
        } else {
          var nextState = oldReplace ? oldQueue[0] : inst.state;
          var dontMutate = true;

          for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
            var partial = oldQueue[i];

            var _partialState = typeof partial === 'function' ? partial.call(inst, nextState, element.props, publicContext) : partial;

            if (_partialState != null) {
              if (dontMutate) {
                dontMutate = false;
                nextState = _assign({}, nextState, _partialState);
              } else {
                _assign(nextState, _partialState);
              }
            }
          }

          inst.state = nextState;
        }
      } else {
        queue = null;
      }
    }

    child = inst.render();

    {
      if (child === undefined && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        child = null;
      }
    }

    validateRenderResult(child, Component);
    var childContext;

    {
      if (typeof inst.getChildContext === 'function') {
        var _childContextTypes = Component.childContextTypes;

        if (typeof _childContextTypes === 'object') {
          childContext = inst.getChildContext();

          for (var contextKey in childContext) {
            if (!(contextKey in _childContextTypes)) {
              {
                throw Error( (getComponentName(Component) || 'Unknown') + ".getChildContext(): key \"" + contextKey + "\" is not defined in childContextTypes." );
              }
            }
          }
        } else {
          {
            error('%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(Component) || 'Unknown');
          }
        }
      }

      if (childContext) {
        context = _assign({}, context, childContext);
      }
    }
  }

  return {
    child: child,
    context: context
  };
}

var ReactDOMServerRenderer =
/*#__PURE__*/
function () {
  // TODO: type this more strictly:
  // DEV-only
  function ReactDOMServerRenderer(children, makeStaticMarkup) {
    var flatChildren = flattenTopLevelChildren(children);
    var topFrame = {
      type: null,
      // Assume all trees start in the HTML namespace (not totally true, but
      // this is what we did historically)
      domNamespace: Namespaces.html,
      children: flatChildren,
      childIndex: 0,
      context: emptyObject,
      footer: ''
    };

    {
      topFrame.debugElementStack = [];
    }

    this.threadID = allocThreadID();
    this.stack = [topFrame];
    this.exhausted = false;
    this.currentSelectValue = null;
    this.previousWasTextNode = false;
    this.makeStaticMarkup = makeStaticMarkup;
    this.suspenseDepth = 0; // Context (new API)

    this.contextIndex = -1;
    this.contextStack = [];
    this.contextValueStack = [];

    {
      this.contextProviderStack = [];
    }
  }

  var _proto = ReactDOMServerRenderer.prototype;

  _proto.destroy = function destroy() {
    if (!this.exhausted) {
      this.exhausted = true;
      this.clearProviders();
      freeThreadID(this.threadID);
    }
  }
  /**
   * Note: We use just two stacks regardless of how many context providers you have.
   * Providers are always popped in the reverse order to how they were pushed
   * so we always know on the way down which provider you'll encounter next on the way up.
   * On the way down, we push the current provider, and its context value *before*
   * we mutated it, onto the stacks. Therefore, on the way up, we always know which
   * provider needs to be "restored" to which value.
   * https://github.com/facebook/react/pull/12985#issuecomment-396301248
   */
  ;

  _proto.pushProvider = function pushProvider(provider) {
    var index = ++this.contextIndex;
    var context = provider.type._context;
    var threadID = this.threadID;
    validateContextBounds(context, threadID);
    var previousValue = context[threadID]; // Remember which value to restore this context to on our way up.

    this.contextStack[index] = context;
    this.contextValueStack[index] = previousValue;

    {
      // Only used for push/pop mismatch warnings.
      this.contextProviderStack[index] = provider;
    } // Mutate the current value.


    context[threadID] = provider.props.value;
  };

  _proto.popProvider = function popProvider(provider) {
    var index = this.contextIndex;

    {
      if (index < 0 || provider !== this.contextProviderStack[index]) {
        error('Unexpected pop.');
      }
    }

    var context = this.contextStack[index];
    var previousValue = this.contextValueStack[index]; // "Hide" these null assignments from Flow by using `any`
    // because conceptually they are deletions--as long as we
    // promise to never access values beyond `this.contextIndex`.

    this.contextStack[index] = null;
    this.contextValueStack[index] = null;

    {
      this.contextProviderStack[index] = null;
    }

    this.contextIndex--; // Restore to the previous value we stored as we were walking down.
    // We've already verified that this context has been expanded to accommodate
    // this thread id, so we don't need to do it again.

    context[this.threadID] = previousValue;
  };

  _proto.clearProviders = function clearProviders() {
    // Restore any remaining providers on the stack to previous values
    for (var index = this.contextIndex; index >= 0; index--) {
      var context = this.contextStack[index];
      var previousValue = this.contextValueStack[index];
      context[this.threadID] = previousValue;
    }
  };

  _proto.read = function read(bytes) {
    if (this.exhausted) {
      return null;
    }

    var prevThreadID = currentThreadID;
    setCurrentThreadID(this.threadID);
    var prevDispatcher = ReactCurrentDispatcher.current;
    ReactCurrentDispatcher.current = Dispatcher;

    try {
      // Markup generated within <Suspense> ends up buffered until we know
      // nothing in that boundary suspended
      var out = [''];
      var suspended = false;

      while (out[0].length < bytes) {
        if (this.stack.length === 0) {
          this.exhausted = true;
          freeThreadID(this.threadID);
          break;
        }

        var frame = this.stack[this.stack.length - 1];

        if (suspended || frame.childIndex >= frame.children.length) {
          var footer = frame.footer;

          if (footer !== '') {
            this.previousWasTextNode = false;
          }

          this.stack.pop();

          if (frame.type === 'select') {
            this.currentSelectValue = null;
          } else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
            var provider = frame.type;
            this.popProvider(provider);
          } else if (frame.type === REACT_SUSPENSE_TYPE) {
            this.suspenseDepth--;
            var buffered = out.pop();

            if (suspended) {
              suspended = false; // If rendering was suspended at this boundary, render the fallbackFrame

              var fallbackFrame = frame.fallbackFrame;

              if (!fallbackFrame) {
                {
                  throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : undefined);
                }
              }

              this.stack.push(fallbackFrame);
              out[this.suspenseDepth] += '<!--$!-->'; // Skip flushing output since we're switching to the fallback

              continue;
            } else {
              out[this.suspenseDepth] += buffered;
            }
          } // Flush output


          out[this.suspenseDepth] += footer;
          continue;
        }

        var child = frame.children[frame.childIndex++];
        var outBuffer = '';

        if (true) {
          pushCurrentDebugStack(this.stack); // We're starting work on this frame, so reset its inner stack.

          frame.debugElementStack.length = 0;
        }

        try {
          outBuffer += this.render(child, frame.context, frame.domNamespace);
        } catch (err) {
          if (err != null && typeof err.then === 'function') {
            if (enableSuspenseServerRenderer) {
              if (!(this.suspenseDepth > 0)) {
                {
                  throw Error(true ? "A React component suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." : undefined);
                }
              }

              suspended = true;
            } else {
              if (true) {
                {
                  throw Error(true ? "ReactDOMServer does not yet support Suspense." : undefined);
                }
              }
            }
          } else {
            throw err;
          }
        } finally {
          if (true) {
            popCurrentDebugStack();
          }
        }

        if (out.length <= this.suspenseDepth) {
          out.push('');
        }

        out[this.suspenseDepth] += outBuffer;
      }

      return out[0];
    } finally {
      ReactCurrentDispatcher.current = prevDispatcher;
      setCurrentThreadID(prevThreadID);
    }
  };

  _proto.render = function render(child, context, parentNamespace) {
    if (typeof child === 'string' || typeof child === 'number') {
      var text = '' + child;

      if (text === '') {
        return '';
      }

      if (this.makeStaticMarkup) {
        return escapeTextForBrowser(text);
      }

      if (this.previousWasTextNode) {
        return '<!-- -->' + escapeTextForBrowser(text);
      }

      this.previousWasTextNode = true;
      return escapeTextForBrowser(text);
    } else {
      var nextChild;

      var _resolve = resolve(child, context, this.threadID);

      nextChild = _resolve.child;
      context = _resolve.context;

      if (nextChild === null || nextChild === false) {
        return '';
      } else if (!React.isValidElement(nextChild)) {
        if (nextChild != null && nextChild.$$typeof != null) {
          // Catch unexpected special types early.
          var $$typeof = nextChild.$$typeof;

          if (!($$typeof !== REACT_PORTAL_TYPE)) {
            {
              throw Error( "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render." );
            }
          } // Catch-all to prevent an infinite loop if React.Children.toArray() supports some new type.


          {
            {
              throw Error( "Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue." );
            }
          }
        }

        var nextChildren = toArray(nextChild);
        var frame = {
          type: null,
          domNamespace: parentNamespace,
          children: nextChildren,
          childIndex: 0,
          context: context,
          footer: ''
        };

        {
          frame.debugElementStack = [];
        }

        this.stack.push(frame);
        return '';
      } // Safe because we just checked it's an element.


      var nextElement = nextChild;
      var elementType = nextElement.type;

      if (typeof elementType === 'string') {
        return this.renderDOM(nextElement, context, parentNamespace);
      }

      switch (elementType) {
        case REACT_STRICT_MODE_TYPE:
        case REACT_CONCURRENT_MODE_TYPE:
        case REACT_PROFILER_TYPE:
        case REACT_SUSPENSE_LIST_TYPE:
        case REACT_FRAGMENT_TYPE:
          {
            var _nextChildren = toArray(nextChild.props.children);

            var _frame = {
              type: null,
              domNamespace: parentNamespace,
              children: _nextChildren,
              childIndex: 0,
              context: context,
              footer: ''
            };

            {
              _frame.debugElementStack = [];
            }

            this.stack.push(_frame);
            return '';
          }

        case REACT_SUSPENSE_TYPE:
          {
            {
              {
                {
                  throw Error( "ReactDOMServer does not yet support Suspense." );
                }
              }
            }
          }
      }

      if (typeof elementType === 'object' && elementType !== null) {
        switch (elementType.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            {
              var element = nextChild;

              var _nextChildren4;

              var componentIdentity = {};
              prepareToUseHooks(componentIdentity);
              _nextChildren4 = elementType.render(element.props, element.ref);
              _nextChildren4 = finishHooks(elementType.render, element.props, _nextChildren4, element.ref);
              _nextChildren4 = toArray(_nextChildren4);
              var _frame4 = {
                type: null,
                domNamespace: parentNamespace,
                children: _nextChildren4,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame4.debugElementStack = [];
              }

              this.stack.push(_frame4);
              return '';
            }

          case REACT_MEMO_TYPE:
            {
              var _element = nextChild;
              var _nextChildren5 = [React.createElement(elementType.type, _assign({
                ref: _element.ref
              }, _element.props))];
              var _frame5 = {
                type: null,
                domNamespace: parentNamespace,
                children: _nextChildren5,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame5.debugElementStack = [];
              }

              this.stack.push(_frame5);
              return '';
            }

          case REACT_PROVIDER_TYPE:
            {
              var provider = nextChild;
              var nextProps = provider.props;

              var _nextChildren6 = toArray(nextProps.children);

              var _frame6 = {
                type: provider,
                domNamespace: parentNamespace,
                children: _nextChildren6,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame6.debugElementStack = [];
              }

              this.pushProvider(provider);
              this.stack.push(_frame6);
              return '';
            }

          case REACT_CONTEXT_TYPE:
            {
              var reactContext = nextChild.type; // The logic below for Context differs depending on PROD or DEV mode. In
              // DEV mode, we create a separate object for Context.Consumer that acts
              // like a proxy to Context. This proxy object adds unnecessary code in PROD
              // so we use the old behaviour (Context.Consumer references Context) to
              // reduce size and overhead. The separate object references context via
              // a property called "_context", which also gives us the ability to check
              // in DEV mode if this property exists or not and warn if it does not.

              {
                if (reactContext._context === undefined) {
                  // This may be because it's a Context (rather than a Consumer).
                  // Or it may be because it's older React where they're the same thing.
                  // We only want to warn if we're sure it's a new React.
                  if (reactContext !== reactContext.Consumer) {
                    if (!hasWarnedAboutUsingContextAsConsumer) {
                      hasWarnedAboutUsingContextAsConsumer = true;

                      error('Rendering <Context> directly is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
                    }
                  }
                } else {
                  reactContext = reactContext._context;
                }
              }

              var _nextProps = nextChild.props;
              var threadID = this.threadID;
              validateContextBounds(reactContext, threadID);
              var nextValue = reactContext[threadID];

              var _nextChildren7 = toArray(_nextProps.children(nextValue));

              var _frame7 = {
                type: nextChild,
                domNamespace: parentNamespace,
                children: _nextChildren7,
                childIndex: 0,
                context: context,
                footer: ''
              };

              {
                _frame7.debugElementStack = [];
              }

              this.stack.push(_frame7);
              return '';
            }
          // eslint-disable-next-line-no-fallthrough

          case REACT_FUNDAMENTAL_TYPE:
            {

              {
                {
                  throw Error( "ReactDOMServer does not yet support the fundamental API." );
                }
              }
            }
          // eslint-disable-next-line-no-fallthrough

          case REACT_LAZY_TYPE:
            {
              var _element2 = nextChild;
              var lazyComponent = nextChild.type; // Attempt to initialize lazy component regardless of whether the
              // suspense server-side renderer is enabled so synchronously
              // resolved constructors are supported.

              initializeLazyComponentType(lazyComponent);

              switch (lazyComponent._status) {
                case Resolved:
                  {
                    var _nextChildren9 = [React.createElement(lazyComponent._result, _assign({
                      ref: _element2.ref
                    }, _element2.props))];
                    var _frame9 = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren9,
                      childIndex: 0,
                      context: context,
                      footer: ''
                    };

                    {
                      _frame9.debugElementStack = [];
                    }

                    this.stack.push(_frame9);
                    return '';
                  }

                case Rejected:
                  throw lazyComponent._result;

                case Pending:
                default:
                  {
                    {
                      throw Error( "ReactDOMServer does not yet support lazy-loaded components." );
                    }
                  }

              }
            }
          // eslint-disable-next-line-no-fallthrough

          case REACT_SCOPE_TYPE:
            {

              {
                {
                  throw Error( "ReactDOMServer does not yet support scope components." );
                }
              }
            }
        }
      }

      var info = '';

      {
        var owner = nextElement._owner;

        if (elementType === undefined || typeof elementType === 'object' && elementType !== null && Object.keys(elementType).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
        }

        var ownerName = owner ? getComponentName(owner) : null;

        if (ownerName) {
          info += '\n\nCheck the render method of `' + ownerName + '`.';
        }
      }

      {
        {
          throw Error( "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info );
        }
      }
    }
  };

  _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
    var tag = element.type.toLowerCase();
    var namespace = parentNamespace;

    if (parentNamespace === Namespaces.html) {
      namespace = getIntrinsicNamespace(tag);
    }

    {
      if (namespace === Namespaces.html) {
        // Should this check be gated by parent namespace? Not sure we want to
        // allow <SVG> or <mATH>.
        if (tag !== element.type) {
          error('<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', element.type);
        }
      }
    }

    validateDangerousTag(tag);
    var props = element.props;

    if (tag === 'input') {
      {
        ReactControlledValuePropTypes.checkPropTypes('input', props);

        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
          error('%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);

          didWarnDefaultChecked = true;
        }

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
          error('%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);

          didWarnDefaultInputValue = true;
        }
      }

      props = _assign({
        type: undefined
      }, props, {
        defaultChecked: undefined,
        defaultValue: undefined,
        value: props.value != null ? props.value : props.defaultValue,
        checked: props.checked != null ? props.checked : props.defaultChecked
      });
    } else if (tag === 'textarea') {
      {
        ReactControlledValuePropTypes.checkPropTypes('textarea', props);

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
          error('Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

          didWarnDefaultTextareaValue = true;
        }
      }

      var initialValue = props.value;

      if (initialValue == null) {
        var defaultValue = props.defaultValue; // TODO (yungsters): Remove support for children content in <textarea>.

        var textareaChildren = props.children;

        if (textareaChildren != null) {
          {
            error('Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
          }

          if (!(defaultValue == null)) {
            {
              throw Error( "If you supply `defaultValue` on a <textarea>, do not pass children." );
            }
          }

          if (Array.isArray(textareaChildren)) {
            if (!(textareaChildren.length <= 1)) {
              {
                throw Error( "<textarea> can only have at most one child." );
              }
            }

            textareaChildren = textareaChildren[0];
          }

          defaultValue = '' + textareaChildren;
        }

        if (defaultValue == null) {
          defaultValue = '';
        }

        initialValue = defaultValue;
      }

      props = _assign({}, props, {
        value: undefined,
        children: '' + initialValue
      });
    } else if (tag === 'select') {
      {
        ReactControlledValuePropTypes.checkPropTypes('select', props);

        for (var i = 0; i < valuePropNames.length; i++) {
          var propName = valuePropNames[i];

          if (props[propName] == null) {
            continue;
          }

          var isArray = Array.isArray(props[propName]);

          if (props.multiple && !isArray) {
            error('The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.', propName);
          } else if (!props.multiple && isArray) {
            error('The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.', propName);
          }
        }

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
          error('Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');

          didWarnDefaultSelectValue = true;
        }
      }

      this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
      props = _assign({}, props, {
        value: undefined
      });
    } else if (tag === 'option') {
      var selected = null;
      var selectValue = this.currentSelectValue;
      var optionChildren = flattenOptionChildren(props.children);

      if (selectValue != null) {
        var value;

        if (props.value != null) {
          value = props.value + '';
        } else {
          value = optionChildren;
        }

        selected = false;

        if (Array.isArray(selectValue)) {
          // multiple
          for (var j = 0; j < selectValue.length; j++) {
            if ('' + selectValue[j] === value) {
              selected = true;
              break;
            }
          }
        } else {
          selected = '' + selectValue === value;
        }

        props = _assign({
          selected: undefined,
          children: undefined
        }, props, {
          selected: selected,
          children: optionChildren
        });
      }
    }

    {
      validatePropertiesInDevelopment(tag, props);
    }

    assertValidProps(tag, props);
    var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
    var footer = '';

    if (omittedCloseTags.hasOwnProperty(tag)) {
      out += '/>';
    } else {
      out += '>';
      footer = '</' + element.type + '>';
    }

    var children;
    var innerMarkup = getNonChildrenInnerMarkup(props);

    if (innerMarkup != null) {
      children = [];

      if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === '\n') {
        // text/html ignores the first character in these tags if it's a newline
        // Prefer to break application/xml over text/html (for now) by adding
        // a newline specifically to get eaten by the parser. (Alternately for
        // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
        // \r is normalized out by HTMLTextAreaElement#value.)
        // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
        // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
        // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
        // See: Parsing of "textarea" "listing" and "pre" elements
        //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
        out += '\n';
      }

      out += innerMarkup;
    } else {
      children = toArray(props.children);
    }

    var frame = {
      domNamespace: getChildNamespace(parentNamespace, element.type),
      type: tag,
      children: children,
      childIndex: 0,
      context: context,
      footer: footer
    };

    {
      frame.debugElementStack = [];
    }

    this.stack.push(frame);
    this.previousWasTextNode = false;
    return out;
  };

  return ReactDOMServerRenderer;
}();

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostring
 */

function renderToString(element) {
  var renderer = new ReactDOMServerRenderer(element, false);

  try {
    var markup = renderer.read(Infinity);
    return markup;
  } finally {
    renderer.destroy();
  }
}
/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
 */

function renderToStaticMarkup(element) {
  var renderer = new ReactDOMServerRenderer(element, true);

  try {
    var markup = renderer.read(Infinity);
    return markup;
  } finally {
    renderer.destroy();
  }
}

function renderToNodeStream() {
  {
    {
      throw Error( "ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead." );
    }
  }
}

function renderToStaticNodeStream() {
  {
    {
      throw Error( "ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead." );
    }
  }
} // Note: when changing this, also consider https://github.com/facebook/react/issues/11526


var ReactDOMServer = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
  renderToNodeStream: renderToNodeStream,
  renderToStaticNodeStream: renderToStaticNodeStream,
  version: ReactVersion
};

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest


var server_browser = ReactDOMServer.default || ReactDOMServer;

module.exports = server_browser;
  })();
}


/***/ }),

/***/ "./node_modules/react-dom/server.browser.js":
/*!**************************************************!*\
  !*** ./node_modules/react-dom/server.browser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-dom-server.browser.development.js */ "./node_modules/react-dom/cjs/react-dom-server.browser.development.js");
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BhcG9sbG8vY2xpZW50L3JlYWN0L3Nzci9SZW5kZXJQcm9taXNlcy5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BhcG9sbG8vY2xpZW50L3JlYWN0L3Nzci9nZXREYXRhRnJvbVRyZWUuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AYXBvbGxvL2NsaWVudC9yZWFjdC9zc3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9AYXBvbGxvL2NsaWVudC9yZWFjdC9zc3IvcmVuZGVyVG9TdHJpbmdXaXRoRGF0YS5qcyIsIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL0BhcG9sbG8vcmVhY3Qtc3NyL2luZGV4LmpzIiwid2VicGFjazovL19OX0UvLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL2Nqcy9yZWFjdC1kb20tc2VydmVyLmJyb3dzZXIuZGV2ZWxvcG1lbnQuanMiLCJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vc2VydmVyLmJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDeUI7QUFDMUIsMEM7Ozs7Ozs7Ozs7OztBQ3ZEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlDO0FBQ1A7QUFDNkI7QUFDRjtBQUM5QztBQUNQLDZCQUE2QixjQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBTyxDQUFDLG9FQUFrQjtBQUNsRCxLQUFLO0FBQ0w7QUFDTztBQUNQLHFFQUFxRSxnRUFBZ0UsbUJBQU8sQ0FBQyxvRUFBa0I7QUFDL0osNkJBQTZCLGlFQUFjO0FBQzNDO0FBQ0EsNEJBQTRCLDBFQUFnQjtBQUM1QztBQUNBLDBCQUEwQiw0Q0FBSyx3Q0FBd0MsUUFBUSxzREFBUSxDQUFDLHNEQUFRLEdBQUcsYUFBYSxpQ0FBaUMsR0FBRztBQUNwSjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMEU7QUFDTDtBQUNoQjtBQUNyRCxpQzs7Ozs7Ozs7Ozs7O0FDSEE7QUFBQTtBQUFBO0FBQXlEO0FBQ2xEO0FBQ1AsV0FBVyw2RUFBaUI7QUFDNUI7QUFDQSx3QkFBd0IsbUJBQU8sQ0FBQyxvRUFBa0I7QUFDbEQsS0FBSztBQUNMO0FBQ0Esa0Q7Ozs7Ozs7Ozs7O0FDUEEsaUJBQWlCLG1CQUFPLENBQUMsa0ZBQTBCOzs7Ozs7Ozs7Ozs7O0FDQW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7Ozs7QUFJYixJQUFJLElBQXFDO0FBQ3pDO0FBQ0E7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLDRDQUFPO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxnRkFBZTtBQUNyQyxxQkFBcUIsbUJBQU8sQ0FBQyw4RUFBMkI7O0FBRXhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBOztBQUVBLDZDQUE2QztBQUM3Qzs7QUFFQTs7QUFFQSxvRkFBb0Y7QUFDcEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBGQUEwRixhQUFhO0FBQ3ZHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhGQUE4RixlQUFlO0FBQzdHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUssRUFBRTs7QUFFUCxpREFBaUQ7QUFDakQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGVBQWU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0lBQStJOztBQUUvSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYLG9FQUFvRSw0Q0FBNEM7QUFDaEg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWUsUUFBUTtBQUN2QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7O0FBRUEsZ0JBQWdCO0FBQ2hCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUU7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUU7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBRTs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUU7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUU7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLEVBQUUsOEJBQThCOztBQUV4RDs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFlBQVksT0FBTztBQUNuQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixZQUFZLE9BQU87QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLEVBQUU7QUFDYixZQUFZLFFBQVE7QUFDcEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsRUFBRTtBQUNiLFlBQVksT0FBTztBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDhCQUE4Qjs7QUFFOUIsdUJBQXVCOztBQUV2Qix5Q0FBeUM7O0FBRXpDLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBLGtDQUFrQzs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLDRDQUE0QztBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RSxZQUFZO0FBQ3hGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwySEFBMkgsNkJBQTZCO0FBQ3hKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsRUFBRTtBQUNiLFlBQVksT0FBTztBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qjs7QUFFOUIsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0ZBQWtGO0FBQ2xGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU8sMENBQTBDOzs7QUFHakQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0ZBQStGO0FBQy9GOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sMENBQTBDOzs7QUFHakQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQSxtQ0FBbUMsRUFBRTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZFQUE2RTs7QUFFN0U7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzSkFBc0osaUJBQWlCO0FBQ3ZLLE9BQU87QUFDUCxzSkFBc0osaUJBQWlCLHdEQUF3RCxtQkFBbUIsZ0JBQWdCLDhCQUE4QjtBQUNoUzs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQSxvR0FBb0csR0FBRzs7QUFFdkc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0VBQWtFOztBQUVsRSx3Q0FBd0M7O0FBRXhDLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQSxtQkFBbUI7O0FBRW5CLG1DQUFtQyxRQUFRO0FBQzNDLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBOztBQUVBLGlEQUFpRCxTQUFTO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQSxvREFBb0Q7O0FBRXBEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSwwQ0FBMEMscUJBQXFCO0FBQy9EOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QyxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0M7O0FBRWhDOztBQUVBO0FBQ0E7QUFDQSw0SkFBNEosU0FBMkI7QUFDdkw7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDs7QUFFckQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7OztBQUdYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnUEFBZ1AsU0FBMkI7QUFDM1E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixrQkFBa0IsSUFBTTtBQUN4QjtBQUNBLHVGQUF1RixTQUEyQjtBQUNsSDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7O0FBR1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87OztBQUdQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhDQUE4Qzs7QUFFOUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBLHVCQUF1QiwyQkFBMkI7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlCQUF5Qix3QkFBd0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQzE4SGE7O0FBRWIsSUFBSSxLQUFxQyxFQUFFLEVBRTFDO0FBQ0QsbUJBQW1CLG1CQUFPLENBQUMsMkhBQStDO0FBQzFFIiwiZmlsZSI6InN0YXRpYy9jaHVua3MvMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG1ha2VEZWZhdWx0UXVlcnlJbmZvKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlZW46IGZhbHNlLFxuICAgICAgICBvYnNlcnZhYmxlOiBudWxsXG4gICAgfTtcbn1cbnZhciBSZW5kZXJQcm9taXNlcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVuZGVyUHJvbWlzZXMoKSB7XG4gICAgICAgIHRoaXMucXVlcnlQcm9taXNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5xdWVyeUluZm9UcmllID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBSZW5kZXJQcm9taXNlcy5wcm90b3R5cGUucmVnaXN0ZXJTU1JPYnNlcnZhYmxlID0gZnVuY3Rpb24gKG9ic2VydmFibGUsIHByb3BzKSB7XG4gICAgICAgIHRoaXMubG9va3VwUXVlcnlJbmZvKHByb3BzKS5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIFJlbmRlclByb21pc2VzLnByb3RvdHlwZS5nZXRTU1JPYnNlcnZhYmxlID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvb2t1cFF1ZXJ5SW5mbyhwcm9wcykub2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIFJlbmRlclByb21pc2VzLnByb3RvdHlwZS5hZGRRdWVyeVByb21pc2UgPSBmdW5jdGlvbiAocXVlcnlJbnN0YW5jZSwgZmluaXNoKSB7XG4gICAgICAgIHZhciBpbmZvID0gdGhpcy5sb29rdXBRdWVyeUluZm8ocXVlcnlJbnN0YW5jZS5nZXRPcHRpb25zKCkpO1xuICAgICAgICBpZiAoIWluZm8uc2Vlbikge1xuICAgICAgICAgICAgdGhpcy5xdWVyeVByb21pc2VzLnNldChxdWVyeUluc3RhbmNlLmdldE9wdGlvbnMoKSwgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHF1ZXJ5SW5zdGFuY2UuZmV0Y2hEYXRhKCkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbmlzaCgpO1xuICAgIH07XG4gICAgUmVuZGVyUHJvbWlzZXMucHJvdG90eXBlLmhhc1Byb21pc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeVByb21pc2VzLnNpemUgPiAwO1xuICAgIH07XG4gICAgUmVuZGVyUHJvbWlzZXMucHJvdG90eXBlLmNvbnN1bWVBbmRBd2FpdFByb21pc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWVyeVByb21pc2VzLmZvckVhY2goZnVuY3Rpb24gKHByb21pc2UsIHF1ZXJ5SW5zdGFuY2UpIHtcbiAgICAgICAgICAgIF90aGlzLmxvb2t1cFF1ZXJ5SW5mbyhxdWVyeUluc3RhbmNlKS5zZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnF1ZXJ5UHJvbWlzZXMuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9O1xuICAgIFJlbmRlclByb21pc2VzLnByb3RvdHlwZS5sb29rdXBRdWVyeUluZm8gPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgdmFyIHF1ZXJ5SW5mb1RyaWUgPSB0aGlzLnF1ZXJ5SW5mb1RyaWU7XG4gICAgICAgIHZhciBxdWVyeSA9IHByb3BzLnF1ZXJ5LCB2YXJpYWJsZXMgPSBwcm9wcy52YXJpYWJsZXM7XG4gICAgICAgIHZhciB2YXJNYXAgPSBxdWVyeUluZm9UcmllLmdldChxdWVyeSkgfHwgbmV3IE1hcCgpO1xuICAgICAgICBpZiAoIXF1ZXJ5SW5mb1RyaWUuaGFzKHF1ZXJ5KSlcbiAgICAgICAgICAgIHF1ZXJ5SW5mb1RyaWUuc2V0KHF1ZXJ5LCB2YXJNYXApO1xuICAgICAgICB2YXIgdmFyaWFibGVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFyaWFibGVzKTtcbiAgICAgICAgdmFyIGluZm8gPSB2YXJNYXAuZ2V0KHZhcmlhYmxlc1N0cmluZykgfHwgbWFrZURlZmF1bHRRdWVyeUluZm8oKTtcbiAgICAgICAgaWYgKCF2YXJNYXAuaGFzKHZhcmlhYmxlc1N0cmluZykpXG4gICAgICAgICAgICB2YXJNYXAuc2V0KHZhcmlhYmxlc1N0cmluZywgaW5mbyk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH07XG4gICAgcmV0dXJuIFJlbmRlclByb21pc2VzO1xufSgpKTtcbmV4cG9ydCB7IFJlbmRlclByb21pc2VzIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZW5kZXJQcm9taXNlcy5qcy5tYXAiLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGdldEFwb2xsb0NvbnRleHQgfSBmcm9tIFwiLi4vY29udGV4dC9pbmRleC5qc1wiO1xuaW1wb3J0IHsgUmVuZGVyUHJvbWlzZXMgfSBmcm9tIFwiLi9SZW5kZXJQcm9taXNlcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFGcm9tVHJlZSh0cmVlLCBjb250ZXh0KSB7XG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgeyBjb250ZXh0ID0ge307IH1cbiAgICByZXR1cm4gZ2V0TWFya3VwRnJvbVRyZWUoe1xuICAgICAgICB0cmVlOiB0cmVlLFxuICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICByZW5kZXJGdW5jdGlvbjogcmVxdWlyZSgncmVhY3QtZG9tL3NlcnZlcicpLnJlbmRlclRvU3RhdGljTWFya3VwXG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFya3VwRnJvbVRyZWUoX2EpIHtcbiAgICB2YXIgdHJlZSA9IF9hLnRyZWUsIF9iID0gX2EuY29udGV4dCwgY29udGV4dCA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iLCBfYyA9IF9hLnJlbmRlckZ1bmN0aW9uLCByZW5kZXJGdW5jdGlvbiA9IF9jID09PSB2b2lkIDAgPyByZXF1aXJlKCdyZWFjdC1kb20vc2VydmVyJykucmVuZGVyVG9TdGF0aWNNYXJrdXAgOiBfYztcbiAgICB2YXIgcmVuZGVyUHJvbWlzZXMgPSBuZXcgUmVuZGVyUHJvbWlzZXMoKTtcbiAgICBmdW5jdGlvbiBwcm9jZXNzKCkge1xuICAgICAgICB2YXIgQXBvbGxvQ29udGV4dCA9IGdldEFwb2xsb0NvbnRleHQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBvbGxvQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRleHQpLCB7IHJlbmRlclByb21pc2VzOiByZW5kZXJQcm9taXNlcyB9KSB9LCB0cmVlKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVuZGVyRnVuY3Rpb24oZWxlbWVudCkpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyUHJvbWlzZXMuaGFzUHJvbWlzZXMoKVxuICAgICAgICAgICAgICAgID8gcmVuZGVyUHJvbWlzZXMuY29uc3VtZUFuZEF3YWl0UHJvbWlzZXMoKS50aGVuKHByb2Nlc3MpXG4gICAgICAgICAgICAgICAgOiBodG1sO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4ocHJvY2Vzcyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXREYXRhRnJvbVRyZWUuanMubWFwIiwiZXhwb3J0IHsgZ2V0TWFya3VwRnJvbVRyZWUsIGdldERhdGFGcm9tVHJlZSB9IGZyb20gXCIuL2dldERhdGFGcm9tVHJlZS5qc1wiO1xuZXhwb3J0IHsgcmVuZGVyVG9TdHJpbmdXaXRoRGF0YSB9IGZyb20gXCIuL3JlbmRlclRvU3RyaW5nV2l0aERhdGEuanNcIjtcbmV4cG9ydCB7IFJlbmRlclByb21pc2VzIH0gZnJvbSBcIi4vUmVuZGVyUHJvbWlzZXMuanNcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IGdldE1hcmt1cEZyb21UcmVlIH0gZnJvbSBcIi4vZ2V0RGF0YUZyb21UcmVlLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVG9TdHJpbmdXaXRoRGF0YShjb21wb25lbnQpIHtcbiAgICByZXR1cm4gZ2V0TWFya3VwRnJvbVRyZWUoe1xuICAgICAgICB0cmVlOiBjb21wb25lbnQsXG4gICAgICAgIHJlbmRlckZ1bmN0aW9uOiByZXF1aXJlKCdyZWFjdC1kb20vc2VydmVyJykucmVuZGVyVG9TdHJpbmdcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbmRlclRvU3RyaW5nV2l0aERhdGEuanMubWFwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdAYXBvbGxvL2NsaWVudC9yZWFjdC9zc3InKTtcbiIsIi8qKiBAbGljZW5zZSBSZWFjdCB2MTYuMTQuMFxuICogcmVhY3QtZG9tLXNlcnZlci5icm93c2VyLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMnKTtcblxuLy8gRG8gbm90IHJlcXVpcmUgdGhpcyBtb2R1bGUgZGlyZWN0bHkhIFVzZSBub3JtYWwgYGludmFyaWFudGAgY2FsbHMgd2l0aFxuLy8gdGVtcGxhdGUgbGl0ZXJhbCBzdHJpbmdzLiBUaGUgbWVzc2FnZXMgd2lsbCBiZSByZXBsYWNlZCB3aXRoIGVycm9yIGNvZGVzXG4vLyBkdXJpbmcgYnVpbGQuXG5mdW5jdGlvbiBmb3JtYXRQcm9kRXJyb3JNZXNzYWdlKGNvZGUpIHtcbiAgdmFyIHVybCA9ICdodHRwczovL3JlYWN0anMub3JnL2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD0nICsgY29kZTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHVybCArPSAnJmFyZ3NbXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gXCJNaW5pZmllZCBSZWFjdCBlcnJvciAjXCIgKyBjb2RlICsgXCI7IHZpc2l0IFwiICsgdXJsICsgXCIgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgXCIgKyAndXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCAnICsgJ2hlbHBmdWwgd2FybmluZ3MuJztcbn1cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi4xNC4wJztcblxudmFyIFJlYWN0U2hhcmVkSW50ZXJuYWxzID0gUmVhY3QuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ7IC8vIFByZXZlbnQgbmV3ZXIgcmVuZGVyZXJzIGZyb20gUlRFIHdoZW4gdXNlZCB3aXRoIG9sZGVyIHJlYWN0IHBhY2thZ2UgdmVyc2lvbnMuXG4vLyBDdXJyZW50IG93bmVyIGFuZCBkaXNwYXRjaGVyIHVzZWQgdG8gc2hhcmUgdGhlIHNhbWUgcmVmLFxuLy8gYnV0IFBSICMxNDU0OCBzcGxpdCB0aGVtIG91dCB0byBiZXR0ZXIgc3VwcG9ydCB0aGUgcmVhY3QtZGVidWctdG9vbHMgcGFja2FnZS5cblxuaWYgKCFSZWFjdFNoYXJlZEludGVybmFscy5oYXNPd25Qcm9wZXJ0eSgnUmVhY3RDdXJyZW50RGlzcGF0Y2hlcicpKSB7XG4gIFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudERpc3BhdGNoZXIgPSB7XG4gICAgY3VycmVudDogbnVsbFxuICB9O1xufVxuXG5pZiAoIVJlYWN0U2hhcmVkSW50ZXJuYWxzLmhhc093blByb3BlcnR5KCdSZWFjdEN1cnJlbnRCYXRjaENvbmZpZycpKSB7XG4gIFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudEJhdGNoQ29uZmlnID0ge1xuICAgIHN1c3BlbnNlOiBudWxsXG4gIH07XG59XG5cbi8vIGJ5IGNhbGxzIHRvIHRoZXNlIG1ldGhvZHMgYnkgYSBCYWJlbCBwbHVnaW4uXG4vL1xuLy8gSW4gUFJPRCAob3IgaW4gcGFja2FnZXMgd2l0aG91dCBhY2Nlc3MgdG8gUmVhY3QgaW50ZXJuYWxzKSxcbi8vIHRoZXkgYXJlIGxlZnQgYXMgdGhleSBhcmUgaW5zdGVhZC5cblxuZnVuY3Rpb24gd2Fybihmb3JtYXQpIHtcbiAge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHByaW50V2FybmluZygnd2FybicsIGZvcm1hdCwgYXJncyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGVycm9yKGZvcm1hdCkge1xuICB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgcHJpbnRXYXJuaW5nKCdlcnJvcicsIGZvcm1hdCwgYXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGxldmVsLCBmb3JtYXQsIGFyZ3MpIHtcbiAgLy8gV2hlbiBjaGFuZ2luZyB0aGlzIGxvZ2ljLCB5b3UgbWlnaHQgd2FudCB0byBhbHNvXG4gIC8vIHVwZGF0ZSBjb25zb2xlV2l0aFN0YWNrRGV2Lnd3dy5qcyBhcyB3ZWxsLlxuICB7XG4gICAgdmFyIGhhc0V4aXN0aW5nU3RhY2sgPSBhcmdzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gJ3N0cmluZycgJiYgYXJnc1thcmdzLmxlbmd0aCAtIDFdLmluZGV4T2YoJ1xcbiAgICBpbicpID09PSAwO1xuXG4gICAgaWYgKCFoYXNFeGlzdGluZ1N0YWNrKSB7XG4gICAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gICAgICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcblxuICAgICAgaWYgKHN0YWNrICE9PSAnJykge1xuICAgICAgICBmb3JtYXQgKz0gJyVzJztcbiAgICAgICAgYXJncyA9IGFyZ3MuY29uY2F0KFtzdGFja10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcmdzV2l0aEZvcm1hdCA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gJycgKyBpdGVtO1xuICAgIH0pOyAvLyBDYXJlZnVsOiBSTiBjdXJyZW50bHkgZGVwZW5kcyBvbiB0aGlzIHByZWZpeFxuXG4gICAgYXJnc1dpdGhGb3JtYXQudW5zaGlmdCgnV2FybmluZzogJyArIGZvcm1hdCk7IC8vIFdlIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIHNwcmVhZCAob3IgLmFwcGx5KSBkaXJlY3RseSBiZWNhdXNlIGl0XG4gICAgLy8gYnJlYWtzIElFOTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMzYxMFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmdcblxuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGVbbGV2ZWxdLCBjb25zb2xlLCBhcmdzV2l0aEZvcm1hdCk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG59XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50JykgOiAweGVhY2I7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJykgOiAweGVhY2M7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJykgOiAweGVhY2Q7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpIDogMHhlYWNlOyAvLyBUT0RPOiBXZSBkb24ndCB1c2UgQXN5bmNNb2RlIG9yIENvbmN1cnJlbnRNb2RlIGFueW1vcmUuIFRoZXkgd2VyZSB0ZW1wb3JhcnlcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG52YXIgVW5pbml0aWFsaXplZCA9IC0xO1xudmFyIFBlbmRpbmcgPSAwO1xudmFyIFJlc29sdmVkID0gMTtcbnZhciBSZWplY3RlZCA9IDI7XG5mdW5jdGlvbiByZWZpbmVSZXNvbHZlZExhenlDb21wb25lbnQobGF6eUNvbXBvbmVudCkge1xuICByZXR1cm4gbGF6eUNvbXBvbmVudC5fc3RhdHVzID09PSBSZXNvbHZlZCA/IGxhenlDb21wb25lbnQuX3Jlc3VsdCA6IG51bGw7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplTGF6eUNvbXBvbmVudFR5cGUobGF6eUNvbXBvbmVudCkge1xuICBpZiAobGF6eUNvbXBvbmVudC5fc3RhdHVzID09PSBVbmluaXRpYWxpemVkKSB7XG4gICAgbGF6eUNvbXBvbmVudC5fc3RhdHVzID0gUGVuZGluZztcbiAgICB2YXIgY3RvciA9IGxhenlDb21wb25lbnQuX2N0b3I7XG4gICAgdmFyIHRoZW5hYmxlID0gY3RvcigpO1xuICAgIGxhenlDb21wb25lbnQuX3Jlc3VsdCA9IHRoZW5hYmxlO1xuICAgIHRoZW5hYmxlLnRoZW4oZnVuY3Rpb24gKG1vZHVsZU9iamVjdCkge1xuICAgICAgaWYgKGxhenlDb21wb25lbnQuX3N0YXR1cyA9PT0gUGVuZGluZykge1xuICAgICAgICB2YXIgZGVmYXVsdEV4cG9ydCA9IG1vZHVsZU9iamVjdC5kZWZhdWx0O1xuXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoZGVmYXVsdEV4cG9ydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlcnJvcignbGF6eTogRXhwZWN0ZWQgdGhlIHJlc3VsdCBvZiBhIGR5bmFtaWMgaW1wb3J0KCkgY2FsbC4gJyArICdJbnN0ZWFkIHJlY2VpdmVkOiAlc1xcblxcbllvdXIgY29kZSBzaG91bGQgbG9vayBsaWtlOiBcXG4gICcgKyBcImNvbnN0IE15Q29tcG9uZW50ID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vTXlDb21wb25lbnQnKSlcIiwgbW9kdWxlT2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPSBSZXNvbHZlZDtcbiAgICAgICAgbGF6eUNvbXBvbmVudC5fcmVzdWx0ID0gZGVmYXVsdEV4cG9ydDtcbiAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGlmIChsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPT09IFBlbmRpbmcpIHtcbiAgICAgICAgbGF6eUNvbXBvbmVudC5fc3RhdHVzID0gUmVqZWN0ZWQ7XG4gICAgICAgIGxhenlDb21wb25lbnQuX3Jlc3VsdCA9IGVycm9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFdyYXBwZWROYW1lKG91dGVyVHlwZSwgaW5uZXJUeXBlLCB3cmFwcGVyTmFtZSkge1xuICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICByZXR1cm4gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lIHx8IChmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyBcIihcIiArIGZ1bmN0aW9uTmFtZSArIFwiKVwiIDogd3JhcHBlck5hbWUpO1xufVxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgIC8vIEhvc3Qgcm9vdCwgdGV4dCBub2RlIG9yIGp1c3QgaW52YWxpZCB0eXBlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAge1xuICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICBlcnJvcignUmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBvYmplY3QgaW4gZ2V0Q29tcG9uZW50TmFtZSgpLiAnICsgJ1RoaXMgaXMgbGlrZWx5IGEgYnVnIGluIFJlYWN0LiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgIHJldHVybiAnRnJhZ21lbnQnO1xuXG4gICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgIHJldHVybiAnUG9ydGFsJztcblxuICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgIHJldHVybiBcIlByb2ZpbGVyXCI7XG5cbiAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgIHJldHVybiAnU3VzcGVuc2VMaXN0JztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICByZXR1cm4gJ0NvbnRleHQuQ29uc3VtZXInO1xuXG4gICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgIHJldHVybiAnQ29udGV4dC5Qcm92aWRlcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgcmV0dXJuIGdldFdyYXBwZWROYW1lKHR5cGUsIHR5cGUucmVuZGVyLCAnRm9yd2FyZFJlZicpO1xuXG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUodHlwZS50eXBlKTtcblxuICAgICAgY2FzZSBSRUFDVF9CTE9DS19UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZSh0eXBlLnJlbmRlcik7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHRoZW5hYmxlID0gdHlwZTtcbiAgICAgICAgICB2YXIgcmVzb2x2ZWRUaGVuYWJsZSA9IHJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudCh0aGVuYWJsZSk7XG5cbiAgICAgICAgICBpZiAocmVzb2x2ZWRUaGVuYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUocmVzb2x2ZWRUaGVuYWJsZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIEJFRk9SRV9TTEFTSF9SRSA9IC9eKC4qKVtcXFxcXFwvXS87XG5mdW5jdGlvbiBkZXNjcmliZUNvbXBvbmVudEZyYW1lIChuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICB2YXIgc291cmNlSW5mbyA9ICcnO1xuXG4gIGlmIChzb3VyY2UpIHtcbiAgICB2YXIgcGF0aCA9IHNvdXJjZS5maWxlTmFtZTtcbiAgICB2YXIgZmlsZU5hbWUgPSBwYXRoLnJlcGxhY2UoQkVGT1JFX1NMQVNIX1JFLCAnJyk7XG5cbiAgICB7XG4gICAgICAvLyBJbiBERVYsIGluY2x1ZGUgY29kZSBmb3IgYSBjb21tb24gc3BlY2lhbCBjYXNlOlxuICAgICAgLy8gcHJlZmVyIFwiZm9sZGVyL2luZGV4LmpzXCIgaW5zdGVhZCBvZiBqdXN0IFwiaW5kZXguanNcIi5cbiAgICAgIGlmICgvXmluZGV4XFwuLy50ZXN0KGZpbGVOYW1lKSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBwYXRoLm1hdGNoKEJFRk9SRV9TTEFTSF9SRSk7XG5cbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgdmFyIHBhdGhCZWZvcmVTbGFzaCA9IG1hdGNoWzFdO1xuXG4gICAgICAgICAgaWYgKHBhdGhCZWZvcmVTbGFzaCkge1xuICAgICAgICAgICAgdmFyIGZvbGRlck5hbWUgPSBwYXRoQmVmb3JlU2xhc2gucmVwbGFjZShCRUZPUkVfU0xBU0hfUkUsICcnKTtcbiAgICAgICAgICAgIGZpbGVOYW1lID0gZm9sZGVyTmFtZSArICcvJyArIGZpbGVOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNvdXJjZUluZm8gPSAnIChhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBzb3VyY2UubGluZU51bWJlciArICcpJztcbiAgfSBlbHNlIGlmIChvd25lck5hbWUpIHtcbiAgICBzb3VyY2VJbmZvID0gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknO1xuICB9XG5cbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyBzb3VyY2VJbmZvO1xufVxuXG52YXIgZW5hYmxlU3VzcGVuc2VTZXJ2ZXJSZW5kZXJlciA9IGZhbHNlO1xuXG52YXIgZW5hYmxlRGVwcmVjYXRlZEZsYXJlQVBJID0gZmFsc2U7IC8vIEV4cGVyaW1lbnRhbCBIb3N0IENvbXBvbmVudCBzdXBwb3J0LlxuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbnZhciBkaWRXYXJuQWJvdXRJbnZhbGlkYXRlQ29udGV4dFR5cGU7XG5cbntcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gIGRpZFdhcm5BYm91dEludmFsaWRhdGVDb250ZXh0VHlwZSA9IG5ldyBTZXQoKTtcbn1cblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbntcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIG1hc2tDb250ZXh0KHR5cGUsIGNvbnRleHQpIHtcbiAgdmFyIGNvbnRleHRUeXBlcyA9IHR5cGUuY29udGV4dFR5cGVzO1xuXG4gIGlmICghY29udGV4dFR5cGVzKSB7XG4gICAgcmV0dXJuIGVtcHR5T2JqZWN0O1xuICB9XG5cbiAgdmFyIG1hc2tlZENvbnRleHQgPSB7fTtcblxuICBmb3IgKHZhciBjb250ZXh0TmFtZSBpbiBjb250ZXh0VHlwZXMpIHtcbiAgICBtYXNrZWRDb250ZXh0W2NvbnRleHROYW1lXSA9IGNvbnRleHRbY29udGV4dE5hbWVdO1xuICB9XG5cbiAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQ29udGV4dFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbikge1xuICB7XG4gICAgY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCAnQ29tcG9uZW50JywgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29udGV4dEJvdW5kcyhjb250ZXh0LCB0aHJlYWRJRCkge1xuICAvLyBJZiB3ZSBkb24ndCBoYXZlIGVub3VnaCBzbG90cyBpbiB0aGlzIGNvbnRleHQgdG8gc3RvcmUgdGhpcyB0aHJlYWRJRCxcbiAgLy8gZmlsbCBpdCBpbiB3aXRob3V0IGxlYXZpbmcgYW55IGhvbGVzIHRvIGVuc3VyZSB0aGF0IHRoZSBWTSBvcHRpbWl6ZXNcbiAgLy8gdGhpcyBhcyBub24taG9sZXkgaW5kZXggcHJvcGVydGllcy5cbiAgLy8gKE5vdGU6IElmIGByZWFjdGAgcGFja2FnZSBpcyA8IDE2LjYsIF90aHJlYWRDb3VudCBpcyB1bmRlZmluZWQuKVxuICBmb3IgKHZhciBpID0gY29udGV4dC5fdGhyZWFkQ291bnQgfCAwOyBpIDw9IHRocmVhZElEOyBpKyspIHtcbiAgICAvLyBXZSBhc3N1bWUgdGhhdCB0aGlzIGlzIHRoZSBzYW1lIGFzIHRoZSBkZWZhdWx0VmFsdWUgd2hpY2ggbWlnaHQgbm90IGJlXG4gICAgLy8gdHJ1ZSBpZiB3ZSdyZSByZW5kZXJpbmcgaW5zaWRlIGEgc2Vjb25kYXJ5IHJlbmRlcmVyIGJ1dCB0aGV5IGFyZVxuICAgIC8vIHNlY29uZGFyeSBiZWNhdXNlIHRoZXNlIHVzZSBjYXNlcyBhcmUgdmVyeSByYXJlLlxuICAgIGNvbnRleHRbaV0gPSBjb250ZXh0Ll9jdXJyZW50VmFsdWUyO1xuICAgIGNvbnRleHQuX3RocmVhZENvdW50ID0gaSArIDE7XG4gIH1cbn1cbmZ1bmN0aW9uIHByb2Nlc3NDb250ZXh0KHR5cGUsIGNvbnRleHQsIHRocmVhZElELCBpc0NsYXNzKSB7XG4gIGlmIChpc0NsYXNzKSB7XG4gICAgdmFyIGNvbnRleHRUeXBlID0gdHlwZS5jb250ZXh0VHlwZTtcblxuICAgIHtcbiAgICAgIGlmICgnY29udGV4dFR5cGUnIGluIHR5cGUpIHtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSAvLyBBbGxvdyBudWxsIGZvciBjb25kaXRpb25hbCBkZWNsYXJhdGlvblxuICAgICAgICBjb250ZXh0VHlwZSA9PT0gbnVsbCB8fCBjb250ZXh0VHlwZSAhPT0gdW5kZWZpbmVkICYmIGNvbnRleHRUeXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgJiYgY29udGV4dFR5cGUuX2NvbnRleHQgPT09IHVuZGVmaW5lZDsgLy8gTm90IGEgPENvbnRleHQuQ29uc3VtZXI+XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkICYmICFkaWRXYXJuQWJvdXRJbnZhbGlkYXRlQ29udGV4dFR5cGUuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgZGlkV2FybkFib3V0SW52YWxpZGF0ZUNvbnRleHRUeXBlLmFkZCh0eXBlKTtcbiAgICAgICAgICB2YXIgYWRkZW5kdW0gPSAnJztcblxuICAgICAgICAgIGlmIChjb250ZXh0VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSA9ICcgSG93ZXZlciwgaXQgaXMgc2V0IHRvIHVuZGVmaW5lZC4gJyArICdUaGlzIGNhbiBiZSBjYXVzZWQgYnkgYSB0eXBvIG9yIGJ5IG1peGluZyB1cCBuYW1lZCBhbmQgZGVmYXVsdCBpbXBvcnRzLiAnICsgJ1RoaXMgY2FuIGFsc28gaGFwcGVuIGR1ZSB0byBhIGNpcmN1bGFyIGRlcGVuZGVuY3ksIHNvICcgKyAndHJ5IG1vdmluZyB0aGUgY3JlYXRlQ29udGV4dCgpIGNhbGwgdG8gYSBzZXBhcmF0ZSBmaWxlLic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGV4dFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSA9ICcgSG93ZXZlciwgaXQgaXMgc2V0IHRvIGEgJyArIHR5cGVvZiBjb250ZXh0VHlwZSArICcuJztcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHRUeXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSA9ICcgRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyB0aGUgQ29udGV4dC5Qcm92aWRlciBpbnN0ZWFkPyc7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0VHlwZS5fY29udGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyA8Q29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgICAgIGFkZGVuZHVtID0gJyBEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIHRoZSBDb250ZXh0LkNvbnN1bWVyIGluc3RlYWQ/JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkZW5kdW0gPSAnIEhvd2V2ZXIsIGl0IGlzIHNldCB0byBhbiBvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY29udGV4dFR5cGUpLmpvaW4oJywgJykgKyAnfS4nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVycm9yKCclcyBkZWZpbmVzIGFuIGludmFsaWQgY29udGV4dFR5cGUuICcgKyAnY29udGV4dFR5cGUgc2hvdWxkIHBvaW50IHRvIHRoZSBDb250ZXh0IG9iamVjdCByZXR1cm5lZCBieSBSZWFjdC5jcmVhdGVDb250ZXh0KCkuJXMnLCBnZXRDb21wb25lbnROYW1lKHR5cGUpIHx8ICdDb21wb25lbnQnLCBhZGRlbmR1bSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbnRleHRUeXBlID09PSAnb2JqZWN0JyAmJiBjb250ZXh0VHlwZSAhPT0gbnVsbCkge1xuICAgICAgdmFsaWRhdGVDb250ZXh0Qm91bmRzKGNvbnRleHRUeXBlLCB0aHJlYWRJRCk7XG4gICAgICByZXR1cm4gY29udGV4dFR5cGVbdGhyZWFkSURdO1xuICAgIH1cblxuICAgIHtcbiAgICAgIHZhciBtYXNrZWRDb250ZXh0ID0gbWFza0NvbnRleHQodHlwZSwgY29udGV4dCk7XG5cbiAgICAgIHtcbiAgICAgICAgaWYgKHR5cGUuY29udGV4dFR5cGVzKSB7XG4gICAgICAgICAgY2hlY2tDb250ZXh0VHlwZXModHlwZS5jb250ZXh0VHlwZXMsIG1hc2tlZENvbnRleHQsICdjb250ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHtcbiAgICAgIHZhciBfbWFza2VkQ29udGV4dCA9IG1hc2tDb250ZXh0KHR5cGUsIGNvbnRleHQpO1xuXG4gICAgICB7XG4gICAgICAgIGlmICh0eXBlLmNvbnRleHRUeXBlcykge1xuICAgICAgICAgIGNoZWNrQ29udGV4dFR5cGVzKHR5cGUuY29udGV4dFR5cGVzLCBfbWFza2VkQ29udGV4dCwgJ2NvbnRleHQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gX21hc2tlZENvbnRleHQ7XG4gICAgfVxuICB9XG59XG5cbnZhciBuZXh0QXZhaWxhYmxlVGhyZWFkSURzID0gbmV3IFVpbnQxNkFycmF5KDE2KTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gIG5leHRBdmFpbGFibGVUaHJlYWRJRHNbaV0gPSBpICsgMTtcbn1cblxubmV4dEF2YWlsYWJsZVRocmVhZElEc1sxNV0gPSAwO1xuXG5mdW5jdGlvbiBncm93VGhyZWFkQ291bnRBbmRSZXR1cm5OZXh0QXZhaWxhYmxlKCkge1xuICB2YXIgb2xkQXJyYXkgPSBuZXh0QXZhaWxhYmxlVGhyZWFkSURzO1xuICB2YXIgb2xkU2l6ZSA9IG9sZEFycmF5Lmxlbmd0aDtcbiAgdmFyIG5ld1NpemUgPSBvbGRTaXplICogMjtcblxuICBpZiAoIShuZXdTaXplIDw9IDB4MTAwMDApKSB7XG4gICAge1xuICAgICAgdGhyb3cgRXJyb3IoIFwiTWF4aW11bSBudW1iZXIgb2YgY29uY3VycmVudCBSZWFjdCByZW5kZXJlcnMgZXhjZWVkZWQuIFRoaXMgY2FuIGhhcHBlbiBpZiB5b3UgYXJlIG5vdCBwcm9wZXJseSBkZXN0cm95aW5nIHRoZSBSZWFkYWJsZSBwcm92aWRlZCBieSBSZWFjdC4gRW5zdXJlIHRoYXQgeW91IGNhbGwgLmRlc3Ryb3koKSBvbiBpdCBpZiB5b3Ugbm8gbG9uZ2VyIHdhbnQgdG8gcmVhZCBmcm9tIGl0LCBhbmQgZGlkIG5vdCByZWFkIHRvIHRoZSBlbmQuIElmIHlvdSB1c2UgLnBpcGUoKSB0aGlzIHNob3VsZCBiZSBhdXRvbWF0aWMuXCIgKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbmV3QXJyYXkgPSBuZXcgVWludDE2QXJyYXkobmV3U2l6ZSk7XG4gIG5ld0FycmF5LnNldChvbGRBcnJheSk7XG4gIG5leHRBdmFpbGFibGVUaHJlYWRJRHMgPSBuZXdBcnJheTtcbiAgbmV4dEF2YWlsYWJsZVRocmVhZElEc1swXSA9IG9sZFNpemUgKyAxO1xuXG4gIGZvciAodmFyIF9pID0gb2xkU2l6ZTsgX2kgPCBuZXdTaXplIC0gMTsgX2krKykge1xuICAgIG5leHRBdmFpbGFibGVUaHJlYWRJRHNbX2ldID0gX2kgKyAxO1xuICB9XG5cbiAgbmV4dEF2YWlsYWJsZVRocmVhZElEc1tuZXdTaXplIC0gMV0gPSAwO1xuICByZXR1cm4gb2xkU2l6ZTtcbn1cblxuZnVuY3Rpb24gYWxsb2NUaHJlYWRJRCgpIHtcbiAgdmFyIG5leHRJRCA9IG5leHRBdmFpbGFibGVUaHJlYWRJRHNbMF07XG5cbiAgaWYgKG5leHRJRCA9PT0gMCkge1xuICAgIHJldHVybiBncm93VGhyZWFkQ291bnRBbmRSZXR1cm5OZXh0QXZhaWxhYmxlKCk7XG4gIH1cblxuICBuZXh0QXZhaWxhYmxlVGhyZWFkSURzWzBdID0gbmV4dEF2YWlsYWJsZVRocmVhZElEc1tuZXh0SURdO1xuICByZXR1cm4gbmV4dElEO1xufVxuZnVuY3Rpb24gZnJlZVRocmVhZElEKGlkKSB7XG4gIG5leHRBdmFpbGFibGVUaHJlYWRJRHNbaWRdID0gbmV4dEF2YWlsYWJsZVRocmVhZElEc1swXTtcbiAgbmV4dEF2YWlsYWJsZVRocmVhZElEc1swXSA9IGlkO1xufVxuXG4vLyBBIHJlc2VydmVkIGF0dHJpYnV0ZS5cbi8vIEl0IGlzIGhhbmRsZWQgYnkgUmVhY3Qgc2VwYXJhdGVseSBhbmQgc2hvdWxkbid0IGJlIHdyaXR0ZW4gdG8gdGhlIERPTS5cbnZhciBSRVNFUlZFRCA9IDA7IC8vIEEgc2ltcGxlIHN0cmluZyBhdHRyaWJ1dGUuXG4vLyBBdHRyaWJ1dGVzIHRoYXQgYXJlbid0IGluIHRoZSB3aGl0ZWxpc3QgYXJlIHByZXN1bWVkIHRvIGhhdmUgdGhpcyB0eXBlLlxuXG52YXIgU1RSSU5HID0gMTsgLy8gQSBzdHJpbmcgYXR0cmlidXRlIHRoYXQgYWNjZXB0cyBib29sZWFucyBpbiBSZWFjdC4gSW4gSFRNTCwgdGhlc2UgYXJlIGNhbGxlZFxuLy8gXCJlbnVtZXJhdGVkXCIgYXR0cmlidXRlcyB3aXRoIFwidHJ1ZVwiIGFuZCBcImZhbHNlXCIgYXMgcG9zc2libGUgdmFsdWVzLlxuLy8gV2hlbiB0cnVlLCBpdCBzaG91bGQgYmUgc2V0IHRvIGEgXCJ0cnVlXCIgc3RyaW5nLlxuLy8gV2hlbiBmYWxzZSwgaXQgc2hvdWxkIGJlIHNldCB0byBhIFwiZmFsc2VcIiBzdHJpbmcuXG5cbnZhciBCT09MRUFOSVNIX1NUUklORyA9IDI7IC8vIEEgcmVhbCBib29sZWFuIGF0dHJpYnV0ZS5cbi8vIFdoZW4gdHJ1ZSwgaXQgc2hvdWxkIGJlIHByZXNlbnQgKHNldCBlaXRoZXIgdG8gYW4gZW1wdHkgc3RyaW5nIG9yIGl0cyBuYW1lKS5cbi8vIFdoZW4gZmFsc2UsIGl0IHNob3VsZCBiZSBvbWl0dGVkLlxuXG52YXIgQk9PTEVBTiA9IDM7IC8vIEFuIGF0dHJpYnV0ZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEgZmxhZyBhcyB3ZWxsIGFzIHdpdGggYSB2YWx1ZS5cbi8vIFdoZW4gdHJ1ZSwgaXQgc2hvdWxkIGJlIHByZXNlbnQgKHNldCBlaXRoZXIgdG8gYW4gZW1wdHkgc3RyaW5nIG9yIGl0cyBuYW1lKS5cbi8vIFdoZW4gZmFsc2UsIGl0IHNob3VsZCBiZSBvbWl0dGVkLlxuLy8gRm9yIGFueSBvdGhlciB2YWx1ZSwgc2hvdWxkIGJlIHByZXNlbnQgd2l0aCB0aGF0IHZhbHVlLlxuXG52YXIgT1ZFUkxPQURFRF9CT09MRUFOID0gNDsgLy8gQW4gYXR0cmlidXRlIHRoYXQgbXVzdCBiZSBudW1lcmljIG9yIHBhcnNlIGFzIGEgbnVtZXJpYy5cbi8vIFdoZW4gZmFsc3ksIGl0IHNob3VsZCBiZSByZW1vdmVkLlxuXG52YXIgTlVNRVJJQyA9IDU7IC8vIEFuIGF0dHJpYnV0ZSB0aGF0IG11c3QgYmUgcG9zaXRpdmUgbnVtZXJpYyBvciBwYXJzZSBhcyBhIHBvc2l0aXZlIG51bWVyaWMuXG4vLyBXaGVuIGZhbHN5LCBpdCBzaG91bGQgYmUgcmVtb3ZlZC5cblxudmFyIFBPU0lUSVZFX05VTUVSSUMgPSA2O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG52YXIgQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiA9IFwiOkEtWl9hLXpcXFxcdTAwQzAtXFxcXHUwMEQ2XFxcXHUwMEQ4LVxcXFx1MDBGNlxcXFx1MDBGOC1cXFxcdTAyRkZcXFxcdTAzNzAtXFxcXHUwMzdEXFxcXHUwMzdGLVxcXFx1MUZGRlxcXFx1MjAwQy1cXFxcdTIwMERcXFxcdTIwNzAtXFxcXHUyMThGXFxcXHUyQzAwLVxcXFx1MkZFRlxcXFx1MzAwMS1cXFxcdUQ3RkZcXFxcdUY5MDAtXFxcXHVGRENGXFxcXHVGREYwLVxcXFx1RkZGRFwiO1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbnZhciBBVFRSSUJVVEVfTkFNRV9DSEFSID0gQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiArIFwiXFxcXC0uMC05XFxcXHUwMEI3XFxcXHUwMzAwLVxcXFx1MDM2RlxcXFx1MjAzRi1cXFxcdTIwNDBcIjtcbnZhciBST09UX0FUVFJJQlVURV9OQU1FID0gJ2RhdGEtcmVhY3Ryb290JztcbnZhciBWQUxJRF9BVFRSSUJVVEVfTkFNRV9SRUdFWCA9IG5ldyBSZWdFeHAoJ15bJyArIEFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIgKyAnXVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaWxsZWdhbEF0dHJpYnV0ZU5hbWVDYWNoZSA9IHt9O1xudmFyIHZhbGlkYXRlZEF0dHJpYnV0ZU5hbWVDYWNoZSA9IHt9O1xuZnVuY3Rpb24gaXNBdHRyaWJ1dGVOYW1lU2FmZShhdHRyaWJ1dGVOYW1lKSB7XG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbGlkYXRlZEF0dHJpYnV0ZU5hbWVDYWNoZSwgYXR0cmlidXRlTmFtZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGlsbGVnYWxBdHRyaWJ1dGVOYW1lQ2FjaGUsIGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKFZBTElEX0FUVFJJQlVURV9OQU1FX1JFR0VYLnRlc3QoYXR0cmlidXRlTmFtZSkpIHtcbiAgICB2YWxpZGF0ZWRBdHRyaWJ1dGVOYW1lQ2FjaGVbYXR0cmlidXRlTmFtZV0gPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWxsZWdhbEF0dHJpYnV0ZU5hbWVDYWNoZVthdHRyaWJ1dGVOYW1lXSA9IHRydWU7XG5cbiAge1xuICAgIGVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lOiBgJXNgJywgYXR0cmlidXRlTmFtZSk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBzaG91bGRJZ25vcmVBdHRyaWJ1dGUobmFtZSwgcHJvcGVydHlJbmZvLCBpc0N1c3RvbUNvbXBvbmVudFRhZykge1xuICBpZiAocHJvcGVydHlJbmZvICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SW5mby50eXBlID09PSBSRVNFUlZFRDtcbiAgfVxuXG4gIGlmIChpc0N1c3RvbUNvbXBvbmVudFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChuYW1lLmxlbmd0aCA+IDIgJiYgKG5hbWVbMF0gPT09ICdvJyB8fCBuYW1lWzBdID09PSAnTycpICYmIChuYW1lWzFdID09PSAnbicgfHwgbmFtZVsxXSA9PT0gJ04nKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gc2hvdWxkUmVtb3ZlQXR0cmlidXRlV2l0aFdhcm5pbmcobmFtZSwgdmFsdWUsIHByb3BlcnR5SW5mbywgaXNDdXN0b21Db21wb25lbnRUYWcpIHtcbiAgaWYgKHByb3BlcnR5SW5mbyAhPT0gbnVsbCAmJiBwcm9wZXJ0eUluZm8udHlwZSA9PT0gUkVTRVJWRUQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgIGNhc2UgJ2Z1bmN0aW9uJzogLy8gJEZsb3dJc3N1ZSBzeW1ib2wgaXMgcGVyZmVjdGx5IHZhbGlkIGhlcmVcblxuICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAge1xuICAgICAgICBpZiAoaXNDdXN0b21Db21wb25lbnRUYWcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcGVydHlJbmZvICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuICFwcm9wZXJ0eUluZm8uYWNjZXB0c0Jvb2xlYW5zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwcmVmaXggPSBuYW1lLnRvTG93ZXJDYXNlKCkuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCAhPT0gJ2RhdGEtJyAmJiBwcmVmaXggIT09ICdhcmlhLSc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbmZ1bmN0aW9uIHNob3VsZFJlbW92ZUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgcHJvcGVydHlJbmZvLCBpc0N1c3RvbUNvbXBvbmVudFRhZykge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHNob3VsZFJlbW92ZUF0dHJpYnV0ZVdpdGhXYXJuaW5nKG5hbWUsIHZhbHVlLCBwcm9wZXJ0eUluZm8sIGlzQ3VzdG9tQ29tcG9uZW50VGFnKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKGlzQ3VzdG9tQ29tcG9uZW50VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHByb3BlcnR5SW5mbyAhPT0gbnVsbCkge1xuICAgIHN3aXRjaCAocHJvcGVydHlJbmZvLnR5cGUpIHtcbiAgICAgIGNhc2UgQk9PTEVBTjpcbiAgICAgICAgcmV0dXJuICF2YWx1ZTtcblxuICAgICAgY2FzZSBPVkVSTE9BREVEX0JPT0xFQU46XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZmFsc2U7XG5cbiAgICAgIGNhc2UgTlVNRVJJQzpcbiAgICAgICAgcmV0dXJuIGlzTmFOKHZhbHVlKTtcblxuICAgICAgY2FzZSBQT1NJVElWRV9OVU1FUklDOlxuICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpIHx8IHZhbHVlIDwgMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBnZXRQcm9wZXJ0eUluZm8obmFtZSkge1xuICByZXR1cm4gcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHByb3BlcnRpZXNbbmFtZV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgdHlwZSwgbXVzdFVzZVByb3BlcnR5LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVOYW1lc3BhY2UsIHNhbml0aXplVVJMKSB7XG4gIHRoaXMuYWNjZXB0c0Jvb2xlYW5zID0gdHlwZSA9PT0gQk9PTEVBTklTSF9TVFJJTkcgfHwgdHlwZSA9PT0gQk9PTEVBTiB8fCB0eXBlID09PSBPVkVSTE9BREVEX0JPT0xFQU47XG4gIHRoaXMuYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZU5hbWU7XG4gIHRoaXMuYXR0cmlidXRlTmFtZXNwYWNlID0gYXR0cmlidXRlTmFtZXNwYWNlO1xuICB0aGlzLm11c3RVc2VQcm9wZXJ0eSA9IG11c3RVc2VQcm9wZXJ0eTtcbiAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBuYW1lO1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLnNhbml0aXplVVJMID0gc2FuaXRpemVVUkw7XG59IC8vIFdoZW4gYWRkaW5nIGF0dHJpYnV0ZXMgdG8gdGhpcyBsaXN0LCBiZSBzdXJlIHRvIGFsc28gYWRkIHRoZW0gdG9cbi8vIHRoZSBgcG9zc2libGVTdGFuZGFyZE5hbWVzYCBtb2R1bGUgdG8gZW5zdXJlIGNhc2luZyBhbmQgaW5jb3JyZWN0XG4vLyBuYW1lIHdhcm5pbmdzLlxuXG5cbnZhciBwcm9wZXJ0aWVzID0ge307IC8vIFRoZXNlIHByb3BzIGFyZSByZXNlcnZlZCBieSBSZWFjdC4gVGhleSBzaG91bGRuJ3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxuXG52YXIgcmVzZXJ2ZWRQcm9wcyA9IFsnY2hpbGRyZW4nLCAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnLCAvLyBUT0RPOiBUaGlzIHByZXZlbnRzIHRoZSBhc3NpZ25tZW50IG9mIGRlZmF1bHRWYWx1ZSB0byByZWd1bGFyXG4vLyBlbGVtZW50cyAobm90IGp1c3QgaW5wdXRzKS4gTm93IHRoYXQgUmVhY3RET01JbnB1dCBhc3NpZ25zIHRvIHRoZVxuLy8gZGVmYXVsdFZhbHVlIHByb3BlcnR5IC0tIGRvIHdlIG5lZWQgdGhpcz9cbidkZWZhdWx0VmFsdWUnLCAnZGVmYXVsdENoZWNrZWQnLCAnaW5uZXJIVE1MJywgJ3N1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZycsICdzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmcnLCAnc3R5bGUnXTtcblxucmVzZXJ2ZWRQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIFJFU0VSVkVELCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIG5hbWUsIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBBIGZldyBSZWFjdCBzdHJpbmcgYXR0cmlidXRlcyBoYXZlIGEgZGlmZmVyZW50IG5hbWUuXG4vLyBUaGlzIGlzIGEgbWFwcGluZyBmcm9tIFJlYWN0IHByb3AgbmFtZXMgdG8gdGhlIGF0dHJpYnV0ZSBuYW1lcy5cblxuW1snYWNjZXB0Q2hhcnNldCcsICdhY2NlcHQtY2hhcnNldCddLCBbJ2NsYXNzTmFtZScsICdjbGFzcyddLCBbJ2h0bWxGb3InLCAnZm9yJ10sIFsnaHR0cEVxdWl2JywgJ2h0dHAtZXF1aXYnXV0uZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgbmFtZSA9IF9yZWZbMF0sXG4gICAgICBhdHRyaWJ1dGVOYW1lID0gX3JlZlsxXTtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIGF0dHJpYnV0ZU5hbWUsIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhcmUgXCJlbnVtZXJhdGVkXCIgSFRNTCBhdHRyaWJ1dGVzIHRoYXQgYWNjZXB0IFwidHJ1ZVwiIGFuZCBcImZhbHNlXCIuXG4vLyBJbiBSZWFjdCwgd2UgbGV0IHVzZXJzIHBhc3MgYHRydWVgIGFuZCBgZmFsc2VgIGV2ZW4gdGhvdWdoIHRlY2huaWNhbGx5XG4vLyB0aGVzZSBhcmVuJ3QgYm9vbGVhbiBhdHRyaWJ1dGVzICh0aGV5IGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MpLlxuXG5bJ2NvbnRlbnRFZGl0YWJsZScsICdkcmFnZ2FibGUnLCAnc3BlbGxDaGVjaycsICd2YWx1ZSddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgQk9PTEVBTklTSF9TVFJJTkcsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgbmFtZS50b0xvd2VyQ2FzZSgpLCAvLyBhdHRyaWJ1dGVOYW1lXG4gIG51bGwsIC8vIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICBmYWxzZSk7XG59KTsgLy8gVGhlc2UgYXJlIFwiZW51bWVyYXRlZFwiIFNWRyBhdHRyaWJ1dGVzIHRoYXQgYWNjZXB0IFwidHJ1ZVwiIGFuZCBcImZhbHNlXCIuXG4vLyBJbiBSZWFjdCwgd2UgbGV0IHVzZXJzIHBhc3MgYHRydWVgIGFuZCBgZmFsc2VgIGV2ZW4gdGhvdWdoIHRlY2huaWNhbGx5XG4vLyB0aGVzZSBhcmVuJ3QgYm9vbGVhbiBhdHRyaWJ1dGVzICh0aGV5IGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MpLlxuLy8gU2luY2UgdGhlc2UgYXJlIFNWRyBhdHRyaWJ1dGVzLCB0aGVpciBhdHRyaWJ1dGUgbmFtZXMgYXJlIGNhc2Utc2Vuc2l0aXZlLlxuXG5bJ2F1dG9SZXZlcnNlJywgJ2V4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQnLCAnZm9jdXNhYmxlJywgJ3ByZXNlcnZlQWxwaGEnXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIEJPT0xFQU5JU0hfU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIG5hbWUsIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhcmUgSFRNTCBib29sZWFuIGF0dHJpYnV0ZXMuXG5cblsnYWxsb3dGdWxsU2NyZWVuJywgJ2FzeW5jJywgLy8gTm90ZTogdGhlcmUgaXMgYSBzcGVjaWFsIGNhc2UgdGhhdCBwcmV2ZW50cyBpdCBmcm9tIGJlaW5nIHdyaXR0ZW4gdG8gdGhlIERPTVxuLy8gb24gdGhlIGNsaWVudCBzaWRlIGJlY2F1c2UgdGhlIGJyb3dzZXJzIGFyZSBpbmNvbnNpc3RlbnQuIEluc3RlYWQgd2UgY2FsbCBmb2N1cygpLlxuJ2F1dG9Gb2N1cycsICdhdXRvUGxheScsICdjb250cm9scycsICdkZWZhdWx0JywgJ2RlZmVyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVQaWN0dXJlSW5QaWN0dXJlJywgJ2Zvcm1Ob1ZhbGlkYXRlJywgJ2hpZGRlbicsICdsb29wJywgJ25vTW9kdWxlJywgJ25vVmFsaWRhdGUnLCAnb3BlbicsICdwbGF5c0lubGluZScsICdyZWFkT25seScsICdyZXF1aXJlZCcsICdyZXZlcnNlZCcsICdzY29wZWQnLCAnc2VhbWxlc3MnLCAvLyBNaWNyb2RhdGFcbidpdGVtU2NvcGUnXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIEJPT0xFQU4sIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgbmFtZS50b0xvd2VyQ2FzZSgpLCAvLyBhdHRyaWJ1dGVOYW1lXG4gIG51bGwsIC8vIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICBmYWxzZSk7XG59KTsgLy8gVGhlc2UgYXJlIHRoZSBmZXcgUmVhY3QgcHJvcHMgdGhhdCB3ZSBzZXQgYXMgRE9NIHByb3BlcnRpZXNcbi8vIHJhdGhlciB0aGFuIGF0dHJpYnV0ZXMuIFRoZXNlIGFyZSBhbGwgYm9vbGVhbnMuXG5cblsnY2hlY2tlZCcsIC8vIE5vdGU6IGBvcHRpb24uc2VsZWN0ZWRgIGlzIG5vdCB1cGRhdGVkIGlmIGBzZWxlY3QubXVsdGlwbGVgIGlzXG4vLyBkaXNhYmxlZCB3aXRoIGByZW1vdmVBdHRyaWJ1dGVgLiBXZSBoYXZlIHNwZWNpYWwgbG9naWMgZm9yIGhhbmRsaW5nIHRoaXMuXG4nbXVsdGlwbGUnLCAnbXV0ZWQnLCAnc2VsZWN0ZWQnIC8vIE5PVEU6IGlmIHlvdSBhZGQgYSBjYW1lbENhc2VkIHByb3AgdG8gdGhpcyBsaXN0LFxuLy8geW91J2xsIG5lZWQgdG8gc2V0IGF0dHJpYnV0ZU5hbWUgdG8gbmFtZS50b0xvd2VyQ2FzZSgpXG4vLyBpbnN0ZWFkIGluIHRoZSBhc3NpZ25tZW50IGJlbG93LlxuXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIEJPT0xFQU4sIHRydWUsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBuYW1lLCAvLyBhdHRyaWJ1dGVOYW1lXG4gIG51bGwsIC8vIGF0dHJpYnV0ZU5hbWVzcGFjZVxuICBmYWxzZSk7XG59KTsgLy8gVGhlc2UgYXJlIEhUTUwgYXR0cmlidXRlcyB0aGF0IGFyZSBcIm92ZXJsb2FkZWQgYm9vbGVhbnNcIjogdGhleSBiZWhhdmUgbGlrZVxuLy8gYm9vbGVhbnMsIGJ1dCBjYW4gYWxzbyBhY2NlcHQgYSBzdHJpbmcgdmFsdWUuXG5cblsnY2FwdHVyZScsICdkb3dubG9hZCcgLy8gTk9URTogaWYgeW91IGFkZCBhIGNhbWVsQ2FzZWQgcHJvcCB0byB0aGlzIGxpc3QsXG4vLyB5b3UnbGwgbmVlZCB0byBzZXQgYXR0cmlidXRlTmFtZSB0byBuYW1lLnRvTG93ZXJDYXNlKClcbi8vIGluc3RlYWQgaW4gdGhlIGFzc2lnbm1lbnQgYmVsb3cuXG5dLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgT1ZFUkxPQURFRF9CT09MRUFOLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIG5hbWUsIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhcmUgSFRNTCBhdHRyaWJ1dGVzIHRoYXQgbXVzdCBiZSBwb3NpdGl2ZSBudW1iZXJzLlxuXG5bJ2NvbHMnLCAncm93cycsICdzaXplJywgJ3NwYW4nIC8vIE5PVEU6IGlmIHlvdSBhZGQgYSBjYW1lbENhc2VkIHByb3AgdG8gdGhpcyBsaXN0LFxuLy8geW91J2xsIG5lZWQgdG8gc2V0IGF0dHJpYnV0ZU5hbWUgdG8gbmFtZS50b0xvd2VyQ2FzZSgpXG4vLyBpbnN0ZWFkIGluIHRoZSBhc3NpZ25tZW50IGJlbG93LlxuXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIFBPU0lUSVZFX05VTUVSSUMsIGZhbHNlLCAvLyBtdXN0VXNlUHJvcGVydHlcbiAgbmFtZSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIFRoZXNlIGFyZSBIVE1MIGF0dHJpYnV0ZXMgdGhhdCBtdXN0IGJlIG51bWJlcnMuXG5cblsncm93U3BhbicsICdzdGFydCddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgTlVNRVJJQywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBuYW1lLnRvTG93ZXJDYXNlKCksIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pO1xudmFyIENBTUVMSVpFID0gL1tcXC1cXDpdKFthLXpdKS9nO1xuXG52YXIgY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICByZXR1cm4gdG9rZW5bMV0udG9VcHBlckNhc2UoKTtcbn07IC8vIFRoaXMgaXMgYSBsaXN0IG9mIGFsbCBTVkcgYXR0cmlidXRlcyB0aGF0IG5lZWQgc3BlY2lhbCBjYXNpbmcsIG5hbWVzcGFjaW5nLFxuLy8gb3IgYm9vbGVhbiB2YWx1ZSBhc3NpZ25tZW50LiBSZWd1bGFyIGF0dHJpYnV0ZXMgdGhhdCBqdXN0IGFjY2VwdCBzdHJpbmdzXG4vLyBhbmQgaGF2ZSB0aGUgc2FtZSBuYW1lcyBhcmUgb21pdHRlZCwganVzdCBsaWtlIGluIHRoZSBIVE1MIHdoaXRlbGlzdC5cbi8vIFNvbWUgb2YgdGhlc2UgYXR0cmlidXRlcyBjYW4gYmUgaGFyZCB0byBmaW5kLiBUaGlzIGxpc3Qgd2FzIGNyZWF0ZWQgYnlcbi8vIHNjcmFwaW5nIHRoZSBNRE4gZG9jdW1lbnRhdGlvbi5cblxuXG5bJ2FjY2VudC1oZWlnaHQnLCAnYWxpZ25tZW50LWJhc2VsaW5lJywgJ2FyYWJpYy1mb3JtJywgJ2Jhc2VsaW5lLXNoaWZ0JywgJ2NhcC1oZWlnaHQnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdkb21pbmFudC1iYXNlbGluZScsICdlbmFibGUtYmFja2dyb3VuZCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2Zsb29kLWNvbG9yJywgJ2Zsb29kLW9wYWNpdHknLCAnZm9udC1mYW1pbHknLCAnZm9udC1zaXplJywgJ2ZvbnQtc2l6ZS1hZGp1c3QnLCAnZm9udC1zdHJldGNoJywgJ2ZvbnQtc3R5bGUnLCAnZm9udC12YXJpYW50JywgJ2ZvbnQtd2VpZ2h0JywgJ2dseXBoLW5hbWUnLCAnZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbCcsICdnbHlwaC1vcmllbnRhdGlvbi12ZXJ0aWNhbCcsICdob3Jpei1hZHYteCcsICdob3Jpei1vcmlnaW4teCcsICdpbWFnZS1yZW5kZXJpbmcnLCAnbGV0dGVyLXNwYWNpbmcnLCAnbGlnaHRpbmctY29sb3InLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdvdmVybGluZS1wb3NpdGlvbicsICdvdmVybGluZS10aGlja25lc3MnLCAncGFpbnQtb3JkZXInLCAncGFub3NlLTEnLCAncG9pbnRlci1ldmVudHMnLCAncmVuZGVyaW5nLWludGVudCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3RyaWtldGhyb3VnaC1wb3NpdGlvbicsICdzdHJpa2V0aHJvdWdoLXRoaWNrbmVzcycsICdzdHJva2UtZGFzaGFycmF5JywgJ3N0cm9rZS1kYXNob2Zmc2V0JywgJ3N0cm9rZS1saW5lY2FwJywgJ3N0cm9rZS1saW5lam9pbicsICdzdHJva2UtbWl0ZXJsaW1pdCcsICdzdHJva2Utb3BhY2l0eScsICdzdHJva2Utd2lkdGgnLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3VuZGVybGluZS1wb3NpdGlvbicsICd1bmRlcmxpbmUtdGhpY2tuZXNzJywgJ3VuaWNvZGUtYmlkaScsICd1bmljb2RlLXJhbmdlJywgJ3VuaXRzLXBlci1lbScsICd2LWFscGhhYmV0aWMnLCAndi1oYW5naW5nJywgJ3YtaWRlb2dyYXBoaWMnLCAndi1tYXRoZW1hdGljYWwnLCAndmVjdG9yLWVmZmVjdCcsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3b3JkLXNwYWNpbmcnLCAnd3JpdGluZy1tb2RlJywgJ3htbG5zOnhsaW5rJywgJ3gtaGVpZ2h0JyAvLyBOT1RFOiBpZiB5b3UgYWRkIGEgY2FtZWxDYXNlZCBwcm9wIHRvIHRoaXMgbGlzdCxcbi8vIHlvdSdsbCBuZWVkIHRvIHNldCBhdHRyaWJ1dGVOYW1lIHRvIG5hbWUudG9Mb3dlckNhc2UoKVxuLy8gaW5zdGVhZCBpbiB0aGUgYXNzaWdubWVudCBiZWxvdy5cbl0uZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICB2YXIgbmFtZSA9IGF0dHJpYnV0ZU5hbWUucmVwbGFjZShDQU1FTElaRSwgY2FwaXRhbGl6ZSk7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIFNUUklORywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBhdHRyaWJ1dGVOYW1lLCBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgZmFsc2UpO1xufSk7IC8vIFN0cmluZyBTVkcgYXR0cmlidXRlcyB3aXRoIHRoZSB4bGluayBuYW1lc3BhY2UuXG5cblsneGxpbms6YWN0dWF0ZScsICd4bGluazphcmNyb2xlJywgJ3hsaW5rOnJvbGUnLCAneGxpbms6c2hvdycsICd4bGluazp0aXRsZScsICd4bGluazp0eXBlJyAvLyBOT1RFOiBpZiB5b3UgYWRkIGEgY2FtZWxDYXNlZCBwcm9wIHRvIHRoaXMgbGlzdCxcbi8vIHlvdSdsbCBuZWVkIHRvIHNldCBhdHRyaWJ1dGVOYW1lIHRvIG5hbWUudG9Mb3dlckNhc2UoKVxuLy8gaW5zdGVhZCBpbiB0aGUgYXNzaWdubWVudCBiZWxvdy5cbl0uZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICB2YXIgbmFtZSA9IGF0dHJpYnV0ZU5hbWUucmVwbGFjZShDQU1FTElaRSwgY2FwaXRhbGl6ZSk7XG4gIHByb3BlcnRpZXNbbmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKG5hbWUsIFNUUklORywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBhdHRyaWJ1dGVOYW1lLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGZhbHNlKTtcbn0pOyAvLyBTdHJpbmcgU1ZHIGF0dHJpYnV0ZXMgd2l0aCB0aGUgeG1sIG5hbWVzcGFjZS5cblxuWyd4bWw6YmFzZScsICd4bWw6bGFuZycsICd4bWw6c3BhY2UnIC8vIE5PVEU6IGlmIHlvdSBhZGQgYSBjYW1lbENhc2VkIHByb3AgdG8gdGhpcyBsaXN0LFxuLy8geW91J2xsIG5lZWQgdG8gc2V0IGF0dHJpYnV0ZU5hbWUgdG8gbmFtZS50b0xvd2VyQ2FzZSgpXG4vLyBpbnN0ZWFkIGluIHRoZSBhc3NpZ25tZW50IGJlbG93LlxuXS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gIHZhciBuYW1lID0gYXR0cmlidXRlTmFtZS5yZXBsYWNlKENBTUVMSVpFLCBjYXBpdGFsaXplKTtcbiAgcHJvcGVydGllc1tuYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQobmFtZSwgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIGF0dHJpYnV0ZU5hbWUsICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLCBmYWxzZSk7XG59KTsgLy8gVGhlc2UgYXR0cmlidXRlIGV4aXN0cyBib3RoIGluIEhUTUwgYW5kIFNWRy5cbi8vIFRoZSBhdHRyaWJ1dGUgbmFtZSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBTVkcgc28gd2UgY2FuJ3QganVzdCB1c2Vcbi8vIHRoZSBSZWFjdCBuYW1lIGxpa2Ugd2UgZG8gZm9yIGF0dHJpYnV0ZXMgdGhhdCBleGlzdCBvbmx5IGluIEhUTUwuXG5cblsndGFiSW5kZXgnLCAnY3Jvc3NPcmlnaW4nXS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gIHByb3BlcnRpZXNbYXR0cmlidXRlTmFtZV0gPSBuZXcgUHJvcGVydHlJbmZvUmVjb3JkKGF0dHJpYnV0ZU5hbWUsIFNUUklORywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuICBhdHRyaWJ1dGVOYW1lLnRvTG93ZXJDYXNlKCksIC8vIGF0dHJpYnV0ZU5hbWVcbiAgbnVsbCwgLy8gYXR0cmlidXRlTmFtZXNwYWNlXG4gIGZhbHNlKTtcbn0pOyAvLyBUaGVzZSBhdHRyaWJ1dGVzIGFjY2VwdCBVUkxzLiBUaGVzZSBtdXN0IG5vdCBhbGxvdyBqYXZhc2NyaXB0OiBVUkxTLlxuLy8gVGhlc2Ugd2lsbCBhbHNvIG5lZWQgdG8gYWNjZXB0IFRydXN0ZWQgVHlwZXMgb2JqZWN0IGluIHRoZSBmdXR1cmUuXG5cbnZhciB4bGlua0hyZWYgPSAneGxpbmtIcmVmJztcbnByb3BlcnRpZXNbeGxpbmtIcmVmXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQoJ3hsaW5rSHJlZicsIFNUUklORywgZmFsc2UsIC8vIG11c3RVc2VQcm9wZXJ0eVxuJ3hsaW5rOmhyZWYnLCAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIHRydWUpO1xuWydzcmMnLCAnaHJlZicsICdhY3Rpb24nLCAnZm9ybUFjdGlvbiddLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgcHJvcGVydGllc1thdHRyaWJ1dGVOYW1lXSA9IG5ldyBQcm9wZXJ0eUluZm9SZWNvcmQoYXR0cmlidXRlTmFtZSwgU1RSSU5HLCBmYWxzZSwgLy8gbXVzdFVzZVByb3BlcnR5XG4gIGF0dHJpYnV0ZU5hbWUudG9Mb3dlckNhc2UoKSwgLy8gYXR0cmlidXRlTmFtZVxuICBudWxsLCAvLyBhdHRyaWJ1dGVOYW1lc3BhY2VcbiAgdHJ1ZSk7XG59KTtcblxudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMSA9IG51bGw7XG5cbntcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbn0gLy8gQSBqYXZhc2NyaXB0OiBVUkwgY2FuIGNvbnRhaW4gbGVhZGluZyBDMCBjb250cm9sIG9yIFxcdTAwMjAgU1BBQ0UsXG4vLyBhbmQgYW55IG5ld2xpbmUgb3IgdGFiIGFyZSBmaWx0ZXJlZCBvdXQgYXMgaWYgdGhleSdyZSBub3QgcGFydCBvZiB0aGUgVVJMLlxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmwtcGFyc2luZ1xuLy8gVGFiIG9yIG5ld2xpbmUgYXJlIGRlZmluZWQgYXMgXFxyXFxuXFx0OlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI2FzY2lpLXRhYi1vci1uZXdsaW5lXG4vLyBBIEMwIGNvbnRyb2wgaXMgYSBjb2RlIHBvaW50IGluIHRoZSByYW5nZSBcXHUwMDAwIE5VTEwgdG8gXFx1MDAxRlxuLy8gSU5GT1JNQVRJT04gU0VQQVJBVE9SIE9ORSwgaW5jbHVzaXZlOlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI2MwLWNvbnRyb2wtb3Itc3BhY2VcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cbnZhciBpc0phdmFTY3JpcHRQcm90b2NvbCA9IC9eW1xcdTAwMDAtXFx1MDAxRiBdKmpbXFxyXFxuXFx0XSphW1xcclxcblxcdF0qdltcXHJcXG5cXHRdKmFbXFxyXFxuXFx0XSpzW1xcclxcblxcdF0qY1tcXHJcXG5cXHRdKnJbXFxyXFxuXFx0XSppW1xcclxcblxcdF0qcFtcXHJcXG5cXHRdKnRbXFxyXFxuXFx0XSpcXDovaTtcbnZhciBkaWRXYXJuID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNhbml0aXplVVJMKHVybCkge1xuICB7XG4gICAgaWYgKCFkaWRXYXJuICYmIGlzSmF2YVNjcmlwdFByb3RvY29sLnRlc3QodXJsKSkge1xuICAgICAgZGlkV2FybiA9IHRydWU7XG5cbiAgICAgIGVycm9yKCdBIGZ1dHVyZSB2ZXJzaW9uIG9mIFJlYWN0IHdpbGwgYmxvY2sgamF2YXNjcmlwdDogVVJMcyBhcyBhIHNlY3VyaXR5IHByZWNhdXRpb24uICcgKyAnVXNlIGV2ZW50IGhhbmRsZXJzIGluc3RlYWQgaWYgeW91IGNhbi4gSWYgeW91IG5lZWQgdG8gZ2VuZXJhdGUgdW5zYWZlIEhUTUwgdHJ5ICcgKyAndXNpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgaW5zdGVhZC4gUmVhY3Qgd2FzIHBhc3NlZCAlcy4nLCBKU09OLnN0cmluZ2lmeSh1cmwpKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gY29kZSBjb3BpZWQgYW5kIG1vZGlmaWVkIGZyb20gZXNjYXBlLWh0bWxcblxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xudmFyIG1hdGNoSHRtbFJlZ0V4cCA9IC9bXCInJjw+XS87XG4vKipcbiAqIEVzY2FwZXMgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBIVE1MIGVudGl0aWVzIGluIGEgZ2l2ZW4gaHRtbCBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmcgSFRNTCBzdHJpbmcgdG8gZXNjYXBlIGZvciBsYXRlciBpbnNlcnRpb25cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICB2YXIgc3RyID0gJycgKyBzdHJpbmc7XG4gIHZhciBtYXRjaCA9IG1hdGNoSHRtbFJlZ0V4cC5leGVjKHN0cik7XG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICB2YXIgZXNjYXBlO1xuICB2YXIgaHRtbCA9ICcnO1xuICB2YXIgaW5kZXg7XG4gIHZhciBsYXN0SW5kZXggPSAwO1xuXG4gIGZvciAoaW5kZXggPSBtYXRjaC5pbmRleDsgaW5kZXggPCBzdHIubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgc3dpdGNoIChzdHIuY2hhckNvZGVBdChpbmRleCkpIHtcbiAgICAgIGNhc2UgMzQ6XG4gICAgICAgIC8vIFwiXG4gICAgICAgIGVzY2FwZSA9ICcmcXVvdDsnO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzODpcbiAgICAgICAgLy8gJlxuICAgICAgICBlc2NhcGUgPSAnJmFtcDsnO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOTpcbiAgICAgICAgLy8gJ1xuICAgICAgICBlc2NhcGUgPSAnJiN4Mjc7JzsgLy8gbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbDsgdXNlZCB0byBiZSAnJiMzOSdcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA2MDpcbiAgICAgICAgLy8gPFxuICAgICAgICBlc2NhcGUgPSAnJmx0Oyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDYyOlxuICAgICAgICAvLyA+XG4gICAgICAgIGVzY2FwZSA9ICcmZ3Q7JztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChsYXN0SW5kZXggIT09IGluZGV4KSB7XG4gICAgICBodG1sICs9IHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCk7XG4gICAgfVxuXG4gICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgIGh0bWwgKz0gZXNjYXBlO1xuICB9XG5cbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gaW5kZXggPyBodG1sICsgc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KSA6IGh0bWw7XG59IC8vIGVuZCBjb2RlIGNvcGllZCBhbmQgbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbFxuXG4vKipcbiAqIEVzY2FwZXMgdGV4dCB0byBwcmV2ZW50IHNjcmlwdGluZyBhdHRhY2tzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGV4dCBUZXh0IHZhbHVlIHRvIGVzY2FwZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gQW4gZXNjYXBlZCBzdHJpbmcuXG4gKi9cblxuXG5mdW5jdGlvbiBlc2NhcGVUZXh0Rm9yQnJvd3Nlcih0ZXh0KSB7XG4gIGlmICh0eXBlb2YgdGV4dCA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiB0ZXh0ID09PSAnbnVtYmVyJykge1xuICAgIC8vIHRoaXMgc2hvcnRjaXJjdWl0IGhlbHBzIHBlcmYgZm9yIHR5cGVzIHRoYXQgd2Uga25vdyB3aWxsIG5ldmVyIGhhdmVcbiAgICAvLyBzcGVjaWFsIGNoYXJhY3RlcnMsIGVzcGVjaWFsbHkgZ2l2ZW4gdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgb2Z0ZW5cbiAgICAvLyBmb3IgbnVtZXJpYyBkb20gaWRzLlxuICAgIHJldHVybiAnJyArIHRleHQ7XG4gIH1cblxuICByZXR1cm4gZXNjYXBlSHRtbCh0ZXh0KTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIGF0dHJpYnV0ZSB2YWx1ZSB0byBwcmV2ZW50IHNjcmlwdGluZyBhdHRhY2tzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSBBbiBlc2NhcGVkIHN0cmluZy5cbiAqL1xuXG5mdW5jdGlvbiBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcih2YWx1ZSkge1xuICByZXR1cm4gJ1wiJyArIGVzY2FwZVRleHRGb3JCcm93c2VyKHZhbHVlKSArICdcIic7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcmt1cEZvclJvb3QoKSB7XG4gIHJldHVybiBST09UX0FUVFJJQlVURV9OQU1FICsgJz1cIlwiJztcbn1cbi8qKlxuICogQ3JlYXRlcyBtYXJrdXAgZm9yIGEgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4gez9zdHJpbmd9IE1hcmt1cCBzdHJpbmcsIG9yIG51bGwgaWYgdGhlIHByb3BlcnR5IHdhcyBpbnZhbGlkLlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcmt1cEZvclByb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUluZm8gPSBnZXRQcm9wZXJ0eUluZm8obmFtZSk7XG5cbiAgaWYgKG5hbWUgIT09ICdzdHlsZScgJiYgc2hvdWxkSWdub3JlQXR0cmlidXRlKG5hbWUsIHByb3BlcnR5SW5mbywgZmFsc2UpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKHNob3VsZFJlbW92ZUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgcHJvcGVydHlJbmZvLCBmYWxzZSkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAocHJvcGVydHlJbmZvICE9PSBudWxsKSB7XG4gICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBwcm9wZXJ0eUluZm8uYXR0cmlidXRlTmFtZTtcbiAgICB2YXIgdHlwZSA9IHByb3BlcnR5SW5mby50eXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IEJPT0xFQU4gfHwgdHlwZSA9PT0gT1ZFUkxPQURFRF9CT09MRUFOICYmIHZhbHVlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gYXR0cmlidXRlTmFtZSArICc9XCJcIic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9wZXJ0eUluZm8uc2FuaXRpemVVUkwpIHtcbiAgICAgICAgdmFsdWUgPSAnJyArIHZhbHVlO1xuICAgICAgICBzYW5pdGl6ZVVSTCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lICsgJz0nICsgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXIodmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZU5hbWVTYWZlKG5hbWUpKSB7XG4gICAgcmV0dXJuIG5hbWUgKyAnPScgKyBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcih2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG4vKipcbiAqIENyZWF0ZXMgbWFya3VwIGZvciBhIGN1c3RvbSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7c3RyaW5nfSBNYXJrdXAgc3RyaW5nLCBvciBlbXB0eSBzdHJpbmcgaWYgdGhlIHByb3BlcnR5IHdhcyBpbnZhbGlkLlxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcmt1cEZvckN1c3RvbUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICBpZiAoIWlzQXR0cmlidXRlTmFtZVNhZmUobmFtZSkgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJz0nICsgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIHJldHVybiB4ID09PSB5ICYmICh4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geSkgfHwgeCAhPT0geCAmJiB5ICE9PSB5IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIDtcbn1cblxudmFyIG9iamVjdElzID0gdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IGlzO1xuXG52YXIgY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50ID0gbnVsbDtcbnZhciBmaXJzdFdvcmtJblByb2dyZXNzSG9vayA9IG51bGw7XG52YXIgd29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDsgLy8gV2hldGhlciB0aGUgd29yay1pbi1wcm9ncmVzcyBob29rIGlzIGEgcmUtcmVuZGVyZWQgaG9va1xuXG52YXIgaXNSZVJlbmRlciA9IGZhbHNlOyAvLyBXaGV0aGVyIGFuIHVwZGF0ZSB3YXMgc2NoZWR1bGVkIGR1cmluZyB0aGUgY3VycmVudGx5IGV4ZWN1dGluZyByZW5kZXIgcGFzcy5cblxudmFyIGRpZFNjaGVkdWxlUmVuZGVyUGhhc2VVcGRhdGUgPSBmYWxzZTsgLy8gTGF6aWx5IGNyZWF0ZWQgbWFwIG9mIHJlbmRlci1waGFzZSB1cGRhdGVzXG5cbnZhciByZW5kZXJQaGFzZVVwZGF0ZXMgPSBudWxsOyAvLyBDb3VudGVyIHRvIHByZXZlbnQgaW5maW5pdGUgbG9vcHMuXG5cbnZhciBudW1iZXJPZlJlUmVuZGVycyA9IDA7XG52YXIgUkVfUkVOREVSX0xJTUlUID0gMjU7XG52YXIgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gZmFsc2U7IC8vIEluIERFViwgdGhpcyBpcyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IGV4ZWN1dGluZyBwcmltaXRpdmUgaG9va1xuXG52YXIgY3VycmVudEhvb2tOYW1lSW5EZXY7XG5cbmZ1bmN0aW9uIHJlc29sdmVDdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQoKSB7XG4gIGlmICghKGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCAhPT0gbnVsbCkpIHtcbiAgICB7XG4gICAgICB0aHJvdyBFcnJvciggXCJJbnZhbGlkIGhvb2sgY2FsbC4gSG9va3MgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBvZiB0aGUgYm9keSBvZiBhIGZ1bmN0aW9uIGNvbXBvbmVudC4gVGhpcyBjb3VsZCBoYXBwZW4gZm9yIG9uZSBvZiB0aGUgZm9sbG93aW5nIHJlYXNvbnM6XFxuMS4gWW91IG1pZ2h0IGhhdmUgbWlzbWF0Y2hpbmcgdmVyc2lvbnMgb2YgUmVhY3QgYW5kIHRoZSByZW5kZXJlciAoc3VjaCBhcyBSZWFjdCBET00pXFxuMi4gWW91IG1pZ2h0IGJlIGJyZWFraW5nIHRoZSBSdWxlcyBvZiBIb29rc1xcbjMuIFlvdSBtaWdodCBoYXZlIG1vcmUgdGhhbiBvbmUgY29weSBvZiBSZWFjdCBpbiB0aGUgc2FtZSBhcHBcXG5TZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1pbnZhbGlkLWhvb2stY2FsbCBmb3IgdGlwcyBhYm91dCBob3cgdG8gZGVidWcgYW5kIGZpeCB0aGlzIHByb2JsZW0uXCIgKTtcbiAgICB9XG4gIH1cblxuICB7XG4gICAgaWYgKGlzSW5Ib29rVXNlckNvZGVJbkRldikge1xuICAgICAgZXJyb3IoJ0RvIG5vdCBjYWxsIEhvb2tzIGluc2lkZSB1c2VFZmZlY3QoLi4uKSwgdXNlTWVtbyguLi4pLCBvciBvdGhlciBidWlsdC1pbiBIb29rcy4gJyArICdZb3UgY2FuIG9ubHkgY2FsbCBIb29rcyBhdCB0aGUgdG9wIGxldmVsIG9mIHlvdXIgUmVhY3QgZnVuY3Rpb24uICcgKyAnRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSAnICsgJ2h0dHBzOi8vZmIubWUvcnVsZXMtb2YtaG9va3MnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBhcmVIb29rSW5wdXRzRXF1YWwobmV4dERlcHMsIHByZXZEZXBzKSB7XG4gIGlmIChwcmV2RGVwcyA9PT0gbnVsbCkge1xuICAgIHtcbiAgICAgIGVycm9yKCclcyByZWNlaXZlZCBhIGZpbmFsIGFyZ3VtZW50IGR1cmluZyB0aGlzIHJlbmRlciwgYnV0IG5vdCBkdXJpbmcgJyArICd0aGUgcHJldmlvdXMgcmVuZGVyLiBFdmVuIHRob3VnaCB0aGUgZmluYWwgYXJndW1lbnQgaXMgb3B0aW9uYWwsICcgKyAnaXRzIHR5cGUgY2Fubm90IGNoYW5nZSBiZXR3ZWVuIHJlbmRlcnMuJywgY3VycmVudEhvb2tOYW1lSW5EZXYpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHtcbiAgICAvLyBEb24ndCBib3RoZXIgY29tcGFyaW5nIGxlbmd0aHMgaW4gcHJvZCBiZWNhdXNlIHRoZXNlIGFycmF5cyBzaG91bGQgYmVcbiAgICAvLyBwYXNzZWQgaW5saW5lLlxuICAgIGlmIChuZXh0RGVwcy5sZW5ndGggIT09IHByZXZEZXBzLmxlbmd0aCkge1xuICAgICAgZXJyb3IoJ1RoZSBmaW5hbCBhcmd1bWVudCBwYXNzZWQgdG8gJXMgY2hhbmdlZCBzaXplIGJldHdlZW4gcmVuZGVycy4gVGhlICcgKyAnb3JkZXIgYW5kIHNpemUgb2YgdGhpcyBhcnJheSBtdXN0IHJlbWFpbiBjb25zdGFudC5cXG5cXG4nICsgJ1ByZXZpb3VzOiAlc1xcbicgKyAnSW5jb21pbmc6ICVzJywgY3VycmVudEhvb2tOYW1lSW5EZXYsIFwiW1wiICsgbmV4dERlcHMuam9pbignLCAnKSArIFwiXVwiLCBcIltcIiArIHByZXZEZXBzLmpvaW4oJywgJykgKyBcIl1cIik7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2RGVwcy5sZW5ndGggJiYgaSA8IG5leHREZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG9iamVjdElzKG5leHREZXBzW2ldLCBwcmV2RGVwc1tpXSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIb29rKCkge1xuICBpZiAobnVtYmVyT2ZSZVJlbmRlcnMgPiAwKSB7XG4gICAge1xuICAgICAge1xuICAgICAgICB0aHJvdyBFcnJvciggXCJSZW5kZXJlZCBtb3JlIGhvb2tzIHRoYW4gZHVyaW5nIHRoZSBwcmV2aW91cyByZW5kZXJcIiApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWVtb2l6ZWRTdGF0ZTogbnVsbCxcbiAgICBxdWV1ZTogbnVsbCxcbiAgICBuZXh0OiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdvcmtJblByb2dyZXNzSG9vaygpIHtcbiAgaWYgKHdvcmtJblByb2dyZXNzSG9vayA9PT0gbnVsbCkge1xuICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGhvb2sgaW4gdGhlIGxpc3RcbiAgICBpZiAoZmlyc3RXb3JrSW5Qcm9ncmVzc0hvb2sgPT09IG51bGwpIHtcbiAgICAgIGlzUmVSZW5kZXIgPSBmYWxzZTtcbiAgICAgIGZpcnN0V29ya0luUHJvZ3Jlc3NIb29rID0gd29ya0luUHJvZ3Jlc3NIb29rID0gY3JlYXRlSG9vaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGVyZSdzIGFscmVhZHkgYSB3b3JrLWluLXByb2dyZXNzLiBSZXVzZSBpdC5cbiAgICAgIGlzUmVSZW5kZXIgPSB0cnVlO1xuICAgICAgd29ya0luUHJvZ3Jlc3NIb29rID0gZmlyc3RXb3JrSW5Qcm9ncmVzc0hvb2s7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh3b3JrSW5Qcm9ncmVzc0hvb2submV4dCA9PT0gbnVsbCkge1xuICAgICAgaXNSZVJlbmRlciA9IGZhbHNlOyAvLyBBcHBlbmQgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuXG4gICAgICB3b3JrSW5Qcm9ncmVzc0hvb2sgPSB3b3JrSW5Qcm9ncmVzc0hvb2submV4dCA9IGNyZWF0ZUhvb2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlcmUncyBhbHJlYWR5IGEgd29yay1pbi1wcm9ncmVzcy4gUmV1c2UgaXQuXG4gICAgICBpc1JlUmVuZGVyID0gdHJ1ZTtcbiAgICAgIHdvcmtJblByb2dyZXNzSG9vayA9IHdvcmtJblByb2dyZXNzSG9vay5uZXh0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3b3JrSW5Qcm9ncmVzc0hvb2s7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVUb1VzZUhvb2tzKGNvbXBvbmVudElkZW50aXR5KSB7XG4gIGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCA9IGNvbXBvbmVudElkZW50aXR5O1xuXG4gIHtcbiAgICBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSBmYWxzZTtcbiAgfSAvLyBUaGUgZm9sbG93aW5nIHNob3VsZCBoYXZlIGFscmVhZHkgYmVlbiByZXNldFxuICAvLyBkaWRTY2hlZHVsZVJlbmRlclBoYXNlVXBkYXRlID0gZmFsc2U7XG4gIC8vIGZpcnN0V29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDtcbiAgLy8gbnVtYmVyT2ZSZVJlbmRlcnMgPSAwO1xuICAvLyByZW5kZXJQaGFzZVVwZGF0ZXMgPSBudWxsO1xuICAvLyB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBudWxsO1xuXG59XG5mdW5jdGlvbiBmaW5pc2hIb29rcyhDb21wb25lbnQsIHByb3BzLCBjaGlsZHJlbiwgcmVmT3JDb250ZXh0KSB7XG4gIC8vIFRoaXMgbXVzdCBiZSBjYWxsZWQgYWZ0ZXIgZXZlcnkgZnVuY3Rpb24gY29tcG9uZW50IHRvIHByZXZlbnQgaG9va3MgZnJvbVxuICAvLyBiZWluZyB1c2VkIGluIGNsYXNzZXMuXG4gIHdoaWxlIChkaWRTY2hlZHVsZVJlbmRlclBoYXNlVXBkYXRlKSB7XG4gICAgLy8gVXBkYXRlcyB3ZXJlIHNjaGVkdWxlZCBkdXJpbmcgdGhlIHJlbmRlciBwaGFzZS4gVGhleSBhcmUgc3RvcmVkIGluXG4gICAgLy8gdGhlIGByZW5kZXJQaGFzZVVwZGF0ZXNgIG1hcC4gQ2FsbCB0aGUgY29tcG9uZW50IGFnYWluLCByZXVzaW5nIHRoZVxuICAgIC8vIHdvcmstaW4tcHJvZ3Jlc3MgaG9va3MgYW5kIGFwcGx5aW5nIHRoZSBhZGRpdGlvbmFsIHVwZGF0ZXMgb24gdG9wLiBLZWVwXG4gICAgLy8gcmVzdGFydGluZyB1bnRpbCBubyBtb3JlIHVwZGF0ZXMgYXJlIHNjaGVkdWxlZC5cbiAgICBkaWRTY2hlZHVsZVJlbmRlclBoYXNlVXBkYXRlID0gZmFsc2U7XG4gICAgbnVtYmVyT2ZSZVJlbmRlcnMgKz0gMTsgLy8gU3RhcnQgb3ZlciBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RcblxuICAgIHdvcmtJblByb2dyZXNzSG9vayA9IG51bGw7XG4gICAgY2hpbGRyZW4gPSBDb21wb25lbnQocHJvcHMsIHJlZk9yQ29udGV4dCk7XG4gIH1cblxuICBjdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQgPSBudWxsO1xuICBmaXJzdFdvcmtJblByb2dyZXNzSG9vayA9IG51bGw7XG4gIG51bWJlck9mUmVSZW5kZXJzID0gMDtcbiAgcmVuZGVyUGhhc2VVcGRhdGVzID0gbnVsbDtcbiAgd29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDtcblxuICB7XG4gICAgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gZmFsc2U7XG4gIH0gLy8gVGhlc2Ugd2VyZSByZXNldCBhYm92ZVxuICAvLyBjdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQgPSBudWxsO1xuICAvLyBkaWRTY2hlZHVsZVJlbmRlclBoYXNlVXBkYXRlID0gZmFsc2U7XG4gIC8vIGZpcnN0V29ya0luUHJvZ3Jlc3NIb29rID0gbnVsbDtcbiAgLy8gbnVtYmVyT2ZSZVJlbmRlcnMgPSAwO1xuICAvLyByZW5kZXJQaGFzZVVwZGF0ZXMgPSBudWxsO1xuICAvLyB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBudWxsO1xuXG5cbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiByZWFkQ29udGV4dChjb250ZXh0LCBvYnNlcnZlZEJpdHMpIHtcbiAgdmFyIHRocmVhZElEID0gY3VycmVudFRocmVhZElEO1xuICB2YWxpZGF0ZUNvbnRleHRCb3VuZHMoY29udGV4dCwgdGhyZWFkSUQpO1xuXG4gIHtcbiAgICBpZiAoaXNJbkhvb2tVc2VyQ29kZUluRGV2KSB7XG4gICAgICBlcnJvcignQ29udGV4dCBjYW4gb25seSBiZSByZWFkIHdoaWxlIFJlYWN0IGlzIHJlbmRlcmluZy4gJyArICdJbiBjbGFzc2VzLCB5b3UgY2FuIHJlYWQgaXQgaW4gdGhlIHJlbmRlciBtZXRob2Qgb3IgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzLiAnICsgJ0luIGZ1bmN0aW9uIGNvbXBvbmVudHMsIHlvdSBjYW4gcmVhZCBpdCBkaXJlY3RseSBpbiB0aGUgZnVuY3Rpb24gYm9keSwgYnV0IG5vdCAnICsgJ2luc2lkZSBIb29rcyBsaWtlIHVzZVJlZHVjZXIoKSBvciB1c2VNZW1vKCkuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbnRleHRbdGhyZWFkSURdO1xufVxuXG5mdW5jdGlvbiB1c2VDb250ZXh0KGNvbnRleHQsIG9ic2VydmVkQml0cykge1xuICB7XG4gICAgY3VycmVudEhvb2tOYW1lSW5EZXYgPSAndXNlQ29udGV4dCc7XG4gIH1cblxuICByZXNvbHZlQ3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50KCk7XG4gIHZhciB0aHJlYWRJRCA9IGN1cnJlbnRUaHJlYWRJRDtcbiAgdmFsaWRhdGVDb250ZXh0Qm91bmRzKGNvbnRleHQsIHRocmVhZElEKTtcbiAgcmV0dXJuIGNvbnRleHRbdGhyZWFkSURdO1xufVxuXG5mdW5jdGlvbiBiYXNpY1N0YXRlUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIC8vICRGbG93Rml4TWU6IEZsb3cgZG9lc24ndCBsaWtlIG1peGVkIHR5cGVzXG4gIHJldHVybiB0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nID8gYWN0aW9uKHN0YXRlKSA6IGFjdGlvbjtcbn1cblxuZnVuY3Rpb24gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSB7XG4gIHtcbiAgICBjdXJyZW50SG9va05hbWVJbkRldiA9ICd1c2VTdGF0ZSc7XG4gIH1cblxuICByZXR1cm4gdXNlUmVkdWNlcihiYXNpY1N0YXRlUmVkdWNlciwgLy8gdXNlUmVkdWNlciBoYXMgYSBzcGVjaWFsIGNhc2UgdG8gc3VwcG9ydCBsYXp5IHVzZVN0YXRlIGluaXRpYWxpemVyc1xuICBpbml0aWFsU3RhdGUpO1xufVxuZnVuY3Rpb24gdXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsQXJnLCBpbml0KSB7XG4gIHtcbiAgICBpZiAocmVkdWNlciAhPT0gYmFzaWNTdGF0ZVJlZHVjZXIpIHtcbiAgICAgIGN1cnJlbnRIb29rTmFtZUluRGV2ID0gJ3VzZVJlZHVjZXInO1xuICAgIH1cbiAgfVxuXG4gIGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCA9IHJlc29sdmVDdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQoKTtcbiAgd29ya0luUHJvZ3Jlc3NIb29rID0gY3JlYXRlV29ya0luUHJvZ3Jlc3NIb29rKCk7XG5cbiAgaWYgKGlzUmVSZW5kZXIpIHtcbiAgICAvLyBUaGlzIGlzIGEgcmUtcmVuZGVyLiBBcHBseSB0aGUgbmV3IHJlbmRlciBwaGFzZSB1cGRhdGVzIHRvIHRoZSBwcmV2aW91c1xuICAgIC8vIGN1cnJlbnQgaG9vay5cbiAgICB2YXIgcXVldWUgPSB3b3JrSW5Qcm9ncmVzc0hvb2sucXVldWU7XG4gICAgdmFyIGRpc3BhdGNoID0gcXVldWUuZGlzcGF0Y2g7XG5cbiAgICBpZiAocmVuZGVyUGhhc2VVcGRhdGVzICE9PSBudWxsKSB7XG4gICAgICAvLyBSZW5kZXIgcGhhc2UgdXBkYXRlcyBhcmUgc3RvcmVkIGluIGEgbWFwIG9mIHF1ZXVlIC0+IGxpbmtlZCBsaXN0XG4gICAgICB2YXIgZmlyc3RSZW5kZXJQaGFzZVVwZGF0ZSA9IHJlbmRlclBoYXNlVXBkYXRlcy5nZXQocXVldWUpO1xuXG4gICAgICBpZiAoZmlyc3RSZW5kZXJQaGFzZVVwZGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlbmRlclBoYXNlVXBkYXRlcy5kZWxldGUocXVldWUpO1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSB3b3JrSW5Qcm9ncmVzc0hvb2subWVtb2l6ZWRTdGF0ZTtcbiAgICAgICAgdmFyIHVwZGF0ZSA9IGZpcnN0UmVuZGVyUGhhc2VVcGRhdGU7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIC8vIFByb2Nlc3MgdGhpcyByZW5kZXIgcGhhc2UgdXBkYXRlLiBXZSBkb24ndCBoYXZlIHRvIGNoZWNrIHRoZVxuICAgICAgICAgIC8vIHByaW9yaXR5IGJlY2F1c2UgaXQgd2lsbCBhbHdheXMgYmUgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnRcbiAgICAgICAgICAvLyByZW5kZXIncy5cbiAgICAgICAgICB2YXIgYWN0aW9uID0gdXBkYXRlLmFjdGlvbjtcblxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlzSW5Ib29rVXNlckNvZGVJbkRldiA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV3U3RhdGUgPSByZWR1Y2VyKG5ld1N0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlID0gdXBkYXRlLm5leHQ7XG4gICAgICAgIH0gd2hpbGUgKHVwZGF0ZSAhPT0gbnVsbCk7XG5cbiAgICAgICAgd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgcmV0dXJuIFtuZXdTdGF0ZSwgZGlzcGF0Y2hdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGUsIGRpc3BhdGNoXTtcbiAgfSBlbHNlIHtcbiAgICB7XG4gICAgICBpc0luSG9va1VzZXJDb2RlSW5EZXYgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsU3RhdGU7XG5cbiAgICBpZiAocmVkdWNlciA9PT0gYmFzaWNTdGF0ZVJlZHVjZXIpIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYHVzZVN0YXRlYC5cbiAgICAgIGluaXRpYWxTdGF0ZSA9IHR5cGVvZiBpbml0aWFsQXJnID09PSAnZnVuY3Rpb24nID8gaW5pdGlhbEFyZygpIDogaW5pdGlhbEFyZztcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbFN0YXRlID0gaW5pdCAhPT0gdW5kZWZpbmVkID8gaW5pdChpbml0aWFsQXJnKSA6IGluaXRpYWxBcmc7XG4gICAgfVxuXG4gICAge1xuICAgICAgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGUgPSBpbml0aWFsU3RhdGU7XG5cbiAgICB2YXIgX3F1ZXVlID0gd29ya0luUHJvZ3Jlc3NIb29rLnF1ZXVlID0ge1xuICAgICAgbGFzdDogbnVsbCxcbiAgICAgIGRpc3BhdGNoOiBudWxsXG4gICAgfTtcblxuICAgIHZhciBfZGlzcGF0Y2ggPSBfcXVldWUuZGlzcGF0Y2ggPSBkaXNwYXRjaEFjdGlvbi5iaW5kKG51bGwsIGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCwgX3F1ZXVlKTtcblxuICAgIHJldHVybiBbd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGUsIF9kaXNwYXRjaF07XG4gIH1cbn1cblxuZnVuY3Rpb24gdXNlTWVtbyhuZXh0Q3JlYXRlLCBkZXBzKSB7XG4gIGN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCA9IHJlc29sdmVDdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQoKTtcbiAgd29ya0luUHJvZ3Jlc3NIb29rID0gY3JlYXRlV29ya0luUHJvZ3Jlc3NIb29rKCk7XG4gIHZhciBuZXh0RGVwcyA9IGRlcHMgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZXBzO1xuXG4gIGlmICh3b3JrSW5Qcm9ncmVzc0hvb2sgIT09IG51bGwpIHtcbiAgICB2YXIgcHJldlN0YXRlID0gd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGU7XG5cbiAgICBpZiAocHJldlN0YXRlICE9PSBudWxsKSB7XG4gICAgICBpZiAobmV4dERlcHMgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIHByZXZEZXBzID0gcHJldlN0YXRlWzFdO1xuXG4gICAgICAgIGlmIChhcmVIb29rSW5wdXRzRXF1YWwobmV4dERlcHMsIHByZXZEZXBzKSkge1xuICAgICAgICAgIHJldHVybiBwcmV2U3RhdGVbMF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB7XG4gICAgaXNJbkhvb2tVc2VyQ29kZUluRGV2ID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBuZXh0VmFsdWUgPSBuZXh0Q3JlYXRlKCk7XG5cbiAge1xuICAgIGlzSW5Ib29rVXNlckNvZGVJbkRldiA9IGZhbHNlO1xuICB9XG5cbiAgd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGUgPSBbbmV4dFZhbHVlLCBuZXh0RGVwc107XG4gIHJldHVybiBuZXh0VmFsdWU7XG59XG5cbmZ1bmN0aW9uIHVzZVJlZihpbml0aWFsVmFsdWUpIHtcbiAgY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50ID0gcmVzb2x2ZUN1cnJlbnRseVJlbmRlcmluZ0NvbXBvbmVudCgpO1xuICB3b3JrSW5Qcm9ncmVzc0hvb2sgPSBjcmVhdGVXb3JrSW5Qcm9ncmVzc0hvb2soKTtcbiAgdmFyIHByZXZpb3VzUmVmID0gd29ya0luUHJvZ3Jlc3NIb29rLm1lbW9pemVkU3RhdGU7XG5cbiAgaWYgKHByZXZpb3VzUmVmID09PSBudWxsKSB7XG4gICAgdmFyIHJlZiA9IHtcbiAgICAgIGN1cnJlbnQ6IGluaXRpYWxWYWx1ZVxuICAgIH07XG5cbiAgICB7XG4gICAgICBPYmplY3Quc2VhbChyZWYpO1xuICAgIH1cblxuICAgIHdvcmtJblByb2dyZXNzSG9vay5tZW1vaXplZFN0YXRlID0gcmVmO1xuICAgIHJldHVybiByZWY7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByZXZpb3VzUmVmO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVzZUxheW91dEVmZmVjdChjcmVhdGUsIGlucHV0cykge1xuICB7XG4gICAgY3VycmVudEhvb2tOYW1lSW5EZXYgPSAndXNlTGF5b3V0RWZmZWN0JztcblxuICAgIGVycm9yKCd1c2VMYXlvdXRFZmZlY3QgZG9lcyBub3RoaW5nIG9uIHRoZSBzZXJ2ZXIsIGJlY2F1c2UgaXRzIGVmZmVjdCBjYW5ub3QgJyArIFwiYmUgZW5jb2RlZCBpbnRvIHRoZSBzZXJ2ZXIgcmVuZGVyZXIncyBvdXRwdXQgZm9ybWF0LiBUaGlzIHdpbGwgbGVhZCBcIiArICd0byBhIG1pc21hdGNoIGJldHdlZW4gdGhlIGluaXRpYWwsIG5vbi1oeWRyYXRlZCBVSSBhbmQgdGhlIGludGVuZGVkICcgKyAnVUkuIFRvIGF2b2lkIHRoaXMsIHVzZUxheW91dEVmZmVjdCBzaG91bGQgb25seSBiZSB1c2VkIGluICcgKyAnY29tcG9uZW50cyB0aGF0IHJlbmRlciBleGNsdXNpdmVseSBvbiB0aGUgY2xpZW50LiAnICsgJ1NlZSBodHRwczovL2ZiLm1lL3JlYWN0LXVzZWxheW91dGVmZmVjdC1zc3IgZm9yIGNvbW1vbiBmaXhlcy4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEFjdGlvbihjb21wb25lbnRJZGVudGl0eSwgcXVldWUsIGFjdGlvbikge1xuICBpZiAoIShudW1iZXJPZlJlUmVuZGVycyA8IFJFX1JFTkRFUl9MSU1JVCkpIHtcbiAgICB7XG4gICAgICB0aHJvdyBFcnJvciggXCJUb28gbWFueSByZS1yZW5kZXJzLiBSZWFjdCBsaW1pdHMgdGhlIG51bWJlciBvZiByZW5kZXJzIHRvIHByZXZlbnQgYW4gaW5maW5pdGUgbG9vcC5cIiApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb21wb25lbnRJZGVudGl0eSA9PT0gY3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50KSB7XG4gICAgLy8gVGhpcyBpcyBhIHJlbmRlciBwaGFzZSB1cGRhdGUuIFN0YXNoIGl0IGluIGEgbGF6aWx5LWNyZWF0ZWQgbWFwIG9mXG4gICAgLy8gcXVldWUgLT4gbGlua2VkIGxpc3Qgb2YgdXBkYXRlcy4gQWZ0ZXIgdGhpcyByZW5kZXIgcGFzcywgd2UnbGwgcmVzdGFydFxuICAgIC8vIGFuZCBhcHBseSB0aGUgc3Rhc2hlZCB1cGRhdGVzIG9uIHRvcCBvZiB0aGUgd29yay1pbi1wcm9ncmVzcyBob29rLlxuICAgIGRpZFNjaGVkdWxlUmVuZGVyUGhhc2VVcGRhdGUgPSB0cnVlO1xuICAgIHZhciB1cGRhdGUgPSB7XG4gICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgIG5leHQ6IG51bGxcbiAgICB9O1xuXG4gICAgaWYgKHJlbmRlclBoYXNlVXBkYXRlcyA9PT0gbnVsbCkge1xuICAgICAgcmVuZGVyUGhhc2VVcGRhdGVzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIHZhciBmaXJzdFJlbmRlclBoYXNlVXBkYXRlID0gcmVuZGVyUGhhc2VVcGRhdGVzLmdldChxdWV1ZSk7XG5cbiAgICBpZiAoZmlyc3RSZW5kZXJQaGFzZVVwZGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZW5kZXJQaGFzZVVwZGF0ZXMuc2V0KHF1ZXVlLCB1cGRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBcHBlbmQgdGhlIHVwZGF0ZSB0byB0aGUgZW5kIG9mIHRoZSBsaXN0LlxuICAgICAgdmFyIGxhc3RSZW5kZXJQaGFzZVVwZGF0ZSA9IGZpcnN0UmVuZGVyUGhhc2VVcGRhdGU7XG5cbiAgICAgIHdoaWxlIChsYXN0UmVuZGVyUGhhc2VVcGRhdGUubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICBsYXN0UmVuZGVyUGhhc2VVcGRhdGUgPSBsYXN0UmVuZGVyUGhhc2VVcGRhdGUubmV4dDtcbiAgICAgIH1cblxuICAgICAgbGFzdFJlbmRlclBoYXNlVXBkYXRlLm5leHQgPSB1cGRhdGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVzZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXBzKSB7XG4gIC8vIENhbGxiYWNrcyBhcmUgcGFzc2VkIGFzIHRoZXkgYXJlIGluIHRoZSBzZXJ2ZXIgZW52aXJvbm1lbnQuXG4gIHJldHVybiBjYWxsYmFjaztcbn1cblxuZnVuY3Rpb24gdXNlUmVzcG9uZGVyKHJlc3BvbmRlciwgcHJvcHMpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczogcHJvcHMsXG4gICAgcmVzcG9uZGVyOiByZXNwb25kZXJcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXNlRGVmZXJyZWRWYWx1ZSh2YWx1ZSwgY29uZmlnKSB7XG4gIHJlc29sdmVDdXJyZW50bHlSZW5kZXJpbmdDb21wb25lbnQoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiB1c2VUcmFuc2l0aW9uKGNvbmZpZykge1xuICByZXNvbHZlQ3VycmVudGx5UmVuZGVyaW5nQ29tcG9uZW50KCk7XG5cbiAgdmFyIHN0YXJ0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKCk7XG4gIH07XG5cbiAgcmV0dXJuIFtzdGFydFRyYW5zaXRpb24sIGZhbHNlXTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBjdXJyZW50VGhyZWFkSUQgPSAwO1xuZnVuY3Rpb24gc2V0Q3VycmVudFRocmVhZElEKHRocmVhZElEKSB7XG4gIGN1cnJlbnRUaHJlYWRJRCA9IHRocmVhZElEO1xufVxudmFyIERpc3BhdGNoZXIgPSB7XG4gIHJlYWRDb250ZXh0OiByZWFkQ29udGV4dCxcbiAgdXNlQ29udGV4dDogdXNlQ29udGV4dCxcbiAgdXNlTWVtbzogdXNlTWVtbyxcbiAgdXNlUmVkdWNlcjogdXNlUmVkdWNlcixcbiAgdXNlUmVmOiB1c2VSZWYsXG4gIHVzZVN0YXRlOiB1c2VTdGF0ZSxcbiAgdXNlTGF5b3V0RWZmZWN0OiB1c2VMYXlvdXRFZmZlY3QsXG4gIHVzZUNhbGxiYWNrOiB1c2VDYWxsYmFjayxcbiAgLy8gdXNlSW1wZXJhdGl2ZUhhbmRsZSBpcyBub3QgcnVuIGluIHRoZSBzZXJ2ZXIgZW52aXJvbm1lbnRcbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZTogbm9vcCxcbiAgLy8gRWZmZWN0cyBhcmUgbm90IHJ1biBpbiB0aGUgc2VydmVyIGVudmlyb25tZW50LlxuICB1c2VFZmZlY3Q6IG5vb3AsXG4gIC8vIERlYnVnZ2luZyBlZmZlY3RcbiAgdXNlRGVidWdWYWx1ZTogbm9vcCxcbiAgdXNlUmVzcG9uZGVyOiB1c2VSZXNwb25kZXIsXG4gIHVzZURlZmVycmVkVmFsdWU6IHVzZURlZmVycmVkVmFsdWUsXG4gIHVzZVRyYW5zaXRpb246IHVzZVRyYW5zaXRpb25cbn07XG5cbnZhciBIVE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbnZhciBNQVRIX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJztcbnZhciBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbnZhciBOYW1lc3BhY2VzID0ge1xuICBodG1sOiBIVE1MX05BTUVTUEFDRSxcbiAgbWF0aG1sOiBNQVRIX05BTUVTUEFDRSxcbiAgc3ZnOiBTVkdfTkFNRVNQQUNFXG59OyAvLyBBc3N1bWVzIHRoZXJlIGlzIG5vIHBhcmVudCBuYW1lc3BhY2UuXG5cbmZ1bmN0aW9uIGdldEludHJpbnNpY05hbWVzcGFjZSh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3N2Zyc6XG4gICAgICByZXR1cm4gU1ZHX05BTUVTUEFDRTtcblxuICAgIGNhc2UgJ21hdGgnOlxuICAgICAgcmV0dXJuIE1BVEhfTkFNRVNQQUNFO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBIVE1MX05BTUVTUEFDRTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0Q2hpbGROYW1lc3BhY2UocGFyZW50TmFtZXNwYWNlLCB0eXBlKSB7XG4gIGlmIChwYXJlbnROYW1lc3BhY2UgPT0gbnVsbCB8fCBwYXJlbnROYW1lc3BhY2UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgLy8gTm8gKG9yIGRlZmF1bHQpIHBhcmVudCBuYW1lc3BhY2U6IHBvdGVudGlhbCBlbnRyeSBwb2ludC5cbiAgICByZXR1cm4gZ2V0SW50cmluc2ljTmFtZXNwYWNlKHR5cGUpO1xuICB9XG5cbiAgaWYgKHBhcmVudE5hbWVzcGFjZSA9PT0gU1ZHX05BTUVTUEFDRSAmJiB0eXBlID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICAvLyBXZSdyZSBsZWF2aW5nIFNWRy5cbiAgICByZXR1cm4gSFRNTF9OQU1FU1BBQ0U7XG4gIH0gLy8gQnkgZGVmYXVsdCwgcGFzcyBuYW1lc3BhY2UgYmVsb3cuXG5cblxuICByZXR1cm4gcGFyZW50TmFtZXNwYWNlO1xufVxuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQyID0gbnVsbDtcbnZhciBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcyA9IHtcbiAgY2hlY2tQcm9wVHlwZXM6IG51bGxcbn07XG5cbntcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgdmFyIGhhc1JlYWRPbmx5VmFsdWUgPSB7XG4gICAgYnV0dG9uOiB0cnVlLFxuICAgIGNoZWNrYm94OiB0cnVlLFxuICAgIGltYWdlOiB0cnVlLFxuICAgIGhpZGRlbjogdHJ1ZSxcbiAgICByYWRpbzogdHJ1ZSxcbiAgICByZXNldDogdHJ1ZSxcbiAgICBzdWJtaXQ6IHRydWVcbiAgfTtcbiAgdmFyIHByb3BUeXBlcyA9IHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgICAgaWYgKGhhc1JlYWRPbmx5VmFsdWVbcHJvcHMudHlwZV0gfHwgcHJvcHMub25DaGFuZ2UgfHwgcHJvcHMucmVhZE9ubHkgfHwgcHJvcHMuZGlzYWJsZWQgfHwgcHJvcHNbcHJvcE5hbWVdID09IG51bGwgfHwgZW5hYmxlRGVwcmVjYXRlZEZsYXJlQVBJICkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignWW91IHByb3ZpZGVkIGEgYHZhbHVlYCBwcm9wIHRvIGEgZm9ybSBmaWVsZCB3aXRob3V0IGFuICcgKyAnYG9uQ2hhbmdlYCBoYW5kbGVyLiBUaGlzIHdpbGwgcmVuZGVyIGEgcmVhZC1vbmx5IGZpZWxkLiBJZiAnICsgJ3RoZSBmaWVsZCBzaG91bGQgYmUgbXV0YWJsZSB1c2UgYGRlZmF1bHRWYWx1ZWAuIE90aGVyd2lzZSwgJyArICdzZXQgZWl0aGVyIGBvbkNoYW5nZWAgb3IgYHJlYWRPbmx5YC4nKTtcbiAgICB9LFxuICAgIGNoZWNrZWQ6IGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICAgIGlmIChwcm9wcy5vbkNoYW5nZSB8fCBwcm9wcy5yZWFkT25seSB8fCBwcm9wcy5kaXNhYmxlZCB8fCBwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCB8fCBlbmFibGVEZXByZWNhdGVkRmxhcmVBUEkgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdZb3UgcHJvdmlkZWQgYSBgY2hlY2tlZGAgcHJvcCB0byBhIGZvcm0gZmllbGQgd2l0aG91dCBhbiAnICsgJ2BvbkNoYW5nZWAgaGFuZGxlci4gVGhpcyB3aWxsIHJlbmRlciBhIHJlYWQtb25seSBmaWVsZC4gSWYgJyArICd0aGUgZmllbGQgc2hvdWxkIGJlIG11dGFibGUgdXNlIGBkZWZhdWx0Q2hlY2tlZGAuIE90aGVyd2lzZSwgJyArICdzZXQgZWl0aGVyIGBvbkNoYW5nZWAgb3IgYHJlYWRPbmx5YC4nKTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBQcm92aWRlIGEgbGlua2VkIGB2YWx1ZWAgYXR0cmlidXRlIGZvciBjb250cm9sbGVkIGZvcm1zLiBZb3Ugc2hvdWxkIG5vdCB1c2VcbiAgICogdGhpcyBvdXRzaWRlIG9mIHRoZSBSZWFjdERPTSBjb250cm9sbGVkIGZvcm0gY29tcG9uZW50cy5cbiAgICovXG5cbiAgUmVhY3RDb250cm9sbGVkVmFsdWVQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcHMpIHtcbiAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIHByb3BzLCAncHJvcCcsIHRhZ05hbWUsIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMi5nZXRTdGFja0FkZGVuZHVtKTtcbiAgfTtcbn1cblxuLy8gRm9yIEhUTUwsIGNlcnRhaW4gdGFncyBzaG91bGQgb21pdCB0aGVpciBjbG9zZSB0YWcuIFdlIGtlZXAgYSB3aGl0ZWxpc3QgZm9yXG4vLyB0aG9zZSBzcGVjaWFsLWNhc2UgdGFncy5cbnZhciBvbWl0dGVkQ2xvc2VUYWdzID0ge1xuICBhcmVhOiB0cnVlLFxuICBiYXNlOiB0cnVlLFxuICBicjogdHJ1ZSxcbiAgY29sOiB0cnVlLFxuICBlbWJlZDogdHJ1ZSxcbiAgaHI6IHRydWUsXG4gIGltZzogdHJ1ZSxcbiAgaW5wdXQ6IHRydWUsXG4gIGtleWdlbjogdHJ1ZSxcbiAgbGluazogdHJ1ZSxcbiAgbWV0YTogdHJ1ZSxcbiAgcGFyYW06IHRydWUsXG4gIHNvdXJjZTogdHJ1ZSxcbiAgdHJhY2s6IHRydWUsXG4gIHdicjogdHJ1ZSAvLyBOT1RFOiBtZW51aXRlbSdzIGNsb3NlIHRhZyBzaG91bGQgYmUgb21pdHRlZCwgYnV0IHRoYXQgY2F1c2VzIHByb2JsZW1zLlxuXG59O1xuXG4vLyBgb21pdHRlZENsb3NlVGFnc2AgZXhjZXB0IHRoYXQgYG1lbnVpdGVtYCBzaG91bGQgc3RpbGwgaGF2ZSBpdHMgY2xvc2luZyB0YWcuXG5cbnZhciB2b2lkRWxlbWVudFRhZ3MgPSBfYXNzaWduKHtcbiAgbWVudWl0ZW06IHRydWVcbn0sIG9taXR0ZWRDbG9zZVRhZ3MpO1xuXG52YXIgSFRNTCA9ICdfX2h0bWwnO1xudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMyA9IG51bGw7XG5cbntcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQzID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0VmFsaWRQcm9wcyh0YWcsIHByb3BzKSB7XG4gIGlmICghcHJvcHMpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gTm90ZSB0aGUgdXNlIG9mIGA9PWAgd2hpY2ggY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZC5cblxuXG4gIGlmICh2b2lkRWxlbWVudFRhZ3NbdGFnXSkge1xuICAgIGlmICghKHByb3BzLmNoaWxkcmVuID09IG51bGwgJiYgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPT0gbnVsbCkpIHtcbiAgICAgIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoIHRhZyArIFwiIGlzIGEgdm9pZCBlbGVtZW50IHRhZyBhbmQgbXVzdCBuZWl0aGVyIGhhdmUgYGNoaWxkcmVuYCBub3IgdXNlIGBkYW5nZXJvdXNseVNldElubmVySFRNTGAuXCIgKyAoIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMy5nZXRTdGFja0FkZGVuZHVtKCkgKSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAhPSBudWxsKSB7XG4gICAgaWYgKCEocHJvcHMuY2hpbGRyZW4gPT0gbnVsbCkpIHtcbiAgICAgIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoIFwiQ2FuIG9ubHkgc2V0IG9uZSBvZiBgY2hpbGRyZW5gIG9yIGBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTGAuXCIgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoISh0eXBlb2YgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPT09ICdvYmplY3QnICYmIEhUTUwgaW4gcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpKSB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCBcImBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTGAgbXVzdCBiZSBpbiB0aGUgZm9ybSBge19faHRtbDogLi4ufWAuIFBsZWFzZSB2aXNpdCBodHRwczovL2ZiLm1lL3JlYWN0LWludmFyaWFudC1kYW5nZXJvdXNseS1zZXQtaW5uZXItaHRtbCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cIiApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBpZiAoIXByb3BzLnN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyAmJiBwcm9wcy5jb250ZW50RWRpdGFibGUgJiYgcHJvcHMuY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgZXJyb3IoJ0EgY29tcG9uZW50IGlzIGBjb250ZW50RWRpdGFibGVgIGFuZCBjb250YWlucyBgY2hpbGRyZW5gIG1hbmFnZWQgYnkgJyArICdSZWFjdC4gSXQgaXMgbm93IHlvdXIgcmVzcG9uc2liaWxpdHkgdG8gZ3VhcmFudGVlIHRoYXQgbm9uZSBvZiAnICsgJ3Rob3NlIG5vZGVzIGFyZSB1bmV4cGVjdGVkbHkgbW9kaWZpZWQgb3IgZHVwbGljYXRlZC4gVGhpcyBpcyAnICsgJ3Byb2JhYmx5IG5vdCBpbnRlbnRpb25hbC4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIShwcm9wcy5zdHlsZSA9PSBudWxsIHx8IHR5cGVvZiBwcm9wcy5zdHlsZSA9PT0gJ29iamVjdCcpKSB7XG4gICAge1xuICAgICAgdGhyb3cgRXJyb3IoIFwiVGhlIGBzdHlsZWAgcHJvcCBleHBlY3RzIGEgbWFwcGluZyBmcm9tIHN0eWxlIHByb3BlcnRpZXMgdG8gdmFsdWVzLCBub3QgYSBzdHJpbmcuIEZvciBleGFtcGxlLCBzdHlsZT17e21hcmdpblJpZ2h0OiBzcGFjaW5nICsgJ2VtJ319IHdoZW4gdXNpbmcgSlNYLlwiICsgKCBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDMuZ2V0U3RhY2tBZGRlbmR1bSgpICkgKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDU1MgcHJvcGVydGllcyB3aGljaCBhY2NlcHQgbnVtYmVycyBidXQgYXJlIG5vdCBpbiB1bml0cyBvZiBcInB4XCIuXG4gKi9cbnZhciBpc1VuaXRsZXNzTnVtYmVyID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VPdXRzZXQ6IHRydWUsXG4gIGJvcmRlckltYWdlU2xpY2U6IHRydWUsXG4gIGJvcmRlckltYWdlV2lkdGg6IHRydWUsXG4gIGJveEZsZXg6IHRydWUsXG4gIGJveEZsZXhHcm91cDogdHJ1ZSxcbiAgYm94T3JkaW5hbEdyb3VwOiB0cnVlLFxuICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgY29sdW1uczogdHJ1ZSxcbiAgZmxleDogdHJ1ZSxcbiAgZmxleEdyb3c6IHRydWUsXG4gIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgZmxleFNocmluazogdHJ1ZSxcbiAgZmxleE5lZ2F0aXZlOiB0cnVlLFxuICBmbGV4T3JkZXI6IHRydWUsXG4gIGdyaWRBcmVhOiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkUm93RW5kOiB0cnVlLFxuICBncmlkUm93U3BhbjogdHJ1ZSxcbiAgZ3JpZFJvd1N0YXJ0OiB0cnVlLFxuICBncmlkQ29sdW1uOiB0cnVlLFxuICBncmlkQ29sdW1uRW5kOiB0cnVlLFxuICBncmlkQ29sdW1uU3BhbjogdHJ1ZSxcbiAgZ3JpZENvbHVtblN0YXJ0OiB0cnVlLFxuICBmb250V2VpZ2h0OiB0cnVlLFxuICBsaW5lQ2xhbXA6IHRydWUsXG4gIGxpbmVIZWlnaHQ6IHRydWUsXG4gIG9wYWNpdHk6IHRydWUsXG4gIG9yZGVyOiB0cnVlLFxuICBvcnBoYW5zOiB0cnVlLFxuICB0YWJTaXplOiB0cnVlLFxuICB3aWRvd3M6IHRydWUsXG4gIHpJbmRleDogdHJ1ZSxcbiAgem9vbTogdHJ1ZSxcbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgZmxvb2RPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaGFycmF5OiB0cnVlLFxuICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICBzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCB2ZW5kb3Itc3BlY2lmaWMgcHJlZml4LCBlZzogV2Via2l0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHN0eWxlIG5hbWUsIGVnOiB0cmFuc2l0aW9uRHVyYXRpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gc3R5bGUgbmFtZSBwcmVmaXhlZCB3aXRoIGBwcmVmaXhgLCBwcm9wZXJseSBjYW1lbENhc2VkLCBlZzpcbiAqIFdlYmtpdFRyYW5zaXRpb25EdXJhdGlvblxuICovXG5cbmZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn1cbi8qKlxuICogU3VwcG9ydCBzdHlsZSBuYW1lcyB0aGF0IG1heSBjb21lIHBhc3NlZCBpbiBwcmVmaXhlZCBieSBhZGRpbmcgcGVybXV0YXRpb25zXG4gKiBvZiB2ZW5kb3IgcHJlZml4ZXMuXG4gKi9cblxuXG52YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdtcycsICdNb3onLCAnTyddOyAvLyBVc2luZyBPYmplY3Qua2V5cyBoZXJlLCBvciBlbHNlIHRoZSB2YW5pbGxhIGZvci1pbiBsb29wIG1ha2VzIElFOCBnbyBpbnRvIGFuXG4vLyBpbmZpbml0ZSBsb29wLCBiZWNhdXNlIGl0IGl0ZXJhdGVzIG92ZXIgdGhlIG5ld2x5IGFkZGVkIHByb3BzIHRvby5cblxuT2JqZWN0LmtleXMoaXNVbml0bGVzc051bWJlcikuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICBwcmVmaXhlcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBpc1VuaXRsZXNzTnVtYmVyW3ByZWZpeEtleShwcmVmaXgsIHByb3ApXSA9IGlzVW5pdGxlc3NOdW1iZXJbcHJvcF07XG4gIH0pO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIHZhbHVlIGludG8gdGhlIHByb3BlciBjc3Mgd3JpdGFibGUgdmFsdWUuIFRoZSBzdHlsZSBuYW1lIGBuYW1lYFxuICogc2hvdWxkIGJlIGxvZ2ljYWwgKG5vIGh5cGhlbnMpLCBhcyBzcGVjaWZpZWRcbiAqIGluIGBDU1NQcm9wZXJ0eS5pc1VuaXRsZXNzTnVtYmVyYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBDU1MgcHJvcGVydHkgbmFtZSBzdWNoIGFzIGB0b3BNYXJnaW5gLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBDU1MgcHJvcGVydHkgdmFsdWUgc3VjaCBhcyBgMTBweGAuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IE5vcm1hbGl6ZWQgc3R5bGUgdmFsdWUgd2l0aCBkaW1lbnNpb25zIGFwcGxpZWQuXG4gKi9cblxuZnVuY3Rpb24gZGFuZ2Vyb3VzU3R5bGVWYWx1ZShuYW1lLCB2YWx1ZSwgaXNDdXN0b21Qcm9wZXJ0eSkge1xuICAvLyBOb3RlIHRoYXQgd2UndmUgcmVtb3ZlZCBlc2NhcGVUZXh0Rm9yQnJvd3NlcigpIGNhbGxzIGhlcmUgc2luY2UgdGhlXG4gIC8vIHdob2xlIHN0cmluZyB3aWxsIGJlIGVzY2FwZWQgd2hlbiB0aGUgYXR0cmlidXRlIGlzIGluamVjdGVkIGludG9cbiAgLy8gdGhlIG1hcmt1cC4gSWYgeW91IHByb3ZpZGUgdW5zYWZlIHVzZXIgZGF0YSBoZXJlIHRoZXkgY2FuIGluamVjdFxuICAvLyBhcmJpdHJhcnkgQ1NTIHdoaWNoIG1heSBiZSBwcm9ibGVtYXRpYyAoSSBjb3VsZG4ndCByZXBybyB0aGlzKTpcbiAgLy8gaHR0cHM6Ly93d3cub3dhc3Aub3JnL2luZGV4LnBocC9YU1NfRmlsdGVyX0V2YXNpb25fQ2hlYXRfU2hlZXRcbiAgLy8gaHR0cDovL3d3dy50aGVzcGFubmVyLmNvLnVrLzIwMDcvMTEvMjYvdWx0aW1hdGUteHNzLWNzcy1pbmplY3Rpb24vXG4gIC8vIFRoaXMgaXMgbm90IGFuIFhTUyBob2xlIGJ1dCBpbnN0ZWFkIGEgcG90ZW50aWFsIENTUyBpbmplY3Rpb24gaXNzdWVcbiAgLy8gd2hpY2ggaGFzIGxlYWQgdG8gYSBncmVhdGVyIGRpc2N1c3Npb24gYWJvdXQgaG93IHdlJ3JlIGdvaW5nIHRvXG4gIC8vIHRydXN0IFVSTHMgbW92aW5nIGZvcndhcmQuIFNlZSAjMjExNTkwMVxuICB2YXIgaXNFbXB0eSA9IHZhbHVlID09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT09ICcnO1xuXG4gIGlmIChpc0VtcHR5KSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKCFpc0N1c3RvbVByb3BlcnR5ICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUgIT09IDAgJiYgIShpc1VuaXRsZXNzTnVtYmVyLmhhc093blByb3BlcnR5KG5hbWUpICYmIGlzVW5pdGxlc3NOdW1iZXJbbmFtZV0pKSB7XG4gICAgcmV0dXJuIHZhbHVlICsgJ3B4JzsgLy8gUHJlc3VtZXMgaW1wbGljaXQgJ3B4JyBzdWZmaXggZm9yIHVuaXRsZXNzIG51bWJlcnNcbiAgfVxuXG4gIHJldHVybiAoJycgKyB2YWx1ZSkudHJpbSgpO1xufVxuXG52YXIgdXBwZXJjYXNlUGF0dGVybiA9IC8oW0EtWl0pL2c7XG52YXIgbXNQYXR0ZXJuID0gL15tcy0vO1xuLyoqXG4gKiBIeXBoZW5hdGVzIGEgY2FtZWxjYXNlZCBDU1MgcHJvcGVydHkgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnTW96VHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbW96LXRyYW5zaXRpb25cIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnbXNUcmFuc2l0aW9uJylcbiAqICAgPCBcIi1tcy10cmFuc2l0aW9uXCJcbiAqXG4gKiBBcyBNb2Rlcm5penIgc3VnZ2VzdHMgKGh0dHA6Ly9tb2Rlcm5penIuY29tL2RvY3MvI3ByZWZpeGVkKSwgYW4gYG1zYCBwcmVmaXhcbiAqIGlzIGNvbnZlcnRlZCB0byBgLW1zLWAuXG4gKi9cblxuZnVuY3Rpb24gaHlwaGVuYXRlU3R5bGVOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUucmVwbGFjZSh1cHBlcmNhc2VQYXR0ZXJuLCAnLSQxJykudG9Mb3dlckNhc2UoKS5yZXBsYWNlKG1zUGF0dGVybiwgJy1tcy0nKTtcbn1cblxuZnVuY3Rpb24gaXNDdXN0b21Db21wb25lbnQodGFnTmFtZSwgcHJvcHMpIHtcbiAgaWYgKHRhZ05hbWUuaW5kZXhPZignLScpID09PSAtMSkge1xuICAgIHJldHVybiB0eXBlb2YgcHJvcHMuaXMgPT09ICdzdHJpbmcnO1xuICB9XG5cbiAgc3dpdGNoICh0YWdOYW1lKSB7XG4gICAgLy8gVGhlc2UgYXJlIHJlc2VydmVkIFNWRyBhbmQgTWF0aE1MIGVsZW1lbnRzLlxuICAgIC8vIFdlIGRvbid0IG1pbmQgdGhpcyB3aGl0ZWxpc3QgdG9vIG11Y2ggYmVjYXVzZSB3ZSBleHBlY3QgaXQgdG8gbmV2ZXIgZ3Jvdy5cbiAgICAvLyBUaGUgYWx0ZXJuYXRpdmUgaXMgdG8gdHJhY2sgdGhlIG5hbWVzcGFjZSBpbiBhIGZldyBwbGFjZXMgd2hpY2ggaXMgY29udm9sdXRlZC5cbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3VzdG9tLWVsZW1lbnRzLWNvcmUtY29uY2VwdHNcbiAgICBjYXNlICdhbm5vdGF0aW9uLXhtbCc6XG4gICAgY2FzZSAnY29sb3ItcHJvZmlsZSc6XG4gICAgY2FzZSAnZm9udC1mYWNlJzpcbiAgICBjYXNlICdmb250LWZhY2Utc3JjJzpcbiAgICBjYXNlICdmb250LWZhY2UtdXJpJzpcbiAgICBjYXNlICdmb250LWZhY2UtZm9ybWF0JzpcbiAgICBjYXNlICdmb250LWZhY2UtbmFtZSc6XG4gICAgY2FzZSAnbWlzc2luZy1nbHlwaCc6XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxudmFyIHdhcm5WYWxpZFN0eWxlID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgLy8gJ21zVHJhbnNmb3JtJyBpcyBjb3JyZWN0LCBidXQgdGhlIG90aGVyIHByZWZpeGVzIHNob3VsZCBiZSBjYXBpdGFsaXplZFxuICB2YXIgYmFkVmVuZG9yZWRTdHlsZU5hbWVQYXR0ZXJuID0gL14oPzp3ZWJraXR8bW96fG8pW0EtWl0vO1xuICB2YXIgbXNQYXR0ZXJuJDEgPSAvXi1tcy0vO1xuICB2YXIgaHlwaGVuUGF0dGVybiA9IC8tKC4pL2c7IC8vIHN0eWxlIHZhbHVlcyBzaG91bGRuJ3QgY29udGFpbiBhIHNlbWljb2xvblxuXG4gIHZhciBiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4gPSAvO1xccyokLztcbiAgdmFyIHdhcm5lZFN0eWxlTmFtZXMgPSB7fTtcbiAgdmFyIHdhcm5lZFN0eWxlVmFsdWVzID0ge307XG4gIHZhciB3YXJuZWRGb3JOYU5WYWx1ZSA9IGZhbHNlO1xuICB2YXIgd2FybmVkRm9ySW5maW5pdHlWYWx1ZSA9IGZhbHNlO1xuXG4gIHZhciBjYW1lbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoaHlwaGVuUGF0dGVybiwgZnVuY3Rpb24gKF8sIGNoYXJhY3Rlcikge1xuICAgICAgcmV0dXJuIGNoYXJhY3Rlci50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHZhciB3YXJuSHlwaGVuYXRlZFN0eWxlTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0gPSB0cnVlO1xuXG4gICAgZXJyb3IoJ1Vuc3VwcG9ydGVkIHN0eWxlIHByb3BlcnR5ICVzLiBEaWQgeW91IG1lYW4gJXM/JywgbmFtZSwgLy8gQXMgQW5kaSBTbWl0aCBzdWdnZXN0c1xuICAgIC8vIChodHRwOi8vd3d3LmFuZGlzbWl0aC5jb20vYmxvZy8yMDEyLzAyL21vZGVybml6ci1wcmVmaXhlZC8pLCBhbiBgLW1zYCBwcmVmaXhcbiAgICAvLyBpcyBjb252ZXJ0ZWQgdG8gbG93ZXJjYXNlIGBtc2AuXG4gICAgY2FtZWxpemUobmFtZS5yZXBsYWNlKG1zUGF0dGVybiQxLCAnbXMtJykpKTtcbiAgfTtcblxuICB2YXIgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAod2FybmVkU3R5bGVOYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB3YXJuZWRTdHlsZU5hbWVzW25hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSA9IHRydWU7XG5cbiAgICBlcnJvcignVW5zdXBwb3J0ZWQgdmVuZG9yLXByZWZpeGVkIHN0eWxlIHByb3BlcnR5ICVzLiBEaWQgeW91IG1lYW4gJXM/JywgbmFtZSwgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSkpO1xuICB9O1xuXG4gIHZhciB3YXJuU3R5bGVWYWx1ZVdpdGhTZW1pY29sb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAod2FybmVkU3R5bGVWYWx1ZXMuaGFzT3duUHJvcGVydHkodmFsdWUpICYmIHdhcm5lZFN0eWxlVmFsdWVzW3ZhbHVlXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlVmFsdWVzW3ZhbHVlXSA9IHRydWU7XG5cbiAgICBlcnJvcihcIlN0eWxlIHByb3BlcnR5IHZhbHVlcyBzaG91bGRuJ3QgY29udGFpbiBhIHNlbWljb2xvbi4gXCIgKyAnVHJ5IFwiJXM6ICVzXCIgaW5zdGVhZC4nLCBuYW1lLCB2YWx1ZS5yZXBsYWNlKGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybiwgJycpKTtcbiAgfTtcblxuICB2YXIgd2FyblN0eWxlVmFsdWVJc05hTiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh3YXJuZWRGb3JOYU5WYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZEZvck5hTlZhbHVlID0gdHJ1ZTtcblxuICAgIGVycm9yKCdgTmFOYCBpcyBhbiBpbnZhbGlkIHZhbHVlIGZvciB0aGUgYCVzYCBjc3Mgc3R5bGUgcHJvcGVydHkuJywgbmFtZSk7XG4gIH07XG5cbiAgdmFyIHdhcm5TdHlsZVZhbHVlSXNJbmZpbml0eSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh3YXJuZWRGb3JJbmZpbml0eVZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkRm9ySW5maW5pdHlWYWx1ZSA9IHRydWU7XG5cbiAgICBlcnJvcignYEluZmluaXR5YCBpcyBhbiBpbnZhbGlkIHZhbHVlIGZvciB0aGUgYCVzYCBjc3Mgc3R5bGUgcHJvcGVydHkuJywgbmFtZSk7XG4gIH07XG5cbiAgd2FyblZhbGlkU3R5bGUgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAobmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgd2Fybkh5cGhlbmF0ZWRTdHlsZU5hbWUobmFtZSk7XG4gICAgfSBlbHNlIGlmIChiYWRWZW5kb3JlZFN0eWxlTmFtZVBhdHRlcm4udGVzdChuYW1lKSkge1xuICAgICAgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lKG5hbWUpO1xuICAgIH0gZWxzZSBpZiAoYmFkU3R5bGVWYWx1ZVdpdGhTZW1pY29sb25QYXR0ZXJuLnRlc3QodmFsdWUpKSB7XG4gICAgICB3YXJuU3R5bGVWYWx1ZVdpdGhTZW1pY29sb24obmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHdhcm5TdHlsZVZhbHVlSXNOYU4obmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICghaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgIHdhcm5TdHlsZVZhbHVlSXNJbmZpbml0eShuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG52YXIgd2FyblZhbGlkU3R5bGUkMSA9IHdhcm5WYWxpZFN0eWxlO1xuXG52YXIgYXJpYVByb3BlcnRpZXMgPSB7XG4gICdhcmlhLWN1cnJlbnQnOiAwLFxuICAvLyBzdGF0ZVxuICAnYXJpYS1kZXRhaWxzJzogMCxcbiAgJ2FyaWEtZGlzYWJsZWQnOiAwLFxuICAvLyBzdGF0ZVxuICAnYXJpYS1oaWRkZW4nOiAwLFxuICAvLyBzdGF0ZVxuICAnYXJpYS1pbnZhbGlkJzogMCxcbiAgLy8gc3RhdGVcbiAgJ2FyaWEta2V5c2hvcnRjdXRzJzogMCxcbiAgJ2FyaWEtbGFiZWwnOiAwLFxuICAnYXJpYS1yb2xlZGVzY3JpcHRpb24nOiAwLFxuICAvLyBXaWRnZXQgQXR0cmlidXRlc1xuICAnYXJpYS1hdXRvY29tcGxldGUnOiAwLFxuICAnYXJpYS1jaGVja2VkJzogMCxcbiAgJ2FyaWEtZXhwYW5kZWQnOiAwLFxuICAnYXJpYS1oYXNwb3B1cCc6IDAsXG4gICdhcmlhLWxldmVsJzogMCxcbiAgJ2FyaWEtbW9kYWwnOiAwLFxuICAnYXJpYS1tdWx0aWxpbmUnOiAwLFxuICAnYXJpYS1tdWx0aXNlbGVjdGFibGUnOiAwLFxuICAnYXJpYS1vcmllbnRhdGlvbic6IDAsXG4gICdhcmlhLXBsYWNlaG9sZGVyJzogMCxcbiAgJ2FyaWEtcHJlc3NlZCc6IDAsXG4gICdhcmlhLXJlYWRvbmx5JzogMCxcbiAgJ2FyaWEtcmVxdWlyZWQnOiAwLFxuICAnYXJpYS1zZWxlY3RlZCc6IDAsXG4gICdhcmlhLXNvcnQnOiAwLFxuICAnYXJpYS12YWx1ZW1heCc6IDAsXG4gICdhcmlhLXZhbHVlbWluJzogMCxcbiAgJ2FyaWEtdmFsdWVub3cnOiAwLFxuICAnYXJpYS12YWx1ZXRleHQnOiAwLFxuICAvLyBMaXZlIFJlZ2lvbiBBdHRyaWJ1dGVzXG4gICdhcmlhLWF0b21pYyc6IDAsXG4gICdhcmlhLWJ1c3knOiAwLFxuICAnYXJpYS1saXZlJzogMCxcbiAgJ2FyaWEtcmVsZXZhbnQnOiAwLFxuICAvLyBEcmFnLWFuZC1Ecm9wIEF0dHJpYnV0ZXNcbiAgJ2FyaWEtZHJvcGVmZmVjdCc6IDAsXG4gICdhcmlhLWdyYWJiZWQnOiAwLFxuICAvLyBSZWxhdGlvbnNoaXAgQXR0cmlidXRlc1xuICAnYXJpYS1hY3RpdmVkZXNjZW5kYW50JzogMCxcbiAgJ2FyaWEtY29sY291bnQnOiAwLFxuICAnYXJpYS1jb2xpbmRleCc6IDAsXG4gICdhcmlhLWNvbHNwYW4nOiAwLFxuICAnYXJpYS1jb250cm9scyc6IDAsXG4gICdhcmlhLWRlc2NyaWJlZGJ5JzogMCxcbiAgJ2FyaWEtZXJyb3JtZXNzYWdlJzogMCxcbiAgJ2FyaWEtZmxvd3RvJzogMCxcbiAgJ2FyaWEtbGFiZWxsZWRieSc6IDAsXG4gICdhcmlhLW93bnMnOiAwLFxuICAnYXJpYS1wb3NpbnNldCc6IDAsXG4gICdhcmlhLXJvd2NvdW50JzogMCxcbiAgJ2FyaWEtcm93aW5kZXgnOiAwLFxuICAnYXJpYS1yb3dzcGFuJzogMCxcbiAgJ2FyaWEtc2V0c2l6ZSc6IDBcbn07XG5cbnZhciB3YXJuZWRQcm9wZXJ0aWVzID0ge307XG52YXIgckFSSUEgPSBuZXcgUmVnRXhwKCdeKGFyaWEpLVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcbnZhciByQVJJQUNhbWVsID0gbmV3IFJlZ0V4cCgnXihhcmlhKVtBLVpdWycgKyBBVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xudmFyIGhhc093blByb3BlcnR5JDEgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnR5KHRhZ05hbWUsIG5hbWUpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwod2FybmVkUHJvcGVydGllcywgbmFtZSkgJiYgd2FybmVkUHJvcGVydGllc1tuYW1lXSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHJBUklBQ2FtZWwudGVzdChuYW1lKSkge1xuICAgICAgdmFyIGFyaWFOYW1lID0gJ2FyaWEtJyArIG5hbWUuc2xpY2UoNCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBjb3JyZWN0TmFtZSA9IGFyaWFQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGFyaWFOYW1lKSA/IGFyaWFOYW1lIDogbnVsbDsgLy8gSWYgdGhpcyBpcyBhbiBhcmlhLSogYXR0cmlidXRlLCBidXQgaXMgbm90IGxpc3RlZCBpbiB0aGUga25vd24gRE9NXG4gICAgICAvLyBET00gcHJvcGVydGllcywgdGhlbiBpdCBpcyBhbiBpbnZhbGlkIGFyaWEtKiBhdHRyaWJ1dGUuXG5cbiAgICAgIGlmIChjb3JyZWN0TmFtZSA9PSBudWxsKSB7XG4gICAgICAgIGVycm9yKCdJbnZhbGlkIEFSSUEgYXR0cmlidXRlIGAlc2AuIEFSSUEgYXR0cmlidXRlcyBmb2xsb3cgdGhlIHBhdHRlcm4gYXJpYS0qIGFuZCBtdXN0IGJlIGxvd2VyY2FzZS4nLCBuYW1lKTtcblxuICAgICAgICB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IC8vIGFyaWEtKiBhdHRyaWJ1dGVzIHNob3VsZCBiZSBsb3dlcmNhc2U7IHN1Z2dlc3QgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uLlxuXG5cbiAgICAgIGlmIChuYW1lICE9PSBjb3JyZWN0TmFtZSkge1xuICAgICAgICBlcnJvcignSW52YWxpZCBBUklBIGF0dHJpYnV0ZSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8nLCBuYW1lLCBjb3JyZWN0TmFtZSk7XG5cbiAgICAgICAgd2FybmVkUHJvcGVydGllc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyQVJJQS50ZXN0KG5hbWUpKSB7XG4gICAgICB2YXIgbG93ZXJDYXNlZE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgc3RhbmRhcmROYW1lID0gYXJpYVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobG93ZXJDYXNlZE5hbWUpID8gbG93ZXJDYXNlZE5hbWUgOiBudWxsOyAvLyBJZiB0aGlzIGlzIGFuIGFyaWEtKiBhdHRyaWJ1dGUsIGJ1dCBpcyBub3QgbGlzdGVkIGluIHRoZSBrbm93biBET01cbiAgICAgIC8vIERPTSBwcm9wZXJ0aWVzLCB0aGVuIGl0IGlzIGFuIGludmFsaWQgYXJpYS0qIGF0dHJpYnV0ZS5cblxuICAgICAgaWYgKHN0YW5kYXJkTmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IC8vIGFyaWEtKiBhdHRyaWJ1dGVzIHNob3VsZCBiZSBsb3dlcmNhc2U7IHN1Z2dlc3QgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uLlxuXG5cbiAgICAgIGlmIChuYW1lICE9PSBzdGFuZGFyZE5hbWUpIHtcbiAgICAgICAgZXJyb3IoJ1Vua25vd24gQVJJQSBhdHRyaWJ1dGUgYCVzYC4gRGlkIHlvdSBtZWFuIGAlc2A/JywgbmFtZSwgc3RhbmRhcmROYW1lKTtcblxuICAgICAgICB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHdhcm5JbnZhbGlkQVJJQVByb3BzKHR5cGUsIHByb3BzKSB7XG4gIHtcbiAgICB2YXIgaW52YWxpZFByb3BzID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHZhciBpc1ZhbGlkID0gdmFsaWRhdGVQcm9wZXJ0eSh0eXBlLCBrZXkpO1xuXG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgaW52YWxpZFByb3BzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdW5rbm93blByb3BTdHJpbmcgPSBpbnZhbGlkUHJvcHMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICByZXR1cm4gJ2AnICsgcHJvcCArICdgJztcbiAgICB9KS5qb2luKCcsICcpO1xuXG4gICAgaWYgKGludmFsaWRQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGVycm9yKCdJbnZhbGlkIGFyaWEgcHJvcCAlcyBvbiA8JXM+IHRhZy4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvaW52YWxpZC1hcmlhLXByb3AnLCB1bmtub3duUHJvcFN0cmluZywgdHlwZSk7XG4gICAgfSBlbHNlIGlmIChpbnZhbGlkUHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgZXJyb3IoJ0ludmFsaWQgYXJpYSBwcm9wcyAlcyBvbiA8JXM+IHRhZy4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvaW52YWxpZC1hcmlhLXByb3AnLCB1bmtub3duUHJvcFN0cmluZywgdHlwZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydGllcyh0eXBlLCBwcm9wcykge1xuICBpZiAoaXNDdXN0b21Db21wb25lbnQodHlwZSwgcHJvcHMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2FybkludmFsaWRBUklBUHJvcHModHlwZSwgcHJvcHMpO1xufVxuXG52YXIgZGlkV2FyblZhbHVlTnVsbCA9IGZhbHNlO1xuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0aWVzJDEodHlwZSwgcHJvcHMpIHtcbiAge1xuICAgIGlmICh0eXBlICE9PSAnaW5wdXQnICYmIHR5cGUgIT09ICd0ZXh0YXJlYScgJiYgdHlwZSAhPT0gJ3NlbGVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMgIT0gbnVsbCAmJiBwcm9wcy52YWx1ZSA9PT0gbnVsbCAmJiAhZGlkV2FyblZhbHVlTnVsbCkge1xuICAgICAgZGlkV2FyblZhbHVlTnVsbCA9IHRydWU7XG5cbiAgICAgIGlmICh0eXBlID09PSAnc2VsZWN0JyAmJiBwcm9wcy5tdWx0aXBsZSkge1xuICAgICAgICBlcnJvcignYHZhbHVlYCBwcm9wIG9uIGAlc2Agc2hvdWxkIG5vdCBiZSBudWxsLiAnICsgJ0NvbnNpZGVyIHVzaW5nIGFuIGVtcHR5IGFycmF5IHdoZW4gYG11bHRpcGxlYCBpcyBzZXQgdG8gYHRydWVgICcgKyAndG8gY2xlYXIgdGhlIGNvbXBvbmVudCBvciBgdW5kZWZpbmVkYCBmb3IgdW5jb250cm9sbGVkIGNvbXBvbmVudHMuJywgdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvcignYHZhbHVlYCBwcm9wIG9uIGAlc2Agc2hvdWxkIG5vdCBiZSBudWxsLiAnICsgJ0NvbnNpZGVyIHVzaW5nIGFuIGVtcHR5IHN0cmluZyB0byBjbGVhciB0aGUgY29tcG9uZW50IG9yIGB1bmRlZmluZWRgICcgKyAnZm9yIHVuY29udHJvbGxlZCBjb21wb25lbnRzLicsIHR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSByZWdpc3RyYXRpb24gbmFtZSB0byBwbHVnaW4gbW9kdWxlXG4gKi9cblxudmFyIHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzID0ge307XG4vKipcbiAqIE1hcHBpbmcgZnJvbSBsb3dlcmNhc2UgcmVnaXN0cmF0aW9uIG5hbWVzIHRvIHRoZSBwcm9wZXJseSBjYXNlZCB2ZXJzaW9uLFxuICogdXNlZCB0byB3YXJuIGluIHRoZSBjYXNlIG9mIG1pc3NpbmcgZXZlbnQgaGFuZGxlcnMuIEF2YWlsYWJsZVxuICogb25seSBpbiB0cnVlLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuXG52YXIgcG9zc2libGVSZWdpc3RyYXRpb25OYW1lcyA9ICB7fSA7IC8vIFRydXN0IHRoZSBkZXZlbG9wZXIgdG8gb25seSB1c2UgcG9zc2libGVSZWdpc3RyYXRpb25OYW1lcyBpbiB0cnVlXG5cbi8vIFdoZW4gYWRkaW5nIGF0dHJpYnV0ZXMgdG8gdGhlIEhUTUwgb3IgU1ZHIHdoaXRlbGlzdCwgYmUgc3VyZSB0b1xuLy8gYWxzbyBhZGQgdGhlbSB0byB0aGlzIG1vZHVsZSB0byBlbnN1cmUgY2FzaW5nIGFuZCBpbmNvcnJlY3QgbmFtZVxuLy8gd2FybmluZ3MuXG52YXIgcG9zc2libGVTdGFuZGFyZE5hbWVzID0ge1xuICAvLyBIVE1MXG4gIGFjY2VwdDogJ2FjY2VwdCcsXG4gIGFjY2VwdGNoYXJzZXQ6ICdhY2NlcHRDaGFyc2V0JyxcbiAgJ2FjY2VwdC1jaGFyc2V0JzogJ2FjY2VwdENoYXJzZXQnLFxuICBhY2Nlc3NrZXk6ICdhY2Nlc3NLZXknLFxuICBhY3Rpb246ICdhY3Rpb24nLFxuICBhbGxvd2Z1bGxzY3JlZW46ICdhbGxvd0Z1bGxTY3JlZW4nLFxuICBhbHQ6ICdhbHQnLFxuICBhczogJ2FzJyxcbiAgYXN5bmM6ICdhc3luYycsXG4gIGF1dG9jYXBpdGFsaXplOiAnYXV0b0NhcGl0YWxpemUnLFxuICBhdXRvY29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICBhdXRvY29ycmVjdDogJ2F1dG9Db3JyZWN0JyxcbiAgYXV0b2ZvY3VzOiAnYXV0b0ZvY3VzJyxcbiAgYXV0b3BsYXk6ICdhdXRvUGxheScsXG4gIGF1dG9zYXZlOiAnYXV0b1NhdmUnLFxuICBjYXB0dXJlOiAnY2FwdHVyZScsXG4gIGNlbGxwYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICBjZWxsc3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgY2hhbGxlbmdlOiAnY2hhbGxlbmdlJyxcbiAgY2hhcnNldDogJ2NoYXJTZXQnLFxuICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gIGNoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICBjaXRlOiAnY2l0ZScsXG4gIGNsYXNzOiAnY2xhc3NOYW1lJyxcbiAgY2xhc3NpZDogJ2NsYXNzSUQnLFxuICBjbGFzc25hbWU6ICdjbGFzc05hbWUnLFxuICBjb2xzOiAnY29scycsXG4gIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgY29udGVudDogJ2NvbnRlbnQnLFxuICBjb250ZW50ZWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuICBjb250ZXh0bWVudTogJ2NvbnRleHRNZW51JyxcbiAgY29udHJvbHM6ICdjb250cm9scycsXG4gIGNvbnRyb2xzbGlzdDogJ2NvbnRyb2xzTGlzdCcsXG4gIGNvb3JkczogJ2Nvb3JkcycsXG4gIGNyb3Nzb3JpZ2luOiAnY3Jvc3NPcmlnaW4nLFxuICBkYW5nZXJvdXNseXNldGlubmVyaHRtbDogJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyxcbiAgZGF0YTogJ2RhdGEnLFxuICBkYXRldGltZTogJ2RhdGVUaW1lJyxcbiAgZGVmYXVsdDogJ2RlZmF1bHQnLFxuICBkZWZhdWx0Y2hlY2tlZDogJ2RlZmF1bHRDaGVja2VkJyxcbiAgZGVmYXVsdHZhbHVlOiAnZGVmYXVsdFZhbHVlJyxcbiAgZGVmZXI6ICdkZWZlcicsXG4gIGRpcjogJ2RpcicsXG4gIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxuICBkaXNhYmxlcGljdHVyZWlucGljdHVyZTogJ2Rpc2FibGVQaWN0dXJlSW5QaWN0dXJlJyxcbiAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gIGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG4gIGVuY3R5cGU6ICdlbmNUeXBlJyxcbiAgZm9yOiAnaHRtbEZvcicsXG4gIGZvcm06ICdmb3JtJyxcbiAgZm9ybW1ldGhvZDogJ2Zvcm1NZXRob2QnLFxuICBmb3JtYWN0aW9uOiAnZm9ybUFjdGlvbicsXG4gIGZvcm1lbmN0eXBlOiAnZm9ybUVuY1R5cGUnLFxuICBmb3Jtbm92YWxpZGF0ZTogJ2Zvcm1Ob1ZhbGlkYXRlJyxcbiAgZm9ybXRhcmdldDogJ2Zvcm1UYXJnZXQnLFxuICBmcmFtZWJvcmRlcjogJ2ZyYW1lQm9yZGVyJyxcbiAgaGVhZGVyczogJ2hlYWRlcnMnLFxuICBoZWlnaHQ6ICdoZWlnaHQnLFxuICBoaWRkZW46ICdoaWRkZW4nLFxuICBoaWdoOiAnaGlnaCcsXG4gIGhyZWY6ICdocmVmJyxcbiAgaHJlZmxhbmc6ICdocmVmTGFuZycsXG4gIGh0bWxmb3I6ICdodG1sRm9yJyxcbiAgaHR0cGVxdWl2OiAnaHR0cEVxdWl2JyxcbiAgJ2h0dHAtZXF1aXYnOiAnaHR0cEVxdWl2JyxcbiAgaWNvbjogJ2ljb24nLFxuICBpZDogJ2lkJyxcbiAgaW5uZXJodG1sOiAnaW5uZXJIVE1MJyxcbiAgaW5wdXRtb2RlOiAnaW5wdXRNb2RlJyxcbiAgaW50ZWdyaXR5OiAnaW50ZWdyaXR5JyxcbiAgaXM6ICdpcycsXG4gIGl0ZW1pZDogJ2l0ZW1JRCcsXG4gIGl0ZW1wcm9wOiAnaXRlbVByb3AnLFxuICBpdGVtcmVmOiAnaXRlbVJlZicsXG4gIGl0ZW1zY29wZTogJ2l0ZW1TY29wZScsXG4gIGl0ZW10eXBlOiAnaXRlbVR5cGUnLFxuICBrZXlwYXJhbXM6ICdrZXlQYXJhbXMnLFxuICBrZXl0eXBlOiAna2V5VHlwZScsXG4gIGtpbmQ6ICdraW5kJyxcbiAgbGFiZWw6ICdsYWJlbCcsXG4gIGxhbmc6ICdsYW5nJyxcbiAgbGlzdDogJ2xpc3QnLFxuICBsb29wOiAnbG9vcCcsXG4gIGxvdzogJ2xvdycsXG4gIG1hbmlmZXN0OiAnbWFuaWZlc3QnLFxuICBtYXJnaW53aWR0aDogJ21hcmdpbldpZHRoJyxcbiAgbWFyZ2luaGVpZ2h0OiAnbWFyZ2luSGVpZ2h0JyxcbiAgbWF4OiAnbWF4JyxcbiAgbWF4bGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgbWVkaWE6ICdtZWRpYScsXG4gIG1lZGlhZ3JvdXA6ICdtZWRpYUdyb3VwJyxcbiAgbWV0aG9kOiAnbWV0aG9kJyxcbiAgbWluOiAnbWluJyxcbiAgbWlubGVuZ3RoOiAnbWluTGVuZ3RoJyxcbiAgbXVsdGlwbGU6ICdtdWx0aXBsZScsXG4gIG11dGVkOiAnbXV0ZWQnLFxuICBuYW1lOiAnbmFtZScsXG4gIG5vbW9kdWxlOiAnbm9Nb2R1bGUnLFxuICBub25jZTogJ25vbmNlJyxcbiAgbm92YWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICBvcGVuOiAnb3BlbicsXG4gIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICBwbGFjZWhvbGRlcjogJ3BsYWNlaG9sZGVyJyxcbiAgcGxheXNpbmxpbmU6ICdwbGF5c0lubGluZScsXG4gIHBvc3RlcjogJ3Bvc3RlcicsXG4gIHByZWxvYWQ6ICdwcmVsb2FkJyxcbiAgcHJvZmlsZTogJ3Byb2ZpbGUnLFxuICByYWRpb2dyb3VwOiAncmFkaW9Hcm91cCcsXG4gIHJlYWRvbmx5OiAncmVhZE9ubHknLFxuICByZWZlcnJlcnBvbGljeTogJ3JlZmVycmVyUG9saWN5JyxcbiAgcmVsOiAncmVsJyxcbiAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gIHJldmVyc2VkOiAncmV2ZXJzZWQnLFxuICByb2xlOiAncm9sZScsXG4gIHJvd3M6ICdyb3dzJyxcbiAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuICBzYW5kYm94OiAnc2FuZGJveCcsXG4gIHNjb3BlOiAnc2NvcGUnLFxuICBzY29wZWQ6ICdzY29wZWQnLFxuICBzY3JvbGxpbmc6ICdzY3JvbGxpbmcnLFxuICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gIHNoYXBlOiAnc2hhcGUnLFxuICBzaXplOiAnc2l6ZScsXG4gIHNpemVzOiAnc2l6ZXMnLFxuICBzcGFuOiAnc3BhbicsXG4gIHNwZWxsY2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgc3JjOiAnc3JjJyxcbiAgc3JjZG9jOiAnc3JjRG9jJyxcbiAgc3JjbGFuZzogJ3NyY0xhbmcnLFxuICBzcmNzZXQ6ICdzcmNTZXQnLFxuICBzdGFydDogJ3N0YXJ0JyxcbiAgc3RlcDogJ3N0ZXAnLFxuICBzdHlsZTogJ3N0eWxlJyxcbiAgc3VtbWFyeTogJ3N1bW1hcnknLFxuICB0YWJpbmRleDogJ3RhYkluZGV4JyxcbiAgdGFyZ2V0OiAndGFyZ2V0JyxcbiAgdGl0bGU6ICd0aXRsZScsXG4gIHR5cGU6ICd0eXBlJyxcbiAgdXNlbWFwOiAndXNlTWFwJyxcbiAgdmFsdWU6ICd2YWx1ZScsXG4gIHdpZHRoOiAnd2lkdGgnLFxuICB3bW9kZTogJ3dtb2RlJyxcbiAgd3JhcDogJ3dyYXAnLFxuICAvLyBTVkdcbiAgYWJvdXQ6ICdhYm91dCcsXG4gIGFjY2VudGhlaWdodDogJ2FjY2VudEhlaWdodCcsXG4gICdhY2NlbnQtaGVpZ2h0JzogJ2FjY2VudEhlaWdodCcsXG4gIGFjY3VtdWxhdGU6ICdhY2N1bXVsYXRlJyxcbiAgYWRkaXRpdmU6ICdhZGRpdGl2ZScsXG4gIGFsaWdubWVudGJhc2VsaW5lOiAnYWxpZ25tZW50QmFzZWxpbmUnLFxuICAnYWxpZ25tZW50LWJhc2VsaW5lJzogJ2FsaWdubWVudEJhc2VsaW5lJyxcbiAgYWxsb3dyZW9yZGVyOiAnYWxsb3dSZW9yZGVyJyxcbiAgYWxwaGFiZXRpYzogJ2FscGhhYmV0aWMnLFxuICBhbXBsaXR1ZGU6ICdhbXBsaXR1ZGUnLFxuICBhcmFiaWNmb3JtOiAnYXJhYmljRm9ybScsXG4gICdhcmFiaWMtZm9ybSc6ICdhcmFiaWNGb3JtJyxcbiAgYXNjZW50OiAnYXNjZW50JyxcbiAgYXR0cmlidXRlbmFtZTogJ2F0dHJpYnV0ZU5hbWUnLFxuICBhdHRyaWJ1dGV0eXBlOiAnYXR0cmlidXRlVHlwZScsXG4gIGF1dG9yZXZlcnNlOiAnYXV0b1JldmVyc2UnLFxuICBhemltdXRoOiAnYXppbXV0aCcsXG4gIGJhc2VmcmVxdWVuY3k6ICdiYXNlRnJlcXVlbmN5JyxcbiAgYmFzZWxpbmVzaGlmdDogJ2Jhc2VsaW5lU2hpZnQnLFxuICAnYmFzZWxpbmUtc2hpZnQnOiAnYmFzZWxpbmVTaGlmdCcsXG4gIGJhc2Vwcm9maWxlOiAnYmFzZVByb2ZpbGUnLFxuICBiYm94OiAnYmJveCcsXG4gIGJlZ2luOiAnYmVnaW4nLFxuICBiaWFzOiAnYmlhcycsXG4gIGJ5OiAnYnknLFxuICBjYWxjbW9kZTogJ2NhbGNNb2RlJyxcbiAgY2FwaGVpZ2h0OiAnY2FwSGVpZ2h0JyxcbiAgJ2NhcC1oZWlnaHQnOiAnY2FwSGVpZ2h0JyxcbiAgY2xpcDogJ2NsaXAnLFxuICBjbGlwcGF0aDogJ2NsaXBQYXRoJyxcbiAgJ2NsaXAtcGF0aCc6ICdjbGlwUGF0aCcsXG4gIGNsaXBwYXRodW5pdHM6ICdjbGlwUGF0aFVuaXRzJyxcbiAgY2xpcHJ1bGU6ICdjbGlwUnVsZScsXG4gICdjbGlwLXJ1bGUnOiAnY2xpcFJ1bGUnLFxuICBjb2xvcjogJ2NvbG9yJyxcbiAgY29sb3JpbnRlcnBvbGF0aW9uOiAnY29sb3JJbnRlcnBvbGF0aW9uJyxcbiAgJ2NvbG9yLWludGVycG9sYXRpb24nOiAnY29sb3JJbnRlcnBvbGF0aW9uJyxcbiAgY29sb3JpbnRlcnBvbGF0aW9uZmlsdGVyczogJ2NvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnMnLFxuICAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJzogJ2NvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnMnLFxuICBjb2xvcnByb2ZpbGU6ICdjb2xvclByb2ZpbGUnLFxuICAnY29sb3ItcHJvZmlsZSc6ICdjb2xvclByb2ZpbGUnLFxuICBjb2xvcnJlbmRlcmluZzogJ2NvbG9yUmVuZGVyaW5nJyxcbiAgJ2NvbG9yLXJlbmRlcmluZyc6ICdjb2xvclJlbmRlcmluZycsXG4gIGNvbnRlbnRzY3JpcHR0eXBlOiAnY29udGVudFNjcmlwdFR5cGUnLFxuICBjb250ZW50c3R5bGV0eXBlOiAnY29udGVudFN0eWxlVHlwZScsXG4gIGN1cnNvcjogJ2N1cnNvcicsXG4gIGN4OiAnY3gnLFxuICBjeTogJ2N5JyxcbiAgZDogJ2QnLFxuICBkYXRhdHlwZTogJ2RhdGF0eXBlJyxcbiAgZGVjZWxlcmF0ZTogJ2RlY2VsZXJhdGUnLFxuICBkZXNjZW50OiAnZGVzY2VudCcsXG4gIGRpZmZ1c2Vjb25zdGFudDogJ2RpZmZ1c2VDb25zdGFudCcsXG4gIGRpcmVjdGlvbjogJ2RpcmVjdGlvbicsXG4gIGRpc3BsYXk6ICdkaXNwbGF5JyxcbiAgZGl2aXNvcjogJ2Rpdmlzb3InLFxuICBkb21pbmFudGJhc2VsaW5lOiAnZG9taW5hbnRCYXNlbGluZScsXG4gICdkb21pbmFudC1iYXNlbGluZSc6ICdkb21pbmFudEJhc2VsaW5lJyxcbiAgZHVyOiAnZHVyJyxcbiAgZHg6ICdkeCcsXG4gIGR5OiAnZHknLFxuICBlZGdlbW9kZTogJ2VkZ2VNb2RlJyxcbiAgZWxldmF0aW9uOiAnZWxldmF0aW9uJyxcbiAgZW5hYmxlYmFja2dyb3VuZDogJ2VuYWJsZUJhY2tncm91bmQnLFxuICAnZW5hYmxlLWJhY2tncm91bmQnOiAnZW5hYmxlQmFja2dyb3VuZCcsXG4gIGVuZDogJ2VuZCcsXG4gIGV4cG9uZW50OiAnZXhwb25lbnQnLFxuICBleHRlcm5hbHJlc291cmNlc3JlcXVpcmVkOiAnZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCcsXG4gIGZpbGw6ICdmaWxsJyxcbiAgZmlsbG9wYWNpdHk6ICdmaWxsT3BhY2l0eScsXG4gICdmaWxsLW9wYWNpdHknOiAnZmlsbE9wYWNpdHknLFxuICBmaWxscnVsZTogJ2ZpbGxSdWxlJyxcbiAgJ2ZpbGwtcnVsZSc6ICdmaWxsUnVsZScsXG4gIGZpbHRlcjogJ2ZpbHRlcicsXG4gIGZpbHRlcnJlczogJ2ZpbHRlclJlcycsXG4gIGZpbHRlcnVuaXRzOiAnZmlsdGVyVW5pdHMnLFxuICBmbG9vZG9wYWNpdHk6ICdmbG9vZE9wYWNpdHknLFxuICAnZmxvb2Qtb3BhY2l0eSc6ICdmbG9vZE9wYWNpdHknLFxuICBmbG9vZGNvbG9yOiAnZmxvb2RDb2xvcicsXG4gICdmbG9vZC1jb2xvcic6ICdmbG9vZENvbG9yJyxcbiAgZm9jdXNhYmxlOiAnZm9jdXNhYmxlJyxcbiAgZm9udGZhbWlseTogJ2ZvbnRGYW1pbHknLFxuICAnZm9udC1mYW1pbHknOiAnZm9udEZhbWlseScsXG4gIGZvbnRzaXplOiAnZm9udFNpemUnLFxuICAnZm9udC1zaXplJzogJ2ZvbnRTaXplJyxcbiAgZm9udHNpemVhZGp1c3Q6ICdmb250U2l6ZUFkanVzdCcsXG4gICdmb250LXNpemUtYWRqdXN0JzogJ2ZvbnRTaXplQWRqdXN0JyxcbiAgZm9udHN0cmV0Y2g6ICdmb250U3RyZXRjaCcsXG4gICdmb250LXN0cmV0Y2gnOiAnZm9udFN0cmV0Y2gnLFxuICBmb250c3R5bGU6ICdmb250U3R5bGUnLFxuICAnZm9udC1zdHlsZSc6ICdmb250U3R5bGUnLFxuICBmb250dmFyaWFudDogJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnQtdmFyaWFudCc6ICdmb250VmFyaWFudCcsXG4gIGZvbnR3ZWlnaHQ6ICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnQtd2VpZ2h0JzogJ2ZvbnRXZWlnaHQnLFxuICBmb3JtYXQ6ICdmb3JtYXQnLFxuICBmcm9tOiAnZnJvbScsXG4gIGZ4OiAnZngnLFxuICBmeTogJ2Z5JyxcbiAgZzE6ICdnMScsXG4gIGcyOiAnZzInLFxuICBnbHlwaG5hbWU6ICdnbHlwaE5hbWUnLFxuICAnZ2x5cGgtbmFtZSc6ICdnbHlwaE5hbWUnLFxuICBnbHlwaG9yaWVudGF0aW9uaG9yaXpvbnRhbDogJ2dseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsJyxcbiAgJ2dseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWwnOiAnZ2x5cGhPcmllbnRhdGlvbkhvcml6b250YWwnLFxuICBnbHlwaG9yaWVudGF0aW9udmVydGljYWw6ICdnbHlwaE9yaWVudGF0aW9uVmVydGljYWwnLFxuICAnZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwnOiAnZ2x5cGhPcmllbnRhdGlvblZlcnRpY2FsJyxcbiAgZ2x5cGhyZWY6ICdnbHlwaFJlZicsXG4gIGdyYWRpZW50dHJhbnNmb3JtOiAnZ3JhZGllbnRUcmFuc2Zvcm0nLFxuICBncmFkaWVudHVuaXRzOiAnZ3JhZGllbnRVbml0cycsXG4gIGhhbmdpbmc6ICdoYW5naW5nJyxcbiAgaG9yaXphZHZ4OiAnaG9yaXpBZHZYJyxcbiAgJ2hvcml6LWFkdi14JzogJ2hvcml6QWR2WCcsXG4gIGhvcml6b3JpZ2lueDogJ2hvcml6T3JpZ2luWCcsXG4gICdob3Jpei1vcmlnaW4teCc6ICdob3Jpek9yaWdpblgnLFxuICBpZGVvZ3JhcGhpYzogJ2lkZW9ncmFwaGljJyxcbiAgaW1hZ2VyZW5kZXJpbmc6ICdpbWFnZVJlbmRlcmluZycsXG4gICdpbWFnZS1yZW5kZXJpbmcnOiAnaW1hZ2VSZW5kZXJpbmcnLFxuICBpbjI6ICdpbjInLFxuICBpbjogJ2luJyxcbiAgaW5saXN0OiAnaW5saXN0JyxcbiAgaW50ZXJjZXB0OiAnaW50ZXJjZXB0JyxcbiAgazE6ICdrMScsXG4gIGsyOiAnazInLFxuICBrMzogJ2szJyxcbiAgazQ6ICdrNCcsXG4gIGs6ICdrJyxcbiAga2VybmVsbWF0cml4OiAna2VybmVsTWF0cml4JyxcbiAga2VybmVsdW5pdGxlbmd0aDogJ2tlcm5lbFVuaXRMZW5ndGgnLFxuICBrZXJuaW5nOiAna2VybmluZycsXG4gIGtleXBvaW50czogJ2tleVBvaW50cycsXG4gIGtleXNwbGluZXM6ICdrZXlTcGxpbmVzJyxcbiAga2V5dGltZXM6ICdrZXlUaW1lcycsXG4gIGxlbmd0aGFkanVzdDogJ2xlbmd0aEFkanVzdCcsXG4gIGxldHRlcnNwYWNpbmc6ICdsZXR0ZXJTcGFjaW5nJyxcbiAgJ2xldHRlci1zcGFjaW5nJzogJ2xldHRlclNwYWNpbmcnLFxuICBsaWdodGluZ2NvbG9yOiAnbGlnaHRpbmdDb2xvcicsXG4gICdsaWdodGluZy1jb2xvcic6ICdsaWdodGluZ0NvbG9yJyxcbiAgbGltaXRpbmdjb25lYW5nbGU6ICdsaW1pdGluZ0NvbmVBbmdsZScsXG4gIGxvY2FsOiAnbG9jYWwnLFxuICBtYXJrZXJlbmQ6ICdtYXJrZXJFbmQnLFxuICAnbWFya2VyLWVuZCc6ICdtYXJrZXJFbmQnLFxuICBtYXJrZXJoZWlnaHQ6ICdtYXJrZXJIZWlnaHQnLFxuICBtYXJrZXJtaWQ6ICdtYXJrZXJNaWQnLFxuICAnbWFya2VyLW1pZCc6ICdtYXJrZXJNaWQnLFxuICBtYXJrZXJzdGFydDogJ21hcmtlclN0YXJ0JyxcbiAgJ21hcmtlci1zdGFydCc6ICdtYXJrZXJTdGFydCcsXG4gIG1hcmtlcnVuaXRzOiAnbWFya2VyVW5pdHMnLFxuICBtYXJrZXJ3aWR0aDogJ21hcmtlcldpZHRoJyxcbiAgbWFzazogJ21hc2snLFxuICBtYXNrY29udGVudHVuaXRzOiAnbWFza0NvbnRlbnRVbml0cycsXG4gIG1hc2t1bml0czogJ21hc2tVbml0cycsXG4gIG1hdGhlbWF0aWNhbDogJ21hdGhlbWF0aWNhbCcsXG4gIG1vZGU6ICdtb2RlJyxcbiAgbnVtb2N0YXZlczogJ251bU9jdGF2ZXMnLFxuICBvZmZzZXQ6ICdvZmZzZXQnLFxuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIG9wZXJhdG9yOiAnb3BlcmF0b3InLFxuICBvcmRlcjogJ29yZGVyJyxcbiAgb3JpZW50OiAnb3JpZW50JyxcbiAgb3JpZW50YXRpb246ICdvcmllbnRhdGlvbicsXG4gIG9yaWdpbjogJ29yaWdpbicsXG4gIG92ZXJmbG93OiAnb3ZlcmZsb3cnLFxuICBvdmVybGluZXBvc2l0aW9uOiAnb3ZlcmxpbmVQb3NpdGlvbicsXG4gICdvdmVybGluZS1wb3NpdGlvbic6ICdvdmVybGluZVBvc2l0aW9uJyxcbiAgb3ZlcmxpbmV0aGlja25lc3M6ICdvdmVybGluZVRoaWNrbmVzcycsXG4gICdvdmVybGluZS10aGlja25lc3MnOiAnb3ZlcmxpbmVUaGlja25lc3MnLFxuICBwYWludG9yZGVyOiAncGFpbnRPcmRlcicsXG4gICdwYWludC1vcmRlcic6ICdwYWludE9yZGVyJyxcbiAgcGFub3NlMTogJ3Bhbm9zZTEnLFxuICAncGFub3NlLTEnOiAncGFub3NlMScsXG4gIHBhdGhsZW5ndGg6ICdwYXRoTGVuZ3RoJyxcbiAgcGF0dGVybmNvbnRlbnR1bml0czogJ3BhdHRlcm5Db250ZW50VW5pdHMnLFxuICBwYXR0ZXJudHJhbnNmb3JtOiAncGF0dGVyblRyYW5zZm9ybScsXG4gIHBhdHRlcm51bml0czogJ3BhdHRlcm5Vbml0cycsXG4gIHBvaW50ZXJldmVudHM6ICdwb2ludGVyRXZlbnRzJyxcbiAgJ3BvaW50ZXItZXZlbnRzJzogJ3BvaW50ZXJFdmVudHMnLFxuICBwb2ludHM6ICdwb2ludHMnLFxuICBwb2ludHNhdHg6ICdwb2ludHNBdFgnLFxuICBwb2ludHNhdHk6ICdwb2ludHNBdFknLFxuICBwb2ludHNhdHo6ICdwb2ludHNBdFonLFxuICBwcmVmaXg6ICdwcmVmaXgnLFxuICBwcmVzZXJ2ZWFscGhhOiAncHJlc2VydmVBbHBoYScsXG4gIHByZXNlcnZlYXNwZWN0cmF0aW86ICdwcmVzZXJ2ZUFzcGVjdFJhdGlvJyxcbiAgcHJpbWl0aXZldW5pdHM6ICdwcmltaXRpdmVVbml0cycsXG4gIHByb3BlcnR5OiAncHJvcGVydHknLFxuICByOiAncicsXG4gIHJhZGl1czogJ3JhZGl1cycsXG4gIHJlZng6ICdyZWZYJyxcbiAgcmVmeTogJ3JlZlknLFxuICByZW5kZXJpbmdpbnRlbnQ6ICdyZW5kZXJpbmdJbnRlbnQnLFxuICAncmVuZGVyaW5nLWludGVudCc6ICdyZW5kZXJpbmdJbnRlbnQnLFxuICByZXBlYXRjb3VudDogJ3JlcGVhdENvdW50JyxcbiAgcmVwZWF0ZHVyOiAncmVwZWF0RHVyJyxcbiAgcmVxdWlyZWRleHRlbnNpb25zOiAncmVxdWlyZWRFeHRlbnNpb25zJyxcbiAgcmVxdWlyZWRmZWF0dXJlczogJ3JlcXVpcmVkRmVhdHVyZXMnLFxuICByZXNvdXJjZTogJ3Jlc291cmNlJyxcbiAgcmVzdGFydDogJ3Jlc3RhcnQnLFxuICByZXN1bHQ6ICdyZXN1bHQnLFxuICByZXN1bHRzOiAncmVzdWx0cycsXG4gIHJvdGF0ZTogJ3JvdGF0ZScsXG4gIHJ4OiAncngnLFxuICByeTogJ3J5JyxcbiAgc2NhbGU6ICdzY2FsZScsXG4gIHNlY3VyaXR5OiAnc2VjdXJpdHknLFxuICBzZWVkOiAnc2VlZCcsXG4gIHNoYXBlcmVuZGVyaW5nOiAnc2hhcGVSZW5kZXJpbmcnLFxuICAnc2hhcGUtcmVuZGVyaW5nJzogJ3NoYXBlUmVuZGVyaW5nJyxcbiAgc2xvcGU6ICdzbG9wZScsXG4gIHNwYWNpbmc6ICdzcGFjaW5nJyxcbiAgc3BlY3VsYXJjb25zdGFudDogJ3NwZWN1bGFyQ29uc3RhbnQnLFxuICBzcGVjdWxhcmV4cG9uZW50OiAnc3BlY3VsYXJFeHBvbmVudCcsXG4gIHNwZWVkOiAnc3BlZWQnLFxuICBzcHJlYWRtZXRob2Q6ICdzcHJlYWRNZXRob2QnLFxuICBzdGFydG9mZnNldDogJ3N0YXJ0T2Zmc2V0JyxcbiAgc3RkZGV2aWF0aW9uOiAnc3RkRGV2aWF0aW9uJyxcbiAgc3RlbWg6ICdzdGVtaCcsXG4gIHN0ZW12OiAnc3RlbXYnLFxuICBzdGl0Y2h0aWxlczogJ3N0aXRjaFRpbGVzJyxcbiAgc3RvcGNvbG9yOiAnc3RvcENvbG9yJyxcbiAgJ3N0b3AtY29sb3InOiAnc3RvcENvbG9yJyxcbiAgc3RvcG9wYWNpdHk6ICdzdG9wT3BhY2l0eScsXG4gICdzdG9wLW9wYWNpdHknOiAnc3RvcE9wYWNpdHknLFxuICBzdHJpa2V0aHJvdWdocG9zaXRpb246ICdzdHJpa2V0aHJvdWdoUG9zaXRpb24nLFxuICAnc3RyaWtldGhyb3VnaC1wb3NpdGlvbic6ICdzdHJpa2V0aHJvdWdoUG9zaXRpb24nLFxuICBzdHJpa2V0aHJvdWdodGhpY2tuZXNzOiAnc3RyaWtldGhyb3VnaFRoaWNrbmVzcycsXG4gICdzdHJpa2V0aHJvdWdoLXRoaWNrbmVzcyc6ICdzdHJpa2V0aHJvdWdoVGhpY2tuZXNzJyxcbiAgc3RyaW5nOiAnc3RyaW5nJyxcbiAgc3Ryb2tlOiAnc3Ryb2tlJyxcbiAgc3Ryb2tlZGFzaGFycmF5OiAnc3Ryb2tlRGFzaGFycmF5JyxcbiAgJ3N0cm9rZS1kYXNoYXJyYXknOiAnc3Ryb2tlRGFzaGFycmF5JyxcbiAgc3Ryb2tlZGFzaG9mZnNldDogJ3N0cm9rZURhc2hvZmZzZXQnLFxuICAnc3Ryb2tlLWRhc2hvZmZzZXQnOiAnc3Ryb2tlRGFzaG9mZnNldCcsXG4gIHN0cm9rZWxpbmVjYXA6ICdzdHJva2VMaW5lY2FwJyxcbiAgJ3N0cm9rZS1saW5lY2FwJzogJ3N0cm9rZUxpbmVjYXAnLFxuICBzdHJva2VsaW5lam9pbjogJ3N0cm9rZUxpbmVqb2luJyxcbiAgJ3N0cm9rZS1saW5lam9pbic6ICdzdHJva2VMaW5lam9pbicsXG4gIHN0cm9rZW1pdGVybGltaXQ6ICdzdHJva2VNaXRlcmxpbWl0JyxcbiAgJ3N0cm9rZS1taXRlcmxpbWl0JzogJ3N0cm9rZU1pdGVybGltaXQnLFxuICBzdHJva2V3aWR0aDogJ3N0cm9rZVdpZHRoJyxcbiAgJ3N0cm9rZS13aWR0aCc6ICdzdHJva2VXaWR0aCcsXG4gIHN0cm9rZW9wYWNpdHk6ICdzdHJva2VPcGFjaXR5JyxcbiAgJ3N0cm9rZS1vcGFjaXR5JzogJ3N0cm9rZU9wYWNpdHknLFxuICBzdXBwcmVzc2NvbnRlbnRlZGl0YWJsZXdhcm5pbmc6ICdzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmcnLFxuICBzdXBwcmVzc2h5ZHJhdGlvbndhcm5pbmc6ICdzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmcnLFxuICBzdXJmYWNlc2NhbGU6ICdzdXJmYWNlU2NhbGUnLFxuICBzeXN0ZW1sYW5ndWFnZTogJ3N5c3RlbUxhbmd1YWdlJyxcbiAgdGFibGV2YWx1ZXM6ICd0YWJsZVZhbHVlcycsXG4gIHRhcmdldHg6ICd0YXJnZXRYJyxcbiAgdGFyZ2V0eTogJ3RhcmdldFknLFxuICB0ZXh0YW5jaG9yOiAndGV4dEFuY2hvcicsXG4gICd0ZXh0LWFuY2hvcic6ICd0ZXh0QW5jaG9yJyxcbiAgdGV4dGRlY29yYXRpb246ICd0ZXh0RGVjb3JhdGlvbicsXG4gICd0ZXh0LWRlY29yYXRpb24nOiAndGV4dERlY29yYXRpb24nLFxuICB0ZXh0bGVuZ3RoOiAndGV4dExlbmd0aCcsXG4gIHRleHRyZW5kZXJpbmc6ICd0ZXh0UmVuZGVyaW5nJyxcbiAgJ3RleHQtcmVuZGVyaW5nJzogJ3RleHRSZW5kZXJpbmcnLFxuICB0bzogJ3RvJyxcbiAgdHJhbnNmb3JtOiAndHJhbnNmb3JtJyxcbiAgdHlwZW9mOiAndHlwZW9mJyxcbiAgdTE6ICd1MScsXG4gIHUyOiAndTInLFxuICB1bmRlcmxpbmVwb3NpdGlvbjogJ3VuZGVybGluZVBvc2l0aW9uJyxcbiAgJ3VuZGVybGluZS1wb3NpdGlvbic6ICd1bmRlcmxpbmVQb3NpdGlvbicsXG4gIHVuZGVybGluZXRoaWNrbmVzczogJ3VuZGVybGluZVRoaWNrbmVzcycsXG4gICd1bmRlcmxpbmUtdGhpY2tuZXNzJzogJ3VuZGVybGluZVRoaWNrbmVzcycsXG4gIHVuaWNvZGU6ICd1bmljb2RlJyxcbiAgdW5pY29kZWJpZGk6ICd1bmljb2RlQmlkaScsXG4gICd1bmljb2RlLWJpZGknOiAndW5pY29kZUJpZGknLFxuICB1bmljb2RlcmFuZ2U6ICd1bmljb2RlUmFuZ2UnLFxuICAndW5pY29kZS1yYW5nZSc6ICd1bmljb2RlUmFuZ2UnLFxuICB1bml0c3BlcmVtOiAndW5pdHNQZXJFbScsXG4gICd1bml0cy1wZXItZW0nOiAndW5pdHNQZXJFbScsXG4gIHVuc2VsZWN0YWJsZTogJ3Vuc2VsZWN0YWJsZScsXG4gIHZhbHBoYWJldGljOiAndkFscGhhYmV0aWMnLFxuICAndi1hbHBoYWJldGljJzogJ3ZBbHBoYWJldGljJyxcbiAgdmFsdWVzOiAndmFsdWVzJyxcbiAgdmVjdG9yZWZmZWN0OiAndmVjdG9yRWZmZWN0JyxcbiAgJ3ZlY3Rvci1lZmZlY3QnOiAndmVjdG9yRWZmZWN0JyxcbiAgdmVyc2lvbjogJ3ZlcnNpb24nLFxuICB2ZXJ0YWR2eTogJ3ZlcnRBZHZZJyxcbiAgJ3ZlcnQtYWR2LXknOiAndmVydEFkdlknLFxuICB2ZXJ0b3JpZ2lueDogJ3ZlcnRPcmlnaW5YJyxcbiAgJ3ZlcnQtb3JpZ2luLXgnOiAndmVydE9yaWdpblgnLFxuICB2ZXJ0b3JpZ2lueTogJ3ZlcnRPcmlnaW5ZJyxcbiAgJ3ZlcnQtb3JpZ2luLXknOiAndmVydE9yaWdpblknLFxuICB2aGFuZ2luZzogJ3ZIYW5naW5nJyxcbiAgJ3YtaGFuZ2luZyc6ICd2SGFuZ2luZycsXG4gIHZpZGVvZ3JhcGhpYzogJ3ZJZGVvZ3JhcGhpYycsXG4gICd2LWlkZW9ncmFwaGljJzogJ3ZJZGVvZ3JhcGhpYycsXG4gIHZpZXdib3g6ICd2aWV3Qm94JyxcbiAgdmlld3RhcmdldDogJ3ZpZXdUYXJnZXQnLFxuICB2aXNpYmlsaXR5OiAndmlzaWJpbGl0eScsXG4gIHZtYXRoZW1hdGljYWw6ICd2TWF0aGVtYXRpY2FsJyxcbiAgJ3YtbWF0aGVtYXRpY2FsJzogJ3ZNYXRoZW1hdGljYWwnLFxuICB2b2NhYjogJ3ZvY2FiJyxcbiAgd2lkdGhzOiAnd2lkdGhzJyxcbiAgd29yZHNwYWNpbmc6ICd3b3JkU3BhY2luZycsXG4gICd3b3JkLXNwYWNpbmcnOiAnd29yZFNwYWNpbmcnLFxuICB3cml0aW5nbW9kZTogJ3dyaXRpbmdNb2RlJyxcbiAgJ3dyaXRpbmctbW9kZSc6ICd3cml0aW5nTW9kZScsXG4gIHgxOiAneDEnLFxuICB4MjogJ3gyJyxcbiAgeDogJ3gnLFxuICB4Y2hhbm5lbHNlbGVjdG9yOiAneENoYW5uZWxTZWxlY3RvcicsXG4gIHhoZWlnaHQ6ICd4SGVpZ2h0JyxcbiAgJ3gtaGVpZ2h0JzogJ3hIZWlnaHQnLFxuICB4bGlua2FjdHVhdGU6ICd4bGlua0FjdHVhdGUnLFxuICAneGxpbms6YWN0dWF0ZSc6ICd4bGlua0FjdHVhdGUnLFxuICB4bGlua2FyY3JvbGU6ICd4bGlua0FyY3JvbGUnLFxuICAneGxpbms6YXJjcm9sZSc6ICd4bGlua0FyY3JvbGUnLFxuICB4bGlua2hyZWY6ICd4bGlua0hyZWYnLFxuICAneGxpbms6aHJlZic6ICd4bGlua0hyZWYnLFxuICB4bGlua3JvbGU6ICd4bGlua1JvbGUnLFxuICAneGxpbms6cm9sZSc6ICd4bGlua1JvbGUnLFxuICB4bGlua3Nob3c6ICd4bGlua1Nob3cnLFxuICAneGxpbms6c2hvdyc6ICd4bGlua1Nob3cnLFxuICB4bGlua3RpdGxlOiAneGxpbmtUaXRsZScsXG4gICd4bGluazp0aXRsZSc6ICd4bGlua1RpdGxlJyxcbiAgeGxpbmt0eXBlOiAneGxpbmtUeXBlJyxcbiAgJ3hsaW5rOnR5cGUnOiAneGxpbmtUeXBlJyxcbiAgeG1sYmFzZTogJ3htbEJhc2UnLFxuICAneG1sOmJhc2UnOiAneG1sQmFzZScsXG4gIHhtbGxhbmc6ICd4bWxMYW5nJyxcbiAgJ3htbDpsYW5nJzogJ3htbExhbmcnLFxuICB4bWxuczogJ3htbG5zJyxcbiAgJ3htbDpzcGFjZSc6ICd4bWxTcGFjZScsXG4gIHhtbG5zeGxpbms6ICd4bWxuc1hsaW5rJyxcbiAgJ3htbG5zOnhsaW5rJzogJ3htbG5zWGxpbmsnLFxuICB4bWxzcGFjZTogJ3htbFNwYWNlJyxcbiAgeTE6ICd5MScsXG4gIHkyOiAneTInLFxuICB5OiAneScsXG4gIHljaGFubmVsc2VsZWN0b3I6ICd5Q2hhbm5lbFNlbGVjdG9yJyxcbiAgejogJ3onLFxuICB6b29tYW5kcGFuOiAnem9vbUFuZFBhbidcbn07XG5cbnZhciB2YWxpZGF0ZVByb3BlcnR5JDEgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgd2FybmVkUHJvcGVydGllcyQxID0ge307XG4gIHZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgRVZFTlRfTkFNRV9SRUdFWCA9IC9eb24uLztcbiAgdmFyIElOVkFMSURfRVZFTlRfTkFNRV9SRUdFWCA9IC9eb25bXkEtWl0vO1xuICB2YXIgckFSSUEkMSA9IG5ldyBSZWdFeHAoJ14oYXJpYSktWycgKyBBVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xuICB2YXIgckFSSUFDYW1lbCQxID0gbmV3IFJlZ0V4cCgnXihhcmlhKVtBLVpdWycgKyBBVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xuXG4gIHZhbGlkYXRlUHJvcGVydHkkMSA9IGZ1bmN0aW9uICh0YWdOYW1lLCBuYW1lLCB2YWx1ZSwgY2FuVXNlRXZlbnRTeXN0ZW0pIHtcbiAgICBpZiAoX2hhc093blByb3BlcnR5LmNhbGwod2FybmVkUHJvcGVydGllcyQxLCBuYW1lKSAmJiB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBsb3dlckNhc2VkTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChsb3dlckNhc2VkTmFtZSA9PT0gJ29uZm9jdXNpbicgfHwgbG93ZXJDYXNlZE5hbWUgPT09ICdvbmZvY3Vzb3V0Jykge1xuICAgICAgZXJyb3IoJ1JlYWN0IHVzZXMgb25Gb2N1cyBhbmQgb25CbHVyIGluc3RlYWQgb2Ygb25Gb2N1c0luIGFuZCBvbkZvY3VzT3V0LiAnICsgJ0FsbCBSZWFjdCBldmVudHMgYXJlIG5vcm1hbGl6ZWQgdG8gYnViYmxlLCBzbyBvbkZvY3VzSW4gYW5kIG9uRm9jdXNPdXQgJyArICdhcmUgbm90IG5lZWRlZC9zdXBwb3J0ZWQgYnkgUmVhY3QuJyk7XG5cbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IC8vIFdlIGNhbid0IHJlbHkgb24gdGhlIGV2ZW50IHN5c3RlbSBiZWluZyBpbmplY3RlZCBvbiB0aGUgc2VydmVyLlxuXG5cbiAgICBpZiAoY2FuVXNlRXZlbnRTeXN0ZW0pIHtcbiAgICAgIGlmIChyZWdpc3RyYXRpb25OYW1lTW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlZ2lzdHJhdGlvbk5hbWUgPSBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzLmhhc093blByb3BlcnR5KGxvd2VyQ2FzZWROYW1lKSA/IHBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXNbbG93ZXJDYXNlZE5hbWVdIDogbnVsbDtcblxuICAgICAgaWYgKHJlZ2lzdHJhdGlvbk5hbWUgIT0gbnVsbCkge1xuICAgICAgICBlcnJvcignSW52YWxpZCBldmVudCBoYW5kbGVyIHByb3BlcnR5IGAlc2AuIERpZCB5b3UgbWVhbiBgJXNgPycsIG5hbWUsIHJlZ2lzdHJhdGlvbk5hbWUpO1xuXG4gICAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoRVZFTlRfTkFNRV9SRUdFWC50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGVycm9yKCdVbmtub3duIGV2ZW50IGhhbmRsZXIgcHJvcGVydHkgYCVzYC4gSXQgd2lsbCBiZSBpZ25vcmVkLicsIG5hbWUpO1xuXG4gICAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoRVZFTlRfTkFNRV9SRUdFWC50ZXN0KG5hbWUpKSB7XG4gICAgICAvLyBJZiBubyBldmVudCBwbHVnaW5zIGhhdmUgYmVlbiBpbmplY3RlZCwgd2UgYXJlIGluIGEgc2VydmVyIGVudmlyb25tZW50LlxuICAgICAgLy8gU28gd2UgY2FuJ3QgdGVsbCBpZiB0aGUgZXZlbnQgbmFtZSBpcyBjb3JyZWN0IGZvciBzdXJlLCBidXQgd2UgY2FuIGZpbHRlclxuICAgICAgLy8gb3V0IGtub3duIGJhZCBvbmVzIGxpa2UgYG9uY2xpY2tgLiBXZSBjYW4ndCBzdWdnZXN0IGEgc3BlY2lmaWMgcmVwbGFjZW1lbnQgdGhvdWdoLlxuICAgICAgaWYgKElOVkFMSURfRVZFTlRfTkFNRV9SRUdFWC50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGVycm9yKCdJbnZhbGlkIGV2ZW50IGhhbmRsZXIgcHJvcGVydHkgYCVzYC4gJyArICdSZWFjdCBldmVudHMgdXNlIHRoZSBjYW1lbENhc2UgbmFtaW5nIGNvbnZlbnRpb24sIGZvciBleGFtcGxlIGBvbkNsaWNrYC4nLCBuYW1lKTtcbiAgICAgIH1cblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gLy8gTGV0IHRoZSBBUklBIGF0dHJpYnV0ZSBob29rIHZhbGlkYXRlIEFSSUEgYXR0cmlidXRlc1xuXG5cbiAgICBpZiAockFSSUEkMS50ZXN0KG5hbWUpIHx8IHJBUklBQ2FtZWwkMS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobG93ZXJDYXNlZE5hbWUgPT09ICdpbm5lcmh0bWwnKSB7XG4gICAgICBlcnJvcignRGlyZWN0bHkgc2V0dGluZyBwcm9wZXJ0eSBgaW5uZXJIVE1MYCBpcyBub3QgcGVybWl0dGVkLiAnICsgJ0ZvciBtb3JlIGluZm9ybWF0aW9uLCBsb29rdXAgZG9jdW1lbnRhdGlvbiBvbiBgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgLicpO1xuXG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lID09PSAnYXJpYScpIHtcbiAgICAgIGVycm9yKCdUaGUgYGFyaWFgIGF0dHJpYnV0ZSBpcyByZXNlcnZlZCBmb3IgZnV0dXJlIHVzZSBpbiBSZWFjdC4gJyArICdQYXNzIGluZGl2aWR1YWwgYGFyaWEtYCBhdHRyaWJ1dGVzIGluc3RlYWQuJyk7XG5cbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobG93ZXJDYXNlZE5hbWUgPT09ICdpcycgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBlcnJvcignUmVjZWl2ZWQgYSBgJXNgIGZvciBhIHN0cmluZyBhdHRyaWJ1dGUgYGlzYC4gSWYgdGhpcyBpcyBleHBlY3RlZCwgY2FzdCAnICsgJ3RoZSB2YWx1ZSB0byBhIHN0cmluZy4nLCB0eXBlb2YgdmFsdWUpO1xuXG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpKSB7XG4gICAgICBlcnJvcignUmVjZWl2ZWQgTmFOIGZvciB0aGUgYCVzYCBhdHRyaWJ1dGUuIElmIHRoaXMgaXMgZXhwZWN0ZWQsIGNhc3QgJyArICd0aGUgdmFsdWUgdG8gYSBzdHJpbmcuJywgbmFtZSk7XG5cbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcGVydHlJbmZvID0gZ2V0UHJvcGVydHlJbmZvKG5hbWUpO1xuICAgIHZhciBpc1Jlc2VydmVkID0gcHJvcGVydHlJbmZvICE9PSBudWxsICYmIHByb3BlcnR5SW5mby50eXBlID09PSBSRVNFUlZFRDsgLy8gS25vd24gYXR0cmlidXRlcyBzaG91bGQgbWF0Y2ggdGhlIGNhc2luZyBzcGVjaWZpZWQgaW4gdGhlIHByb3BlcnR5IGNvbmZpZy5cblxuICAgIGlmIChwb3NzaWJsZVN0YW5kYXJkTmFtZXMuaGFzT3duUHJvcGVydHkobG93ZXJDYXNlZE5hbWUpKSB7XG4gICAgICB2YXIgc3RhbmRhcmROYW1lID0gcG9zc2libGVTdGFuZGFyZE5hbWVzW2xvd2VyQ2FzZWROYW1lXTtcblxuICAgICAgaWYgKHN0YW5kYXJkTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICBlcnJvcignSW52YWxpZCBET00gcHJvcGVydHkgYCVzYC4gRGlkIHlvdSBtZWFuIGAlc2A/JywgbmFtZSwgc3RhbmRhcmROYW1lKTtcblxuICAgICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1Jlc2VydmVkICYmIG5hbWUgIT09IGxvd2VyQ2FzZWROYW1lKSB7XG4gICAgICAvLyBVbmtub3duIGF0dHJpYnV0ZXMgc2hvdWxkIGhhdmUgbG93ZXJjYXNlIGNhc2luZyBzaW5jZSB0aGF0J3MgaG93IHRoZXlcbiAgICAgIC8vIHdpbGwgYmUgY2FzZWQgYW55d2F5IHdpdGggc2VydmVyIHJlbmRlcmluZy5cbiAgICAgIGVycm9yKCdSZWFjdCBkb2VzIG5vdCByZWNvZ25pemUgdGhlIGAlc2AgcHJvcCBvbiBhIERPTSBlbGVtZW50LiBJZiB5b3UgJyArICdpbnRlbnRpb25hbGx5IHdhbnQgaXQgdG8gYXBwZWFyIGluIHRoZSBET00gYXMgYSBjdXN0b20gJyArICdhdHRyaWJ1dGUsIHNwZWxsIGl0IGFzIGxvd2VyY2FzZSBgJXNgIGluc3RlYWQuICcgKyAnSWYgeW91IGFjY2lkZW50YWxseSBwYXNzZWQgaXQgZnJvbSBhIHBhcmVudCBjb21wb25lbnQsIHJlbW92ZSAnICsgJ2l0IGZyb20gdGhlIERPTSBlbGVtZW50LicsIG5hbWUsIGxvd2VyQ2FzZWROYW1lKTtcblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyAmJiBzaG91bGRSZW1vdmVBdHRyaWJ1dGVXaXRoV2FybmluZyhuYW1lLCB2YWx1ZSwgcHJvcGVydHlJbmZvLCBmYWxzZSkpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlcnJvcignUmVjZWl2ZWQgYCVzYCBmb3IgYSBub24tYm9vbGVhbiBhdHRyaWJ1dGUgYCVzYC5cXG5cXG4nICsgJ0lmIHlvdSB3YW50IHRvIHdyaXRlIGl0IHRvIHRoZSBET00sIHBhc3MgYSBzdHJpbmcgaW5zdGVhZDogJyArICclcz1cIiVzXCIgb3IgJXM9e3ZhbHVlLnRvU3RyaW5nKCl9LicsIHZhbHVlLCBuYW1lLCBuYW1lLCB2YWx1ZSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvcignUmVjZWl2ZWQgYCVzYCBmb3IgYSBub24tYm9vbGVhbiBhdHRyaWJ1dGUgYCVzYC5cXG5cXG4nICsgJ0lmIHlvdSB3YW50IHRvIHdyaXRlIGl0IHRvIHRoZSBET00sIHBhc3MgYSBzdHJpbmcgaW5zdGVhZDogJyArICclcz1cIiVzXCIgb3IgJXM9e3ZhbHVlLnRvU3RyaW5nKCl9LlxcblxcbicgKyAnSWYgeW91IHVzZWQgdG8gY29uZGl0aW9uYWxseSBvbWl0IGl0IHdpdGggJXM9e2NvbmRpdGlvbiAmJiB2YWx1ZX0sICcgKyAncGFzcyAlcz17Y29uZGl0aW9uID8gdmFsdWUgOiB1bmRlZmluZWR9IGluc3RlYWQuJywgdmFsdWUsIG5hbWUsIG5hbWUsIHZhbHVlLCBuYW1lLCBuYW1lLCBuYW1lKTtcbiAgICAgIH1cblxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gLy8gTm93IHRoYXQgd2UndmUgdmFsaWRhdGVkIGNhc2luZywgZG8gbm90IHZhbGlkYXRlXG4gICAgLy8gZGF0YSB0eXBlcyBmb3IgcmVzZXJ2ZWQgcHJvcHNcblxuXG4gICAgaWYgKGlzUmVzZXJ2ZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gLy8gV2FybiB3aGVuIGEga25vd24gYXR0cmlidXRlIGlzIGEgYmFkIHR5cGVcblxuXG4gICAgaWYgKHNob3VsZFJlbW92ZUF0dHJpYnV0ZVdpdGhXYXJuaW5nKG5hbWUsIHZhbHVlLCBwcm9wZXJ0eUluZm8sIGZhbHNlKSkge1xuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIFdhcm4gd2hlbiBwYXNzaW5nIHRoZSBzdHJpbmdzICdmYWxzZScgb3IgJ3RydWUnIGludG8gYSBib29sZWFuIHByb3BcblxuXG4gICAgaWYgKCh2YWx1ZSA9PT0gJ2ZhbHNlJyB8fCB2YWx1ZSA9PT0gJ3RydWUnKSAmJiBwcm9wZXJ0eUluZm8gIT09IG51bGwgJiYgcHJvcGVydHlJbmZvLnR5cGUgPT09IEJPT0xFQU4pIHtcbiAgICAgIGVycm9yKCdSZWNlaXZlZCB0aGUgc3RyaW5nIGAlc2AgZm9yIHRoZSBib29sZWFuIGF0dHJpYnV0ZSBgJXNgLiAnICsgJyVzICcgKyAnRGlkIHlvdSBtZWFuICVzPXslc30/JywgdmFsdWUsIG5hbWUsIHZhbHVlID09PSAnZmFsc2UnID8gJ1RoZSBicm93c2VyIHdpbGwgaW50ZXJwcmV0IGl0IGFzIGEgdHJ1dGh5IHZhbHVlLicgOiAnQWx0aG91Z2ggdGhpcyB3b3JrcywgaXQgd2lsbCBub3Qgd29yayBhcyBleHBlY3RlZCBpZiB5b3UgcGFzcyB0aGUgc3RyaW5nIFwiZmFsc2VcIi4nLCBuYW1lLCB2YWx1ZSk7XG5cbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cblxudmFyIHdhcm5Vbmtub3duUHJvcGVydGllcyA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2FuVXNlRXZlbnRTeXN0ZW0pIHtcbiAge1xuICAgIHZhciB1bmtub3duUHJvcHMgPSBbXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgdmFyIGlzVmFsaWQgPSB2YWxpZGF0ZVByb3BlcnR5JDEodHlwZSwga2V5LCBwcm9wc1trZXldLCBjYW5Vc2VFdmVudFN5c3RlbSk7XG5cbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICB1bmtub3duUHJvcHMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB1bmtub3duUHJvcFN0cmluZyA9IHVua25vd25Qcm9wcy5tYXAoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHJldHVybiAnYCcgKyBwcm9wICsgJ2AnO1xuICAgIH0pLmpvaW4oJywgJyk7XG5cbiAgICBpZiAodW5rbm93blByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZXJyb3IoJ0ludmFsaWQgdmFsdWUgZm9yIHByb3AgJXMgb24gPCVzPiB0YWcuIEVpdGhlciByZW1vdmUgaXQgZnJvbSB0aGUgZWxlbWVudCwgJyArICdvciBwYXNzIGEgc3RyaW5nIG9yIG51bWJlciB2YWx1ZSB0byBrZWVwIGl0IGluIHRoZSBET00uICcgKyAnRm9yIGRldGFpbHMsIHNlZSBodHRwczovL2ZiLm1lL3JlYWN0LWF0dHJpYnV0ZS1iZWhhdmlvcicsIHVua25vd25Qcm9wU3RyaW5nLCB0eXBlKTtcbiAgICB9IGVsc2UgaWYgKHVua25vd25Qcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICBlcnJvcignSW52YWxpZCB2YWx1ZXMgZm9yIHByb3BzICVzIG9uIDwlcz4gdGFnLiBFaXRoZXIgcmVtb3ZlIHRoZW0gZnJvbSB0aGUgZWxlbWVudCwgJyArICdvciBwYXNzIGEgc3RyaW5nIG9yIG51bWJlciB2YWx1ZSB0byBrZWVwIHRoZW0gaW4gdGhlIERPTS4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvcmVhY3QtYXR0cmlidXRlLWJlaGF2aW9yJywgdW5rbm93blByb3BTdHJpbmcsIHR5cGUpO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0aWVzJDIodHlwZSwgcHJvcHMsIGNhblVzZUV2ZW50U3lzdGVtKSB7XG4gIGlmIChpc0N1c3RvbUNvbXBvbmVudCh0eXBlLCBwcm9wcykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3YXJuVW5rbm93blByb3BlcnRpZXModHlwZSwgcHJvcHMsIGNhblVzZUV2ZW50U3lzdGVtKTtcbn1cblxudmFyIHRvQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5OyAvLyBUaGlzIGlzIG9ubHkgdXNlZCBpbiBERVYuXG4vLyBFYWNoIGVudHJ5IGlzIGB0aGlzLnN0YWNrYCBmcm9tIGEgY3VycmVudGx5IGV4ZWN1dGluZyByZW5kZXJlciBpbnN0YW5jZS5cbi8vIChUaGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBiZWNhdXNlIFJlYWN0RE9NU2VydmVyIGlzIHJlZW50cmFudCkuXG4vLyBFYWNoIHN0YWNrIGlzIGFuIGFycmF5IG9mIGZyYW1lcyB3aGljaCBtYXkgY29udGFpbiBuZXN0ZWQgc3RhY2tzIG9mIGVsZW1lbnRzLlxuXG52YXIgY3VycmVudERlYnVnU3RhY2tzID0gW107XG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudERpc3BhdGNoZXI7XG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQ0O1xudmFyIHByZXZHZXRDdXJyZW50U3RhY2tJbXBsID0gbnVsbDtcblxudmFyIGdldEN1cnJlbnRTZXJ2ZXJTdGFja0ltcGwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnJztcbn07XG5cbnZhciBkZXNjcmliZVN0YWNrRnJhbWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICByZXR1cm4gJyc7XG59O1xuXG52YXIgdmFsaWRhdGVQcm9wZXJ0aWVzSW5EZXZlbG9wbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcykge307XG5cbnZhciBwdXNoQ3VycmVudERlYnVnU3RhY2sgPSBmdW5jdGlvbiAoc3RhY2spIHt9O1xuXG52YXIgcHVzaEVsZW1lbnRUb0RlYnVnU3RhY2sgPSBmdW5jdGlvbiAoZWxlbWVudCkge307XG5cbnZhciBwb3BDdXJyZW50RGVidWdTdGFjayA9IGZ1bmN0aW9uICgpIHt9O1xuXG52YXIgaGFzV2FybmVkQWJvdXRVc2luZ0NvbnRleHRBc0NvbnN1bWVyID0gZmFsc2U7XG5cbntcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQ0ID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuICB2YWxpZGF0ZVByb3BlcnRpZXNJbkRldmVsb3BtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gICAgdmFsaWRhdGVQcm9wZXJ0aWVzKHR5cGUsIHByb3BzKTtcbiAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMSh0eXBlLCBwcm9wcyk7XG4gICAgdmFsaWRhdGVQcm9wZXJ0aWVzJDIodHlwZSwgcHJvcHMsXG4gICAgLyogY2FuVXNlRXZlbnRTeXN0ZW0gKi9cbiAgICBmYWxzZSk7XG4gIH07XG5cbiAgZGVzY3JpYmVTdGFja0ZyYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZSh0eXBlKTtcbiAgICB2YXIgb3duZXJOYW1lID0gbnVsbDtcbiAgICByZXR1cm4gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSk7XG4gIH07XG5cbiAgcHVzaEN1cnJlbnREZWJ1Z1N0YWNrID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAgY3VycmVudERlYnVnU3RhY2tzLnB1c2goc3RhY2spO1xuXG4gICAgaWYgKGN1cnJlbnREZWJ1Z1N0YWNrcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIFdlIGFyZSBlbnRlcmluZyBhIHNlcnZlciByZW5kZXJlci5cbiAgICAgIC8vIFJlbWVtYmVyIHRoZSBwcmV2aW91cyAoZS5nLiBjbGllbnQpIGdsb2JhbCBzdGFjayBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHByZXZHZXRDdXJyZW50U3RhY2tJbXBsID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQ0LmdldEN1cnJlbnRTdGFjaztcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkNC5nZXRDdXJyZW50U3RhY2sgPSBnZXRDdXJyZW50U2VydmVyU3RhY2tJbXBsO1xuICAgIH1cbiAgfTtcblxuICBwdXNoRWxlbWVudFRvRGVidWdTdGFjayA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8gRm9yIHRoZSBpbm5lcm1vc3QgZXhlY3V0aW5nIFJlYWN0RE9NU2VydmVyIGNhbGwsXG4gICAgdmFyIHN0YWNrID0gY3VycmVudERlYnVnU3RhY2tzW2N1cnJlbnREZWJ1Z1N0YWNrcy5sZW5ndGggLSAxXTsgLy8gVGFrZSB0aGUgaW5uZXJtb3N0IGV4ZWN1dGluZyBmcmFtZSAoZS5nLiA8Rm9vPiksXG5cbiAgICB2YXIgZnJhbWUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTsgLy8gYW5kIHJlY29yZCB0aGF0IGl0IGhhcyBvbmUgbW9yZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCBpdC5cblxuICAgIGZyYW1lLmRlYnVnRWxlbWVudFN0YWNrLnB1c2goZWxlbWVudCk7IC8vIFdlIG9ubHkgbmVlZCB0aGlzIGJlY2F1c2Ugd2UgdGFpbC1vcHRpbWl6ZSBzaW5nbGUtZWxlbWVudFxuICAgIC8vIGNoaWxkcmVuIGFuZCBkaXJlY3RseSBoYW5kbGUgdGhlbSBpbiBhbiBpbm5lciBsb29wIGluc3RlYWQgb2ZcbiAgICAvLyBjcmVhdGluZyBzZXBhcmF0ZSBmcmFtZXMgZm9yIHRoZW0uXG4gIH07XG5cbiAgcG9wQ3VycmVudERlYnVnU3RhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3VycmVudERlYnVnU3RhY2tzLnBvcCgpO1xuXG4gICAgaWYgKGN1cnJlbnREZWJ1Z1N0YWNrcy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIFdlIGFyZSBleGl0aW5nIHRoZSBzZXJ2ZXIgcmVuZGVyZXIuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwcmV2aW91cyAoZS5nLiBjbGllbnQpIGdsb2JhbCBzdGFjayBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkNC5nZXRDdXJyZW50U3RhY2sgPSBwcmV2R2V0Q3VycmVudFN0YWNrSW1wbDtcbiAgICAgIHByZXZHZXRDdXJyZW50U3RhY2tJbXBsID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgZ2V0Q3VycmVudFNlcnZlclN0YWNrSW1wbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY3VycmVudERlYnVnU3RhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gTm90aGluZyBpcyBjdXJyZW50bHkgcmVuZGVyaW5nLlxuICAgICAgcmV0dXJuICcnO1xuICAgIH0gLy8gUmVhY3RET01TZXJ2ZXIgaXMgcmVlbnRyYW50IHNvIHRoZXJlIG1heSBiZSBtdWx0aXBsZSBjYWxscyBhdCB0aGUgc2FtZSB0aW1lLlxuICAgIC8vIFRha2UgdGhlIGZyYW1lcyBmcm9tIHRoZSBpbm5lcm1vc3QgY2FsbCB3aGljaCBpcyB0aGUgbGFzdCBpbiB0aGUgYXJyYXkuXG5cblxuICAgIHZhciBmcmFtZXMgPSBjdXJyZW50RGVidWdTdGFja3NbY3VycmVudERlYnVnU3RhY2tzLmxlbmd0aCAtIDFdO1xuICAgIHZhciBzdGFjayA9ICcnOyAvLyBHbyB0aHJvdWdoIGV2ZXJ5IGZyYW1lIGluIHRoZSBzdGFjayBmcm9tIHRoZSBpbm5lcm1vc3Qgb25lLlxuXG4gICAgZm9yICh2YXIgaSA9IGZyYW1lcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZyYW1lID0gZnJhbWVzW2ldOyAvLyBFdmVyeSBmcmFtZSBtaWdodCBoYXZlIG1vcmUgdGhhbiBvbmUgZGVidWcgZWxlbWVudCBzdGFjayBlbnRyeSBhc3NvY2lhdGVkIHdpdGggaXQuXG4gICAgICAvLyBUaGlzIGlzIGJlY2F1c2Ugc2luZ2xlLWNoaWxkIG5lc3RpbmcgZG9lc24ndCBjcmVhdGUgbWF0ZXJpYWxpemVkIGZyYW1lcy5cbiAgICAgIC8vIEluc3RlYWQgaXQgd291bGQgcHVzaCB0aGVtIHRocm91Z2ggYHB1c2hFbGVtZW50VG9EZWJ1Z1N0YWNrKClgLlxuXG4gICAgICB2YXIgZGVidWdFbGVtZW50U3RhY2sgPSBmcmFtZS5kZWJ1Z0VsZW1lbnRTdGFjaztcblxuICAgICAgZm9yICh2YXIgaWkgPSBkZWJ1Z0VsZW1lbnRTdGFjay5sZW5ndGggLSAxOyBpaSA+PSAwOyBpaS0tKSB7XG4gICAgICAgIHN0YWNrICs9IGRlc2NyaWJlU3RhY2tGcmFtZShkZWJ1Z0VsZW1lbnRTdGFja1tpaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGFjaztcbiAgfTtcbn1cblxudmFyIGRpZFdhcm5EZWZhdWx0SW5wdXRWYWx1ZSA9IGZhbHNlO1xudmFyIGRpZFdhcm5EZWZhdWx0Q2hlY2tlZCA9IGZhbHNlO1xudmFyIGRpZFdhcm5EZWZhdWx0U2VsZWN0VmFsdWUgPSBmYWxzZTtcbnZhciBkaWRXYXJuRGVmYXVsdFRleHRhcmVhVmFsdWUgPSBmYWxzZTtcbnZhciBkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuID0gZmFsc2U7XG52YXIgZGlkV2FybkFib3V0Tm9vcFVwZGF0ZUZvckNvbXBvbmVudCA9IHt9O1xudmFyIGRpZFdhcm5BYm91dEJhZENsYXNzID0ge307XG52YXIgZGlkV2FybkFib3V0TW9kdWxlUGF0dGVybkNvbXBvbmVudCA9IHt9O1xudmFyIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRXaWxsTW91bnQgPSB7fTtcbnZhciBkaWRXYXJuQWJvdXRVbmRlZmluZWREZXJpdmVkU3RhdGUgPSB7fTtcbnZhciBkaWRXYXJuQWJvdXRVbmluaXRpYWxpemVkU3RhdGUgPSB7fTtcbnZhciB2YWx1ZVByb3BOYW1lcyA9IFsndmFsdWUnLCAnZGVmYXVsdFZhbHVlJ107XG52YXIgbmV3bGluZUVhdGluZ1RhZ3MgPSB7XG4gIGxpc3Rpbmc6IHRydWUsXG4gIHByZTogdHJ1ZSxcbiAgdGV4dGFyZWE6IHRydWVcbn07IC8vIFdlIGFjY2VwdCBhbnkgdGFnIHRvIGJlIHJlbmRlcmVkIGJ1dCBzaW5jZSB0aGlzIGdldHMgaW5qZWN0ZWQgaW50byBhcmJpdHJhcnlcbi8vIEhUTUwsIHdlIHdhbnQgdG8gbWFrZSBzdXJlIHRoYXQgaXQncyBhIHNhZmUgdGFnLlxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC8jTlQtTmFtZVxuXG52YXIgVkFMSURfVEFHX1JFR0VYID0gL15bYS16QS1aXVthLXpBLVo6X1xcLlxcLVxcZF0qJC87IC8vIFNpbXBsaWZpZWQgc3Vic2V0XG5cbnZhciB2YWxpZGF0ZWRUYWdDYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZURhbmdlcm91c1RhZyh0YWcpIHtcbiAgaWYgKCF2YWxpZGF0ZWRUYWdDYWNoZS5oYXNPd25Qcm9wZXJ0eSh0YWcpKSB7XG4gICAgaWYgKCFWQUxJRF9UQUdfUkVHRVgudGVzdCh0YWcpKSB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCBcIkludmFsaWQgdGFnOiBcIiArIHRhZyApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlZFRhZ0NhY2hlW3RhZ10gPSB0cnVlO1xuICB9XG59XG5cbnZhciBzdHlsZU5hbWVDYWNoZSA9IHt9O1xuXG52YXIgcHJvY2Vzc1N0eWxlTmFtZSA9IGZ1bmN0aW9uIChzdHlsZU5hbWUpIHtcbiAgaWYgKHN0eWxlTmFtZUNhY2hlLmhhc093blByb3BlcnR5KHN0eWxlTmFtZSkpIHtcbiAgICByZXR1cm4gc3R5bGVOYW1lQ2FjaGVbc3R5bGVOYW1lXTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBoeXBoZW5hdGVTdHlsZU5hbWUoc3R5bGVOYW1lKTtcbiAgc3R5bGVOYW1lQ2FjaGVbc3R5bGVOYW1lXSA9IHJlc3VsdDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcmt1cEZvclN0eWxlcyhzdHlsZXMpIHtcbiAgdmFyIHNlcmlhbGl6ZWQgPSAnJztcbiAgdmFyIGRlbGltaXRlciA9ICcnO1xuXG4gIGZvciAodmFyIHN0eWxlTmFtZSBpbiBzdHlsZXMpIHtcbiAgICBpZiAoIXN0eWxlcy5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNDdXN0b21Qcm9wZXJ0eSA9IHN0eWxlTmFtZS5pbmRleE9mKCctLScpID09PSAwO1xuICAgIHZhciBzdHlsZVZhbHVlID0gc3R5bGVzW3N0eWxlTmFtZV07XG5cbiAgICB7XG4gICAgICBpZiAoIWlzQ3VzdG9tUHJvcGVydHkpIHtcbiAgICAgICAgd2FyblZhbGlkU3R5bGUkMShzdHlsZU5hbWUsIHN0eWxlVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHlsZVZhbHVlICE9IG51bGwpIHtcbiAgICAgIHNlcmlhbGl6ZWQgKz0gZGVsaW1pdGVyICsgKGlzQ3VzdG9tUHJvcGVydHkgPyBzdHlsZU5hbWUgOiBwcm9jZXNzU3R5bGVOYW1lKHN0eWxlTmFtZSkpICsgJzonO1xuICAgICAgc2VyaWFsaXplZCArPSBkYW5nZXJvdXNTdHlsZVZhbHVlKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSwgaXNDdXN0b21Qcm9wZXJ0eSk7XG4gICAgICBkZWxpbWl0ZXIgPSAnOyc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNlcmlhbGl6ZWQgfHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAge1xuICAgIHZhciBfY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IF9jb25zdHJ1Y3RvciAmJiBnZXRDb21wb25lbnROYW1lKF9jb25zdHJ1Y3RvcikgfHwgJ1JlYWN0Q2xhc3MnO1xuICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArICcuJyArIGNhbGxlck5hbWU7XG5cbiAgICBpZiAoZGlkV2FybkFib3V0Tm9vcFVwZGF0ZUZvckNvbXBvbmVudFt3YXJuaW5nS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVycm9yKCclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvdXRzaWRlIGNvbXBvbmVudFdpbGxNb3VudCgpIG9uIHRoZSBzZXJ2ZXIuICcgKyAnVGhpcyBpcyBhIG5vLW9wLlxcblxcblBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBjb21wb25lbnROYW1lKTtcblxuICAgIGRpZFdhcm5BYm91dE5vb3BVcGRhdGVGb3JDb21wb25lbnRbd2FybmluZ0tleV0gPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpIHtcbiAgcmV0dXJuIENvbXBvbmVudC5wcm90b3R5cGUgJiYgQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBnZXROb25DaGlsZHJlbklubmVyTWFya3VwKHByb3BzKSB7XG4gIHZhciBpbm5lckhUTUwgPSBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTDtcblxuICBpZiAoaW5uZXJIVE1MICE9IG51bGwpIHtcbiAgICBpZiAoaW5uZXJIVE1MLl9faHRtbCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gaW5uZXJIVE1MLl9faHRtbDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNvbnRlbnQgPSBwcm9wcy5jaGlsZHJlbjtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbnRlbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gZXNjYXBlVGV4dEZvckJyb3dzZXIoY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5Ub3BMZXZlbENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgcmV0dXJuIHRvQXJyYXkoY2hpbGRyZW4pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjaGlsZHJlbjtcblxuICBpZiAoZWxlbWVudC50eXBlICE9PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgcmV0dXJuIFtlbGVtZW50XTtcbiAgfVxuXG4gIHZhciBmcmFnbWVudENoaWxkcmVuID0gZWxlbWVudC5wcm9wcy5jaGlsZHJlbjtcblxuICBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KGZyYWdtZW50Q2hpbGRyZW4pKSB7XG4gICAgcmV0dXJuIHRvQXJyYXkoZnJhZ21lbnRDaGlsZHJlbik7XG4gIH1cblxuICB2YXIgZnJhZ21lbnRDaGlsZEVsZW1lbnQgPSBmcmFnbWVudENoaWxkcmVuO1xuICByZXR1cm4gW2ZyYWdtZW50Q2hpbGRFbGVtZW50XTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbk9wdGlvbkNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIGlmIChjaGlsZHJlbiA9PT0gdW5kZWZpbmVkIHx8IGNoaWxkcmVuID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgdmFyIGNvbnRlbnQgPSAnJzsgLy8gRmxhdHRlbiBjaGlsZHJlbiBhbmQgd2FybiBpZiB0aGV5IGFyZW4ndCBzdHJpbmdzIG9yIG51bWJlcnM7XG4gIC8vIGludmFsaWQgdHlwZXMgYXJlIGlnbm9yZWQuXG5cbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb250ZW50ICs9IGNoaWxkO1xuXG4gICAge1xuICAgICAgaWYgKCFkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIGNoaWxkICE9PSAnbnVtYmVyJykge1xuICAgICAgICBkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuID0gdHJ1ZTtcblxuICAgICAgICBlcnJvcignT25seSBzdHJpbmdzIGFuZCBudW1iZXJzIGFyZSBzdXBwb3J0ZWQgYXMgPG9wdGlvbj4gY2hpbGRyZW4uJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSQyID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBTVFlMRSA9ICdzdHlsZSc7XG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGNoaWxkcmVuOiBudWxsLFxuICBkYW5nZXJvdXNseVNldElubmVySFRNTDogbnVsbCxcbiAgc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nOiBudWxsLFxuICBzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmc6IG51bGxcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZU9wZW5UYWdNYXJrdXAodGFnVmVyYmF0aW0sIHRhZ0xvd2VyY2FzZSwgcHJvcHMsIG5hbWVzcGFjZSwgbWFrZVN0YXRpY01hcmt1cCwgaXNSb290RWxlbWVudCkge1xuICB2YXIgcmV0ID0gJzwnICsgdGFnVmVyYmF0aW07XG5cbiAgZm9yICh2YXIgcHJvcEtleSBpbiBwcm9wcykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkkMi5jYWxsKHByb3BzLCBwcm9wS2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BLZXldO1xuXG4gICAgaWYgKHByb3BWYWx1ZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocHJvcEtleSA9PT0gU1RZTEUpIHtcbiAgICAgIHByb3BWYWx1ZSA9IGNyZWF0ZU1hcmt1cEZvclN0eWxlcyhwcm9wVmFsdWUpO1xuICAgIH1cblxuICAgIHZhciBtYXJrdXAgPSBudWxsO1xuXG4gICAgaWYgKGlzQ3VzdG9tQ29tcG9uZW50KHRhZ0xvd2VyY2FzZSwgcHJvcHMpKSB7XG4gICAgICBpZiAoIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BLZXkpKSB7XG4gICAgICAgIG1hcmt1cCA9IGNyZWF0ZU1hcmt1cEZvckN1c3RvbUF0dHJpYnV0ZShwcm9wS2V5LCBwcm9wVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrdXAgPSBjcmVhdGVNYXJrdXBGb3JQcm9wZXJ0eShwcm9wS2V5LCBwcm9wVmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChtYXJrdXApIHtcbiAgICAgIHJldCArPSAnICcgKyBtYXJrdXA7XG4gICAgfVxuICB9IC8vIEZvciBzdGF0aWMgcGFnZXMsIG5vIG5lZWQgdG8gcHV0IFJlYWN0IElEIGFuZCBjaGVja3N1bS4gU2F2ZXMgbG90cyBvZlxuICAvLyBieXRlcy5cblxuXG4gIGlmIChtYWtlU3RhdGljTWFya3VwKSB7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGlmIChpc1Jvb3RFbGVtZW50KSB7XG4gICAgcmV0ICs9ICcgJyArIGNyZWF0ZU1hcmt1cEZvclJvb3QoKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUmVuZGVyUmVzdWx0KGNoaWxkLCB0eXBlKSB7XG4gIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAge1xuICAgICAge1xuICAgICAgICB0aHJvdyBFcnJvciggKGdldENvbXBvbmVudE5hbWUodHlwZSkgfHwgJ0NvbXBvbmVudCcpICsgXCIoLi4uKTogTm90aGluZyB3YXMgcmV0dXJuZWQgZnJvbSByZW5kZXIuIFRoaXMgdXN1YWxseSBtZWFucyBhIHJldHVybiBzdGF0ZW1lbnQgaXMgbWlzc2luZy4gT3IsIHRvIHJlbmRlciBub3RoaW5nLCByZXR1cm4gbnVsbC5cIiApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlKGNoaWxkLCBjb250ZXh0LCB0aHJlYWRJRCkge1xuICB3aGlsZSAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgLy8gU2FmZSBiZWNhdXNlIHdlIGp1c3QgY2hlY2tlZCBpdCdzIGFuIGVsZW1lbnQuXG4gICAgdmFyIGVsZW1lbnQgPSBjaGlsZDtcbiAgICB2YXIgQ29tcG9uZW50ID0gZWxlbWVudC50eXBlO1xuXG4gICAge1xuICAgICAgcHVzaEVsZW1lbnRUb0RlYnVnU3RhY2soZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBDb21wb25lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHByb2Nlc3NDaGlsZChlbGVtZW50LCBDb21wb25lbnQpO1xuICB9IC8vIEV4dHJhIGNsb3N1cmUgc28gcXVldWUgYW5kIHJlcGxhY2UgY2FuIGJlIGNhcHR1cmVkIHByb3Blcmx5XG5cblxuICBmdW5jdGlvbiBwcm9jZXNzQ2hpbGQoZWxlbWVudCwgQ29tcG9uZW50KSB7XG4gICAgdmFyIGlzQ2xhc3MgPSBzaG91bGRDb25zdHJ1Y3QoQ29tcG9uZW50KTtcbiAgICB2YXIgcHVibGljQ29udGV4dCA9IHByb2Nlc3NDb250ZXh0KENvbXBvbmVudCwgY29udGV4dCwgdGhyZWFkSUQsIGlzQ2xhc3MpO1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciByZXBsYWNlID0gZmFsc2U7XG4gICAgdmFyIHVwZGF0ZXIgPSB7XG4gICAgICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHF1ZXVlID09PSBudWxsKSB7XG4gICAgICAgICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgICAgIHJlcGxhY2UgPSB0cnVlO1xuICAgICAgICBxdWV1ZSA9IFtjb21wbGV0ZVN0YXRlXTtcbiAgICAgIH0sXG4gICAgICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY3VycmVudFBhcnRpYWxTdGF0ZSkge1xuICAgICAgICBpZiAocXVldWUgPT09IG51bGwpIHtcbiAgICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZS5wdXNoKGN1cnJlbnRQYXJ0aWFsU3RhdGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGluc3Q7XG5cbiAgICBpZiAoaXNDbGFzcykge1xuICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQoZWxlbWVudC5wcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlcik7XG5cbiAgICAgIGlmICh0eXBlb2YgQ29tcG9uZW50LmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB7XG4gICAgICAgICAgaWYgKGluc3Quc3RhdGUgPT09IG51bGwgfHwgaW5zdC5zdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWUoQ29tcG9uZW50KSB8fCAnVW5rbm93bic7XG5cbiAgICAgICAgICAgIGlmICghZGlkV2FybkFib3V0VW5pbml0aWFsaXplZFN0YXRlW2NvbXBvbmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgIGVycm9yKCdgJXNgIHVzZXMgYGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wc2AgYnV0IGl0cyBpbml0aWFsIHN0YXRlIGlzICcgKyAnJXMuIFRoaXMgaXMgbm90IHJlY29tbWVuZGVkLiBJbnN0ZWFkLCBkZWZpbmUgdGhlIGluaXRpYWwgc3RhdGUgYnkgJyArICdhc3NpZ25pbmcgYW4gb2JqZWN0IHRvIGB0aGlzLnN0YXRlYCBpbiB0aGUgY29uc3RydWN0b3Igb2YgYCVzYC4gJyArICdUaGlzIGVuc3VyZXMgdGhhdCBgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzYCBhcmd1bWVudHMgaGF2ZSBhIGNvbnNpc3RlbnQgc2hhcGUuJywgY29tcG9uZW50TmFtZSwgaW5zdC5zdGF0ZSA9PT0gbnVsbCA/ICdudWxsJyA6ICd1bmRlZmluZWQnLCBjb21wb25lbnROYW1lKTtcblxuICAgICAgICAgICAgICBkaWRXYXJuQWJvdXRVbmluaXRpYWxpemVkU3RhdGVbY29tcG9uZW50TmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJ0aWFsU3RhdGUgPSBDb21wb25lbnQuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzLmNhbGwobnVsbCwgZWxlbWVudC5wcm9wcywgaW5zdC5zdGF0ZSk7XG5cbiAgICAgICAge1xuICAgICAgICAgIGlmIChwYXJ0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIF9jb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJztcblxuICAgICAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRVbmRlZmluZWREZXJpdmVkU3RhdGVbX2NvbXBvbmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgIGVycm9yKCclcy5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoKTogQSB2YWxpZCBzdGF0ZSBvYmplY3QgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQuICcgKyAnWW91IGhhdmUgcmV0dXJuZWQgdW5kZWZpbmVkLicsIF9jb21wb25lbnROYW1lKTtcblxuICAgICAgICAgICAgICBkaWRXYXJuQWJvdXRVbmRlZmluZWREZXJpdmVkU3RhdGVbX2NvbXBvbmVudE5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydGlhbFN0YXRlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0LnN0YXRlID0gX2Fzc2lnbih7fSwgaW5zdC5zdGF0ZSwgcGFydGlhbFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB7XG4gICAgICAgIGlmIChDb21wb25lbnQucHJvdG90eXBlICYmIHR5cGVvZiBDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBfY29tcG9uZW50TmFtZTIgPSBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCkgfHwgJ1Vua25vd24nO1xuXG4gICAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRCYWRDbGFzc1tfY29tcG9uZW50TmFtZTJdKSB7XG4gICAgICAgICAgICBlcnJvcihcIlRoZSA8JXMgLz4gY29tcG9uZW50IGFwcGVhcnMgdG8gaGF2ZSBhIHJlbmRlciBtZXRob2QsIGJ1dCBkb2Vzbid0IGV4dGVuZCBSZWFjdC5Db21wb25lbnQuIFwiICsgJ1RoaXMgaXMgbGlrZWx5IHRvIGNhdXNlIGVycm9ycy4gQ2hhbmdlICVzIHRvIGV4dGVuZCBSZWFjdC5Db21wb25lbnQgaW5zdGVhZC4nLCBfY29tcG9uZW50TmFtZTIsIF9jb21wb25lbnROYW1lMik7XG5cbiAgICAgICAgICAgIGRpZFdhcm5BYm91dEJhZENsYXNzW19jb21wb25lbnROYW1lMl0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgY29tcG9uZW50SWRlbnRpdHkgPSB7fTtcbiAgICAgIHByZXBhcmVUb1VzZUhvb2tzKGNvbXBvbmVudElkZW50aXR5KTtcbiAgICAgIGluc3QgPSBDb21wb25lbnQoZWxlbWVudC5wcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlcik7XG4gICAgICBpbnN0ID0gZmluaXNoSG9va3MoQ29tcG9uZW50LCBlbGVtZW50LnByb3BzLCBpbnN0LCBwdWJsaWNDb250ZXh0KTtcblxuICAgICAgaWYgKGluc3QgPT0gbnVsbCB8fCBpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIGNoaWxkID0gaW5zdDtcbiAgICAgICAgdmFsaWRhdGVSZW5kZXJSZXN1bHQoY2hpbGQsIENvbXBvbmVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAge1xuICAgICAgICB2YXIgX2NvbXBvbmVudE5hbWUzID0gZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJztcblxuICAgICAgICBpZiAoIWRpZFdhcm5BYm91dE1vZHVsZVBhdHRlcm5Db21wb25lbnRbX2NvbXBvbmVudE5hbWUzXSkge1xuICAgICAgICAgIGVycm9yKCdUaGUgPCVzIC8+IGNvbXBvbmVudCBhcHBlYXJzIHRvIGJlIGEgZnVuY3Rpb24gY29tcG9uZW50IHRoYXQgcmV0dXJucyBhIGNsYXNzIGluc3RhbmNlLiAnICsgJ0NoYW5nZSAlcyB0byBhIGNsYXNzIHRoYXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQgaW5zdGVhZC4gJyArIFwiSWYgeW91IGNhbid0IHVzZSBhIGNsYXNzIHRyeSBhc3NpZ25pbmcgdGhlIHByb3RvdHlwZSBvbiB0aGUgZnVuY3Rpb24gYXMgYSB3b3JrYXJvdW5kLiBcIiArIFwiYCVzLnByb3RvdHlwZSA9IFJlYWN0LkNvbXBvbmVudC5wcm90b3R5cGVgLiBEb24ndCB1c2UgYW4gYXJyb3cgZnVuY3Rpb24gc2luY2UgaXQgXCIgKyAnY2Fubm90IGJlIGNhbGxlZCB3aXRoIGBuZXdgIGJ5IFJlYWN0LicsIF9jb21wb25lbnROYW1lMywgX2NvbXBvbmVudE5hbWUzLCBfY29tcG9uZW50TmFtZTMpO1xuXG4gICAgICAgICAgZGlkV2FybkFib3V0TW9kdWxlUGF0dGVybkNvbXBvbmVudFtfY29tcG9uZW50TmFtZTNdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGluc3QucHJvcHMgPSBlbGVtZW50LnByb3BzO1xuICAgIGluc3QuY29udGV4dCA9IHB1YmxpY0NvbnRleHQ7XG4gICAgaW5zdC51cGRhdGVyID0gdXBkYXRlcjtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gaW5zdC5zdGF0ZTtcblxuICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5zdC5zdGF0ZSA9IGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnN0LlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGluc3QuY29tcG9uZW50V2lsbE1vdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIGluc3QuY29tcG9uZW50V2lsbE1vdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAoIGluc3QuY29tcG9uZW50V2lsbE1vdW50Ll9fc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmcgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBfY29tcG9uZW50TmFtZTQgPSBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCkgfHwgJ1Vua25vd24nO1xuXG4gICAgICAgICAgICBpZiAoIWRpZFdhcm5BYm91dERlcHJlY2F0ZWRXaWxsTW91bnRbX2NvbXBvbmVudE5hbWU0XSkge1xuICAgICAgICAgICAgICB3YXJuKCAvLyBrZWVwIHRoaXMgd2FybmluZyBpbiBzeW5jIHdpdGggUmVhY3RTdHJpY3RNb2RlV2FybmluZy5qc1xuICAgICAgICAgICAgICAnY29tcG9uZW50V2lsbE1vdW50IGhhcyBiZWVuIHJlbmFtZWQsIGFuZCBpcyBub3QgcmVjb21tZW5kZWQgZm9yIHVzZS4gJyArICdTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC11bnNhZmUtY29tcG9uZW50LWxpZmVjeWNsZXMgZm9yIGRldGFpbHMuXFxuXFxuJyArICcqIE1vdmUgY29kZSBmcm9tIGNvbXBvbmVudFdpbGxNb3VudCB0byBjb21wb25lbnREaWRNb3VudCAocHJlZmVycmVkIGluIG1vc3QgY2FzZXMpICcgKyAnb3IgdGhlIGNvbnN0cnVjdG9yLlxcbicgKyAnXFxuUGxlYXNlIHVwZGF0ZSB0aGUgZm9sbG93aW5nIGNvbXBvbmVudHM6ICVzJywgX2NvbXBvbmVudE5hbWU0KTtcblxuICAgICAgICAgICAgICBkaWRXYXJuQWJvdXREZXByZWNhdGVkV2lsbE1vdW50W19jb21wb25lbnROYW1lNF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBJbiBvcmRlciB0byBzdXBwb3J0IHJlYWN0LWxpZmVjeWNsZXMtY29tcGF0IHBvbHlmaWxsZWQgY29tcG9uZW50cyxcbiAgICAgICAgLy8gVW5zYWZlIGxpZmVjeWNsZXMgc2hvdWxkIG5vdCBiZSBpbnZva2VkIGZvciBhbnkgY29tcG9uZW50IHdpdGggdGhlIG5ldyBnRFNGUC5cblxuXG4gICAgICAgIGlmICh0eXBlb2YgQ29tcG9uZW50LmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGluc3QuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpbnN0LlVOU0FGRV9jb21wb25lbnRXaWxsTW91bnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIENvbXBvbmVudC5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gSW4gb3JkZXIgdG8gc3VwcG9ydCByZWFjdC1saWZlY3ljbGVzLWNvbXBhdCBwb2x5ZmlsbGVkIGNvbXBvbmVudHMsXG4gICAgICAgIC8vIFVuc2FmZSBsaWZlY3ljbGVzIHNob3VsZCBub3QgYmUgaW52b2tlZCBmb3IgYW55IGNvbXBvbmVudCB3aXRoIHRoZSBuZXcgZ0RTRlAuXG4gICAgICAgIGluc3QuVU5TQUZFX2NvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICB2YXIgb2xkUmVwbGFjZSA9IHJlcGxhY2U7XG4gICAgICAgIHF1ZXVlID0gbnVsbDtcbiAgICAgICAgcmVwbGFjZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChvbGRSZXBsYWNlICYmIG9sZFF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGluc3Quc3RhdGUgPSBvbGRRdWV1ZVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gb2xkUmVwbGFjZSA/IG9sZFF1ZXVlWzBdIDogaW5zdC5zdGF0ZTtcbiAgICAgICAgICB2YXIgZG9udE11dGF0ZSA9IHRydWU7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gb2xkUmVwbGFjZSA/IDEgOiAwOyBpIDwgb2xkUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0aWFsID0gb2xkUXVldWVbaV07XG5cbiAgICAgICAgICAgIHZhciBfcGFydGlhbFN0YXRlID0gdHlwZW9mIHBhcnRpYWwgPT09ICdmdW5jdGlvbicgPyBwYXJ0aWFsLmNhbGwoaW5zdCwgbmV4dFN0YXRlLCBlbGVtZW50LnByb3BzLCBwdWJsaWNDb250ZXh0KSA6IHBhcnRpYWw7XG5cbiAgICAgICAgICAgIGlmIChfcGFydGlhbFN0YXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKGRvbnRNdXRhdGUpIHtcbiAgICAgICAgICAgICAgICBkb250TXV0YXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbmV4dFN0YXRlID0gX2Fzc2lnbih7fSwgbmV4dFN0YXRlLCBfcGFydGlhbFN0YXRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfYXNzaWduKG5leHRTdGF0ZSwgX3BhcnRpYWxTdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGQgPSBpbnN0LnJlbmRlcigpO1xuXG4gICAge1xuICAgICAgaWYgKGNoaWxkID09PSB1bmRlZmluZWQgJiYgaW5zdC5yZW5kZXIuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgYmFkIHByYWN0aWNlLiBDb25zaWRlciB3YXJuaW5nIGhlcmUgYW5kXG4gICAgICAgIC8vIGRlcHJlY2F0aW5nIHRoaXMgY29udmVuaWVuY2UuXG4gICAgICAgIGNoaWxkID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVJlbmRlclJlc3VsdChjaGlsZCwgQ29tcG9uZW50KTtcbiAgICB2YXIgY2hpbGRDb250ZXh0O1xuXG4gICAge1xuICAgICAgaWYgKHR5cGVvZiBpbnN0LmdldENoaWxkQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YXIgX2NoaWxkQ29udGV4dFR5cGVzID0gQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgX2NoaWxkQ29udGV4dFR5cGVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNoaWxkQ29udGV4dCA9IGluc3QuZ2V0Q2hpbGRDb250ZXh0KCk7XG5cbiAgICAgICAgICBmb3IgKHZhciBjb250ZXh0S2V5IGluIGNoaWxkQ29udGV4dCkge1xuICAgICAgICAgICAgaWYgKCEoY29udGV4dEtleSBpbiBfY2hpbGRDb250ZXh0VHlwZXMpKSB7XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvciggKGdldENvbXBvbmVudE5hbWUoQ29tcG9uZW50KSB8fCAnVW5rbm93bicpICsgXCIuZ2V0Q2hpbGRDb250ZXh0KCk6IGtleSBcXFwiXCIgKyBjb250ZXh0S2V5ICsgXCJcXFwiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLlwiICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAge1xuICAgICAgICAgICAgZXJyb3IoJyVzLmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gJyArICd1c2UgZ2V0Q2hpbGRDb250ZXh0KCkuJywgZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGlsZENvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IF9hc3NpZ24oe30sIGNvbnRleHQsIGNoaWxkQ29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjaGlsZDogY2hpbGQsXG4gICAgY29udGV4dDogY29udGV4dFxuICB9O1xufVxuXG52YXIgUmVhY3RET01TZXJ2ZXJSZW5kZXJlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIC8vIFRPRE86IHR5cGUgdGhpcyBtb3JlIHN0cmljdGx5OlxuICAvLyBERVYtb25seVxuICBmdW5jdGlvbiBSZWFjdERPTVNlcnZlclJlbmRlcmVyKGNoaWxkcmVuLCBtYWtlU3RhdGljTWFya3VwKSB7XG4gICAgdmFyIGZsYXRDaGlsZHJlbiA9IGZsYXR0ZW5Ub3BMZXZlbENoaWxkcmVuKGNoaWxkcmVuKTtcbiAgICB2YXIgdG9wRnJhbWUgPSB7XG4gICAgICB0eXBlOiBudWxsLFxuICAgICAgLy8gQXNzdW1lIGFsbCB0cmVlcyBzdGFydCBpbiB0aGUgSFRNTCBuYW1lc3BhY2UgKG5vdCB0b3RhbGx5IHRydWUsIGJ1dFxuICAgICAgLy8gdGhpcyBpcyB3aGF0IHdlIGRpZCBoaXN0b3JpY2FsbHkpXG4gICAgICBkb21OYW1lc3BhY2U6IE5hbWVzcGFjZXMuaHRtbCxcbiAgICAgIGNoaWxkcmVuOiBmbGF0Q2hpbGRyZW4sXG4gICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgY29udGV4dDogZW1wdHlPYmplY3QsXG4gICAgICBmb290ZXI6ICcnXG4gICAgfTtcblxuICAgIHtcbiAgICAgIHRvcEZyYW1lLmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgfVxuXG4gICAgdGhpcy50aHJlYWRJRCA9IGFsbG9jVGhyZWFkSUQoKTtcbiAgICB0aGlzLnN0YWNrID0gW3RvcEZyYW1lXTtcbiAgICB0aGlzLmV4aGF1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFNlbGVjdFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSBmYWxzZTtcbiAgICB0aGlzLm1ha2VTdGF0aWNNYXJrdXAgPSBtYWtlU3RhdGljTWFya3VwO1xuICAgIHRoaXMuc3VzcGVuc2VEZXB0aCA9IDA7IC8vIENvbnRleHQgKG5ldyBBUEkpXG5cbiAgICB0aGlzLmNvbnRleHRJbmRleCA9IC0xO1xuICAgIHRoaXMuY29udGV4dFN0YWNrID0gW107XG4gICAgdGhpcy5jb250ZXh0VmFsdWVTdGFjayA9IFtdO1xuXG4gICAge1xuICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXJTdGFjayA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBSZWFjdERPTVNlcnZlclJlbmRlcmVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmV4aGF1c3RlZCkge1xuICAgICAgdGhpcy5leGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhclByb3ZpZGVycygpO1xuICAgICAgZnJlZVRocmVhZElEKHRoaXMudGhyZWFkSUQpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogTm90ZTogV2UgdXNlIGp1c3QgdHdvIHN0YWNrcyByZWdhcmRsZXNzIG9mIGhvdyBtYW55IGNvbnRleHQgcHJvdmlkZXJzIHlvdSBoYXZlLlxuICAgKiBQcm92aWRlcnMgYXJlIGFsd2F5cyBwb3BwZWQgaW4gdGhlIHJldmVyc2Ugb3JkZXIgdG8gaG93IHRoZXkgd2VyZSBwdXNoZWRcbiAgICogc28gd2UgYWx3YXlzIGtub3cgb24gdGhlIHdheSBkb3duIHdoaWNoIHByb3ZpZGVyIHlvdSdsbCBlbmNvdW50ZXIgbmV4dCBvbiB0aGUgd2F5IHVwLlxuICAgKiBPbiB0aGUgd2F5IGRvd24sIHdlIHB1c2ggdGhlIGN1cnJlbnQgcHJvdmlkZXIsIGFuZCBpdHMgY29udGV4dCB2YWx1ZSAqYmVmb3JlKlxuICAgKiB3ZSBtdXRhdGVkIGl0LCBvbnRvIHRoZSBzdGFja3MuIFRoZXJlZm9yZSwgb24gdGhlIHdheSB1cCwgd2UgYWx3YXlzIGtub3cgd2hpY2hcbiAgICogcHJvdmlkZXIgbmVlZHMgdG8gYmUgXCJyZXN0b3JlZFwiIHRvIHdoaWNoIHZhbHVlLlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC8xMjk4NSNpc3N1ZWNvbW1lbnQtMzk2MzAxMjQ4XG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLnB1c2hQcm92aWRlciA9IGZ1bmN0aW9uIHB1c2hQcm92aWRlcihwcm92aWRlcikge1xuICAgIHZhciBpbmRleCA9ICsrdGhpcy5jb250ZXh0SW5kZXg7XG4gICAgdmFyIGNvbnRleHQgPSBwcm92aWRlci50eXBlLl9jb250ZXh0O1xuICAgIHZhciB0aHJlYWRJRCA9IHRoaXMudGhyZWFkSUQ7XG4gICAgdmFsaWRhdGVDb250ZXh0Qm91bmRzKGNvbnRleHQsIHRocmVhZElEKTtcbiAgICB2YXIgcHJldmlvdXNWYWx1ZSA9IGNvbnRleHRbdGhyZWFkSURdOyAvLyBSZW1lbWJlciB3aGljaCB2YWx1ZSB0byByZXN0b3JlIHRoaXMgY29udGV4dCB0byBvbiBvdXIgd2F5IHVwLlxuXG4gICAgdGhpcy5jb250ZXh0U3RhY2tbaW5kZXhdID0gY29udGV4dDtcbiAgICB0aGlzLmNvbnRleHRWYWx1ZVN0YWNrW2luZGV4XSA9IHByZXZpb3VzVmFsdWU7XG5cbiAgICB7XG4gICAgICAvLyBPbmx5IHVzZWQgZm9yIHB1c2gvcG9wIG1pc21hdGNoIHdhcm5pbmdzLlxuICAgICAgdGhpcy5jb250ZXh0UHJvdmlkZXJTdGFja1tpbmRleF0gPSBwcm92aWRlcjtcbiAgICB9IC8vIE11dGF0ZSB0aGUgY3VycmVudCB2YWx1ZS5cblxuXG4gICAgY29udGV4dFt0aHJlYWRJRF0gPSBwcm92aWRlci5wcm9wcy52YWx1ZTtcbiAgfTtcblxuICBfcHJvdG8ucG9wUHJvdmlkZXIgPSBmdW5jdGlvbiBwb3BQcm92aWRlcihwcm92aWRlcikge1xuICAgIHZhciBpbmRleCA9IHRoaXMuY29udGV4dEluZGV4O1xuXG4gICAge1xuICAgICAgaWYgKGluZGV4IDwgMCB8fCBwcm92aWRlciAhPT0gdGhpcy5jb250ZXh0UHJvdmlkZXJTdGFja1tpbmRleF0pIHtcbiAgICAgICAgZXJyb3IoJ1VuZXhwZWN0ZWQgcG9wLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0U3RhY2tbaW5kZXhdO1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gdGhpcy5jb250ZXh0VmFsdWVTdGFja1tpbmRleF07IC8vIFwiSGlkZVwiIHRoZXNlIG51bGwgYXNzaWdubWVudHMgZnJvbSBGbG93IGJ5IHVzaW5nIGBhbnlgXG4gICAgLy8gYmVjYXVzZSBjb25jZXB0dWFsbHkgdGhleSBhcmUgZGVsZXRpb25zLS1hcyBsb25nIGFzIHdlXG4gICAgLy8gcHJvbWlzZSB0byBuZXZlciBhY2Nlc3MgdmFsdWVzIGJleW9uZCBgdGhpcy5jb250ZXh0SW5kZXhgLlxuXG4gICAgdGhpcy5jb250ZXh0U3RhY2tbaW5kZXhdID0gbnVsbDtcbiAgICB0aGlzLmNvbnRleHRWYWx1ZVN0YWNrW2luZGV4XSA9IG51bGw7XG5cbiAgICB7XG4gICAgICB0aGlzLmNvbnRleHRQcm92aWRlclN0YWNrW2luZGV4XSA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0SW5kZXgtLTsgLy8gUmVzdG9yZSB0byB0aGUgcHJldmlvdXMgdmFsdWUgd2Ugc3RvcmVkIGFzIHdlIHdlcmUgd2Fsa2luZyBkb3duLlxuICAgIC8vIFdlJ3ZlIGFscmVhZHkgdmVyaWZpZWQgdGhhdCB0aGlzIGNvbnRleHQgaGFzIGJlZW4gZXhwYW5kZWQgdG8gYWNjb21tb2RhdGVcbiAgICAvLyB0aGlzIHRocmVhZCBpZCwgc28gd2UgZG9uJ3QgbmVlZCB0byBkbyBpdCBhZ2Fpbi5cblxuICAgIGNvbnRleHRbdGhpcy50aHJlYWRJRF0gPSBwcmV2aW91c1ZhbHVlO1xuICB9O1xuXG4gIF9wcm90by5jbGVhclByb3ZpZGVycyA9IGZ1bmN0aW9uIGNsZWFyUHJvdmlkZXJzKCkge1xuICAgIC8vIFJlc3RvcmUgYW55IHJlbWFpbmluZyBwcm92aWRlcnMgb24gdGhlIHN0YWNrIHRvIHByZXZpb3VzIHZhbHVlc1xuICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5jb250ZXh0SW5kZXg7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcy5jb250ZXh0U3RhY2tbaW5kZXhdO1xuICAgICAgdmFyIHByZXZpb3VzVmFsdWUgPSB0aGlzLmNvbnRleHRWYWx1ZVN0YWNrW2luZGV4XTtcbiAgICAgIGNvbnRleHRbdGhpcy50aHJlYWRJRF0gPSBwcmV2aW91c1ZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVhZCA9IGZ1bmN0aW9uIHJlYWQoYnl0ZXMpIHtcbiAgICBpZiAodGhpcy5leGhhdXN0ZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBwcmV2VGhyZWFkSUQgPSBjdXJyZW50VGhyZWFkSUQ7XG4gICAgc2V0Q3VycmVudFRocmVhZElEKHRoaXMudGhyZWFkSUQpO1xuICAgIHZhciBwcmV2RGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudDtcbiAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQgPSBEaXNwYXRjaGVyO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIE1hcmt1cCBnZW5lcmF0ZWQgd2l0aGluIDxTdXNwZW5zZT4gZW5kcyB1cCBidWZmZXJlZCB1bnRpbCB3ZSBrbm93XG4gICAgICAvLyBub3RoaW5nIGluIHRoYXQgYm91bmRhcnkgc3VzcGVuZGVkXG4gICAgICB2YXIgb3V0ID0gWycnXTtcbiAgICAgIHZhciBzdXNwZW5kZWQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKG91dFswXS5sZW5ndGggPCBieXRlcykge1xuICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmV4aGF1c3RlZCA9IHRydWU7XG4gICAgICAgICAgZnJlZVRocmVhZElEKHRoaXMudGhyZWFkSUQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZyYW1lID0gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChzdXNwZW5kZWQgfHwgZnJhbWUuY2hpbGRJbmRleCA+PSBmcmFtZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgZm9vdGVyID0gZnJhbWUuZm9vdGVyO1xuXG4gICAgICAgICAgaWYgKGZvb3RlciAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNXYXNUZXh0Tm9kZSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc3RhY2sucG9wKCk7XG5cbiAgICAgICAgICBpZiAoZnJhbWUudHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdFZhbHVlID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZyYW1lLnR5cGUgIT0gbnVsbCAmJiBmcmFtZS50eXBlLnR5cGUgIT0gbnVsbCAmJiBmcmFtZS50eXBlLnR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUpIHtcbiAgICAgICAgICAgIHZhciBwcm92aWRlciA9IGZyYW1lLnR5cGU7XG4gICAgICAgICAgICB0aGlzLnBvcFByb3ZpZGVyKHByb3ZpZGVyKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZyYW1lLnR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUpIHtcbiAgICAgICAgICAgIHRoaXMuc3VzcGVuc2VEZXB0aC0tO1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcmVkID0gb3V0LnBvcCgpO1xuXG4gICAgICAgICAgICBpZiAoc3VzcGVuZGVkKSB7XG4gICAgICAgICAgICAgIHN1c3BlbmRlZCA9IGZhbHNlOyAvLyBJZiByZW5kZXJpbmcgd2FzIHN1c3BlbmRlZCBhdCB0aGlzIGJvdW5kYXJ5LCByZW5kZXIgdGhlIGZhbGxiYWNrRnJhbWVcblxuICAgICAgICAgICAgICB2YXIgZmFsbGJhY2tGcmFtZSA9IGZyYW1lLmZhbGxiYWNrRnJhbWU7XG5cbiAgICAgICAgICAgICAgaWYgKCFmYWxsYmFja0ZyYW1lKSB7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IodHJ1ZSA/IFwiUmVhY3RET01TZXJ2ZXIgZGlkIG5vdCBmaW5kIGFuIGludGVybmFsIGZhbGxiYWNrIGZyYW1lIGZvciBTdXNwZW5zZS4gVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuXCIgOiBmb3JtYXRQcm9kRXJyb3JNZXNzYWdlKDMwMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChmYWxsYmFja0ZyYW1lKTtcbiAgICAgICAgICAgICAgb3V0W3RoaXMuc3VzcGVuc2VEZXB0aF0gKz0gJzwhLS0kIS0tPic7IC8vIFNraXAgZmx1c2hpbmcgb3V0cHV0IHNpbmNlIHdlJ3JlIHN3aXRjaGluZyB0byB0aGUgZmFsbGJhY2tcblxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG91dFt0aGlzLnN1c3BlbnNlRGVwdGhdICs9IGJ1ZmZlcmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gRmx1c2ggb3V0cHV0XG5cblxuICAgICAgICAgIG91dFt0aGlzLnN1c3BlbnNlRGVwdGhdICs9IGZvb3RlcjtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGlsZCA9IGZyYW1lLmNoaWxkcmVuW2ZyYW1lLmNoaWxkSW5kZXgrK107XG4gICAgICAgIHZhciBvdXRCdWZmZXIgPSAnJztcblxuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgIHB1c2hDdXJyZW50RGVidWdTdGFjayh0aGlzLnN0YWNrKTsgLy8gV2UncmUgc3RhcnRpbmcgd29yayBvbiB0aGlzIGZyYW1lLCBzbyByZXNldCBpdHMgaW5uZXIgc3RhY2suXG5cbiAgICAgICAgICBmcmFtZS5kZWJ1Z0VsZW1lbnRTdGFjay5sZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBvdXRCdWZmZXIgKz0gdGhpcy5yZW5kZXIoY2hpbGQsIGZyYW1lLmNvbnRleHQsIGZyYW1lLmRvbU5hbWVzcGFjZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIgIT0gbnVsbCAmJiB0eXBlb2YgZXJyLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVTdXNwZW5zZVNlcnZlclJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgIGlmICghKHRoaXMuc3VzcGVuc2VEZXB0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IodHJ1ZSA/IFwiQSBSZWFjdCBjb21wb25lbnQgc3VzcGVuZGVkIHdoaWxlIHJlbmRlcmluZywgYnV0IG5vIGZhbGxiYWNrIFVJIHdhcyBzcGVjaWZpZWQuXFxuXFxuQWRkIGEgPFN1c3BlbnNlIGZhbGxiYWNrPS4uLj4gY29tcG9uZW50IGhpZ2hlciBpbiB0aGUgdHJlZSB0byBwcm92aWRlIGEgbG9hZGluZyBpbmRpY2F0b3Igb3IgcGxhY2Vob2xkZXIgdG8gZGlzcGxheS5cIiA6IGZvcm1hdFByb2RFcnJvck1lc3NhZ2UoMzQyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc3VzcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcih0cnVlID8gXCJSZWFjdERPTVNlcnZlciBkb2VzIG5vdCB5ZXQgc3VwcG9ydCBTdXNwZW5zZS5cIiA6IGZvcm1hdFByb2RFcnJvck1lc3NhZ2UoMjk0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaWYgKHRydWUpIHtcbiAgICAgICAgICAgIHBvcEN1cnJlbnREZWJ1Z1N0YWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dC5sZW5ndGggPD0gdGhpcy5zdXNwZW5zZURlcHRoKSB7XG4gICAgICAgICAgb3V0LnB1c2goJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0W3RoaXMuc3VzcGVuc2VEZXB0aF0gKz0gb3V0QnVmZmVyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0WzBdO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQgPSBwcmV2RGlzcGF0Y2hlcjtcbiAgICAgIHNldEN1cnJlbnRUaHJlYWRJRChwcmV2VGhyZWFkSUQpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKGNoaWxkLCBjb250ZXh0LCBwYXJlbnROYW1lc3BhY2UpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIgdGV4dCA9ICcnICsgY2hpbGQ7XG5cbiAgICAgIGlmICh0ZXh0ID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZVRleHRGb3JCcm93c2VyKHRleHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wcmV2aW91c1dhc1RleHROb2RlKSB7XG4gICAgICAgIHJldHVybiAnPCEtLSAtLT4nICsgZXNjYXBlVGV4dEZvckJyb3dzZXIodGV4dCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJldmlvdXNXYXNUZXh0Tm9kZSA9IHRydWU7XG4gICAgICByZXR1cm4gZXNjYXBlVGV4dEZvckJyb3dzZXIodGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBuZXh0Q2hpbGQ7XG5cbiAgICAgIHZhciBfcmVzb2x2ZSA9IHJlc29sdmUoY2hpbGQsIGNvbnRleHQsIHRoaXMudGhyZWFkSUQpO1xuXG4gICAgICBuZXh0Q2hpbGQgPSBfcmVzb2x2ZS5jaGlsZDtcbiAgICAgIGNvbnRleHQgPSBfcmVzb2x2ZS5jb250ZXh0O1xuXG4gICAgICBpZiAobmV4dENoaWxkID09PSBudWxsIHx8IG5leHRDaGlsZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmICghUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV4dENoaWxkKSkge1xuICAgICAgICBpZiAobmV4dENoaWxkICE9IG51bGwgJiYgbmV4dENoaWxkLiQkdHlwZW9mICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBDYXRjaCB1bmV4cGVjdGVkIHNwZWNpYWwgdHlwZXMgZWFybHkuXG4gICAgICAgICAgdmFyICQkdHlwZW9mID0gbmV4dENoaWxkLiQkdHlwZW9mO1xuXG4gICAgICAgICAgaWYgKCEoJCR0eXBlb2YgIT09IFJFQUNUX1BPUlRBTF9UWVBFKSkge1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCJQb3J0YWxzIGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBieSB0aGUgc2VydmVyIHJlbmRlcmVyLiBSZW5kZXIgdGhlbSBjb25kaXRpb25hbGx5IHNvIHRoYXQgdGhleSBvbmx5IGFwcGVhciBvbiB0aGUgY2xpZW50IHJlbmRlci5cIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gLy8gQ2F0Y2gtYWxsIHRvIHByZXZlbnQgYW4gaW5maW5pdGUgbG9vcCBpZiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KCkgc3VwcG9ydHMgc29tZSBuZXcgdHlwZS5cblxuXG4gICAgICAgICAge1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCJVbmtub3duIGVsZW1lbnQtbGlrZSBvYmplY3QgdHlwZTogXCIgKyAkJHR5cGVvZi50b1N0cmluZygpICsgXCIuIFRoaXMgaXMgbGlrZWx5IGEgYnVnIGluIFJlYWN0LiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS5cIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSB0b0FycmF5KG5leHRDaGlsZCk7XG4gICAgICAgIHZhciBmcmFtZSA9IHtcbiAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgIGNoaWxkcmVuOiBuZXh0Q2hpbGRyZW4sXG4gICAgICAgICAgY2hpbGRJbmRleDogMCxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIGZvb3RlcjogJydcbiAgICAgICAgfTtcblxuICAgICAgICB7XG4gICAgICAgICAgZnJhbWUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChmcmFtZSk7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gLy8gU2FmZSBiZWNhdXNlIHdlIGp1c3QgY2hlY2tlZCBpdCdzIGFuIGVsZW1lbnQuXG5cblxuICAgICAgdmFyIG5leHRFbGVtZW50ID0gbmV4dENoaWxkO1xuICAgICAgdmFyIGVsZW1lbnRUeXBlID0gbmV4dEVsZW1lbnQudHlwZTtcblxuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50VHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRE9NKG5leHRFbGVtZW50LCBjb250ZXh0LCBwYXJlbnROYW1lc3BhY2UpO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGVsZW1lbnRUeXBlKSB7XG4gICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBfbmV4dENoaWxkcmVuID0gdG9BcnJheShuZXh0Q2hpbGQucHJvcHMuY2hpbGRyZW4pO1xuXG4gICAgICAgICAgICB2YXIgX2ZyYW1lID0ge1xuICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICBkb21OYW1lc3BhY2U6IHBhcmVudE5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgY2hpbGRyZW46IF9uZXh0Q2hpbGRyZW4sXG4gICAgICAgICAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgIGZvb3RlcjogJydcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgX2ZyYW1lLmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChfZnJhbWUpO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgIH1cblxuICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAge1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoIFwiUmVhY3RET01TZXJ2ZXIgZG9lcyBub3QgeWV0IHN1cHBvcnQgU3VzcGVuc2UuXCIgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudFR5cGUgPT09ICdvYmplY3QnICYmIGVsZW1lbnRUeXBlICE9PSBudWxsKSB7XG4gICAgICAgIHN3aXRjaCAoZWxlbWVudFR5cGUuJCR0eXBlb2YpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV4dENoaWxkO1xuXG4gICAgICAgICAgICAgIHZhciBfbmV4dENoaWxkcmVuNDtcblxuICAgICAgICAgICAgICB2YXIgY29tcG9uZW50SWRlbnRpdHkgPSB7fTtcbiAgICAgICAgICAgICAgcHJlcGFyZVRvVXNlSG9va3MoY29tcG9uZW50SWRlbnRpdHkpO1xuICAgICAgICAgICAgICBfbmV4dENoaWxkcmVuNCA9IGVsZW1lbnRUeXBlLnJlbmRlcihlbGVtZW50LnByb3BzLCBlbGVtZW50LnJlZik7XG4gICAgICAgICAgICAgIF9uZXh0Q2hpbGRyZW40ID0gZmluaXNoSG9va3MoZWxlbWVudFR5cGUucmVuZGVyLCBlbGVtZW50LnByb3BzLCBfbmV4dENoaWxkcmVuNCwgZWxlbWVudC5yZWYpO1xuICAgICAgICAgICAgICBfbmV4dENoaWxkcmVuNCA9IHRvQXJyYXkoX25leHRDaGlsZHJlbjQpO1xuICAgICAgICAgICAgICB2YXIgX2ZyYW1lNCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBfbmV4dENoaWxkcmVuNCxcbiAgICAgICAgICAgICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfZnJhbWU0LmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2goX2ZyYW1lNCk7XG4gICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB2YXIgX2VsZW1lbnQgPSBuZXh0Q2hpbGQ7XG4gICAgICAgICAgICAgIHZhciBfbmV4dENoaWxkcmVuNSA9IFtSZWFjdC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlLnR5cGUsIF9hc3NpZ24oe1xuICAgICAgICAgICAgICAgIHJlZjogX2VsZW1lbnQucmVmXG4gICAgICAgICAgICAgIH0sIF9lbGVtZW50LnByb3BzKSldO1xuICAgICAgICAgICAgICB2YXIgX2ZyYW1lNSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBfbmV4dENoaWxkcmVuNSxcbiAgICAgICAgICAgICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfZnJhbWU1LmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2goX2ZyYW1lNSk7XG4gICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIHByb3ZpZGVyID0gbmV4dENoaWxkO1xuICAgICAgICAgICAgICB2YXIgbmV4dFByb3BzID0gcHJvdmlkZXIucHJvcHM7XG5cbiAgICAgICAgICAgICAgdmFyIF9uZXh0Q2hpbGRyZW42ID0gdG9BcnJheShuZXh0UHJvcHMuY2hpbGRyZW4pO1xuXG4gICAgICAgICAgICAgIHZhciBfZnJhbWU2ID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBfbmV4dENoaWxkcmVuNixcbiAgICAgICAgICAgICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfZnJhbWU2LmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLnB1c2hQcm92aWRlcihwcm92aWRlcik7XG4gICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChfZnJhbWU2KTtcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZhciByZWFjdENvbnRleHQgPSBuZXh0Q2hpbGQudHlwZTsgLy8gVGhlIGxvZ2ljIGJlbG93IGZvciBDb250ZXh0IGRpZmZlcnMgZGVwZW5kaW5nIG9uIFBST0Qgb3IgREVWIG1vZGUuIEluXG4gICAgICAgICAgICAgIC8vIERFViBtb2RlLCB3ZSBjcmVhdGUgYSBzZXBhcmF0ZSBvYmplY3QgZm9yIENvbnRleHQuQ29uc3VtZXIgdGhhdCBhY3RzXG4gICAgICAgICAgICAgIC8vIGxpa2UgYSBwcm94eSB0byBDb250ZXh0LiBUaGlzIHByb3h5IG9iamVjdCBhZGRzIHVubmVjZXNzYXJ5IGNvZGUgaW4gUFJPRFxuICAgICAgICAgICAgICAvLyBzbyB3ZSB1c2UgdGhlIG9sZCBiZWhhdmlvdXIgKENvbnRleHQuQ29uc3VtZXIgcmVmZXJlbmNlcyBDb250ZXh0KSB0b1xuICAgICAgICAgICAgICAvLyByZWR1Y2Ugc2l6ZSBhbmQgb3ZlcmhlYWQuIFRoZSBzZXBhcmF0ZSBvYmplY3QgcmVmZXJlbmNlcyBjb250ZXh0IHZpYVxuICAgICAgICAgICAgICAvLyBhIHByb3BlcnR5IGNhbGxlZCBcIl9jb250ZXh0XCIsIHdoaWNoIGFsc28gZ2l2ZXMgdXMgdGhlIGFiaWxpdHkgdG8gY2hlY2tcbiAgICAgICAgICAgICAgLy8gaW4gREVWIG1vZGUgaWYgdGhpcyBwcm9wZXJ0eSBleGlzdHMgb3Igbm90IGFuZCB3YXJuIGlmIGl0IGRvZXMgbm90LlxuXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAocmVhY3RDb250ZXh0Ll9jb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFRoaXMgbWF5IGJlIGJlY2F1c2UgaXQncyBhIENvbnRleHQgKHJhdGhlciB0aGFuIGEgQ29uc3VtZXIpLlxuICAgICAgICAgICAgICAgICAgLy8gT3IgaXQgbWF5IGJlIGJlY2F1c2UgaXQncyBvbGRlciBSZWFjdCB3aGVyZSB0aGV5J3JlIHRoZSBzYW1lIHRoaW5nLlxuICAgICAgICAgICAgICAgICAgLy8gV2Ugb25seSB3YW50IHRvIHdhcm4gaWYgd2UncmUgc3VyZSBpdCdzIGEgbmV3IFJlYWN0LlxuICAgICAgICAgICAgICAgICAgaWYgKHJlYWN0Q29udGV4dCAhPT0gcmVhY3RDb250ZXh0LkNvbnN1bWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ0NvbnRleHRBc0NvbnN1bWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGFzV2FybmVkQWJvdXRVc2luZ0NvbnRleHRBc0NvbnN1bWVyID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yKCdSZW5kZXJpbmcgPENvbnRleHQ+IGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAnICsgJ2EgZnV0dXJlIG1ham9yIHJlbGVhc2UuIERpZCB5b3UgbWVhbiB0byByZW5kZXIgPENvbnRleHQuQ29uc3VtZXI+IGluc3RlYWQ/Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmVhY3RDb250ZXh0ID0gcmVhY3RDb250ZXh0Ll9jb250ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBfbmV4dFByb3BzID0gbmV4dENoaWxkLnByb3BzO1xuICAgICAgICAgICAgICB2YXIgdGhyZWFkSUQgPSB0aGlzLnRocmVhZElEO1xuICAgICAgICAgICAgICB2YWxpZGF0ZUNvbnRleHRCb3VuZHMocmVhY3RDb250ZXh0LCB0aHJlYWRJRCk7XG4gICAgICAgICAgICAgIHZhciBuZXh0VmFsdWUgPSByZWFjdENvbnRleHRbdGhyZWFkSURdO1xuXG4gICAgICAgICAgICAgIHZhciBfbmV4dENoaWxkcmVuNyA9IHRvQXJyYXkoX25leHRQcm9wcy5jaGlsZHJlbihuZXh0VmFsdWUpKTtcblxuICAgICAgICAgICAgICB2YXIgX2ZyYW1lNyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBuZXh0Q2hpbGQsXG4gICAgICAgICAgICAgICAgZG9tTmFtZXNwYWNlOiBwYXJlbnROYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IF9uZXh0Q2hpbGRyZW43LFxuICAgICAgICAgICAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICcnXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIF9mcmFtZTcuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChfZnJhbWU3KTtcbiAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZS1uby1mYWxsdGhyb3VnaFxuXG4gICAgICAgICAgY2FzZSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFOlxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCJSZWFjdERPTVNlcnZlciBkb2VzIG5vdCB5ZXQgc3VwcG9ydCB0aGUgZnVuZGFtZW50YWwgQVBJLlwiICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lLW5vLWZhbGx0aHJvdWdoXG5cbiAgICAgICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdmFyIF9lbGVtZW50MiA9IG5leHRDaGlsZDtcbiAgICAgICAgICAgICAgdmFyIGxhenlDb21wb25lbnQgPSBuZXh0Q2hpbGQudHlwZTsgLy8gQXR0ZW1wdCB0byBpbml0aWFsaXplIGxhenkgY29tcG9uZW50IHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGVcbiAgICAgICAgICAgICAgLy8gc3VzcGVuc2Ugc2VydmVyLXNpZGUgcmVuZGVyZXIgaXMgZW5hYmxlZCBzbyBzeW5jaHJvbm91c2x5XG4gICAgICAgICAgICAgIC8vIHJlc29sdmVkIGNvbnN0cnVjdG9ycyBhcmUgc3VwcG9ydGVkLlxuXG4gICAgICAgICAgICAgIGluaXRpYWxpemVMYXp5Q29tcG9uZW50VHlwZShsYXp5Q29tcG9uZW50KTtcblxuICAgICAgICAgICAgICBzd2l0Y2ggKGxhenlDb21wb25lbnQuX3N0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgUmVzb2x2ZWQ6XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbmV4dENoaWxkcmVuOSA9IFtSZWFjdC5jcmVhdGVFbGVtZW50KGxhenlDb21wb25lbnQuX3Jlc3VsdCwgX2Fzc2lnbih7XG4gICAgICAgICAgICAgICAgICAgICAgcmVmOiBfZWxlbWVudDIucmVmXG4gICAgICAgICAgICAgICAgICAgIH0sIF9lbGVtZW50Mi5wcm9wcykpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9mcmFtZTkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICBkb21OYW1lc3BhY2U6IHBhcmVudE5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogX25leHRDaGlsZHJlbjksXG4gICAgICAgICAgICAgICAgICAgICAgY2hpbGRJbmRleDogMCxcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogJydcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgX2ZyYW1lOS5kZWJ1Z0VsZW1lbnRTdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKF9mcmFtZTkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXNlIFJlamVjdGVkOlxuICAgICAgICAgICAgICAgICAgdGhyb3cgbGF6eUNvbXBvbmVudC5fcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgY2FzZSBQZW5kaW5nOlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCJSZWFjdERPTVNlcnZlciBkb2VzIG5vdCB5ZXQgc3VwcG9ydCBsYXp5LWxvYWRlZCBjb21wb25lbnRzLlwiICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lLW5vLWZhbGx0aHJvdWdoXG5cbiAgICAgICAgICBjYXNlIFJFQUNUX1NDT1BFX1RZUEU6XG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCBcIlJlYWN0RE9NU2VydmVyIGRvZXMgbm90IHlldCBzdXBwb3J0IHNjb3BlIGNvbXBvbmVudHMuXCIgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaW5mbyA9ICcnO1xuXG4gICAgICB7XG4gICAgICAgIHZhciBvd25lciA9IG5leHRFbGVtZW50Ll9vd25lcjtcblxuICAgICAgICBpZiAoZWxlbWVudFR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZWxlbWVudFR5cGUgPT09ICdvYmplY3QnICYmIGVsZW1lbnRUeXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKGVsZW1lbnRUeXBlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBcIiArICduYW1lZCBpbXBvcnRzLic7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3duZXJOYW1lID0gb3duZXIgPyBnZXRDb21wb25lbnROYW1lKG93bmVyKSA6IG51bGw7XG5cbiAgICAgICAgaWYgKG93bmVyTmFtZSkge1xuICAgICAgICAgIGluZm8gKz0gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgb3duZXJOYW1lICsgJ2AuJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB7XG4gICAgICAgIHtcbiAgICAgICAgICB0aHJvdyBFcnJvciggXCJFbGVtZW50IHR5cGUgaXMgaW52YWxpZDogZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciBidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlIGNvbXBvbmVudHMpIGJ1dCBnb3Q6IFwiICsgKGVsZW1lbnRUeXBlID09IG51bGwgPyBlbGVtZW50VHlwZSA6IHR5cGVvZiBlbGVtZW50VHlwZSkgKyBcIi5cIiArIGluZm8gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyRE9NID0gZnVuY3Rpb24gcmVuZGVyRE9NKGVsZW1lbnQsIGNvbnRleHQsIHBhcmVudE5hbWVzcGFjZSkge1xuICAgIHZhciB0YWcgPSBlbGVtZW50LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbmFtZXNwYWNlID0gcGFyZW50TmFtZXNwYWNlO1xuXG4gICAgaWYgKHBhcmVudE5hbWVzcGFjZSA9PT0gTmFtZXNwYWNlcy5odG1sKSB7XG4gICAgICBuYW1lc3BhY2UgPSBnZXRJbnRyaW5zaWNOYW1lc3BhY2UodGFnKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAobmFtZXNwYWNlID09PSBOYW1lc3BhY2VzLmh0bWwpIHtcbiAgICAgICAgLy8gU2hvdWxkIHRoaXMgY2hlY2sgYmUgZ2F0ZWQgYnkgcGFyZW50IG5hbWVzcGFjZT8gTm90IHN1cmUgd2Ugd2FudCB0b1xuICAgICAgICAvLyBhbGxvdyA8U1ZHPiBvciA8bUFUSD4uXG4gICAgICAgIGlmICh0YWcgIT09IGVsZW1lbnQudHlwZSkge1xuICAgICAgICAgIGVycm9yKCc8JXMgLz4gaXMgdXNpbmcgaW5jb3JyZWN0IGNhc2luZy4gJyArICdVc2UgUGFzY2FsQ2FzZSBmb3IgUmVhY3QgY29tcG9uZW50cywgJyArICdvciBsb3dlcmNhc2UgZm9yIEhUTUwgZWxlbWVudHMuJywgZWxlbWVudC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlRGFuZ2Vyb3VzVGFnKHRhZyk7XG4gICAgdmFyIHByb3BzID0gZWxlbWVudC5wcm9wcztcblxuICAgIGlmICh0YWcgPT09ICdpbnB1dCcpIHtcbiAgICAgIHtcbiAgICAgICAgUmVhY3RDb250cm9sbGVkVmFsdWVQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoJ2lucHV0JywgcHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy5jaGVja2VkICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuZGVmYXVsdENoZWNrZWQgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FybkRlZmF1bHRDaGVja2VkKSB7XG4gICAgICAgICAgZXJyb3IoJyVzIGNvbnRhaW5zIGFuIGlucHV0IG9mIHR5cGUgJXMgd2l0aCBib3RoIGNoZWNrZWQgYW5kIGRlZmF1bHRDaGVja2VkIHByb3BzLiAnICsgJ0lucHV0IGVsZW1lbnRzIG11c3QgYmUgZWl0aGVyIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkICcgKyAnKHNwZWNpZnkgZWl0aGVyIHRoZSBjaGVja2VkIHByb3AsIG9yIHRoZSBkZWZhdWx0Q2hlY2tlZCBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgaW5wdXQgJyArICdlbGVtZW50IGFuZCByZW1vdmUgb25lIG9mIHRoZXNlIHByb3BzLiBNb3JlIGluZm86ICcgKyAnaHR0cHM6Ly9mYi5tZS9yZWFjdC1jb250cm9sbGVkLWNvbXBvbmVudHMnLCAnQSBjb21wb25lbnQnLCBwcm9wcy50eXBlKTtcblxuICAgICAgICAgIGRpZFdhcm5EZWZhdWx0Q2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FybkRlZmF1bHRJbnB1dFZhbHVlKSB7XG4gICAgICAgICAgZXJyb3IoJyVzIGNvbnRhaW5zIGFuIGlucHV0IG9mIHR5cGUgJXMgd2l0aCBib3RoIHZhbHVlIGFuZCBkZWZhdWx0VmFsdWUgcHJvcHMuICcgKyAnSW5wdXQgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIGlucHV0ICcgKyAnZWxlbWVudCBhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJywgJ0EgY29tcG9uZW50JywgcHJvcHMudHlwZSk7XG5cbiAgICAgICAgICBkaWRXYXJuRGVmYXVsdElucHV0VmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHByb3BzID0gX2Fzc2lnbih7XG4gICAgICAgIHR5cGU6IHVuZGVmaW5lZFxuICAgICAgfSwgcHJvcHMsIHtcbiAgICAgICAgZGVmYXVsdENoZWNrZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSAhPSBudWxsID8gcHJvcHMudmFsdWUgOiBwcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICAgIGNoZWNrZWQ6IHByb3BzLmNoZWNrZWQgIT0gbnVsbCA/IHByb3BzLmNoZWNrZWQgOiBwcm9wcy5kZWZhdWx0Q2hlY2tlZFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgIHtcbiAgICAgICAgUmVhY3RDb250cm9sbGVkVmFsdWVQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoJ3RleHRhcmVhJywgcHJvcHMpO1xuXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdFRleHRhcmVhVmFsdWUpIHtcbiAgICAgICAgICBlcnJvcignVGV4dGFyZWEgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHRleHRhcmVhICcgKyAnYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycpO1xuXG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRUZXh0YXJlYVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaW5pdGlhbFZhbHVlID0gcHJvcHMudmFsdWU7XG5cbiAgICAgIGlmIChpbml0aWFsVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcHJvcHMuZGVmYXVsdFZhbHVlOyAvLyBUT0RPICh5dW5nc3RlcnMpOiBSZW1vdmUgc3VwcG9ydCBmb3IgY2hpbGRyZW4gY29udGVudCBpbiA8dGV4dGFyZWE+LlxuXG4gICAgICAgIHZhciB0ZXh0YXJlYUNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XG5cbiAgICAgICAgaWYgKHRleHRhcmVhQ2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVycm9yKCdVc2UgdGhlIGBkZWZhdWx0VmFsdWVgIG9yIGB2YWx1ZWAgcHJvcHMgaW5zdGVhZCBvZiBzZXR0aW5nICcgKyAnY2hpbGRyZW4gb24gPHRleHRhcmVhPi4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIShkZWZhdWx0VmFsdWUgPT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoIFwiSWYgeW91IHN1cHBseSBgZGVmYXVsdFZhbHVlYCBvbiBhIDx0ZXh0YXJlYT4sIGRvIG5vdCBwYXNzIGNoaWxkcmVuLlwiICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGV4dGFyZWFDaGlsZHJlbikpIHtcbiAgICAgICAgICAgIGlmICghKHRleHRhcmVhQ2hpbGRyZW4ubGVuZ3RoIDw9IDEpKSB7XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvciggXCI8dGV4dGFyZWE+IGNhbiBvbmx5IGhhdmUgYXQgbW9zdCBvbmUgY2hpbGQuXCIgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0YXJlYUNoaWxkcmVuID0gdGV4dGFyZWFDaGlsZHJlblswXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAnJyArIHRleHRhcmVhQ2hpbGRyZW47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcHJvcHMgPSBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZHJlbjogJycgKyBpbml0aWFsVmFsdWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSAnc2VsZWN0Jykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygnc2VsZWN0JywgcHJvcHMpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVQcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgcHJvcE5hbWUgPSB2YWx1ZVByb3BOYW1lc1tpXTtcblxuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KHByb3BzW3Byb3BOYW1lXSk7XG5cbiAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgJiYgIWlzQXJyYXkpIHtcbiAgICAgICAgICAgIGVycm9yKCdUaGUgYCVzYCBwcm9wIHN1cHBsaWVkIHRvIDxzZWxlY3Q+IG11c3QgYmUgYW4gYXJyYXkgaWYgJyArICdgbXVsdGlwbGVgIGlzIHRydWUuJywgcHJvcE5hbWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXByb3BzLm11bHRpcGxlICYmIGlzQXJyYXkpIHtcbiAgICAgICAgICAgIGVycm9yKCdUaGUgYCVzYCBwcm9wIHN1cHBsaWVkIHRvIDxzZWxlY3Q+IG11c3QgYmUgYSBzY2FsYXIgJyArICd2YWx1ZSBpZiBgbXVsdGlwbGVgIGlzIGZhbHNlLicsIHByb3BOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FybkRlZmF1bHRTZWxlY3RWYWx1ZSkge1xuICAgICAgICAgIGVycm9yKCdTZWxlY3QgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHNlbGVjdCAnICsgJ2VsZW1lbnQgYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycpO1xuXG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRTZWxlY3RWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50U2VsZWN0VmFsdWUgPSBwcm9wcy52YWx1ZSAhPSBudWxsID8gcHJvcHMudmFsdWUgOiBwcm9wcy5kZWZhdWx0VmFsdWU7XG4gICAgICBwcm9wcyA9IF9hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSAnb3B0aW9uJykge1xuICAgICAgdmFyIHNlbGVjdGVkID0gbnVsbDtcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IHRoaXMuY3VycmVudFNlbGVjdFZhbHVlO1xuICAgICAgdmFyIG9wdGlvbkNoaWxkcmVuID0gZmxhdHRlbk9wdGlvbkNoaWxkcmVuKHByb3BzLmNoaWxkcmVuKTtcblxuICAgICAgaWYgKHNlbGVjdFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgdmFsdWUgPSBwcm9wcy52YWx1ZSArICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gb3B0aW9uQ2hpbGRyZW47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdFZhbHVlKSkge1xuICAgICAgICAgIC8vIG11bHRpcGxlXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWxlY3RWYWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKCcnICsgc2VsZWN0VmFsdWVbal0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkID0gJycgKyBzZWxlY3RWYWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcyA9IF9hc3NpZ24oe1xuICAgICAgICAgIHNlbGVjdGVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY2hpbGRyZW46IHVuZGVmaW5lZFxuICAgICAgICB9LCBwcm9wcywge1xuICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICBjaGlsZHJlbjogb3B0aW9uQ2hpbGRyZW5cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzSW5EZXZlbG9wbWVudCh0YWcsIHByb3BzKTtcbiAgICB9XG5cbiAgICBhc3NlcnRWYWxpZFByb3BzKHRhZywgcHJvcHMpO1xuICAgIHZhciBvdXQgPSBjcmVhdGVPcGVuVGFnTWFya3VwKGVsZW1lbnQudHlwZSwgdGFnLCBwcm9wcywgbmFtZXNwYWNlLCB0aGlzLm1ha2VTdGF0aWNNYXJrdXAsIHRoaXMuc3RhY2subGVuZ3RoID09PSAxKTtcbiAgICB2YXIgZm9vdGVyID0gJyc7XG5cbiAgICBpZiAob21pdHRlZENsb3NlVGFncy5oYXNPd25Qcm9wZXJ0eSh0YWcpKSB7XG4gICAgICBvdXQgKz0gJy8+JztcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ICs9ICc+JztcbiAgICAgIGZvb3RlciA9ICc8LycgKyBlbGVtZW50LnR5cGUgKyAnPic7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkcmVuO1xuICAgIHZhciBpbm5lck1hcmt1cCA9IGdldE5vbkNoaWxkcmVuSW5uZXJNYXJrdXAocHJvcHMpO1xuXG4gICAgaWYgKGlubmVyTWFya3VwICE9IG51bGwpIHtcbiAgICAgIGNoaWxkcmVuID0gW107XG5cbiAgICAgIGlmIChuZXdsaW5lRWF0aW5nVGFncy5oYXNPd25Qcm9wZXJ0eSh0YWcpICYmIGlubmVyTWFya3VwLmNoYXJBdCgwKSA9PT0gJ1xcbicpIHtcbiAgICAgICAgLy8gdGV4dC9odG1sIGlnbm9yZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVzZSB0YWdzIGlmIGl0J3MgYSBuZXdsaW5lXG4gICAgICAgIC8vIFByZWZlciB0byBicmVhayBhcHBsaWNhdGlvbi94bWwgb3ZlciB0ZXh0L2h0bWwgKGZvciBub3cpIGJ5IGFkZGluZ1xuICAgICAgICAvLyBhIG5ld2xpbmUgc3BlY2lmaWNhbGx5IHRvIGdldCBlYXRlbiBieSB0aGUgcGFyc2VyLiAoQWx0ZXJuYXRlbHkgZm9yXG4gICAgICAgIC8vIHRleHRhcmVhcywgcmVwbGFjaW5nIFwiXlxcblwiIHdpdGggXCJcXHJcXG5cIiBkb2Vzbid0IGdldCBlYXRlbiwgYW5kIHRoZSBmaXJzdFxuICAgICAgICAvLyBcXHIgaXMgbm9ybWFsaXplZCBvdXQgYnkgSFRNTFRleHRBcmVhRWxlbWVudCN2YWx1ZS4pXG4gICAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWwtcG9seWdsb3QvI25ld2xpbmVzLWluLXRleHRhcmVhLWFuZC1wcmU+XG4gICAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI2VsZW1lbnQtcmVzdHJpY3Rpb25zPlxuICAgICAgICAvLyBTZWU6IDxodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNuZXdsaW5lcz5cbiAgICAgICAgLy8gU2VlOiBQYXJzaW5nIG9mIFwidGV4dGFyZWFcIiBcImxpc3RpbmdcIiBhbmQgXCJwcmVcIiBlbGVtZW50c1xuICAgICAgICAvLyAgZnJvbSA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keT5cbiAgICAgICAgb3V0ICs9ICdcXG4nO1xuICAgICAgfVxuXG4gICAgICBvdXQgKz0gaW5uZXJNYXJrdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkcmVuID0gdG9BcnJheShwcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuXG4gICAgdmFyIGZyYW1lID0ge1xuICAgICAgZG9tTmFtZXNwYWNlOiBnZXRDaGlsZE5hbWVzcGFjZShwYXJlbnROYW1lc3BhY2UsIGVsZW1lbnQudHlwZSksXG4gICAgICB0eXBlOiB0YWcsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgIGZvb3RlcjogZm9vdGVyXG4gICAgfTtcblxuICAgIHtcbiAgICAgIGZyYW1lLmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5zdGFjay5wdXNoKGZyYW1lKTtcbiAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSBmYWxzZTtcbiAgICByZXR1cm4gb3V0O1xuICB9O1xuXG4gIHJldHVybiBSZWFjdERPTVNlcnZlclJlbmRlcmVyO1xufSgpO1xuXG4vKipcbiAqIFJlbmRlciBhIFJlYWN0RWxlbWVudCB0byBpdHMgaW5pdGlhbCBIVE1MLiBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgb24gdGhlXG4gKiBzZXJ2ZXIuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWRvbS1zZXJ2ZXIuaHRtbCNyZW5kZXJ0b3N0cmluZ1xuICovXG5cbmZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nKGVsZW1lbnQpIHtcbiAgdmFyIHJlbmRlcmVyID0gbmV3IFJlYWN0RE9NU2VydmVyUmVuZGVyZXIoZWxlbWVudCwgZmFsc2UpO1xuXG4gIHRyeSB7XG4gICAgdmFyIG1hcmt1cCA9IHJlbmRlcmVyLnJlYWQoSW5maW5pdHkpO1xuICAgIHJldHVybiBtYXJrdXA7XG4gIH0gZmluYWxseSB7XG4gICAgcmVuZGVyZXIuZGVzdHJveSgpO1xuICB9XG59XG4vKipcbiAqIFNpbWlsYXIgdG8gcmVuZGVyVG9TdHJpbmcsIGV4Y2VwdCB0aGlzIGRvZXNuJ3QgY3JlYXRlIGV4dHJhIERPTSBhdHRyaWJ1dGVzXG4gKiBzdWNoIGFzIGRhdGEtcmVhY3QtaWQgdGhhdCBSZWFjdCB1c2VzIGludGVybmFsbHkuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWRvbS1zZXJ2ZXIuaHRtbCNyZW5kZXJ0b3N0YXRpY21hcmt1cFxuICovXG5cbmZ1bmN0aW9uIHJlbmRlclRvU3RhdGljTWFya3VwKGVsZW1lbnQpIHtcbiAgdmFyIHJlbmRlcmVyID0gbmV3IFJlYWN0RE9NU2VydmVyUmVuZGVyZXIoZWxlbWVudCwgdHJ1ZSk7XG5cbiAgdHJ5IHtcbiAgICB2YXIgbWFya3VwID0gcmVuZGVyZXIucmVhZChJbmZpbml0eSk7XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSBmaW5hbGx5IHtcbiAgICByZW5kZXJlci5kZXN0cm95KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9Ob2RlU3RyZWFtKCkge1xuICB7XG4gICAge1xuICAgICAgdGhyb3cgRXJyb3IoIFwiUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9Ob2RlU3RyZWFtKCk6IFRoZSBzdHJlYW1pbmcgQVBJIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIuIFVzZSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZygpIGluc3RlYWQuXCIgKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9TdGF0aWNOb2RlU3RyZWFtKCkge1xuICB7XG4gICAge1xuICAgICAgdGhyb3cgRXJyb3IoIFwiUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdGF0aWNOb2RlU3RyZWFtKCk6IFRoZSBzdHJlYW1pbmcgQVBJIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIuIFVzZSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY01hcmt1cCgpIGluc3RlYWQuXCIgKTtcbiAgICB9XG4gIH1cbn0gLy8gTm90ZTogd2hlbiBjaGFuZ2luZyB0aGlzLCBhbHNvIGNvbnNpZGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTE1MjZcblxuXG52YXIgUmVhY3RET01TZXJ2ZXIgPSB7XG4gIHJlbmRlclRvU3RyaW5nOiByZW5kZXJUb1N0cmluZyxcbiAgcmVuZGVyVG9TdGF0aWNNYXJrdXA6IHJlbmRlclRvU3RhdGljTWFya3VwLFxuICByZW5kZXJUb05vZGVTdHJlYW06IHJlbmRlclRvTm9kZVN0cmVhbSxcbiAgcmVuZGVyVG9TdGF0aWNOb2RlU3RyZWFtOiByZW5kZXJUb1N0YXRpY05vZGVTdHJlYW0sXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvblxufTtcblxuLy8gVE9ETzogZGVjaWRlIG9uIHRoZSB0b3AtbGV2ZWwgZXhwb3J0IGZvcm0uXG4vLyBUaGlzIGlzIGhhY2t5IGJ1dCBtYWtlcyBpdCB3b3JrIHdpdGggYm90aCBSb2xsdXAgYW5kIEplc3RcblxuXG52YXIgc2VydmVyX2Jyb3dzZXIgPSBSZWFjdERPTVNlcnZlci5kZWZhdWx0IHx8IFJlYWN0RE9NU2VydmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlcl9icm93c2VyO1xuICB9KSgpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWRvbS1zZXJ2ZXIuYnJvd3Nlci5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC1kb20tc2VydmVyLmJyb3dzZXIuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=