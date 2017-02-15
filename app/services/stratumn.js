/*
    Copyright (C) 2017  Stratumn SAS

    This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/* global StratumnSDK */
import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

function augmentAgent(agent) {
  agent.actions = Object
    .keys(agent.agentInfo.actions)
    .map(name => {
      const args = agent.agentInfo.actions[name].args;
      const signature = `${name}(${args.join(', ')})`;

      return { name, args, signature };
    })
    .sort((a, b) => {
      if (a.name === 'init') {
        return -1;
      }

      if (b.name === 'init') {
        return 1;
      }

      return a.name.localeCompare(b.name);
    });
}

export default Ember.Service.extend({
  agent: null,

  getAgent() {
    if (this.get('agent')) {
      return Ember.RSVP.Promise.resolve(this.get('agent'));
    }

    return StratumnSDK
      .getAgent(location.protocol + '//' + location.hostname + ':' + ENV.APP.AGENT_PORT)
      .then(agent => {
        augmentAgent(agent);
        this.set('agent', agent);
        return agent;
      });
  }
});
