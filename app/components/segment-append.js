import Ember from 'ember';

export default Ember.Component.extend({
  selectedActionName: Ember.computed('selectedAction', 'appendActions', function() {
    return this.get('appendActions')[this.get('selectedAction')].name;
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('selectedAction', 0);
    this.resetArgs();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('selectedAction', 0);
    this.resetArgs();
  },

  actions: {
    selectAppendAction(selected) {
      this.set('selectedAction', selected);
      this.resetArgs();
    },

    appendSegment() {
      this.get('onSubmit')(
        this.get('segment').meta.linkHash,
        this.get('appendActions')[this.get('selectedAction')].name,
        ...this.get('args').map(arg => arg.value || null)
      );
    }
  },

  resetArgs() {
    const appendActions = this.get('appendActions');
    if (appendActions.length) {
      this.set('args', appendActions[this.get('selectedAction')].args.map(name => ({ name })));
    } else {
      this.set('args', []);
    }
  }
});
