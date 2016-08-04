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
    return this
      .get('stratumn')
      .getAgent()
      .then(agent => {
        return agent.findSegments(params);
      }).then(segments => {
        return {
          segments,
          mapId: params.mapId,
          prevLinkHash: params.prevLinkHash,
          tags: params.tags.split(',').join(' ')
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
