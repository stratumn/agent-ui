/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
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
      this.transitionToRoute('segments', { queryParams: { mapId } });
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
