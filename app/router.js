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
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('processes');
  this.route('process', {path: '/:process'});
  this.route('maps', {path: '/:process/maps'});
  this.route('map-explorer', { path: '/:process/maps/:mapId' });
  this.route('segments', {path: '/:process/segments'});
  this.route('segment', { path: '/:process/segments/:linkHash' });
  this.route('404', { path: '*path' });
  this.route('license');
});

export default Router;
