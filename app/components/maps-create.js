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

    void() {},

    onClose() {
      this.get('onClose')();
    },

    onSubmit() {
      const args = this.get('args').map(arg => {
        let val = arg.value;

        if (!val) {
          return;
        }

        // See if we can parse the value as JSON.
        try {
          val = JSON.parse(val);
        }
        catch (err) { }

        return val;
      });

      this.get('onSubmit')(...args);
    }
  },

  resetArgs() {
    this.set('args', this.get('action').args.map(name => ({ name })));
  }
});
