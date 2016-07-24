import Ember from 'ember';

export default Ember.Controller.extend({
  stratumn: Ember.inject.service('stratumn'),

  actions: {
    userDidAppendSegment(linkHash, action, ...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.getSegment(linkHash))
        .then(segment => segment[action](...args))
        .then(segment => {
          this.set('error');
          this.transitionToRoute('segment', segment.meta.linkHash);
        })
        .catch(err => this.set('error', err));
    }
  }
});
