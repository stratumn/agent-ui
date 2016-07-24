/* global $ */
/* global hljs */
import Ember from 'ember';

export default Ember.Component.extend({

  didRender() {
    // Binding doesn't seem to work with highlight js
    hljs.highlightBlock($('pre code').html(this.get('segment').json).get(0));
  }

});
