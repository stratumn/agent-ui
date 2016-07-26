import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('selectedAppendAction', this.get('appendActions')[0].name);
    this.resetArgs();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('selectedAppendAction', this.get('appendActions')[0].name);
    this.resetArgs();
  },

  actions: {

    void() {},

    onClose() {
      this.get('onClose')();
    },

    onChangeSelectedAppendAction(value) {
      if (!value) {
        return;
      }

      this.set('selectedAppendAction', value);
      this.resetArgs();
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

      this.get('onSubmit')(
        this.get('segment').meta.linkHash,
        this.get('appendActions')[this.get('selectedAppendActionIndex')].name,
        ...args
      );
    }
  },

  resetArgs() {
    const appendActions = this.get('appendActions');
    const selectedAppendAction = this.get('selectedAppendAction');

    const index = appendActions.reduce((prev, curr, i) => {
      return curr.name === selectedAppendAction ? i : prev;
    }, -1);

    this.set('selectedAppendActionIndex', index);
    this.set('args', appendActions[index].args.map(name => ({ name })));
  }
});
