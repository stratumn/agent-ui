import Ember from 'ember';

export default Ember.Controller.extend({

  stratumn: Ember.inject.service('stratumn'),

  actions: {

    createMap(...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.createMap(...args))
        .catch(err => {
          console.log(err);
          this.set('error', err);
          throw(err);
        });
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
        .catch(err => {
          console.log(err);
          this.set('error', err);
          throw(err);
        });
    }

  }

});
