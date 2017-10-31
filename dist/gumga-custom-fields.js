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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  'use strict';

  CustomFields.$inject = [];
  function CustomFields() {
    return {
      restrict: 'E',
      scope: {
        fields: '=',
        useLabels: '=?'
      },
      bindToController: true,
      controller: ['$scope', '$element', '$attrs', '$http', '$compile', '$filter', function ($scope, $element, $attrs, $http, $compile, $filter) {
        var ctrl = this;
        ctrl.open = function () {
          ctrl.isDatePickerOpen = !ctrl.isDatePickerOpen;
        };

        setTimeout(function () {
          if (!ctrl.fields) throw 'O componente gumgaCustomFields requer o escopo populado com os fields para geração do template.';

          angular.forEach(ctrl.fields.gumgaCustomFields, function (v) {
            if (angular.isString(v.field.options) && v.field.type == 'SELECTION' && v.field.options.charAt(0) == '[') {
              v.field.selection = JSON.parse(v.field.options);
            } else if (angular.isString(v.field.options) && v.field.type == 'SELECTION' && v.field.options.charAt(0) != '[') {
              $http.get(v.field.options).then(function (response) {
                v.field.selection = response.data[v.field.optionsCollection];
                v.field.selection.forEach(function (b) {
                  return b[v.field.optionValueField] = b[v.field.optionValueField].toString();
                });
              }, function (error) {
                console.error(error);
              });
            }
            if (v.field.type == 'DATE') {
              if (v.dateValue) {
                v.dateValue = new Date(v.dateValue);
              } else {
                if (v.field.defaultValueScript) {
                  v.dateValue = eval(v.field.defaultValueScript);
                }
              }
              $scope.$apply();
            }
          });
        }, 500);

        var template = '\n        <div class="row">\n          <div class="col-md-{{f.field.colSize || 12}}" ng-if="f.field.active" ng-repeat="f in ctrl.fields.gumgaCustomFields">\n            <label ng-bind="f.field.name" ng-if="!ctrl.useLabels" gumga-translate-tag="f.field.translateKey"></label>\n            <label ng-if="ctrl.useLabels">{{f.field.translateKey}}</label>\n            <div ng-switch="f.field.type" class="form-group">\n              <div ng-switch-when="TEXT">\n                <input type="text" ng-model="f.textValue" class="form-control" />\n              </div>\n              <div ng-switch-when="NUMBER">\n                <input type="number" ng-model="f.numberValue" class="form-control" />\n              </div>\n              <div ng-switch-when="DATE">\n                <gumga-date ng-model="f.dateValue"></gumga-date>\n              </div>\n              <div ng-switch-when="SELECTION">\n                <select ng-options="opt[f.field.optionValueField] as opt[f.field.optionLabelField] for opt in f.field.selection" ng-model="f.textValue" class="form-control"></select>\n              </div>\n              <div ng-switch-when="LOGIC">\n                <button type="button" class="btn" ng-class="{\'btn-success\': f.logicValue, \'btn-default\': !f.logicValue}" ng-model="f.logicValue" uib-btn-checkbox btn-checkbox-true="true" btn-checkbox-false="false">\n                  {{(f.logicValue) ? "On" : "Off" }}\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n        ';
        $element.append($compile(template)($scope));
      }],
      controllerAs: 'ctrl'
    };
  }

  angular.module('gumga.customfields', ['gumga.date']).directive('gumgaCustomFields', CustomFields);
})();

/***/ })
/******/ ]);