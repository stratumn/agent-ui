/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Ember from 'ember';

export default Ember.Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.get('selectedAction')) {
      this.set('selectedAction', this.get('appendActions')[0]);
      this.resetArgs();
    }
  },

  actions: {

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

      return this.get('onSubmit')(
        this.get('segment').meta.linkHash,
        this.get('selectedAction').name,
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
    const selectedAction = this.get('selectedAction');
    this.set('args', selectedAction.args.map(name => ({ name })));
  }
});
