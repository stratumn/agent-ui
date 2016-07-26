import Ember from 'ember';

export function shortHash([hash]) {
  return `${hash.substr(0, 8)}..${hash.substr(hash.length - 8)}`;
}

export default Ember.Helper.helper(shortHash);
