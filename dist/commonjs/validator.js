'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = undefined;

var _metadataKey = require('./metadata-key');

var _validationConfig = require('./validation-config');

var _validationEngine = require('./validation-engine');

var _validationRule = require('./validation-rule');

var _aureliaMetadata = require('aurelia-metadata');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = exports.Validator = function () {
  function Validator(object) {
    _classCallCheck(this, Validator);

    this.object = object;
  }

  Validator.prototype.validate = function validate(prop) {
    var config = _aureliaMetadata.metadata.getOrCreateOwn(_metadataKey.validationMetadataKey, _validationConfig.ValidationConfig, this.object);
    var reporter = _validationEngine.ValidationEngine.getValidationReporter(this.object);
    if (prop) {
      return config.validate(this.object, reporter, prop);
    } else {
      return config.validate(this.object, reporter);
    }
  };

  Validator.prototype.getProperties = function getProperties() {
    console.error('Not yet implemented');
  };

  Validator.prototype.ensure = function ensure(prop) {
    var config = _aureliaMetadata.metadata.getOrCreateOwn(_metadataKey.validationMetadataKey, _validationConfig.ValidationConfig, this.object);
    this.config = config;
    this.currentProperty = prop;
    return this;
  };

  Validator.prototype.length = function length(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.lengthRule(configuration));
    return this;
  };

  Validator.prototype.presence = function presence(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.presence(configuration));
    return this;
  };

  Validator.prototype.required = function required(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.presence(configuration));
    return this;
  };

  Validator.prototype.numericality = function numericality(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.numericality(configuration));
    return this;
  };

  Validator.prototype.date = function date(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.date(configuration));
    return this;
  };

  Validator.prototype.datetime = function datetime(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.datetime(configuration));
    return this;
  };

  Validator.prototype.email = function email(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.email(configuration));
    return this;
  };

  Validator.prototype.equality = function equality(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.equality(configuration));
    return this;
  };

  Validator.prototype.format = function format(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.format(configuration));
    return this;
  };

  Validator.prototype.inclusion = function inclusion(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.inclusion(configuration));
    return this;
  };

  Validator.prototype.exclusion = function exclusion(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.exclusion(configuration));
    return this;
  };

  Validator.prototype.url = function url(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.url(configuration));
    return this;
  };

  Validator.prototype.async = function async(configuration) {
    this.config.addRule(this.currentProperty, _validationRule.ValidationRule.async(configuration));
    return this;
  };

  return Validator;
}();