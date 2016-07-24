import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return StratumnSDK
      .getAgent('http://localhost:3000')
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
