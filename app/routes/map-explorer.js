import Ember from 'ember';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  model(params) {
    let appendActions;

    return this
      .get('stratumn')
      .getAgent()
      .then(agent => {
        appendActions = agent.actions.slice(1);
        return agent.findSegments(params);
      })
      .then(segments => ({ mapId: params.mapId, segments, appendActions }));
  },

  renderTemplate() {
    this._super();
    this.render('map-explorer-toolbar', { into: 'application', outlet: 'toolbar' });
  },

  resetController(controller) {
    controller.set('showAppendSegmentDialog', false);
    controller.set('error');
  }

});
