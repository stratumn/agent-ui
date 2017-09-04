import { moduleFor, test } from 'ember-qunit';

moduleFor('route:maps', 'Unit | Route | maps', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:stratumn']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
