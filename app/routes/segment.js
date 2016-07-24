import Ember from 'ember';

export default Ember.Route.extend({
  stratumn: Ember.inject.service('stratumn'),

  model(params) {
    return this
      .get('stratumn')
      .getAgent()
      .then(agent => agent.getSegment(params.linkHash))
      .then(segment => {
        segment.json = JSON.stringify(segment, null, '  ');
        segment.action = `${segment.link.meta.action}(${segment.link.meta.arguments.map(a => JSON.stringify(a)).join(', ')})`;
        return segment;
      });
  }
});
