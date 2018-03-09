import { mapValues, isFunction, isObject } from 'lodash';

export function generateNewObjectWithAllFunctionsInvoked(object) {
  return mapValues(object, value => isFunction(value)
      ? value()
      : isObject(value) ? generateNewObjectWithAllFunctionsInvoked(value) : value
  );
}
