/*
  Copyright 2017 Stratumn SAS. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/* global StratumnAgentClient */
import Ember from 'ember';
import ENV from 'agent-ui/config/environment';

function augmentAgent(agent) {
  agent.processes = Object.keys(agent.processes).reduce((acc, p) => {
    const updatedProcesses = acc;
    const process = agent.processes[p];
    process.actions = Object
      .keys(process.processInfo.actions)
      .map(name => {
        const args = process.processInfo.actions[name].args;
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
    updatedProcesses.push(process);
    return updatedProcesses;
  }, []);
}

export default Ember.Service.extend({
  agent: null,
  processes: null,

  getAgent() {
    if (this.get('agent')) {
      return Ember.RSVP.Promise.resolve(this.get('agent'));
    }

    return StratumnAgentClient
      .getAgent(location.protocol + '//' + location.hostname + ':' + ENV.APP.AGENT_PORT)
      .then(agent => {
        augmentAgent(agent);
        this.set('agent', agent);
        return agent;
      });
  }
});
