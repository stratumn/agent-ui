import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  queryParams: {
    limit: { refreshModel: true },
    mapId: { refreshModel: true },
    prevLinkHash: { refreshModel: true },
    tags: { refreshModel: true }
  },

  model(params) {
    return this
      .get('stratumn')
      .getAgent()
      .then(agent => {
        return agent.findSegments(params);
      }).then(segments => {
        return {
          segments,
          mapId: params.mapId,
          prevLinkHash: params.prevLinkHash,
          tags: params.tags.split(',').join(' ')
        };
      });
  },

  renderTemplate() {
    this._super();
    this.render('segments-toolbar', { into: 'application', outlet: 'toolbar' });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('limit', ENV.APP.ITEMS_PER_PAGE);
      controller.set('mapId', '');
      controller.set('prevLinkHash', '');
      controller.set('tags', '');
    }
  }

});
