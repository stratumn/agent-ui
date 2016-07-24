import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({
  model(params) {
    return StratumnSDK
      .getAgent(ENV.APP.AGENT_URL)
      .then(agent => agent.getSegment(params.linkHash))
      .then(segment => {
        segment.json = JSON.stringify(segment, null, '  ');
        segment.action = `${segment.link.meta.action}(${segment.link.meta.arguments.map(a => JSON.stringify(a)).join(', ')})`;
        return segment;
      });
  }
});
