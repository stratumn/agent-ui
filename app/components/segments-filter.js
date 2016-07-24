import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateFilter() {
      const filter = {
        map: this.get('map') || '',
        prev: this.get('prev') || '',
        tags: this.get('tags') ? this.get('tags').split(' ').join(',') : ''
      };
      this.get('onSubmit')(filter);
    }
  }
});
