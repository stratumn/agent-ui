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

/* global $ */
/* global hljs */
import Ember from 'ember';

export default Ember.Component.extend({

  didRender() {
    // Binding doesn't seem to work with highlight js.
    hljs.highlightBlock($('pre code').html(this.get('segment').json).get(0));
  }

});
