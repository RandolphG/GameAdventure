/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Overworld.ts":
/*!**********************!*\
  !*** ./Overworld.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Overworld\": () => (/* binding */ Overworld)\n/* harmony export */ });\nvar Overworld = /** @class */ (function () {\r\n    function Overworld(config) {\r\n        this.element = config.element;\r\n        this.canvas = this.element.querySelector(\".game-canvas\");\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n    }\r\n    Overworld.prototype.init = function () {\r\n        var _this = this;\r\n        var image = new Image();\r\n        image.onload = function () {\r\n            _this.ctx.drawImage(image, 0, 0);\r\n        };\r\n        image.src = \"/images/maps/DemoLower.png\";\r\n        var x = 5;\r\n        var y = 6;\r\n        var shadow = new Image();\r\n        shadow.onload = function () {\r\n            _this.ctx.drawImage(shadow, 0, //left cut\r\n            0, //top cut,\r\n            32, //width of cut\r\n            32, //height of cut\r\n            x * 16 - 8, y * 16 - 18, 32, 32);\r\n        };\r\n        shadow.src = \"/images/characters/shadow.png\";\r\n        var hero = new Image();\r\n        hero.onload = function () {\r\n            _this.ctx.drawImage(hero, 0, //left cut\r\n            0, //top cut,\r\n            32, //width of cut\r\n            32, //height of cut\r\n            x * 16 - 8, y * 16 - 18, 32, 32);\r\n        };\r\n        hero.src = \"/images/characters/people/hero.png\";\r\n    };\r\n    return Overworld;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://game-adventure/./Overworld.ts?");

/***/ }),

/***/ "./init.ts":
/*!*****************!*\
  !*** ./init.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Overworld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Overworld */ \"./Overworld.ts\");\n\r\nif (typeof document !== \"undefined\") {\r\n    var overworld = new _Overworld__WEBPACK_IMPORTED_MODULE_0__.Overworld({\r\n        element: document.querySelector(\".game-container\")\r\n    });\r\n    overworld.init();\r\n}\r\n\n\n//# sourceURL=webpack://game-adventure/./init.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./init.ts");
/******/ 	
/******/ })()
;