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
import Base from 'agent-ui/controllers/base';
import ENV from 'agent-ui/config/environment';

export default Base.extend({

  queryParams: ['limit'],

  limit: ENV.APP.ITEMS_PER_PAGE,

  hasNoMore: Ember.computed('limit', 'model', function() {
    return this.get('model').maps.length < this.get('limit');
  }),

  actions: {

    toggleCreateMapDialog() {
      return this.toggleProperty('showCreateMapDialog');
    },

    loadMore() {
      if (!this.get('hasNoMore')) {
        this.transitionToRoute({
          queryParams: { limit: this.get('limit') + ENV.APP.ITEMS_PER_PAGE }
        });
      }
    },

    createMapThenViewSegment(...args) {
      this.actions
        .createMap.apply(this, args)
        .then(segment => this.actions.viewSegment.call(this, segment.meta.linkHash))
        .catch(() => {});
    }
  
  }
});
