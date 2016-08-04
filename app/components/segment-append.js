/*
    Stratumn Agent User Interface
    Copyright (C) 2016  Stratumn SAS

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    The presentation and each element of the Stratumn Agent User Interface
    including trademarks, logos, photographs, domain names, any graphical
    element belong exclusively to Stratumn or its licensors and are
    protection by intellectual property laws.
*/

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
