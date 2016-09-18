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
