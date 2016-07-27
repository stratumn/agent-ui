import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    onClickMap(mapId) {
      this.get('onClickMap')(mapId);
    },

    onClickViewMapSegments(mapId) {
      this.get('onClickViewMapSegments')(mapId);
    },

    onLoadMore() {
      this.get('onLoadMore')();
    }

  }

});
