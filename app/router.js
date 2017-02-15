/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('maps');
  this.route('map-explorer', { path: '/maps/:mapId' });
  this.route('segments');
  this.route('segment', { path: '/segments/:linkHash' });
  this.route('404', { path: '*path' });
  this.route('license');
});

export default Router;
