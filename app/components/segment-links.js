import Ember from 'ember';

export default Ember.Component.extend({

  actions: {

    onClose() {
      this.get('onClose')();
    }

  }

});
