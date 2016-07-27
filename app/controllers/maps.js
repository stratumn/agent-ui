import Ember from 'ember';
import Base from 'agent-ui/controllers/base';
import ENV from 'agent-ui/config/environment';

export default Base.extend({

  queryParams: ['limit'],

  limit: ENV.APP.ITEMS_PER_PAGE,

  hasNoMore: Ember.computed('limit', 'model', function() {
    return this.get('model').maps.length < this.get('limit');
  }),

  actions: {

    toggleCreateMapDialog() {
      return this.toggleProperty('showCreateMapDialog');
    },

    loadMore() {
      if (!this.get('hasNoMore')) {
        this.transitionToRoute({
          queryParams: { limit: this.get('limit') + ENV.APP.ITEMS_PER_PAGE }
        });
      }
    }
  
  }
});
