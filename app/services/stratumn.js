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
      .getAgent(ENV.APP.AGENT_URL)
      .then(agent => {
        augmentAgent(agent);
        this.set('agent', agent);
        return agent;
      });
  }
});
