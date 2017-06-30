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
