/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/prototype.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n___CSS_LOADER_EXPORT___.push([module.i, \"@import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"body {\\n  margin: 0;\\n  font-family: \\\"Open Sans\\\", sans-serif;\\n  background: #363636;\\n  align-items: center;\\n}\\n\\n#section1 {\\n  padding-bottom: 100px;\\n}\\n#section1 #bg {\\n  position: absolute;\\n  top: 0;\\n  height: 100%;\\n  width: 100%;\\n  object-fit: cover;\\n}\\n@media screen and (max-width: 767px) {\\n  #section1 .go-next {\\n    display: none;\\n  }\\n}\\n#section1 canvas {\\n  display: block;\\n}\\n#section1 #prototype .go-next {\\n  margin-top: 60px;\\n  margin-bottom: 40px;\\n}\\n@media screen and (max-width: 767px) {\\n  #section1 #prototype {\\n    display: none;\\n  }\\n}\\n\\n#description {\\n  display: flex;\\n  color: white;\\n  position: relative;\\n  max-width: 1400px;\\n  width: 80vw;\\n  padding: 40px;\\n  margin: 130px auto;\\n  margin-top: 200px;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n@media screen and (max-width: 767px) {\\n  #description {\\n    flex-direction: column;\\n    margin: 40px auto;\\n  }\\n}\\n#description .hero-logo img {\\n  height: 72px;\\n}\\n#description #left-column {\\n  width: 50%;\\n  margin-right: 80px;\\n}\\n@media screen and (max-width: 767px) {\\n  #description #left-column {\\n    width: 100%;\\n    margin-right: 0;\\n  }\\n  #description #left-column img {\\n    width: 100%;\\n  }\\n}\\n#description #right-column {\\n  line-height: 24px;\\n  font-size: 16px;\\n}\\n#description #show-reel {\\n  width: 540px;\\n  height: 304px;\\n  margin: 20px;\\n  background: white;\\n}\\n\\n.content-wrapper {\\n  width: 100vw;\\n  height: 100vh;\\n  position: relative;\\n}\\n@media screen and (max-width: 767px) {\\n  .content-wrapper {\\n    display: none;\\n  }\\n}\\n.content-wrapper #loading-screen {\\n  width: 100%;\\n  height: 100%;\\n  background: black;\\n  position: absolute;\\n  z-index: 100;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n}\\n.content-wrapper #loading-screen p {\\n  color: white;\\n}\\n.content-wrapper #loading-screen .lds-ripple {\\n  display: inline-block;\\n  position: relative;\\n  width: 80px;\\n  height: 80px;\\n}\\n.content-wrapper #loading-screen .lds-ripple div {\\n  position: absolute;\\n  border: 4px solid #fff;\\n  opacity: 1;\\n  border-radius: 50%;\\n  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\\n}\\n.content-wrapper #loading-screen .lds-ripple div:nth-child(2) {\\n  animation-delay: -0.5s;\\n}\\n@keyframes lds-ripple {\\n  0% {\\n    top: 36px;\\n    left: 36px;\\n    width: 0;\\n    height: 0;\\n    opacity: 1;\\n  }\\n  100% {\\n    top: 0px;\\n    left: 0px;\\n    width: 72px;\\n    height: 72px;\\n    opacity: 0;\\n  }\\n}\\n.content-wrapper #extend-window-warning {\\n  display: none;\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  background: black;\\n  top: 0;\\n  z-index: 200;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n.content-wrapper #extend-window-warning p {\\n  color: white;\\n}\\n\\n#container {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n  -webkit-user-select: none;\\n  /* Chrome/Safari */\\n  -moz-user-select: none;\\n  /* Firefox */\\n  -ms-user-select: none;\\n  /* IE10+ */\\n  user-select: none;\\n}\\n\\n.header {\\n  display: flex;\\n  color: white;\\n  z-index: 3;\\n  justify-content: space-between;\\n  width: 100%;\\n  margin: 40px 0;\\n  font-size: 0.8em;\\n  top: 0;\\n}\\n.header .nav {\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  font-size: 16px;\\n  margin-right: 60px;\\n  font-weight: 400;\\n  line-height: 24px;\\n  z-index: 2;\\n}\\n@media screen and (max-width: 767px) {\\n  .header .nav {\\n    margin-right: 0;\\n  }\\n}\\n.header .nav div {\\n  margin-right: 40px;\\n}\\n.header .logo {\\n  height: 30px;\\n  margin-left: 60px;\\n}\\n@media screen and (max-width: 767px) {\\n  .header .logo {\\n    height: 20px;\\n    margin-left: 20px;\\n  }\\n}\\n.header .logo img {\\n  height: 100%;\\n}\\n\\n#overlay {\\n  position: absolute;\\n  display: flex;\\n  flex-direction: column;\\n  width: 100%;\\n  height: 100%;\\n  background: rgba(14, 14, 14, 0.6);\\n  color: white;\\n  text-align: center;\\n  align-items: center;\\n  justify-content: center;\\n}\\n#overlay #audio-label {\\n  position: absolute;\\n  right: 117px;\\n  top: 33px;\\n}\\n#overlay #instruction {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n#overlay #narrator {\\n  font-size: 20px;\\n  font-weight: 900;\\n  font-style: italic;\\n  margin-bottom: 20px;\\n}\\n#overlay .intro-detail {\\n  width: 700px;\\n  text-align: center;\\n  line-height: 24px;\\n  font-size: 16px;\\n}\\n#overlay #skip {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  position: absolute;\\n  right: 40px;\\n  bottom: 32px;\\n  width: 140px;\\n  height: 32px;\\n  border: 1px solid white;\\n}\\n#overlay #key-control {\\n  display: none;\\n  flex-direction: column;\\n  width: 730px;\\n}\\n#overlay #key-control .title {\\n  font-size: 20px;\\n  font-weight: 900;\\n  font-style: italic;\\n  margin-bottom: 32px;\\n}\\n#overlay #key-control .content {\\n  display: flex;\\n  font-size: 20px;\\n  line-height: 20px;\\n  font-weight: 400;\\n  white-space: nowrap;\\n}\\n#overlay #key-control .content .italic {\\n  font-style: italic;\\n}\\n#overlay #key-control .content .left {\\n  width: 350px;\\n  overflow: hidden;\\n  margin-right: 25px;\\n}\\n#overlay #key-control .content .left .left-block {\\n  display: flex;\\n  margin-bottom: 10px;\\n  width: 300px;\\n  overflow: hidden;\\n}\\n#overlay #key-control .content .right {\\n  width: 460px;\\n}\\n#overlay #key-control .content .right .right-block {\\n  display: flex;\\n  margin-bottom: 10px;\\n}\\n\\n#selected {\\n  position: absolute;\\n  margin: 20px;\\n  color: white;\\n  display: none;\\n  z-index: 2;\\n}\\n\\n#action {\\n  position: absolute;\\n  bottom: 200px;\\n  display: flex;\\n  align-items: center;\\n  width: 350px;\\n  justify-content: space-between;\\n}\\n\\n#instruction {\\n  width: 100%;\\n  text-align: center;\\n  padding-bottom: 50px;\\n}\\n\\n.instruction-button {\\n  border: 1px solid white;\\n  min-width: 150px;\\n  min-height: 40px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n\\n.go-next {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  width: 100%;\\n  margin-top: 50px;\\n}\\n.go-next div {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n\\na:link {\\n  text-decoration: none;\\n  color: white;\\n}\\n\\na:visited {\\n  text-decoration: none;\\n  color: white;\\n}\\n\\n.wrapper {\\n  display: flex;\\n  width: 100%;\\n  align-items: center;\\n  justify-content: center;\\n}\\n\\n#features {\\n  display: flex;\\n  padding-top: 50px;\\n  padding-bottom: 150px;\\n  max-width: 1440px;\\n  flex-wrap: wrap;\\n  justify-content: space-around;\\n}\\n#features .feature-block {\\n  margin-bottom: 60px;\\n}\\n#features .feature-block .img-container {\\n  width: 560px;\\n  height: 315px;\\n  background: black;\\n}\\n#features .feature-block .img-container img {\\n  width: 100%;\\n  height: 100%;\\n}\\n#features .feature-block .text-container {\\n  width: 560px;\\n  color: white;\\n  margin-top: 20px;\\n}\\n#features .feature-block .text-container .title {\\n  font-style: italic;\\n  font-weight: 900;\\n  font-size: 16px;\\n  line-height: 19px;\\n  margin-bottom: 10px;\\n}\\n\\n.switch {\\n  position: absolute;\\n  display: inline-block;\\n  right: 42px;\\n  top: 32px;\\n  width: 60px;\\n  height: 24px;\\n}\\n\\n.switch input {\\n  display: none;\\n}\\n\\n.slider {\\n  position: absolute;\\n  cursor: pointer;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  background-color: #ca2222;\\n  -webkit-transition: 0.4s;\\n  transition: 0.4s;\\n}\\n\\n.slider:before {\\n  position: absolute;\\n  content: \\\"\\\";\\n  height: 16px;\\n  width: 16px;\\n  left: 4px;\\n  bottom: 4px;\\n  background-color: white;\\n  -webkit-transition: 0.4s;\\n  transition: 0.4s;\\n}\\n\\ninput:checked + .slider {\\n  background-color: #2ab934;\\n}\\n\\ninput:focus + .slider {\\n  box-shadow: 0 0 1px #2196f3;\\n}\\n\\ninput:checked + .slider:before {\\n  -webkit-transform: translateX(37px);\\n  -ms-transform: translateX(37px);\\n  transform: translateX(37px);\\n}\\n\\n/*------ ADDED CSS ---------*/\\n.on {\\n  display: none;\\n}\\n\\n.off {\\n  color: white;\\n  position: absolute;\\n  transform: translate(-50%, -50%);\\n  top: 50%;\\n  left: 70%;\\n  font-size: 10px;\\n  font-family: Verdana, sans-serif;\\n}\\n\\n.on {\\n  color: white;\\n  position: absolute;\\n  transform: translate(-50%, -50%);\\n  top: 50%;\\n  left: 30%;\\n  font-size: 10px;\\n  font-family: Verdana, sans-serif;\\n}\\n\\ninput:checked + .slider .on {\\n  display: block;\\n}\\n\\ninput:checked + .slider .off {\\n  display: none;\\n}\\n\\n/*--------- END --------*/\\n/* Rounded sliders */\\n.slider.round {\\n  border-radius: 34px;\\n}\\n\\n.slider.round:before {\\n  border-radius: 50%;\\n}\\n\\n.prototype-logo {\\n  display: flex;\\n  justify-content: center;\\n  width: 300px;\\n  position: absolute;\\n  z-index: 200;\\n  left: 0;\\n  right: 0;\\n  margin-left: auto;\\n  margin-right: auto;\\n  padding: 35px 0;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/prototype.js":
/*!**************************!*\
  !*** ./src/prototype.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\n//# sourceURL=webpack:///./src/prototype.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack:///./src/style.scss?");

/***/ })

/******/ });