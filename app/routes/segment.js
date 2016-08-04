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
