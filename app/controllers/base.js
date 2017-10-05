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

import ENV from 'agent-ui/config/environment';
import Ember from 'ember';

export default Ember.Controller.extend({

  stratumn: Ember.inject.service('stratumn'),

  actions: {
    createMap(process, ...args) {
      return process
        .createMap(...args)
        .catch(err => {
          console.log(err);
          this.set('error', err);
          throw (err);
        });
    },

    viewProcessMaps(process) {
      process
        .getMapIds()
        .then(mapIds =>
          this.transitionToRoute('maps', { maps: mapIds, process: process.name, processObject: process }));
    },

    exploreMap(process, mapId) {
      const appendActions = process.actions.slice(1);
      process.findSegments({ limit: -1, mapIds: [mapId] })
        .then(segments =>
          this.transitionToRoute('map-explorer', { mapId, process: process.name, processObject: process, appendActions, segments }));
    },

    viewMapSegments(process, mapId) {
      process
        .findSegments({ mapIds: [mapId] })
        .then(segments =>
          this.transitionToRoute('segments', { mapIds: mapId, process: process.name, segments, prevLinkHash: '', tags: '', limit: ENV.APP.ITEMS_PER_PAGE, processObject: process }));
    },

    viewSegment(process, linkHash) {
      const appendActions = process.actions.slice(1);
      process
        .getSegment(linkHash)
        .then(segment => {
          this.transitionToRoute('segment', { segment, process: process.name, processObject: process, linkHash, appendActions });
        });
    },

    appendSegment(process, linkHash, action, ...args) {
      return process.getSegment(linkHash)
        .then(segment =>
          segment[action](...args))
        .catch(err => {
          this.set('error', err);
          throw (err);
        });
    }
  },

  validateLinkHash: [{
    message: 'Must be 64 character long hex string',
    validate: (inputValue) => {
      let regex = /^[a-zA-Z0-9]{64}$/;
      return regex.test(inputValue);
    }
  }],

  validateOptionalLinkHash: [{
    message: 'Must be 64 character long hex string',
    validate: (inputValue) => {
      let regex = /^[a-zA-Z0-9]{64}$/;
      return inputValue.length < 1 || regex.test(inputValue);
    }
  }],
});
