import Ember from 'ember';

export function eql([a, b]) {
  return a === b;
}

export default Ember.Helper.helper(eql);
