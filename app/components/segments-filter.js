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

    onReset() {
      this.set('mapId', '');
      this.set('prevLinkHash', '');
      this.set('tags', '');
      this.get('onSubmit')({ mapId: '', prevLinkHash: '', tags: '' });
    }

  }
});
