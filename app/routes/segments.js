import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
    map: {
      refreshModel: true
    },
    prev: {
      refreshModel: true
    },
    tags: {
      refreshModel: true
    }
  },

  model(params) {
    return StratumnSDK
      .getAgent('http://localhost:3000')
      .then(agent => {
        const page = params.page - 1;
        const filter = { offset: page * 20, limit: 20 };
        if (params.map) { filter.mapId = params.map; }
        if (params.prev) { filter.prevLinkHash = params.prev; }
        if (params.tags) { filter.tags = params.tags; }
        return agent.findSegments(filter);
      }).then(segments => {
        return {
          segments,
          map: params.map,
          prev: params.prev,
          tags: params.tags.split(',').join(' ')
        };
      });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
      controller.set('map', '');
      controller.set('prev', '');
      controller.set('tags', '');
    }
  }
});
