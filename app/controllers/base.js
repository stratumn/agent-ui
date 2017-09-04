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

export default Ember.Controller.extend({

  stratumn: Ember.inject.service('stratumn'),

  actions: {
    createMap(...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.createMap(...args))
        .catch(err => {
          console.log(err);
          this.set('error', err);
          throw(err);
        });
    },

    exploreMap(mapId) {
      this.transitionToRoute('map-explorer', mapId);
    },

    viewMapSegments(mapId) {
      this.transitionToRoute('segments', { queryParams: { mapId }});
    },

    viewSegment(linkHash) {
      this.transitionToRoute('segment', linkHash);
    },

    appendSegment(linkHash, action, ...args) {
      return this
        .get('stratumn')
        .getAgent()
        .then(agent => agent.getSegment(linkHash))
        .then(segment => segment[action](...args))
        .catch(err => {
          console.log(err);
          this.set('error', err);
          throw(err);
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
