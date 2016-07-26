import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Controller.extend({

  stratumn: Ember.inject.service('stratumn'),

  queryParams: ['limit'],

  limit: ENV.APP.ITEMS_PER_PAGE,

  hasNoMore: Ember.computed('limit', 'model', function() {
    return this.get('model').maps.length < this.get('limit');
  }),

  actions: {

    userDidToggleShowCreateMap() {
      return this.toggleProperty('showCreateMap');
    },

    userDidCreateMap(...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.createMap(...args))
        .then(segment => this.transitionToRoute('segment', segment.meta.linkHash))
        .catch(err => this.set('error', err));
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
