/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Ember from 'ember';

export default Ember.Route.extend({

  stratumn: Ember.inject.service('stratumn'),

  model() {
    return this.get('stratumn').getAgent();
  },

  renderTemplate() {
    this._super();
    this.render('index-toolbar', { into: 'application', outlet: 'toolbar' });
  }

});
