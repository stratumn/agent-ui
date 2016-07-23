import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return StratumnSDK
      .getAgent('http://localhost:3000')
      .then(agent => {
        return agent.findSegments({ limit: 20 });
      });
  }
});
