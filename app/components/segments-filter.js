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

import Ember from 'ember';

export default Ember.Component.extend({
  actions: {

    void() {},

    onSubmit() {
      const filter = {
        mapId: this.get('mapId') || '',
        prevLinkHash: this.get('prevLinkHash') || '',
        tags: this.get('tags') ? this.get('tags').split(' ').join(',') : ''
      };

      this.get('onSubmit')(filter);
    },

    reset() {
      this.set('mapId', '');
      this.set('prevLinkHash', '');
      this.set('tags', '');
      this.get('onSubmit')({ mapId: '', prevLinkHash: '', tags: '' });
    }

  }
});
