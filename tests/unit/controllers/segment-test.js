import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:segment', 'Unit | Controller | segment', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:stratumn']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
