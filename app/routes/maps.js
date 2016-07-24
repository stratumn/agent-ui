import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    let agent;

    return StratumnSDK
      .getAgent('http://localhost:3000')
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
    }
  }
});
