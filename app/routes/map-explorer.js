/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Ember from 'ember';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  model(params) {
    let appendActions;

    return this
      .get('stratumn')
      .getAgent()
      .then(agent => {
        appendActions = agent.actions.slice(1);
        return agent.findSegments(Object.assign({ limit: -1 }, params));
      })
      .then(segments => ({ mapId: params.mapId, segments, appendActions }));
  },

  renderTemplate() {
    this._super();
    this.render('map-explorer-toolbar', { into: 'application', outlet: 'toolbar' });
  },

  resetController(controller) {
    controller.set('showAppendSegmentDialog', false);
    controller.set('error');
  }

});
