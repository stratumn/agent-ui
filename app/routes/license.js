import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate() {
    this._super();
    this.render('license-toolbar', { into: 'application', outlet: 'toolbar' });
  }

});
