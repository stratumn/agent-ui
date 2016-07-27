import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get('selectedAction')) {
      this.set('selectedAction', this.get('appendActions')[0].name);
      this.resetArgs();
    }
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

      this.get('onSubmit')(
        this.get('segment').meta.linkHash,
        this.get('appendActions')[this.get('selectedActionIndex')].name,
        ...args
      );
    },

    changeSelectedAction(value) {
      if (!value) {
        return;
      }

      this.set('selectedAction', value);
      this.resetArgs();
    }

  },

  resetArgs() {
    const actions = this.get('appendActions');
    const selectedAction = this.get('selectedAction');

    const index = actions.reduce((prev, curr, i) => {
      return curr.name === selectedAction ? i : prev;
    }, -1);

    this.set('selectedActionIndex', index);
    this.set('args', actions[index].args.map(name => ({ name })));
  }
});
