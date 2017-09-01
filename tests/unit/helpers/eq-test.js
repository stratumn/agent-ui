
import { eq } from 'agent-ui/helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq');

// Replace this with your real tests.
test('it returns true when passing equal values', function(assert) {
  let result = eq([42, 42]);
  assert.ok(result);
});

test('it works with strings', function(assert) {
  let result = eq(["test", "test"]);
  assert.ok(result);
});

test('it returns false otherwise', function(assert) {
  let result = eq(["test", 42]);
  assert.ok(result);
});
