import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  queryParams: { limit: { refreshModel: true } },

  model(params) {
    let agent;

    return this
      .get('stratumn')
      .getAgent()
      .then(res => {
        agent = res;
        return agent.getMapIds(params);
      })
      .then(maps => ({ agent, maps }));
  },

  renderTemplate() {
    this._super();
    this.render('maps-toolbar', { into: 'application', outlet: 'toolbar' });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('limit', ENV.APP.ITEMS_PER_PAGE);
      controller.set('showCreateMapDialog', false);
      controller.set('error');
    }
  }

});
