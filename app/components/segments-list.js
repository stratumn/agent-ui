import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    onClickSegment(linkHash) {
      this.get('onClickSegment')(linkHash);
    },

    onLoadMore() {
      this.get('onLoadMore')();
    }

  }

});
