import Ember from 'ember';

export default Ember.Route.extend({
  stratumn: Ember.inject.service('stratumn'),

  queryParams: { page: { refreshModel: true } },

  model(params) {
    let agent;

    return this
      .get('stratumn')
      .getAgent()
      .then(res => {
        agent = res;
        return agent.getMapIds({ offset: (params.page - 1) * 20, limit: 20 });
      })
      .then(maps => ({ agent, maps }));
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
      controller.set('error');
    }
  }
});
