import {ValidationError} from 'aurelia-validation';

export class ValidationConfig {
  __validationRules__ = [];
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
    
    return Promise.all(validations)
      .then(errors => {
        errors = errors.map(error => {
          if (!(error instanceof ValidationError) && (error.key != undefined && error.error != undefined)) {
            error = new ValidationError({propertyName: error.key, message: error.error});
          }
          return error;
        })

        errors = errors.filter(function (error) {
          return error instanceof _aureliaValidation.ValidationError;
        })

        reporter.publish(errors);

        if (errors.length > 0) {
          throw errors;
        }
      })
  }
  getValidationRules() {
    return this.__validationRules__ || (this.__validationRules__ = aggregateValidationRules(this));
  }
  aggregateValidationRules() {
    console.error('not yet implemented');
    //get __validationRules__ from class using metadata
    //merge with any instance specific __validationRules__
  }
}
