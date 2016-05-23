import { ValidationError } from 'aurelia-validation';

export let ValidationConfig = class ValidationConfig {
  constructor() {
    this.__validationRules__ = [];
  }

  addRule(key, rule) {
    this.__validationRules__.push({ key: key, rule: rule });
  }
  validate(instance, reporter, key) {
    let errors = [];
    let validations = [];
    this.__validationRules__.forEach(rule => {
      if (!key || key === rule.key) {
        let result = rule.rule.validate(instance, rule.key);
        if (result) {
          validations.push(result);
        }
      }
    });

    return Promise.all(validations).then(errors => {
      errors = errors.map(error => {
        if (!(error instanceof ValidationError)) {
          error = new ValidationError({ propertyName: error.key, message: error.error });
        }
        return error;
      });
      reporter.publish(errors.filter(val => {
        return val.constructor.name == "ValidationError";
      }));
    });
  }
  getValidationRules() {
    return this.__validationRules__ || (this.__validationRules__ = aggregateValidationRules(this));
  }
  aggregateValidationRules() {
    console.error('not yet implemented');
  }
};