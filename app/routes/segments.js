/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  queryParams: {
    limit: { refreshModel: true },
    mapId: { refreshModel: true },
    prevLinkHash: { refreshModel: true },
    tags: { refreshModel: true }
  },

  model(params) {
    const filter = JSON.parse(JSON.stringify(params));
    filter.tags = params.tags.split(',');
    return this
      .get('stratumn')
      .getAgent()
      .then(agent => {
        return agent.findSegments(filter);
      }).then(segments => {
        return {
          segments,
          mapId: filter.mapId,
          prevLinkHash: filter.prevLinkHash,
          tags: filter.tags.join(' ')
        };
      });
  },

  renderTemplate() {
    this._super();
    this.render('segments-toolbar', { into: 'application', outlet: 'toolbar' });
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('limit', ENV.APP.ITEMS_PER_PAGE);
      controller.set('mapId', '');
      controller.set('prevLinkHash', '');
      controller.set('tags', '');
    }
  }

});
