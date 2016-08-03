import Base from 'agent-ui/controllers/base';

export default Base.extend({

  actions: {

    toggleAppendSegmentDialog() {
      this.toggleProperty('showAppendSegmentDialog');
    },

    appendSegmentThenUpdate(...args) {
      this.actions
        .appendSegment.apply(this, args)
        .then(segment => {
          this.set('model.segments', [...this.get('model.segments'), segment]);
          this.set('showAppendSegmentDialog', false);
        })
        .catch(() => {});
    }

  }

});
