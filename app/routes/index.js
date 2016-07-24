import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({
  model() {
    return StratumnSDK
      .getAgent(ENV.APP.AGENT_URL)
      .then(agent => {
        agent.actions = Object
          .keys(agent.agentInfo.functions)
          .map(key => ({
            name: key,
            signature: `${key}(${agent.agentInfo.functions[key].args.join(', ')})`
          }))
          .sort((a, b) => {
            if (a.name === 'init') {
              return -1;
            }
            if (b.name === 'init') {
              return 1;
            }
            return a.name.localeCompare(b.name);
          });
        return agent;
      });
  }
});
