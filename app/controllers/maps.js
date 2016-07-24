import Ember from 'ember';

export default Ember.Controller.extend({
  stratumn: Ember.inject.service('stratumn'),

  queryParams: ['page'],

  page: 1,

  prevPage: Ember.computed('page', function() {
    const page = this.get('page');
    if (page > 1) { return page - 1; }
    return page;
  }),

  nextPage: Ember.computed('page', 'model', function() {
    const page = this.get('page');
    const model = this.get('model');
    if (model.maps.length >= 20) { return page + 1; }
    return page;
  }),

  firstPage: Ember.computed('page', function() {
    return this.get('page') <= 1;
  }),

  lastPage: Ember.computed('page', 'model', function() {
    return this.get('model').maps.length < 20;
  }),

  actions: {
    userDidCreateMap(...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent =>  agent.createMap(...args))
        .then(segment => this.transitionToRoute('segment', segment.meta.linkHash))
        .catch(err => this.set('error', err));
    }
  }
});
