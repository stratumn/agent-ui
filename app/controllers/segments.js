import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Controller.extend({

  queryParams: ['limit', 'mapId', 'prevLinkHash', 'tags'],

  limit: ENV.APP.ITEMS_PER_PAGE,
  mapId: '',
  prevLinkHash: '',
  tags: '',

  hasNoMore: Ember.computed('limit', 'model', function() {
    return this.get('model').segments.length < this.get('limit');
  }),

  actions: {

    userDidUpdateFilter(filter) {
      this.transitionToRoute({
          queryParams: {
          limit: ENV.APP.ITEMS_PER_PAGE,
          mapId: filter.mapId || '',
          prevLinkHash: filter.prevLinkHash || '',
          tags: filter.tags || ''
        }
      });
    },

    userDidLoadMore() {
      if (!this.get('hasNoMore')) {
        this.transitionToRoute({
          queryParams: { limit: this.get('limit') + ENV.APP.ITEMS_PER_PAGE }
        });
      }
    }

  }

});
