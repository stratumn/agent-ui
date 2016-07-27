import Ember from 'ember';

export default Ember.Controller.extend({

  stratumn: Ember.inject.service('stratumn'),

  actions: {

    createMap(...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.createMap(...args))
        .then(segment => this.transitionToRoute('segment', segment.meta.linkHash))
        .catch(err => this.set('error', err));
    },

    exploreMap(mapId) {
      this.transitionToRoute('map-explorer', mapId);
    },

    viewMapSegments(mapId) {
      this.transitionToRoute('segments', { queryParams: { mapId } });
    },

    viewSegment(linkHash) {
      this.transitionToRoute('segment', linkHash);
    },

    appendSegment(linkHash, action, ...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.getSegment(linkHash))
        .then(segment => segment[action](...args))
        .catch(err => this.set('error', err));
    }

  }

});
