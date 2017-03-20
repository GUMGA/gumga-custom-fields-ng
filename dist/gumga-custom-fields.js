(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  'use strict';

  CustomFields.$inject = [];
  function CustomFields() {
    return {
      restrict: 'E',
      scope: {
        fields: '=',
        useLabels: '?='
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
              v.dateValue = new Date(v.dateValue);
              $scope.$apply();
            }
          });
        }, 500);

        var template = '\n        <div class="row" ng-if="f.field.active" ng-repeat="f in ctrl.fields.gumgaCustomFields">\n          <div class="col-md-12">\n            <label ng-bind="f.field.name" ng-if="!ctrl.useLabels" gumga-translate-tag="f.field.translateKey"></label>\n            <label ng-if="ctrl.useLabels">{{f.field.translateKey}}</label>\n            <div ng-switch="f.field.type" class="form-group">\n              <div ng-switch-when="TEXT">\n                <input type="text" ng-model="f.textValue" class="form-control" />\n              </div>\n              <div ng-switch-when="NUMBER">\n                <input type="number" ng-model="f.numberValue" class="form-control" />\n              </div>\n              <div ng-switch-when="DATE">\n                <p class="input-group">\n                  <input type="text" class="form-control" uib-datepicker-popup="dd/MM/yyyy" ng-model="f.dateValue" is-open="ctrl.isDatePickerOpen"/>\n                  <span class="input-group-btn">\n                    <button type="button" class="btn btn-default" ng-click="ctrl.open()">\n                      <i class="glyphicon glyphicon-calendar"></i>\n                    </button>\n                  </span>\n                </p>\n              </div>\n              <div ng-switch-when="SELECTION">\n                <select ng-options="opt[f.field.optionValueField] as opt[f.field.optionLabelField] for opt in f.field.selection" ng-model="f.textValue" class="form-control"></select>\n              </div>\n              <div ng-switch-when="LOGIC">\n                <button type="button" class="btn" ng-class="{\'btn-success\': f.logicValue, \'btn-default\': !f.logicValue}" ng-model="f.logicValue" uib-btn-checkbox btn-checkbox-true="true" btn-checkbox-false="false">\n                  {{(f.logicValue) ? "On" : "Off" }}\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n        ';
        $element.append($compile(template)($scope));
      }],
      controllerAs: 'ctrl'
    };
  }

  angular.module('gumga.customfields', []).directive('gumgaCustomFields', CustomFields);
})();

},{}]},{},[1]);
