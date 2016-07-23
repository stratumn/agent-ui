import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return StratumnSDK
      .getAgent('http://localhost:3000')
      .then(agent => agent.getSegment(params.linkHash))
      .then(segment => {
        segment.json = JSON.stringify(segment, null, '  ');
        segment.action = `${segment.link.meta.action}(${segment.link.meta.arguments.map(a => JSON.stringify(a)).join(', ')})`;
        return segment;
      });
  }
});
