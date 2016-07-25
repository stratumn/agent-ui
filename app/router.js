import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('maps');
  this.route('segments');
  this.route('segment', { path: '/segments/:linkHash' });
  this.route('404', { path: '*path' });
});

export default Router;
