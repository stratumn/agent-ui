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
        .appendSegment.apply(this, [...[this.get('model').processObject], ...args])
        .then(segment => {
          this.transitionToRoute('segment', segment.meta.linkHash);
        })
        .catch(err => console.log(err));
    }

  }
});
