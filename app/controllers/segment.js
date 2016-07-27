import Base from 'agent-ui/controllers/base';

export default Base.extend({

  actions: {

    toggleShowMoreDialog() {
      return this.toggleProperty('showMore');
    },

    toggleAppendSegmentDialog() {
      return this.toggleProperty('showAppendSegmentDialog');
    },

    appendSegmentThenViewNext(...args) {
      this.actions
        .appendSegment.apply(this, args)
        .then(segment => {
          this.transitionToRoute('segment', segment.meta.linkHash);
        });
    }

  }
});
