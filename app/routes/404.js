import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate() {
    this._super();
    this.render('404-toolbar', { into: 'application', outlet: 'toolbar' });
  }

});
