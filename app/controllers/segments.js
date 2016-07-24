import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    userDidUpdateFilter(filter) {
      this.transitionToRoute('segments', { queryParams: filter });
    }
  },

  page: 1,
  map: '',
  prev: '',
  tags: '',

  queryParams: ['page', 'map', 'prev', 'tags'],

  prevPage: Ember.computed('page', function() {
    const page = this.get('page');
    if (page > 1) { return page - 1; }
    return page;
  }),

  nextPage: Ember.computed('page', 'model', function() {
    const page = this.get('page');
    const model = this.get('model');
    if (model.segments.length >= 20) { return page + 1; }
    return page;
  }),

  firstPage: Ember.computed('page', function() {
    return this.get('page') <= 1;
  }),

  lastPage: Ember.computed('page', 'model', function() {
    return this.get('model').segments.length < 20;
  })
});
