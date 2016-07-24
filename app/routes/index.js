import Ember from 'ember';

export default Ember.Route.extend({
  stratumn: Ember.inject.service('stratumn'),

  model() { return this.get('stratumn').getAgent(); }
});
