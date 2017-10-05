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

  queryParams: {
    limit: { refreshModel: true },
    mapIds: { refreshModel: true },
    prevLinkHash: { refreshModel: true },
    tags: { refreshModel: true }
  },

  model(params) {
    let processObject;
    const filter = JSON.parse(JSON.stringify(params));
    if (params.mapIds.length === 0) {
      delete filter.mapIds
    } else {
      filter.mapIds = params.mapIds.split(',')
    }
    if (params.tags.length === 0) {
      delete filter.tags
    } else {
      filter.tags = params.tags.split(',')
    }
    return this
      .get('stratumn')
      .getAgent()
      .then(agent => {
        processObject = agent.processes
          .find(p => p.name === params.process);
        return processObject
          .findSegments(filter);
      }).then(segments => {
        return {
          processObject,
          process: params.process,
          segments,
          mapIds: filter.mapIds ? filter.mapIds.join(' ') : '',
          prevLinkHash: filter.prevLinkHash,
          tags: filter.tags ? filter.tags.join(' ') : ''
        };
      });
  },

  renderTemplate(ctrl, model) {
    this._super();
    this.render('segments-toolbar', { into: 'application', outlet: 'toolbar' });
    this.get('stratumn').getAgent()
      .then(agent =>
        this.render('processes-index', {
          into: 'application',
          outlet: 'sidenav',
          model: {
            processes: agent.processes,
            displayDetails: true,
            currentProcess: model.process
          }
        }));
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('limit', ENV.APP.ITEMS_PER_PAGE);
      controller.set('mapIds', '');
      controller.set('prevLinkHash', '');
      controller.set('tags', '');
    }
  }

});
