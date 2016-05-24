'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationConfig = undefined;

var _aureliaValidation = require('aurelia-validation');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationConfig = exports.ValidationConfig = function () {
  function ValidationConfig() {
    _classCallCheck(this, ValidationConfig);

    this.__validationRules__ = [];
  }

  ValidationConfig.prototype.addRule = function addRule(key, rule) {
    this.__validationRules__.push({ key: key, rule: rule });
  };

  ValidationConfig.prototype.validate = function validate(instance, reporter, key) {
    var errors = [];
    var validations = [];
    this.__validationRules__.forEach(function (rule) {
      if (!key || key === rule.key) {
        var result = rule.rule.validate(instance, rule.key);
        if (result) {
          validations.push(result);
        }
      }
    });

    return Promise.all(validations).then(function (errors) {
      errors = errors.map(function (error) {
        if (!(error instanceof _aureliaValidation.ValidationError)) {
          error = new _aureliaValidation.ValidationError({ propertyName: error.key, message: error.error });
        }
        return error;
      });
      reporter.publish(errors.filter(function (val) {
        return val.constructor.name == "ValidationError";
      }));

      if (errors.length > 0) {
        throw errors;
      }
    });
  };

  ValidationConfig.prototype.getValidationRules = function getValidationRules() {
    return this.__validationRules__ || (this.__validationRules__ = aggregateValidationRules(this));
  };

  ValidationConfig.prototype.aggregateValidationRules = function aggregateValidationRules() {
    console.error('not yet implemented');
  };

  return ValidationConfig;
}();