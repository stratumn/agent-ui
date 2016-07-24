import Ember from 'ember';

export default Ember.Route.extend({
  stratumn: Ember.inject.service('stratumn'),

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    let agent;

    return this
      .get('stratumn')
      .getAgent()
      .then(res => {
        agent = res;
        const page = params.page - 1;
        return agent.getMapIds({ offset: page * 20, limit: 20 });
      })
      .then(maps => { 
        const createMapArgs = agent.agentInfo.functions.init.args.map(arg => ({
          name: arg,
          value: ''
        }));
        return { agent, maps, createMapArgs };
      });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
      controller.set('error');
    }
  }
});
