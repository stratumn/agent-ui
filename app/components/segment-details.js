/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/* global $ */
/* global hljs */
import Ember from 'ember';

export default Ember.Component.extend({

  didRender() {
    // Binding doesn't seem to work with highlight js.
    hljs.highlightBlock($('pre code').html(this.get('segment').json).get(0));
  }

});
