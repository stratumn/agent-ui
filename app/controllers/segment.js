/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Base from 'agent-ui/controllers/base';

export default Base.extend({

  actions: {

    toggleShowMoreDialog() {
      return this.toggleProperty('showMore');
    },

    toggleAppendSegmentDialog() {
      return this.toggleProperty('showAppendSegmentDialog');
    },

    appendSegmentThenViewNext(...args) {
      this.actions
        .appendSegment.apply(this, args)
        .then(segment => {
          this.transitionToRoute('segment', segment.meta.linkHash);
        })
        .catch(err => console.log(err));
    }

  }
});
