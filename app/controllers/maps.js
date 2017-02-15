/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
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
