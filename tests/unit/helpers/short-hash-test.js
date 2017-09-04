import { shortHash } from 'agent-ui/helpers/short-hash';
import { module, test } from 'qunit';

module('Unit | Helper | short hash');

test('it works', function(assert) {
  let result = shortHash(["e1be91fa0684d87868553b5532dd65cc3f5edf07001eb0badd45b8293f5a3657"]);
  assert.equal(result, "e1be91fa..57");
});
