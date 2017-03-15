/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Base from 'agent-ui/controllers/base';

export default Base.extend({

  actions: {

    toggleAppendSegmentDialog() {
      this.toggleProperty('showAppendSegmentDialog');
    },

    appendSegmentThenUpdate(...args) {
      return this.actions
        .appendSegment.apply(this, args)
        .then(segment => {
          this.set('model.segments', [...this.get('model.segments'), segment]);
          this.set('showAppendSegmentDialog', false);
        });
    }
  }
});
