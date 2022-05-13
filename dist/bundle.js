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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Overworld\": () => (/* binding */ Overworld)\n/* harmony export */ });\n/* harmony import */ var _gameObjects_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameObjects/GameObject */ \"./gameObjects/GameObject.ts\");\n\r\nvar Overworld = /** @class */ (function () {\r\n    function Overworld(config) {\r\n        this.element = config.element;\r\n        this.canvas = this.element.querySelector(\".game-canvas\");\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n    }\r\n    Overworld.prototype.init = function () {\r\n        var _this = this;\r\n        console.log(\"Overworld init\", this);\r\n        var image = new Image();\r\n        image.onload = function () {\r\n            _this.ctx.drawImage(image, 0, 0);\r\n        };\r\n        image.src = \"/images/maps/DemoLower.png\";\r\n        /*    const x: number = 5;\r\n        const y: number = 6;\r\n    \r\n        const shadow: HTMLImageElement = new Image();\r\n        shadow.onload = () => {\r\n          this.ctx!.drawImage(\r\n            shadow,\r\n            0, //left cut\r\n            0, //top cut,\r\n            32, //width of cut\r\n            32, //height of cut\r\n            x * 16 - 8,\r\n            y * 16 - 18,\r\n            32,\r\n            32\r\n          );\r\n        };\r\n        shadow.src = \"/images/characters/shadow.png\";\r\n    \r\n        const hero: HTMLImageElement = new Image();\r\n        hero.onload = () => {\r\n          this.ctx!.drawImage(\r\n            hero,\r\n            0, //left cut\r\n            0, //top cut,\r\n            32, //width of cut\r\n            32, //height of cut\r\n            x * 16 - 8,\r\n            y * 16 - 18,\r\n            32,\r\n            32\r\n          );\r\n        };\r\n        hero.src = \"/images/characters/people/hero.png\";*/\r\n        var hero = new _gameObjects_GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject({\r\n            x: 5,\r\n            y: 6,\r\n            src: \"/images/characters/people/hero.png\"\r\n        });\r\n        var npc1 = new _gameObjects_GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject({\r\n            x: 7,\r\n            y: 9,\r\n            src: \"/images/characters/people/npc1.png\"\r\n        });\r\n        setTimeout(function () {\r\n            hero.sprite.draw(_this.ctx);\r\n            npc1.sprite.draw(_this.ctx);\r\n        }, 200);\r\n    };\r\n    return Overworld;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://game-adventure/./Overworld.ts?");

/***/ }),

/***/ "./gameObjects/GameObject.ts":
/*!***********************************!*\
  !*** ./gameObjects/GameObject.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameObject\": () => (/* binding */ GameObject)\n/* harmony export */ });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./gameObjects/Sprite.ts\");\n\r\nvar GameObject = /** @class */ (function () {\r\n    function GameObject(config) {\r\n        this.x = config.x || 0;\r\n        this.y = config.y || 0;\r\n        this.sprite = new _Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite({ gameObject: this, src: config.src || \"\" });\r\n    }\r\n    return GameObject;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://game-adventure/./gameObjects/GameObject.ts?");

/***/ }),

/***/ "./gameObjects/Sprite.ts":
/*!*******************************!*\
  !*** ./gameObjects/Sprite.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\nvar Sprite = /** @class */ (function () {\r\n    function Sprite(config) {\r\n        var _this = this;\r\n        /* set up the image */\r\n        this.image = new Image();\r\n        this.image.src = config.src;\r\n        this.image.onload = function () {\r\n            _this.isLoaded = true;\r\n        };\r\n        /*Shadow*/\r\n        this.shadow = new Image();\r\n        this.useShadow = true;\r\n        this.shadow.src = \"/images/characters/shadow.png\";\r\n        this.shadow.onload = function () {\r\n            _this.isShadowLoaded = true;\r\n        };\r\n        /*Configuring Animation & Initial State */\r\n        this.animation = config.animation || {\r\n            idleDown: [[0, 0]]\r\n        };\r\n        this.currentAnimation = config.currentAnimation || \"idleDown\";\r\n        this.currentAnimation = 0;\r\n        this.gameObject = config.gameObject;\r\n    }\r\n    Sprite.prototype.draw = function (ctx) {\r\n        var x = this.gameObject.x * 16 - 8;\r\n        var y = this.gameObject.y * 16 - 18;\r\n        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);\r\n        this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);\r\n    };\r\n    return Sprite;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://game-adventure/./gameObjects/Sprite.ts?");

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