import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Service.extend({
  agent: null,

  getAgent() {
    if (this.get('agent')) {
      return Promise.resolve(this.get('agent'));
    }

    return StratumnSDK
      .getAgent(ENV.APP.AGENT_URL)
      .then(agent => {
        this.set('agent', agent);
        return agent;
      });
  }
});
