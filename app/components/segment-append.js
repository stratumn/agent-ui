/*
  Copyright 2017 Stratumn SAS. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
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
