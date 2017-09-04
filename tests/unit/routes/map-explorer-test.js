import { moduleFor, test } from 'ember-qunit';

moduleFor('route:map-explorer', 'Unit | Route | map explorer', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:stratumn']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
