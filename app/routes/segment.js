import Ember from 'ember';

export default Ember.Route.extend({
  stratumn: Ember.inject.service('stratumn'),

  model(params) {
    let agent;

    return this
      .get('stratumn')
      .getAgent()
      .then(res => {
        agent = res;
        return agent.getSegment(params.linkHash);
      }).then(segment => {
        segment.json = JSON.stringify(segment, null, '  ');
        const args = segment.link.meta.arguments.map(a => JSON.stringify(a)).join(', ');
        segment.action = `${segment.link.meta.action}(${args})`;
        const appendActions = agent.actions.slice(1);
        return { appendActions, segment };
      });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('error');
    }
  }
});
