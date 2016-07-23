import Ember from 'ember';

export default Ember.Component.extend({
  args: [],

  actions: {
    createMap() {
      this.get('onSubmit')(this.get('args').map(a => a.value));
    }
  }
});
