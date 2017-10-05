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

import Base from 'agent-ui/controllers/base';
import ENV from 'agent-ui/config/environment';

export default Base.extend({

  actions: {

    transitionToProcess(process) {
      this.transitionToRoute('process', { processObject: process, process: process.name });
    },

    transitionToProcessMaps(process) {
      process
        .getMapIds()
        .then(maps => this.transitionToRoute('maps', { maps, processObject: process, process: process.name }));
    },

    transitionToProcessSegments(process) {
      process.getMapIds()
        .then(maps => {
          return process.findSegments({ mapIds: maps });
        })
        .then(segments => this.transitionToRoute('segments', {
          segments,
          processObject: process,
          process: process.name,
          tags: '',
          prevLinkHash: '',
          limit: ENV.APP.ITEMS_PER_PAGE
        }));
    },

  }

});
