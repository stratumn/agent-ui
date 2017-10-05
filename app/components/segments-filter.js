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
  actions: {

    onSubmit() {
      const filter = {
        mapIds: this.get('mapIds') ? this.get('mapIds').split(' ').join(',') : '',
        prevLinkHash: this.get('prevLinkHash') || '',
        tags: this.get('tags') ? this.get('tags').split(' ').join(',') : ''
      };

      this.get('onSubmit')(filter);
    },

    reset() {
      this.set('mapIds', '');
      this.set('prevLinkHash', '');
      this.set('tags', '');
      this.get('onSubmit')({ mapIds: '', prevLinkHash: '', tags: '' });
    }

  }
});
