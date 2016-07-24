import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    this.resetArgs();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.resetArgs();
  },

  actions: {
    createMap() { this.get('onSubmit')(...this.get('args').map(arg => arg.value || null)); }
  },

  resetArgs() { this.set('args', this.get('action').args.map(name => ({ name }))); }
});
