import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    let agent;

    return StratumnSDK
      .getAgent(ENV.APP.AGENT_URL)
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
