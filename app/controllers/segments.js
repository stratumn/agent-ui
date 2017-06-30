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

  queryParams: ['limit', 'mapId', 'prevLinkHash', 'tags'],

  limit: ENV.APP.ITEMS_PER_PAGE,
  mapId: '',
  prevLinkHash: '',
  tags: '',

  hasNoMore: Ember.computed('limit', 'model', function() {
    return this.get('model').segments.length < this.get('limit');
  }),

  actions: {

    updateFilter(filter) {
      this.transitionToRoute({
          queryParams: {
          limit: ENV.APP.ITEMS_PER_PAGE,
          mapId: filter.mapId || '',
          prevLinkHash: filter.prevLinkHash || '',
          tags: filter.tags || ''
        }
      });
    },

    loadMore() {
      if (!this.get('hasNoMore')) {
        this.transitionToRoute({
          queryParams: { limit: this.get('limit') + ENV.APP.ITEMS_PER_PAGE }
        });
      }
    }

  }

});
