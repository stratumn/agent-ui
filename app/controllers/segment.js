import Ember from 'ember';

export default Ember.Controller.extend({

  stratumn: Ember.inject.service('stratumn'),

  actions: {

    userDidToggleShowMore() {
      return this.toggleProperty('showMore');
    },

    userDidToggleShowAppendSegment() {
      return this.toggleProperty('showAppendSegment');
    },

    userDidAppendSegment(linkHash, action, ...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.getSegment(linkHash))
        .then(segment => segment[action](...args))
        .then(segment => {
          this.transitionToRoute('segment', segment.meta.linkHash);
        })
        .catch(err => this.set('error', err));
    }

  }
});
