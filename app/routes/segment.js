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
    let agent;

    return this
      .get('stratumn')
      .getAgent()
      .then(res => {
        agent = res;
        return agent.getSegment(params.linkHash);
      }).then(segment => {
        const args = segment.link.meta.arguments.map(a =>
          JSON.stringify(a)
        ).join(', ');

        segment.json = JSON.stringify(segment, null, '  ');
        segment.action = `${segment.link.meta.action}(${args})`;

        const appendActions = agent.actions.slice(1);

        return { appendActions, segment };
      });
  },

  renderTemplate() {
    this._super();
    this.render('segment-toolbar', { into: 'application', outlet: 'toolbar' });
  },

  resetController(controller) {
    controller.set('showMore', false);
    controller.set('showAppendSegmentDialog', false);
    controller.set('error');
  }

});
