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
import ENV from 'agent-ui/config/environment';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  queryParams: { limit: { refreshModel: true } },

  model() {
    return this
      .get('stratumn')
      .getAgent()
      .then(agent => ({ processes: agent.processes }));
  },

  renderTemplate() {
    this._super();
    this.render('processes-toolbar', { into: 'application', outlet: 'toolbar' });
    this.get('stratumn').getAgent()
      .then(agent =>
        this.render('processes-index', { into: 'application', outlet: 'sidenav', model: agent })
      );
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('limit', ENV.APP.ITEMS_PER_PAGE);
      controller.set('error');
    }
  }

});