/* global $ */
/* global hljs */
import Ember from 'ember';

export default Ember.Component.extend({

  didRender() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

});
