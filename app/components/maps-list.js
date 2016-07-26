import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    onLoadMore() {
      this.get('onLoadMore')();
    }

  }

});
