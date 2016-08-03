/* global StratumnSDK */
import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

function augmentAgent(agent) {
  agent.actions = Object
    .keys(agent.agentInfo.actions)
    .map(name => {
      const args = agent.agentInfo.actions[name].args;
      const signature = `${name}(${args.join(', ')})`;

      return { name, args, signature };
    })
    .sort((a, b) => {
      if (a.name === 'init') {
        return -1;
      }

      if (b.name === 'init') {
        return 1;
      }

      return a.name.localeCompare(b.name);
    });
}

export default Ember.Service.extend({
  agent: null,

  getAgent() {
    if (this.get('agent')) {
      return Ember.RSVP.Promise.resolve(this.get('agent'));
    }

    return StratumnSDK
      .getAgent(ENV.APP.AGENT_URL)
      .then(agent => {
        augmentAgent(agent);
        this.set('agent', agent);
        return agent;
      });
  }
});
